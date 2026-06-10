"use client";

import React from "react";
import { Marker } from "react-map-gl";
import { StormReport } from "@/lib/weather/types";

interface StormReportMarkerProps {
  report: StormReport;
  onClick: () => void;
}

export function StormReportMarker({ report, onClick }: StormReportMarkerProps) {
  let className = "";
  let innerText = "";

  if (report.type === "hail") {
    let sizeText = report.magnitude || "";
    const sizeFloat = parseFloat(sizeText);
    if (!isNaN(sizeFloat)) {
      const displaySize = sizeFloat > 10 ? sizeFloat / 100 : sizeFloat;
      sizeText = `${displaySize.toFixed(2)}`;
    }
    innerText = sizeText;
    className = "w-7 h-7 rounded-full bg-blue-500 border border-blue-200 shadow-glow-hail flex items-center justify-center text-[9px] font-extrabold text-white relative transition-transform hover:scale-110 cursor-pointer";
  } else if (report.type === "wind") {
    let speedText = report.magnitude || "";
    if (!speedText || speedText.toLowerCase() === "unk") {
      speedText = "W";
    }
    innerText = speedText;
    className = "w-7 h-7 rounded-full bg-cyan-500 border border-cyan-200 shadow-glow-wind flex items-center justify-center text-[9px] font-extrabold text-white relative transition-transform hover:scale-110 cursor-pointer";
  } else if (report.type === "tornado") {
    innerText = report.magnitude || "T";
    className = "w-7 h-7 rounded-full bg-red-600 border border-red-200 shadow-glow-tornado flex items-center justify-center text-[10px] font-extrabold text-white relative animate-target-pulse transition-transform hover:scale-110 cursor-pointer";
  }

  return (
    <Marker
      latitude={report.lat}
      longitude={report.lon}
      anchor="center"
      onClick={(e) => {
        // Prevent map click handler from firing
        e.originalEvent.stopPropagation();
        onClick();
      }}
    >
      <div className={className}>
        <span>{innerText}</span>
      </div>
    </Marker>
  );
}

export default StormReportMarker;
