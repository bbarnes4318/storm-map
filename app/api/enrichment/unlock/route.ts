/**
 * POST /api/enrichment/unlock
 *
 * Charges credits and returns enrichment data for a quoted property.
 * Requires an Idempotency-Key header to prevent double-charging.
 *
 * Uses the unified EnrichmentStore via getEnrichmentStore() and the
 * Phase 1C ledger service via StoreLedgerBridge.
 *
 * Works in both mock mode and with real database.
 */

import { NextRequest } from "next/server";
import { getCurrentEnrichmentAccount, AuthNotConfiguredError } from "@/lib/enrichment/auth";
import { apiSuccess, apiError } from "@/lib/enrichment/api-response";
import { getEnrichmentStore, StoreConfigurationError } from "@/lib/enrichment/stores";
import { getEnrichmentRouteGuardResult } from "@/lib/enrichment/route-guard";
import { StoreLedgerBridge } from "@/lib/enrichment/stores/ledger-bridge";
import { UnlockRequestSchema } from "@/lib/enrichment/schemas";
import { getProviderForProduct } from "@/lib/enrichment/providers";
import { debitAccount, CreditLedgerError } from "@/lib/enrichment/ledger";
import { redactSuppressedContacts, hashSuppressionValue } from "@/lib/enrichment/compliance";
import { encryptContactPayload, EncryptionNotConfiguredError } from "@/lib/enrichment/crypto";

