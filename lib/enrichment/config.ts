/**
 * Server-only enrichment feature configuration.
 *
 * Reads environment variables to determine:
 * - Whether the enrichment feature is enabled at all
 * - Whether mock mode is active
 * - Whether mock mode is allowed in production
 * - Admin test token for gated mock-in-production access
 *
 * !! NEVER expose these values to client code. !!
 * !! Do NOT use NEXT_PUBLIC_ prefixes for any of these. !!
 */

import "server-only";

// ==============================================================================
// Configuration
// ==============================================================================

export interface EnrichmentConfig {
  /** Whether the enrichment feature is enabled. Routes return 503 if false. */
  featureEnabled: boolean;

  /** Whether mock providers/stores are used instead of real ones. */
  mockMode: boolean;

  /** Whether mock mode is explicitly allowed in production (NODE_ENV=production). */
  allowMockInProduction: boolean;

  /** Optional admin test token required when mock mode runs in production. */
  adminTestToken: string | null;

  /** Current Node environment. */
  nodeEnv: string;
}

/**
 * Returns the resolved enrichment configuration from environment variables.
 *
 * This function is intentionally pure (reads process.env each call) so that
 * configuration changes are reflected without requiring a server restart in
 * development mode.
 */
export function getEnrichmentConfig(): EnrichmentConfig {
  return {
    featureEnabled: process.env.ENRICHMENT_FEATURE_ENABLED === "true",
    mockMode: process.env.ENRICHMENT_MOCK_MODE === "true",
    allowMockInProduction: process.env.ENRICHMENT_ALLOW_MOCK_IN_PRODUCTION === "true",
    adminTestToken: process.env.ENRICHMENT_ADMIN_TEST_TOKEN || null,
    nodeEnv: process.env.NODE_ENV || "development",
  };
}

// ==============================================================================
// Guard Error Codes
// ==============================================================================

export type EnrichmentGuardErrorCode =
  | "FEATURE_DISABLED"
  | "MOCK_MODE_BLOCKED_IN_PRODUCTION"
  | "INVALID_TEST_TOKEN";

export interface EnrichmentGuardBlock {
  allowed: false;
  code: EnrichmentGuardErrorCode;
  message: string;
  httpStatus: number;
}

export interface EnrichmentGuardPass {
  allowed: true;
}

export type EnrichmentGuardResult = EnrichmentGuardBlock | EnrichmentGuardPass;
