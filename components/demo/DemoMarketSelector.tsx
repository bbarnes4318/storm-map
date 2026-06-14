"use client";

import React from "react";
import { ChevronRight, Search, Navigation, AlertCircle } from "lucide-react";

interface DemoMarketSelectorProps {
  onSearchSubmit: (state: string, county: string, radius: number) => void;
}

const DEMO_STATES = [
  { code: "TN", name: "Tennessee" },
  { code: "TX", name: "Texas" },
  { code: "FL", name: "Florida" },
  { code: "LA", name: "Louisiana" },
  { code: "AK", name: "Alaska" },
  { code: "VA", name: "Virginia" },
  { code: "DC", name: "District of Columbia" },
];

const DEMO_COUNTIES: Record<string, Array<{ name: string; type: string }>> = {
  TN: [{ name: "Knox County", type: "county" }],
  TX: [
    { name: "Dallas County", type: "county" },
    { name: "Collin County", type: "county" },
    { name: "Tarrant County", type: "county" },
    { name: "Harris County", type: "county" },
  ],
  FL: [{ name: "Miami-Dade County", type: "county" }],
  LA: [{ name: "East Baton Rouge Parish", type: "parish" }],
  AK: [{ name: "Anchorage Municipality", type: "borough" }],
  VA: [{ name: "Alexandria city", type: "independent city" }],
  DC: [{ name: "District of Columbia", type: "district" }],
};

