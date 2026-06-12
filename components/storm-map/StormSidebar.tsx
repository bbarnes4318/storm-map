"use client";

import React from "react";
import { StormFilterState, StormReport, NwsAlert, TargetCluster, SelectedPropertyTarget } from "@/lib/weather/types";
import { clusterStormReports } from "@/lib/weather/geo";
import { Search, Tornado, Wind, Zap, Layers, Navigation, RefreshCw, ChevronLeft, ChevronRight, MapPin, Eye, Info, AlertCircle, MessageSquare, Download, Trash2, ClipboardList } from "lucide-react";
import { StormLegend } from "./StormLegend";
import { LeadIntelligencePanel } from "./enrichment/LeadIntelligencePanel";

interface StormSidebarProps {
  filters: StormFilterState;
  onFiltersChange: (newFilters: Partial<StormFilterState>) => void;
  reports: StormReport[];
  alerts: NwsAlert[];
  onSelectCoords: (coords: [number, number], label: string, targetZoom?: number) => void;
  onResetView: () => void;
  onRefresh: () => void;
  isRefreshing: boolean;
  lastUpdated: Date | null;
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  selectedProperty: SelectedPropertyTarget | null;
  onUnlockProperty: () => void;
  leads: SelectedPropertyTarget[];
  onRemoveLead: (leadId: string) => void;
  onUpdateLead: (lead: SelectedPropertyTarget) => void;
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
  selectedProperty,
  onUnlockProperty,
  leads = [],
  onRemoveLead,
  onUpdateLead,
}: StormSidebarProps) {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [isSearching, setIsSearching] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState<"filters" | "targets" | "leads">("filters");

  // Switch to leads tab automatically when a property is selected
  React.useEffect(() => {
    if (selectedProperty) {
      setActiveTab("leads");
    }
  }, [selectedProperty]);

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

        // Determine target zoom based on Nominatim place classification
        // Address, building, highway, amenity usually indicate specific street-level locations
        const addressTypes = ["house", "building", "residential", "service", "point_of_interest", "postcode", "street", "address"];
        const isStreetLevel = addressTypes.includes(item.type) || 
                              item.class === "building" || 
                              item.class === "highway" ||
                              item.class === "amenity" ||
                              /\d+/.test(searchQuery);

        const targetZoom = isStreetLevel ? 16.5 : 9.5;
        onSelectCoords([lat, lon], item.display_name, targetZoom);
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

  const handleExportCSV = () => {
    if (leads.length === 0) return;
    const headers = ["ID", "Full Address", "Street Number", "Street Name", "Neighborhood", "City", "County", "State", "Postal Code", "Latitude", "Longitude", "Confidence"];
    const rows = leads.map((lead) => [
      lead.id,
      `"${lead.fullAddress.replace(/"/g, '""')}"`,
      lead.streetNumber || "",
      `"${(lead.streetName || "").replace(/"/g, '""')}"`,
      `"${(lead.neighborhood || "").replace(/"/g, '""')}"`,
      `"${(lead.city || "").replace(/"/g, '""')}"`,
      `"${(lead.county || "").replace(/"/g, '""')}"`,
      lead.state || "",
      lead.postcode || "",
      lead.latitude,
      lead.longitude,
      lead.confidence
    ]);
    const csvContent = [
      headers.join(","),
      ...rows.map(row => row.join(","))
    ].join("\n");
    
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `stormtarget_leads_${new Date().toISOString().slice(0, 10)}.csv`);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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
        {/* Brand Header & Search Inline */}
        <div className="py-1.5 px-2.5 border-b border-slate-900 flex items-center gap-2 bg-slate-950">
          {/* Brand/Logo */}
          <div className="flex items-center gap-1 shrink-0">
            <Zap size={11} className="text-red-500 shrink-0" />
            <h1 className="font-black text-[9.5px] tracking-wider text-slate-100 uppercase">
              StormTarget
            </h1>
          </div>

          {/* Search Box Inline */}
          <form onSubmit={handleSearchSubmit} className="flex-1 relative">
            <input
              type="text"
              placeholder="Search City or ZIP..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-900/80 border border-slate-800 rounded px-2 py-1 text-[10px] text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-red-500/50 transition-colors"
            />
            {filters.center && (
              <button
                type="button"
                onClick={handleClearSearch}
                className="absolute right-1.5 top-1.5 text-[9px] text-red-500 hover:text-red-400 font-extrabold"
              >
                ×
              </button>
            )}
          </form>

          {/* Control Actions */}
          <div className="flex items-center gap-1 shrink-0">
            <a
              href="https://sms.leadzer.io"
              target="_blank"
              rel="noopener noreferrer"
              className="p-1 rounded border border-slate-900 text-slate-400 hover:text-slate-200 bg-slate-900/40 hover:bg-slate-900 transition-colors flex items-center gap-0.5 text-[9px] font-extrabold uppercase"
              title="Open SMS App"
            >
              <MessageSquare size={10} className="text-red-500 shrink-0" />
              <span>SMS</span>
            </a>
            <button
              onClick={onResetView}
              className="p-1 rounded border border-slate-900 text-slate-400 hover:text-slate-200 bg-slate-900/40 hover:bg-slate-900 transition-colors"
              title="Reset Map Bounds"
              type="button"
            >
              <Navigation size={10} />
            </button>
            <button
              onClick={onRefresh}
              disabled={isRefreshing}
              className="p-1 rounded border border-slate-900 text-slate-400 hover:text-slate-200 bg-slate-900/40 hover:bg-slate-900 transition-colors"
              title="Refresh Weather Data"
              type="button"
            >
              <RefreshCw size={10} className={isRefreshing ? "animate-spin" : ""} />
            </button>
            <button
              onClick={() => setSidebarOpen(false)}
              className="p-1 rounded border border-slate-900 text-slate-400 hover:text-slate-200 bg-slate-900/40 hover:bg-slate-900 transition-colors md:hidden"
              title="Close Sidebar"
              type="button"
            >
              <ChevronLeft size={10} />
            </button>
          </div>
        </div>

        {/* Target location display (Only when active) */}
        {filters.center && (
          <div className="px-2.5 py-1 border-b border-slate-900 bg-slate-900/10 text-[9px] text-slate-400 flex items-center justify-between gap-1 shrink-0">
            <div className="flex items-center gap-1 truncate">
              <MapPin size={9} className="text-red-500 shrink-0" />
              <span className="truncate font-semibold" title={filters.searchQuery || "Selected Center"}>
                Target: {filters.searchQuery || "Geocoded Point"}
              </span>
            </div>
            <button
              type="button"
              onClick={handleClearSearch}
              className="text-[8px] font-bold text-red-500 hover:text-red-400 uppercase shrink-0"
            >
              Clear
            </button>
          </div>
        )}
        {/* Sleek Active Target Property Indicator */}
        {selectedProperty && (
          <div className="mx-2.5 mt-2 mb-1 p-2 bg-emerald-950/20 border border-emerald-500/25 rounded-md flex items-center justify-between gap-1.5 text-[9.5px] shrink-0 select-none animate-in fade-in slide-in-from-top-1 duration-150">
            <div className="flex items-center gap-1.5 truncate text-emerald-400">
              <MapPin size={11} className="animate-pulse shrink-0 text-emerald-400" />
              <span className="truncate font-extrabold" title={selectedProperty.fullAddress}>
                Active: <span className="text-slate-100 font-semibold">{selectedProperty.fullAddress}</span>
              </span>
            </div>
            <div className="flex items-center gap-1 shrink-0">
              {activeTab !== "leads" && (
                <button
                  type="button"
                  onClick={() => setActiveTab("leads")}
                  className="text-[8px] text-emerald-400 hover:text-emerald-350 font-extrabold uppercase shrink-0 px-1 py-0.5 rounded border border-emerald-500/30 bg-slate-950 hover:bg-slate-900 transition-colors"
                >
                  View Intel
                </button>
              )}
              <button
                type="button"
                onClick={onUnlockProperty}
                className="text-[8px] text-slate-400 hover:text-red-400 font-extrabold uppercase shrink-0 px-1.5 py-0.5 rounded border border-slate-800 bg-slate-950 hover:bg-slate-900 transition-colors"
              >
                Clear
              </button>
            </div>
          </div>
        )}

        {/* Navigation Tabs */}
        <div className="flex border-b border-slate-900 bg-slate-950">
          <button
            onClick={() => setActiveTab("filters")}
            className={`flex-1 py-2 text-center text-[10px] font-extrabold transition-all border-b-2 uppercase ${
              activeTab === "filters"
                ? "border-red-500 text-slate-200 bg-slate-900/20"
                : "border-transparent text-slate-500 hover:text-slate-300"
            }`}
          >
            FILTERS
          </button>
          <button
            onClick={() => setActiveTab("targets")}
            className={`flex-1 py-2 text-center text-[10px] font-extrabold transition-all border-b-2 flex items-center justify-center gap-1.5 uppercase ${
              activeTab === "targets"
                ? "border-red-500 text-slate-200 bg-slate-900/20"
                : "border-transparent text-slate-500 hover:text-slate-300"
            }`}
          >
            OPPORTUNITIES
            {clusters.length > 0 && (
              <span className="px-1 py-0.2 rounded bg-red-500/10 text-red-400 border border-red-500/20 text-[8px]">
                {clusters.length}
              </span>
            )}
          </button>
          <button
            onClick={() => setActiveTab("leads")}
            className={`flex-1 py-2 text-center text-[10px] font-extrabold transition-all border-b-2 flex items-center justify-center gap-1.5 uppercase ${
              activeTab === "leads"
                ? "border-red-500 text-slate-200 bg-slate-900/20"
                : "border-transparent text-slate-500 hover:text-slate-300"
            }`}
          >
            LOCKED LEADS
            {leads.length > 0 && (
              <span className="px-1.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[8px] font-bold animate-pulse">
                {leads.length}
              </span>
            )}
          </button>
        </div>

        {/* Tab Contents */}
        <div className="flex-1 overflow-y-auto p-2 space-y-2.5">
          {activeTab === "filters" && (
            <>
              {/* 1. Visible Reports Summary (Metrics Card) - Moved to Top */}
              <div className="bg-slate-900/30 border border-slate-900 rounded-lg p-1.5 space-y-1.5">
                <div className="grid grid-cols-4 gap-1 text-center">
                  <div className="bg-slate-950/60 p-1 rounded border border-slate-900">
                    <span className="text-sm font-black text-blue-400">{hailCount}</span>
                    <span className="text-[7px] text-slate-500 block font-bold uppercase leading-none mt-0.5">Hail</span>
                  </div>
                  <div className="bg-slate-950/60 p-1 rounded border border-slate-900">
                    <span className="text-sm font-black text-violet-400">{windCount}</span>
                    <span className="text-[7px] text-slate-500 block font-bold uppercase leading-none mt-0.5">Wind</span>
                  </div>
                  <div className="bg-slate-950/60 p-1 rounded border border-slate-900">
                    <span className="text-sm font-black text-red-500">{tornadoCount}</span>
                    <span className="text-[7px] text-slate-500 block font-bold uppercase leading-none mt-0.5">Torn</span>
                  </div>
                  <div className="bg-slate-950/60 p-1 rounded border border-slate-900">
                    <span className="text-sm font-black text-amber-500">{warningCount}</span>
                    <span className="text-[7px] text-slate-500 block font-bold uppercase leading-none mt-0.5">Warn</span>
                  </div>
                </div>
                <div className="text-[8px] text-slate-500 flex justify-between items-center border-t border-slate-900/40 pt-1 font-medium px-0.5">
                  <span>Total Reports: {hailCount + windCount + tornadoCount}</span>
                  <span>Active Watches: {watchCount}</span>
                </div>
              </div>

              {/* 2. SPC Reports & Time Window (Side-by-Side Grid) */}
              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <span className="text-[8px] font-extrabold text-slate-500 uppercase tracking-wider block">Show Reports</span>
                  <div className="flex flex-col gap-0.5">
                    <label className="flex items-center justify-between px-1.5 py-0.5 rounded bg-slate-900/25 border border-slate-900/60 hover:border-slate-800 transition-colors cursor-pointer select-none">
                      <span className="text-[9.5px] text-slate-355 flex items-center gap-1">
                        <span className="w-1 h-1 rounded-full bg-blue-500 shadow-glow-hail"></span>
                        Hail Hits
                      </span>
                      <input
                        type="checkbox"
                        checked={filters.showHail}
                        onChange={(e) => onFiltersChange({ showHail: e.target.checked })}
                        className="w-3 h-3 rounded border-slate-800 bg-slate-950 text-red-500 focus:ring-0 cursor-pointer"
                      />
                    </label>
                    <label className="flex items-center justify-between px-1.5 py-0.5 rounded bg-slate-900/25 border border-slate-900/60 hover:border-slate-800 transition-colors cursor-pointer select-none">
                      <span className="text-[9.5px] text-slate-355 flex items-center gap-1">
                        <span className="w-1 h-1 rounded-full bg-violet-500 shadow-glow-wind"></span>
                        Wind Damage
                      </span>
                      <input
                        type="checkbox"
                        checked={filters.showWind}
                        onChange={(e) => onFiltersChange({ showWind: e.target.checked })}
                        className="w-3 h-3 rounded border-slate-800 bg-slate-950 text-red-500 focus:ring-0 cursor-pointer"
                      />
                    </label>
                    <label className="flex items-center justify-between px-1.5 py-0.5 rounded bg-slate-900/25 border border-slate-900/60 hover:border-slate-800 transition-colors cursor-pointer select-none">
                      <span className="text-[9.5px] text-slate-355 flex items-center gap-1">
                        <span className="w-1 h-1 rounded-full bg-red-500 shadow-glow-tornado animate-pulse"></span>
                        Tornadoes
                      </span>
                      <input
                        type="checkbox"
                        checked={filters.showTornado}
                        onChange={(e) => onFiltersChange({ showTornado: e.target.checked })}
                        className="w-3 h-3 rounded border-slate-800 bg-slate-950 text-red-500 focus:ring-0 cursor-pointer"
                      />
                    </label>
                  </div>
                </div>

                <div className="space-y-1">
                  <span className="text-[8px] font-extrabold text-slate-500 uppercase tracking-wider block">Time Window</span>
                  <div className="grid grid-cols-3 gap-0.5">
                    {(["24h", "today", "yesterday"] as const).map((win) => (
                      <button
                        key={win}
                        type="button"
                        onClick={() => onFiltersChange({ timeWindow: win })}
                        className={`py-1 rounded border text-[8.5px] font-bold capitalize transition-colors text-center cursor-pointer ${
                          filters.timeWindow === win
                            ? "bg-red-500/15 border-red-500/40 text-slate-200"
                            : "bg-slate-900/40 border-slate-850 text-slate-400 hover:bg-slate-900/70"
                        }`}
                      >
                        {win === "24h" ? "24h" : win}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* 3. Geographic Filters */}
              <div className="grid grid-cols-2 gap-2 border-t border-slate-900 pt-2">
                <div className="space-y-0.5">
                  <label className="text-[8px] font-extrabold text-slate-500 uppercase tracking-wider block">State Boundary</label>
                  <select
                    value={filters.state}
                    onChange={(e) => onFiltersChange({ state: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-850 rounded p-1 text-[9.5px] text-slate-250 focus:outline-none focus:border-red-500/50 cursor-pointer"
                  >
                    {US_STATES.map((st) => (
                      <option key={st.code} value={st.code}>
                        {st.name} {st.code ? `(${st.code})` : ""}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-0.5">
                  <label className="text-[8px] font-extrabold text-slate-500 uppercase tracking-wider block">Target Radius</label>
                  <select
                    value={filters.radius}
                    disabled={!filters.center}
                    onChange={(e) => onFiltersChange({ radius: parseInt(e.target.value, 10) })}
                    className={`w-full bg-slate-900 border border-slate-850 rounded p-1 text-[9.5px] text-slate-250 focus:outline-none focus:border-red-500/50 cursor-pointer ${
                      !filters.center ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                  >
                    <option value={0}>Nationwide</option>
                    <option value={10}>10 Miles</option>
                    <option value={25}>25 Miles</option>
                    <option value={50}>50 Miles</option>
                    <option value={100}>100 Miles</option>
                  </select>
                </div>
              </div>

              {/* 4. Secondary Map Settings (Collapsible Accordion) & Legend */}
              <div className="border-t border-slate-900 pt-2 relative">
                <details className="group border border-slate-900 rounded bg-slate-950/20 overflow-visible">
                  <summary className="flex items-center justify-between p-1.5 text-[9px] font-extrabold text-slate-400 uppercase tracking-wider cursor-pointer hover:bg-slate-900/30 select-none">
                    <span>Basemap & Layer Toggles</span>
                    <span className="text-[7px] text-slate-500 group-open:rotate-180 transition-transform">▼</span>
                  </summary>
                  <div className="absolute left-0 right-0 z-[20] mt-1 p-2.5 border border-slate-900 rounded bg-slate-950 shadow-2xl space-y-2.5 hidden group-open:block">
                    <div className="space-y-1">
                      <label className="text-[9px] font-bold text-slate-400 block uppercase">Basemap style</label>
                      <select
                        value={filters.mapStyle}
                        onChange={(e) => onFiltersChange({ mapStyle: e.target.value as StormMapStyle })}
                        className="w-full bg-slate-900 border border-slate-800 rounded p-1.5 text-[10px] text-slate-200 focus:outline-none focus:border-red-500/50 cursor-pointer"
                      >
                        <option value="streets">Streets</option>
                        <option value="dark">Operational Dark</option>
                        <option value="satellite">Satellite Streets</option>
                      </select>
                    </div>

                    <label className="flex items-center justify-between p-1.5 rounded bg-slate-900/20 border border-slate-900/65 cursor-pointer">
                      <span className="text-[10px] text-slate-300">Show neighborhood labels</span>
                      <input
                        type="checkbox"
                        checked={filters.showNeighborhoodLabels}
                        onChange={(e) => onFiltersChange({ showNeighborhoodLabels: e.target.checked })}
                        className="w-3.5 h-3.5 rounded border-slate-800 bg-slate-950 text-red-500 focus:ring-0 cursor-pointer"
                      />
                    </label>

                    <label className="flex items-center justify-between p-1.5 rounded bg-slate-900/20 border border-slate-900/65 cursor-pointer">
                      <span className="text-[10px] text-slate-300">Show building footprints</span>
                      <input
                        type="checkbox"
                        checked={filters.showBuildings}
                        onChange={(e) => onFiltersChange({ showBuildings: e.target.checked })}
                        className="w-3.5 h-3.5 rounded border-slate-800 bg-slate-950 text-red-500 focus:ring-0 cursor-pointer"
                      />
                    </label>

                    <label className="flex items-center justify-between p-1.5 rounded bg-slate-900/20 border border-slate-900/65 cursor-pointer">
                      <span className="text-[10px] text-slate-300">Show house numbers</span>
                      <input
                        type="checkbox"
                        checked={filters.showHouseNumbers}
                        onChange={(e) => onFiltersChange({ showHouseNumbers: e.target.checked })}
                        className="w-3.5 h-3.5 rounded border-slate-800 bg-slate-950 text-red-500 focus:ring-0 cursor-pointer"
                      />
                    </label>

                    <label className="flex items-center justify-between p-1.5 rounded bg-slate-900/20 border border-slate-900/65 cursor-pointer">
                      <span className="text-[10px] text-slate-300 flex items-center gap-1">
                        <Layers size={10} className="text-slate-500" />
                        NOAA Radar Overlay
                      </span>
                      <input
                        type="checkbox"
                        checked={filters.showRadar}
                        onChange={(e) => onFiltersChange({ showRadar: e.target.checked })}
                        className="w-3.5 h-3.5 rounded border-slate-800 bg-slate-950 text-red-500 focus:ring-0 cursor-pointer"
                      />
                    </label>

                    {filters.showRadar && (
                      <div className="p-1.5 bg-slate-900/10 border border-slate-900 rounded space-y-1">
                        <div className="flex justify-between text-[9px] text-slate-555 font-semibold">
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
                          className="w-full h-1 bg-slate-800 rounded appearance-none cursor-pointer accent-red-500"
                        />
                      </div>
                    )}

                    <label className="flex items-center justify-between p-1.5 rounded bg-slate-900/20 border border-slate-900/65 cursor-pointer">
                      <span className="text-[10px] text-slate-300 flex items-center gap-1">
                        <AlertCircle size={10} className="text-amber-500" />
                        Active NWS Alert Areas
                      </span>
                      <input
                        type="checkbox"
                        checked={filters.showAlerts}
                        onChange={(e) => onFiltersChange({ showAlerts: e.target.checked })}
                        className="w-3.5 h-3.5 rounded border-slate-800 bg-slate-950 text-red-500 focus:ring-0 cursor-pointer"
                      />
                    </label>
                  </div>
                </details>

                {/* Map Legend */}
                <div className="mt-2">
                  <StormLegend className="bg-slate-900/10 border border-slate-900/60 rounded p-2 text-[10px] text-slate-400 w-full" />
                </div>
              </div>
            </>
          )}

          {activeTab === "targets" && (
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
                                ? "text-violet-400"
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

          {activeTab === "leads" && (
            <div className="space-y-4">
              {selectedProperty && (
                <div className="p-2.5 bg-slate-900/10 border border-slate-900 rounded-lg animate-in fade-in slide-in-from-top-2 duration-200">
                  <LeadIntelligencePanel
                    selectedProperty={selectedProperty}
                    onUpdateLead={onUpdateLead}
                    onClearProperty={onUnlockProperty}
                  />
                </div>
              )}

              <div className="flex items-center justify-between border-b border-slate-900 pb-2 mb-2">
                <div className="flex items-center gap-1.5">
                  <ClipboardList size={14} className="text-emerald-500 animate-pulse" />
                  <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">Saved Leads</span>
                  <span className="px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[8px] font-bold">
                    {leads.length}
                  </span>
                </div>
                {leads.length > 0 && (
                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={handleExportCSV}
                      className="flex items-center gap-1 px-2 py-1 bg-emerald-600 hover:bg-emerald-500 text-white text-[9px] font-extrabold uppercase rounded shadow transition-colors cursor-pointer"
                    >
                      <Download size={10} />
                      Export CSV
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        if (window.confirm("Are you sure you want to clear all saved leads?")) {
                          leads.forEach(l => onRemoveLead(l.id));
                        }
                      }}
                      className="px-2 py-1 bg-slate-905 hover:bg-red-950/40 text-slate-500 hover:text-red-400 border border-slate-800 hover:border-red-900/30 text-[9px] font-extrabold uppercase rounded transition-all cursor-pointer"
                    >
                      Clear All
                    </button>
                  </div>
                )}
              </div>

              {leads.length === 0 ? (
                <div className="py-10 text-center border border-dashed border-slate-805 rounded-lg text-slate-500 flex flex-col items-center justify-center gap-2">
                  <MapPin size={20} className="text-slate-700 animate-pulse" />
                  <p className="text-[11px] font-bold text-slate-350">No saved leads yet</p>
                  <p className="text-[9.5px] text-slate-600 max-w-[220px] leading-normal">
                    Click on any location or address on the map, then click <strong className="text-slate-400">"Lock Address for Lead Route"</strong> to add it here.
                  </p>
                </div>
              ) : (
                <div className="space-y-2">
                  {leads.map((lead) => {
                    const isActive = selectedProperty?.id === lead.id;
                    return (
                      <div
                        key={lead.id}
                        onClick={() => onSelectCoords([lead.latitude, lead.longitude], lead.fullAddress, 16.5)}
                        className={`p-3 border rounded-lg transition-all cursor-pointer flex justify-between items-start gap-2 relative group ${
                          isActive
                            ? "bg-emerald-950/15 border-emerald-500/40 hover:border-emerald-500/60 shadow-md shadow-emerald-950/20"
                            : "bg-slate-900/40 hover:bg-slate-900/80 border-slate-900 hover:border-slate-800"
                        }`}
                      >
                        <div className="flex gap-2 truncate">
                          <MapPin
                            size={12}
                            className={`shrink-0 mt-0.5 ${isActive ? "text-emerald-500 animate-bounce" : "text-slate-600 group-hover:text-slate-450"}`}
                          />
                          <div className="truncate flex flex-col gap-0.5">
                            <span className={`text-[11px] font-bold leading-tight truncate ${isActive ? "text-slate-100 animate-pulse" : "text-slate-300"}`}>
                              {lead.fullAddress}
                            </span>
                            <span className="text-[9.5px] text-slate-550 font-medium">
                              {[lead.city, lead.state, lead.postcode].filter(Boolean).join(", ")}
                            </span>
                            <div className="flex items-center gap-1.5 mt-1">
                              <span className="text-[8.5px] text-slate-600 font-mono">
                                {lead.latitude.toFixed(4)}, {lead.longitude.toFixed(4)}
                              </span>
                              <span className={`px-1 rounded-sm text-[7px] font-bold uppercase ${
                                lead.confidence === "exact"
                                  ? "bg-emerald-500/10 text-emerald-400/90 border border-emerald-500/20"
                                  : "bg-amber-500/10 text-amber-400/90 border border-amber-500/20"
                              }`}>
                                {lead.confidence}
                              </span>
                            </div>
                          </div>
                        </div>
                        
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation(); // prevent map panning
                            onRemoveLead(lead.id);
                          }}
                          className="text-slate-600 hover:text-red-400 p-1 rounded bg-slate-950/20 hover:bg-red-500/10 border border-slate-900/40 hover:border-red-950/40 transition-colors shrink-0"
                          title="Remove lead"
                        >
                          <Trash2 size={11} />
                        </button>
                      </div>
                    );
                  })}
                </div>
              )}
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
