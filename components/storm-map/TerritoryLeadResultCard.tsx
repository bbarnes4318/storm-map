"use client";

import React from "react";
import { X, Award, MapPin, Zap, ShieldAlert, FileText, Lock } from "lucide-react";
import { StormReport, NwsAlert } from "@/lib/weather/types";
import { getDistanceMiles } from "@/lib/weather/geo";

interface TerritoryLeadResultCardProps {
  leadCount: number;
  county: string;
  state: string;
  radius: number;
  center: [number, number] | null;
  showHail: boolean;
  showWind: boolean;
  showTornado: boolean;
  showAlerts: boolean;
  minHailSize: number;
  reports: StormReport[];
  alerts: NwsAlert[];
  onViewSample: () => void;
  onUpgrade: () => void;
  onClose: () => void;
  isDemo?: boolean;
}

export function TerritoryLeadResultCard({
  leadCount,
  county,
  state,
  radius,
  center,
  showHail,
  showWind,
  showTornado,
  showAlerts,
  minHailSize,
  reports,
  alerts,
  onViewSample,
  onUpgrade,
  onClose,
  isDemo = false,
}: TerritoryLeadResultCardProps) {
  // Count specific reports within target area
  const stats = React.useMemo(() => {
    const inAreaReports = reports.filter((r) => {
      if (state && r.state.toUpperCase() !== state.toUpperCase()) return false;
      if (center && radius > 0) {
        const dist = getDistanceMiles(center[0], center[1], r.lat, r.lon);
        if (dist > radius) return false;
      }
      if (r.type === "hail" && !showHail) return false;
      if (r.type === "wind" && !showWind) return false;
      if (r.type === "tornado" && !showTornado) return false;
      
      if (r.type === "hail" && minHailSize > 0) {
        const size = parseFloat(r.magnitude || "0");
        if (!isNaN(size) && size < minHailSize) return false;
      }
      return true;
    });

    const hail = inAreaReports.filter((r) => r.type === "hail").length;
    const wind = inAreaReports.filter((r) => r.type === "wind").length;
    const tornado = inAreaReports.filter((r) => r.type === "tornado").length;

    // Count alerts inside the county
    const activeAlerts = alerts.filter((a) => {
      if (!a.event.includes("Warning")) return false;
      const descMatch = a.areaDesc?.toLowerCase().includes(county.toLowerCase()) || 
                        a.headline?.toLowerCase().includes(county.toLowerCase());
      return descMatch;
    }).length;

    return {
      hail,
      wind,
      tornado,
      alerts: activeAlerts,
      total: inAreaReports.length,
    };
  }, [reports, alerts, county, state, radius, center, showHail, showWind, showTornado, minHailSize]);

  // Selected layers array for display
  const activeLayers = [];
  if (showHail) activeLayers.push(`Hail (${minHailSize > 0 ? `≥${minHailSize.toFixed(2)}"` : "All"})`);
  if (showWind) activeLayers.push("Wind");
  if (showTornado) activeLayers.push("Tornado");
  if (showAlerts) activeLayers.push("NWS Warnings");

  return (
    <div 
      data-tour="result-card"
      className="absolute bottom-6 right-6 z-[1010] w-[350px] md:w-[380px] bg-[#071426]/95 border border-[rgba(20,92,255,0.25)] rounded-2xl shadow-[0_12px_40px_rgba(0,0,0,0.5)] backdrop-blur-md text-left select-none overflow-hidden animate-in slide-in-from-bottom-6 duration-300"
    >
      
      {/* Decorative colored glow bar at top */}
      <div className="h-1 bg-gradient-to-r from-[#145CFF] via-[#2F7DFF] to-[#0E8F6E]" />

      <div className="p-4 space-y-4">
        {/* Header Row */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-[#00A86B] shrink-0 animate-pulse" />
            <div>
              <span className="text-[7.5px] font-black text-slate-500 uppercase tracking-widest block leading-none mb-0.5">
                SCAN COMPLETE {isDemo && "· DEMO"}
              </span>
              <span className="text-[9px] text-[#94A3B8] font-bold uppercase tracking-wider block">
                Target Lock Established
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full border border-slate-800 hover:border-slate-700 text-slate-400 hover:text-[#F8FAFC] transition-colors cursor-pointer"
            title="Dismiss Card"
          >
            <X size={12} />
          </button>
        </div>

        {/* Big Leads Found Indicator */}
        <div className="space-y-1 bg-[#050B16]/65 border border-[rgba(20,92,255,0.12)] p-3.5 rounded-xl text-center shadow-inner">
          <h1 className="text-3xl font-black text-[#F8FAFC] tracking-tight bg-gradient-to-r from-white via-slate-100 to-[#2F7DFF] bg-clip-text text-transparent">
            {leadCount.toLocaleString()} Leads Found
          </h1>
          <p className="text-[9.5px] text-[#94A3B8] font-medium leading-relaxed max-w-[280px] mx-auto">
            Estimated homeowner opportunities inside {county} County, {state} within {radius} miles.
          </p>
        </div>

        {/* Grid: Storm report details */}
        <div className="space-y-1.5">
          <span className="text-[7.5px] font-black text-slate-500 uppercase tracking-widest block pl-0.5">
            Storm Report Statistics
          </span>
          <div className="grid grid-cols-5 gap-1.5 text-center">
            <div className="bg-[#050B16]/50 border border-slate-900/60 rounded-lg py-1.5 px-0.5">
              <span className="text-xs font-black text-[#60A5FA] block leading-none">{stats.hail}</span>
              <span className="text-[6.5px] text-slate-500 block font-black uppercase tracking-wide mt-1">HAIL</span>
            </div>
            <div className="bg-[#050B16]/50 border border-slate-900/60 rounded-lg py-1.5 px-0.5">
              <span className="text-xs font-black text-[#A78BFA] block leading-none">{stats.wind}</span>
              <span className="text-[6.5px] text-slate-500 block font-black uppercase tracking-wide mt-1">WIND</span>
            </div>
            <div className="bg-[#050B16]/50 border border-slate-900/60 rounded-lg py-1.5 px-0.5">
              <span className="text-xs font-black text-[#FB7185] block leading-none">{stats.tornado}</span>
              <span className="text-[6.5px] text-slate-500 block font-black uppercase tracking-wide mt-1">TORN</span>
            </div>
            <div className="bg-[#050B16]/50 border border-slate-900/60 rounded-lg py-1.5 px-0.5">
              <span className="text-xs font-black text-[#FBBF24] block leading-none">{stats.alerts}</span>
              <span className="text-[6.5px] text-slate-500 block font-black uppercase tracking-wide mt-1">WARN</span>
            </div>
            <div className="bg-[#050B16]/50 border border-[#0E8F6E]/20 rounded-lg py-1.5 px-0.5">
              <span className="text-xs font-black text-[#00A86B] block leading-none">{stats.total}</span>
              <span className="text-[6.5px] text-[#00A86B]/70 block font-black uppercase tracking-wide mt-1">TOTAL</span>
            </div>
          </div>
        </div>

        {/* Territory Info list */}
        <div className="bg-[#050B16]/30 border border-slate-900/50 rounded-xl p-3 text-[9.5px] space-y-1.5 font-semibold text-slate-400">
          <div className="flex justify-between items-center">
            <span className="text-slate-500">Target Area</span>
            <span className="text-slate-200 flex items-center gap-1">
              <MapPin size={9} className="text-[#145CFF]" />
              {county} County, {state}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-slate-500">Scan Radius</span>
            <span className="text-slate-200">{radius} Miles</span>
          </div>
          <div className="flex justify-between items-start">
            <span className="text-slate-500">Applied Signals</span>
            <span className="text-slate-200 text-right max-w-[180px] truncate" title={activeLayers.join(", ")}>
              {activeLayers.join(" + ") || "None"}
            </span>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col gap-2 pt-1 font-sans">
          <button
            onClick={onViewSample}
            data-tour="sample-button"
            className="w-full bg-[#145CFF]/15 hover:bg-[#145CFF]/25 border border-[#145CFF]/35 hover:border-[#145CFF]/60 py-2 rounded-lg text-xs font-black text-[#F8FAFC] uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-sm animate-pulse"
          >
            <FileText size={12} className="text-[#145CFF]" />
            <span>View Sample Lead File</span>
          </button>
          
          <button
            onClick={onUpgrade}
            className="w-full bg-gradient-to-r from-[#145CFF] to-[#2F7DFF] hover:from-[#2570FF] hover:to-[#468DFF] border-none py-2.5 rounded-lg text-xs font-black text-[#F8FAFC] uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-md shadow-[#145CFF]/20 relative group overflow-hidden"
          >
            <Lock size={12} className="text-slate-100" />
            <span>Upgrade to Unlock Territory</span>
            {/* Glossy reflection sweep animation on hover */}
            <div className="absolute inset-0 w-[50%] h-full bg-white/10 -skew-x-[20deg] -translate-x-[200%] group-hover:translate-x-[300%] transition-transform duration-1000 ease-out" />
          </button>
        </div>
      </div>
    </div>
  );
}
