/**
 * OSM/Overpass Radius Address Provider
 *
 * Queries OpenStreetMap via Overpass API for address-tagged nodes/ways within
 * a geographic radius. Returns real property addresses with coordinates.
 *
 * This provider is for ADDRESS/BUILDING collection ONLY.
 * It does NOT return: owner names, phone numbers, emails, contact previews,
 * or property detail previews.
 *
 * Failure behavior:
 * - Timeout → throws error with code PROVIDER_TIMEOUT
 * - HTTP/API failure → throws error with code PROVIDER_ERROR
 * - Success with 0 results → returns { leads: [], message: "..." }
 */

import "server-only";

export interface OsmPropertyLead {
  id: string;
  fullAddress: string;
  streetNumber?: string;
  streetName?: string;
  city?: string;
  county?: string;
  state?: string;
  postcode?: string;
  latitude: number;
  longitude: number;
  neighborhood?: string;
  source: "osm_overpass";
  confidence: "exact" | "high" | "medium";
  locked: boolean;
  contactAvailable: false;
  propertyDetailsAvailable: false;
  stormOpportunityId?: string;
  stormOpportunityLabel?: string;
  radiusMiles?: number;
}

export class OsmProviderError extends Error {
  code: string;
  constructor(code: string, message: string) {
    super(message);
    this.name = "OsmProviderError";
    this.code = code;
  }
}

interface OverpassElement {
  type: "node" | "way" | "relation";
  id: number;
  lat?: number;
  lon?: number;
  center?: { lat: number; lon: number };
  tags?: Record<string, string>;
}

interface OverpassResponse {
  version?: number;
  elements: OverpassElement[];
}

export interface QueryOverpassOptions {
  maxResults?: number;
  county?: string;
  state?: string;
  opportunityId?: string;
  opportunityLabel?: string;
  radiusMiles?: number;
}

/**
 * Queries the Overpass API for address-tagged buildings/nodes in a radius.
 *
 * @throws OsmProviderError with code PROVIDER_TIMEOUT on timeout
 * @throws OsmProviderError with code PROVIDER_ERROR on upstream/HTTP failure
 * @returns { leads, message } — empty leads array ONLY when query succeeded with zero matches
 */
