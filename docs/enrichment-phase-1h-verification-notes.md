# Enrichment API — Phase 1H: Installation, Build, & Route Verification

## Overview

Phase 1H proved that the enrichment backend installs, builds, deploys, and runs
correctly on the production server (Hetzner). All 4 API routes were verified
with real HTTP requests against the live deployment.

## Commands Run

| # | Command | Where | Result |
|---|---------|-------|--------|
| 1 | `git add -A; git status` | Local | 21 files staged |
| 2 | `git commit` | Local | Committed Phase 1F+1G+1H changes |
| 3 | `git push origin build-storm-intel-map` | Local → GitHub | Pushed to bbarnes4318/storm-map |
| 4 | `deploy-storm-map.ps1` (1st deploy) | Local → Hetzner | Docker build succeeded, container started |
| 5 | `deploy-storm-map.ps1` (2nd deploy) | Local → Hetzner | Added ENRICHMENT_MOCK_MODE + ENCRYPTION_KEY env vars |

## Docker Build Output (Server)

```
npm install: added 231 packages, audited 232 packages in 32s
next build: ✓ Compiled successfully

Route (app)                              Size     First Load JS
┌ ○ /                                    11.8 kB        99.6 kB
├ ƒ /api/enrichment/attest               0 B                0 B
├ ƒ /api/enrichment/quote                0 B                0 B
├ ƒ /api/enrichment/unlock               0 B                0 B
├ ƒ /api/enrichment/unlocked-data        0 B                0 B
├ ƒ /api/weather/alerts                  0 B                0 B
└ ƒ /api/weather/spc-reports             0 B                0 B
```

**All enrichment routes compiled and registered as dynamic server-rendered routes.**

## Package Versions (from package.json)

| Package | Version |
|---------|---------|
| drizzle-orm | ^0.30.10 |
| pg | ^8.11.5 |
| server-only | ^0.0.1 |
| next | ^14.2.0 (actual: 14.2.35) |
| react | ^18.2.0 |
| drizzle-kit | ^0.21.4 (devDependency) |

## Environment Variables Added to docker-compose.yml

```yaml
environment:
  - ENRICHMENT_MOCK_MODE=true
  - ENRICHMENT_ENCRYPTION_KEY=0123456789abcdef...
```

## Route Verification Results

All tests performed against `http://87.99.155.241/storm-map/api/enrichment/`.

### POST /api/enrichment/attest

| Test | Expected | Actual | Status |
|------|----------|--------|--------|
| `{ agree: true }` | 200 + attestation recorded | `{ ok: true, data: { attested: true } }` | ✅ |
| `{ agree: false }` | 400 | `{ ok: false, error: "INVALID_REQUEST" }` | ✅ |

### POST /api/enrichment/quote

| Test | Expected | Actual | Status |
|------|----------|--------|--------|
| Valid address + productType | 200 + quoteId | `quoteId: 83e5...`, `creditCost: 5` | ✅ |
| Missing required fields | 400 | Not tested (validation via Zod) | ⚠️ |

### POST /api/enrichment/unlock

| Test | Expected | Actual | Status |
|------|----------|--------|--------|
| Valid quoteId + Idempotency-Key | 200 + unlockId + property data | `unlockId: bf74...`, 5 credits charged, full property profile | ✅ |
| Same Idempotency-Key (replay) | 200 + cached response | `isCached: true`, same credits, no double-charge | ✅ |
| Missing Idempotency-Key | 400 | `error: "IDEMPOTENCY_KEY_REQUIRED"` | ✅ |
| Non-existent quoteId | 404 | `error: "QUOTE_NOT_FOUND"` | ✅ |

### GET /api/enrichment/unlocked-data

| Test | Expected | Actual | Status |
|------|----------|--------|--------|
| Valid unlockId | 200 + decrypted data | Full property profile, lat/lon, addressText | ✅ |
| Missing unlockId param | 400 | `error: "INVALID_REQUEST"` | ✅ |
| Non-existent unlockId | 404 | `error: "QUOTE_NOT_FOUND"` | ✅ |

## Encryption Verification

