import { NwsAlert } from "./types";

const TARGET_EVENTS = [
  "Tornado Warning",
  "Severe Thunderstorm Warning",
  "Flash Flood Warning",
  "Flood Warning",
  "Severe Thunderstorm Watch",
  "Tornado Watch",
];

// Fallback demo alerts for development if live fetches fail
function getFallbackDemoAlerts(): NwsAlert[] {
  return [
    {
      id: "demo-alert-tornado",
      event: "Tornado Warning",
      headline: "Tornado Warning issued June 09 at 3:15PM CDT expiring June 09 at 4:00PM CDT by NWS Oklahoma City OK",
      severity: "Extreme",
      certainty: "Observed",
      urgency: "Immediate",
      effective: new Date().toISOString(),
      expires: new Date(Date.now() + 45 * 60 * 1000).toISOString(), // +45 mins
      areaDesc: "Cleveland OK; McClain OK; Oklahoma OK",
      instruction: "TAKE COVER NOW! Move to a basement or an interior room on the lowest floor of a sturdy building. Avoid windows. If you are outdoors, in a mobile home, or in a vehicle, move to the closest substantial shelter and protect yourself from flying debris.",
      polygon: [
        [35.15, -97.65],
        [35.40, -97.65],
        [35.40, -97.35],
        [35.15, -97.35],
        [35.15, -97.65], // Close polygon
      ],
      source: "NWS",
    },
    {
      id: "demo-alert-severe",
      event: "Severe Thunderstorm Warning",
      headline: "Severe Thunderstorm Warning issued June 09 at 3:20PM CDT expiring June 09 at 4:30PM CDT by NWS Oklahoma City OK",
      severity: "Severe",
      certainty: "Likely",
      urgency: "Immediate",
      effective: new Date().toISOString(),
      expires: new Date(Date.now() + 70 * 60 * 1000).toISOString(), // +70 mins
      areaDesc: "Pottawatomie OK; Cleveland OK; Lincoln OK",
      instruction: "For your protection move to an interior room on the lowest floor of a building. Large hail and damaging winds are occurring. Do not drive through flooded areas.",
      polygon: [
        [35.20, -97.30],
        [35.45, -97.30],
        [35.45, -96.80],
        [35.20, -96.80],
        [35.20, -97.30], // Close polygon
      ],
      source: "NWS",
    },
  ];
}

export async function fetchNwsAlerts(): Promise<NwsAlert[]> {
  try {
    const response = await fetch("https://api.weather.gov/alerts/active", {
      headers: {
        "User-Agent": "StormTargetMap/1.0 (contact: info@stormtargetmap.com)",
        Accept: "application/geo+json",
      },
      next: { revalidate: 60 }, // Next.js level caching (1 minute)
    });

    if (!response.ok) {
      throw new Error(`NWS API returned HTTP ${response.status}`);
    }

    const data = await response.json();

    if (!data.features || !Array.isArray(data.features)) {
      return [];
    }

    const alerts: NwsAlert[] = [];

    for (const feature of data.features) {
      const props = feature.properties;
      if (!props) continue;

      const event = props.event || "";
      // Filter for only relevant severe weather watches and warnings
      if (!TARGET_EVENTS.includes(event)) continue;

      const id = props.id || feature.id || `nws-${Math.random().toString(36).substring(2)}`;
      const headline = props.headline || "";
      const severity = props.severity || "Unknown";
      const certainty = props.certainty || "Unknown";
      const urgency = props.urgency || "Unknown";
      const effective = props.effective || "";
      const expires = props.expires || props.ends || "";
      const areaDesc = props.areaDesc || "";
      const instruction = props.instruction || "";

      // Parse geometry polygon if available
      let polygon: [number, number][] | undefined = undefined;
      const geom = feature.geometry;

      if (geom && geom.type === "Polygon" && Array.isArray(geom.coordinates)) {
        // Swap coordinates from GeoJSON [lon, lat] to internal [lat, lon]
        const outerRing = geom.coordinates[0];
        if (Array.isArray(outerRing)) {
          polygon = outerRing.map((coord) => {
            if (Array.isArray(coord) && coord.length >= 2) {
              return [coord[1], coord[0]] as [number, number];
            }
            return [0, 0];
          }).filter((c) => c[0] !== 0 || c[1] !== 0);
        }
      } else if (geom && geom.type === "MultiPolygon" && Array.isArray(geom.coordinates)) {
        // Take the first polygon's outer ring
        const firstPolygon = geom.coordinates[0];
        if (Array.isArray(firstPolygon)) {
          const outerRing = firstPolygon[0];
          if (Array.isArray(outerRing)) {
            polygon = outerRing.map((coord) => {
              if (Array.isArray(coord) && coord.length >= 2) {
                return [coord[1], coord[0]] as [number, number];
              }
              return [0, 0];
            }).filter((c) => c[0] !== 0 || c[1] !== 0);
          }
        }
      }

      alerts.push({
        id,
        event,
        headline,
        severity,
        certainty,
        urgency,
        effective,
        expires,
        areaDesc,
        instruction,
        polygon,
        source: "NWS Alerts API",
        geocode: props.geocode,
      });
    }

    return alerts;
  } catch (error) {
    console.error("Error fetching NWS active alerts:", error);
    if (process.env.NODE_ENV === "development") {
      console.warn("Returning fallback active warnings for local development.");
      return getFallbackDemoAlerts();
    } else {
      // In production, return empty list or throw depending on retry strategy
      // Map component will handle empty alert list gracefully
      return [];
    }
  }
}
