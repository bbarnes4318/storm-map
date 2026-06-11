import { CreditTransactionType } from "./schemas";

// ==============================================================================
// 1. Service Types
// ==============================================================================

export type CreditLedgerTxType = CreditTransactionType;

export interface Account {
  id: string;
  authProvider: string;
  authUserId: string;
  email: string;
  creditBalance: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreditLedgerEntry {
  id: string;
  accountId: string;
  amount: number;
  txType: CreditLedgerTxType;
  idempotencyKey: string;
  referenceId: string | null;
  description: string | null;
  createdAt: Date;
}

export interface CreditDebitInput {
  accountId: string;
  amount: number;
  txType: "SPEND_CREDITS";
  idempotencyKey: string;
  referenceId?: string;
  description?: string;
}

export interface CreditCreditInput {
  accountId: string;
  amount: number;
  txType: "BUY_CREDITS" | "REFUND_CREDITS";
  idempotencyKey: string;
  referenceId?: string;
  description?: string;
}

export interface CreditRefundInput {
  accountId: string;
  amount: number;
  txType: "REFUND_CREDITS" | "VOID_CREDITS";
  idempotencyKey: string;
  referenceId: string; // Required to link to original debit/unlock
  description?: string;
}

export interface LedgerOperationResult {
  success: boolean;
  ledgerEntry: CreditLedgerEntry;
  newBalance: number;
  isIdempotentReplay: boolean;
}

// ==============================================================================
// 2. Custom Error Handling
// ==============================================================================

export type CreditLedgerErrorCode =
  | "ACCOUNT_NOT_FOUND"
  | "INSUFFICIENT_CREDITS"
  | "INVALID_AMOUNT"
  | "INVALID_TRANSACTION_TYPE"
  | "DUPLICATE_IDEMPOTENCY_KEY"
  | "LEDGER_WRITE_FAILED";

export class CreditLedgerError extends Error {
  code: CreditLedgerErrorCode;

  constructor(code: CreditLedgerErrorCode, message: string) {
    super(message);
    this.name = "CreditLedgerError";
    this.code = code;
    Object.setPrototypeOf(this, CreditLedgerError.prototype);
  }
}

// ==============================================================================
// 3. Database Store Adapter Interface (Contract Only)
// ==============================================================================

/**
 * Interface representing the database adapter storage contract.
 * Functions inside this module operate against this store to permit clean
 * integration with Drizzle transaction scopes later.
 */
export interface CreditLedgerStore {
  /**
   * Retrieves an account details by its UUID.
   */
  getAccountById(accountId: string): Promise<Account | null>;

  /**
   * Looks up a ledger entry using an idempotency key.
   */
  getLedgerEntryByIdempotencyKey(idempotencyKey: string): Promise<CreditLedgerEntry | null>;

  /**
   * Atomically sets the account credit balance.
   */
  updateAccountCreditBalance(accountId: string, newBalance: number): Promise<void>;

  /**
   * Creates a new ledger transaction log entry.
   */
  insertLedgerEntry(entry: Omit<CreditLedgerEntry, "id" | "createdAt">): Promise<CreditLedgerEntry>;

