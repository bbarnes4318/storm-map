/**
 * Drizzle ORM implementation of the EnrichmentStore interface.
 *
 * Uses the Drizzle schema from lib/db/schema/enrichment.ts and the
 * database client from lib/db/client.ts to provide real PostgreSQL
 * persistence for all enrichment domain stores.
 *
 * IMPORTANT:
 * - This module does NOT create tables or run migrations.
 * - Tables must exist before any queries will succeed.
 * - If getDbClient() returns null, construction will throw.
 * - This module must only be imported by server-side code.
 *
 * TRANSACTION DESIGN (Phase 1G):
 * - runInTransaction() uses Drizzle's db.transaction() API to wrap the
 *   callback in a real PostgreSQL transaction with automatic rollback.
 * - The callback receives a new DrizzleEnrichmentStore instance backed
 *   by the transaction handle (tx), so all sub-store operations within
 *   the callback share the same transaction scope.
 * - All sub-store classes accept a DbOrTx parameter (NodePgDatabase)
 *   which can be either the root db client or a transaction handle.
 */

import "server-only";

import { eq, and, desc, inArray, sql } from "drizzle-orm";
import type { NodePgDatabase } from "drizzle-orm/node-postgres";
import { getDbClient } from "../../db/client";
import {
  accounts as accountsTable,
  complianceAttestations,
  creditLedger,
  enrichmentQuotes,
  enrichmentUnlocks,
  suppressionList,
  auditLogs as auditLogsTable,
} from "../../db/schema/enrichment";
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
  StoredAuditLog,
  CreateAccountInput,
  CreateAttestationInput,
  CreateLedgerEntryInput,
  CreateQuoteInput,
  CreateUnlockInput,
  CreateAuditLogInput,
} from "./types";
import { DataProductType, CreditTransactionType } from "../schemas";

// ==============================================================================
// Types
// ==============================================================================

/**
 * Union type: either the root Drizzle db client or a transaction handle.
 * Both share the same query API surface, so sub-stores can accept either.
 */
type DbOrTx = NodePgDatabase;

// ==============================================================================
// Configuration Error
// ==============================================================================

export class DrizzleStoreNotConfiguredError extends Error {
  constructor() {
    super(
      "DrizzleEnrichmentStore requires DATABASE_URL to be configured. " +
      "Set DATABASE_URL in your environment, or use ENRICHMENT_MOCK_MODE=true for development."
    );
    this.name = "DrizzleStoreNotConfiguredError";
    Object.setPrototypeOf(this, DrizzleStoreNotConfiguredError.prototype);
  }
}

// ==============================================================================
// Centralized Decimal Parsing
// ==============================================================================

/**
 * Safely parses a Drizzle decimal column value (returned as string) to a number.
 * Returns 0 if the value is null, undefined, or not a valid number.
 */
function safeParseDecimal(value: string | number | null | undefined): number {
  if (value === null || value === undefined) return 0;
  const parsed = typeof value === "number" ? value : parseFloat(String(value));
  return Number.isFinite(parsed) ? parsed : 0;
}

// ==============================================================================
// Row-to-Type Mappers
// ==============================================================================

function mapAccount(row: typeof accountsTable.$inferSelect): StoredAccount {
  return {
    id: row.id,
    authProvider: row.authProvider,
    authUserId: row.authUserId,
    email: row.email,
    creditBalance: row.creditBalance,
    createdAt: row.createdAt,
    updatedAt: row.updatedAt,
  };
}

function mapAttestation(row: typeof complianceAttestations.$inferSelect): StoredAttestation {
  return {
    id: row.id,
    accountId: row.accountId,
    attestedAt: row.attestedAt,
    ipAddress: row.ipAddress,
    userAgent: row.userAgent,
    attestationText: row.attestationText,
  };
}

function mapLedgerEntry(row: typeof creditLedger.$inferSelect): StoredLedgerEntry {
  return {
    id: row.id,
    accountId: row.accountId,
    amount: row.amount,
    txType: row.txType as CreditTransactionType,
    idempotencyKey: row.idempotencyKey,
    referenceId: row.referenceId ?? null,
    description: row.description ?? null,
    createdAt: row.createdAt,
  };
}

function mapQuote(row: typeof enrichmentQuotes.$inferSelect): StoredQuote {
  return {
    id: row.id,
    accountId: row.accountId,
    propertyHash: row.propertyHash,
    latitude: safeParseDecimal(row.latitude),
    longitude: safeParseDecimal(row.longitude),
    addressText: row.addressText,
    productType: row.productType as DataProductType,
    creditCost: row.creditCost,
    expiresAt: row.expiresAt,
    createdAt: row.createdAt,
  };
}

