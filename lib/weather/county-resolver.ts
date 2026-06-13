import { NwsAlert, AlertTargetCounty } from "./types";
import { LOCAL_COUNTY_DB } from "./county-bounds-db";

/**
 * Infers the U.S. State code from an NWS Alert's fields or coordinates
 */
export function inferStateFromAlert(alert: NwsAlert): string | undefined {
  // 1. Try to extract from headline, e.g. "by NWS Oklahoma City OK" or "by NWS Raleigh NC"
  const officeStateMatch = alert.headline.match(/NWS\s+[A-Za-z\s]+([A-Z]{2})/);
  if (officeStateMatch) {
    return officeStateMatch[1].toUpperCase();
  }

  // 2. Try to extract from ID which often includes state, e.g. "urn:oid:2.49.0.1.840.0.ur.OK..."
  const idStateMatch = alert.id.match(/[\.\-\/]([A-Z]{2})[\.\-\/]/);
  if (idStateMatch) {
    return idStateMatch[1].toUpperCase();
  }

  // 3. Fallback to coordinate bounding box checks if polygon exists
  if (alert.polygon && alert.polygon.length > 0) {
    const [lat, lon] = alert.polygon[0];
    // Oklahoma bounds approx
    if (lat >= 33.5 && lat <= 37.5 && lon >= -103.5 && lon <= -94.0) {
      return "OK";
    }
    // North Carolina bounds approx
    if (lat >= 33.5 && lat <= 37.0 && lon >= -84.5 && lon <= -75.0) {
      return "NC";
    }
    // Texas bounds approx
    if (lat >= 25.5 && lat <= 36.5 && lon >= -107.0 && lon <= -93.0) {
      return "TX";
    }
  }

  return undefined;
}

/**
 * Parses the county targets from an NWS alert's areaDesc
 */
export function parseAlertCounties(alert: NwsAlert): AlertTargetCounty[] {
  const countiesList: AlertTargetCounty[] = [];
  const seen = new Set<string>();

  const inferredState = inferStateFromAlert(alert);

  // Try to grab state code from UGC if present (e.g. "OKC027" -> "OK")
  let ugcState: string | undefined = undefined;
  if (alert.geocode?.UGC && alert.geocode.UGC.length > 0) {
    const firstUgc = alert.geocode.UGC[0];
    if (firstUgc && firstUgc.length >= 2) {
      ugcState = firstUgc.substring(0, 2).toUpperCase();
    }
  }
  const stateCode = inferredState || ugcState;

  if (alert.areaDesc) {
    // Split by semicolons, newlines, or commas
    const rawItems = alert.areaDesc.split(/[;\r\n]+/).map(item => item.trim()).filter(Boolean);
    for (const item of rawItems) {
      let name = item;
      let itemState = stateCode;

      // Extract state suffix if present (e.g. "Cleveland, OK" or "Cleveland OK")
      const stateMatch = name.match(/[\s,]+([A-Za-z]{2})$/);
      if (stateMatch) {
        itemState = stateMatch[1].toUpperCase();
        name = name.replace(/[\s,]+([A-Za-z]{2})$/, "").trim();
      }

      // Clean up common county descriptor suffixes
      name = name.replace(/\s+(County|Parish|Borough|Census Area|Municipality|City and Borough)$/i, "").trim();

      if (!name) continue;

      // Deduplicate
      const key = `${name.toLowerCase()}_${(itemState || "").toLowerCase()}`;
      if (seen.has(key)) continue;
      seen.add(key);

      const label = itemState ? `${name} County, ${itemState}` : `${name} County`;
      countiesList.push({
        countyName: name,
        stateCode: itemState,
        label,
        source: "areaDesc",
        confidence: "approximate"
      });
    }
  }

  return countiesList;
}

/**
 * Calculates centroid of a polygon coordinate array
 */
function getPolygonCentroid(polygon: [number, number][]): [number, number] {
  let latSum = 0;
  let lonSum = 0;
  for (const coord of polygon) {
    latSum += coord[0];
    lonSum += coord[1];
  }
  return [latSum / polygon.length, lonSum / polygon.length];
}

/**
 * Resolves a county's bounding box and centroid (from local DB or Mapbox API)
 */
export async function resolveCountyBounds(
  county: AlertTargetCounty,
  alert: NwsAlert,
  signal?: AbortSignal
): Promise<AlertTargetCounty> {
  const normCounty = county.countyName.toLowerCase();
  const normState = (county.stateCode || "").toLowerCase();
  const dbKey = `${normCounty}_${normState}`;

  // 1. Try local database lookup first
  const localData = LOCAL_COUNTY_DB[dbKey];
  if (localData) {
    return {
      ...county,
      bbox: localData.bbox,
      centroid: localData.centroid,
      source: "county-bounds",
      confidence: "exact"
    };
  }

  // 2. Try Mapbox Geocoding forward lookup if token is present
  const token = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;
  if (token && county.stateCode) {
    try {
      const query = `${county.countyName} County, ${county.stateCode}`;
      const url = new URL("https://api.mapbox.com/search/geocode/v6/forward");
      url.searchParams.set("q", query);
      url.searchParams.set("types", "district");
      url.searchParams.set("limit", "1");
      url.searchParams.set("access_token", token);

      const response = await fetch(url.toString(), { signal });
      if (response.ok) {
        const data = await response.json();
        if (data.features && data.features.length > 0) {
          const feature = data.features[0];
          const bbox = feature.bbox || feature.properties?.bbox;
          const coords = feature.geometry?.coordinates; // [lon, lat]

          if (bbox && coords) {
            return {
              ...county,
              bbox: [bbox[0], bbox[1], bbox[2], bbox[3]] as [number, number, number, number],
              centroid: [coords[1], coords[0]] as [number, number], // Convert [lon, lat] to [lat, lon]
              source: "nws-geocode",
              confidence: "exact"
            };
          }
        }
      }
    } catch (err) {
      if (err instanceof Error && err.name === "AbortError") {
        throw err;
      }
      console.warn(`Mapbox geocoding lookup failed for county ${county.label}:`, err);
    }
  }

  // 3. Fallback: Use NWS warning polygon centroid if available
  if (alert.polygon && alert.polygon.length > 0) {
    const centroid = getPolygonCentroid(alert.polygon);
    // Generate an approximate bounding box around the centroid (+/- 0.25 degrees)
    const bbox: [number, number, number, number] = [
      centroid[1] - 0.25, // west (lon)
      centroid[0] - 0.25, // south (lat)
      centroid[1] + 0.25, // east (lon)
      centroid[0] + 0.25  // north (lat)
    ];
    return {
      ...county,
      bbox,
      centroid,
      source: "fallback",
      confidence: "approximate"
    };
  }

  // 4. Ultimate fallback: Default state coordinates
  let centroid: [number, number] = [35.0, -97.0]; // Default center of US
  if (county.stateCode === "NC") centroid = [35.5, -80.0];
  else if (county.stateCode === "OK") centroid = [35.5, -97.5];
  else if (county.stateCode === "TX") centroid = [31.5, -99.5];

  const bbox: [number, number, number, number] = [
    centroid[1] - 0.5,
    centroid[0] - 0.5,
    centroid[1] + 0.5,
    centroid[0] + 0.5
  ];

  return {
    ...county,
    bbox,
    centroid,
    source: "fallback",
    confidence: "approximate"
  };
}
