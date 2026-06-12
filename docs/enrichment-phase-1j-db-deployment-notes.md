# Phase 1J: PostgreSQL Persistence Deployment & Verification Notes

This document details the operational deployment, schema migration, integration testing, and final security lockdown of the property enrichment database layer on the Hetzner server (`87.99.155.241`).

---

## 1. Deployment Architecture

The application is deployed using Docker Compose on a Hetzner instance under the Coolify platform, utilizing two primary services:
1. **`storm-postgres`**: PostgreSQL 16-alpine container (`storm-map-postgres`).
   - Uses the persistent host volume `current_pgdata` mapped to `/var/lib/postgresql/data`.
2. **`storm-map-app`**: Next.js App Router container (`storm-map-app`).
   - Integrates with the database using Drizzle ORM via standard pooling (`pg`).

### Network & DNS Isolation Fix
During initial database connections in DB test mode, we identified a **DNS collision** on the shared external `coolify` network. The service name `postgres` was resolving to the main `coolify-db` instance rather than our local `storm-map-postgres` container. 
To resolve this:
- Renamed the Docker Compose service from `postgres` to `storm-postgres`.
- Updated `DATABASE_URL` inside the app container environment to connect to `storm-postgres:5432` instead of `postgres:5432`.
- Stopped, cleaned up, and recreated the database container. This resolved all connection issues and successfully established isolated local connectivity.

---

## 2. Schema Migration

The initial database schema was successfully applied to PostgreSQL by piping the Drizzle-generated SQL migration script (`drizzle/0001_initial_enrichment_schema.sql`) directly into the `psql` shell.

The 7 required tables, including all constraints, checks, and indexes, were verified as successfully created:
* `accounts` (auth-provider unique index, credit balance $\ge$ 0 check)
* `compliance_attestations` (FK to accounts, account_id index)
* `credit_ledger` (FK to accounts, idempotency key unique constraint, account_id index)
* `enrichment_quotes` (FK to accounts, account_id index)
* `enrichment_unlocks` (FK to accounts, composite account-property-product unique constraint)
* `suppression_list` (value hash unique constraint)
* `audit_logs` (FK to accounts, index on action, index on created_at)

---

## 3. Integration Testing & Verification

A controlled integration test was run using `scripts/verify-enrichment.mjs` against the live server in DB test mode (`ENRICHMENT_FEATURE_ENABLED=true`, `ENRICHMENT_MOCK_MODE=false`). 

The test verified 20/20 checks covering all aspects of the database and transactional architecture:

### 1. Compliance Attestation
- **POST `/api/enrichment/attest`**
- Verified that recording compliance agreement successfully inserts a row into `compliance_attestations` and creates an audit log entry in `audit_logs` against the correct account.
- Handled correction in the response JSON to include the root-level `success: true` and `data.attestation.id` fields expected by the test framework.

### 2. Quote Generation
- **POST `/api/enrichment/quote`**
- Successfully generated a 5-credit quote for product type `PROPERTY_PROFILE` at the target coordinates and persisted the quote details to the `enrichment_quotes` table.

### 3. Credit Transaction & Rollback
- **POST `/api/enrichment/unlock`**
- **Test 3a: Rollback Check (0 Credits)**: Attempted to unlock the quote while the test account had 0 credits.
  - Successfully rejected with `402 INSUFFICIENT_CREDITS`.
  - **SQL Verification**: Queried the tables to prove that the transaction rolled back. `enrichment_unlocks` and `credit_ledger` count remained strictly `0`. No partial data or ledger debits were committed.
- **Test 3b: Successful Unlock**: Granted the test account 100 credits via SQL command and re-submitted the unlock.
  - Successfully debited 5 credits.
  - Persisted the unlock record in `enrichment_unlocks` and the credit transaction in `credit_ledger`.
  - Encrypted contact payloads successfully via AES-256 (using `ENRICHMENT_ENCRYPTION_KEY`).

### 4. Idempotency Replay
- Re-submitted the unlock request with the *same* `Idempotency-Key` header.
- The server successfully detected the existing ledger entry, retrieved the original unlock, and returned a `200 OK` response with the identical `unlockId` without double-charging the account.

### 5. Decryption & Retrieval
- **GET `/api/enrichment/unlocked-data`**
- Retrieved the unlocked lead.
- The route successfully read the record from `enrichment_unlocks`, decrypted the contact payload, and returned the combined property profile and contact data.

---

## 4. Frontend Map Popups Fix

While clicking individual storm report circles and cluster count bubbles successfully opened popups, long NOAA comments and large target details caused the popups to extend past the screen viewport, resulting in cut-offs at the bottom of the map container.

To correct this:
* Updated `components/storm-map/StormMap.tsx`'s `<Popup>` child containers (`clickedTarget`, `selectedReport`, and `selectedCluster`) to include maximum height constraints and internal vertical scrollbars:
  - Clicked Target: Added `max-h-80 overflow-y-auto pr-1`
  - NOAA Storm Report: Added `max-h-80 overflow-y-auto pr-1`
  - Storm Cluster Area: Added `max-h-[360px] overflow-y-auto pr-1`
* This ensures that on all screen sizes, popup containers stay within the boundaries of the map canvas, and any overflow content (such as long comments or lists of top reports) is cleanly scrollable and fully legible.

---

## 5. Security Lockdown

Following successful testing, the environment was reverted to **locked-down production mode**:
- `ENRICHMENT_FEATURE_ENABLED=false`
- `ENRICHMENT_MOCK_MODE=true`
- `ENRICHMENT_ALLOW_MOCK_IN_PRODUCTION=false`
- Removed all DB test flags (`ENRICHMENT_DB_TEST_AUTH`, `ENRICHMENT_DB_TEST_PROVIDERS`).

### Lock Verification
Calling `/api/enrichment/attest` and `/api/enrichment/unlocked-data` routes now returns:
```http
HTTP/1.1 503 Service Unavailable
Content-Type: application/json

{"ok":false,"error":"FEATURE_DISABLED","message":"The enrichment feature is not enabled on this server. Set ENRICHMENT_FEATURE_ENABLED=true to enable."}
```
No mock routes or database write paths are accidentally exposed to production users.
