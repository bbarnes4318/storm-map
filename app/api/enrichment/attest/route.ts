/**
 * POST /api/enrichment/attest
 *
 * Records a compliance attestation for the current account.
 * The user must agree to TCPA/DNC compliance terms before
 * accessing enrichment data.
 *
 * Uses the unified EnrichmentStore via getEnrichmentStore().
 * Works in both mock mode and with real database.
 */

import { NextRequest, NextResponse } from "next/server";
import { getCurrentEnrichmentAccount, AuthNotConfiguredError } from "@/lib/enrichment/auth";
import { apiSuccess, apiError } from "@/lib/enrichment/api-response";
import { getEnrichmentStore, StoreConfigurationError } from "@/lib/enrichment/stores";
import { getEnrichmentRouteGuardResult } from "@/lib/enrichment/route-guard";
import { z } from "zod";

const AttestRequestSchema = z.object({
  agree: z.boolean(),
});

const ATTESTATION_TEXT =
  "I certify that I will use the contact information provided through this service " +
  "in compliance with all applicable federal, state, and local laws, including but not " +
  "limited to the Telephone Consumer Protection Act (TCPA), the Do-Not-Call (DNC) " +
  "registry rules, CAN-SPAM Act, and applicable state telemarketing regulations. " +
  "I understand that violation of these laws may result in significant penalties.";

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

    // 2. Parse and validate body
    const body = await request.json();
    const parsed = AttestRequestSchema.safeParse(body);
    if (!parsed.success) {
      return apiError("INVALID_REQUEST", "Invalid request body.", 400, {
        issues: parsed.error.issues,
      });
    }

    if (parsed.data.agree !== true) {
      return apiError(
        "INVALID_REQUEST",
        "You must agree to the compliance attestation (agree: true).",
        400
      );
    }

    // 3. Extract request metadata for audit trail
    const ipAddress = request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || "unknown";
    const userAgent = request.headers.get("user-agent") || "unknown";

    // 4. Store attestation via store abstraction
    const attestation = await store.compliance.createAttestation({
      accountId: account.id,
      ipAddress,
      userAgent,
      attestationText: ATTESTATION_TEXT,
    });

    // 5. Write audit log
    await store.audit.createAuditLog({
      accountId: account.id,
      action: "COMPLIANCE_ATTESTATION",
      ipAddress,
      userAgent,
      metadata: { attestedAt: new Date().toISOString() },
    });

    return NextResponse.json({
      success: true,
      data: {
        attested: true,
        attestation: {
          id: attestation.id,
        },
      },
    });
  } catch (err) {
    if (err instanceof AuthNotConfiguredError) {
      return apiError("AUTH_NOT_CONFIGURED", err.message, 501);
    }
    if (err instanceof StoreConfigurationError) {
      return apiError("INTERNAL_ERROR", err.message, 503);
    }
    console.error("[POST /api/enrichment/attest] Unhandled error:", err);
    return apiError("INTERNAL_ERROR", "An internal error occurred.", 500);
  }
}
