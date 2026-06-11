# Enrichment API — Phase 1E: Server-Side Scaffolding Notes

## Overview

Phase 1E adds the server-side API scaffolding for the enrichment system. All routes
use mock mode (`ENRICHMENT_MOCK_MODE=true`) with no real vendor API calls, no real
auth provider, no real payment processor, and no frontend UI.

## Files Added

| File | Purpose |
|------|---------|
| `lib/db/client.ts` | Server-only Drizzle DB client factory. Returns `null` when `DATABASE_URL` is missing. |
| `lib/enrichment/auth.ts` | Mock account resolver. Returns deterministic mock account or throws `AuthNotConfiguredError`. |
| `lib/enrichment/crypto.ts` | AES-256-GCM encrypt/decrypt for sensitive contact payloads via `ENRICHMENT_ENCRYPTION_KEY`. |
| `lib/enrichment/compliance.ts` | Attestation checking/creation (in-memory), suppression hashing, contact redaction. |
| `lib/enrichment/api-response.ts` | Shared `apiSuccess()` / `apiError()` response helpers with structured error codes. |
| `lib/enrichment/mock-store.ts` | Centralized in-memory mock stores for quotes, unlock cache, and credit ledger. |
| `app/api/enrichment/attest/route.ts` | POST — Records compliance attestation. |
| `app/api/enrichment/quote/route.ts` | POST — Generates credit cost quote with 15-min expiry. |
| `app/api/enrichment/unlock/route.ts` | POST — Charges credits, calls mock provider, returns enrichment data. |
| `app/api/enrichment/unlocked-data/route.ts` | GET — Placeholder (returns 501). Requires DB persistence first. |
| `docs/enrichment-phase-1e-api-notes.md` | This file. |

## Architecture: mock-store.ts

### Why It Exists

In the initial Phase 1E implementation, mock state was scattered across route files:
- The quote route defined `StoredQuote`, `mockQuoteStore`, and `getMockQuote()` inline
- The unlock route imported `getMockQuote` directly from the quote route (`../quote/route`)
- The unlock route defined its own `CachedUnlock`, `mockUnlockCache`, and `mockLedgerStore` inline

This created a **cross-route import dependency** — route handlers should not import
business logic from each other. Route files should be thin orchestration layers.

### What Changed

All shared mock state was extracted to `lib/enrichment/mock-store.ts`:

| Export | Description |
|--------|-------------|
| `StoredQuote` | Interface for a stored quote |
| `saveMockQuote()` | Saves a quote to the in-memory store |
| `getMockQuote()` | Retrieves a quote by ID |
| `CachedUnlock` | Interface for a cached unlock result |
| `saveMockUnlock()` | Saves a completed unlock for idempotent replay |
| `getMockUnlock()` | Retrieves a cached unlock by idempotency key |
| `getMockLedgerStore()` | Returns the singleton `MemoryCreditLedgerStore` (pre-seeded with 1000 credits) |
| `MOCK_ACCOUNT_ID` | The deterministic mock account UUID |

Route files now import from `@/lib/enrichment/mock-store` instead of from each other.

### Production Transition

When database persistence is active (post-Phase 1F), route handlers should query
the Drizzle DB tables directly. The mock-store module should NOT be imported in
production — it is gated by `ENRICHMENT_MOCK_MODE=true` usage patterns.

## server-only Package Status

### Problem

Phase 1E files originally used `import "server-only"` to prevent accidental
client-side imports. However, the `server-only` npm package was **not listed** in
`package.json` and was not installed. This would cause a build failure.

### Resolution

The `import "server-only"` statements were removed from all files:
- `lib/enrichment/auth.ts`
- `lib/enrichment/crypto.ts`
- `lib/enrichment/compliance.ts`
- `lib/db/client.ts`

Each was replaced with a clear comment block:
```typescript
// SERVER-ONLY: This module must only be imported by server-side code (API routes,
// other lib/ modules). Do not import from client components. The `server-only`
// package is not currently installed; server-only enforcement is structural.
```

Server-only enforcement is currently **structural**: these modules are only imported
by `app/api/**` route handlers, which Next.js always runs server-side.

### Future Recommendation

When a future phase adds `server-only` to `package.json` and runs `npm install`,
the `import "server-only"` statements can be restored for build-time enforcement.

## DB Client Scaffold

### Changes Made

The original `lib/db/client.ts` used deferred `require()` calls for `pg` and
`drizzle-orm/node-postgres`. Since both packages are already listed in `package.json`
dependencies, these were replaced with standard static ES imports:

