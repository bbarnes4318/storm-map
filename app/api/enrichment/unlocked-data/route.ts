/**
 * GET /api/enrichment/unlocked-data
 *
 * Retrieves previously unlocked enrichment data by unlockId.
 *
 * SKIPPED FOR PHASE 1E.
 *
 * Reason: Unlock persistence is not yet implemented. The unlock route
 * currently stores results in server-side memory which is lost on
 * restart. Implementing this route properly requires:
 *
 *   1. enrichment_unlocks table created via DB migration
 *   2. Unlock results persisted with encrypted contact payloads
 *   3. Server-side decryption on retrieval
 *   4. VIEW_CONTACT_DATA audit log entry
 *
 * This will be implemented in Phase 1F after database migrations
 * and persistent unlock storage are in place.
 */

import { apiError } from "@/lib/enrichment/api-response";

export async function GET() {
  return apiError(
    "INTERNAL_ERROR",
    "This endpoint is not yet implemented. Unlock data retrieval requires " +
    "database persistence which will be available after Phase 1F migrations.",
    501
  );
}
