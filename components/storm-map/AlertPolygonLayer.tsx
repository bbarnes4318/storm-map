"use client";

import React from "react";
import { Polygon, Popup } from "react-leaflet";
import { NwsAlert } from "@/lib/weather/types";
import { Calendar, Clock, AlertCircle, ShieldCheck } from "lucide-react";

interface AlertPolygonLayerProps {
  alerts: NwsAlert[];
}

function getAlertStyle(event: string) {
  if (event.includes("Tornado Warning")) {
    return {
      color: "#ef4444", // Red
      fillColor: "#ef4444",
      fillOpacity: 0.3,
      weight: 3,
      className: "animate-pulse-slow",
    };
  } else if (event.includes("Severe Thunderstorm Warning")) {
    return {
      color: "#f97316", // Orange
      fillColor: "#f97316",
      fillOpacity: 0.25,
      weight: 2,
    };
  } else if (event.includes("Flood") || event.includes("Flash Flood")) {
    return {
      color: "#3b82f6", // Blue
      fillColor: "#3b82f6",
      fillOpacity: 0.2,
      weight: 2,
    };
  } else {
    // Watches (Tornado Watch, Severe Thunderstorm Watch)
    return {
      color: "#eab308", // Yellow/Amber
      fillColor: "#eab308",
      fillOpacity: 0.12,
      weight: 1.5,
      dashArray: "5, 5",
    };
  }
}

export function AlertPolygonLayer({ alerts }: AlertPolygonLayerProps) {
  // Only render alerts that have polygon coordinate paths
  const polygonAlerts = React.useMemo(() => {
    return alerts.filter((alert) => alert.polygon && alert.polygon.length > 0);
  }, [alerts]);

  const formatTime = (isoString?: string) => {
    if (!isoString) return "N/A";
    try {
      const date = new Date(isoString);
      return date.toLocaleTimeString([], { hour: "numeric", minute: "2-digit", timeZoneName: "short" });
    } catch (e) {
      return isoString;
    }
  };

  return (
    <>
      {polygonAlerts.map((alert) => {
        const style = getAlertStyle(alert.event);
        
        return (
          <Polygon
            key={alert.id}
            positions={alert.polygon!}
            pathOptions={style}
          >
            <Popup minWidth={280} maxWidth={360}>
              <div className="text-slate-100 flex flex-col gap-2 max-h-80 overflow-y-auto pr-1">
                {/* Header */}
                <div className="flex items-center gap-1.5 border-b border-slate-800 pb-1.5">
                  <AlertCircle
                    size={16}
                    className={
                      alert.event.includes("Tornado")
                        ? "text-red-500"
                        : alert.event.includes("Severe")
                        ? "text-orange-500"
                        : "text-blue-500"
                    }
                  />
                  <span className="font-extrabold uppercase text-xs tracking-wider">
                    {alert.event}
                  </span>
                </div>

                {/* Headline Text */}
                <p className="text-xs font-semibold text-slate-200 leading-normal">
                  {alert.headline}
                </p>

                {/* Timing metadata */}
                <div className="grid grid-cols-2 gap-2 bg-slate-950/50 p-2 rounded border border-slate-900 text-[10px]">
                  <div className="flex flex-col gap-0.5">
                    <span className="text-slate-500 font-medium uppercase">Effective</span>
                    <span className="text-slate-300 font-semibold">{formatTime(alert.effective)}</span>
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <span className="text-slate-500 font-medium uppercase">Expires</span>
                    <span className="text-red-400 font-semibold">{formatTime(alert.expires)}</span>
                  </div>
                </div>

                {/* Alert details */}
                <div className="space-y-2 text-xs">
                  <div>
                    <span className="text-slate-500 font-medium block text-[9px] uppercase tracking-wider">Severity & Urgency</span>
                    <div className="flex gap-1.5 mt-0.5">
                      <span className="px-1.5 py-0.5 rounded bg-slate-800 text-[10px] text-slate-300">
                        {alert.severity} Severity
                      </span>
                      <span className="px-1.5 py-0.5 rounded bg-slate-800 text-[10px] text-slate-300">
                        {alert.certainty} Certainty
                      </span>
                    </div>
                  </div>

                  <div>
                    <span className="text-slate-500 font-medium block text-[9px] uppercase tracking-wider">Target Counties</span>
                    <p className="text-slate-300 text-[11px] leading-relaxed">
                      {alert.areaDesc}
                    </p>
                  </div>

                  {alert.instruction && (
                    <div className="border-t border-slate-900/80 pt-2">
                      <span className="text-red-400/90 font-bold block text-[9px] uppercase tracking-wider">NWS Instructions</span>
                      <p className="text-slate-300 font-light text-[11px] leading-relaxed mt-0.5 bg-red-950/10 border border-red-500/10 p-2 rounded italic">
                        {alert.instruction}
                      </p>
                    </div>
                  )}
                </div>

                {/* Footer source info */}
                <div className="mt-1 pt-1.5 border-t border-slate-800 text-[9px] text-slate-500 flex justify-between">
                  <span>Source: {alert.source}</span>
                  <span className="text-slate-500/80">Active Alert Area</span>
                </div>
              </div>
            </Popup>
          </Polygon>
        );
      })}
    </>
  );
}
export default AlertPolygonLayer;