function mapUnlock(row: typeof enrichmentUnlocks.$inferSelect): StoredUnlock {
  return {
    id: row.id,
    accountId: row.accountId,
    propertyHash: row.propertyHash,
    latitude: safeParseDecimal(row.latitude),
    longitude: safeParseDecimal(row.longitude),
    addressText: row.addressText,
    productType: row.productType as DataProductType,
    providerSource: row.providerSource,
    providerRequestId: row.providerRequestId ?? null,
    providerCostEstimate: safeParseDecimal(row.providerCostEstimate),
    creditsCharged: row.creditsCharged,
    isCached: row.isCached,
    propertyProfilePayload: (row.propertyProfilePayload as Record<string, unknown>) ?? null,
    encryptedContactPayload: row.encryptedContactPayload ?? null,
    createdAt: row.createdAt,
  };
}

function mapAuditLog(row: typeof auditLogsTable.$inferSelect): StoredAuditLog {
  return {
    id: row.id,
    accountId: row.accountId ?? null,
    action: row.action,
    ipAddress: row.ipAddress,
    userAgent: row.userAgent,
    metadata: (row.metadata as Record<string, unknown>) ?? null,
    createdAt: row.createdAt,
  };
}

// ==============================================================================
// Drizzle Account Store
// ==============================================================================

class DrizzleAccountStore implements EnrichmentAccountStore {
  constructor(private db: DbOrTx) {}

  async getAccountById(accountId: string): Promise<StoredAccount | null> {
    const rows = await this.db
      .select()
      .from(accountsTable)
      .where(eq(accountsTable.id, accountId))
      .limit(1);
    return rows.length > 0 ? mapAccount(rows[0]) : null;
  }

  async getAccountByAuthIdentity(authProvider: string, authUserId: string): Promise<StoredAccount | null> {
    const rows = await this.db
      .select()
      .from(accountsTable)
      .where(
        and(
          eq(accountsTable.authProvider, authProvider),
          eq(accountsTable.authUserId, authUserId)
        )
      )
      .limit(1);
    return rows.length > 0 ? mapAccount(rows[0]) : null;
  }

  async upsertAccountFromAuthIdentity(input: CreateAccountInput): Promise<StoredAccount> {
    const existing = await this.getAccountByAuthIdentity(input.authProvider, input.authUserId);
    if (existing) {
      await this.db
        .update(accountsTable)
        .set({ email: input.email, updatedAt: new Date() })
        .where(eq(accountsTable.id, existing.id));
      return { ...existing, email: input.email, updatedAt: new Date() };
    }
    const rows = await this.db
      .insert(accountsTable)
      .values({
        authProvider: input.authProvider,
        authUserId: input.authUserId,
        email: input.email,
        creditBalance: input.creditBalance ?? 0,
      })
      .returning();
    return mapAccount(rows[0]);
  }

  async getCreditBalance(accountId: string): Promise<number | null> {
    const acc = await this.getAccountById(accountId);
    return acc ? acc.creditBalance : null;
  }

  async updateCreditBalance(accountId: string, newBalance: number): Promise<void> {
    await this.db
      .update(accountsTable)
      .set({ creditBalance: newBalance, updatedAt: new Date() })
      .where(eq(accountsTable.id, accountId));
  }
}

// ==============================================================================
// Drizzle Compliance Store
// ==============================================================================

const DEFAULT_ATTESTATION_MAX_AGE_MS = 24 * 60 * 60 * 1000;

class DrizzleComplianceStore implements ComplianceStore {
  constructor(private db: DbOrTx) {}

  async createAttestation(input: CreateAttestationInput): Promise<StoredAttestation> {
    const rows = await this.db
      .insert(complianceAttestations)
      .values({
        accountId: input.accountId,
        ipAddress: input.ipAddress,
        userAgent: input.userAgent,
        attestationText: input.attestationText,
      })
      .returning();
    return mapAttestation(rows[0]);
  }

  async getLatestAttestation(accountId: string): Promise<StoredAttestation | null> {
    const rows = await this.db
      .select()
      .from(complianceAttestations)
      .where(eq(complianceAttestations.accountId, accountId))
      .orderBy(desc(complianceAttestations.attestedAt))
      .limit(1);
    return rows.length > 0 ? mapAttestation(rows[0]) : null;
  }

  async hasRecentAttestation(accountId: string, maxAgeMs?: number): Promise<boolean> {
    const maxAge = maxAgeMs ?? DEFAULT_ATTESTATION_MAX_AGE_MS;
    const cutoff = new Date(Date.now() - maxAge);
    const rows = await this.db
      .select({ id: complianceAttestations.id })
      .from(complianceAttestations)
      .where(
        and(
          eq(complianceAttestations.accountId, accountId),
          sql`${complianceAttestations.attestedAt} > ${cutoff}`
        )
      )
      .limit(1);
    return rows.length > 0;
  }
}

