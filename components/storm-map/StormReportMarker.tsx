"use client";

import React from "react";
import { Marker, Popup } from "react-leaflet";
import L from "leaflet";
import { StormReport, NwsAlert } from "@/lib/weather/types";
import { calculateReportScore } from "@/lib/weather/geo";
import { ShieldAlert, Wind, HelpCircle } from "lucide-react";

interface StormReportMarkerProps {
  report: StormReport;
  activeAlerts: NwsAlert[];
  allReports: StormReport[];
}

// Custom SVG HTML icon generator for Leaflet
function createStormIcon(type: "hail" | "wind" | "tornado", magnitude?: string) {
  let html = "";
  let className = "";
  const size: [number, number] = [28, 28];

  if (type === "hail") {
    let sizeText = magnitude || "";
    const sizeFloat = parseFloat(sizeText);
    if (!isNaN(sizeFloat)) {
      // Normalize hail magnitude (some SPC reports write 1.75 as 1.75 or 175)
      const displaySize = sizeFloat > 10 ? sizeFloat / 100 : sizeFloat;
      sizeText = `${displaySize.toFixed(2)}`;
    }
    html = `
      <div class="w-7 h-7 rounded-full bg-blue-500 border border-blue-200 shadow-glow-hail flex items-center justify-center text-[9px] font-extrabold text-white relative">
        <span>${sizeText}</span>
      </div>
    `;
    className = "custom-hail-icon";
  } else if (type === "wind") {
    let speedText = magnitude || "";
    // If it's a number, display speed in mph/kts. If empty or UNK, write W.
    if (!speedText || speedText.toLowerCase() === "unk") {
      speedText = "W";
    }
    html = `
      <div class="w-7 h-7 rounded-full bg-orange-500 border border-orange-200 shadow-glow-wind flex items-center justify-center text-[9px] font-extrabold text-white relative">
        <span>${speedText}</span>
      </div>
    `;
    className = "custom-wind-icon";
  } else if (type === "tornado") {
    let tornText = magnitude || "T";
    html = `
      <div class="w-7 h-7 rounded-full bg-red-600 border border-red-200 shadow-glow-tornado flex items-center justify-center text-[10px] font-extrabold text-white relative animate-target-pulse">
        <span>${tornText}</span>
      </div>
    `;
    className = "custom-tornado-icon";
  }

  return L.divIcon({
    html,
    className,
    iconSize: size,
    iconAnchor: [size[0] / 2, size[1] / 2],
    popupAnchor: [0, -size[1] / 2],
  });
}

export function StormReportMarker({ report, activeAlerts, allReports }: StormReportMarkerProps) {
  const icon = React.useMemo(() => {
    return createStormIcon(report.type, report.magnitude);
  }, [report.type, report.magnitude]);

  // Calculate opportunity score for B2B targeting dashboard
  const opportunityScore = React.useMemo(() => {
    return calculateReportScore(report, activeAlerts, allReports);
  }, [report, activeAlerts, allReports]);

  // Format the time raw string (HHMM UTC) into a human readable format
  const formattedTime = React.useMemo(() => {
    if (report.timeRaw && report.timeRaw.length === 4) {
      const hh = report.timeRaw.slice(0, 2);
      const mm = report.timeRaw.slice(2, 4);
      let hourInt = parseInt(hh, 10);
      const ampm = hourInt >= 12 ? "PM" : "AM";
      hourInt = hourInt % 12 || 12;
      return `${hourInt}:${mm} ${ampm} UTC`;
    }
    return report.timeRaw;
  }, [report.timeRaw]);

  // Determine styling based on opportunity score
  const scoreBadgeColor = () => {
    if (opportunityScore >= 100) return "bg-red-500/20 text-red-300 border-red-500/40";
    if (opportunityScore >= 70) return "bg-orange-500/20 text-orange-300 border-orange-500/40";
    return "bg-slate-700/50 text-slate-300 border-slate-600";
  };

  const scoreText = () => {
    if (opportunityScore >= 100) return "EXCELLENT TARGET";
    if (opportunityScore >= 70) return "HIGH PRIORITY";
    return "STANDARD OPP";
  };

  return (
    <Marker position={[report.lat, report.lon]} icon={icon}>
      <Popup minWidth={260} maxWidth={320}>
        <div className="text-slate-100 flex flex-col gap-2">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-800 pb-1.5">
            <span className="flex items-center gap-1.5">
              <span
                className={`w-2 h-2 rounded-full ${
                  report.type === "hail"
                    ? "bg-blue-500"
                    : report.type === "wind"
                    ? "bg-orange-500"
                    : "bg-red-500"
                }`}
              ></span>
              <span className="font-extrabold uppercase tracking-wider text-xs">
                {report.type} REPORT
              </span>
            </span>
            <span className="text-[10px] text-slate-400 capitalize">{report.eventDate}</span>
          </div>

          {/* Target Priority Score */}
          <div className={`flex items-center justify-between px-2 py-1 rounded border text-[10px] ${scoreBadgeColor()}`}>
            <span className="font-semibold">TARGET VALUE: {opportunityScore} pts</span>
            <span className="font-extrabold text-[9px] tracking-wide uppercase">{scoreText()}</span>
          </div>

          {/* Details */}
          <div className="space-y-1.5 text-xs text-slate-300">
            <div>
              <span className="text-slate-500 font-medium block text-[10px] uppercase">Magnitude</span>
              <p className="font-semibold text-slate-200">
                {report.type === "hail" && report.magnitude
                  ? `${(parseFloat(report.magnitude) > 10 ? parseFloat(report.magnitude) / 100 : parseFloat(report.magnitude)).toFixed(2)} in Hail`
                  : report.type === "wind" && report.magnitude
                  ? `${report.magnitude} mph Wind`
                  : report.type === "tornado"
                  ? `${report.magnitude || "Reported"} Tornado`
                  : "N/A"}
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-2">
              <div>
                <span className="text-slate-500 font-medium block text-[10px] uppercase">Time (UTC)</span>
                <p className="font-medium text-slate-200">{formattedTime}</p>
              </div>
              <div>
                <span className="text-slate-500 font-medium block text-[10px] uppercase">State / County</span>
                <p className="font-medium text-slate-200">{report.county}, {report.state}</p>
              </div>
            </div>

            <div>
              <span className="text-slate-500 font-medium block text-[10px] uppercase">Location Details</span>
              <p className="font-medium text-slate-200">{report.location}</p>
            </div>

            {report.comments && (
              <div>
                <span className="text-slate-500 font-medium block text-[10px] uppercase">SPC Comments</span>
                <p className="font-light italic text-slate-300 text-[11px] bg-slate-950/40 p-1.5 rounded border border-slate-900/60 leading-relaxed">
                  "{report.comments}"
                </p>
              </div>
            )}
          </div>

          {/* Footer & Disclaimer */}
          <div className="mt-1 pt-1.5 border-t border-slate-800 text-[9px] text-slate-500 flex flex-col gap-0.5">
            <div>Source: NOAA SPC preliminary storm report</div>
            <div className="italic text-slate-500/80 leading-normal">
              * Storm reports are preliminary and may be updated by NOAA/SPC.
            </div>
          </div>
        </div>
      </Popup>
    </Marker>
  );
}
export default StormReportMarker;
