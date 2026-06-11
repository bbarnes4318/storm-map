/**
 * Server-only compliance helpers for TCPA/DNC attestation and suppression.
 *
 * Pure helper functions (hashSuppressionValue, redactSuppressedContacts)
 * are still actively used by API routes.
 *
 * @deprecated (attestation functions only) Phase 1G — The attestation
 * functions (hasRecentAttestation, requireAttestation, createAttestation)
 * are superseded by ComplianceStore in lib/enrichment/stores/types.ts.
 * API routes now use store.compliance.createAttestation() and
 * store.compliance.hasRecentAttestation() instead.
 */

// SERVER-ONLY: This module must only be imported by server-side code (API routes,
// other lib/ modules). Do not import from client components. The `server-only`
// package is not currently installed; server-only enforcement is structural.
import * as crypto from "crypto";
import { NormalizedContactData, NormalizedEnrichmentResult } from "./schemas";
import {
  normalizePhoneNumberForHashing,
  normalizeEmailForHashing,
  sha256Hex,
} from "./providers/normalizers";

// ==============================================================================
// In-memory attestation store (mock mode only)
// ==============================================================================

interface MockAttestation {
  accountId: string;
  attestedAt: Date;
  attestationText: string;
}

/**
 * Server-scoped in-memory attestation map.
 * Keyed by accountId. Only used when ENRICHMENT_MOCK_MODE=true.
 * Will be replaced by DB queries once migrations are run.
 */
const mockAttestations = new Map<string, MockAttestation>();

// ==============================================================================
// Attestation Helpers (DEPRECATED — use store.compliance instead)
// ==============================================================================

/** Maximum age of an attestation before re-attestation is required (24 hours). */
const ATTESTATION_MAX_AGE_MS = 24 * 60 * 60 * 1000;

/**
 * @deprecated Use store.compliance.hasRecentAttestation() instead.
 * Checks whether the given account has a recent (within 24h) compliance attestation.
 */
export async function hasRecentAttestation(accountId: string): Promise<boolean> {
  const stored = mockAttestations.get(accountId);
  if (!stored) return false;

  const age = Date.now() - stored.attestedAt.getTime();
  return age < ATTESTATION_MAX_AGE_MS;
}

/**
 * @deprecated Use store.compliance.hasRecentAttestation() instead.
 * Throws a structured error if the account does not have a recent attestation.
 */
export async function requireAttestation(accountId: string): Promise<void> {
  const valid = await hasRecentAttestation(accountId);
  if (!valid) {
    const err = new Error("Compliance attestation is required before accessing enrichment data.");
    (err as Error & { code: string }).code = "COMPLIANCE_ATTESTATION_REQUIRED";
    throw err;
  }
}

/**
 * @deprecated Use store.compliance.createAttestation() instead.
 * Records a compliance attestation for the given account.
 */
export async function createAttestation(
  accountId: string,
  _request: Request,
  attestationText: string
): Promise<void> {
  mockAttestations.set(accountId, {
    accountId,
    attestedAt: new Date(),
    attestationText,
  });
}

// ==============================================================================
// Suppression Helpers
// ==============================================================================

/**
 * Hashes a contact value (phone, email, or address) for suppression list lookup.
 *
 * @param type - The suppression type: "PHONE", "EMAIL", or "ADDRESS".
 * @param value - The raw contact value to hash.
 * @returns SHA-256 hex digest of the normalized value.
 */
export function hashSuppressionValue(
  type: "PHONE" | "EMAIL" | "ADDRESS",
  value: string
): string {
  let normalized: string;
  switch (type) {
    case "PHONE":
      normalized = normalizePhoneNumberForHashing(value);
      break;
    case "EMAIL":
      normalized = normalizeEmailForHashing(value);
      break;
    case "ADDRESS":
      normalized = value.trim().toLowerCase().replace(/\s+/g, " ");
      break;
    default:
      normalized = value.trim().toLowerCase();
  }
  return sha256Hex(normalized);
}

/**
 * Redacts suppressed contacts from an enrichment result.
 *
 * Removes phone numbers and email addresses whose hashed values
 * appear in the provided suppression hash set.
 *
 * @param result - The normalized enrichment result to filter.
 * @param suppressionHashes - Set of SHA-256 hashes to suppress.
 * @returns A new result with suppressed contacts removed.
 */
export function redactSuppressedContacts(
  result: NormalizedEnrichmentResult,
  suppressionHashes: Set<string>
): NormalizedEnrichmentResult {
  if (!result.contactData || suppressionHashes.size === 0) {
    return result;
  }

  const contactData = { ...result.contactData };

  // Redact suppressed phone numbers
  if (contactData.phones?.value) {
    const filteredPhones = contactData.phones.value.filter((phone) => {
      const hash = hashSuppressionValue("PHONE", phone.number);
      return !suppressionHashes.has(hash);
    });
    contactData.phones = { ...contactData.phones, value: filteredPhones };
  }

  // Redact suppressed email addresses
  if (contactData.emails?.value) {
    const filteredEmails = contactData.emails.value.filter((email) => {
      const hash = hashSuppressionValue("EMAIL", email.address);
      return !suppressionHashes.has(hash);
    });
    contactData.emails = { ...contactData.emails, value: filteredEmails };
  }

  return { ...result, contactData };
}
