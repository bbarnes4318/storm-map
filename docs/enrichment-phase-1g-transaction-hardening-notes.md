# Enrichment API — Phase 1G: Transaction Hardening & Cleanup

## Overview

Phase 1G hardens the persistent Drizzle store layer for production use by
implementing real PostgreSQL transaction wrapping, adding build-time `server-only`
enforcement, centralizing decimal parsing, and deprecating superseded mock modules.

## Files Changed

### Modified

| File | Changes |
|------|---------|
| `lib/enrichment/stores/drizzle-store.ts` | **Major**: Implemented real `db.transaction()` wrapping in `runInTransaction()`. Added `DbOrTx` type alias, `safeParseDecimal()` helper, `isTransactionScoped` flag, and `dbOverride` constructor parameter. Transaction callback now receives a fully transaction-backed store instance. |
| `lib/enrichment/stores/index.ts` | Added `import "server-only"` |
| `lib/db/client.ts` | Added `import "server-only"` |
| `lib/enrichment/auth.ts` | Added `import "server-only"` |
| `lib/enrichment/crypto.ts` | Added `import "server-only"` |
| `lib/enrichment/compliance.ts` | Deprecated attestation functions (kept pure suppression helpers) |
| `lib/enrichment/mock-store.ts` | Added `@deprecated` notice |
| `lib/enrichment/ledger-memory-store.ts` | Added `@deprecated` notice |
| `package.json` | Added `"server-only": "^0.0.1"` to dependencies |

### Created

| File | Purpose |
|------|---------|
| `docs/enrichment-phase-1g-transaction-hardening-notes.md` | This documentation file |

## Transaction Wrapper Design

### Before (Phase 1F)

```typescript
// DrizzleEnrichmentStore.runInTransaction() — UNSAFE
async runInTransaction<T>(callback: (store: EnrichmentStore) => Promise<T>): Promise<T> {
  // Just calls callback directly — no real transaction!
  return callback(this);
}
```

### After (Phase 1G)

```typescript
// DrizzleEnrichmentStore.runInTransaction() — SAFE
async runInTransaction<T>(callback: (store: EnrichmentStore) => Promise<T>): Promise<T> {
  // Nested transaction guard
  if (this.isTransactionScoped) {
    return callback(this);
  }

  // Real PostgreSQL transaction via Drizzle
  return (this.db as NodePgDatabase).transaction(async (tx) => {
    const txStore = new DrizzleEnrichmentStore(tx as unknown as DbOrTx);
    return callback(txStore);
  });
}
```

### How it works

1. `DrizzleEnrichmentStore` constructor now accepts an optional `dbOverride` parameter
2. When called from `runInTransaction()`, the constructor receives the Drizzle
   transaction handle (`tx`) instead of the root `db` client
3. All sub-store classes (`DrizzleAccountStore`, `DrizzleCreditLedgerStore`, etc.)
   receive the same `tx` handle, so all queries share the transaction scope
4. If the callback throws, Drizzle/pg automatically rolls back the transaction
5. Nested `runInTransaction()` calls detect `isTransactionScoped=true` and
   execute directly against the existing transaction handle

### Transaction flow diagram

```
unlock route calls debitAccount(ledgerBridge, input)
  → ledgerBridge.runInTransaction(callback)
    → store.runInTransaction(outerCallback)
      → db.transaction(async (tx) => {
          const txStore = new DrizzleEnrichmentStore(tx);
          → outerCallback(txStore)
            → txBridge = new StoreLedgerBridge(txStore)
            → callback(txBridge)
              → txBridge.getLedgerEntryByIdempotencyKey(...)  // uses tx
              → txBridge.getAccountById(...)                  // uses tx
              → txBridge.updateAccountCreditBalance(...)      // uses tx
              → txBridge.insertLedgerEntry(...)               // uses tx
        })  // COMMIT or ROLLBACK
```

## Ledger Operation Atomicity

### Already correct from Phase 1C

All three ledger functions (`debitAccount`, `creditAccount`, `refundAccount`) in
`lib/enrichment/ledger.ts` correctly use `store.runInTransaction()`:

- **Idempotency check** → inside transaction
- **Account balance read** → inside transaction
- **Balance sufficiency check** (debit only) → inside transaction
- **Balance update** → inside transaction
- **Ledger entry insert** → inside transaction

