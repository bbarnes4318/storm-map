import { NextRequest } from "next/server";
import { getCurrentEnrichmentAccount, handleAuthError } from "@/lib/enrichment/auth";
import { apiSuccess, apiError } from "@/lib/enrichment/api-response";
import { getEnrichmentRouteGuardResult } from "@/lib/enrichment/route-guard";
import { queryOverpassAddresses, OsmProviderError } from "@/lib/enrichment/providers/osm-radius-address";

export async function POST(request: NextRequest) {
  try {
    // 1. Feature guard check
    const guard = getEnrichmentRouteGuardResult(request);
    if (!guard.allowed) {
      return apiError(guard.code, guard.message, guard.httpStatus);
    }

    // 2. Auth check
    const authContext = await getCurrentEnrichmentAccount(request);

    // 3. Parse payload
    const body = await request.json();
    const { centerLat, centerLon, radiusMiles, opportunityId, county, state, maxResults } = body;

    if (
      typeof centerLat !== "number" ||
      typeof centerLon !== "number" ||
      typeof radiusMiles !== "number"
    ) {
      return apiError("INVALID_REQUEST", "Latitude, longitude and radius must be valid numbers.", 400);
    }

    // 4. Check provider configuration
    const provider = process.env.RADIUS_ADDRESS_PROVIDER || "osm_overpass";

    if (provider !== "osm_overpass") {
      return apiError(
        "PROVIDER_NOT_CONFIGURED",
        "Bulk property lead collection is not enabled yet. Connect a radius-capable property/address provider to gather properties in this storm area.",
        400
      );
    }

    // 5. Query OSM/Overpass for real address records
    const result = await queryOverpassAddresses(centerLat, centerLon, radiusMiles, {
      maxResults: typeof maxResults === "number" ? maxResults : undefined,
      county: typeof county === "string" ? county : undefined,
      state: typeof state === "string" ? state : undefined,
      opportunityId: typeof opportunityId === "string" ? opportunityId : undefined,
    });

    return apiSuccess({
      ok: true,
      addedCount: result.leads.length,
      leads: result.leads,
      source: "osm_overpass",
      providerStatus: "configured",
      message: result.message,
    });

  } catch (err: any) {
    // Handle auth errors
    const authErrorResponse = handleAuthError(err);
    if (authErrorResponse) return authErrorResponse;

    // Handle OSM provider-specific errors
    if (err instanceof OsmProviderError) {
      if (err.code === "PROVIDER_TIMEOUT") {
        return apiError(
          "PROVIDER_TIMEOUT",
          "Unable to gather address records from the radius provider right now. Please try again.",
          504
        );
      }
      return apiError(
        "PROVIDER_ERROR",
        "The address provider returned an error. Please try again.",
        502
      );
    }

    console.error("[POST /api/enrichment/radius-leads] Unhandled error:", err);
    return apiError("INTERNAL_ERROR", "An internal error occurred.", 500);
  }
}
