/**
 * POST /api/enrichment/quote
 *
 * Generates a credit cost quote for a property enrichment product.
 * Does NOT charge credits. Returns a quoteId for use in the /unlock route.
 *
 * Mock mode: Quote is stored in server-side memory via mock-store.
 * Production: Will persist to enrichment_quotes table.
 */

import { NextRequest } from "next/server";
import { getCurrentEnrichmentAccount, AuthNotConfiguredError } from "@/lib/enrichment/auth";
import { requireAttestation } from "@/lib/enrichment/compliance";
import { apiSuccess, apiError } from "@/lib/enrichment/api-response";
import { QuoteRequestSchema, DataProductType } from "@/lib/enrichment/schemas";
import { createPropertyHash } from "@/lib/enrichment/providers/normalizers";
import { saveMockQuote, StoredQuote } from "@/lib/enrichment/mock-store";

// Server-side credit price table
const CREDIT_COSTS: Record<DataProductType, number> = {
  PROPERTY_PROFILE: 5,
  OWNER_CONTACT: 10,
  ROOF_INTELLIGENCE: 10,
  FULL_STORM_LEAD: 20,
};

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
          "You must complete compliance attestation before generating quotes.",
          403
        );
      }
      throw attErr;
    }

    // 3. Parse and validate body
    const body = await request.json();
    const parsed = QuoteRequestSchema.safeParse(body);
    if (!parsed.success) {
      return apiError("INVALID_REQUEST", "Invalid quote request.", 400, {
        issues: parsed.error.issues,
      });
    }

    const { address, latitude, longitude, productType } = parsed.data;

    // 4. Generate property hash and credit cost
    const propertyHash = createPropertyHash(address, latitude, longitude);
    const creditCost = CREDIT_COSTS[productType];

    // 5. Generate quote with 15-minute expiry
    const quoteId = crypto.randomUUID();
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000);

    // 6. Store quote via centralized mock store
    const storedQuote: StoredQuote = {
      quoteId,
      accountId: account.accountId,
      propertyHash,
      address,
      latitude,
      longitude,
      productType,
      creditCost,
      expiresAt,
      createdAt: new Date(),
    };
    saveMockQuote(storedQuote);

    return apiSuccess({
      quoteId,
      propertyHash,
      productType,
      creditCost,
      expiresAt: expiresAt.toISOString(),
    });
  } catch (err) {
    if (err instanceof AuthNotConfiguredError) {
      return apiError("AUTH_NOT_CONFIGURED", err.message, 501);
    }
    console.error("[POST /api/enrichment/quote] Unhandled error:", err);
    return apiError("INTERNAL_ERROR", "An internal error occurred.", 500);
  }
}