export default function DemoMarketSelector({ onSearchSubmit }: DemoMarketSelectorProps) {
  const [selectedState, setSelectedState] = React.useState("TN");
  const [selectedCounty, setSelectedCounty] = React.useState<string>("Knox County");
  const [selectedRadius, setSelectedRadius] = React.useState<number>(15);
  const [countySearch, setCountySearch] = React.useState("");
  const [dropdownOpen, setDropdownOpen] = React.useState(false);

  // When state changes, auto-select first county in that state
  React.useEffect(() => {
    const counties = DEMO_COUNTIES[selectedState] || [];
    if (counties.length > 0) {
      setSelectedCounty(counties[0].name);
    } else {
      setSelectedCounty("");
    }
    setCountySearch("");
    setDropdownOpen(false);
  }, [selectedState]);

  const activeCounties = DEMO_COUNTIES[selectedState] || [];
  const filteredCounties = activeCounties.filter((c) =>
    c.name.toLowerCase().includes(countySearch.toLowerCase())
  );

  return (
    <div className="bg-[#0B1930]/90 border border-[#145CFF]/20 rounded-2xl p-5 md:p-6 space-y-5 shadow-2xl select-none select-none">
      <div className="space-y-1.5">
        <h3 className="font-black text-[#F8FAFC] text-[12px] uppercase tracking-wider flex items-center gap-2">
          <span className="w-1.5 h-3 rounded bg-[#145CFF]" />
          Start With Your Storm Market
        </h3>
        <p className="text-[10px] text-slate-400 leading-normal font-semibold">
          Select a state, county, and search radius. StormTarget Live will scan recent hail, wind, tornado, and severe weather activity around that market so you can identify the neighborhoods most likely to need roof inspections.
        </p>
      </div>

      <div className="space-y-4 pt-1">
        {/* 1. Choose State */}
        <div className="space-y-1">
          <label className="text-[9px] font-extrabold text-slate-500 uppercase tracking-widest block">
            1. Choose State
          </label>
          <div className="relative">
            <select
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              className="w-full bg-[#050B16] border border-[#145CFF]/25 rounded-lg px-3 py-2 text-xs text-[#F8FAFC] font-bold focus:outline-none focus:border-[#145CFF] appearance-none cursor-pointer transition-colors"
            >
              {DEMO_STATES.map((st) => (
                <option key={st.code} value={st.code}>
                  {st.name} ({st.code})
                </option>
              ))}
            </select>
            <ChevronRight className="absolute right-3 top-3.5 text-slate-500 rotate-90 pointer-events-none" size={12} />
          </div>
        </div>

        {/* 2. Choose County */}
        <div className="space-y-1">
          <label className="text-[9px] font-extrabold text-slate-500 uppercase tracking-widest block">
            2. Choose County
          </label>
          <div className="relative">
            <button
              type="button"
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="w-full bg-[#050B16] border border-[#145CFF]/25 rounded-lg px-3 py-2 text-xs text-left text-[#F8FAFC] font-bold focus:outline-none focus:border-[#145CFF] flex items-center justify-between transition-colors"
            >
              <span className="truncate">{selectedCounty || "Choose County"}</span>
              <ChevronRight className="text-slate-500 rotate-90 shrink-0" size={12} />
            </button>

            {dropdownOpen && (
              <div className="absolute top-10 left-0 right-0 bg-[#071426] border border-[#145CFF]/35 rounded-lg shadow-2xl z-[1005] p-2 space-y-1.5 max-h-48 flex flex-col animate-in fade-in zoom-in-95 duration-150">
                <div className="relative shrink-0">
                  <input
                    type="text"
                    value={countySearch}
                    onChange={(e) => setCountySearch(e.target.value)}
                    placeholder="Filter counties..."
                    className="w-full bg-[#050B16] border border-[#145CFF]/20 rounded px-2.5 py-1.5 text-[10px] text-[#F8FAFC] placeholder:text-slate-500 focus:outline-none focus:border-[#145CFF]"
                  />
                  <Search className="absolute right-2.5 top-2.5 text-slate-500" size={10} />
                </div>

                <div className="flex-1 overflow-y-auto space-y-0.5 pr-0.5 custom-scrollbar">
                  {filteredCounties.length === 0 ? (
                    <div className="text-center text-[9px] text-slate-500 py-2 italic">
                      No counties found
                    </div>
                  ) : (
                    filteredCounties.map((c) => (
                      <button
                        key={c.name}
                        type="button"
                        onClick={() => {
                          setSelectedCounty(c.name);
                          setDropdownOpen(false);
                        }}
                        className="w-full flex items-center justify-between px-2.5 py-2 text-[10px] text-slate-300 hover:text-[#F8FAFC] rounded hover:bg-[#145CFF]/10 font-bold text-left transition-all cursor-pointer"
                      >
                        <span>{c.name}</span>
                        {selectedCounty === c.name && (
                          <span className="w-1.5 h-1.5 rounded-full bg-[#145CFF]"></span>
                        )}
                      </button>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* 3. Choose Radius */}
        <div className="space-y-1">
          <label className="text-[9px] font-extrabold text-slate-500 uppercase tracking-widest block">
            3. Search Radius
          </label>
          <div className="grid grid-cols-5 gap-1.5">
            {[5, 10, 15, 25, 50].map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => setSelectedRadius(r)}
                className={`py-2 rounded-lg text-[10px] font-black tracking-wider transition-all border cursor-pointer ${
                  selectedRadius === r
                    ? "bg-[#145CFF] border-[#145CFF] text-[#F8FAFC] shadow-md shadow-[#145CFF]/10"
                    : "bg-[#050B16] border-[#145CFF]/15 text-[#94A3B8] hover:text-[#F8FAFC] hover:border-[#145CFF]/45"
                }`}
              >
                {r} mi
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Search Button */}
      <div className="pt-2">
        <button
          type="button"
          disabled={!selectedState || !selectedCounty}
          onClick={() => onSearchSubmit(selectedState, selectedCounty, selectedRadius)}
          className="w-full flex items-center justify-center gap-1.5 py-3 px-4 rounded-lg bg-[#145CFF] hover:bg-[#2570FF] disabled:bg-[#145CFF]/15 disabled:text-[#145CFF]/40 disabled:cursor-not-allowed border-none text-[#F8FAFC] font-extrabold uppercase text-[10.5px] tracking-wider transition-all shadow-md shadow-[#145CFF]/10 cursor-pointer"
        >
          <Navigation size={12} className="rotate-45 shrink-0" />
          <span>Search Storm Activity</span>
        </button>
      </div>

      <div className="flex items-center gap-1.5 justify-center text-[9px] text-[#64748B] font-semibold text-center select-none pt-0.5">
        <AlertCircle size={10} className="text-[#64748B]" />
        <span>No street address required. Start with the market you actually serve.</span>
      </div>
    </div>
  );
}
