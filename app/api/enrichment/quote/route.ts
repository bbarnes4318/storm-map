/**
 * POST /api/enrichment/quote
 *
 * Generates a credit cost quote for a property enrichment product.
 * Does NOT charge credits. Returns a quoteId for use in the /unlock route.
 *
 * Uses the unified EnrichmentStore via getEnrichmentStore().
 * Works in both mock mode and with real database.
 */

import { NextRequest } from "next/server";
import { getCurrentEnrichmentAccount, AuthNotConfiguredError } from "@/lib/enrichment/auth";
import { apiSuccess, apiError } from "@/lib/enrichment/api-response";
import { getEnrichmentStore, StoreConfigurationError } from "@/lib/enrichment/stores";
import { getEnrichmentRouteGuardResult } from "@/lib/enrichment/route-guard";
import { QuoteRequestSchema, DataProductType } from "@/lib/enrichment/schemas";
import { createPropertyHash } from "@/lib/enrichment/providers/normalizers";

// Server-side credit price table
const CREDIT_COSTS: Record<DataProductType, number> = {
  PROPERTY_PROFILE: 5,
  OWNER_CONTACT: 10,
  ROOF_INTELLIGENCE: 10,
  FULL_STORM_LEAD: 20,
};

/** Quote validity window: 15 minutes */
const QUOTE_EXPIRY_MS = 15 * 60 * 1000;

export async function POST(request: NextRequest) {
  try {
    // 0a. Production safety gate
    const guard = getEnrichmentRouteGuardResult(request);
    if (!guard.allowed) {
      return apiError(guard.code, guard.message, guard.httpStatus);
    }

    // 0b. Resolve store
    const store = getEnrichmentStore();

    // 1. Resolve account
    const account = await getCurrentEnrichmentAccount(request);

    // 2. Require compliance attestation via store
    const hasAttestation = await store.compliance.hasRecentAttestation(account.accountId);
    if (!hasAttestation) {
      return apiError(
        "COMPLIANCE_ATTESTATION_REQUIRED",
        "You must complete compliance attestation before generating quotes.",
        403
      );
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
    const expiresAt = new Date(Date.now() + QUOTE_EXPIRY_MS);

    // 5. Store quote via unified store
    const storedQuote = await store.quotes.createQuote({
      accountId: account.accountId,
      propertyHash,
      latitude,
      longitude,
      addressText: address,
      productType,
      creditCost,
      expiresAt,
    });

    // 6. Write audit log
    const ipAddress = request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || "unknown";
    const userAgent = request.headers.get("user-agent") || "unknown";
    await store.audit.createAuditLog({
      accountId: account.accountId,
      action: "GENERATE_QUOTE",
      ipAddress,
      userAgent,
      metadata: {
        quoteId: storedQuote.id,
        productType,
        creditCost,
        propertyHash,
        expiresAt: expiresAt.toISOString(),
      },
    });

    return apiSuccess({
      quoteId: storedQuote.id,
      propertyHash,
      productType,
      creditCost,
      expiresAt: expiresAt.toISOString(),
    });
  } catch (err) {
    if (err instanceof AuthNotConfiguredError) {
      return apiError("AUTH_NOT_CONFIGURED", err.message, 501);
    }
    if (err instanceof StoreConfigurationError) {
      return apiError("INTERNAL_ERROR", err.message, 503);
    }
    console.error("[POST /api/enrichment/quote] Unhandled error:", err);
    return apiError("INTERNAL_ERROR", "An internal error occurred.", 500);
  }
}