No manual mutations happen outside the transaction callback. The Phase 1C design
was already correct — Phase 1G just ensures the underlying `runInTransaction()`
implementation actually wraps a real PostgreSQL transaction instead of executing
directly.

## Decimal Parsing

### Before (Phase 1F)

Inline `parseFloat(String(row.latitude))` calls scattered across `mapQuote()` and
`mapUnlock()`. No validation for `NaN` or non-finite values.

### After (Phase 1G)

Centralized `safeParseDecimal()` helper:

```typescript
function safeParseDecimal(value: string | number | null | undefined): number {
  if (value === null || value === undefined) return 0;
  const parsed = typeof value === 'number' ? value : parseFloat(String(value));
  return Number.isFinite(parsed) ? parsed : 0;
}
```

Used in `mapQuote()` (latitude, longitude) and `mapUnlock()` (latitude, longitude,
providerCostEstimate). Returns 0 for null/undefined/NaN instead of throwing.

## server-only Status

### Added to package.json

```json
"server-only": "^0.0.1"
```

> [!IMPORTANT]
> The package must be installed (`npm install`) before building. The `server-only`
> package causes a build-time error if any module with `import "server-only"` is
> accidentally imported from a client component.

### Modules with `import "server-only"`

| Module | Purpose |
|--------|---------|
| `lib/db/client.ts` | Database connection pool |
| `lib/enrichment/auth.ts` | Account resolution |
| `lib/enrichment/crypto.ts` | AES-256-GCM encryption/decryption |
| `lib/enrichment/stores/index.ts` | Store resolver |
| `lib/enrichment/stores/drizzle-store.ts` | Drizzle store implementation |

## Mock Store Status

| Module | Status | Reason |
|--------|--------|--------|
| `lib/enrichment/mock-store.ts` | **DEPRECATED** | Superseded by `stores/mock-store-adapter.ts`. No API routes import it. Retained for reference. |
| `lib/enrichment/ledger-memory-store.ts` | **DEPRECATED** | Only imported by deprecated `mock-store.ts`. Superseded by `MockCreditLedgerStore` in `stores/mock-store-adapter.ts`. |
| `lib/enrichment/compliance.ts` | **Partially deprecated** | Attestation functions deprecated. Pure helpers (`hashSuppressionValue`, `redactSuppressedContacts`) still actively used by unlock route. |

## unlocked-data Route Status

**Fully implemented** in Phase 1F. No changes needed in Phase 1G.

The route:
1. Resolves current account via `getCurrentEnrichmentAccount()`
2. Validates `unlockId` query parameter
3. Fetches unlock via `store.unlocks.getUnlockById()`
4. Verifies account ownership
5. Decrypts `encryptedContactPayload` via `decryptContactPayload()`
6. Writes `VIEW_CONTACT_DATA` audit log
7. Returns normalized unlocked data

## Remaining Blockers Before Real DB Migrations

| Blocker | Status |
|---------|--------|
| `npm install` to install `server-only` | Required before build |
| `drizzle-kit generate:pg` to create migration SQL | Not yet run |
| `drizzle-kit push:pg` or migration runner to create tables | Not yet run |
| `DATABASE_URL` configured in environment | Not yet set |
| Verify Drizzle `db.transaction()` API compatibility with pg driver version | Not yet tested |

## Why No Migrations Were Run

Per phase rules:
- Do NOT run commands
- Do NOT run migrations
- Do NOT create real database tables

The Drizzle schema in `lib/db/schema/enrichment.ts` defines all 7 tables.
Migrations can be generated and run in the next phase when database work is authorized.

## Recommended Next Phase Scope

1. Run `npm install` to install `server-only` dependency
2. Generate and run Drizzle migrations to create PostgreSQL tables
3. Test Drizzle store against real PostgreSQL with `DATABASE_URL`
4. Verify transaction rollback behavior with intentional failures
5. Integrate real auth provider (Clerk or Supabase)
6. Build basic frontend enrichment UI (attestation → quote → unlock)
7. Add Stripe checkout for credit purchases
8. Connect first real data provider (ATTOM or BatchData)
9. Remove deprecated `mock-store.ts` and `ledger-memory-store.ts` after verification
10. Add rate limiting on enrichment API routes
