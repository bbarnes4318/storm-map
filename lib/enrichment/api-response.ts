/**
 * Shared API response helpers for enrichment route handlers.
 * Provides consistent JSON response envelopes with structured error codes.
 */

import { NextResponse } from "next/server";

export type EnrichmentErrorCode =
  | "AUTH_NOT_CONFIGURED"
  | "UNAUTHORIZED"
  | "COMPLIANCE_ATTESTATION_REQUIRED"
  | "INVALID_REQUEST"
  | "INSUFFICIENT_CREDITS"
  | "QUOTE_EXPIRED"
  | "QUOTE_NOT_FOUND"
  | "PROVIDER_NOT_CONFIGURED"
  | "PROVIDER_NO_MATCH"
  | "ENCRYPTION_NOT_CONFIGURED"
  | "IDEMPOTENCY_KEY_REQUIRED"
  | "INTERNAL_ERROR";

export interface EnrichmentApiErrorResponse {
  ok: false;
  error: EnrichmentErrorCode;
  message: string;
  details?: Record<string, unknown>;
  requestId?: string;
}

export interface EnrichmentApiSuccessResponse<T = Record<string, unknown>> {
  ok: true;
  data: T;
  requestId?: string;
}

/**
 * Returns a structured JSON success response.
 */
export function apiSuccess<T = Record<string, unknown>>(
  data: T,
  status = 200,
  requestId?: string
): NextResponse<EnrichmentApiSuccessResponse<T>> {
  return NextResponse.json({ ok: true, data, requestId }, { status });
}

/**
 * Returns a structured JSON error response.
 */
export function apiError(
  code: EnrichmentErrorCode,
  message: string,
  status: number,
  details?: Record<string, unknown>,
  requestId?: string
): NextResponse<EnrichmentApiErrorResponse> {
  return NextResponse.json(
    { ok: false, error: code, message, details, requestId },
    { status }
  );
}