```typescript
import { Pool } from "pg";
import { drizzle, NodePgDatabase } from "drizzle-orm/node-postgres";
```

### Safety Properties

| Property | Status |
|----------|--------|
| Does not throw during import | ✅ — `getDbClient()` is lazy, no top-level connection |
| Does not connect to DB on import | ✅ — `pg.Pool` connects lazily on first query |
| Returns null when DATABASE_URL missing | ✅ — with console.warn |
| Proper TypeScript return type | ✅ — `NodePgDatabase \| null` |
| Does not create tables/migrations | ✅ |
| Not exposed to client bundles | ✅ — only imported by server-side code |

## Route Behavior

### POST `/api/enrichment/attest`
- Resolves account via `getCurrentEnrichmentAccount()`
- Validates `{ agree: boolean }` — must be `true`
- Stores attestation via `compliance.ts` (in-memory mock store)
- Returns `{ ok: true, data: { attested: true } }`

### POST `/api/enrichment/quote`
- Resolves account, requires attestation
- Validates: `address`, `latitude`, `longitude`, `productType`
- Generates `propertyHash` via `createPropertyHash()`
- Credit cost from server-side price table:
  - PROPERTY_PROFILE: 5 credits
  - OWNER_CONTACT: 10 credits
  - ROOF_INTELLIGENCE: 10 credits
  - FULL_STORM_LEAD: 20 credits
- Stores quote via `saveMockQuote()` from mock-store
- Returns: `quoteId`, `propertyHash`, `productType`, `creditCost`, `expiresAt`
- Quote expires in 15 minutes
- Does NOT charge credits

### POST `/api/enrichment/unlock`
- Resolves account, requires attestation
- Requires `Idempotency-Key` header
- Checks `getMockUnlock()` for idempotent replay
- Validates `{ quoteId: string }`
- Looks up quote via `getMockQuote()` from mock-store
- Verifies quote belongs to account, not expired
- Calls `getProviderForProduct()` → mock provider only
- Does NOT charge if provider returns no usable data
- Applies suppression redaction (empty set in mock mode)
- Debits credits via `getMockLedgerStore()` → `debitAccount()`
- Encrypts contact payload (warns if key not set)
- Caches result via `saveMockUnlock()` for replay
- Returns decrypted data immediately to purchasing user

### GET `/api/enrichment/unlocked-data`
- **Skipped** — returns 501
- Requires DB persistence (enrichment_unlocks table) before implementation

## Mock Mode Behavior

When `ENRICHMENT_MOCK_MODE=true`:
- Auth returns deterministic mock account (`mock-user@storm-map.local`)
- Attestations stored in `compliance.ts` in-memory map
- Quotes stored via `mock-store.ts` in-memory map
- Ledger uses `MemoryCreditLedgerStore` singleton with 1000 starter credits
- Unlock cache stored via `mock-store.ts` in-memory map
- Mock provider returns realistic sample data (Phase 1D)

When `ENRICHMENT_MOCK_MODE` is NOT `true`:
- `getCurrentEnrichmentAccount()` throws `AuthNotConfiguredError`
- Route returns `501 AUTH_NOT_CONFIGURED` with clear message
- Mock fallback does NOT silently operate

## Remaining Limitations Before Production

1. **Auth** — Mock only, no real session/token verification
2. **DB persistence** — All in-memory, lost on restart. Tables not created yet.
3. **Suppression list** — Empty set, no real opt-out checking
4. **Audit logging** — Function boundaries exist but no persistence
5. **Encryption key management** — Manual env var, no rotation
6. **Rate limiting** — None
7. **Real vendors** — Only mock provider connected
8. **Payment/Stripe** — Not implemented
9. **Frontend UI** — Not created
10. **unlocked-data route** — Placeholder only
11. **server-only enforcement** — Structural only, no build-time guard

## Recommended Phase 1F Scope

1. Run database migrations to create tables from `lib/db/schema/enrichment.ts`
2. Implement `DrizzleCreditLedgerStore` to replace `MemoryCreditLedgerStore`
3. Persist quotes to `enrichment_quotes` table
4. Persist unlocks to `enrichment_unlocks` table (with encrypted contact payload)
5. Implement `GET /api/enrichment/unlocked-data` with real DB lookups
6. Implement audit log persistence
7. Load suppression hashes from `suppression_list` table
8. Add `server-only` to `package.json` and restore `import "server-only"` in all lib modules
9. Add basic frontend enrichment UI (quote → attest → unlock flow)
10. Consider Stripe checkout for credit purchases
11. Integrate real auth provider
