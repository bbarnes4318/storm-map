export interface LocalCountyData {
  countyName: string;
  stateCode: string;
  bbox: [number, number, number, number]; // [west, south, east, north] (minLon, minLat, maxLon, maxLat)
  centroid: [number, number]; // [lat, lon]
}

export const LOCAL_COUNTY_DB: Record<string, LocalCountyData> = {
  // Key format: "countyname_statecode" e.g., "surry_nc"
  "surry_nc": {
    countyName: "Surry",
    stateCode: "NC",
    bbox: [-80.97, 36.21, -80.39, 36.58],
    centroid: [36.41, -80.68]
  },
  "stokes_nc": {
    countyName: "Stokes",
    stateCode: "NC",
    bbox: [-80.54, 36.19, -79.99, 36.59],
    centroid: [36.41, -80.23]
  },
  "forsyth_nc": {
    countyName: "Forsyth",
    stateCode: "NC",
    bbox: [-80.47, 35.98, -80.05, 36.25],
    centroid: [36.13, -80.25]
  },
  "yadkin_nc": {
    countyName: "Yadkin",
    stateCode: "NC",
    bbox: [-80.93, 36.03, -80.43, 36.31],
    centroid: [36.16, -80.66]
  },
  "davie_nc": {
    countyName: "Davie",
    stateCode: "NC",
    bbox: [-80.68, 35.80, -80.39, 36.08],
    centroid: [35.93, -80.54]
  },
  "davidson_nc": {
    countyName: "Davidson",
    stateCode: "NC",
    bbox: [-80.47, 35.53, -79.99, 36.01],
    centroid: [35.79, -80.21]
  },
  "guilford_nc": {
    countyName: "Guilford",
    stateCode: "NC",
    bbox: [-80.12, 35.85, -79.59, 36.24],
    centroid: [36.07, -79.85]
  },
  "cleveland_ok": {
    countyName: "Cleveland",
    stateCode: "OK",
    bbox: [-97.58, 35.03, -96.99, 35.39],
    centroid: [35.20, -97.33]
  },
  "mcclain_ok": {
    countyName: "McClain",
    stateCode: "OK",
    bbox: [-97.80, 34.79, -96.97, 35.25],
    centroid: [35.01, -97.43]
  },
  "oklahoma_ok": {
    countyName: "Oklahoma",
    stateCode: "OK",
    bbox: [-97.86, 35.35, -97.08, 35.75],
    centroid: [35.55, -97.41]
  },
  "pottawatomie_ok": {
    countyName: "Pottawatomie",
    stateCode: "OK",
    bbox: [-97.23, 34.90, -96.71, 35.54],
    centroid: [35.23, -96.94]
  },
  "lincoln_ok": {
    countyName: "Lincoln",
    stateCode: "OK",
    bbox: [-97.16, 35.45, -96.65, 35.94],
    centroid: [35.70, -96.88]
  },
  "canadian_ok": {
    countyName: "Canadian",
    stateCode: "OK",
    bbox: [-98.12, 35.34, -97.71, 35.69],
    centroid: [35.53, -97.97]
  },
  "logan_ok": {
    countyName: "Logan",
    stateCode: "OK",
    bbox: [-97.71, 35.69, -97.16, 36.04],
    centroid: [35.86, -97.45]
  },
  "kingfisher_ok": {
    countyName: "Kingfisher",
    stateCode: "OK",
    bbox: [-98.24, 35.70, -97.70, 36.14],
    centroid: [35.92, -97.94]
  }
};
