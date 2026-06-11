# Enrichment System - Phase 1D: Provider Abstraction & Mock System

This document outlines the architecture, normalization utilities, error categories, and mock configurations designed for the homeowner/property enrichment provider system in Phase 1D.

---

## 1. Files Added

1. **[base.ts](file:///C:/Users/jimbo/.gemini/antigravity/worktrees/storm-map/build-storm-intel-map/lib/enrichment/providers/base.ts)**:
   - Primary interface contract `EnrichmentProvider` and typed request/response shapes.
2. **[errors.ts](file:///C:/Users/jimbo/.gemini/antigravity/worktrees/storm-map/build-storm-intel-map/lib/enrichment/providers/errors.ts)**:
   - Custom provider exception module (`EnrichmentProviderError`) defining enum-based categories (timeout, authentication, rate limits, no match).
3. **[normalizers.ts](file:///C:/Users/jimbo/.gemini/antigravity/worktrees/storm-map/build-storm-intel-map/lib/enrichment/providers/normalizers.ts)**:
   - Normalization helpers for phone numbers, email addresses, and street addresses.
   - Core SHA-256 hashing functions for property hash generation.
   - Suppression filter that redacts contact details matching suppressed hashes.
4. **[mock.ts](file:///C:/Users/jimbo/.gemini/antigravity/worktrees/storm-map/build-storm-intel-map/lib/enrichment/providers/mock.ts)**:
   - Simulated provider yielding realistic, schema-valid data for development and testing.
5. **[index.ts](file:///C:/Users/jimbo/.gemini/antigravity/worktrees/storm-map/build-storm-intel-map/lib/enrichment/providers/index.ts)**:
   - Provider registry matching products to configured providers based on priority chains.
6. **Vendor Stubs**:
   - Establish empty classes with `isConfigured() { return false; }` for ATTOM, BatchData, Trestle, Melissa, and EagleView.
7. **[enrichment-phase-1d-provider-notes.md](file:///C:/Users/jimbo/.gemini/antigravity/worktrees/storm-map/build-storm-intel-map/docs/enrichment-phase-1d-provider-notes.md)**:
   - This architectural documentation.

---

## 2. Provider Abstraction Summary

All vendor integrations implement a single, unified `EnrichmentProvider` contract:
- `providerName`: Unique string identifier (e.g. `'attom'`, `'batchdata'`).
- `providerDisplayName`: Human-readable label for logs/audit.
- `isConfigured()`: Boolean indicating if environmental credentials (API keys/URLs) are active.
- `supportedProducts`: Array of data products that the vendor can supply.
- `enrich(input)`: Primary request handler yielding a normalized response object.

---

## 3. Mock Provider Behavior

The `MockEnrichmentProvider`:
- Activates automatically when `ENRICHMENT_MOCK_MODE=true` or in non-production environments.
- Returns realistic, schema-valid details for all product types.
- Integrates metadata objects mapping sources to `'mock'` with high confidence (e.g. `0.95`).
- Strictly adheres to compliance rules: omits SSNs and direct birthdates, returning age ranges only.
- Returns zero-cost metrics (`providerCostEstimate: 0`).

---

## 4. Future Provider Routing Plan

The registry defines the following priority routing orders. The first configured provider is selected:
- **`PROPERTY_PROFILE`**: `ATTOM` -> `BatchData` -> `Mock`
- **`OWNER_CONTACT`**: `BatchData` -> `Trestle` -> `Melissa` -> `Mock`
- **`ROOF_INTELLIGENCE`**: `EagleView` -> `BatchData` -> `ATTOM` -> `Mock`
- **`FULL_STORM_LEAD`**: `Mock` (Composed on the fly by combining individual queries in Route Handlers)

---

## 5. De-Coupling from Live Vendors

Live REST/SOAP requests to vendor APIs were intentionally excluded from Phase 1D because:
- **Stability**: Establishes provider interfaces, registry paths, and validation rules without dependency on external services.
- **Cost Protection**: Mocking allows testing and API development without generating vendor transaction costs.

---

## 6. Phase 1E Next Steps

In Phase 1E (Quote/Unlock API Handlers), we will connect the ledger service and the mock provider:
- Implement Next.js API route handlers for `/api/enrichment/attest`, `/api/enrichment/quote`, and `/api/enrichment/unlock`.
- Wrap unlock requests inside database transaction blocks.
- Charge user balances using the `debitAccount` ledger service, trigger the mock provider to retrieve details, encrypt sensitive details, and commit the transaction.
