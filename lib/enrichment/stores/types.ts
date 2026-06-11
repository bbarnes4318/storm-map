/**
 * Unified store interfaces for the enrichment system.
 *
 * These interfaces define the persistence contract used by API route handlers.
 * Implementations include:
 * - MockEnrichmentStore (in-memory, for ENRICHMENT_MOCK_MODE=true)
 * - DrizzleEnrichmentStore (PostgreSQL via Drizzle ORM)
 *
 * Route handlers interact with these interfaces exclusively, never with
 * raw Drizzle queries or in-memory Maps directly.
 */

import { DataProductType, CreditTransactionType } from "../schemas";

// ==============================================================================
// Shared Value Types
// ==============================================================================

export interface StoredAccount {
  id: string;
  authProvider: string;
  authUserId: string;
  email: string;
  creditBalance: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface StoredAttestation {
  id: string;
  accountId: string;
  attestedAt: Date;
  ipAddress: string;
  userAgent: string;
  attestationText: string;
}

export interface StoredLedgerEntry {
  id: string;
  accountId: string;
  amount: number;
  txType: CreditTransactionType;
  idempotencyKey: string;
  referenceId: string | null;
  description: string | null;
  createdAt: Date;
}

export interface StoredQuote {
  id: string;
  accountId: string;
  propertyHash: string;
  latitude: number;
  longitude: number;
  addressText: string;
  productType: DataProductType;
  creditCost: number;
  expiresAt: Date;
  createdAt: Date;
}

export interface StoredUnlock {
  id: string;
  accountId: string;
  propertyHash: string;
  latitude: number;
  longitude: number;
  addressText: string;
  productType: DataProductType;
  providerSource: string;
  providerRequestId: string | null;
  providerCostEstimate: number;
  creditsCharged: number;
  isCached: boolean;
  propertyProfilePayload: Record<string, unknown> | null;
  encryptedContactPayload: string | null;
  createdAt: Date;
}

export interface StoredSuppression {
  id: string;
  supType: "PHONE" | "EMAIL" | "ADDRESS";
  valueHash: string;
  reason: string | null;
  createdAt: Date;
}

export interface StoredAuditLog {
  id: string;
  accountId: string | null;
  action: string;
  ipAddress: string;
  userAgent: string;
  metadata: Record<string, unknown> | null;
  createdAt: Date;
}

// ==============================================================================
// Input Types (for create operations)
// ==============================================================================

export interface CreateAccountInput {
  authProvider: string;
  authUserId: string;
  email: string;
  creditBalance?: number;
}

export interface CreateAttestationInput {
  accountId: string;
  ipAddress: string;
  userAgent: string;
  attestationText: string;
}

export interface CreateLedgerEntryInput {
  accountId: string;
  amount: number;
  txType: CreditTransactionType;
  idempotencyKey: string;
  referenceId?: string | null;
  description?: string | null;
}

export interface CreateQuoteInput {
  accountId: string;
  propertyHash: string;
  latitude: number;
  longitude: number;
  addressText: string;
  productType: DataProductType;
  creditCost: number;
  expiresAt: Date;
}

export interface CreateUnlockInput {
  accountId: string;
  propertyHash: string;
  latitude: number;
  longitude: number;
  addressText: string;
  productType: DataProductType;
  providerSource: string;
  providerRequestId?: string | null;
  providerCostEstimate?: number;
  creditsCharged: number;
  isCached?: boolean;
  propertyProfilePayload?: Record<string, unknown> | null;
  encryptedContactPayload?: string | null;
}

export interface CreateAuditLogInput {
  accountId?: string | null;
  action: string;
  ipAddress: string;
  userAgent: string;
  metadata?: Record<string, unknown> | null;
}

// ==============================================================================
// Store Interfaces
// ==============================================================================

export interface EnrichmentAccountStore {
  getAccountById(accountId: string): Promise<StoredAccount | null>;
  getAccountByAuthIdentity(authProvider: string, authUserId: string): Promise<StoredAccount | null>;
  upsertAccountFromAuthIdentity(input: CreateAccountInput): Promise<StoredAccount>;
  getCreditBalance(accountId: string): Promise<number | null>;
  updateCreditBalance(accountId: string, newBalance: number): Promise<void>;
}

export interface ComplianceStore {
  createAttestation(input: CreateAttestationInput): Promise<StoredAttestation>;
  getLatestAttestation(accountId: string): Promise<StoredAttestation | null>;
  hasRecentAttestation(accountId: string, maxAgeMs?: number): Promise<boolean>;
}

export interface CreditLedgerStore {
  getLedgerEntryByIdempotencyKey(idempotencyKey: string): Promise<StoredLedgerEntry | null>;
  insertLedgerEntry(input: CreateLedgerEntryInput): Promise<StoredLedgerEntry>;
  updateAccountCreditBalance(accountId: string, newBalance: number): Promise<void>;
  getAccountById(accountId: string): Promise<StoredAccount | null>;
}

export interface QuoteStore {
  createQuote(input: CreateQuoteInput): Promise<StoredQuote>;
  getQuoteById(quoteId: string): Promise<StoredQuote | null>;
  isQuoteExpired(quote: StoredQuote): boolean;
}

export interface UnlockStore {
  getUnlockById(unlockId: string): Promise<StoredUnlock | null>;
  getUnlockByAccountPropertyProduct(
    accountId: string,
    propertyHash: string,
    productType: DataProductType
  ): Promise<StoredUnlock | null>;
  createUnlock(input: CreateUnlockInput): Promise<StoredUnlock>;
}

export interface SuppressionStore {
  getSuppressedHashes(hashes: string[]): Promise<Set<string>>;
  isSuppressed(type: "PHONE" | "EMAIL" | "ADDRESS", hash: string): Promise<boolean>;
}

export interface AuditLogStore {
  createAuditLog(input: CreateAuditLogInput): Promise<StoredAuditLog>;
}

// ==============================================================================
// Combined Store
// ==============================================================================

/**
 * The unified enrichment store providing access to all domain sub-stores
 * and transactional capabilities.
 */
export interface EnrichmentStore {
  accounts: EnrichmentAccountStore;
  compliance: ComplianceStore;
  ledger: CreditLedgerStore;
  quotes: QuoteStore;
  unlocks: UnlockStore;
  suppression: SuppressionStore;
  audit: AuditLogStore;

  /**
   * Executes a callback within a database transaction.
   * In mock mode, provides snapshot-based rollback.
   * In Drizzle mode, wraps a real PostgreSQL transaction.
   */
  runInTransaction<T>(callback: (store: EnrichmentStore) => Promise<T>): Promise<T>;
}
