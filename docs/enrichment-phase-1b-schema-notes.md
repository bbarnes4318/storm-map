# Enrichment Schema Notes (Phase 1B)

This document outlines the schema configurations and design choices implemented in Phase 1B.

---

## 1. Files Added
- **[`lib/db/schema/enrichment.ts`](file:///C:/Users/jimbo/.gemini/antigravity/worktrees/storm-map/build-storm-intel-map/lib/db/schema/enrichment.ts):** Contains Drizzle ORM definitions for relational PostgreSQL tables.
- **[`lib/enrichment/schemas.ts`](file:///C:/Users/jimbo/.gemini/antigravity/worktrees/storm-map/build-storm-intel-map/lib/enrichment/schemas.ts):** Standard Zod validation templates and types for normalized API queries.
- **[`lib/enrichment/crypto-types.ts`](file:///C:/Users/jimbo/.gemini/antigravity/worktrees/storm-map/build-storm-intel-map/lib/enrichment/crypto-types.ts):** Type and constant definitions for the server-side AES-256-GCM encryption wrapper.

---

## 2. Relational Models Configuration

Seven database tables were designed using Drizzle ORM:
1. **`accounts`:** Storefront for user credit balances. Maps to external logins.
2. **`complianceAttestations`:** Track compliance attestations (agree checks, timestamps, client IP/user-agents).
3. **`creditLedger`:** Double-entry ledger tracking purchases, refunds, and spend events.
4. **`enrichmentQuotes`:** Pre-checkout quotes caching pricing and locking rates.
5. **`enrichmentUnlocks`:** Purchase logging linking users, target properties, property details, and encrypted contact strings.
6. **`suppressionList`:** SHA256 suppression indexes for phone/email opt-outs.
7. **`auditLogs`:** Immutable security logs auditing access attempts.

---

## 3. Privacy & Compliance Architecture Decisions

### Auth-Agnostic Accounts
- The application currently has no auth framework (e.g. Clerk, Auth0, Supabase).
- To avoid lock-in and prevent writing temporary password tables, we decouple credentials entirely. 
- The `accounts` table stores an `authProvider` string and `authUserId` mapping. When an auth system is introduced, it simply maps to this index, requiring zero database migrations.

### Encryption-at-Rest (`encryptedContactPayload`)
- Public records (lot size, year built, foundation material) are stored as unencrypted JSONB inside `propertyProfilePayload` for fast parsing.
- Personally Identifiable Information (first name, last name, phone lists, email lists) is never stored in unencrypted JSONB.
- Instead, PII is stored inside `encryptedContactPayload` as a string. On-the-fly server-side AES-256-GCM encryption keeps contact records completely unreadable at rest, protecting sensitive contacts.

### Data Restrictions (DOB, SSN, Exact Age Excluded)
- Strict compliance rules prohibit tracking exact birthdates, Social Security numbers, or raw credit scores.
- Age is represented strictly as an option-based `ageRange` string (e.g. `'55-64'`), minimizing liability under regulatory frameworks.