export async function POST(request: NextRequest) {
  try {
    // 0a. Production safety gate
    const guard = getEnrichmentRouteGuardResult(request);
    if (!guard.allowed) {
      return apiError(guard.code, guard.message, guard.httpStatus);
    }

    // 0b. Resolve store
    const store = getEnrichmentStore();

    // 1. Resolve account identity from auth
    const authContext = await getCurrentEnrichmentAccount(request);

    // 1b. Ensure account exists in the persistent store (upsert)
    const account = await store.accounts.upsertAccountFromAuthIdentity({
      authProvider: authContext.authProvider,
      authUserId: authContext.authUserId,
      email: authContext.email,
    });

    // 2. Require compliance attestation via store
    const hasAttestation = await store.compliance.hasRecentAttestation(account.id);
    if (!hasAttestation) {
      return apiError(
        "COMPLIANCE_ATTESTATION_REQUIRED",
        "Compliance attestation is required before unlocking data.",
        403
      );
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

    // 4. Check for existing unlock by this idempotency key (via ledger)
    const ledgerBridge = new StoreLedgerBridge(store);
    const existingEntry = await ledgerBridge.getLedgerEntryByIdempotencyKey(idempotencyKey);
    if (existingEntry) {
      // Idempotent replay: return cached result if we have an unlock record.
      // Find the unlock record associated with this transaction/quote to return the correct unlockId.
      let unlockId: string | undefined = undefined;
      if (existingEntry.referenceId) {
        const quote = await store.quotes.getQuoteById(existingEntry.referenceId);
        if (quote) {
          const unlock = await store.unlocks.getUnlockByAccountPropertyProduct(
            account.id,
            quote.propertyHash,
            quote.productType
          );
          if (unlock) {
            unlockId = unlock.id;
          }
        }
      }

      return apiSuccess({
        unlockId,
        message: "This unlock was already processed (idempotent replay).",
        creditsCharged: Math.abs(existingEntry.amount),
        isCached: true,
        ledgerEntryId: existingEntry.id,
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

    // 6. Look up quote from store
    const quote = await store.quotes.getQuoteById(parsed.data.quoteId);
    if (!quote) {
      return apiError("QUOTE_NOT_FOUND", "Quote not found or has expired.", 404);
    }

    // 7. Verify quote belongs to this account
    if (quote.accountId !== account.id) {
      return apiError("UNAUTHORIZED", "Quote does not belong to this account.", 403);
    }

    // 8. Check quote expiry
    if (store.quotes.isQuoteExpired(quote)) {
      return apiError("QUOTE_EXPIRED", "This quote has expired. Please generate a new quote.", 410);
    }

    // 9. Check for existing unlock for this property+product (dedup)
    const existingUnlock = await store.unlocks.getUnlockByAccountPropertyProduct(
      account.id,
      quote.propertyHash,
      quote.productType
    );
    if (existingUnlock) {
      return apiSuccess({
        unlockId: existingUnlock.id,
        productType: existingUnlock.productType,
        creditsCharged: existingUnlock.creditsCharged,
        isCached: true,
        providerSource: existingUnlock.providerSource,
        propertyProfile: existingUnlock.propertyProfilePayload,
        message: "This property was already unlocked for this product type.",
      });
    }

    // 10. Call provider
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
      address: quote.addressText,
      latitude: quote.latitude,
      longitude: quote.longitude,
      propertyHash: quote.propertyHash,
      accountId: account.id,
    });

    if (!providerResponse.success || !providerResponse.data) {
      return apiError(
        "PROVIDER_NO_MATCH",
        providerResponse.error || "Provider returned no usable data. No credits were charged.",
        422
      );
    }

    // 11. Apply suppression list redaction
    const allContactHashes: string[] = [];
    if (providerResponse.data.contactData?.phones?.value) {
      for (const phone of providerResponse.data.contactData.phones.value) {
        allContactHashes.push(hashSuppressionValue("PHONE", phone.number));
      }
    }
    if (providerResponse.data.contactData?.emails?.value) {
      for (const email of providerResponse.data.contactData.emails.value) {
        allContactHashes.push(hashSuppressionValue("EMAIL", email.address));
      }
    }
    const suppressionHashes = await store.suppression.getSuppressedHashes(allContactHashes);
    const redactedResult = redactSuppressedContacts(providerResponse.data, suppressionHashes);

    // 12. Debit credits via Phase 1C ledger service through bridge
    try {
      await debitAccount(ledgerBridge, {
        accountId: account.id,
        amount: quote.creditCost,
        txType: "SPEND_CREDITS",
        idempotencyKey,
        referenceId: quote.id,
        description: `Unlock ${quote.productType} for ${quote.addressText}`,
      });
    } catch (ledgerErr) {
      if (ledgerErr instanceof CreditLedgerError && ledgerErr.code === "INSUFFICIENT_CREDITS") {
        return apiError("INSUFFICIENT_CREDITS", "Not enough credits to complete this unlock.", 402);
      }
      throw ledgerErr;
    }

    // 13. Encrypt sensitive contact payload for storage
    let encryptedContactPayloadStr: string | null = null;
    if (redactedResult.contactData) {
      try {
        const envelope = encryptContactPayload(
          redactedResult.contactData as unknown as Record<string, unknown>
        );
        encryptedContactPayloadStr = JSON.stringify(envelope);
      } catch (encErr) {
        if (encErr instanceof EncryptionNotConfiguredError) {
          console.warn(
            "[unlock] Encryption key not configured. Contact data will not be encrypted for storage. " +
            "This is acceptable in ENRICHMENT_MOCK_MODE but MUST be resolved before production."
          );
        } else {
          throw encErr;
        }
      }
    }

    // 14. Persist unlock record via store
    const ipAddress = request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || "unknown";
    const userAgent = request.headers.get("user-agent") || "unknown";

    const unlock = await store.unlocks.createUnlock({
      accountId: account.id,
      propertyHash: quote.propertyHash,
      latitude: quote.latitude,
      longitude: quote.longitude,
      addressText: quote.addressText,
      productType: quote.productType,
      providerSource: providerResponse.providerSource,
      providerRequestId: providerResponse.providerRequestId,
      providerCostEstimate: providerResponse.providerCostEstimate,
      creditsCharged: quote.creditCost,
      isCached: false,
      propertyProfilePayload: redactedResult.propertyProfile
        ? (redactedResult.propertyProfile as unknown as Record<string, unknown>)
        : null,
      encryptedContactPayload: encryptedContactPayloadStr,
    });

    // 15. Write audit log
    await store.audit.createAuditLog({
      accountId: account.id,
      action: "UNLOCK_LEAD",
      ipAddress,
      userAgent,
      metadata: {
        unlockId: unlock.id,
        quoteId: quote.id,
        productType: quote.productType,
        creditsCharged: quote.creditCost,
        propertyHash: quote.propertyHash,
        providerSource: providerResponse.providerSource,
      },
    });

    // 16. Return decrypted data immediately to the purchasing user
    return apiSuccess({
      unlockId: unlock.id,
      productType: quote.productType,
      creditsCharged: quote.creditCost,
      isCached: false,
      providerSource: providerResponse.providerSource,
      providerRequestId: providerResponse.providerRequestId,
      providerCostEstimate: providerResponse.providerCostEstimate,
      propertyProfile: redactedResult.propertyProfile,
      contactData: redactedResult.contactData,
      roofIntelligence: redactedResult.roofIntelligence,
    });
  } catch (err) {
    if (err instanceof AuthNotConfiguredError) {
      return apiError("AUTH_NOT_CONFIGURED", err.message, 501);
    }
    if (err instanceof StoreConfigurationError) {
      return apiError("INTERNAL_ERROR", err.message, 503);
    }
    console.error("[POST /api/enrichment/unlock] Unhandled error:", err);
    return apiError("INTERNAL_ERROR", "An internal error occurred.", 500);
  }
}
