"use client";

import React from "react";
import { X, Map, FileText, CalendarDays, ChevronDown, HelpCircle } from "lucide-react";

interface StormTargetWelcomePanelProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectOption: (option: "map" | "report" | "appointments") => void;
}

export function StormTargetWelcomePanel({
  isOpen,
  onClose,
  onSelectOption,
}: StormTargetWelcomePanelProps) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const optionsRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (isOpen) {
      // Prevent body scroll when welcome modal is active
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const scrollToOptions = () => {
    optionsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="fixed inset-0 z-[2050] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        ref={containerRef}
        className="relative w-full max-w-2xl max-h-[90vh] bg-[#071426]/95 border border-[rgba(20,92,255,0.24)] rounded-2xl shadow-2xl flex flex-col overflow-hidden backdrop-blur-md animate-in zoom-in-95 duration-250 select-none"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Block */}
        <div className="flex-shrink-0 flex items-center justify-between border-b border-[#145CFF]/15 px-6 py-4 bg-[#050B16]/90">
          <div className="flex items-center gap-2 text-[#145CFF]">
            <HelpCircle size={16} className="animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-300">
              Welcome to StormTarget Live
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-slate-900 border border-transparent transition-colors cursor-pointer"
            title="Continue to Map"
          >
            <X size={18} />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6 custom-scrollbar text-[11px] text-[#94A3B8]">
          
          {/* Headline and Intro Copy */}
          <div className="space-y-3.5 text-center max-w-lg mx-auto">
            <h2 className="text-xl md:text-2xl font-black text-[#F8FAFC] uppercase tracking-wide leading-tight">
              Turn Live Storm Activity <br className="hidden sm:inline" />
              Into Roofing Jobs
            </h2>
            <p className="text-xs text-[#94A3B8] leading-relaxed font-medium">
              StormTarget Live helps roofing contractors identify storm-hit areas, generate property lead lists, access homeowner contact data, and request booked roof inspection appointments from one live storm intelligence platform.
            </p>
            <p className="text-[10.5px] text-[#64748B] italic leading-normal">
              Use the live map yourself, order a targeted hail-strike lead report, or have us set appointments for you.
            </p>
            
            {/* Quick CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2 max-w-sm mx-auto">
              <button
                onClick={() => onSelectOption("map")}
                className="flex-1 py-2.5 px-4 rounded-lg bg-[#145CFF] hover:bg-[#2570FF] text-white text-[10.5px] font-black uppercase tracking-wider transition-all active:scale-[0.98] cursor-pointer shadow-md shadow-[#145CFF]/20"
              >
                Explore Live Storm Map
              </button>
              <button
                onClick={scrollToOptions}
                className="flex-1 py-2.5 px-4 rounded-lg border border-[rgba(20,92,255,0.24)] bg-[rgba(20,92,255,0.08)] hover:bg-[rgba(20,92,255,0.16)] text-[#F8FAFC] text-[10.5px] font-black uppercase tracking-wider transition-all active:scale-[0.98] cursor-pointer flex items-center justify-center gap-1"
              >
                <span>View Contractor Options</span>
                <ChevronDown size={12} className="animate-bounce mt-0.5" />
              </button>
            </div>
          </div>

          {/* Three Contractor Options Section */}
          <div ref={optionsRef} className="space-y-4 pt-4 border-t border-[#145CFF]/15">
            <h3 className="text-[10px] font-black uppercase tracking-widest text-center text-slate-400">
              Select Your Contractor Growth Path
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              
              {/* Option 1: Live Map */}
              <div className="p-4 rounded-xl border bg-[#0B1220]/80 border-[#145CFF]/15 hover:border-[#145CFF]/45 transition-all flex flex-col justify-between gap-3 text-left shadow-lg shadow-black/10">
                <div className="space-y-1.5">
                  <div className="flex justify-between items-center">
                    <span className="text-[7.5px] font-extrabold uppercase text-[#145CFF] bg-[#145CFF]/12 border border-[#145CFF]/24 px-1.5 py-0.2 rounded-md">
                      Full Map System
                    </span>
                  </div>
                  <h4 className="text-[12px] font-black text-[#F8FAFC] uppercase tracking-wide flex items-center gap-1.5">
                    <Map size={13} className="text-[#145CFF]" />
                    StormTarget Live
                  </h4>
                  <p className="text-[9.5px] text-slate-400 leading-snug">
                    Use the live storm intelligence map to identify active storm strikes, affected neighborhoods, property addresses, and homeowner contact opportunities in real time.
                  </p>
                  <p className="text-[8.5px] text-slate-500 pt-1 leading-snug">
                    <strong className="text-slate-400">Best for:</strong> Contractors who want to control where they prospect and move fast after hail or wind hits.
                  </p>
                </div>
                <button
                  onClick={() => onSelectOption("map")}
                  className="w-full text-center py-2 px-3 rounded-md bg-[#145CFF] hover:bg-[#2570FF] text-white text-[9.5px] font-extrabold uppercase tracking-wider transition-all cursor-pointer shadow shadow-[#145CFF]/10 mt-1"
                >
                  Use Live Map
                </button>
              </div>

              {/* Option 2: Hail Strike Report */}
              <div className="p-4 rounded-xl border bg-[#0B1220]/80 border-[#145CFF]/15 hover:border-[#145CFF]/45 transition-all flex flex-col justify-between gap-3 text-left shadow-lg shadow-black/10">
                <div className="space-y-1.5">
                  <div className="flex justify-between items-center">
                    <span className="text-[7.5px] font-extrabold uppercase text-[#145CFF] bg-[#145CFF]/12 border border-[#145CFF]/24 px-1.5 py-0.2 rounded-md">
                      Lead Report
                    </span>
                  </div>
                  <h4 className="text-[12px] font-black text-[#F8FAFC] uppercase tracking-wide flex items-center gap-1.5">
                    <FileText size={13} className="text-[#145CFF]" />
                    Hail Strike Report
                  </h4>
                  <p className="text-[9.5px] text-slate-400 leading-snug">
                    Request a targeted lead report with available homeowner names, property addresses, and contact data in specific storm-hit neighborhoods or ZIP codes.
                  </p>
                  <p className="text-[8.5px] text-slate-500 pt-1 leading-snug">
                    <strong className="text-slate-400">Best for:</strong> Contractors who want a ready-to-use lead list without working inside the live map system.
                  </p>
                </div>
                <button
                  onClick={() => onSelectOption("report")}
                  className="w-full text-center py-2 px-3 rounded-md bg-[#145CFF] hover:bg-[#2570FF] text-white text-[9.5px] font-extrabold uppercase tracking-wider transition-all cursor-pointer shadow shadow-[#145CFF]/10 mt-1"
                >
                  Request Hail Strike Report
                </button>
              </div>

              {/* Option 3: Homeowner Appointments */}
              <div className="p-4 rounded-xl border bg-gradient-to-br from-[#0B1220]/80 to-[#0E8F6E]/5 border-[#0E8F6E]/20 hover:border-[#0E8F6E]/40 transition-all flex flex-col justify-between gap-3 text-left shadow-lg shadow-black/10">
                <div className="space-y-1.5">
                  <div className="flex justify-between items-center">
                    <span className="text-[7.5px] font-extrabold uppercase text-[#0E8F6E] bg-[#0E8F6E]/12 border border-[#0E8F6E]/24 px-1.5 py-0.2 rounded-md">
                      Done For You
                    </span>
                  </div>
                  <h4 className="text-[12px] font-black text-[#F8FAFC] uppercase tracking-wide flex items-center gap-1.5">
                    <CalendarDays size={13} className="text-[#0E8F6E]" />
                    Homeowner Appointments
                  </h4>
                  <p className="text-[9.5px] text-slate-400 leading-snug">
                    We use storm activity data to identify affected homeowners and help set up roof inspection appointments for your team.
                  </p>
                  <p className="text-[8.5px] text-slate-500 pt-1 leading-snug">
                    <strong className="text-slate-400">Best for:</strong> Contractors who want booked opportunities instead of raw lead lists.
                  </p>
                </div>
                <button
                  onClick={() => onSelectOption("appointments")}
                  className="w-full text-center py-2 px-3 rounded-md bg-[#0E8F6E] hover:bg-[#00A86B] text-white text-[9.5px] font-extrabold uppercase tracking-wider transition-all cursor-pointer shadow shadow-[#0E8F6E]/10 mt-1 border-none"
                >
                  Request Appointments
                </button>
              </div>

            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex-shrink-0 border-t border-[#145CFF]/15 px-6 py-4 bg-slate-950/40 flex justify-end gap-3 items-center">
          <button
            onClick={onClose}
            className="text-[9.5px] font-black text-[#94A3B8] hover:text-[#F8FAFC] uppercase tracking-widest cursor-pointer bg-transparent border-none"
          >
            Continue to Map
          </button>
        </div>
      </div>
    </div>
  );
}
export default StormTargetWelcomePanel;
