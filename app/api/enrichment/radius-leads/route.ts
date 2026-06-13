import { NextRequest } from "next/server";
import { getCurrentEnrichmentAccount, handleAuthError } from "@/lib/enrichment/auth";
import { apiSuccess, apiError } from "@/lib/enrichment/api-response";
import { getEnrichmentRouteGuardResult } from "@/lib/enrichment/route-guard";

export async function POST(request: NextRequest) {
  try {
    // 1. Feature guard check
    const guard = getEnrichmentRouteGuardResult(request);
    if (!guard.allowed) {
      return apiError(guard.code, guard.message, guard.httpStatus);
    }

    // 2. Auth check
    const authContext = await getCurrentEnrichmentAccount(request);

    // 3. Provider check (only allow mock mode for now, reject others as not configured)
    const isMockMode = process.env.ENRICHMENT_MOCK_MODE === "true";
    if (!isMockMode) {
      return apiError(
        "PROVIDER_NOT_CONFIGURED",
        "Bulk property lead collection is not enabled yet. Connect a property/contact provider to gather homeowners in this radius.",
        400
      );
    }

    // 4. Parse payload
    const body = await request.json();
    const { centerLat, centerLon, radiusMiles, opportunityId } = body;

    if (
      typeof centerLat !== "number" ||
      typeof centerLon !== "number" ||
      typeof radiusMiles !== "number"
    ) {
      return apiError("INVALID_REQUEST", "Latitude, longitude and radius must be valid numbers.", 400);
    }

    // 5. Generate mock properties geolocated in radius
    const mockLeads = [];
    const count = 15;
    const streetNames = [
      "Rosecrest Dr",
      "Pinecrest Ave",
      "Oakridge Ln",
      "Maplewood Ct",
      "Cedar Ridge Rd",
      "Elmwood St",
      "Sherwood Dr",
      "Highland Ave",
      "Brookside Way",
      "Lakeside Dr"
    ];
    const cities = ["Charlotte", "Raleigh", "Greensboro", "Asheville", "Wilmington"];

    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const distance = Math.random() * radiusMiles;
      // Latitude conversion: 1 degree latitude = 69 miles
      const latOffset = (distance * Math.sin(angle)) / 69;
      // Longitude conversion: 1 degree longitude = 69 * cos(lat)
      const cosLat = Math.cos((centerLat * Math.PI) / 180);
      const lonOffset = (distance * Math.cos(angle)) / (69 * (cosLat === 0 ? 1 : cosLat));

      const leadLat = centerLat + latOffset;
      const leadLon = centerLon + lonOffset;
      const houseNum = Math.floor(Math.random() * 9000) + 100;
      const street = streetNames[Math.floor(Math.random() * streetNames.length)];
      const city = cities[Math.floor(Math.random() * cities.length)];
      const postcode = Math.floor(Math.random() * 90000) + 10000;

      mockLeads.push({
        id: `mock-radius-lead-${opportunityId || "opt"}-${i}-${Date.now()}`,
        fullAddress: `${houseNum} ${street}, ${city}, NC ${postcode}`,
        latitude: leadLat,
        longitude: leadLon,
        neighborhood: "Mock Neighborhood",
        city,
        county: "Mock County",
        state: "NC",
        postcode: String(postcode),
        confidence: "exact",
        source: "mock-provider",
        locked: false,
        contactPreview: {
          firstName: "J***",
          lastName: "D****",
          phones: ["(***) ***-1289"],
          emails: ["j***@g****.com"],
          mailingAddress: "Available with Homeowner Contact Information",
        },
        propertyPreview: {
          yearBuilt: "Built 1998",
          squareFeet: "2,140 sq ft",
          roof: "Asphalt shingle · Est. 14–18 yrs",
        }
      });
    }

    return apiSuccess({
      ok: true,
      addedCount: mockLeads.length,
      leads: mockLeads,
      providerStatus: "mock"
    });
  } catch (err) {
    const authErrorResponse = handleAuthError(err);
    if (authErrorResponse) return authErrorResponse;

    console.error("[POST /api/enrichment/radius-leads] Unhandled error:", err);
    return apiError("INTERNAL_ERROR", "An internal error occurred.", 500);
  }
}
