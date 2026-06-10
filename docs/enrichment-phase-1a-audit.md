# Codebase Audit - Homeowner & Property Enrichment Credit System (Phase 1A)

This document presents a file-level evidence-based audit of the current **StormTarget Live / AurumShield** repository. It evaluates existing authentication, database, payment, and page integration patterns to formulate structural recommendations.

---

## 1. Authentication Audit

We searched the codebase for authentication libraries, middleware, sessions, and user management references.

### Findings:
- **`package.json`:** No dependencies for Clerk (`@clerk/nextjs`), Auth0 (`@auth0/nextjs-auth0`), Supabase Auth (`@supabase/supabase-js`), or NextAuth/Auth.js.
- **Project Structure:** 
  - No `middleware.ts` or `middleware.js` file exists at the repository root.
  - No folder structures for login/signup flows exist in `app/`.
- **Search Queries:**
  - Queries for `session`, `getServerSession`, `currentUser`, `JWT`, `auth()`, `userId` returned zero results in application code.
  - The word `account` appears only in a Traefik setup script warning message: `echo "WARNING: Access this portal immediately and create the FIRST admin account."` inside [bootstrap/01-install-coolify.sh](file:///C:/Users/jimbo/.gemini/antigravity/worktrees/storm-map/build-storm-intel-map/infra/hetzner/storm-map/bootstrap/01-install-coolify.sh).

### Conclusion:
The current codebase has **no** authentication system. Authentication checks must be simulated/mocked for API development and designed to read external headers (e.g., Clerk or Supabase claims) in production.

---

## 2. Database / ORM Audit

We searched the codebase for database configurations, connection drivers, configuration files, and schema definitions.

### Findings:
- **`package.json`:** No database drivers (`pg`, `mysql2`, `sqlite3`), query builders (`knex`), or ORMs (`prisma`, `drizzle-orm`) are present in dependencies.
- **Project Structure:**
  - No configurations like `drizzle.config.ts`, `schema.ts`, `prisma.schema`, `schema.prisma`, or `.prisma/` exist in the repository.
- **Search Queries:**
  - Search queries for `DATABASE_URL`, `schema`, `migration`, `db`, and `sql` yielded zero results in configuration or source files.

### Conclusion:
The codebase has **no** database or ORM configured. The app relies entirely on public APIs and in-memory caches. A database structure must be introduced to store accounts and credit ledgers.

---

## 3. Payments / Credits Audit

We searched the codebase for payment processing, ledger management, and credit tracking.

### Findings:
- **`package.json`:** No package references for Stripe (`stripe`, `@stripe/stripe-js`) or other payment processors.
- **Search Queries:**
  - `Stripe`, `balance`, `ledger`, `billing`, `checkout`, `subscription`, `invoice`, and `wallet` returned zero results.
  - The term `credits` returned exactly one hit: a comment in [app/page.tsx:L250](file:///C:/Users/jimbo/.gemini/antigravity/worktrees/storm-map/build-storm-intel-map/app/page.tsx#L250) reading `<!-- Corporate compliance credits note footer -->` (representing a layout helper, not payment code).

### Conclusion:
There is **no** existing payment gateway or credit tracking ledger in the repository.

---

## 4. API Routes Audit

We inspected the files under `app/api/` to document route patterns, responses, and error handling.

### Existing API Routes:
1. **`/api/weather/alerts`** - defined in [alerts/route.ts](file:///C:/Users/jimbo/.gemini/antigravity/worktrees/storm-map/build-storm-intel-map/app/api/weather/alerts/route.ts)
2. **`/api/weather/spc-reports`** - defined in [spc-reports/route.ts](file:///C:/Users/jimbo/.gemini/antigravity/worktrees/storm-map/build-storm-intel-map/app/api/weather/spc-reports/route.ts)

### Request/Response & Error Design:
- **Method:** `GET` only.
- **Authentication:** None. Both routes are publicly accessible.
- **Caching:** Utilizes a simple custom in-memory cache helper `weatherCache` defined in [lib/weather/cache.ts](file:///C:/Users/jimbo/.gemini/antigravity/worktrees/storm-map/build-storm-intel-map/lib/weather/cache.ts), expiring alerts after 90 seconds and storm reports after 300 seconds.
- **Response Headers:** Sends standard cache headers: `"Cache-Control": "public, max-age=..."` and custom `"X-Cache-Status": "HIT" | "MISS"`.
- **Error Handling:** Standard `try/catch` blocks returning a `NextResponse.json` with code `500` and message structure:
  ```json
  { "error": "Failed to fetch active alerts...", "details": "error message string" }
  ```
- **Base Path Prefix:** The Next.js application runs with a configured `basePath` prefix `/storm-map` (e.g., frontend requests go to `/storm-map/api/weather/...`, but they resolve to standard server route directories `app/api/weather/...`).

---

## 5. Environment Variables Audit

We inspected the variables referenced in code and examples.

### Findings:
- **`.env.example`:** Exposes exactly one variable: `NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN` (used for map styles loading).
- **Environment references in code:**
  - `process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN` is used in [StormMap.tsx](file:///C:/Users/jimbo/.gemini/antigravity/worktrees/storm-map/build-storm-intel-map/components/storm-map/StormMap.tsx) and [geocoding.ts](file:///C:/Users/jimbo/.gemini/antigravity/worktrees/storm-map/build-storm-intel-map/lib/weather/geocoding.ts).
  - No secret variables (e.g., `DATABASE_URL`, `STRIPE_SECRET_KEY`, or provider API keys) exist in example files.

---

## 6. Storm Map Integration Audit

We analyzed the current geocoding structures and page controllers.

### SelectedPropertyTarget Shape:
Defined in [lib/weather/types.ts:L33-L48](file:///C:/Users/jimbo/.gemini/antigravity/worktrees/storm-map/build-storm-intel-map/lib/weather/types.ts#L33-L48):
```typescript
export type SelectedPropertyTarget = {
  id: string;
  latitude: number;
  longitude: number;
  fullAddress: string;
  streetNumber?: string;
  streetName?: string;
  neighborhood?: string;
  city?: string;
  county?: string;
  state?: string;
  postcode?: string;
  source: "mapbox-geocoding" | "map-feature" | "fallback";
  confidence: "exact" | "approximate" | "unknown";
  locked: boolean;
};
```

### State Management & Props:
- The state `selectedProperty` is declared in [app/page.tsx:L47](file:///C:/Users/jimbo/.gemini/antigravity/worktrees/storm-map/build-storm-intel-map/app/page.tsx#L47) via:
  `const [selectedProperty, setSelectedProperty] = React.useState<SelectedPropertyTarget | null>(null);`
- In [StormSidebar.tsx](file:///C:/Users/jimbo/.gemini/antigravity/worktrees/storm-map/build-storm-intel-map/components/storm-map/StormSidebar.tsx), it is received as a prop: `selectedProperty: SelectedPropertyTarget | null`.
- The Sidebar renders details of the locked property only if `selectedProperty` is truthy (around line 215).

### UI Insertion Point:
- The target enrichment UI should be embedded inside [StormSidebar.tsx](file:///C:/Users/jimbo/.gemini/antigravity/worktrees/storm-map/build-storm-intel-map/components/storm-map/StormSidebar.tsx) directly below the **Locked Property Details Card** (around line 260).

---

## 7. Recommendations

Based on codebase evidence:

1. **Accounts Table:** Yes. Introduce the abstract structure `accounts` (`id`, `auth_provider`, `auth_user_id`, `email`, `credit_balance`) to handle credit balances.
2. **Auth Provider Agnostic Model:** The proposed `auth_provider` / `auth_user_id` mapping is correct. It allows session mapping for future integrations (e.g., Clerk) without schema migrations.
3. **Database Selection:** Recommend PostgreSQL (as indicated by Cloud SQL admin tool availability) coupled with **Drizzle ORM**. Drizzle is lightweight, typesafe, and doesn't require global CLI engines.
4. **Mocking Authentication (No Password DB):** Establish a simple session middleware or mock auth context reader mapping request headers (e.g. `X-Auth-User-Id` or token payloads) to `accounts.auth_user_id`. This prevents the need to write custom login/signup password handlers, laying clear hooks for the real auth provider later.
5. **Encrypting Payload:** Store sensitive homeowner datasets using AES-256-GCM symmetric encryption inside `enrichment_unlocks.encrypted_contact_payload`. Decrypt strictly at the API boundary, validating target ownership.
