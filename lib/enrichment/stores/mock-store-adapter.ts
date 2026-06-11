/**
 * In-memory mock implementation of the EnrichmentStore interface.
 *
 * !! DEVELOPMENT / MOCK-MODE ONLY !!
 * All state is ephemeral and lost on server restart.
 *
 * This adapter wraps the existing mock-store.ts maps and MemoryCreditLedgerStore
 * to conform to the unified EnrichmentStore interface. It allows API routes
 * to use the store abstraction in mock mode without any database.
 */

// SERVER-ONLY: Must only be imported by server-side code.

import {
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
import { DataProductType } from "../schemas";

// ==============================================================================
// In-memory Maps
// ==============================================================================

const accounts = new Map<string, StoredAccount>();
const attestations = new Map<string, StoredAttestation[]>(); // keyed by accountId
const ledgerByIdempotency = new Map<string, StoredLedgerEntry>();
const quotes = new Map<string, StoredQuote>();
const unlocks = new Map<string, StoredUnlock>();
const unlocksByComposite = new Map<string, StoredUnlock>(); // key: accountId|propertyHash|productType
const suppressions = new Map<string, StoredSuppression>(); // keyed by valueHash
const auditLogs: StoredAuditLog[] = [];

// Seed the deterministic mock account
const MOCK_ACCOUNT_ID = "00000000-0000-4000-a000-000000000001";
if (!accounts.has(MOCK_ACCOUNT_ID)) {
  accounts.set(MOCK_ACCOUNT_ID, {
    id: MOCK_ACCOUNT_ID,
    authProvider: "mock",
    authUserId: "mock-user",
    email: "mock-user@storm-map.local",
    creditBalance: 1000,
    createdAt: new Date(),
    updatedAt: new Date(),
  });
}

function generateId(): string {
  return typeof crypto !== "undefined" && crypto.randomUUID
    ? crypto.randomUUID()
    : `mock-${Math.random().toString(36).substring(2, 11)}`;
}

// ==============================================================================
// Account Store
// ==============================================================================

class MockAccountStore implements EnrichmentAccountStore {
  async getAccountById(accountId: string): Promise<StoredAccount | null> {
    return accounts.get(accountId) ?? null;
  }

  async getAccountByAuthIdentity(authProvider: string, authUserId: string): Promise<StoredAccount | null> {
    for (const acc of accounts.values()) {
      if (acc.authProvider === authProvider && acc.authUserId === authUserId) return acc;
    }
    return null;
  }

  async upsertAccountFromAuthIdentity(input: CreateAccountInput): Promise<StoredAccount> {
    const existing = await this.getAccountByAuthIdentity(input.authProvider, input.authUserId);
    if (existing) {
      existing.email = input.email;
      existing.updatedAt = new Date();
      return existing;
    }
    const account: StoredAccount = {
      id: generateId(),
      authProvider: input.authProvider,
      authUserId: input.authUserId,
      email: input.email,
      creditBalance: input.creditBalance ?? 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    accounts.set(account.id, account);
    return account;
  }

  async getCreditBalance(accountId: string): Promise<number | null> {
    const acc = accounts.get(accountId);
    return acc ? acc.creditBalance : null;
  }

  async updateCreditBalance(accountId: string, newBalance: number): Promise<void> {
    const acc = accounts.get(accountId);
    if (!acc) throw new Error(`Mock account ${accountId} not found`);
    acc.creditBalance = newBalance;
    acc.updatedAt = new Date();
  }
}

// ==============================================================================
// Compliance Store
// ==============================================================================

const DEFAULT_ATTESTATION_MAX_AGE_MS = 24 * 60 * 60 * 1000;

class MockComplianceStore implements ComplianceStore {
  async createAttestation(input: CreateAttestationInput): Promise<StoredAttestation> {
    const att: StoredAttestation = {
      id: generateId(),
      accountId: input.accountId,
      attestedAt: new Date(),
      ipAddress: input.ipAddress,
      userAgent: input.userAgent,
      attestationText: input.attestationText,
    };
    const list = attestations.get(input.accountId) ?? [];
    list.push(att);
    attestations.set(input.accountId, list);
    return att;
  }

  async getLatestAttestation(accountId: string): Promise<StoredAttestation | null> {
    const list = attestations.get(accountId);
    if (!list || list.length === 0) return null;
    return list[list.length - 1];
  }

  async hasRecentAttestation(accountId: string, maxAgeMs?: number): Promise<boolean> {
    const latest = await this.getLatestAttestation(accountId);
    if (!latest) return false;
    const age = Date.now() - latest.attestedAt.getTime();
    return age < (maxAgeMs ?? DEFAULT_ATTESTATION_MAX_AGE_MS);
  }
}

// ==============================================================================
// Credit Ledger Store
// ==============================================================================

class MockCreditLedgerStore implements CreditLedgerStore {
  async getAccountById(accountId: string): Promise<StoredAccount | null> {
    return accounts.get(accountId) ?? null;
  }

  async getLedgerEntryByIdempotencyKey(idempotencyKey: string): Promise<StoredLedgerEntry | null> {
    return ledgerByIdempotency.get(idempotencyKey) ?? null;
  }

  async insertLedgerEntry(input: CreateLedgerEntryInput): Promise<StoredLedgerEntry> {
    const entry: StoredLedgerEntry = {
      id: generateId(),
      accountId: input.accountId,
      amount: input.amount,
      txType: input.txType,
      idempotencyKey: input.idempotencyKey,
      referenceId: input.referenceId ?? null,
      description: input.description ?? null,
      createdAt: new Date(),
    };
    ledgerByIdempotency.set(input.idempotencyKey, entry);
    return entry;
  }

  async updateAccountCreditBalance(accountId: string, newBalance: number): Promise<void> {
    const acc = accounts.get(accountId);
    if (!acc) throw new Error(`Mock account ${accountId} not found`);
    acc.creditBalance = newBalance;
    acc.updatedAt = new Date();
  }
}

// ==============================================================================
// Quote Store
// ==============================================================================

class MockQuoteStore implements QuoteStore {
  async createQuote(input: CreateQuoteInput): Promise<StoredQuote> {
    const quote: StoredQuote = {
      id: generateId(),
      accountId: input.accountId,
      propertyHash: input.propertyHash,
      latitude: input.latitude,
      longitude: input.longitude,
      addressText: input.addressText,
      productType: input.productType,
      creditCost: input.creditCost,
      expiresAt: input.expiresAt,
      createdAt: new Date(),
    };
    quotes.set(quote.id, quote);
    return quote;
  }

  async getQuoteById(quoteId: string): Promise<StoredQuote | null> {
    return quotes.get(quoteId) ?? null;
  }

  isQuoteExpired(quote: StoredQuote): boolean {
    return new Date() > quote.expiresAt;
  }
}

// ==============================================================================
// Unlock Store
// ==============================================================================

class MockUnlockStore implements UnlockStore {
  async getUnlockById(unlockId: string): Promise<StoredUnlock | null> {
    return unlocks.get(unlockId) ?? null;
  }

  async getUnlockByAccountPropertyProduct(
    accountId: string,
    propertyHash: string,
    productType: DataProductType
  ): Promise<StoredUnlock | null> {
    const key = `${accountId}|${propertyHash}|${productType}`;
    return unlocksByComposite.get(key) ?? null;
  }

  async createUnlock(input: CreateUnlockInput): Promise<StoredUnlock> {
    const unlock: StoredUnlock = {
      id: generateId(),
      accountId: input.accountId,
      propertyHash: input.propertyHash,
      latitude: input.latitude,
      longitude: input.longitude,
      addressText: input.addressText,
      productType: input.productType,
      providerSource: input.providerSource,
      providerRequestId: input.providerRequestId ?? null,
      providerCostEstimate: input.providerCostEstimate ?? 0,
      creditsCharged: input.creditsCharged,
      isCached: input.isCached ?? false,
      propertyProfilePayload: input.propertyProfilePayload ?? null,
      encryptedContactPayload: input.encryptedContactPayload ?? null,
      createdAt: new Date(),
    };
    unlocks.set(unlock.id, unlock);
    const compositeKey = `${input.accountId}|${input.propertyHash}|${input.productType}`;
    unlocksByComposite.set(compositeKey, unlock);
    return unlock;
  }
}

// ==============================================================================
// Suppression Store
// ==============================================================================

class MockSuppressionStore implements SuppressionStore {
  async getSuppressedHashes(hashes: string[]): Promise<Set<string>> {
    const result = new Set<string>();
    for (const hash of hashes) {
      if (suppressions.has(hash)) result.add(hash);
    }
    return result;
  }

  async isSuppressed(_type: "PHONE" | "EMAIL" | "ADDRESS", hash: string): Promise<boolean> {
    return suppressions.has(hash);
  }
}

// ==============================================================================
// Audit Log Store
// ==============================================================================

class MockAuditLogStore implements AuditLogStore {
  async createAuditLog(input: CreateAuditLogInput): Promise<StoredAuditLog> {
    const log: StoredAuditLog = {
      id: generateId(),
      accountId: input.accountId ?? null,
      action: input.action,
      ipAddress: input.ipAddress,
      userAgent: input.userAgent,
      metadata: input.metadata ?? null,
      createdAt: new Date(),
    };
    auditLogs.push(log);
    return log;
  }
}

// ==============================================================================
// Combined Mock Enrichment Store
// ==============================================================================

export class MockEnrichmentStore implements EnrichmentStore {
  accounts = new MockAccountStore();
  compliance = new MockComplianceStore();
  ledger = new MockCreditLedgerStore();
  quotes = new MockQuoteStore();
  unlocks = new MockUnlockStore();
  suppression = new MockSuppressionStore();
  audit = new MockAuditLogStore();

  async runInTransaction<T>(callback: (store: EnrichmentStore) => Promise<T>): Promise<T> {
    // Mock transactions: no real rollback, just execute.
    // The MemoryCreditLedgerStore has its own snapshot-based rollback for ledger ops.
    // For the full store, mock mode accepts eventual consistency.
    return callback(this);
  }
}
