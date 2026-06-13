import React from "react";

export function StormLegend({ className }: { className?: string }) {
  return (
    <div className={className || "bg-[#071426]/95 border border-[#145CFF]/24 rounded-lg p-4 shadow-glass text-xs text-slate-350 w-64 pointer-events-auto"}>
      <h3 className="font-bold text-[#F8FAFC] mb-2 border-b border-[#145CFF]/15 pb-1.5 flex items-center justify-between">
        <span>MAP LEGEND</span>
        <span className="text-[8px] text-slate-500 font-mono tracking-wider">STORM TARGET LIVE</span>
      </h3>

      {/* Radar Reflectivity Scale */}
      <div className="mb-3">
        <span className="text-[10px] font-extrabold text-[#F8FAFC] block mb-1 uppercase tracking-wider">Primary Visual Layers</span>
        <span className="font-semibold text-slate-300 block mb-1">Live NOAA Radar (dBZ)</span>
        <div className="h-2.5 w-full rounded-full flex overflow-hidden mb-1 bg-slate-950 p-[1px] border border-[#145CFF]/10">
          <div className="h-full flex-1 bg-[#4ade80]" title="Light Rain / Fog (5-15 dBZ)"></div>
          <div className="h-full flex-1 bg-[#22c55e]" title="Moderate Rain (15-30 dBZ)"></div>
          <div className="h-full flex-1 bg-[#eab308]" title="Heavy Rain (30-45 dBZ)"></div>
          <div className="h-full flex-1 bg-[#f97316]" title="Intense Storm / Hail (45-55 dBZ)"></div>
          <div className="h-full flex-1 bg-[#ef4444]" title="Severe Hail / Tornado Core (55-65 dBZ)"></div>
          <div className="h-full flex-1 bg-[#ec4899]" title="Extreme Hail (>65 dBZ)"></div>
          <div className="h-full flex-1 bg-white" title="Debris Ball / Extreme Intensity"></div>
        </div>
        <div className="flex justify-between text-[9px] text-slate-400 font-medium">
          <span>Light (15)</span>
          <span>Moderate (35)</span>
          <span>Extreme (65+)</span>
        </div>
      </div>

      {/* Warning Polygons */}
      <div className="mb-3">
        <span className="font-semibold text-slate-300 block mb-1.5">Active NWS Alerts</span>
        <div className="grid grid-cols-2 gap-2 text-[10px] text-slate-350">
          <div className="flex items-center gap-1.5">
            <span className="w-3.5 h-2.5 rounded bg-red-500/20 border border-red-500 inline-block"></span>
            <span>Tornado War.</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3.5 h-2.5 rounded bg-orange-500/20 border border-orange-500 inline-block"></span>
            <span>Svr T-Storm War.</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3.5 h-2.5 rounded bg-blue-500/20 border border-blue-500 inline-block"></span>
            <span>Flood Warning</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3.5 h-2.5 rounded bg-amber-500/20 border border-amber-500 inline-block"></span>
            <span>Watches</span>
          </div>
        </div>
      </div>
    </div>
  );
}
export default StormLegend;
