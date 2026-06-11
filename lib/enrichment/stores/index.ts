/**
 * Store resolver for the enrichment system.
 *
 * Returns the appropriate EnrichmentStore implementation based on environment:
 * - ENRICHMENT_MOCK_MODE=true → MockEnrichmentStore (in-memory)
 * - Otherwise → DrizzleEnrichmentStore (requires DATABASE_URL)
 *
 * API route handlers should call getEnrichmentStore() to obtain the store,
 * never importing mock or Drizzle stores directly.
 */

import "server-only";

import type { EnrichmentStore } from "./types";

// Re-export all store types for convenience
export type {
  EnrichmentStore,
  EnrichmentAccountStore,
  ComplianceStore,
  CreditLedgerStore,
  QuoteStore,
  UnlockStore,
  SuppressionStore,
  AuditLogStore,
  StoredAccount,
  StoredAttestation,
  StoredLedgerEntry,
  StoredQuote,
  StoredUnlock,
  StoredSuppression,
  StoredAuditLog,
  CreateAccountInput,
  CreateAttestationInput,
  CreateLedgerEntryInput,
  CreateQuoteInput,
  CreateUnlockInput,
  CreateAuditLogInput,
} from "./types";

// ==============================================================================
// Configuration Error
// ==============================================================================

export class StoreConfigurationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "StoreConfigurationError";
    Object.setPrototypeOf(this, StoreConfigurationError.prototype);
  }
}

// ==============================================================================
// Singleton Cache
// ==============================================================================

let _storeInstance: EnrichmentStore | null = null;
let _storeError: StoreConfigurationError | null = null;
let _initialized = false;

// ==============================================================================
// Store Resolver
// ==============================================================================

/**
 * Returns the configured EnrichmentStore instance.
 *
 * Behavior:
 * - If ENRICHMENT_MOCK_MODE=true, returns MockEnrichmentStore (always succeeds)
 * - If ENRICHMENT_MOCK_MODE is not true, returns DrizzleEnrichmentStore
 * - If DATABASE_URL is missing in non-mock mode, throws StoreConfigurationError
 *
 * The store is lazily initialized and cached as a singleton.
 * Subsequent calls return the same instance.
 *
 * @throws StoreConfigurationError if the store cannot be configured
 */
export function getEnrichmentStore(): EnrichmentStore {
  if (_initialized) {
    if (_storeError) throw _storeError;
    return _storeInstance!;
  }

  _initialized = true;

  const isMockMode = process.env.ENRICHMENT_MOCK_MODE === "true";

  if (isMockMode) {
    // Dynamic import to avoid loading mock code in production bundles
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { MockEnrichmentStore } = require("./mock-store-adapter") as typeof import("./mock-store-adapter");
    _storeInstance = new MockEnrichmentStore();
    console.info("[enrichment/stores] Using MockEnrichmentStore (ENRICHMENT_MOCK_MODE=true)");
    return _storeInstance;
  }

  // Non-mock mode: require real database
  try {
    // Dynamic import to avoid loading Drizzle in mock-only deployments
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { DrizzleEnrichmentStore } = require("./drizzle-store") as typeof import("./drizzle-store");
    _storeInstance = new DrizzleEnrichmentStore();
    console.info("[enrichment/stores] Using DrizzleEnrichmentStore (DATABASE_URL configured)");
    return _storeInstance;
  } catch (err) {
    const message =
      "Enrichment store is not configured. " +
      "Set DATABASE_URL for production, or set ENRICHMENT_MOCK_MODE=true for development. " +
      `Underlying error: ${err instanceof Error ? err.message : String(err)}`;
    _storeError = new StoreConfigurationError(message);
    throw _storeError;
  }
}

/**
 * Resets the cached store instance. Useful for testing.
 * Not intended for production use.
 */
export function resetStoreInstance(): void {
  _storeInstance = null;
  _storeError = null;
  _initialized = false;
}
