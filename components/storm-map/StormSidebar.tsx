"use client";

import React from "react";
import { StormFilterState, StormReport, NwsAlert, TargetCluster } from "@/lib/weather/types";
import { clusterStormReports } from "@/lib/weather/geo";
import { Search, Tornado, Wind, Zap, Layers, Navigation, RefreshCw, ChevronLeft, ChevronRight, MapPin, Eye, Info, AlertCircle } from "lucide-react";

interface StormSidebarProps {
  filters: StormFilterState;
  onFiltersChange: (newFilters: Partial<StormFilterState>) => void;
  reports: StormReport[];
  alerts: NwsAlert[];
  onSelectCoords: (coords: [number, number], label: string) => void;
  onResetView: () => void;
  onRefresh: () => void;
  isRefreshing: boolean;
  lastUpdated: Date | null;
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

const US_STATES = [
  { code: "", name: "All States" },
  { code: "AL", name: "Alabama" }, { code: "AR", name: "Arkansas" }, { code: "CO", name: "Colorado" },
  { code: "FL", name: "Florida" }, { code: "GA", name: "Georgia" }, { code: "IA", name: "Iowa" },
  { code: "IL", name: "Illinois" }, { code: "IN", name: "Indiana" }, { code: "KS", name: "Kansas" },
  { code: "KY", name: "Kentucky" }, { code: "LA", name: "Louisiana" }, { code: "MI", name: "Michigan" },
  { code: "MN", name: "Minnesota" }, { code: "MO", name: "Missouri" }, { code: "MS", name: "Mississippi" },
  { code: "NC", name: "North Carolina" }, { code: "ND", name: "North Dakota" }, { code: "NE", name: "Nebraska" },
  { code: "OH", name: "Ohio" }, { code: "OK", name: "Oklahoma" }, { code: "SC", name: "South Carolina" },
  { code: "SD", name: "South Dakota" }, { code: "TN", name: "Tennessee" }, { code: "TX", name: "Texas" },
  { code: "VA", name: "Virginia" }, { code: "WI", name: "Wisconsin" }, { code: "WY", name: "Wyoming" }
];

export function StormSidebar({
  filters,
  onFiltersChange,
  reports,
  alerts,
  onSelectCoords,
  onResetView,
  onRefresh,
  isRefreshing,
  lastUpdated,
  sidebarOpen,
  setSidebarOpen,
}: StormSidebarProps) {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [isSearching, setIsSearching] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState<"filters" | "targets">("filters");

  // Geocoding search using free Nominatim API
  const handleSearchSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setIsSearching(true);
    try {
      const q = `${searchQuery.trim()}, USA`;
      const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(q)}&countrycodes=us&limit=1`;
      
      const res = await fetch(url, {
        headers: {
          "User-Agent": "StormTargetMap/1.0 (contact: info@stormtargetmap.com)",
        }
      });
      
      if (!res.ok) throw new Error("Geocoding failed");
      
      const data = await res.json();
      if (data && data.length > 0) {
        const item = data[0];
        const lat = parseFloat(item.lat);
        const lon = parseFloat(item.lon);
        onSelectCoords([lat, lon], item.display_name);
      } else {
        alert("Location not found. Try searching for a City & State (e.g. 'Norman, OK') or a 5-digit ZIP code.");
      }
    } catch (err) {
      console.error("Search failed:", err);
      alert("Error finding location. Please try again.");
    } finally {
      setIsSearching(false);
    }
  };

  const handleClearSearch = () => {
    setSearchQuery("");
    onFiltersChange({ center: null, searchQuery: "" });
  };

  // Filter reports according to current map filters
  const filteredReports = React.useMemo(() => {
    return reports.filter((r) => {
      // State filter
      if (filters.state && r.state.toUpperCase() !== filters.state.toUpperCase()) {
        return false;
      }
      // Report type toggles
      if (r.type === "hail" && !filters.showHail) return false;
      if (r.type === "wind" && !filters.showWind) return false;
      if (r.type === "tornado" && !filters.showTornado) return false;
      // Time window filter
      if (filters.timeWindow === "today" && r.eventDate !== "today") return false;
      if (filters.timeWindow === "yesterday" && r.eventDate !== "yesterday") return false;
      
      return true;
    });
  }, [reports, filters]);

  // Generate target opportunity clusters from filtered reports
  const clusters = React.useMemo(() => {
    return clusterStormReports(filteredReports, alerts);
  }, [filteredReports, alerts]);

  // Alert counts
  const warningCount = alerts.filter(a => a.event.includes("Warning")).length;
  const watchCount = alerts.filter(a => a.event.includes("Watch")).length;

  const hailCount = filteredReports.filter((r) => r.type === "hail").length;
  const windCount = filteredReports.filter((r) => r.type === "wind").length;
  const tornadoCount = filteredReports.filter((r) => r.type === "tornado").length;

  return (
    <>
      {/* Sidebar container */}
      <div
        className={`fixed md:relative top-0 left-0 h-full z-[1000] md:z-10 bg-slate-950 border-r border-slate-900 flex flex-col transition-all duration-300 ${
          sidebarOpen ? "w-[360px]" : "w-0 md:w-0 overflow-hidden border-r-0"
        }`}
      >
        {/* Brand Header */}
        <div className="p-4 border-b border-slate-900 flex items-center justify-between bg-slate-950">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-red-600/10 border border-red-500/30 flex items-center justify-center text-red-500 animate-pulse">
              <Zap size={18} />
            </div>
            <div>
              <h1 className="font-extrabold text-sm tracking-wide text-slate-100 uppercase">
                StormTarget <span className="text-red-500">Live</span>
              </h1>
              <p className="text-[10px] text-slate-500 font-medium">B2B Storm Damage Targeting</p>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={onRefresh}
              disabled={isRefreshing}
              className="p-1.5 rounded-lg border border-slate-900 text-slate-400 hover:text-slate-200 bg-slate-900/40 hover:bg-slate-900 transition-colors"
              title="Refresh Weather Data"
            >
              <RefreshCw size={14} className={isRefreshing ? "animate-spin" : ""} />
            </button>
            <button
              onClick={() => setSidebarOpen(false)}
              className="p-1.5 rounded-lg border border-slate-900 text-slate-400 hover:text-slate-200 bg-slate-900/40 hover:bg-slate-900 transition-colors md:hidden"
            >
              <ChevronLeft size={14} />
            </button>
          </div>
        </div>

        {/* Search Input */}
        <div className="p-4 border-b border-slate-900 bg-slate-950/40">
          <form onSubmit={handleSearchSubmit} className="relative">
            <input
              type="text"
              placeholder="Search City, State or ZIP..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-lg pl-9 pr-8 py-2 text-xs text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-red-500/50 transition-colors"
            />
            <Search size={14} className="absolute left-3 top-2.5 text-slate-600" />
            {filters.center && (
              <button
                type="button"
                onClick={handleClearSearch}
                className="absolute right-3 top-2 text-[10px] text-red-500 hover:text-red-400 font-semibold"
              >
                Clear
              </button>
            )}
          </form>
          {filters.center && (
            <div className="mt-2 text-[10px] text-slate-400 flex items-center gap-1">
              <MapPin size={10} className="text-red-500 shrink-0" />
              <span className="truncate" title={filters.searchQuery || "Selected Center"}>
                Target: {filters.searchQuery || "Geocoded Point"}
              </span>
            </div>
          )}
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-slate-900 bg-slate-950">
          <button
            onClick={() => setActiveTab("filters")}
            className={`flex-1 py-2.5 text-center text-xs font-bold transition-all border-b-2 ${
              activeTab === "filters"
                ? "border-red-500 text-slate-200 bg-slate-900/20"
                : "border-transparent text-slate-500 hover:text-slate-300"
            }`}
          >
            FILTERS & METRICS
          </button>
          <button
            onClick={() => setActiveTab("targets")}
            className={`flex-1 py-2.5 text-center text-xs font-bold transition-all border-b-2 flex items-center justify-center gap-1.5 ${
              activeTab === "targets"
                ? "border-red-500 text-slate-200 bg-slate-900/20"
                : "border-transparent text-slate-500 hover:text-slate-300"
            }`}
          >
            LEAD TARGETS
            {clusters.length > 0 && (
              <span className="px-1.5 py-0.5 rounded-full bg-red-500/10 text-red-400 border border-red-500/20 text-[9px]">
                {clusters.length}
              </span>
            )}
          </button>
        </div>

        {/* Tab Contents */}
        <div className="flex-1 overflow-y-auto p-4 space-y-5">
          {activeTab === "filters" ? (
            <>
              {/* Overlay Toggles */}
              <div className="space-y-2.5">
                <span className="text-[10px] font-extrabold text-slate-500 uppercase tracking-widest block">Overlays</span>
                <div className="space-y-2">
                  <label className="flex items-center justify-between p-2 rounded bg-slate-900/40 border border-slate-900 hover:border-slate-800 transition-all cursor-pointer">
                    <span className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                      <Layers size={12} className="text-slate-500" />
                      Live NOAA Radar Overlay
                    </span>
                    <input
                      type="checkbox"
                      checked={filters.showRadar}
                      onChange={(e) => onFiltersChange({ showRadar: e.target.checked })}
                      className="rounded border-slate-800 bg-slate-950 text-red-500 focus:ring-0"
                    />
                  </label>
                  
                  {filters.showRadar && (
                    <div className="px-2 py-1.5 bg-slate-900/20 border border-slate-900 rounded space-y-1">
                      <div className="flex justify-between text-[10px] text-slate-500 font-semibold">
                        <span>Radar Opacity</span>
                        <span>{Math.round(filters.radarOpacity * 100)}%</span>
                      </div>
                      <input
                        type="range"
                        min="0.1"
                        max="0.9"
                        step="0.05"
                        value={filters.radarOpacity}
                        onChange={(e) => onFiltersChange({ radarOpacity: parseFloat(e.target.value) })}
                        className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-red-500"
                      />
                    </div>
                  )}

                  <label className="flex items-center justify-between p-2 rounded bg-slate-900/40 border border-slate-900 hover:border-slate-800 transition-all cursor-pointer">
                    <span className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                      <AlertCircle size={12} className="text-amber-500" />
                      Active NWS Alert Polygons
                    </span>
                    <input
                      type="checkbox"
                      checked={filters.showAlerts}
                      onChange={(e) => onFiltersChange({ showAlerts: e.target.checked })}
                      className="rounded border-slate-800 bg-slate-950 text-red-500 focus:ring-0"
                    />
                  </label>
                </div>
              </div>

              {/* Storm Reports Filter */}
              <div className="space-y-2.5">
                <span className="text-[10px] font-extrabold text-slate-500 uppercase tracking-widest block">SPC Reports</span>
                <div className="space-y-1.5">
                  <label className="flex items-center justify-between px-2.5 py-2 rounded bg-slate-900/30 border border-slate-900">
                    <span className="text-xs text-slate-300 flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-blue-500 inline-block shadow-glow-hail"></span>
                      Hail Reports
                    </span>
                    <input
                      type="checkbox"
                      checked={filters.showHail}
                      onChange={(e) => onFiltersChange({ showHail: e.target.checked })}
                      className="rounded border-slate-800 bg-slate-950 text-red-500 focus:ring-0"
                    />
                  </label>

                  <label className="flex items-center justify-between px-2.5 py-2 rounded bg-slate-900/30 border border-slate-900">
                    <span className="text-xs text-slate-300 flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-orange-500 inline-block shadow-glow-wind"></span>
                      Wind Reports
                    </span>
                    <input
                      type="checkbox"
                      checked={filters.showWind}
                      onChange={(e) => onFiltersChange({ showWind: e.target.checked })}
                      className="rounded border-slate-800 bg-slate-950 text-red-500 focus:ring-0"
                    />
                  </label>

                  <label className="flex items-center justify-between px-2.5 py-2 rounded bg-slate-900/30 border border-slate-900">
                    <span className="text-xs text-slate-300 flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-red-600 inline-block shadow-glow-tornado"></span>
                      Tornado Reports
                    </span>
                    <input
                      type="checkbox"
                      checked={filters.showTornado}
                      onChange={(e) => onFiltersChange({ showTornado: e.target.checked })}
                      className="rounded border-slate-800 bg-slate-950 text-red-500 focus:ring-0"
                    />
                  </label>
                </div>
              </div>

              {/* Spatial Filters */}
              <div className="space-y-3">
                <span className="text-[10px] font-extrabold text-slate-500 uppercase tracking-widest block">Geographic Filters</span>
                
                {/* State Dropdown */}
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400">STATE BOUNDARY</label>
                  <select
                    value={filters.state}
                    onChange={(e) => onFiltersChange({ state: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-xs text-slate-200 focus:outline-none focus:border-red-500/50"
                  >
                    {US_STATES.map((st) => (
                      <option key={st.code} value={st.code}>
                        {st.name} {st.code ? `(${st.code})` : ""}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Radius Filter (Only works if search coordinates or geo exists) */}
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400">TARGET RADIUS RANGE</label>
                  <select
                    value={filters.radius}
                    disabled={!filters.center}
                    onChange={(e) => onFiltersChange({ radius: parseInt(e.target.value, 10) })}
                    className={`w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-xs text-slate-200 focus:outline-none focus:border-red-500/50 ${
                      !filters.center ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                  >
                    <option value={0}>Show Nationwide (No Radius)</option>
                    <option value={10}>Within 10 Miles</option>
                    <option value={25}>Within 25 Miles</option>
                    <option value={50}>Within 50 Miles</option>
                    <option value={100}>Within 100 Miles</option>
                  </select>
                  {!filters.center && (
                    <span className="text-[9px] text-slate-500 block leading-tight">
                      * Search a city or ZIP code above to enable radius targeting.
                    </span>
                  )}
                </div>

                {/* Time Window */}
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 block mb-1">TIME WINDOW</label>
                  <div className="grid grid-cols-3 gap-1.5">
                    {(["24h", "today", "yesterday"] as const).map((win) => (
                      <button
                        key={win}
                        type="button"
                        onClick={() => onFiltersChange({ timeWindow: win })}
                        className={`py-1.5 px-2 rounded border text-[10px] font-bold capitalize transition-colors ${
                          filters.timeWindow === win
                            ? "bg-red-500/15 border-red-500/40 text-slate-200"
                            : "bg-slate-900 border-slate-800 text-slate-400 hover:bg-slate-900/70"
                        }`}
                      >
                        {win === "24h" ? "Last 24H" : win}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Metrics Card */}
              <div className="bg-slate-900/30 border border-slate-900 rounded-lg p-3.5 space-y-3">
                <span className="text-[10px] font-extrabold text-slate-500 uppercase tracking-widest block">Visible Reports summary</span>
                <div className="grid grid-cols-2 gap-2 text-center">
                  <div className="bg-slate-950 p-2 rounded border border-slate-900">
                    <span className="text-[18px] font-extrabold text-blue-400">{hailCount}</span>
                    <span className="text-[9px] text-slate-500 block font-semibold uppercase">Hail Hits</span>
                  </div>
                  <div className="bg-slate-950 p-2 rounded border border-slate-900">
                    <span className="text-[18px] font-extrabold text-orange-400">{windCount}</span>
                    <span className="text-[9px] text-slate-500 block font-semibold uppercase">Wind Damage</span>
                  </div>
                  <div className="bg-slate-950 p-2 rounded border border-slate-900">
                    <span className="text-[18px] font-extrabold text-red-500">{tornadoCount}</span>
                    <span className="text-[9px] text-slate-500 block font-semibold uppercase">Tornadoes</span>
                  </div>
                  <div className="bg-slate-950 p-2 rounded border border-slate-900">
                    <span className="text-[18px] font-extrabold text-amber-500">{warningCount}</span>
                    <span className="text-[9px] text-slate-500 block font-semibold uppercase">Warnings</span>
                  </div>
                </div>
                <div className="text-[9px] text-slate-600 flex justify-between items-center border-t border-slate-950 pt-2 font-medium">
                  <span>Total Reports: {hailCount + windCount + tornadoCount}</span>
                  <span>Active Watches: {watchCount}</span>
                </div>
              </div>
            </>
          ) : (
            /* Lead Targets Tab */
            <div className="space-y-4">
              <div className="bg-slate-900/30 border border-slate-900 rounded-lg p-3 text-[11px] text-slate-400 flex items-start gap-2">
                <Info size={14} className="text-red-500 shrink-0 mt-0.5" />
                <p className="leading-normal">
                  StormTarget algorithm aggregates reports within 15 miles and computes roofing lead opportunity priorities based on storm type, severity, density, and warnings.
                </p>
              </div>

              {clusters.length === 0 ? (
                <div className="py-8 text-center border border-dashed border-slate-900 rounded-lg text-slate-600 text-xs">
                  No active storm target clusters found for current filters.
                </div>
              ) : (
                <div className="space-y-2.5">
                  <span className="text-[10px] font-extrabold text-slate-500 uppercase tracking-widest block">Top opportunity areas</span>
                  <div className="space-y-2.5">
                    {clusters.map((cluster) => (
                      <div
                        key={cluster.id}
                        onClick={() => onSelectCoords(cluster.center, `${cluster.name}, ${cluster.state}`)}
                        className="bg-slate-900/40 hover:bg-slate-900 border border-slate-900 hover:border-slate-800 rounded-lg p-3 transition-all cursor-pointer flex flex-col gap-2 relative group"
                      >
                        {/* Upper row */}
                        <div className="flex justify-between items-start gap-1.5">
                          <div className="truncate">
                            <h4 className="font-extrabold text-xs text-slate-200 uppercase truncate">
                              {cluster.name || "Unknown Area"}
                            </h4>
                            <span className="text-[10px] text-slate-500">
                              {cluster.county ? `${cluster.county} County, ` : ""}{cluster.state}
                            </span>
                          </div>
                          
                          {/* Score Badge */}
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-extrabold shrink-0 border ${
                              cluster.totalScore >= 120
                                ? "bg-red-500/10 border-red-500/30 text-red-400 shadow-glow-tornado"
                                : cluster.totalScore >= 70
                                ? "bg-orange-500/10 border-orange-500/30 text-orange-400"
                                : "bg-slate-800 border-slate-700 text-slate-300"
                            }`}
                          >
                            Score: {cluster.totalScore}
                          </span>
                        </div>

                        {/* Middle Stats */}
                        <div className="grid grid-cols-3 gap-1 bg-slate-950/40 border border-slate-900/60 p-1.5 rounded text-[10px]">
                          <div>
                            <span className="text-slate-600 block text-[9px] font-medium uppercase">Storms</span>
                            <span className="font-bold text-slate-300">{cluster.reportsCount} Reports</span>
                          </div>
                          <div>
                            <span className="text-slate-600 block text-[9px] font-medium uppercase">Highest Impact</span>
                            <span className={`font-bold uppercase ${
                              cluster.mainStormType === "hail"
                                ? "text-blue-400"
                                : cluster.mainStormType === "wind"
                                ? "text-orange-400"
                                : "text-red-400 animate-pulse"
                            }`}>
                              {cluster.highestMagnitude !== "N/A" ? cluster.highestMagnitude : cluster.mainStormType}
                            </span>
                          </div>
                          <div>
                            <span className="text-slate-600 block text-[9px] font-medium uppercase">Target Radius</span>
                            <span className="font-bold text-slate-300">{cluster.suggestedRadius} mi</span>
                          </div>
                        </div>

                        {/* Tiny breakdown */}
                        <div className="flex gap-2 text-[9px] text-slate-500 font-semibold uppercase">
                          {cluster.hailCount > 0 && <span>Hail: {cluster.hailCount}</span>}
                          {cluster.windCount > 0 && <span>Wind: {cluster.windCount}</span>}
                          {cluster.tornadoCount > 0 && <span className="text-red-400">Torn: {cluster.tornadoCount}</span>}
                        </div>
                        
                        {/* Hover Overlay Help */}
                        <span className="absolute bottom-2 right-2 text-[9px] font-bold text-red-500 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-0.5">
                          <Eye size={10} /> View Map
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="p-4 border-t border-slate-900 bg-slate-950 flex flex-col gap-1.5 text-[10px] text-slate-500">
          <div className="flex justify-between items-center">
            <span>Server status: <span className="text-green-500 font-bold uppercase">Online</span></span>
            <button
              onClick={onResetView}
              className="text-[10px] font-bold text-slate-400 hover:text-slate-200 flex items-center gap-0.5"
            >
              <Navigation size={10} /> Reset Map
            </button>
          </div>
          {lastUpdated && (
            <div className="text-[9px] text-slate-600 leading-tight">
              Updated: {lastUpdated.toLocaleTimeString()} (Auto 5m)
            </div>
          )}
        </div>
      </div>

      {/* Floating Toggle Button for Mobile */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="fixed top-3 left-3 z-[1001] p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-200 shadow-glass md:hidden focus:outline-none"
      >
        {sidebarOpen ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
      </button>
    </>
  );
}
export default StormSidebar;
