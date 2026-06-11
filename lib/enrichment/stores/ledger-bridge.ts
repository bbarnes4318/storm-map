/**
 * Bridge adapter that makes the Phase 1F unified store's CreditLedgerStore
 * compatible with the Phase 1C ledger service's CreditLedgerStore interface.
 *
 * The Phase 1C ledger service (lib/enrichment/ledger.ts) defines its own
 * CreditLedgerStore interface with methods like getAccountById returning
 * the Phase 1C Account type. The Phase 1F store layer defines a different
 * CreditLedgerStore in stores/types.ts.
 *
 * This adapter bridges the two so that the Phase 1C debitAccount/creditAccount/
 * refundAccount functions can operate against the Phase 1F unified store.
 */

// SERVER-ONLY: Must only be imported by server-side code.

import type {
  CreditLedgerStore as LegacyLedgerStore,
  Account as LegacyAccount,
  CreditLedgerEntry as LegacyCreditLedgerEntry,
} from "../ledger";
import type { EnrichmentStore } from "./types";
import type { CreditTransactionType } from "../schemas";

/**
 * Wraps an EnrichmentStore to produce a CreditLedgerStore compatible with
 * the Phase 1C ledger service functions (debitAccount, creditAccount, etc.).
 */
export class StoreLedgerBridge implements LegacyLedgerStore {
  constructor(private store: EnrichmentStore) {}

  async getAccountById(accountId: string): Promise<LegacyAccount | null> {
    const acc = await this.store.accounts.getAccountById(accountId);
    if (!acc) return null;
    return {
      id: acc.id,
      authProvider: acc.authProvider,
      authUserId: acc.authUserId,
      email: acc.email,
      creditBalance: acc.creditBalance,
      createdAt: acc.createdAt,
      updatedAt: acc.updatedAt,
    };
  }

  async getLedgerEntryByIdempotencyKey(idempotencyKey: string): Promise<LegacyCreditLedgerEntry | null> {
    const entry = await this.store.ledger.getLedgerEntryByIdempotencyKey(idempotencyKey);
    if (!entry) return null;
    return {
      id: entry.id,
      accountId: entry.accountId,
      amount: entry.amount,
      txType: entry.txType as CreditTransactionType,
      idempotencyKey: entry.idempotencyKey,
      referenceId: entry.referenceId,
      description: entry.description,
      createdAt: entry.createdAt,
    };
  }

  async updateAccountCreditBalance(accountId: string, newBalance: number): Promise<void> {
    await this.store.accounts.updateCreditBalance(accountId, newBalance);
  }

  async insertLedgerEntry(
    entry: Omit<LegacyCreditLedgerEntry, "id" | "createdAt">
  ): Promise<LegacyCreditLedgerEntry> {
    const created = await this.store.ledger.insertLedgerEntry({
      accountId: entry.accountId,
      amount: entry.amount,
      txType: entry.txType,
      idempotencyKey: entry.idempotencyKey,
      referenceId: entry.referenceId,
      description: entry.description,
    });
    return {
      id: created.id,
      accountId: created.accountId,
      amount: created.amount,
      txType: created.txType as CreditTransactionType,
      idempotencyKey: created.idempotencyKey,
      referenceId: created.referenceId,
      description: created.description,
      createdAt: created.createdAt,
    };
  }

  async runInTransaction<T>(callback: (tx: LegacyLedgerStore) => Promise<T>): Promise<T> {
    return this.store.runInTransaction(async (txStore) => {
      const txBridge = new StoreLedgerBridge(txStore);
      return callback(txBridge);
    });
  }
}
