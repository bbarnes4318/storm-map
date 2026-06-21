"use client";

import React from "react";
import { Zap, ShieldAlert, Wind, Tornado, Compass } from "lucide-react";

interface TerritoryScanOverlayProps {
  selectedCounty: string;
  stateCode: string;
  radius: number;
  showHail: boolean;
  showWind: boolean;
  showTornado: boolean;
  showAlerts: boolean;
}

export function TerritoryScanOverlay({
  selectedCounty,
  stateCode,
  radius,
  showHail,
  showWind,
  showTornado,
  showAlerts,
}: TerritoryScanOverlayProps) {
  const [phaseText, setPhaseText] = React.useState("Locking territory...");

  React.useEffect(() => {
    const phases = [
      { text: "Locking territory...", time: 0 },
      { text: "Loading active storm cells...", time: 600 },
      { text: "Measuring radius...", time: 1200 },
      { text: "Estimating lead count...", time: 1800 },
    ];

    const timeouts = phases.map((phase) =>
      setTimeout(() => {
        setPhaseText(phase.text);
      }, phase.time)
    );

    return () => {
      timeouts.forEach(clearTimeout);
    };
  }, []);

  return (
    <div className="absolute inset-0 bg-[#050B16]/90 backdrop-blur-sm z-[2000] flex flex-col items-center justify-center p-6 text-center select-none overflow-hidden animate-in fade-in duration-300">
      <style>{`
        @keyframes radar-sweep {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes scan-line {
          0% { top: 0%; opacity: 0.1; }
          50% { top: 100%; opacity: 0.8; }
          100% { top: 0%; opacity: 0.1; }
        }
        @keyframes pulse-slow {
          0%, 100% { transform: scale(0.9); opacity: 0.25; }
          50% { transform: scale(1.05); opacity: 0.6; }
        }
        @keyframes scan-glow {
          0%, 100% { filter: drop-shadow(0 0 15px rgba(20,92,255,0.4)); }
          50% { filter: drop-shadow(0 0 30px rgba(20,92,255,0.8)); }
        }
        .animate-radar {
          animation: radar-sweep 5s linear infinite;
        }
        .animate-scan {
          animation: scan-line 3.5s ease-in-out infinite;
        }
        .animate-pulse-slow {
          animation: pulse-slow 2.5s ease-in-out infinite;
        }
        .animate-glow {
          animation: scan-glow 2s ease-in-out infinite;
        }
      `}</style>

      {/* Moving tactical scan line */}
      <div className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#145CFF]/60 to-transparent pointer-events-none animate-scan z-10" />

      {/* Outer Radar Target HUD */}
      <div className="relative w-64 h-64 md:w-80 md:h-80 flex items-center justify-center border border-[rgba(20,92,255,0.18)] rounded-full animate-glow select-none">
        
        {/* Pulsing Concentric rings */}
        <div className="absolute inset-4 border border-[rgba(20,92,255,0.14)] rounded-full animate-pulse-slow" />
        <div className="absolute inset-16 border border-[rgba(20,92,255,0.10)] rounded-full animate-pulse-slow" style={{ animationDelay: "0.5s" }} />
        <div className="absolute inset-28 border border-[rgba(20,92,255,0.06)] rounded-full animate-pulse-slow" style={{ animationDelay: "1s" }} />
        
        {/* Crosshair lines */}
        <div className="absolute left-0 right-0 h-[1px] bg-[rgba(20,92,255,0.08)] pointer-events-none" />
        <div className="absolute top-0 bottom-0 w-[1px] bg-[rgba(20,92,255,0.08)] pointer-events-none" />
        
        {/* Radar Rotating Sweep Hand */}
        <div className="absolute inset-0 origin-center animate-radar pointer-events-none">
          <div className="absolute top-0 left-1/2 w-0.5 h-1/2 bg-gradient-to-b from-[#145CFF]/70 via-[#145CFF]/15 to-transparent" />
          <div className="absolute top-0 left-[calc(105%/2)] w-12 h-1/2 bg-[#145CFF]/5 blur-md origin-bottom-left" style={{ transform: "rotate(-15deg)" }} />
        </div>

        {/* Center Mission Control Console */}
        <div className="z-10 flex flex-col items-center justify-center gap-2">
          <Compass className="w-10 h-10 text-[#145CFF] animate-spin" style={{ animationDuration: "10s" }} />
          <div className="bg-[#050B16]/90 border border-[#145CFF]/30 px-3 py-1 rounded-full shadow-glass">
            <span className="text-[10px] uppercase font-black tracking-widest text-[#2F7DFF] animate-pulse">
              RADAR ACTIVE
            </span>
          </div>
        </div>
      </div>

      {/* Search HUD Console Text */}
      <div className="mt-8 space-y-4 max-w-sm w-full z-20">
        <div className="space-y-1">
          <span className="text-[10px] text-slate-500 font-extrabold uppercase tracking-widest block">
            MISSION STATUS
          </span>
          <h2 className="text-lg font-black text-[#F8FAFC] tracking-wider uppercase min-h-[28px] leading-tight">
            {phaseText}
          </h2>
        </div>

        {/* Location Target details card */}
        <div className="bg-[#071426]/70 border border-[#145CFF]/20 rounded-xl p-3.5 space-y-2.5 backdrop-blur-md shadow-glass text-left">
          <div className="flex items-start justify-between">
            <div>
              <span className="text-[7.5px] font-black text-[#64748B] uppercase tracking-wider block leading-none mb-1">
                TARGET TERRITORY
              </span>
              <h4 className="text-[13px] font-black text-[#F8FAFC] uppercase truncate">
                {selectedCounty} County, {stateCode}
              </h4>
            </div>
            <div className="text-right">
              <span className="text-[7.5px] font-black text-[#64748B] uppercase tracking-wider block leading-none mb-1">
                SCAN RADIUS
              </span>
              <span className="text-[11px] font-extrabold text-[#F8FAFC] uppercase">
                {radius} MILES
              </span>
            </div>
          </div>

          {/* Target Layers */}
          <div className="border-t border-[rgba(20,92,255,0.12)] pt-2.5 space-y-1.5">
            <span className="text-[7.5px] font-black text-[#64748B] uppercase tracking-wider block">
              ACQUISITION CHANNELS
            </span>
            <div className="flex flex-wrap gap-1">
              {showHail && (
                <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#145CFF]/15 border border-[#145CFF]/30 text-[#60A5FA] text-[8px] font-extrabold uppercase">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#2F7DFF] shadow-glow-hail" />
                  HAIL
                </span>
              )}
              {showWind && (
                <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#8B5CF6]/15 border border-[#8B5CF6]/30 text-[#C084FC] text-[8px] font-extrabold uppercase">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#8B5CF6] shadow-glow-wind" />
                  WIND
                </span>
              )}
              {showTornado && (
                <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#F43F5E]/15 border border-[#F43F5E]/30 text-[#FB7185] text-[8px] font-extrabold uppercase">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#F43F5E] shadow-glow-tornado" />
                  TORNADO
                </span>
              )}
              {showAlerts && (
                <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#F59E0B]/15 border border-[#F59E0B]/30 text-[#FBBF24] text-[8px] font-extrabold uppercase">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FBBF24] shadow-glow-alerts" />
                  ALERTS
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
