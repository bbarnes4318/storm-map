import { CreditLedgerStore, Account, CreditLedgerEntry } from "./ledger";

/**
 * @deprecated Phase 1G — This module is superseded by lib/enrichment/stores/mock-store-adapter.ts.
 * The MockCreditLedgerStore in stores/mock-store-adapter.ts provides the same
 * functionality as part of the unified EnrichmentStore interface. This file
 * is retained only for reference and backwards compatibility with the deprecated
 * mock-store.ts. Do not import in new code.
 *
 * Original purpose:
 * A lightweight, in-memory implementation of the CreditLedgerStore interface.
 * Useful for local development, mock flows, and unit testing where a live
 * PostgreSQL connection is not available or desired.
 * 
 * NOTE: For development/testing only; not suitable for production storage.
 */
export class MemoryCreditLedgerStore implements CreditLedgerStore {
  private accounts = new Map<string, Account>();
  private ledger = new Map<string, CreditLedgerEntry>(); // Keyed by idempotencyKey
  private isTransaction = false;

  constructor(initialAccounts: Account[] = [], initialEntries: CreditLedgerEntry[] = []) {
    initialAccounts.forEach((acc) => this.accounts.set(acc.id, { ...acc }));
    initialEntries.forEach((entry) => this.ledger.set(entry.idempotencyKey, { ...entry }));
  }

  /**
   * Diagnostic helper to seed accounts or manually add a test user record.
   */
  public seedAccount(account: Account): void {
    this.accounts.set(account.id, { ...account });
  }

  /**
   * Diagnostic helper to seed ledger records.
   */
  public seedLedgerEntry(entry: CreditLedgerEntry): void {
    this.ledger.set(entry.idempotencyKey, { ...entry });
  }

  /**
   * Retrieve all ledger entries currently recorded in memory.
   */
  public getAllLedgerEntries(): CreditLedgerEntry[] {
    return Array.from(this.ledger.values()).map((entry) => ({ ...entry }));
  }

  // ==============================================================================
  // CreditLedgerStore Implementation
  // ==============================================================================

  async getAccountById(accountId: string): Promise<Account | null> {
    const acc = this.accounts.get(accountId);
    return acc ? { ...acc } : null;
  }

  async getLedgerEntryByIdempotencyKey(idempotencyKey: string): Promise<CreditLedgerEntry | null> {
    const entry = this.ledger.get(idempotencyKey);
    return entry ? { ...entry } : null;
  }

  async updateAccountCreditBalance(accountId: string, newBalance: number): Promise<void> {
    const acc = this.accounts.get(accountId);
    if (!acc) {
      throw new Error(`Account ${accountId} not found in memory store`);
    }
    acc.creditBalance = newBalance;
    acc.updatedAt = new Date();
  }

  async insertLedgerEntry(entry: Omit<CreditLedgerEntry, "id" | "createdAt">): Promise<CreditLedgerEntry> {
    const newEntry: CreditLedgerEntry = {
      ...entry,
      id: crypto.randomUUID ? crypto.randomUUID() : `mock-id-${Math.random().toString(36).substring(2, 9)}`,
      createdAt: new Date(),
    };
    this.ledger.set(entry.idempotencyKey, newEntry);
    return newEntry;
  }

  async runInTransaction<T>(callback: (tx: CreditLedgerStore) => Promise<T>): Promise<T> {
    // If already nested within a transaction block, execute directly
    if (this.isTransaction) {
      return callback(this);
    }

    // 1. Create a snapshot copy of the current in-memory maps
    const accountsBackup = new Map<string, Account>();
    this.accounts.forEach((val, key) => accountsBackup.set(key, { ...val }));

    const ledgerBackup = new Map<string, CreditLedgerEntry>();
    this.ledger.forEach((val, key) => ledgerBackup.set(key, { ...val }));

    // 2. Initialize a child transaction adapter sharing the exact state references
    const transactionStore = new MemoryCreditLedgerStore();
    transactionStore.accounts = this.accounts;
    transactionStore.ledger = this.ledger;
    transactionStore.isTransaction = true;

    try {
      const result = await callback(transactionStore);
      return result;
    } catch (error) {
      // 3. Roll back both maps to the snapshot clones in the event of any transaction errors
      this.accounts.clear();
      accountsBackup.forEach((val, key) => this.accounts.set(key, val));

      this.ledger.clear();
      ledgerBackup.forEach((val, key) => this.ledger.set(key, val));

      throw error;
    } finally {
      transactionStore.isTransaction = false;
    }
  }
}
export default MemoryCreditLedgerStore;
