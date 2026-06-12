/**
 * Production safety guard for enrichment API routes.
 *
 * Every enrichment route handler must call assertEnrichmentRouteAllowed(request)
 * before doing any work. If the guard blocks, return the structured error response.
 *
 * Guard logic:
 * 1. If ENRICHMENT_FEATURE_ENABLED !== "true" → 503 FEATURE_DISABLED
 * 2. If production + mock mode + !allowMockInProduction → 403 MOCK_MODE_BLOCKED_IN_PRODUCTION
 * 3. If production + mock mode + allowMockInProduction → require x-enrichment-test-token header
 *    matching ENRICHMENT_ADMIN_TEST_TOKEN → 403 INVALID_TEST_TOKEN if mismatch
 */

import "server-only";

import { NextRequest } from "next/server";
import {
  getEnrichmentConfig,
  type EnrichmentGuardResult,
} from "./config";

/**
 * Evaluates whether an enrichment route request is allowed to proceed.
 *
 * Returns a typed result:
 * - `{ allowed: true }` → request may proceed
 * - `{ allowed: false, code, message, httpStatus }` → request must be blocked
 *
 * This function does NOT throw. The caller is responsible for converting
 * a blocked result into an apiError() response.
 */
export function getEnrichmentRouteGuardResult(request: NextRequest): EnrichmentGuardResult {
  const config = getEnrichmentConfig();

  // Gate 1: Feature must be explicitly enabled
  if (!config.featureEnabled) {
    return {
      allowed: false,
      code: "FEATURE_DISABLED",
      message:
        "The enrichment feature is not enabled on this server. " +
        "Set ENRICHMENT_FEATURE_ENABLED=true to enable.",
      httpStatus: 503,
    };
  }

  // Gate 2: Mock mode in production requires explicit opt-in
  const isProduction = config.nodeEnv === "production";
  if (isProduction && config.mockMode) {
    // Gate 2a: Must have ENRICHMENT_ALLOW_MOCK_IN_PRODUCTION=true
    if (!config.allowMockInProduction) {
      return {
        allowed: false,
        code: "MOCK_MODE_BLOCKED_IN_PRODUCTION",
        message:
          "Mock enrichment mode is blocked in production. " +
          "Either disable ENRICHMENT_MOCK_MODE or set ENRICHMENT_ALLOW_MOCK_IN_PRODUCTION=true " +
          "with a valid ENRICHMENT_ADMIN_TEST_TOKEN.",
        httpStatus: 403,
      };
    }

    // Gate 2b: Must provide valid test token
    if (!config.adminTestToken) {
      return {
        allowed: false,
        code: "MOCK_MODE_BLOCKED_IN_PRODUCTION",
        message:
          "Mock mode is allowed in production but ENRICHMENT_ADMIN_TEST_TOKEN is not configured. " +
          "Set ENRICHMENT_ADMIN_TEST_TOKEN to a secure random value.",
        httpStatus: 403,
      };
    }

    const providedToken = request.headers.get("x-enrichment-test-token");
    if (!providedToken || providedToken !== config.adminTestToken) {
      return {
        allowed: false,
        code: "INVALID_TEST_TOKEN",
        message:
          "Mock enrichment APIs in production require a valid x-enrichment-test-token header.",
        httpStatus: 403,
      };
    }
  }

  // All gates passed
  return { allowed: true };
}