  /**
   * Executes a set of operations wrapped inside a database transaction block.
   */
  runInTransaction<T>(callback: (tx: CreditLedgerStore) => Promise<T>): Promise<T>;
}

// ==============================================================================
// 4. Pure Ledger Service Functions
// ==============================================================================

/**
 * Retrieves the current credit balance of an account.
 * Throws ACCOUNT_NOT_FOUND if account does not exist.
 */
export async function getCreditBalance(
  store: CreditLedgerStore,
  accountId: string
): Promise<number> {
  const account = await store.getAccountById(accountId);
  if (!account) {
    throw new CreditLedgerError(
      "ACCOUNT_NOT_FOUND",
      `Account with ID ${accountId} was not found`
    );
  }
  return account.creditBalance;
}

/**
 * Checks if the account has enough credits to cover a specified amount.
 * Validates that amount is positive.
 */
export async function hasSufficientCredits(
  store: CreditLedgerStore,
  accountId: string,
  amount: number
): Promise<boolean> {
  if (amount <= 0) {
    throw new CreditLedgerError(
      "INVALID_AMOUNT",
      "Requested credit amount must be a positive integer"
    );
  }
  const balance = await getCreditBalance(store, accountId);
  return balance >= amount;
}

/**
 * Credits an account (buying credits or admin credit grants).
 * 
 * Must be executed in a database transaction.
 */
export async function creditAccount(
  store: CreditLedgerStore,
  input: CreditCreditInput
): Promise<LedgerOperationResult> {
  // 1. Argument validation
  if (input.amount <= 0) {
    throw new CreditLedgerError("INVALID_AMOUNT", "Credit amount must be positive");
  }
  if (input.txType !== "BUY_CREDITS" && input.txType !== "REFUND_CREDITS") {
    throw new CreditLedgerError(
      "INVALID_TRANSACTION_TYPE",
      `Invalid credit transaction type: ${input.txType}`
    );
  }
  if (!input.idempotencyKey) {
    throw new CreditLedgerError("INVALID_AMOUNT", "Idempotency key is required");
  }

  // 2. Perform atomic transaction
  return store.runInTransaction(async (tx) => {
    // Check for existing idempotency key to prevent double-crediting
    const existing = await tx.getLedgerEntryByIdempotencyKey(input.idempotencyKey);
    if (existing) {
      if (
        existing.accountId !== input.accountId ||
        existing.amount !== input.amount ||
        existing.txType !== input.txType
      ) {
        throw new CreditLedgerError(
          "DUPLICATE_IDEMPOTENCY_KEY",
          "Idempotency key already exists for a different transaction payload"
        );
      }

      const account = await tx.getAccountById(input.accountId);
      if (!account) {
        throw new CreditLedgerError("ACCOUNT_NOT_FOUND", "Account not found during idempotent replay");
      }

      return {
        success: true,
        ledgerEntry: existing,
        newBalance: account.creditBalance,
        isIdempotentReplay: true,
      };
    }

    // Fetch account details
    const account = await tx.getAccountById(input.accountId);
    if (!account) {
      throw new CreditLedgerError("ACCOUNT_NOT_FOUND", `Account ${input.accountId} not found`);
    }

    // Increment balance
    const newBalance = account.creditBalance + input.amount;
    await tx.updateAccountCreditBalance(input.accountId, newBalance);

    // Record ledger log
    const entry = await tx.insertLedgerEntry({
      accountId: input.accountId,
      amount: input.amount,
      txType: input.txType,
      idempotencyKey: input.idempotencyKey,
      referenceId: input.referenceId || null,
      description: input.description || `Credited ${input.amount} credits via ${input.txType}`,
    });

    return {
      success: true,
      ledgerEntry: entry,
      newBalance,
      isIdempotentReplay: false,
    };
  });
}

/**
 * Debits an account for homeowner/property enrichment.
 * Checks balance atomically and prevents duplicate debit with same idempotency key.
 * 
 * Must be executed in a database transaction.
 */
export async function debitAccount(
  store: CreditLedgerStore,
  input: CreditDebitInput
): Promise<LedgerOperationResult> {
  // 1. Argument validation
  if (input.amount <= 0) {
    throw new CreditLedgerError("INVALID_AMOUNT", "Debit amount must be positive");
  }
  if (input.txType !== "SPEND_CREDITS") {
    throw new CreditLedgerError(
      "INVALID_TRANSACTION_TYPE",
      `Invalid debit transaction type: ${input.txType}`
    );
  }
  if (!input.idempotencyKey) {
    throw new CreditLedgerError("INVALID_AMOUNT", "Idempotency key is required");
  }

  // 2. Perform atomic transaction
  return store.runInTransaction(async (tx) => {
    // Check for existing idempotency key to prevent double-charging
    const existing = await tx.getLedgerEntryByIdempotencyKey(input.idempotencyKey);
    if (existing) {
      // Validate that the stored properties match input to verify correct replay
      if (
        existing.accountId !== input.accountId ||
        Math.abs(existing.amount) !== input.amount ||
        existing.txType !== input.txType
      ) {
        throw new CreditLedgerError(
          "DUPLICATE_IDEMPOTENCY_KEY",
          "Idempotency key already exists for a different transaction payload"
        );
      }

      const account = await tx.getAccountById(input.accountId);
      if (!account) {
        throw new CreditLedgerError("ACCOUNT_NOT_FOUND", "Account not found during idempotent replay");
      }

      return {
        success: true,
        ledgerEntry: existing,
        newBalance: account.creditBalance,
        isIdempotentReplay: true,
      };
    }

    // Fetch account details
    const account = await tx.getAccountById(input.accountId);
    if (!account) {
      throw new CreditLedgerError("ACCOUNT_NOT_FOUND", `Account ${input.accountId} not found`);
    }

    // Check balance sufficiency
    if (account.creditBalance < input.amount) {
      throw new CreditLedgerError(
        "INSUFFICIENT_CREDITS",
        `Insufficient credits: account balance is ${account.creditBalance}, requested spend of ${input.amount}`
      );
    }

    // Decrement balance
    const newBalance = account.creditBalance - input.amount;
    await tx.updateAccountCreditBalance(input.accountId, newBalance);

    // Record ledger log (Store amount as negative inside DB)
    const entry = await tx.insertLedgerEntry({
      accountId: input.accountId,
      amount: -input.amount,
      txType: input.txType,
      idempotencyKey: input.idempotencyKey,
      referenceId: input.referenceId || null,
      description: input.description || `Spent ${input.amount} credits via ${input.txType}`,
    });

    return {
      success: true,
      ledgerEntry: entry,
      newBalance,
      isIdempotentReplay: false,
    };
  });
}

/**
 * Refunds or voids a debit transaction when provider lookup fails.
 * Requires referencing the original debit/unlock transaction.
 * 
 * Must be executed in a database transaction.
 */
export async function refundAccount(
  store: CreditLedgerStore,
  input: CreditRefundInput
): Promise<LedgerOperationResult> {
  // 1. Argument validation
  if (input.amount <= 0) {
    throw new CreditLedgerError("INVALID_AMOUNT", "Refund amount must be positive");
  }
  if (input.txType !== "REFUND_CREDITS" && input.txType !== "VOID_CREDITS") {
    throw new CreditLedgerError(
      "INVALID_TRANSACTION_TYPE",
      `Invalid refund transaction type: ${input.txType}`
    );
  }
  if (!input.idempotencyKey) {
    throw new CreditLedgerError("INVALID_AMOUNT", "Idempotency key is required");
  }
  if (!input.referenceId) {
    throw new CreditLedgerError("INVALID_AMOUNT", "Reference ID pointing to the original unlock transaction is required");
  }

  // 2. Perform atomic transaction
  return store.runInTransaction(async (tx) => {
    // Check for existing idempotency key to prevent double-refunding
    const existing = await tx.getLedgerEntryByIdempotencyKey(input.idempotencyKey);
    if (existing) {
      if (
        existing.accountId !== input.accountId ||
        existing.amount !== input.amount ||
        existing.txType !== input.txType ||
        existing.referenceId !== input.referenceId
      ) {
        throw new CreditLedgerError(
          "DUPLICATE_IDEMPOTENCY_KEY",
          "Idempotency key already exists for a different transaction payload"
        );
      }

      const account = await tx.getAccountById(input.accountId);
      if (!account) {
        throw new CreditLedgerError("ACCOUNT_NOT_FOUND", "Account not found during idempotent replay");
      }

      return {
        success: true,
        ledgerEntry: existing,
        newBalance: account.creditBalance,
        isIdempotentReplay: true,
      };
    }

    // Fetch account details
    const account = await tx.getAccountById(input.accountId);
    if (!account) {
      throw new CreditLedgerError("ACCOUNT_NOT_FOUND", `Account ${input.accountId} not found`);
    }

    // Increment balance
    const newBalance = account.creditBalance + input.amount;
    await tx.updateAccountCreditBalance(input.accountId, newBalance);

    // Record ledger log
    const entry = await tx.insertLedgerEntry({
      accountId: input.accountId,
      amount: input.amount,
      txType: input.txType,
      idempotencyKey: input.idempotencyKey,
      referenceId: input.referenceId,
      description: input.description || `Refunded ${input.amount} credits (ref: ${input.referenceId})`,
    });

    return {
      success: true,
      ledgerEntry: entry,
      newBalance,
      isIdempotentReplay: false,
    };
  });
}