// ==============================================================================
// Drizzle Credit Ledger Store
// ==============================================================================

class DrizzleCreditLedgerStore implements CreditLedgerStore {
  constructor(private db: DbOrTx) {}

  async getAccountById(accountId: string): Promise<StoredAccount | null> {
    const rows = await this.db
      .select()
      .from(accountsTable)
      .where(eq(accountsTable.id, accountId))
      .limit(1);
    return rows.length > 0 ? mapAccount(rows[0]) : null;
  }

  async getLedgerEntryByIdempotencyKey(idempotencyKey: string): Promise<StoredLedgerEntry | null> {
    const rows = await this.db
      .select()
      .from(creditLedger)
      .where(eq(creditLedger.idempotencyKey, idempotencyKey))
      .limit(1);
    return rows.length > 0 ? mapLedgerEntry(rows[0]) : null;
  }

  async insertLedgerEntry(input: CreateLedgerEntryInput): Promise<StoredLedgerEntry> {
    const rows = await this.db
      .insert(creditLedger)
      .values({
        accountId: input.accountId,
        amount: input.amount,
        txType: input.txType,
        idempotencyKey: input.idempotencyKey,
        referenceId: input.referenceId ?? undefined,
        description: input.description ?? undefined,
      })
      .returning();
    return mapLedgerEntry(rows[0]);
  }

  async updateAccountCreditBalance(accountId: string, newBalance: number): Promise<void> {
    await this.db
      .update(accountsTable)
      .set({ creditBalance: newBalance, updatedAt: new Date() })
      .where(eq(accountsTable.id, accountId));
  }
}

// ==============================================================================
// Drizzle Quote Store
// ==============================================================================

class DrizzleQuoteStore implements QuoteStore {
  constructor(private db: DbOrTx) {}

  async createQuote(input: CreateQuoteInput): Promise<StoredQuote> {
    const rows = await this.db
      .insert(enrichmentQuotes)
      .values({
        accountId: input.accountId,
        propertyHash: input.propertyHash,
        latitude: String(input.latitude),
        longitude: String(input.longitude),
        addressText: input.addressText,
        productType: input.productType,
        creditCost: input.creditCost,
        expiresAt: input.expiresAt,
      })
      .returning();
    return mapQuote(rows[0]);
  }

  async getQuoteById(quoteId: string): Promise<StoredQuote | null> {
    const rows = await this.db
      .select()
      .from(enrichmentQuotes)
      .where(eq(enrichmentQuotes.id, quoteId))
      .limit(1);
    return rows.length > 0 ? mapQuote(rows[0]) : null;
  }

  isQuoteExpired(quote: StoredQuote): boolean {
    return new Date() > quote.expiresAt;
  }
}

// ==============================================================================
// Drizzle Unlock Store
// ==============================================================================

class DrizzleUnlockStore implements UnlockStore {
  constructor(private db: DbOrTx) {}

  async getUnlockById(unlockId: string): Promise<StoredUnlock | null> {
    const rows = await this.db
      .select()
      .from(enrichmentUnlocks)
      .where(eq(enrichmentUnlocks.id, unlockId))
      .limit(1);
    return rows.length > 0 ? mapUnlock(rows[0]) : null;
  }

  async getUnlockByAccountPropertyProduct(
    accountId: string,
    propertyHash: string,
    productType: DataProductType
  ): Promise<StoredUnlock | null> {
    const rows = await this.db
      .select()
      .from(enrichmentUnlocks)
      .where(
        and(
          eq(enrichmentUnlocks.accountId, accountId),
          eq(enrichmentUnlocks.propertyHash, propertyHash),
          eq(enrichmentUnlocks.productType, productType)
        )
      )
      .limit(1);
    return rows.length > 0 ? mapUnlock(rows[0]) : null;
  }

  async createUnlock(input: CreateUnlockInput): Promise<StoredUnlock> {
    const rows = await this.db
      .insert(enrichmentUnlocks)
      .values({
        accountId: input.accountId,
        propertyHash: input.propertyHash,
        latitude: String(input.latitude),
        longitude: String(input.longitude),
        addressText: input.addressText,
        productType: input.productType,
        providerSource: input.providerSource,
        providerRequestId: input.providerRequestId ?? undefined,
        providerCostEstimate: String(input.providerCostEstimate ?? 0),
        creditsCharged: input.creditsCharged,
        isCached: input.isCached ?? false,
        propertyProfilePayload: input.propertyProfilePayload ?? undefined,
        encryptedContactPayload: input.encryptedContactPayload ?? undefined,
      })
      .returning();
    return mapUnlock(rows[0]);
  }
}

