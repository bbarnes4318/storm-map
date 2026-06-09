export type StormReport = {
  id: string;
  type: "hail" | "wind" | "tornado";
  timeRaw: string; // HHMM in UTC
  eventDate: "today" | "yesterday";
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
};

export type StormFilterState = {
  searchQuery: string;
  state: string; // e.g. "TX"
  radius: number; // 0 for all, or 10, 25, 50, 100 miles
  center: [number, number] | null; // Selected search coordinates [lat, lon]
  showHail: boolean;
  showWind: boolean;
  showTornado: boolean;
  showAlerts: boolean;
  showRadar: boolean;
  radarOpacity: number;
  timeWindow: "today" | "yesterday" | "24h";
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
