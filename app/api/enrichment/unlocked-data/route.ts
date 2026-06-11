/**
 * GET /api/enrichment/unlocked-data
 *
 * Retrieves previously unlocked enrichment data by unlockId.
 *
 * Flow:
 * 1. Resolve current account
 * 2. Validate unlockId query parameter
 * 3. Fetch unlock record from store
 * 4. Verify unlock belongs to requesting account
 * 5. Decrypt encrypted contact payload server-side if present
 * 6. Write VIEW_CONTACT_DATA audit log
 * 7. Return normalized unlocked data
 *
 * Uses the unified EnrichmentStore via getEnrichmentStore().
 */

import { NextRequest } from "next/server";
import { getCurrentEnrichmentAccount, AuthNotConfiguredError } from "@/lib/enrichment/auth";
import { apiSuccess, apiError } from "@/lib/enrichment/api-response";
import { getEnrichmentStore, StoreConfigurationError } from "@/lib/enrichment/stores";
import { decryptContactPayload, EncryptionNotConfiguredError } from "@/lib/enrichment/crypto";

export async function GET(request: NextRequest) {
  try {
    // 0. Resolve store
    const store = getEnrichmentStore();

    // 1. Resolve account
    const account = await getCurrentEnrichmentAccount(request);

    // 2. Extract unlockId from query parameters
    const { searchParams } = new URL(request.url);
    const unlockId = searchParams.get("unlockId");
    if (!unlockId) {
      return apiError("INVALID_REQUEST", "Missing required query parameter: unlockId", 400);
    }

    // 3. Fetch unlock record
    const unlock = await store.unlocks.getUnlockById(unlockId);
    if (!unlock) {
      return apiError("QUOTE_NOT_FOUND", "Unlock record not found.", 404);
    }

    // 4. Verify ownership
    if (unlock.accountId !== account.accountId) {
      return apiError("UNAUTHORIZED", "This unlock does not belong to your account.", 403);
    }

    // 5. Build response with decrypted contact data
    let contactData: Record<string, unknown> | null = null;
    if (unlock.encryptedContactPayload) {
      try {
        // The encrypted payload is stored as a JSON string of the EncryptedPayloadEnvelope
        const envelope = JSON.parse(unlock.encryptedContactPayload);
        contactData = decryptContactPayload(envelope);
      } catch (decryptErr) {
        if (decryptErr instanceof EncryptionNotConfiguredError) {
          console.warn("[GET /api/enrichment/unlocked-data] Encryption key not configured for decryption.");
          // Return what we can without the encrypted contact data
        } else {
          console.error("[GET /api/enrichment/unlocked-data] Decryption failed:", decryptErr);
          return apiError("INTERNAL_ERROR", "Failed to decrypt contact data.", 500);
        }
      }
    }

    // 6. Write audit log
    const ipAddress = request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || "unknown";
    const userAgent = request.headers.get("user-agent") || "unknown";
    await store.audit.createAuditLog({
      accountId: account.accountId,
      action: "VIEW_CONTACT_DATA",
      ipAddress,
      userAgent,
      metadata: {
        unlockId: unlock.id,
        productType: unlock.productType,
        propertyHash: unlock.propertyHash,
        viewedAt: new Date().toISOString(),
      },
    });

    // 7. Return response
    return apiSuccess({
      unlockId: unlock.id,
      productType: unlock.productType,
      creditsCharged: unlock.creditsCharged,
      addressText: unlock.addressText,
      latitude: unlock.latitude,
      longitude: unlock.longitude,
      providerSource: unlock.providerSource,
      propertyProfile: unlock.propertyProfilePayload,
      contactData,
      createdAt: unlock.createdAt.toISOString(),
    });
  } catch (err) {
    if (err instanceof AuthNotConfiguredError) {
      return apiError("AUTH_NOT_CONFIGURED", err.message, 501);
    }
    if (err instanceof StoreConfigurationError) {
      return apiError("INTERNAL_ERROR", err.message, 503);
    }
    console.error("[GET /api/enrichment/unlocked-data] Unhandled error:", err);
    return apiError("INTERNAL_ERROR", "An internal error occurred.", 500);
  }
}
