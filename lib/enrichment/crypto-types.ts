/**
 * Metadata envelope representing AES-256-GCM encrypted payload payloads.
 * Encryption logic implementation is deferred to a later phase.
 */
export const ENCRYPTION_ALGORITHM = "aes-256-gcm" as const;
export const ENCRYPTION_SCHEMAS_VERSION = 1 as const;

export interface EncryptedPayloadEnvelope {
  /**
   * The base64-encoded initialization vector.
   */
  iv: string;

  /**
   * The base64-encoded AES-256-GCM authentication tag.
   */
  tag: string;

  /**
   * The base64-encoded ciphertext payload string.
   */
  ciphertext: string;

  /**
   * Version of the cryptographic envelope schema.
   */
  version: typeof ENCRYPTION_SCHEMAS_VERSION;

  /**
   * Optional identifier for key rotation tracking.
   */
  keyId?: string;
}
