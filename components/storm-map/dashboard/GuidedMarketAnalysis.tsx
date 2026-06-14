"use client";

import React from "react";
import { 
  MapPin, 
  Search, 
  ChevronDown, 
  Check, 
  X, 
  Loader2, 
  Zap, 
  Sliders, 
  Navigation 
} from "lucide-react";
import { getStatesList, getCountiesForState, USCounty } from "@/lib/geo/us-counties";

interface GuidedMarketAnalysisProps {
  onAnalyze: (data: {
    stateCode: string;
    counties: USCounty[];
    radiusMiles: number;
  }) => void;
  isAnalyzing: boolean;
  setIsAnalyzing: (analyzing: boolean) => void;
}

export function GuidedMarketAnalysis({
  onAnalyze,
  isAnalyzing,
  setIsAnalyzing
}: GuidedMarketAnalysisProps) {
  const [selectedState, setSelectedState] = React.useState("");
  const [selectedCounties, setSelectedCounties] = React.useState<USCounty[]>([]);
  const [radius, setRadius] = React.useState(10);
  const [countySearch, setCountySearch] = React.useState("");
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);
  const [loadingStep, setLoadingStep] = React.useState(0);

  const states = React.useMemo(() => getStatesList(), []);
  
  const countiesInState = React.useMemo(() => {
    if (!selectedState) return [];
    return getCountiesForState(selectedState);
  }, [selectedState]);

  const filteredCounties = React.useMemo(() => {
    const query = countySearch.toLowerCase().trim();
    if (!query) return countiesInState;
    return countiesInState.filter(c => 
      c.countyName.toLowerCase().includes(query) || 
      c.countyFullName.toLowerCase().includes(query)
    );
  }, [countiesInState, countySearch]);

  // Reset selected counties if state changes
  React.useEffect(() => {
    setSelectedCounties([]);
    setCountySearch("");
  }, [selectedState]);

  // Loading animation runner
  React.useEffect(() => {
    if (!isAnalyzing) {
      setLoadingStep(0);
      return;
    }

    const steps = [
      "Connecting to NOAA weather feeds...",
      "Analyzing NEXRAD Doppler radar metrics...",
      "Querying property registry listings...",
      "Deduplicating local lead addresses...",
      "Compiling opportunity report..."
    ];

    const interval = setInterval(() => {
      setLoadingStep((prev) => {
        if (prev >= steps.length - 1) {
          clearInterval(interval);
          // Complete analysis
          onAnalyze({
            stateCode: selectedState,
            counties: selectedCounties,
            radiusMiles: radius
          });
          return prev;
        }
        return prev + 1;
      });
    }, 800);

    return () => clearInterval(interval);
  }, [isAnalyzing, selectedState, selectedCounties, radius, onAnalyze]);

  const toggleCounty = (county: USCounty) => {
    const exists = selectedCounties.some(c => c.countyName === county.countyName);
    if (exists) {
      setSelectedCounties(selectedCounties.filter(c => c.countyName !== county.countyName));
    } else {
      setSelectedCounties([...selectedCounties, county]);
    }
  };

  const handleClearAllCounties = () => {
    setSelectedCounties([]);
  };

  const handleStartAnalysis = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedState || selectedCounties.length === 0) return;
    setIsAnalyzing(true);
  };

  const stepsText = [
    "Connecting to NOAA weather feeds...",
    "Analyzing NEXRAD Doppler radar metrics...",
    "Querying property registry listings...",
    "Deduplicating local lead addresses...",
    "Compiling opportunity report..."
  ];

  if (isAnalyzing) {
    return (
      <div className="w-full max-w-xl mx-auto bg-white border border-[#E5E7EB] rounded-2xl p-8 text-center space-y-6 shadow-xl animate-in fade-in duration-300">
        <div className="flex flex-col items-center gap-3">
          <div className="w-16 h-16 rounded-full bg-[#145CFF]/10 flex items-center justify-center text-[#145CFF] relative">
            <Loader2 size={32} className="animate-spin text-[#145CFF]" />
            <Zap size={18} className="absolute text-[#145CFF]" />
          </div>
          <h3 className="font-extrabold text-[#0F172A] text-lg mt-2 uppercase tracking-wide">
            Analyzing Storm Opportunity
          </h3>
          <p className="text-xs text-[#475569] max-w-sm">
            Please wait while we retrieve NOAA weather data and cross-reference county boundary databases.
          </p>
        </div>

        {/* B2B Checklist Progress */}
        <div className="max-w-md mx-auto text-left bg-[#F8FAFC] border border-[#E5E7EB] rounded-xl p-5 space-y-3.5">
          {stepsText.map((step, idx) => {
            const isCompleted = idx < loadingStep;
            const isActive = idx === loadingStep;
            return (
              <div 
                key={idx} 
                className={`flex items-center gap-3 text-xs transition-all duration-200 ${
                  isCompleted ? "text-[#0E8F6E] font-bold" : 
                  isActive ? "text-[#145CFF] font-black" : "text-slate-400"
                }`}
              >
                <div className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ${
                  isCompleted ? "bg-[#0E8F6E]/10 border-[#0E8F6E]" :
                  isActive ? "border-[#145CFF] bg-[#145CFF]/5" : "border-slate-300"
                }`}>
                  {isCompleted ? (
                    <Check size={11} className="stroke-[3]" />
                  ) : isActive ? (
                    <span className="w-1.5 h-1.5 rounded-full bg-[#145CFF] animate-pulse"></span>
                  ) : (
                    <span className="text-[9px] font-bold">{idx + 1}</span>
                  )}
                </div>
                <span>{step}</span>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-xl mx-auto bg-white border border-[#E5E7EB] rounded-2xl p-8 shadow-xl space-y-6 animate-in fade-in duration-300">
      <div className="space-y-1.5 border-b border-[#E5E7EB] pb-4">
        <div className="flex items-center gap-2 text-[#145CFF]">
          <Sliders size={18} />
          <h3 className="font-extrabold text-[#0F172A] text-sm uppercase tracking-wider">
            Guided Market Selector
          </h3>
        </div>
        <p className="text-xs text-[#64748B] leading-relaxed">
          Configure a storm intelligence boundary search across any U.S. state, select target counties, and define your radius to build an opportunity portfolio.
        </p>
      </div>

      <form onSubmit={handleStartAnalysis} className="space-y-5">
        {/* Step 1: Select State */}
        <div className="space-y-1.5">
          <label className="text-[10px] font-black text-[#475569] uppercase tracking-wider block">
            1. Select U.S. State
          </label>
          <div className="relative">
            <select
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              className="w-full bg-[#F8FAFC] border border-[#E5E7EB] rounded-lg px-3 py-2.5 text-xs text-[#0F172A] focus:outline-none focus:border-[#145CFF] appearance-none font-bold"
            >
              <option value="">Select a state</option>
              {states.map((st) => (
                <option key={st.code} value={st.code}>
                  {st.name} ({st.code})
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-3 text-[#64748B] pointer-events-none" size={14} />
          </div>
        </div>

        {/* Step 2: Select Counties */}
        <div className="space-y-1.5">
          <label className="text-[10px] font-black text-[#475569] uppercase tracking-wider block">
            2. Search or Select Counties
          </label>
          <div className="relative">
            <button
              type="button"
              disabled={!selectedState}
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="w-full bg-[#F8FAFC] border border-[#E5E7EB] rounded-lg px-3 py-2.5 text-xs text-left text-[#0F172A] font-bold focus:outline-none focus:border-[#145CFF] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-between"
            >
              <span className="truncate">
                {selectedCounties.length === 0 
                  ? "Search or select counties" 
                  : `${selectedCounties.length} county selected`}
              </span>
              <ChevronDown size={14} className="text-[#64748B]" />
            </button>

            {isDropdownOpen && selectedState && (
              <div className="absolute top-11 left-0 right-0 bg-white border border-[#E5E7EB] rounded-lg shadow-xl z-50 p-3 space-y-2 max-h-60 flex flex-col">
                {/* Search Input */}
                <div className="relative shrink-0">
                  <input
                    type="text"
                    value={countySearch}
                    onChange={(e) => setCountySearch(e.target.value)}
                    placeholder="Filter counties..."
                    className="w-full bg-[#F8FAFC] border border-[#E5E7EB] rounded-md pl-8 pr-3 py-1.5 text-xs focus:outline-none focus:border-[#145CFF]"
                  />
                  <Search className="absolute left-2.5 top-2.5 text-[#64748B]" size={12} />
                </div>

                {/* List */}
                <div className="flex-1 overflow-y-auto space-y-1 pr-1 custom-scrollbar">
                  {filteredCounties.length === 0 ? (
                    <div className="text-center text-[10px] text-slate-400 py-3 italic">
                      No counties match query
                    </div>
                  ) : (
                    filteredCounties.map((c) => {
                      const isChecked = selectedCounties.some(sc => sc.countyName === c.countyName);
                      return (
                        <button
                          key={c.countyName}
                          type="button"
                          onClick={() => toggleCounty(c)}
                          className="w-full flex items-center justify-between px-2.5 py-1.5 text-xs text-[#0F172A] rounded hover:bg-[#F8FAFC] font-semibold text-left transition-all"
                        >
                          <span>{c.countyFullName}</span>
                          <div className={`w-4 h-4 rounded border flex items-center justify-center ${
                            isChecked ? "bg-[#145CFF] border-[#145CFF] text-white" : "border-slate-350 bg-white"
                          }`}>
                            {isChecked && <Check size={10} className="stroke-[3]" />}
                          </div>
                        </button>
                      );
                    })
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Selected County Chips */}
          {selectedCounties.length > 0 && (
            <div className="space-y-1.5 pt-1.5">
              <div className="flex items-center justify-between">
                <span className="text-[9px] font-bold text-slate-500 uppercase">Selected Counties ({selectedCounties.length})</span>
                <button
                  type="button"
                  onClick={handleClearAllCounties}
                  className="text-[9px] font-black text-red-500 hover:text-red-650 uppercase"
                >
                  Clear all
                </button>
              </div>
              <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto pr-1 py-1 custom-scrollbar">
                {selectedCounties.map((c) => (
                  <div 
                    key={c.countyName}
                    className="flex items-center gap-1 bg-slate-100 hover:bg-slate-200 border border-slate-200 text-[#0F172A] px-2 py-0.5 rounded-md text-[10px] font-bold"
                  >
                    <span>{c.countyName}</span>
                    <button 
                      type="button"
                      onClick={() => toggleCounty(c)}
                      className="text-slate-400 hover:text-red-500 font-bold"
                    >
                      <X size={10} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Step 3: Select Radius */}
        <div className="space-y-1.5">
          <label className="text-[10px] font-black text-[#475569] uppercase tracking-wider block">
            3. Target Radius Around Selected County
          </label>
          <div className="grid grid-cols-5 gap-2">
            {[5, 10, 15, 25, 50].map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => setRadius(r)}
                className={`py-2 rounded-lg text-xs font-black transition-all ${
                  radius === r 
                    ? "bg-[#145CFF] border-[#145CFF] text-white shadow-md shadow-[#145CFF]/15" 
                    : "bg-[#F8FAFC] border border-[#E5E7EB] text-[#475569] hover:bg-slate-50"
                }`}
              >
                {r} mi
              </button>
            ))}
          </div>
        </div>

        {/* CTA Analyze Button */}
        <button
          type="submit"
          disabled={!selectedState || selectedCounties.length === 0}
          className="w-full flex items-center justify-center gap-2 py-3 px-5 rounded-lg bg-[#145CFF] hover:bg-[#2570FF] disabled:bg-slate-100 disabled:text-slate-400 disabled:cursor-not-allowed border-none text-[#F8FAFC] font-black uppercase text-xs tracking-wider transition-all shadow-md shadow-[#145CFF]/15 cursor-pointer mt-6"
        >
          <Navigation size={14} className="rotate-45 shrink-0" />
          <span>Analyze Storm Opportunity</span>
        </button>
      </form>
    </div>
  );
}
export default GuidedMarketAnalysis;
