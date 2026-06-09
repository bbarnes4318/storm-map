import Papa from "papaparse";
import { StormReport } from "./types";

// Helper to parse coordinate string which might be in decimal degrees or NOAA integer format (e.g. 3521 -> 35.21)
function parseLatitude(val: string): number {
  if (!val) return 0;
  let num = parseFloat(val.trim());
  if (isNaN(num)) return 0;
  if (Math.abs(num) > 90) {
    num = num / 100;
  }
  return num;
}

function parseLongitude(val: string): number {
  if (!val) return 0;
  let num = parseFloat(val.trim());
  if (isNaN(num)) return 0;
  if (Math.abs(num) > 180) {
    num = num / 100;
  }
  // SPC longitudes are sometimes positive in raw text but represent Western hemisphere (negative)
  if (num > 0) {
    num = -num;
  }
  return num;
}

// Generate fallback demo data representing an active severe weather outbreak in the Midwest/South
function getFallbackDemoData(): StormReport[] {
  return [
    {
      id: "demo-hail-1",
      type: "hail",
      timeRaw: "2130",
      eventDate: "today",
      location: "3 S NORMAN",
      county: "CLEVELAND",
      state: "OK",
      lat: 35.18,
      lon: -97.44,
      magnitude: "2.75",
      comments: "[Demo Fallback] Baseball sized hail reported. Significant vehicle and roof damage.",
      source: "SPC",
    },
    {
      id: "demo-hail-2",
      type: "hail",
      timeRaw: "2145",
      eventDate: "today",
      location: "MOORE",
      county: "CLEVELAND",
      state: "OK",
      lat: 35.34,
      lon: -97.49,
      magnitude: "1.75",
      comments: "[Demo Fallback] Golf ball sized hail covering ground. Roof damage reported.",
      source: "SPC",
    },
    {
      id: "demo-hail-3",
      type: "hail",
      timeRaw: "2205",
      eventDate: "today",
      location: "5 NE OKLAHOMA CITY",
      county: "OKLAHOMA",
      state: "OK",
      lat: 35.53,
      lon: -97.45,
      magnitude: "1.00",
      comments: "[Demo Fallback] Quarter sized hail. Minor damage to gutters and shingles.",
      source: "SPC",
    },
    {
      id: "demo-wind-1",
      type: "wind",
      timeRaw: "2115",
      eventDate: "today",
      location: "NEWCASTLE",
      county: "MCCLAIN",
      state: "OK",
      lat: 35.24,
      lon: -97.60,
      magnitude: "65",
      comments: "[Demo Fallback] Severe wind gusts estimated at 65 mph. Power lines and tree limbs down.",
      source: "SPC",
    },
    {
      id: "demo-wind-2",
      type: "wind",
      timeRaw: "2230",
      eventDate: "today",
      location: "SHAWNEE",
      county: "POTTAWATOMIE",
      state: "OK",
      lat: 35.33,
      lon: -96.92,
      magnitude: "70",
      comments: "[Demo Fallback] Measured 70 mph wind gust at local airport. Roof shingles blown off.",
      source: "SPC",
    },
    {
      id: "demo-torn-1",
      type: "tornado",
      timeRaw: "2150",
      eventDate: "today",
      location: "2 W MOORE",
      county: "CLEVELAND",
      state: "OK",
      lat: 35.34,
      lon: -97.53,
      magnitude: "EF-2",
      comments: "[Demo Fallback] Confirmed tornado on ground. Structural damage to multiple homes.",
      source: "SPC",
    },
    {
      id: "demo-hail-yesterday-1",
      type: "hail",
      timeRaw: "1820",
      eventDate: "yesterday",
      location: "DFW AIRPORT",
      county: "TARRANT",
      state: "TX",
      lat: 32.89,
      lon: -97.04,
      magnitude: "1.50",
      comments: "[Demo Fallback] Ping pong ball sized hail reported at DFW terminal. Delaying flights.",
      source: "SPC",
    },
    {
      id: "demo-wind-yesterday-1",
      type: "wind",
      timeRaw: "1910",
      eventDate: "yesterday",
      location: "FORT WORTH",
      county: "TARRANT",
      state: "TX",
      lat: 32.75,
      lon: -97.33,
      magnitude: "60",
      comments: "[Demo Fallback] Large oak tree blown down blocking roadway. High winds damaged roof trim.",
      source: "SPC",
    },
  ];
}

