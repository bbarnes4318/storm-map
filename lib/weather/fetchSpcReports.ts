import Papa from "papaparse";
import { StormReport } from "./types";
import { weatherCache } from "./cache";

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
  eventDate: string
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

// Generate list of date strings YYYY-MM-DD
function getUtcDateRange(startDateStr: string, endDateStr: string): string[] {
  const dates: string[] = [];
  const start = new Date(startDateStr + "T00:00:00Z");
  const end = new Date(endDateStr + "T00:00:00Z");
  
  if (isNaN(start.getTime()) || isNaN(end.getTime())) {
    return [];
  }
  
  // Cap the range to 30 days
  const diffTime = Math.abs(end.getTime() - start.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  const maxDays = Math.min(diffDays, 30);
  
  const current = new Date(start.getTime());
  for (let i = 0; i <= maxDays; i++) {
    const dateString = current.toISOString().slice(0, 10);
    dates.push(dateString);
    if (dateString === endDateStr) {
      break;
    }
    current.setUTCDate(current.getUTCDate() + 1);
  }
  
  return dates;
}

// Fetch and cache reports for a single date
async function fetchReportsForDate(
  dateStr: string,
  todayStr: string,
  yesterdayStr: string
): Promise<StormReport[]> {
  const isToday = dateStr === todayStr;
  const isYesterday = dateStr === yesterdayStr;
  
  const cacheKey = isToday 
    ? "spc-reports-date-today" 
    : isYesterday 
    ? "spc-reports-date-yesterday" 
    : `spc-reports-date-${dateStr}`;
    
  // Today and yesterday cache for 5 minutes (300s), historical dates cache for 24 hours (86400s)
  const ttl = (isToday || isYesterday) ? 300 : 86400;
  
  const cached = weatherCache.get<StormReport[]>(cacheKey, ttl);
  if (cached) {
    return cached;
  }
  
  let endpoints: { url: string; type: "hail" | "wind" | "tornado" }[] = [];
  const eventDateLabel = isToday ? "today" : isYesterday ? "yesterday" : dateStr;
  
  if (isToday) {
    endpoints = [
      { url: "https://www.spc.noaa.gov/climo/reports/today_hail.csv", type: "hail" },
      { url: "https://www.spc.noaa.gov/climo/reports/today_wind.csv", type: "wind" },
      { url: "https://www.spc.noaa.gov/climo/reports/today_torn.csv", type: "tornado" },
    ];
  } else if (isYesterday) {
    endpoints = [
      { url: "https://www.spc.noaa.gov/climo/reports/yesterday_hail.csv", type: "hail" },
      { url: "https://www.spc.noaa.gov/climo/reports/yesterday_wind.csv", type: "wind" },
      { url: "https://www.spc.noaa.gov/climo/reports/yesterday_torn.csv", type: "tornado" },
    ];
  } else {
    // Historical date format YYMMDD
    const parts = dateStr.split("-");
    if (parts.length === 3) {
      const yy = parts[0].slice(-2);
      const mm = parts[1];
      const dd = parts[2];
      const yymmdd = `${yy}${mm}${dd}`;
      endpoints = [
        { url: `https://www.spc.noaa.gov/climo/reports/${yymmdd}_rpts_hail.csv`, type: "hail" },
        { url: `https://www.spc.noaa.gov/climo/reports/${yymmdd}_rpts_wind.csv`, type: "wind" },
        { url: `https://www.spc.noaa.gov/climo/reports/${yymmdd}_rpts_torn.csv`, type: "tornado" },
      ];
    }
  }
  
  if (endpoints.length === 0) return [];
  
  const dateReports: StormReport[] = [];
  const fetchPromises = endpoints.map(async (ep) => {
    try {
      return await fetchSingleSpcCsv(ep.url, ep.type, eventDateLabel);
    } catch (err) {
      console.warn(`Could not fetch SPC report for ${ep.url}:`, err);
      return [];
    }
  });
  
  const results = await Promise.all(fetchPromises);
  for (const r of results) {
    dateReports.push(...r);
  }
  
  weatherCache.set(cacheKey, dateReports);
  return dateReports;
}

export type FetchSpcOptions = {
  timeWindow?: "24h" | "today" | "yesterday" | "7d" | "30d" | "custom";
  startDate?: string; // YYYY-MM-DD
  endDate?: string;   // YYYY-MM-DD
};

export async function fetchSpcReports(options: FetchSpcOptions = { timeWindow: "24h" }): Promise<StormReport[]> {
  const today = new Date();
  const todayStr = today.toISOString().slice(0, 10);
  const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000);
  const yesterdayStr = yesterday.toISOString().slice(0, 10);
  
  let datesToFetch: string[] = [];
  const window = options.timeWindow || "24h";
  
  if (window === "today") {
    datesToFetch = [todayStr];
  } else if (window === "yesterday") {
    datesToFetch = [yesterdayStr];
  } else if (window === "24h") {
    datesToFetch = [todayStr, yesterdayStr];
  } else if (window === "7d") {
    for (let i = 0; i < 7; i++) {
      const d = new Date(Date.now() - i * 24 * 60 * 60 * 1000);
      datesToFetch.push(d.toISOString().slice(0, 10));
    }
    datesToFetch.reverse();
  } else if (window === "30d") {
    for (let i = 0; i < 30; i++) {
      const d = new Date(Date.now() - i * 24 * 60 * 60 * 1000);
      datesToFetch.push(d.toISOString().slice(0, 10));
    }
    datesToFetch.reverse();
  } else if (window === "custom") {
    if (options.startDate && options.endDate) {
      let start = options.startDate;
      let end = options.endDate;
      if (start > end) {
        [start, end] = [end, start];
      }
      datesToFetch = getUtcDateRange(start, end);
    } else {
      datesToFetch = [todayStr, yesterdayStr];
    }
  }
  
  const allReports: StormReport[] = [];
  const promises = datesToFetch.map(d => fetchReportsForDate(d, todayStr, yesterdayStr));
  const results = await Promise.all(promises);
  
  for (const r of results) {
    allReports.push(...r);
  }
  
  // If all fetches failed and we are in local development, return fallback demo data
  if (allReports.length === 0 && process.env.NODE_ENV === "development") {
    console.warn("No reports retrieved. Returning fallback demo data for local development.");
    return getFallbackDemoData();
  }
  
  return allReports;
}
