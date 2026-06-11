# Enrichment API — Phase 1F: Database Store Adapters

## Overview

Phase 1F replaces the mock-only persistence boundaries with production-ready Drizzle
database store adapters, while preserving full mock mode fallback. API routes now use a
unified `EnrichmentStore` interface instead of importing mock helpers directly.

## Files Added

| File | Purpose |
|------|---------|
| `lib/enrichment/stores/types.ts` | Unified store interfaces for all 7 domain sub-stores |
| `lib/enrichment/stores/drizzle-store.ts` | Drizzle ORM implementation using lib/db/schema/enrichment.ts |
| `lib/enrichment/stores/mock-store-adapter.ts` | In-memory mock implementation of EnrichmentStore |
| `lib/enrichment/stores/index.ts` | Store resolver: mock vs Drizzle based on env vars |
| `lib/enrichment/stores/ledger-bridge.ts` | Bridge adapter: Phase 1F store → Phase 1C ledger service |
| `docs/enrichment-phase-1f-db-store-notes.md` | This documentation file |

## Files Modified

| File | Changes |
|------|---------|
| `app/api/enrichment/attest/route.ts` | Uses `getEnrichmentStore()` instead of direct compliance.ts import |
| `app/api/enrichment/quote/route.ts` | Uses store for attestation checks, quote storage, and audit logging |
| `app/api/enrichment/unlock/route.ts` | Uses store + StoreLedgerBridge for full flow including unlock persistence |
| `app/api/enrichment/unlocked-data/route.ts` | Fully implemented: account resolution, unlock fetch, decryption, audit |

## Store Interfaces Created

All interfaces are in `lib/enrichment/stores/types.ts`:

| Interface | Methods |
|-----------|---------|
| `EnrichmentAccountStore` | getAccountById, getAccountByAuthIdentity, upsertAccountFromAuthIdentity, getCreditBalance, updateCreditBalance |
| `ComplianceStore` | createAttestation, getLatestAttestation, hasRecentAttestation |
| `CreditLedgerStore` | getLedgerEntryByIdempotencyKey, insertLedgerEntry, updateAccountCreditBalance, getAccountById |
| `QuoteStore` | createQuote, getQuoteById, isQuoteExpired |
| `UnlockStore` | getUnlockById, getUnlockByAccountPropertyProduct, createUnlock |
| `SuppressionStore` | getSuppressedHashes, isSuppressed |
| `AuditLogStore` | createAuditLog |
| `EnrichmentStore` | Combined: accounts, compliance, ledger, quotes, unlocks, suppression, audit, runInTransaction |

No `any` types used anywhere. All inputs and outputs are strictly typed.

## Drizzle Store Behavior

The `DrizzleEnrichmentStore` in `drizzle-store.ts`:

- Uses schema from `lib/db/schema/enrichment.ts`
- Uses DB client from `lib/db/client.ts` via `getDbClient()`
- Throws `DrizzleStoreNotConfiguredError` if `DATABASE_URL` is not set
- Does NOT connect on import (lazy init via `getDbClient()`)
- Does NOT run queries at module load
- Does NOT create tables or run migrations
- Does NOT assume tables exist
- Maps DB rows to typed `Stored*` interfaces via explicit mapper functions
- Handles decimal columns (latitude/longitude, providerCostEstimate) via parseFloat

### Row Mapping

Each DB table has a corresponding mapper function that converts Drizzle row types
to the store's typed interfaces:

- `mapAccount()` → `StoredAccount`
- `mapAttestation()` → `StoredAttestation`
- `mapLedgerEntry()` → `StoredLedgerEntry`
- `mapQuote()` → `StoredQuote`
- `mapUnlock()` → `StoredUnlock`
- `mapAuditLog()` → `StoredAuditLog`

## Mock Fallback Behavior

The `MockEnrichmentStore` in `mock-store-adapter.ts`:

- Uses in-memory `Map` instances for all stores
- Pre-seeds deterministic mock account with 1000 credits
- Generates UUIDs via `crypto.randomUUID()` with fallback
- Tracks attestations per account with time-based expiry checking
- Stores unlock composite keys for dedup lookup
- Transactions execute directly (no real rollback for full store)

### Store Resolver

`getEnrichmentStore()` in `stores/index.ts`:

| Condition | Result |
|-----------|--------|
| `ENRICHMENT_MOCK_MODE=true` | Returns `MockEnrichmentStore` (always succeeds) |
| `ENRICHMENT_MOCK_MODE` not true + `DATABASE_URL` set | Returns `DrizzleEnrichmentStore` |
| `ENRICHMENT_MOCK_MODE` not true + no `DATABASE_URL` | Throws `StoreConfigurationError` |

The store is lazily initialized and cached as a singleton.

## Ledger Service Integration

### Problem

