# Enrichment System - Phase 1C: Credit Ledger Service

This document describes the design, architecture, idempotency checks, and transaction boundaries implemented for the homeowner and property enrichment credit system during Phase 1C.

---

## 1. Files Added

1. **[ledger.ts](file:///C:/Users/jimbo/.gemini/antigravity/worktrees/storm-map/build-storm-intel-map/lib/enrichment/ledger.ts)**:
   - Primary TypeScript service file containing operations for balance lookups, sufficiency checks, debit, credit, and refunding.
   - Declares the abstract storage contract interface (`CreditLedgerStore`).
   - Declares custom credit error classes (`CreditLedgerError`) using a defined enum set.
2. **[ledger-memory-store.ts](file:///C:/Users/jimbo/.gemini/antigravity/worktrees/storm-map/build-storm-intel-map/lib/enrichment/ledger-memory-store.ts)**:
   - In-memory database storage adapter implementing the `CreditLedgerStore` contract.
   - Simulates queries, inserts, and transactional atomicity with full rollback capabilities for testing and mock flows.
3. **[enrichment-phase-1c-ledger-notes.md](file:///C:/Users/jimbo/.gemini/antigravity/worktrees/storm-map/build-storm-intel-map/docs/enrichment-phase-1c-ledger-notes.md)**:
   - This architectural documentation.

---

## 2. Ledger Operations Supported

- **Balance Lookups**: `getCreditBalance(store, accountId)` retrieves the current credit balance of the requested account. Throws a typed `ACCOUNT_NOT_FOUND` error if the account is missing.
- **Sufficiency Validation**: `hasSufficientCredits(store, accountId, amount)` validates that the requested amount is a positive number and verifies if the current credit balance is greater than or equal to it.
- **Atomic Crediting**: `creditAccount(store, input)` adds positive credits to an account (e.g. from purchases or admin grants). Enforces positive amounts and restricts transaction types to `BUY_CREDITS` or `REFUND_CREDITS`.
- **Atomic Debiting**: `debitAccount(store, input)` deducts credits for data unlocks. Enforces positive amounts, restricts transaction type to `SPEND_CREDITS`, checks balance sufficiency, and logs a negative value in the ledger.
- **Reversals/Refunds**: `refundAccount(store, input)` reverses a previous charge. Enforces positive amounts, restricts types to `REFUND_CREDITS` or `VOID_CREDITS`, and requires a `referenceId` linking to the original unlock transaction.

---

## 3. Idempotency Behavior

To prevent double-charging or duplicate credit grants under network retry conditions:
1. Every state-modifying function requires an `idempotencyKey` parameter.
2. Inside the transaction callback, the service queries `store.getLedgerEntryByIdempotencyKey(key)`.
3. If an entry already exists:
   - It validates that the parameters of the existing entry (`accountId`, `amount`, `txType`, and `referenceId` if present) match the incoming request details.
   - If they do not match, it throws a `DUPLICATE_IDEMPOTENCY_KEY` error, preventing key reuse for different operations.
   - If they match, it immediately skips the balance updates and returns the original transaction details with `isIdempotentReplay: true`.

---

## 4. Atomic Transaction Design

To prevent race conditions (such as race-to-debit double spends), all state-modifying functions enforce transaction wrapping:
- The service functions accept a `CreditLedgerStore` and internally wrap all checks, reads, and writes within:
  ```typescript
  return store.runInTransaction(async (tx) => { ... })
  ```
- Any error thrown within the transaction callback triggers a database-level rollback of all operations, preventing orphaned ledger logs or mismatched credit balances.

---

## 5. De-Coupling from the Database

A real PostgreSQL connection was intentionally excluded from Phase 1C because:
- **Testability**: The service is built against an abstract storage contract rather than Drizzle/Postgres directly.
- **Drizzle Integration**: In the future (Phase 1D/1E), we can easily create a Drizzle adapter that maps `CreditLedgerStore` methods directly to Drizzle queries (`db.select()`, `db.insert()`, etc.) and handles `runInTransaction` by wrapping it in `db.transaction()`.

---

## 6. Phase 1D Next Steps

In Phase 1D (Provider Abstraction), we will build the vendor API abstraction layers:
- Define the abstract `BaseEnrichmentProvider` class.
- Create mock and real integration modules (e.g. BatchData, ATTOM, Trestle, Melissa).
- Leverage the in-memory ledger store `MemoryCreditLedgerStore` to test mock property enrichment flows without incurring external API costs.
