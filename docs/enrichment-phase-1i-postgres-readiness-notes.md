# Enrichment API — Phase 1I: PostgreSQL Readiness Notes

## Overview

Phase 1I prepares the database infrastructure for the enrichment system without
running migrations or connecting real providers. The enrichment feature remains
disabled (`ENRICHMENT_FEATURE_ENABLED=false`).

## Files Changed

| # | File | Change |
|---|------|--------|
| 1 | `docker-compose.yml` | Added `postgres` service (PostgreSQL 16-alpine), persistent volume, healthcheck, `depends_on`, and `DATABASE_URL` for the app |
| 2 | `.env.example` | Added `POSTGRES_USER`, `POSTGRES_PASSWORD`, `POSTGRES_DB`, `DATABASE_URL` with full documentation |
| 3 | `drizzle.config.ts` | Updated output directory from `./lib/db/migrations` to `./drizzle` (conventional path) |
| 4 | `drizzle/.gitkeep` | Created to track the migrations output directory |
| 5 | `lib/db/schema/enrichment.ts` | Added performance indexes on frequently-queried foreign key columns |
| 6 | `docs/enrichment-phase-1i-postgres-readiness-notes.md` | This file |

## PostgreSQL Service Design

### docker-compose.yml

```yaml
postgres:
  image: postgres:16-alpine
  restart: always
  environment:
    POSTGRES_USER: ${POSTGRES_USER:-stormmap}
    POSTGRES_PASSWORD: ${POSTGRES_PASSWORD:-changeme_local_only}
    POSTGRES_DB: ${POSTGRES_DB:-storm_map}
  volumes:
    - pgdata:/var/lib/postgresql/data   # Persistent named volume
  healthcheck:
    test: pg_isready -U stormmap -d storm_map
    interval: 10s, timeout: 5s, retries: 5
```

### App Service Changes

- `depends_on: postgres: condition: service_healthy` — App waits for Postgres
  to be healthy before starting.
- `DATABASE_URL` added to app environment, using Docker Compose variable
  interpolation to match the postgres service credentials.
- All existing Traefik labels preserved exactly.
- `ENRICHMENT_FEATURE_ENABLED` remains `false`.

### Volume

```yaml
volumes:
  pgdata:
    driver: local
```

Data persists across container restarts and redeployments. To reset the database,
the operator must explicitly remove the volume.

## Drizzle Config

| Setting | Value |
|---------|-------|
| Schema path | `./lib/db/schema/enrichment.ts` |
| Output path | `./drizzle` |
| Driver | `pg` |
| Connection | `process.env.DATABASE_URL` |
| Verbose | `true` |
| Strict | `true` |

## DATABASE_URL Expectations

The app reads `DATABASE_URL` from the container environment at runtime:

- **Docker Compose (default)**: `postgresql://stormmap:changeme_local_only@postgres:5432/storm_map`
  - `postgres` is the Docker Compose service hostname, resolved via Docker DNS
- **External managed DB**: Replace with the provider's connection string
  (e.g., Supabase, Neon, or self-hosted)
- **Local development**: `postgresql://user:password@localhost:5432/storm_map`

## Schema Changes

### Indexes Added

| Table | Index Name | Column(s) | Rationale |
|-------|-----------|-----------|-----------|
| `compliance_attestations` | `attestations_account_id_idx` | `account_id` | `hasRecentAttestation()` queries by accountId |
| `credit_ledger` | `ledger_account_id_idx` | `account_id` | Ledger lookups by account |
| `enrichment_quotes` | `quotes_account_id_idx` | `account_id` | Quote lookups by account |
| `audit_logs` | `audit_account_id_idx` | `account_id` | Audit filtering by account |
| `audit_logs` | `audit_action_idx` | `action` | Audit filtering by action type |
| `audit_logs` | `audit_created_at_idx` | `created_at` | Audit time-range queries |

### Existing Constraints Verified