export async function queryOverpassAddresses(
  lat: number,
  lon: number,
  radiusMiles: number,
  options: QueryOverpassOptions = {}
): Promise<{ leads: OsmPropertyLead[]; message: string }> {
  const endpoint = process.env.OSM_OVERPASS_ENDPOINT || "https://overpass-api.de/api/interpreter";
  const timeoutMs = parseInt(process.env.OSM_OVERPASS_TIMEOUT_MS || "25000", 10);
  const maxResults = Math.min(
    options.maxResults || parseInt(process.env.RADIUS_ADDRESS_MAX_RESULTS || "1000", 10),
    parseInt(process.env.RADIUS_ADDRESS_MAX_RESULTS || "1000", 10)
  );
  const maxMiles = parseFloat(process.env.RADIUS_ADDRESS_MAX_MILES || "10");

  // Clamp radius
  const clampedRadius = Math.min(radiusMiles, maxMiles);
  const radiusMeters = Math.round(clampedRadius * 1609.344);

  // Build Overpass QL query for address-tagged elements
  const overpassTimeout = Math.max(10, Math.round(timeoutMs / 1000));
  const query = `[out:json][timeout:${overpassTimeout}];
(
  node(around:${radiusMeters},${lat},${lon})["addr:housenumber"]["addr:street"];
  way(around:${radiusMeters},${lat},${lon})["addr:housenumber"]["addr:street"];
  relation(around:${radiusMeters},${lat},${lon})["addr:housenumber"]["addr:street"];
);
out center ${maxResults};`;

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);

  let response: Response;
  try {
    response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `data=${encodeURIComponent(query)}`,
      signal: controller.signal,
    });
  } catch (err: any) {
    clearTimeout(timer);
    if (err.name === "AbortError") {
      throw new OsmProviderError(
        "PROVIDER_TIMEOUT",
        `Overpass API request timed out after ${timeoutMs}ms.`
      );
    }
    throw new OsmProviderError(
      "PROVIDER_ERROR",
      `Overpass API request failed: ${err.message || "Network error"}`
    );
  } finally {
    clearTimeout(timer);
  }

  if (!response.ok) {
    const errorBody = await response.text().catch(() => "");
    throw new OsmProviderError(
      "PROVIDER_ERROR",
      `Overpass API returned HTTP ${response.status}: ${errorBody.slice(0, 200)}`
    );
  }

  let data: OverpassResponse;
  try {
    data = await response.json();
  } catch {
    throw new OsmProviderError(
      "PROVIDER_ERROR",
      "Overpass API returned invalid JSON response."
    );
  }

  if (!data.elements || !Array.isArray(data.elements)) {
    throw new OsmProviderError(
      "PROVIDER_ERROR",
      "Overpass API returned unexpected response format."
    );
  }

  // Zero results is a valid query result, not an error
  if (data.elements.length === 0) {
    return {
      leads: [],
      message: "No address-tagged properties were returned for this storm area.",
    };
  }

  // Parse elements into PropertyLead records
  const seen = new Set<string>();
  const leads: OsmPropertyLead[] = [];

  for (const el of data.elements) {
    const tags = el.tags || {};
    const housenumber = tags["addr:housenumber"];
    const street = tags["addr:street"];

    if (!housenumber || !street) continue;

    // Get coordinates (nodes have lat/lon directly; ways/relations use center)
    let elLat: number | undefined;
    let elLon: number | undefined;

    if (el.type === "node") {
      elLat = el.lat;
      elLon = el.lon;
    } else if (el.center) {
      elLat = el.center.lat;
      elLon = el.center.lon;
    }

    if (elLat === undefined || elLon === undefined) continue;

    // Extract address tags
    const city = tags["addr:city"] || options.county || "";
    const state = tags["addr:state"] || options.state || "";
    const postcode = tags["addr:postcode"] || "";
    const county = tags["addr:county"] || options.county || "";

    // Build full address
    const addressParts = [`${housenumber} ${street}`];
    if (city) addressParts.push(city);
    if (state && postcode) addressParts.push(`${state} ${postcode}`);
    else if (state) addressParts.push(state);
    else if (postcode) addressParts.push(postcode);

    const fullAddress = addressParts.join(", ");

    // De-duplicate by full address
    const dedupeKey = fullAddress.toLowerCase().trim();
    if (seen.has(dedupeKey)) continue;
    seen.add(dedupeKey);

    // Determine confidence based on tag completeness
    let confidence: "exact" | "high" | "medium" = "medium";
    if (housenumber && street && city && state && postcode) {
      confidence = "exact";
    } else if (housenumber && street && (city || state)) {
      confidence = "high";
    }

    leads.push({
      id: `osm-${el.type}-${el.id}-${Date.now()}`,
      fullAddress,
      streetNumber: housenumber,
      streetName: street,
      city: city || undefined,
      county: county || undefined,
      state: state || undefined,
      postcode: postcode || undefined,
      latitude: elLat,
      longitude: elLon,
      neighborhood: tags["addr:suburb"] || tags["addr:neighbourhood"] || undefined,
      source: "osm_overpass",
      confidence,
      locked: false,
      contactAvailable: false,
      propertyDetailsAvailable: false,
      stormOpportunityId: options.opportunityId,
      stormOpportunityLabel: options.opportunityLabel,
      radiusMiles: clampedRadius,
    });

    if (leads.length >= maxResults) break;
  }

  return {
    leads,
    message: `Found ${leads.length} address-tagged properties within ${clampedRadius} mi radius.`,
  };
}
