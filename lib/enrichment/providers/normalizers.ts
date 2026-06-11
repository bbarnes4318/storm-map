import * as crypto from "crypto";
import { FieldMetadata } from "../schemas";

/**
 * Normalizes phone numbers to digits only.
 */
export function normalizePhoneNumberForHashing(value: string): string {
  return value.replace(/\D/g, "");
}

/**
 * Normalizes email address by trimming whitespace and lowercasing it.
 */
export function normalizeEmailForHashing(value: string): string {
  return value.trim().toLowerCase();
}

/**
 * Normalizes street address by trimming, lowercasing, and collapsing consecutive whitespace.
 */
export function normalizeAddressForHashing(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .replace(/\s+/g, " ");
}

/**
 * Computes SHA-256 hash of a normalized string value.
 */
export function sha256Hex(value: string): string {
  return crypto.createHash("sha256").update(value).digest("hex");
}

/**
 * Generates a stable hash for a property using its address.
 */
export function createPropertyHash(address: string, latitude?: number, longitude?: number): string {
  const normalizedAddress = normalizeAddressForHashing(address);
  return sha256Hex(normalizedAddress);
}

/**
 * Helper to generate a FieldMetadata object.
 */
export function createFieldMetadata<T>(
  value: T,
  source: string,
  confidence: number,
  lastUpdated?: string
): FieldMetadata<T> {
  return {
    value,
    source,
    confidence,
    lastUpdated: lastUpdated || new Date().toISOString(),
  };
}

/**
 * Redacts any contact data whose hashed value is present in the suppression list.
 */
export function redactSuppressedContactData(
  contactData: any, // NormalizedContactData
  suppressedHashes: Set<string>
): any {
  if (!contactData) return contactData;

  const redacted = { ...contactData };

  // 1. Redact phone numbers
  if (contactData.phones && contactData.phones.value) {
    const phonesList = contactData.phones.value;
    const filteredPhones = phonesList.filter((p: any) => {
      const normalizedPhone = normalizePhoneNumberForHashing(p.number);
      const hash = sha256Hex(normalizedPhone);
      return !suppressedHashes.has(hash);
    });

    redacted.phones = {
      ...contactData.phones,
      value: filteredPhones,
    };
  }

  // 2. Redact emails
  if (contactData.emails && contactData.emails.value) {
    const emailsList = contactData.emails.value;
    const filteredEmails = emailsList.filter((e: any) => {
      const normalizedEmail = normalizeEmailForHashing(e.address);
      const hash = sha256Hex(normalizedEmail);
      return !suppressedHashes.has(hash);
    });

    redacted.emails = {
      ...contactData.emails,
      value: filteredEmails,
    };
  }

  return redacted;
}
