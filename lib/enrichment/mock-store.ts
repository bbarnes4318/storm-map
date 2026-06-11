/**
 * @deprecated Phase 1G — This module is superseded by lib/enrichment/stores/.
 * All API routes now use getEnrichmentStore() from lib/enrichment/stores/index.ts.
 * The MockEnrichmentStore in stores/mock-store-adapter.ts replaces this module.
 * This file is retained only for reference. Do not import in new code.
 *
 * Original purpose:
 * Centralized in-memory mock stores for enrichment API routes.
 *
 * !! DEVELOPMENT / MOCK-MODE ONLY !!
 * This module is NOT production persistence. All state held here is
 * ephemeral and lost on server restart.
 */

// NOTE: This module is server-only. It must only be imported by server-side
// API route handlers or other lib/ modules. Do not import from client components.
// The `server-only` package is not currently installed; server-only enforcement
// is structural (only imported by app/api/** route files).

import { DataProductType } from "./schemas";
import { MemoryCreditLedgerStore } from "./ledger-memory-store";
import { Account } from "./ledger";

// ==============================================================================
// 1. Mock Account Constants
// ==============================================================================

/** The deterministic mock account UUID, matching auth.ts MOCK_ACCOUNT. */
export const MOCK_ACCOUNT_ID = "00000000-0000-4000-a000-000000000001";

// ==============================================================================
// 2. Mock Quote Store
// ==============================================================================

/**
 * Represents a stored enrichment quote.
 * In production, this will be a row in the enrichment_quotes table.
 */
export interface StoredQuote {
  quoteId: string;
  accountId: string;
  propertyHash: string;
  address: string;
  latitude: number;
  longitude: number;
  productType: DataProductType;
  creditCost: number;
  expiresAt: Date;
  createdAt: Date;
}

/** In-memory quote store keyed by quoteId. */
const mockQuoteStore = new Map<string, StoredQuote>();

/** Saves a quote to the mock store. */
export function saveMockQuote(quote: StoredQuote): void {
  mockQuoteStore.set(quote.quoteId, quote);
}

/** Retrieves a quote from the mock store by quoteId. */
export function getMockQuote(quoteId: string): StoredQuote | undefined {
  return mockQuoteStore.get(quoteId);
}

// ==============================================================================
// 3. Mock Unlock Cache (Idempotency)
// ==============================================================================

/** Cached result of a completed unlock, keyed by Idempotency-Key header. */
export interface CachedUnlock {
  unlockId: string;
  productType: DataProductType;
  creditsCharged: number;
  providerSource: string;
  providerRequestId?: string;
  providerCostEstimate?: number;
  result: Record<string, unknown>;
}

/** In-memory unlock cache keyed by idempotency key. */
const mockUnlockCache = new Map<string, CachedUnlock>();

/** Saves a completed unlock for idempotent replay. */
export function saveMockUnlock(idempotencyKey: string, unlock: CachedUnlock): void {
  mockUnlockCache.set(idempotencyKey, unlock);
}

/** Retrieves a cached unlock by idempotency key. */
export function getMockUnlock(idempotencyKey: string): CachedUnlock | undefined {
  return mockUnlockCache.get(idempotencyKey);
}

// ==============================================================================
// 4. Mock Credit Ledger Store (Singleton)
// ==============================================================================

/**
 * Singleton in-memory credit ledger store.
 * Pre-seeded with the mock account holding 1000 starter credits.
 *
 * In production, the ledger will be backed by the credit_ledger and
 * accounts tables via a DrizzleCreditLedgerStore implementation.
 */
const mockLedgerStore = new MemoryCreditLedgerStore();

const mockAccount: Account = {
  id: MOCK_ACCOUNT_ID,
  authProvider: "mock",
  authUserId: "mock-user",
  email: "mock-user@storm-map.local",
  creditBalance: 1000,
  createdAt: new Date(),
  updatedAt: new Date(),
};
mockLedgerStore.seedAccount(mockAccount);

/** Returns the singleton mock ledger store instance. */
export function getMockLedgerStore(): MemoryCreditLedgerStore {
  return mockLedgerStore;
}
