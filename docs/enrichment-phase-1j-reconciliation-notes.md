# Phase 1J Reconciliation Notes

This document details the reconciliation of the live Phase 1J server deployment with the committed state of the GitHub repository.

---

## 1. Reconciled Changes
The following previously uncommitted changes (which were active on the live server) have been committed and merged into the repository:

* **DNS Conflict Resolution (`docker-compose.yml`)**
  - Renamed the Postgres container service from `postgres` to `storm-postgres` to prevent routing collisions on the shared external `coolify` network.
  - Updated `DATABASE_URL` in the app service definition to point to `storm-postgres`.
* **Mock Provider Fallback (`lib/enrichment/providers/mock.ts`)**
  - Added support for `ENRICHMENT_DB_TEST_PROVIDERS=true` in `isConfigured()`, allowing the mock provider to be used as a fallback during real database integration testing.
* **Map Popup Layout Fixes (`components/storm-map/StormMap.tsx`)**
  - Added max-height (`max-h-80` and `max-h-[360px]`) and scrolling (`overflow-y-auto pr-1`) wrappers to individual report, cluster, and lead target popups to prevent them from being cut off at the bottom of the map container.
* **Compliance Attestation Response (`app/api/enrichment/attest/route.ts`)**
  - Modified the response to return root-level `success: true` and the attestation ID (`data.attestation.id`) to match integration test assertions.
* **Unlock Idempotency Replay (`app/api/enrichment/unlock/route.ts`)**
  - Updated the idempotent replay logic to retrieve the original `unlockId` from the database and return it when clients re-submit a request with the same `Idempotency-Key` header.

---

## 2. Route Safety Confirmation
- **`ENRICHMENT_FEATURE_ENABLED`** is set to `false` in the repository and live deployment.
- **`ENRICHMENT_ALLOW_MOCK_IN_PRODUCTION`** is set to `false`.
- **`ENRICHMENT_MOCK_MODE`** is set to `true` (default fallback, but inactive since the feature flag is disabled).
- Verified that all four `/api/enrichment/*` endpoints return `503 Service Unavailable (FEATURE_DISABLED)`.

---

## 3. Database Status
- The database schema is fully initialized on the PostgreSQL server.
- The app successfully connects to PostgreSQL using the secure randomly generated database credentials.

---

## 4. Remaining Risks
* **Mock Provider Only**: Real provider APIs (Attom, BatchData, EagleView, Melissa, Trestle) are not yet integrated.
* **No Authentication**: clerk/supabase integration is not active (mock auth identity is used during testing).
* **No Stripe**: Payment processing and credit balance top-ups are not implemented.
* **Rate Limiting**: No rate-limiting is configured on the enrichment endpoints.
* **Backup Strategy**: No automated snapshot or backup process exists for the persistent volume.