| Constraint | Table | Status |
|-----------|-------|--------|
| `auth_provider_user_idx` (unique) | `accounts` | ✅ Exists |
| `credit_balance_check` (CHECK >= 0) | `accounts` | ✅ Exists |
| `idempotency_key` (unique) | `credit_ledger` | ✅ Exists |
| `account_prop_prod_idx` (unique) | `enrichment_unlocks` | ✅ Prevents duplicate charges |
| `value_hash` (unique) | `suppression_list` | ✅ Exists |
| `email` (unique) | `accounts` | ✅ Exists |

### Security Review

| Check | Status |
|-------|--------|
| No plaintext contact data columns | ✅ Only `encrypted_contact_payload` (text, AES-encrypted) |
| No password fields | ✅ |
| No SSN/DOB/exact-age fields | ✅ |
| Contact data encrypted at rest | ✅ AES-256-GCM via `encryptContactPayload()` |

## Why Migrations Were Not Run

1. No database exists yet on the server — the postgres service has not been
   deployed.
2. Phase 1I is infrastructure preparation only.
3. Running migrations requires a live PostgreSQL instance accepting connections.
4. The operator should generate and run migrations after deploying the updated
   docker-compose.yml with the postgres service.

## What an Operator Would Do Later

After deploying the updated docker-compose.yml:

1. **Generate migrations**: Use drizzle-kit to introspect the schema file and
   produce SQL migration files in the `drizzle/` directory. This compares the
   TypeScript schema definitions against an empty database and generates the
   CREATE TABLE statements with all indexes, constraints, and foreign keys.

2. **Review generated SQL**: Inspect the generated migration files to ensure
   they match expectations. Check for any destructive changes.

3. **Apply migrations**: Use drizzle-kit to push the schema to the live
   PostgreSQL database. This creates all 7 tables (accounts,
   compliance_attestations, credit_ledger, enrichment_quotes,
   enrichment_unlocks, suppression_list, audit_logs) with their indexes
   and constraints.

4. **Verify**: Connect to the database and confirm all tables exist with the
   expected columns, indexes, and constraints.

5. **Switch from mock to real**: Set `ENRICHMENT_MOCK_MODE=false` in the app
   environment. The store resolver will then use `DrizzleEnrichmentStore`
   instead of `MockEnrichmentStore`.

6. **Enable the feature**: Set `ENRICHMENT_FEATURE_ENABLED=true` only after
   all prerequisites are met (auth, Stripe, real providers, rate limiting).

## Required Production Secrets

Before enabling enrichment in production, the following secrets must be
configured with real values (NOT the defaults in docker-compose.yml):

| Secret | Purpose |
|--------|---------|
| `POSTGRES_PASSWORD` | PostgreSQL superuser password |
| `ENRICHMENT_ENCRYPTION_KEY` | 32-byte hex key for AES-256-GCM |
| `ENRICHMENT_ADMIN_TEST_TOKEN` | Test token for gated mock access |
| `DATABASE_URL` | Full connection string with real credentials |

> [!WARNING]
> The default values in docker-compose.yml (`changeme_local_only`,
> `0123456789abcdef...`) are **placeholder values for local development only**.
> They MUST be replaced with cryptographically random values before any
> production deployment.

## Reminders

> [!IMPORTANT]
> `ENRICHMENT_FEATURE_ENABLED` remains `false`. All enrichment routes return
> 503 FEATURE_DISABLED. This is intentional.

> [!IMPORTANT]
> `ENRICHMENT_ALLOW_MOCK_IN_PRODUCTION` remains `false`. Mock mode is blocked
> in production. Even if someone sets `ENRICHMENT_FEATURE_ENABLED=true`, mock
> data cannot be served without also setting `ENRICHMENT_ALLOW_MOCK_IN_PRODUCTION=true`
> and providing a valid `x-enrichment-test-token` header.

## Remaining Risks

1. **Postgres not yet deployed** — docker-compose.yml is updated but not pushed/deployed
2. **Migrations not generated or run** — No SQL files exist yet
3. **Default credentials in docker-compose** — Must be replaced before production
4. **drizzle-kit version** — v0.21 uses deprecated `driver: "pg"` config format; may need update when upgrading
5. **No backup strategy** — Named volume has no automated backup
6. **Mock auth only** — No real authentication configured
7. **No Stripe** — No credit purchase mechanism
8. **No real vendors** — Mock provider only
9. **No rate limiting** — API routes unprotected from abuse