// ==============================================================================
// Drizzle Suppression Store
// ==============================================================================

class DrizzleSuppressionStore implements SuppressionStore {
  constructor(private db: DbOrTx) {}

  async getSuppressedHashes(hashes: string[]): Promise<Set<string>> {
    if (hashes.length === 0) return new Set();
    const rows = await this.db
      .select({ valueHash: suppressionList.valueHash })
      .from(suppressionList)
      .where(inArray(suppressionList.valueHash, hashes));
    return new Set(rows.map((r) => r.valueHash));
  }

  async isSuppressed(_type: "PHONE" | "EMAIL" | "ADDRESS", hash: string): Promise<boolean> {
    const rows = await this.db
      .select({ id: suppressionList.id })
      .from(suppressionList)
      .where(eq(suppressionList.valueHash, hash))
      .limit(1);
    return rows.length > 0;
  }
}

// ==============================================================================
// Drizzle Audit Log Store
// ==============================================================================

class DrizzleAuditLogStore implements AuditLogStore {
  constructor(private db: DbOrTx) {}

  async createAuditLog(input: CreateAuditLogInput): Promise<StoredAuditLog> {
    const rows = await this.db
      .insert(auditLogsTable)
      .values({
        accountId: input.accountId ?? undefined,
        action: input.action,
        ipAddress: input.ipAddress,
        userAgent: input.userAgent,
        metadata: input.metadata ?? undefined,
      })
      .returning();
    return mapAuditLog(rows[0]);
  }
}

// ==============================================================================
// Combined Drizzle Enrichment Store
// ==============================================================================

export class DrizzleEnrichmentStore implements EnrichmentStore {
  private db: DbOrTx;
  private isTransactionScoped: boolean;

  accounts: EnrichmentAccountStore;
  compliance: ComplianceStore;
  ledger: CreditLedgerStore;
  quotes: QuoteStore;
  unlocks: UnlockStore;
  suppression: SuppressionStore;
  audit: AuditLogStore;

  /**
   * Creates a DrizzleEnrichmentStore.
   *
   * @param dbOverride - If provided, uses this db/tx handle instead of
   *   calling getDbClient(). Used internally when creating a
   *   transaction-scoped store instance.
   */
  constructor(dbOverride?: DbOrTx) {
    if (dbOverride) {
      this.db = dbOverride;
      this.isTransactionScoped = true;
    } else {
      const client = getDbClient();
      if (!client) {
        throw new DrizzleStoreNotConfiguredError();
      }
      this.db = client;
      this.isTransactionScoped = false;
    }

    this.accounts = new DrizzleAccountStore(this.db);
    this.compliance = new DrizzleComplianceStore(this.db);
    this.ledger = new DrizzleCreditLedgerStore(this.db);
    this.quotes = new DrizzleQuoteStore(this.db);
    this.unlocks = new DrizzleUnlockStore(this.db);
    this.suppression = new DrizzleSuppressionStore(this.db);
    this.audit = new DrizzleAuditLogStore(this.db);
  }

  /**
   * Executes the callback within a real PostgreSQL transaction.
   *
   * The callback receives a new DrizzleEnrichmentStore backed by the
   * transaction handle (tx). All sub-store reads and writes within the
   * callback share the same transaction scope. If the callback throws,
   * the transaction is automatically rolled back by Drizzle/pg.
   *
   * If this store is already transaction-scoped (nested call), the
   * callback is executed directly against the existing transaction
   * handle — PostgreSQL does not support true nested transactions,
   * but the outer transaction's atomicity still applies.
   */
  async runInTransaction<T>(callback: (store: EnrichmentStore) => Promise<T>): Promise<T> {
    // If already inside a transaction scope, execute directly.
    // This prevents attempting to open a nested transaction, which
    // would either fail or create a savepoint depending on the driver.
    // The outer transaction's atomicity still covers this inner call.
    if (this.isTransactionScoped) {
      return callback(this);
    }

    // Use Drizzle's transaction API for real PostgreSQL transactions.
    // The `tx` parameter is a transaction-scoped database handle that
    // shares the same query API as `db`. All queries executed via `tx`
    // are part of the same transaction and will be committed together
    // or rolled back if the callback throws.
    return (this.db as NodePgDatabase).transaction(async (tx) => {
      const txStore = new DrizzleEnrichmentStore(tx as unknown as DbOrTx);
      return callback(txStore);
    });
  }
}
