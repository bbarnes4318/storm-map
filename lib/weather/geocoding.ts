import { SelectedPropertyTarget } from "./types";

interface MapboxContextItem {
  name: string;
  region_code?: string;
}

interface MapboxFeatureContext {
  street?: MapboxContextItem;
  postcode?: MapboxContextItem;
  place?: MapboxContextItem;
  district?: MapboxContextItem;
  region?: MapboxContextItem;
  neighborhood?: MapboxContextItem;
}

interface MapboxFeatureProperties {
  mapbox_id: string;
  feature_type: string;
  full_address?: string;
  name: string;
  place_name?: string;
  context?: MapboxFeatureContext;
  address_number?: string;
  street_name?: string;
}

interface MapboxFeatureGeometry {
  type: "Point";
  coordinates: [number, number];
}

interface MapboxGeocodingFeature {
  type: "Feature";
  id: string;
  geometry: MapboxFeatureGeometry;
  properties: MapboxFeatureProperties;
}

interface MapboxGeocodingResponse {
  type: "FeatureCollection";
  features: MapboxGeocodingFeature[];
  attribution: string;
}

/**
 * Perform a reverse geocoding lookup on Mapbox v6 Geocoding API.
 * 
 * @param latitude The coordinate latitude
 * @param longitude The coordinate longitude
 * @param signal Optional AbortSignal to cancel stale requests
 * @returns Promise containing SelectedPropertyTarget or null if not found
 */
export async function reverseGeocodeMapbox(
  latitude: number,
  longitude: number,
  signal?: AbortSignal
): Promise<SelectedPropertyTarget | null> {
  const token = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;
  if (!token) {
    console.error("Mapbox token is missing in environment variables.");
    return null;
  }

  try {
    const url = new URL("https://api.mapbox.com/search/geocode/v6/reverse");
    const params = new URLSearchParams({
      longitude: longitude.toString(),
      latitude: latitude.toString(),
      access_token: token,
      types: "address,street,neighborhood,postcode,place,district",
      limit: "1",
    });
    url.search = params.toString();

    const response = await fetch(url.toString(), { signal });
    if (!response.ok) {
      console.warn(`Mapbox reverse geocoding API returned HTTP ${response.status}`);
      return null;
    }

    const data: MapboxGeocodingResponse = await response.json();
    if (!data.features || data.features.length === 0) {
      return null;
    }

    const feature = data.features[0];
    const props = feature.properties;
    const ctx = props.context || {};

    const isAddress = props.feature_type === "address";
    const confidence: "exact" | "approximate" = isAddress ? "exact" : "approximate";

    const target: SelectedPropertyTarget = {
      id: props.mapbox_id || feature.id || `target-${Date.now()}`,
      latitude,
      longitude,
      fullAddress: props.full_address || props.name || props.place_name || "Unknown Address",
      streetNumber: props.address_number,
      streetName: props.street_name || ctx.street?.name,
      neighborhood: ctx.neighborhood?.name,
      city: ctx.place?.name,
      county: ctx.district?.name,
      state: ctx.region?.region_code || ctx.region?.name,
      postcode: ctx.postcode?.name,
      source: "mapbox-geocoding",
      confidence,
      locked: false,
    };

    return target;
  } catch (error) {
    if (error instanceof Error && error.name === "AbortError") {
      console.log("Mapbox reverse geocoding request was aborted.");
      return null;
    }
    console.error("Error performing Mapbox reverse geocoding:", error);
    return null;
  }
}
