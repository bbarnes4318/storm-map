export type StormReport = {
  id: string;
  type: "hail" | "wind" | "tornado";
  timeRaw: string; // HHMM in UTC
  eventDate: string; // "today", "yesterday", or "YYYY-MM-DD"
  location: string;
  county: string;
  state: string;
  lat: number;
  lon: number;
  magnitude?: string; // hail size in inches, wind speed in knots/mph, tornado rating
  comments?: string;
  source: "SPC";
};

export type NwsAlert = {
  id: string;
  event: string; // e.g. "Tornado Warning"
  headline: string;
  severity: "Extreme" | "Severe" | "Moderate" | "Minor" | "Unknown";
  certainty: string;
  urgency: string;
  effective: string; // ISO timestamp
  expires: string; // ISO timestamp
  areaDesc: string;
  instruction?: string;
  polygon?: [number, number][]; // Array of [lat, lon] coordinates representing warning bounds
  source: string;
  geocode?: { SAME?: string[]; UGC?: string[] };
};

export type StormMapStyle = "streets" | "dark" | "satellite";

export type SelectedPropertyTarget = {
  id: string;
  latitude: number;
  longitude: number;
  fullAddress: string;
  streetNumber?: string;
  streetName?: string;
  neighborhood?: string;
  city?: string;
  county?: string;
  state?: string;
  postcode?: string;
  source: "mapbox-geocoding" | "map-feature" | "fallback";
  confidence: "exact" | "approximate" | "unknown";
  locked: boolean;
  unlockId?: string;
};

export type StormFilterState = {
  searchQuery: string;
  state: string; // e.g. "TX"
  radius: number; // 0 for all, or 10, 25, 50, 100 miles
  center: [number, number] | null; // Selected search coordinates [lat, lon]
  targetZoom?: number; // Target zoom level for map camera flight
  showHail: boolean;
  showWind: boolean;
  showTornado: boolean;
  showAlerts: boolean;
  showRadar: boolean;
  radarOpacity: number;
  timeWindow: "24h" | "today" | "yesterday" | "7d" | "30d" | "custom";
  startDate?: string; // YYYY-MM-DD
  endDate?: string; // YYYY-MM-DD
  mapStyle: StormMapStyle;
  showNeighborhoodLabels: boolean;
  showHouseNumbers: boolean;
  showBuildings: boolean;
  
  // Guided Selector Search State
  selectedCounty?: string;
  selectedCountyFull?: string;
  selectedCountyFips?: string;
  countyBbox?: { west: number; south: number; east: number; north: number };
  searchStatus?: "empty" | "loading" | "complete";
};

export type TargetCluster = {
  id: string;
  center: [number, number]; // [lat, lon]
  name: string; // City/Area
  county: string;
  state: string;
  reportsCount: number;
  hailCount: number;
  windCount: number;
  tornadoCount: number;
  totalScore: number;
  maxScore: number;
  mainStormType: "hail" | "wind" | "tornado";
  highestMagnitude: string;
  suggestedRadius: number; // Suggested radius for appointment targeting
  reports: StormReport[];
};

export type WeatherCacheEntry<T> = {
  data: T;
  timestamp: number;
};

export type ActivePopupDetail = {
  type: "storm-report" | "cluster" | "warning" | "address";
  coordinates: [number, number]; // [lat, lon]
  data: any;
};

export type AlertTargetCounty = {
  countyName: string;
  stateCode?: string;
  fips?: string;
  label: string;
  bbox?: [number, number, number, number]; // west, south, east, north
  centroid?: [number, number]; // lat, lon unless otherwise documented
  source: "nws-geocode" | "areaDesc" | "county-bounds" | "fallback";
  confidence: "exact" | "approximate";
};
