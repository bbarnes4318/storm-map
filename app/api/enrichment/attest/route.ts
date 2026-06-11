/**
 * POST /api/enrichment/attest
 *
 * Records a compliance attestation for the current account.
 * The user must agree to TCPA/DNC compliance terms before
 * accessing enrichment data.
 *
 * Mock mode: Attestation is stored in server-side memory.
 * Production: Will persist to compliance_attestations table.
 */

import { NextRequest } from "next/server";
import { getCurrentEnrichmentAccount, AuthNotConfiguredError } from "@/lib/enrichment/auth";
import { createAttestation } from "@/lib/enrichment/compliance";
import { apiSuccess, apiError } from "@/lib/enrichment/api-response";
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
    // 1. Resolve account
    const account = await getCurrentEnrichmentAccount(request);

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

    // 3. Store attestation
    await createAttestation(account.accountId, request, ATTESTATION_TEXT);

    return apiSuccess({ attested: true });
  } catch (err) {
    if (err instanceof AuthNotConfiguredError) {
      return apiError("AUTH_NOT_CONFIGURED", err.message, 501);
    }
    console.error("[POST /api/enrichment/attest] Unhandled error:", err);
    return apiError("INTERNAL_ERROR", "An internal error occurred.", 500);
  }
}
