/**
 * Server-only AES-256-GCM encryption/decryption for sensitive contact payloads.
 *
 * Uses ENRICHMENT_ENCRYPTION_KEY from environment. Key must be exactly
 * 32 bytes (64 hex characters). Uses crypto-random IV per encryption.
 * Returns an EncryptedPayloadEnvelope compatible with crypto-types.ts.
 */

import "server-only";

import * as crypto from "crypto";
import {
  EncryptedPayloadEnvelope,
  ENCRYPTION_ALGORITHM,
  ENCRYPTION_SCHEMAS_VERSION,
} from "./crypto-types";

export class EncryptionNotConfiguredError extends Error {
  constructor(detail: string) {
    super(`Encryption is not configured: ${detail}`);
    this.name = "EncryptionNotConfiguredError";
    Object.setPrototypeOf(this, EncryptionNotConfiguredError.prototype);
  }
}

/**
 * Validates and returns the 32-byte encryption key from environment.
 * @throws EncryptionNotConfiguredError if key is missing or invalid length.
 */
function getEncryptionKey(): Buffer {
  const hexKey = process.env.ENRICHMENT_ENCRYPTION_KEY;
  if (!hexKey) {
    throw new EncryptionNotConfiguredError(
      "ENRICHMENT_ENCRYPTION_KEY environment variable is not set."
    );
  }
  if (hexKey.length !== 64) {
    throw new EncryptionNotConfiguredError(
      `ENRICHMENT_ENCRYPTION_KEY must be exactly 64 hex characters (32 bytes). Got ${hexKey.length} characters.`
    );
  }
  const keyBuffer = Buffer.from(hexKey, "hex");
  if (keyBuffer.length !== 32) {
    throw new EncryptionNotConfiguredError(
      "ENRICHMENT_ENCRYPTION_KEY contains invalid hex characters."
    );
  }
  return keyBuffer;
}

/**
 * Encrypts a JSON-serializable payload using AES-256-GCM.
 *
 * @param payload - Any JSON-serializable object (typically NormalizedContactData).
 * @returns An EncryptedPayloadEnvelope with base64-encoded iv, tag, and ciphertext.
 * @throws EncryptionNotConfiguredError if the key is missing or invalid.
 */
export function encryptContactPayload(payload: Record<string, unknown>): EncryptedPayloadEnvelope {
  const key = getEncryptionKey();
  const iv = crypto.randomBytes(12); // 96-bit IV for GCM
  const cipher = crypto.createCipheriv(ENCRYPTION_ALGORITHM, key, iv);

  const plaintext = JSON.stringify(payload);
  const encrypted = Buffer.concat([
    cipher.update(plaintext, "utf8"),
    cipher.final(),
  ]);
  const tag = cipher.getAuthTag();

  return {
    iv: iv.toString("base64"),
    tag: tag.toString("base64"),
    ciphertext: encrypted.toString("base64"),
    version: ENCRYPTION_SCHEMAS_VERSION,
  };
}

/**
 * Decrypts an EncryptedPayloadEnvelope back to a JSON object.
 *
 * @param envelope - The encrypted envelope to decrypt.
 * @returns The decrypted JSON object.
 * @throws EncryptionNotConfiguredError if the key is missing or invalid.
 * @throws Error if decryption fails (tampered data, wrong key, etc.).
 */
export function decryptContactPayload(envelope: EncryptedPayloadEnvelope): Record<string, unknown> {
  if (envelope.version !== ENCRYPTION_SCHEMAS_VERSION) {
    throw new Error(
      `Unsupported encryption envelope version: ${envelope.version}. Expected ${ENCRYPTION_SCHEMAS_VERSION}.`
    );
  }

  const key = getEncryptionKey();
  const iv = Buffer.from(envelope.iv, "base64");
  const tag = Buffer.from(envelope.tag, "base64");
  const ciphertext = Buffer.from(envelope.ciphertext, "base64");

  const decipher = crypto.createDecipheriv(ENCRYPTION_ALGORITHM, key, iv);
  decipher.setAuthTag(tag);

  const decrypted = Buffer.concat([
    decipher.update(ciphertext),
    decipher.final(),
  ]);

  return JSON.parse(decrypted.toString("utf8"));
}
