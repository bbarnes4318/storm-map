import { StormReport, NwsAlert, TargetCluster } from "./types";

/**
 * Calculates the distance between two points in miles using the Haversine formula.
 */
export function getDistanceMiles(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  if (lat1 === lat2 && lon1 === lon2) return 0;

  const R = 3958.8; // Radius of the Earth in miles
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

/**
 * Calculates the target opportunity score for a single storm report.
 */
export function calculateReportScore(
  report: StormReport,
  activeAlerts: NwsAlert[],
  allReports: StormReport[]
): number {
  let score = 0;

  // 1. Base storm type score
  if (report.type === "hail") {
    score += 50;
    // Extract hail size (e.g. "1.75", "1.00", "0.75", or "175" for 1.75 in older SPC reports)
    let size = parseFloat(report.magnitude || "0");
    // Handle integer formatting e.g. "175" instead of "1.75"
    if (size > 10) size = size / 100;

    if (size >= 1.75) {
      score += 40;
    } else if (size >= 1.0) {
      score += 25;
    }
  } else if (report.type === "wind") {
    score += 35;
    const speed = parseFloat(report.magnitude || "0");
    if (speed >= 58) {
      score += 30;
    }
  } else if (report.type === "tornado") {
    score += 60;
  }

  // 2. Active Warnings nearby (within 15 miles)
  const nearbyWarnings = activeAlerts.filter((alert) => {
    const isTornadoWarning = alert.event.includes("Tornado Warning");
    const isSevereWarning = alert.event.includes("Severe Thunderstorm Warning");
    if (!isTornadoWarning && !isSevereWarning) return false;

    // Check distance to warning polygon vertices
    if (alert.polygon && alert.polygon.length > 0) {
      return alert.polygon.some(
        (vertex) =>
          getDistanceMiles(report.lat, report.lon, vertex[0], vertex[1]) <= 15
      );
    }
    return false;
  });

  const hasTornadoWarning = nearbyWarnings.some((w) =>
    w.event.includes("Tornado Warning")
  );
  const hasSevereWarning = nearbyWarnings.some((w) =>
    w.event.includes("Severe Thunderstorm Warning")
  );

  if (hasTornadoWarning) score += 40;
  if (hasSevereWarning) score += 20;

  // 3. Density bonus: Multiple reports within 15 miles (+20)
  const nearbyOtherReports = allReports.filter(
    (other) =>
      other.id !== report.id &&
      getDistanceMiles(report.lat, report.lon, other.lat, other.lon) <= 15
  );

  if (nearbyOtherReports.length > 0) {
    score += 20;
  }

  return score;
}

/**
 * Groups storm reports within 15 miles into targeted area clusters.
 */
export function clusterStormReports(
  reports: StormReport[],
  activeAlerts: NwsAlert[]
): TargetCluster[] {
  if (reports.length === 0) return [];

  // Pre-calculate scores for all reports
  const reportsWithScores = reports.map((report) => ({
    report,
    score: calculateReportScore(report, activeAlerts, reports),
  }));

  const clusters: TargetCluster[] = [];
  const assigned = new Set<string>();

  // Sort reports by score descending so the cluster centers represent the highest-priority storms
  const sortedReports = [...reportsWithScores].sort((a, b) => b.score - a.score);

  for (const { report, score } of sortedReports) {
    if (assigned.has(report.id)) continue;

    // Start a new cluster
    const clusterReports: StormReport[] = [report];
    assigned.add(report.id);

    // Find all other reports within 15 miles
    for (const other of sortedReports) {
      if (assigned.has(other.report.id)) continue;

      const dist = getDistanceMiles(
        report.lat,
        report.lon,
        other.report.lat,
        other.report.lon
      );

      if (dist <= 15) {
        clusterReports.push(other.report);
        assigned.add(other.report.id);
      }
    }

    // Aggregate cluster data
    const hailCount = clusterReports.filter((r) => r.type === "hail").length;
    const windCount = clusterReports.filter((r) => r.type === "wind").length;
    const tornadoCount = clusterReports.filter((r) => r.type === "tornado").length;

    let mainStormType: "hail" | "wind" | "tornado" = "hail";
    if (tornadoCount >= windCount && tornadoCount >= hailCount && tornadoCount > 0) {
      mainStormType = "tornado";
    } else if (windCount >= hailCount && windCount > 0) {
      mainStormType = "wind";
    }

    // Find highest magnitude
    let highestMagnitude = "N/A";
    if (mainStormType === "hail") {
      const sizes = clusterReports
        .filter((r) => r.type === "hail" && r.magnitude)
        .map((r) => {
          let val = parseFloat(r.magnitude!);
          if (val > 10) val = val / 100;
          return val;
        })
        .filter((v) => !isNaN(v) && isFinite(v));
      if (sizes.length > 0) {
        highestMagnitude = `${Math.max(...sizes).toFixed(2)} in`;
      }
    } else if (mainStormType === "wind") {
      const speeds = clusterReports
        .filter((r) => r.type === "wind" && r.magnitude)
        .map((r) => parseFloat(r.magnitude!))
        .filter((v) => !isNaN(v) && isFinite(v));
      if (speeds.length > 0) {
        highestMagnitude = `${Math.max(...speeds)} mph`;
      }
    } else if (mainStormType === "tornado" && tornadoCount > 0) {
      const ratings = clusterReports
        .filter((r) => r.type === "tornado" && r.magnitude)
        .map((r) => r.magnitude);
      if (ratings.length > 0) {
        highestMagnitude = ratings.join(", ");
      } else {
        highestMagnitude = "Reported";
      }
    }

    // Calculate cluster center (average lat/lon of reports)
    const latSum = clusterReports.reduce((sum, r) => sum + r.lat, 0);
    const lonSum = clusterReports.reduce((sum, r) => sum + r.lon, 0);
    const center: [number, number] = [
      latSum / clusterReports.length,
      lonSum / clusterReports.length,
    ];

    // Total and maximum scores
    const clusterScores = clusterReports.map((r) => {
      const found = reportsWithScores.find((rs) => rs.report.id === r.id);
      return found ? found.score : 0;
    });
    const totalScore = clusterScores.reduce((sum, s) => sum + s, 0);
    const maxScore = Math.max(...clusterScores);

    // Calculate maximum distance from cluster center to find suggested target radius
    let maxDist = 0;
    for (const r of clusterReports) {
      const d = getDistanceMiles(center[0], center[1], r.lat, r.lon);
      if (d > maxDist) maxDist = d;
    }
    // Set suggested target radius: minimum of 10 miles, rounded up to 10, 15, 25, or 50 miles
    let suggestedRadius = 10;
    if (maxDist > 25) suggestedRadius = 50;
    else if (maxDist > 15) suggestedRadius = 25;
    else if (maxDist > 10) suggestedRadius = 15;

    // Use the most severe report's location description as the cluster name
    const reprReport = clusterReports[0];

    clusters.push({
      id: `cluster-${reprReport.id}`,
      center,
      name: reprReport.location || "Unknown Area",
      county: reprReport.county,
      state: reprReport.state,
      reportsCount: clusterReports.length,
      hailCount,
      windCount,
      tornadoCount,
      totalScore,
      maxScore,
      mainStormType,
      highestMagnitude,
      suggestedRadius,
      reports: clusterReports,
    });
  }

  // Sort clusters by total opportunity score descending
  return clusters.sort((a, b) => b.totalScore - a.totalScore);
}

/**
 * Formats SPC location descriptors (e.g., "2 E White Plains" -> "2 mi east of White Plains")
 */
export function formatSPCDescriptor(location: string): string {
  if (!location) return "";
  const match = location.trim().match(/^(\d+)\s+([A-Za-z]+)\s+(.+)$/);
  if (match) {
    const num = match[1];
    const dirRaw = match[2].toUpperCase();
    const place = match[3];

    const dirs: Record<string, string> = {
      N: "north",
      S: "south",
      E: "east",
      W: "west",
      NE: "northeast",
      NW: "northwest",
      SE: "southeast",
      SW: "southwest"
    };

    if (dirs[dirRaw]) {
      return `${num} mi ${dirs[dirRaw]} of ${place}`;
    }
  }
  return `Approx. storm report area: ${location}`;
}