async function fetchSingleSpcCsv(
  url: string,
  type: "hail" | "wind" | "tornado",
  eventDate: "today" | "yesterday"
): Promise<StormReport[]> {
  try {
    const response = await fetch(url, {
      headers: {
        "User-Agent": "StormTargetMap/1.0 (contact: info@stormtargetmap.com)",
      },
      next: { revalidate: 300 }, // Next.js level caching (5 minutes)
    });

    if (!response.ok) {
      throw new Error(`NOAA SPC returned HTTP ${response.status}`);
    }

    const csvText = await response.text();
    
    // Parse using Papaparse
    const parsed = Papa.parse(csvText, {
      header: false,
      skipEmptyLines: true,
    });

    const reports: StormReport[] = [];
    const rows = parsed.data as string[][];

    // Find the header row (sometimes there are descriptive comments or blank rows at the top)
    let headerIndex = -1;
    for (let i = 0; i < rows.length; i++) {
      const row = rows[i];
      if (row.length >= 7 && row[0].toLowerCase().trim() === "time") {
        headerIndex = i;
        break;
      }
    }

    if (headerIndex === -1) {
      console.warn(`Could not find header row in SPC CSV: ${url}`);
      return [];
    }

    // Process data rows following the header
    for (let i = headerIndex + 1; i < rows.length; i++) {
      const row = rows[i];
      // Check if we hit the summary section at the bottom (usually starts with "Total" or similar)
      if (row.length === 0 || row[0].toLowerCase().trim().startsWith("total")) {
        break;
      }

      if (row.length < 8) continue; // Malformed row

      const timeRaw = row[0].trim();
      const magnitude = row[1].trim(); // Size (hail), Speed (wind), or F-Scale (tornado)
      const location = row[2].trim();
      const county = row[3].trim();
      const state = row[4].trim();
      const latRaw = row[5].trim();
      const lonRaw = row[6].trim();
      const comments = row[7].trim();

      const lat = parseLatitude(latRaw);
      const lon = parseLongitude(lonRaw);

      if (lat === 0 || lon === 0) continue; // Skip invalid coordinates

      reports.push({
        id: `spc-${eventDate}-${type}-${i}`,
        type,
        timeRaw,
        eventDate,
        location,
        county,
        state,
        lat,
        lon,
        magnitude,
        comments,
        source: "SPC",
      });
    }

    return reports;
  } catch (error) {
    console.error(`Error fetching or parsing SPC CSV (${url}):`, error);
    throw error;
  }
}

export async function fetchSpcReports(): Promise<StormReport[]> {
  const endpoints = [
    { url: "https://www.spc.noaa.gov/climo/reports/today_hail.csv", type: "hail", date: "today" },
    { url: "https://www.spc.noaa.gov/climo/reports/today_wind.csv", type: "wind", date: "today" },
    { url: "https://www.spc.noaa.gov/climo/reports/today_torn.csv", type: "tornado", date: "today" },
    { url: "https://www.spc.noaa.gov/climo/reports/yesterday_hail.csv", type: "hail", date: "yesterday" },
    { url: "https://www.spc.noaa.gov/climo/reports/yesterday_wind.csv", type: "wind", date: "yesterday" },
    { url: "https://www.spc.noaa.gov/climo/reports/yesterday_torn.csv", type: "tornado", date: "yesterday" },
  ] as const;

  const results: StormReport[] = [];
  let failedCount = 0;

  for (const ep of endpoints) {
    try {
      const reports = await fetchSingleSpcCsv(ep.url, ep.type, ep.date);
      results.push(...reports);
    } catch (e) {
      failedCount++;
    }
  }

  // If all fetches failed and we are in local development, return fallback demo data
  if (failedCount === endpoints.length) {
    if (process.env.NODE_ENV === "development") {
      console.warn("All SPC fetches failed. Returning fallback demo data for local development.");
      return getFallbackDemoData();
    } else {
      throw new Error("Failed to fetch storm reports from NOAA SPC endpoints.");
    }
  }

  return results;
}
