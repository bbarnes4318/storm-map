"use client";

import React from "react";
import { Shield, Target, Zap, AlertCircle } from "lucide-react";

interface DemoRadarPreviewProps {
  scanning?: boolean;
  scanProgress?: number; // 0 to 100
  showOpportunities?: boolean;
  selectedRadius?: number; // e.g. 15
}

export default function DemoRadarPreview({
  scanning = false,
  scanProgress = 0,
  showOpportunities = false,
  selectedRadius = 15,
}: DemoRadarPreviewProps) {
  return (
    <div className="relative w-full h-full min-h-[300px] flex items-center justify-center bg-[#050B16] rounded-2xl border border-[#145CFF]/15 overflow-hidden shadow-2xl">
      {/* CSS Animations Injector */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes sweep {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes pulse-ring {
          0% { transform: scale(0.95); opacity: 0.1; }
          50% { transform: scale(1.02); opacity: 0.25; }
          100% { transform: scale(0.95); opacity: 0.1; }
        }
        @keyframes ping-dot {
          0% { transform: scale(1); opacity: 1; }
          70% { transform: scale(2.2); opacity: 0; }
          100% { transform: scale(1); opacity: 0; }
        }
        .radar-sweep-line {
          animation: sweep 4s linear infinite;
          transform-origin: bottom right;
        }
        .radar-sweep-line-fast {
          animation: sweep 2s linear infinite;
          transform-origin: bottom right;
        }
        .animate-pulse-ring {
          animation: pulse-ring 3s ease-in-out infinite;
        }
      `}} />

      {/* Grid Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(20,92,255,0.07)_0%,transparent_70%)] pointer-events-none" />
      <div className="absolute inset-0 grid grid-cols-8 grid-rows-8 opacity-15 pointer-events-none">
        {Array.from({ length: 64 }).map((_, i) => (
          <div key={i} className="border-[0.5px] border-slate-700" />
        ))}
      </div>

      {/* Radar Circles */}
      <div className="absolute w-[80%] aspect-square rounded-full border border-slate-800/60 flex items-center justify-center">
        <div className="w-[70%] aspect-square rounded-full border border-[#145CFF]/10 flex items-center justify-center">
          <div className="w-[50%] aspect-square rounded-full border border-slate-800/60 flex items-center justify-center">
            <div className="w-[30%] aspect-square rounded-full border border-[#145CFF]/10 flex items-center justify-center">
              <div className="w-1.5 h-1.5 rounded-full bg-[#145CFF] shadow-glow" />
            </div>
          </div>
        </div>
      </div>

      {/* Bounding box approximation preview (dotted cyan line) */}
      {showOpportunities && (
        <div className="absolute w-[60%] h-[55%] border border-cyan-500/25 border-dashed rounded-lg bg-cyan-500/[0.01] flex items-center justify-center animate-pulse duration-1000">
          <span className="absolute top-1 left-2 text-[6.5px] font-mono text-cyan-400 opacity-60 uppercase">
            Estimated search bounds
          </span>
        </div>
      )}

      {/* Royal-Blue Radius Overlay Ring */}
      <div 
        className={`absolute w-[50%] aspect-square rounded-full bg-[#145CFF]/5 border border-dashed border-[#145CFF] flex items-center justify-center transition-all duration-300 ${
          scanning ? "animate-pulse-ring" : ""
        }`}
      >
        <span className="absolute -top-4 text-[7px] font-bold text-[#145CFF] uppercase bg-[#050B16] px-1 py-0.2 rounded border border-[#145CFF]/15">
          {selectedRadius} mi radius
        </span>
      </div>

      {/* Sweep Line */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-1/2 h-1/2 overflow-hidden origin-bottom-right">
          <div 
            className={`w-full h-full bg-gradient-to-tl from-[#145CFF]/20 to-transparent border-r border-[#145CFF]/40 ${
              scanning ? "radar-sweep-line-fast" : "radar-sweep-line"
            }`}
          />
        </div>
      </div>

      {/* Storm Blobs (Severe weather blobs) */}
      <div className="absolute inset-0 pointer-events-none select-none">
        {/* Blob 1: Tornado Warning (Red) */}
        <div 
          className="absolute w-12 h-8 rounded-full bg-rose-600/10 blur-[8px] border border-rose-500/20"
          style={{ top: "30%", left: "45%", transform: "rotate(-15deg)" }}
        />
        <div 
          className="absolute w-8 h-8 rounded-full bg-[#F43F5E]/15 blur-[4px]"
          style={{ top: "32%", left: "47%" }}
        />

        {/* Blob 2: Severe Hail (Orange/Yellow) */}
        <div 
          className="absolute w-16 h-10 rounded-full bg-amber-500/10 blur-[10px] border border-amber-500/20"
          style={{ top: "52%", left: "25%", transform: "rotate(35deg)" }}
        />
        <div 
          className="absolute w-10 h-7 rounded-full bg-yellow-500/15 blur-[6px]"
          style={{ top: "54%", left: "28%" }}
        />
      </div>

      {/* Targets / Opportunities Dots */}
      {showOpportunities && (
        <div className="absolute inset-0 pointer-events-none">
          {/* Target 1: Hail Strike (Blue) */}
          <div className="absolute top-[35%] left-[49%] flex items-center justify-center">
            <span className="absolute w-3 h-3 rounded-full bg-blue-500/30 animate-ping opacity-75" />
            <div className="w-1.5 h-1.5 rounded-full bg-blue-500 border border-white shadow-glow-hail" />
          </div>

          {/* Target 2: Wind hit (Purple) */}
          <div className="absolute top-[56%] left-[32%] flex items-center justify-center">
            <span className="absolute w-3 h-3 rounded-full bg-[#8B5CF6]/30 animate-ping opacity-75" />
            <div className="w-1.5 h-1.5 rounded-full bg-[#8B5CF6] border border-white shadow-glow-wind" />
          </div>

          {/* Target 3: Severe Opportunity (Green) */}
          <div className="absolute top-[42%] left-[44%] flex items-center justify-center">
            <span className="absolute w-4 h-4 rounded-full bg-[#0E8F6E]/40 animate-ping opacity-90" />
            <div className="w-2 h-2 rounded-full bg-[#00A86B] border border-white shadow-glow-hail" />
          </div>

          {/* Target 4: Hail Strike (Blue) */}
          <div className="absolute top-[48%] left-[58%] flex items-center justify-center">
            <div className="w-1.5 h-1.5 rounded-full bg-blue-500 border border-white" />
          </div>
        </div>
      )}

      {/* Center Label Marker */}
      <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center bg-[#071426]/95 border border-[#145CFF]/30 px-2.5 py-1 rounded shadow-lg z-20 pointer-events-none select-none text-center">
        <span className="text-[7.5px] font-black uppercase text-[#F8FAFC] tracking-wider leading-none">
          Knox County, TN
        </span>
        <span className="text-[6.5px] font-bold text-slate-400 leading-none mt-0.5">
          Centroid Marker
        </span>
      </div>

      {/* Scanning Overlay (HUD) */}
      {scanning && (
        <div className="absolute bottom-4 left-4 right-4 bg-[#0B1930]/90 border border-[#145CFF]/35 rounded-xl p-3 flex items-center justify-between shadow-2xl backdrop-blur-sm z-30 select-none animate-in slide-in-from-bottom duration-300">
          <div className="space-y-1 flex-1">
            <div className="flex items-center justify-between text-[9px] font-extrabold text-[#F8FAFC] uppercase tracking-wider">
              <span>SCANNING STORM ACTIVITY</span>
              <span className="text-[#145CFF]">{scanProgress}%</span>
            </div>
            {/* Progress bar */}
            <div className="w-full h-1.5 bg-[#050B16] rounded-full overflow-hidden border border-slate-900">
              <div 
                className="h-full bg-gradient-to-r from-[#145CFF] to-cyan-400 rounded-full transition-all duration-100"
                style={{ width: `${scanProgress}%` }}
              />
            </div>
          </div>
          <div className="ml-3 shrink-0 flex items-center gap-1.5 text-[9px] font-bold text-[#145CFF] animate-pulse">
            <Zap size={10} className="fill-[#145CFF]" />
            <span>LIVE SCAN</span>
          </div>
        </div>
      )}

      {/* Static HUD values */}
      <div className="absolute top-3 left-3 flex flex-col gap-1 text-[7.5px] font-mono text-slate-500 pointer-events-none select-none">
        <span>LAT: 35.9932° N</span>
        <span>LON: 83.9364° W</span>
        <span>RADAR: NWS KNOXVILLE (MRX)</span>
      </div>
      <div className="absolute top-3 right-3 flex items-center gap-1 text-[7.5px] font-mono text-emerald-500 pointer-events-none select-none">
        <span className="w-1 h-1 rounded-full bg-emerald-500 animate-ping" />
        <span>SYS ACTIVE</span>
      </div>
    </div>
  );
}
