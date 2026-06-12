# Phase 1K: Authentication & User Context Resolution

This document details the integration of Clerk authentication and mapping to internal persistent accounts in Phase 1K.

## Files Changed

1. **`lib/enrichment/auth.ts`**
   - Implemented real Clerk authentication and mapping.
   - Decoupled mock context fallback behind controlled test/mock flags (`ENRICHMENT_MOCK_MODE` or `ENRICHMENT_DB_TEST_AUTH`).
   - Introduced `handleAuthError(err)` helper to standardize error mapping in route handlers.
2. **`app/api/enrichment/quote/route.ts`**
   - Updated catch blocks to use unified `handleAuthError` helper.
3. **`app/api/enrichment/unlock/route.ts`**
   - Updated catch blocks to use unified `handleAuthError` helper.
4. **`app/api/enrichment/unlocked-data/route.ts`**
   - Updated catch blocks to use unified `handleAuthError` helper.
5. **`app/api/enrichment/attest/route.ts`**
   - Confirmed handleAuthError usage and clean account/identity resolution.
6. **`app/layout.tsx`**
   - Wrapped React tree with `<ClerkProvider>` for site-wide Clerk support.
7. **`middleware.ts`**
   - Integrated Clerk middleware protecting `/api/enrichment/*` paths while allowing public routes (such as the landing and map view pages) to be accessed freely.
8. **`app/sign-in/[[...sign-in]]/page.tsx` & `app/sign-up/[[...sign-up]]/page.tsx`**
   - Formulated dynamic custom sign-in and sign-up pages using Clerk components styled with dark B2B SaaS aesthetics.
9. **`.env.example`**
   - Configured placeholders for Clerk publishing and secret keys, along with path routing properties.

---

## Why Clerk was Chosen

Clerk was selected as the authentication provider for the following reasons:
- **Session Management:** Seamless built-in session state and automatic cookie injection/validation via middleware.
- **Next.js Integration:** Zero-boilerplate layout provider and server-side utilities (`currentUser()`, `auth()`).
- **Identity Merging:** Built-in validation of email verification status and multi-identity oauth support.
- **Custom Appearance API:** High flexibility to theme inputs, cards, and buttons to match the dark slate storm map style without bloated custom HTML form components.

---

## Clerk User Mapping to Internal Accounts Table

Internal operations (quoting, unlocking, ledger balances) use the `accounts` table instead of direct Clerk queries to support database constraints and future migrations.

1. Authentication occurs at the middleware layer.
2. The route invokes `getCurrentEnrichmentAccount(request)`.
3. The resolver reads the active Clerk session via `currentUser()`.
4. It extracts:
   - `clerkUser.id` (mapped to `authUserId` in database)
   - Primary email address (mapped to `email` in database)
5. It performs an upsert against the `accounts` table using the unique constraint index `(auth_provider, auth_user_id)`:
   - **Provider:** `"clerk"`
   - **User ID:** Clerk user ID
6. The database returns the internal `uuid` of the account, which is then used as the foreign key in all subsequent transactions (audits, ledger entries, quotes, and unlocks).

---

## Public / Private Route Strategy

> [!NOTE]
> The public marketing content and the main storm-map screen must remain accessible to anonymous visitors.

- **Public Routes:** Home (`/`), main GIS map canvas (`/storm-map`), geocoding APIs, and weather/alerts APIs require no session.
- **Protected Routes:** Only data-mutating or cost-charging routes under `/api/enrichment/*` require an active Clerk session.
- **Mock Bypass:** Under development/controlled testing (`ENRICHMENT_MOCK_MODE=true` or `ENRICHMENT_DB_TEST_AUTH=true`), Clerk checks are skipped in the middleware and resolver layers to allow fast, local DB-backed flow validations.

---

## Environment Variables Required

Add the following keys to your `.env` or system environment:

```bash
# Clerk Keys
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...

# Route Matching Configuration
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/storm-map
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/storm-map
```

---

## Mock Auth vs. Real Auth Behavior

| Phase / Flag | `ENRICHMENT_MOCK_MODE` | `ENRICHMENT_DB_TEST_AUTH` | Auth Behavior | Database Behavior |
|---|---|---|---|---|
| **Local Mock Testing** | `true` | `false` / `true` | Bypasses Clerk; returns `MOCK_ACCOUNT` | Bypasses Postgres; uses mock store |
| **Local DB Integration Testing** | `false` | `true` | Bypasses Clerk; returns `MOCK_ACCOUNT` | Connects to Postgres; maps transactions to mock account |
| **Staging/Production Auth** | `false` | `false` | Demands Clerk authentication | Connects to Postgres; maps to real Clerk-provisioned account |

---

## Remaining Steps before Public Enrichment Launch

Before setting `ENRICHMENT_FEATURE_ENABLED=true` in production:
1. **Connect Real Data Vendors:** Swap mock data providers with live real estate and property data feeds.
2. **Implement Stripe Payments:** Enable buying credits using real payment tokens.
3. **Build Credit Purchase UI:** Add a frontend component to top up balances.
4. **Create Enrichment UI Panels:** Add overlays on the map to trigger property profiles, owner contacts, and roof intelligence unlocking.

> [!WARNING]
> `ENRICHMENT_FEATURE_ENABLED` is explicitly configured to `false` by default to prevent any accidental exposure of billing/enrichment routes.