- `ENRICHMENT_ENCRYPTION_KEY` is set in docker-compose.yml (64 hex chars = 32 bytes)
- The mock provider generates contact data which is encrypted via AES-256-GCM before storage
- `GET /unlocked-data` successfully decrypts and returns property data
- For PROPERTY_PROFILE product type, `contactData` is `null` (no sensitive contact data)
- Contact encryption/decryption will be fully testable when OWNER_CONTACT product type is exercised

## Mock vs Production Mode Boundaries

| Check | Result |
|-------|--------|
| `ENRICHMENT_MOCK_MODE=true` → MockEnrichmentStore used | ✅ Confirmed via route responses (`providerSource: "mock"`) |
| Non-mock mode without DATABASE_URL → fails closed | ✅ Store resolver throws `StoreConfigurationError` |
| Non-mock mode without auth → fails closed | ✅ Auth module throws `AuthNotConfiguredError` |
| Deprecated `mock-store.ts` not imported by routes | ✅ All routes import from `@/lib/enrichment/stores` |

## Files Changed

### Created
| File | Purpose |
|------|---------|
| `drizzle.config.ts` | Drizzle Kit config for migration generation |
| `scripts/verify-enrichment.mjs` | Integration test script for route verification |
| `docs/enrichment-phase-1h-verification-notes.md` | This documentation |

### Modified
| File | Change |
|------|--------|
| `docker-compose.yml` | Added `ENRICHMENT_MOCK_MODE` and `ENRICHMENT_ENCRYPTION_KEY` env vars |

## What Was NOT Done (and Why)

### Database Migrations
- **Not created or run.** The server has no PostgreSQL database configured. The docker-compose.yml runs only the app container. Database migrations require a PostgreSQL instance (either in docker-compose or an external managed DB).
- The Drizzle schema is complete in `lib/db/schema/enrichment.ts` and `drizzle.config.ts` is ready for `drizzle-kit generate:pg`.

### Transaction Rollback Testing
- **Not tested against real PostgreSQL.** Transaction rollback requires a live database. The mock store's `runInTransaction()` executes directly (no real rollback). The Drizzle store's `runInTransaction()` uses `db.transaction()` which will provide real rollback once a database is connected.

### Drizzle Transaction Type Cast
- The `as unknown as DbOrTx` cast in `drizzle-store.ts` remains. Drizzle's `db.transaction()` callback receives a transaction-scoped handle whose type varies by driver version. The cast isolates this in a single location within `runInTransaction()`. It will be verified when PostgreSQL integration testing is possible.

## Remaining Risks

1. **No PostgreSQL database** — All persistence is in-memory (mock store). Server restart loses all state.
2. **Transaction rollback unverified** — The Drizzle `db.transaction()` wrapper is structurally correct but has not been tested against a real database.
3. **Mock auth only** — No real authentication. All requests resolve to the same mock account.
4. **Mock provider only** — No real data vendors (ATTOM, BatchData, etc.) connected.
5. **No Stripe** — No credit purchase mechanism. Mock account starts with 1000 credits.
6. **No rate limiting** — API routes have no request rate limits.
7. **`server-only` import** — Installed and building successfully, but not tested with a client component that accidentally imports a server module (the package is designed to throw a build error in that case).

## Recommended Phase 1I Scope

1. **Add PostgreSQL to docker-compose** — Either add a `postgres` service to docker-compose.yml or configure an external managed database (Supabase, Neon, etc.)
2. **Run Drizzle migrations** — `npx drizzle-kit generate:pg` then `npx drizzle-kit push:pg`
3. **Test with real database** — Disable `ENRICHMENT_MOCK_MODE`, set `DATABASE_URL`, verify all routes against real PostgreSQL
4. **Verify transaction rollback** — Intentionally fail mid-transaction and confirm partial writes are rolled back
5. **Test OWNER_CONTACT product type** — Verify encryption/decryption of contact data through the full flow
6. **Add rate limiting** — Protect enrichment API routes from abuse
7. **Integrate real auth** — Clerk or Supabase authentication
8. **Build frontend UI** — Attestation → Quote → Unlock flow in the map sidebar
