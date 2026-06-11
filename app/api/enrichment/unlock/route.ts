/**
 * POST /api/enrichment/unlock
 *
 * Charges credits and returns enrichment data for a quoted property.
 * Requires an Idempotency-Key header to prevent double-charging.
 *
 * Mock mode: Uses centralized mock-store for quotes, ledger, and unlock cache.
 * Production: Will use Drizzle DB transactions and real providers.
 */

import { NextRequest } from "next/server";
import { getCurrentEnrichmentAccount, AuthNotConfiguredError } from "@/lib/enrichment/auth";
import { requireAttestation, redactSuppressedContacts } from "@/lib/enrichment/compliance";
import { apiSuccess, apiError } from "@/lib/enrichment/api-response";
import { UnlockRequestSchema } from "@/lib/enrichment/schemas";
import { getProviderForProduct } from "@/lib/enrichment/providers";
import { debitAccount } from "@/lib/enrichment/ledger";
import { encryptContactPayload, EncryptionNotConfiguredError } from "@/lib/enrichment/crypto";
import {
  getMockQuote,
  getMockUnlock,
  saveMockUnlock,
  getMockLedgerStore,
} from "@/lib/enrichment/mock-store";

export async function POST(request: NextRequest) {
  try {
    // 1. Resolve account
    const account = await getCurrentEnrichmentAccount(request);

    // 2. Require compliance attestation
    try {
      await requireAttestation(account.accountId);
    } catch (attErr) {
      const code = (attErr as Error & { code?: string }).code;
      if (code === "COMPLIANCE_ATTESTATION_REQUIRED") {
        return apiError(
          "COMPLIANCE_ATTESTATION_REQUIRED",
          "Compliance attestation is required before unlocking data.",
          403
        );
      }
      throw attErr;
    }

    // 3. Require Idempotency-Key header
    const idempotencyKey = request.headers.get("Idempotency-Key");
    if (!idempotencyKey) {
      return apiError(
        "IDEMPOTENCY_KEY_REQUIRED",
        "Idempotency-Key header is required to prevent double-charging.",
        400
      );
    }

    // 4. Check cached unlock for idempotent replay
    const cached = getMockUnlock(idempotencyKey);
    if (cached) {
      return apiSuccess({
        unlockId: cached.unlockId,
        productType: cached.productType,
        creditsCharged: cached.creditsCharged,
        isCached: true,
        providerSource: cached.providerSource,
        providerRequestId: cached.providerRequestId,
        providerCostEstimate: cached.providerCostEstimate,
        ...cached.result,
      });
    }

    // 5. Parse and validate body
    const body = await request.json();
    const parsed = UnlockRequestSchema.safeParse(body);
    if (!parsed.success) {
      return apiError("INVALID_REQUEST", "Invalid unlock request.", 400, {
        issues: parsed.error.issues,
      });
    }

    // 6. Look up quote from centralized mock store
    const quote = getMockQuote(parsed.data.quoteId);
    if (!quote) {
      return apiError("QUOTE_NOT_FOUND", "Quote not found or has expired.", 404);
    }

    // 7. Verify quote belongs to this account
    if (quote.accountId !== account.accountId) {
      return apiError("UNAUTHORIZED", "Quote does not belong to this account.", 403);
    }

    // 8. Check quote expiry
    if (new Date() > quote.expiresAt) {
      return apiError("QUOTE_EXPIRED", "This quote has expired. Please generate a new quote.", 410);
    }

    // 9. Call provider
    let provider;
    try {
      provider = getProviderForProduct(quote.productType);
    } catch {
      return apiError(
        "PROVIDER_NOT_CONFIGURED",
        "No enrichment provider is configured for this product type.",
        503
      );
    }

    const providerResponse = await provider.enrich({
      productType: quote.productType,
      address: quote.address,
      latitude: quote.latitude,
      longitude: quote.longitude,
      propertyHash: quote.propertyHash,
      accountId: account.accountId,
    });

    if (!providerResponse.success || !providerResponse.data) {
      // Do NOT charge credits if provider returns no usable data
      return apiError(
        "PROVIDER_NO_MATCH",
        providerResponse.error || "Provider returned no usable data. No credits were charged.",
        422
      );
    }

    // 10. Apply suppression list redaction
    // TODO: When DB is active, load suppression hashes from suppressionList table.
    const suppressionHashes = new Set<string>(); // Empty in mock mode
    const redactedResult = redactSuppressedContacts(providerResponse.data, suppressionHashes);

    // 11. Debit credits via centralized mock ledger
    const ledgerStore = getMockLedgerStore();
    try {
      await debitAccount(ledgerStore, {
        accountId: account.accountId,
        amount: quote.creditCost,
        txType: "SPEND_CREDITS",
        idempotencyKey,
        referenceId: quote.quoteId,
        description: `Unlock ${quote.productType} for ${quote.address}`,
      });
    } catch (ledgerErr) {
      if (ledgerErr instanceof Error && "code" in ledgerErr) {
        const code = (ledgerErr as Error & { code: string }).code;
        if (code === "INSUFFICIENT_CREDITS") {
          return apiError("INSUFFICIENT_CREDITS", "Not enough credits to complete this unlock.", 402);
        }
      }
      throw ledgerErr;
    }

    // 12. Encrypt sensitive contact payload for storage
    // The encrypted version would be stored in DB; the response returns the decrypted
    // version because it goes directly to the purchasing user from this server route.
    if (redactedResult.contactData) {
      try {
        const envelope = encryptContactPayload(
          redactedResult.contactData as unknown as Record<string, unknown>
        );
        // In production, `envelope` would be stored as `encrypted_contact_payload`
        // in the enrichment_unlocks table. For now, we just verify encryption works.
        void envelope;
      } catch (encErr) {
        if (encErr instanceof EncryptionNotConfiguredError) {
          // In mock mode without encryption key, log warning but continue
          console.warn(
            "[unlock] Encryption key not configured. Contact data will not be encrypted for storage. " +
            "This is acceptable in ENRICHMENT_MOCK_MODE but MUST be resolved before production."
          );
        } else {
          throw encErr;
        }
      }
    }

    // 13. Build unlock result
    const unlockId = crypto.randomUUID();
    const resultPayload: Record<string, unknown> = {
      propertyProfile: redactedResult.propertyProfile,
      contactData: redactedResult.contactData, // Decrypted for immediate response to purchasing user
      roofIntelligence: redactedResult.roofIntelligence,
    };

    // 14. Cache for idempotent replay via centralized mock store
    saveMockUnlock(idempotencyKey, {
      unlockId,
      productType: quote.productType,
      creditsCharged: quote.creditCost,
      providerSource: providerResponse.providerSource,
      providerRequestId: providerResponse.providerRequestId,
      providerCostEstimate: providerResponse.providerCostEstimate,
      result: resultPayload,
    });

    return apiSuccess({
      unlockId,
      productType: quote.productType,
      creditsCharged: quote.creditCost,
      isCached: false,
      providerSource: providerResponse.providerSource,
      providerRequestId: providerResponse.providerRequestId,
      providerCostEstimate: providerResponse.providerCostEstimate,
      ...resultPayload,
    });
  } catch (err) {
    if (err instanceof AuthNotConfiguredError) {
      return apiError("AUTH_NOT_CONFIGURED", err.message, 501);
    }
    console.error("[POST /api/enrichment/unlock] Unhandled error:", err);
    return apiError("INTERNAL_ERROR", "An internal error occurred.", 500);
  }
}
