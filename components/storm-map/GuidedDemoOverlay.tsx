"use client";

import React from "react";
import { ChevronLeft, ChevronRight, X, RotateCcw } from "lucide-react";
import { StormFilterState } from "@/lib/weather/types";

// Helper to check if a date is strictly over 1 year ago
const isDateMoreThanOneYearOld = (dateStr?: string) => {
  if (!dateStr) return false;
  const date = new Date(dateStr + "T00:00:00");
  const oneYearAgo = new Date();
  oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
  // strict "over 1 year ago" means date <= oneYearAgo - 1 day
  oneYearAgo.setDate(oneYearAgo.getDate() - 1);
  oneYearAgo.setHours(23, 59, 59, 999);
  return date <= oneYearAgo;
};

interface GuidedDemoOverlayProps {
  step: number;
  setStep: (step: number) => void;
  filters: StormFilterState;
  scanStatus: "idle" | "scanning" | "complete";
  sampleModalOpen: boolean;
  onRestart: () => void;
}

export function GuidedDemoOverlay({
  step,
  setStep,
  filters,
  scanStatus,
  sampleModalOpen,
  onRestart,
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
      text: "Step 2: Define your date range. Demo mode uses historical storm reports. Please select From and To dates more than 1 year old.",
    },
    {
      title: "Choose Storm Signals",
      text: "Step 3: Toggle weather hazard layers: Hail impact reports, high Wind indicators, Tornado rotation paths, or active NWS Alerts.",
    },
    {
      title: "Launch the GIS Scan",
      text: "Step 4: Everything is set. Click 'Scan Territory' to launch our proprietary GIS lead discovery sweep.",
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
      title: "Inspect Sample Lead Sheet",
      text: "This Excel-style preview displays names, property addresses, roof age, phone numbers, and storm details. All fields are marked as SAMPLE DATA.",
    },
    {
      title: "Walkthrough Complete!",
      text: "You are ready to find active storm damage leads. Click 'Restart Walkthrough' to run the demo again, or close this tour to explore.",
    },
  ];

  const currentContent = tourContent[step - 1];

  // Validation checks for tour progress
  const isTerritoryValid = !!filters.state && !!filters.selectedCounty;
  
  const isDatesValid = React.useMemo(() => {
    if (!filters.startDate || !filters.endDate) return false;
    if (filters.endDate < filters.startDate) return false;
    return isDateMoreThanOneYearOld(filters.startDate) && isDateMoreThanOneYearOld(filters.endDate);
  }, [filters.startDate, filters.endDate]);

  const isSignalsValid = filters.showHail || filters.showWind || filters.showTornado || filters.showAlerts;

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
    }

    return {
      position: "fixed" as const,
      top: `${top}px`,
      left: `${left}px`,
      zIndex: 9999,
      transition: "all 0.3s ease",
    };
  }, [rect]);

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
          <span className="text-[10px] font-black text-[#145CFF] bg-[#145CFF]/10 px-2 py-0.5 rounded-full leading-none">
            Step {step} of 10
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
          {step === 2 && !isTerritoryValid && (
            <p className="text-[9px] text-[#2F7DFF] font-bold mt-2 animate-pulse">
              * Select a State & County in the sidebar to continue.
            </p>
          )}
          {step === 3 && !isDatesValid && (
            <p className="text-[9px] text-amber-500 font-bold mt-2 animate-pulse">
              * Enter a From & To date more than 1 year old to continue.
            </p>
          )}
          {step === 4 && !isSignalsValid && (
            <p className="text-[9px] text-amber-500 font-bold mt-2 animate-pulse">
              * Select at least one storm hazard in the sidebar.
            </p>
          )}
          {step === 5 && (
            <p className="text-[9px] text-[#00E676] font-bold mt-2 animate-pulse">
              * Click the 'SCAN TERRITORY' button to proceed.
            </p>
          )}
          {step === 8 && (
            <p className="text-[9px] text-[#145CFF] font-bold mt-2 animate-pulse">
              * Click the 'View Sample Lead File' button on the results card.
            </p>
          )}
        </div>

        {/* Action button row */}
        <div className="flex items-center justify-between shrink-0 pt-2 border-t border-[rgba(20,92,255,0.1)] text-[10px]">
          {step === 10 ? (
            <button
              onClick={onRestart}
              className="py-1.5 px-3 rounded-lg bg-[#145CFF] hover:bg-[#2570FF] text-white font-black uppercase flex items-center gap-1 cursor-pointer transition-colors shadow-md"
            >
              <RotateCcw size={10} />
              Restart Demo
            </button>
          ) : (
            <button
              onClick={handleSkip}
              className="text-slate-500 hover:text-slate-300 font-bold uppercase transition-colors tracking-wider"
            >
              Skip Tour
            </button>
          )}

          <div className="flex gap-2">
            {step > 1 && step !== 6 && step !== 10 && (
              <button
                onClick={handleBack}
                className="py-1.5 px-2.5 rounded-lg bg-[#050B16] border border-slate-800 text-slate-400 hover:text-[#F8FAFC] font-bold uppercase flex items-center gap-1 cursor-pointer transition-colors"
              >
                <ChevronLeft size={12} />
                Back
              </button>
            )}
            {step < 10 && step !== 5 && step !== 6 && step !== 8 && (
              <button
                onClick={handleNext}
                disabled={isNextDisabled()}
                className={`py-1.5 px-3 rounded-lg font-black uppercase flex items-center gap-1 transition-all ${
                  isNextDisabled()
                    ? "bg-[#091528] border border-slate-800 text-slate-600 cursor-not-allowed"
                    : "bg-[#145CFF] hover:bg-[#2570FF] text-[#F8FAFC] cursor-pointer shadow-md hover:scale-[1.02]"
                }`}
              >
                Next
                <ChevronRight size={12} />
              </button>
            )}
            {step === 10 && (
              <button
                onClick={handleSkip}
                className="py-1.5 px-3 rounded-lg bg-[#0E8F6E] hover:bg-[#00E676]/20 border border-[#00E676]/30 text-white font-black uppercase cursor-pointer transition-colors"
              >
                Explore Map
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
