"use client";

import React from "react";
import { ChevronLeft, ChevronRight, X, RotateCcw } from "lucide-react";
import { StormFilterState } from "@/lib/weather/types";


interface GuidedDemoOverlayProps {
  step: number;
  setStep: (step: number) => void;
  filters: StormFilterState;
  scanStatus: "idle" | "scanning" | "complete";
  sampleModalOpen: boolean;
  onRestart: () => void;
  onUpgrade: () => void;
}

export function GuidedDemoOverlay({
  step,
  setStep,
  filters,
  scanStatus,
  sampleModalOpen,
  onRestart,
  onUpgrade,
}: GuidedDemoOverlayProps) {
  const [rect, setRect] = React.useState<DOMRect | null>(null);

  // Map step to selector
  const getSelectorForStep = (s: number) => {
    switch (s) {
      case 2:
        return '[data-tour="territory"]';
      case 3:
        return '[data-tour="dates"]';
      case 4:
        return '[data-tour="signals"]';
      case 5:
        return '[data-tour="scan-button"]';
      case 6:
        return '[data-tour="scan-overlay"]';
      case 7:
        return '[data-tour="result-card"]';
      case 8:
        return '[data-tour="sample-button"]';
      case 9:
        return '[data-tour="sample-modal"]';
      default:
        return null;
    }
  };

  // Find element and set bounding rect
  const updateRect = React.useCallback(() => {
    const selector = getSelectorForStep(step);
    if (!selector) {
      setRect(null);
      return;
    }
    const el = document.querySelector(selector);
    if (el) {
      setRect(el.getBoundingClientRect());
    } else {
      setRect(null);
    }
  }, [step]);

  React.useEffect(() => {
    updateRect();
    
    // Add event listeners for responsiveness
    window.addEventListener("resize", updateRect);
    window.addEventListener("scroll", updateRect, true);
    
    // Poll occasionally to catch lazy mounts
    const interval = setInterval(updateRect, 500);

    return () => {
      window.removeEventListener("resize", updateRect);
      window.removeEventListener("scroll", updateRect, true);
      clearInterval(interval);
    };
  }, [updateRect]);

  // Tour content definitions
  const tourContent = [
    {
      title: "Welcome to StormTarget Live",
      text: "This interactive demo shows how roofing and restoration contractors find high-probability storm-damage property leads in seconds.",
    },
    {
      title: "Select Your Target Market",
      text: "Step 1: Choose where you want leads. Pick a State and County, then adjust your Search Radius.",
    },
    {
      title: "Select Storm Dates",
      text: "Step 2: Define your date range. Dates are preselected during demo mode, but users can choose any present date or historical data.",
    },
    {
      title: "Choose Storm Type",
      text: "Select one or more storms types",
    },
    {
      title: "Find Storm Leads",
      text: "Step 4: Everything is set. Click 'Find Storm Leads' to launch our proprietary GIS lead discovery sweep.",
    },
    {
      title: "Sweeping Radar & Properties",
      text: "Our engine is currently geocoding parcel boundaries, filtering property ages, and matching historical weather hazards.",
    },
    {
      title: "Target Lead Opportunities Found",
      text: "Success! The territory scan is complete. You can view the estimated leads, storm report statistics, and target area info.",
    },
    {
      title: "Preview Homeowner Records",
      text: "Click 'View Sample Lead File' to inspect the detailed spreadsheet of homeowners and property data.",
    },
    {
      title: "Sample Lead File / Pricing CTA",
      text: "This Excel-style preview displays names, property addresses, roof age, phone numbers, and storm details. Select 'Check Pricing' to review pricing options.",
    },
  ];

  const currentContent = tourContent[step - 1] || { title: "Walkthrough", text: "" };

  // Validation checks for tour progress
  const isTerritoryValid = !!filters?.state && !!filters?.selectedCounty;
  
  const isDatesValid = React.useMemo(() => {
    if (!filters?.startDate || !filters?.endDate) return false;
    return filters.endDate >= filters.startDate;
  }, [filters?.startDate, filters?.endDate]);

  const isSignalsValid = !!(filters?.showHail || filters?.showWind || filters?.showTornado || filters?.showAlerts);

  const isNextDisabled = () => {
    if (step === 2 && !isTerritoryValid) return true;
    if (step === 3 && !isDatesValid) return true;
    if (step === 4 && !isSignalsValid) return true;
    if (step === 5 || step === 6 || step === 8) return true; // user must click Scan / wait for scan / click View Sample
    return false;
  };

  const handleNext = () => {
    if (isNextDisabled()) return;
    if (step === 9) {
      setStep(10);
    } else {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step === 1 || step === 6) return;
    setStep(step - 1);
  };

  const handleSkip = () => {
    setStep(0); // Close walkthrough
  };

  // Tooltip positioning
  const tooltipStyle = React.useMemo(() => {
    if (step === 9) {
      if (typeof window !== "undefined") {
        const width = 340;
        const height = 240; // estimated max height of step 9 tooltip
        const left = Math.max(16, Math.min(window.innerWidth - width - 16, window.innerWidth / 2 - width / 2));
        const top = Math.max(16, Math.min(window.innerHeight - height - 16, window.innerHeight - height - 40));
        return {
          position: "fixed" as const,
          top: `${top}px`,
          left: `${left}px`,
          zIndex: 9999,
          transition: "all 0.3s ease",
        };
      }
    }

    if (!rect) {
      return {
        position: "fixed" as const,
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        zIndex: 9999,
      };
    }

    let left = rect.right + 16;
    let top = rect.top;

    if (typeof window !== "undefined") {
      if (left + 360 > window.innerWidth) {
        if (rect.left - 360 > 0) {
          left = rect.left - 360 - 16;
        } else {
          left = Math.max(16, window.innerWidth / 2 - 175);
          top = rect.bottom + 16;
        }
      }
      if (top + 260 > window.innerHeight) {
        top = Math.max(16, window.innerHeight - 260 - 16);
      }

      // Clamp to viewport boundaries with at least 16px padding
      left = Math.max(16, Math.min(window.innerWidth - 340 - 16, left));
      top = Math.max(16, Math.min(window.innerHeight - 260 - 16, top));
    }

    return {
      position: "fixed" as const,
      top: `${top}px`,
      left: `${left}px`,
      zIndex: 9999,
      transition: "all 0.3s ease",
    };
  }, [rect, step]);

  return (
    <>
      {/* Dimmed backdrop highlight card */}
      {rect && (
        <div
          className="fixed rounded-xl border-2 border-[#145CFF] shadow-[0_0_0_9999px_rgba(0,0,0,0.65),0_0_15px_rgba(20,92,255,0.4)] z-[9990] transition-all duration-300 pointer-events-none"
          style={{
            top: rect.top - 4,
            left: rect.left - 4,
            width: rect.width + 8,
            height: rect.height + 8,
          }}
        />
      )}

      {/* Backdrop cover if no element highlighted */}
      {!rect && (
        <div className="fixed inset-0 bg-black/65 z-[9990] backdrop-blur-xs pointer-events-none" />
      )}

      {/* Walkthrough Tooltip Dialog Box */}
      <div
        className="w-[340px] bg-[#071426]/95 border border-[rgba(20,92,255,0.3)] rounded-2xl p-4 shadow-2xl flex flex-col pointer-events-auto backdrop-blur-md select-none text-left"
        style={tooltipStyle}
      >
        <div className="flex items-center justify-between border-b border-[rgba(20,92,255,0.15)] pb-2 mb-3 shrink-0">
          <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest leading-none">
            Demo Walkthrough
          </span>
          <span className="text-[10px] font-black text-[#60A5FA] bg-[#145CFF]/20 px-2 py-0.5 rounded-full leading-none">
            Step {step} of 9
          </span>
        </div>

        <div className="flex-1 space-y-2 mb-4">
          <h4 className="text-xs font-black text-[#F8FAFC] uppercase tracking-wide">
            {currentContent.title}
          </h4>
          <p className="text-[10px] text-slate-350 font-semibold leading-relaxed">
            {currentContent.text}
          </p>

          {/* Conditional helper hints */}
          {step === 2 && (
            <p className="text-[9px] text-[#60A5FA] font-bold mt-2 animate-pulse">
              {!isTerritoryValid 
                ? "* Select a State & County in the sidebar to continue." 
                : "* Use the highlighted 'Continue' button in the sidebar to proceed."}
            </p>
          )}
          {step === 3 && (
            <p className="text-[9px] text-amber-400 font-bold mt-2 animate-pulse">
              {!isDatesValid 
                ? "* Enter a From & To date to continue." 
                : "* Use the highlighted 'Continue' button in the sidebar to proceed."}
            </p>
          )}
          {step === 4 && (
            <p className="text-[9px] text-amber-400 font-bold mt-2 animate-pulse">
              {!isSignalsValid 
                ? "* Select at least one storm type in the sidebar." 
                : "* Use the highlighted 'Continue' button in the sidebar to proceed."}
            </p>
          )}
          {step === 5 && (
            <p className="text-[9px] text-[#00E676] font-bold mt-2 animate-pulse">
              * Use the highlighted 'Find Storm Leads' button in the sidebar to proceed.
            </p>
          )}
          {step === 8 && (
            <p className="text-[9px] text-[#60A5FA] font-bold mt-2 animate-pulse">
              * Use the highlighted 'View Sample Lead File' button on the results card to proceed.
            </p>
          )}
        </div>

        {/* Action button row */}
        <div className="flex items-center justify-between shrink-0 pt-2 border-t border-[rgba(20,92,255,0.1)] text-[10px]">
          {step > 1 && step !== 6 ? (
            <button
              onClick={handleBack}
              className="py-1.5 px-2.5 rounded-lg bg-[#050B16] border border-slate-800 text-slate-350 hover:text-[#F8FAFC] font-bold uppercase flex items-center gap-1 cursor-pointer transition-colors"
            >
              <ChevronLeft size={12} />
              Back
            </button>
          ) : (
            <div />
          )}

          <div className="flex gap-2">
            {step < 9 && step !== 2 && step !== 3 && step !== 4 && step !== 5 && step !== 6 && step !== 8 && (
              <button
                onClick={handleNext}
                disabled={isNextDisabled()}
                className={`py-1.5 px-3 rounded-lg font-black uppercase flex items-center gap-1 transition-all ${
                  isNextDisabled()
                    ? "bg-[#091528] border border-slate-800 text-slate-500 cursor-not-allowed"
                    : "bg-[#145CFF] hover:bg-[#2570FF] text-[#F8FAFC] cursor-pointer shadow-md hover:scale-[1.02]"
                }`}
              >
                Continue
                <ChevronRight size={12} />
              </button>
            )}
            {step === 9 && (
              <button
                onClick={onUpgrade}
                className="py-1.5 px-3.5 rounded-lg bg-gradient-to-r from-[#6366F1] to-[#A855F7] hover:from-[#5046E5] hover:to-[#9333EA] text-white font-black uppercase flex items-center gap-1 cursor-pointer transition-all hover:scale-[1.02] shadow-lg shadow-indigo-500/20 border border-[#A855F7]/30 active:scale-[0.98]"
              >
                <span>Check Pricing</span>
                <ChevronRight size={12} />
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