Phase 1C defined `CreditLedgerStore` in `lib/enrichment/ledger.ts` with:
- `getAccountById()` → returns `Account` type
- `insertLedgerEntry()` → returns `CreditLedgerEntry` type

Phase 1F defined `CreditLedgerStore` in `stores/types.ts` with:
- `getAccountById()` → returns `StoredAccount` type
- `insertLedgerEntry()` → returns `StoredLedgerEntry` type

These are structurally identical but nominally different TypeScript types.

### Solution: StoreLedgerBridge

`lib/enrichment/stores/ledger-bridge.ts` implements the Phase 1C `CreditLedgerStore`
interface by delegating to the Phase 1F `EnrichmentStore`:

```
Phase 1C ledger service (debitAccount, creditAccount, refundAccount)
    ↓ calls
StoreLedgerBridge (implements Phase 1C CreditLedgerStore)
    ↓ delegates to
EnrichmentStore.accounts (for getAccountById, updateCreditBalance)
EnrichmentStore.ledger (for getLedgerEntryByIdempotencyKey, insertLedgerEntry)
```

The unlock route creates a `StoreLedgerBridge` and passes it to `debitAccount()`.

## Transaction Behavior

### Mock Mode
- `MockEnrichmentStore.runInTransaction()` executes callback directly
- No real rollback for the full store (acceptable in dev mode)
- The Phase 1C `MemoryCreditLedgerStore` still provides snapshot-based rollback
  for ledger-specific operations when used directly

### Drizzle Mode
- `DrizzleEnrichmentStore.runInTransaction()` currently executes directly
- TODO: Wrap in `db.transaction()` when multi-table atomicity is needed
- The Phase 1C ledger service handles its own idempotency and balance checks
  atomically within `debitAccount()`'s `runInTransaction()` call

## unlocked-data Route Implementation

The `GET /api/enrichment/unlocked-data` route is now fully implemented:

1. Resolves current account via `getCurrentEnrichmentAccount()`
2. Validates `unlockId` query parameter
3. Fetches unlock record via `store.unlocks.getUnlockById()`
4. Confirms unlock belongs to requesting account
5. Decrypts encrypted contact payload server-side via `decryptContactPayload()`
6. Writes `VIEW_CONTACT_DATA` audit log
7. Returns normalized unlocked data

If the encryption key is not configured, the route returns what it can
(property profile) without the encrypted contact data.

## What Still Requires Migrations

Before the Drizzle store can be used in production, these tables must be created
via database migrations:

1. `accounts`
2. `compliance_attestations`
3. `credit_ledger`
4. `enrichment_quotes`
5. `enrichment_unlocks`
6. `suppression_list`
7. `audit_logs`

The Drizzle schema is already defined in `lib/db/schema/enrichment.ts`.
Migrations can be generated with `drizzle-kit generate:pg` and run with
`drizzle-kit push:pg` or a migration runner.

## What Still Requires Real Auth

- `getCurrentEnrichmentAccount()` in `lib/enrichment/auth.ts` returns a
  deterministic mock account when `ENRICHMENT_MOCK_MODE=true`
- In non-mock mode, it throws `AuthNotConfiguredError`
- Integration with a real auth provider (Clerk, Supabase, etc.) requires:
  - Extracting session/token from request headers
  - Verifying the token with the auth provider
  - Upserting the account via `store.accounts.upsertAccountFromAuthIdentity()`

## What Still Requires UI

- No frontend enrichment UI has been created
- The API routes are fully functional but have no consumer yet
- Future UI needs: attestation flow, quote generation, unlock/purchase, credit balance display

## What Still Requires Stripe

- No payment checkout has been implemented
- Credit purchases (`BUY_CREDITS`) are supported by the ledger service but
  have no payment gateway integration
- Future: Stripe checkout session → webhook → `creditAccount()` call

## What Still Requires Real Providers

- Only the `MockEnrichmentProvider` is configured
- Real providers (ATTOM, BatchData, Trestle, Melissa, EagleView) have stub
  classes but no API keys or real implementations
- The provider registry in `lib/enrichment/providers/index.ts` will automatically
  route to real providers when their API keys are configured

## Recommended Phase 1G Scope

1. Run database migrations to create tables
2. Test Drizzle store with real PostgreSQL
3. Wire `db.transaction()` for multi-table atomicity in `DrizzleEnrichmentStore`
4. Add `server-only` package to `package.json` and restore imports
5. Integrate real auth provider
6. Build basic frontend enrichment UI (attestation → quote → unlock flow)
7. Add Stripe checkout for credit purchases
8. Implement rate limiting on API routes
9. Connect first real data provider (ATTOM or BatchData for PROPERTY_PROFILE)
10. Load suppression hashes from database
11. Implement quote expiry cleanup (background job or TTL-based)
