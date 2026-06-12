# Admin Credit & Ledger Management (Phase 1M)

This document details the implementation of the admin-only credit allocation and transaction audit console. This system enables administrators to search accounts, grant manual credits, inspect unlock operations, and review audit/ledger history directly before integrating automated payment flows (Stripe).

## Files Changed/Added

1. **Guard Configuration:**
   - [admin-auth.ts](file:///C:/Users/jimbo/.gemini/antigravity/worktrees/storm-map/build-storm-intel-map/lib/enrichment/admin-auth.ts) **[NEW]**: Centralized admin check comparing the active server-side Clerk context against env allowlists.
2. **Store Layers:**
   - [types.ts](file:///C:/Users/jimbo/.gemini/antigravity/worktrees/storm-map/build-storm-intel-map/lib/enrichment/stores/types.ts) **[MODIFY]**: Added `listAccounts`, `listLedgerEntries`, `listUnlocks`, and `listAuditLogs` query signatures.
   - [mock-store-adapter.ts](file:///C:/Users/jimbo/.gemini/antigravity/worktrees/storm-map/build-storm-intel-map/lib/enrichment/stores/mock-store-adapter.ts) **[MODIFY]**: Implemented list filtering and sorting over in-memory collections.
   - [drizzle-store.ts](file:///C:/Users/jimbo/.gemini/antigravity/worktrees/storm-map/build-storm-intel-map/lib/enrichment/stores/drizzle-store.ts) **[MODIFY]**: Implemented PostgreSQL listings utilizing case-insensitive email searches, condition filters, and sorted limits.
3. **API Routes [NEW]:**
   - `GET /api/enrichment/admin/accounts`: Lists accounts with search filters.
   - `GET /api/enrichment/admin/accounts/[accountId]`: Returns detailed status with ledger, unlocks, and audit sub-lists.
   - `POST /api/enrichment/admin/accounts/[accountId]/credits`: Manual credit adjustments.
   - `GET /api/enrichment/admin/ledger`: Filters ledger logs.
   - `GET /api/enrichment/admin/unlocks`: Lists unlock logs with sensitive contact data redacted.
   - `GET /api/enrichment/admin/audit-logs`: Lists action audit logs.
4. **UI Dashboard [NEW]:**
   - [page.tsx](file:///C:/Users/jimbo/.gemini/antigravity/worktrees/storm-map/build-storm-intel-map/app/admin/enrichment/page.tsx): Responsive dashboard with modular panels and transaction modal.
5. **Config & Docs:**
   - [.env.example](file:///C:/Users/jimbo/.gemini/antigravity/worktrees/storm-map/build-storm-intel-map/.env.example) **[MODIFY]**: Added admin enable switches and allowlist placeholders.

---

## Admin Authorization Architecture

### 1. Server-Side Guard Logic
Admin check is executed entirely on the server using Clerk's `currentUser()` function. Client-supplied headers, query parameters, or state roles are strictly disregarded.
A user matches the admin criteria if:
1. `ENRICHMENT_ADMIN_ENABLED` is not explicitly set to `"false"`.
2. The user's Clerk user ID matches a value in `ENRICHMENT_ADMIN_CLERK_USER_IDS`, OR
3. The user has a verified email address matching a value in `ENRICHMENT_ADMIN_EMAILS`.

> [!IMPORTANT]
> If no allowlists are configured in the server's environment variables, the admin guard will automatically reject all requests with `403 Forbidden` to prevent any default access.

---

## Transaction & Audit Guarantees

### 1. Credit Adjustments
Manual credit grants run inside a PostgreSQL transaction (`store.runInTransaction`).
- Balance increases are written through the ledger service (`creditAccount`), ensuring a corresponding `credit_ledger` entry is created with transaction type `BUY_CREDITS`.
- Direct database column updates to the account balance without a matching ledger entry are strictly prohibited.
- Credits adjustment amount must be a positive integer.
- Double-crediting is blocked via unique database index checks on `idempotency_key`.

### 2. Audit Trail
Every manual credit adjustment creates an action log in the `audit_logs` table:
- **Action:** `ADMIN_CREDIT_GRANT`
- **Metadata:** Records target account, amount, reason, admin ID, and idempotency key.
- Sensitive credentials or provider keys are never logged.

---

## UI Console Layout & Design

The dashboard is located under the basePath path at `/storm-map/admin/enrichment` (App Router `app/admin/enrichment/page.tsx`).
Styled with a premium B2B dark slate SaaS aesthetic:
- **Accounts Panel:** List matching user records, search by email, view active credit balances, inspect activity, and launch the "Grant Credits" modal.
- **Credit Ledger Panel:** Consolidated transaction registry highlighting credits added (green) and spent (red) with full descriptions.
- **Unlocks Panel:** Displays geocoded addresses, product types, and charges. Sensitive contact payloads are excluded from list views to prevent leakage.
- **Audit Logs Panel:** System audit events timeline showing action labels, IP logs, and client user-agents.

---

## Stripe Integration Deferred Status
Stripe has not been integrated in this phase to isolate manual ledger balance operations and administrative credit control first. This allows testing all storm-map target selections, attest agreements, and decryption unlock endpoints using manually allocated credits on the staging system prior to adding billing.

---

## Remaining Risks & Mitigation
- **Allowlist Maintenance:** If an administrator's email or user ID changes, the server environment variables must be updated and restarted.
- **Idempotency Keys:** If the admin UI fails to supply an idempotency key, the server generates a stable random UUID fallback to guarantee ledger database unique index checks are satisfied.
