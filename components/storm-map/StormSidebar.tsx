"use client";

import React from "react";
import { StormFilterState, StormReport, NwsAlert, TargetCluster, SelectedPropertyTarget, ActivePopupDetail, StormMapStyle } from "@/lib/weather/types";
import { clusterStormReports, formatSPCDescriptor } from "@/lib/weather/geo";
import { Search, Tornado, Wind, Zap, Layers, Navigation, RefreshCw, ChevronLeft, ChevronRight, MapPin, Eye, Info, AlertCircle, MessageSquare, Download, Trash2, ClipboardList } from "lucide-react";
import { StormLegend } from "./StormLegend";
import { LeadIntelligencePanel } from "./enrichment/LeadIntelligencePanel";
import { collectRadiusLeads } from "./enrichment/enrichment-client";
import { StormProductActionPanel, ProductType } from "./enrichment/StormProductActionPanel";
import { ProductRequestModal } from "./enrichment/ProductRequestModal";

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
  activeDetail: ActivePopupDetail | null;
  setActiveDetail: (detail: ActivePopupDetail | null | ((prev: ActivePopupDetail | null) => ActivePopupDetail | null)) => void;
  onSelectProperty?: (property: SelectedPropertyTarget | null) => void;
  onAddLeads?: (leads: SelectedPropertyTarget[]) => void;
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
  activeDetail,
  setActiveDetail,
  onSelectProperty,
  onAddLeads,
}: StormSidebarProps) {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [isSearching, setIsSearching] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState<"filters" | "targets" | "leads">("filters");
  const [loadingClusterId, setLoadingClusterId] = React.useState<string | null>(null);
  const [statusBanner, setStatusBanner] = React.useState<{ type: "success" | "error" | "info"; text: string } | null>(null);

  const [modalOpen, setModalOpen] = React.useState(false);
  const [modalProduct, setModalProduct] = React.useState<ProductType | null>(null);
  const [modalContextType, setModalContextType] = React.useState<"storm-area" | "property" | null>(null);
  const [modalContextData, setModalContextData] = React.useState<any | null>(null);

  const handleOpenRequestModal = (contextType: "storm-area" | "property", contextData: any, product: ProductType) => {
    setModalContextType(contextType);
    if (contextType === "storm-area") {
      const cluster = contextData as TargetCluster;
      setModalContextData({
        label: cluster.county ? `${cluster.county} County, ${cluster.state || "ST"}` : `${cluster.name}, ${cluster.state || "ST"}`,
        county: cluster.county,
        state: cluster.state,
        center: cluster.center,
        radius: cluster.suggestedRadius,
        reportsCount: cluster.reportsCount,
        primaryThreat: cluster.mainStormType,
        score: cluster.totalScore,
      });
    } else {
      const prop = contextData as SelectedPropertyTarget;
      setModalContextData({
        fullAddress: prop.fullAddress,
        latitude: prop.latitude,
        longitude: prop.longitude,
        city: prop.city,
        state: prop.state,
        postcode: prop.postcode,
        confidence: prop.confidence,
      });
    }
    setModalProduct(product);
    setModalOpen(true);
  };

  const handleCollectRadiusLeads = async (cluster: TargetCluster) => {
    setLoadingClusterId(cluster.id);
    setStatusBanner(null);
    try {
      const res = await collectRadiusLeads(cluster.center[0], cluster.center[1], cluster.suggestedRadius, cluster.id);
      if (res.leads && res.leads.length > 0) {
        if (onAddLeads) {
          onAddLeads(res.leads);
        }
        setStatusBanner({
          type: "success",
          text: `Added ${res.leads.length} properties from ${cluster.suggestedRadius} mi storm opportunity area.`
        });
      } else {
        setStatusBanner({
          type: "info",
          text: "No available properties found for this radius."
        });
      }
    } catch (err: any) {
      console.error(err);
      if (err.code === "PROVIDER_NOT_CONFIGURED" || err.message?.includes("provider")) {
        setStatusBanner({
          type: "error",
          text: "Bulk property lead collection is not enabled yet. Connect a property/contact provider to gather homeowners in this radius."
        });
      } else if (err.code === "FEATURE_DISABLED") {
        setStatusBanner({
          type: "error",
          text: "Lead intelligence is currently disabled on this server. The interface is ready, but homeowner/contact access is not active yet."
        });
      } else {
        setStatusBanner({
          type: "error",
          text: err.message || "Failed to collect radius properties."
        });
      }
    } finally {
      setLoadingClusterId(null);
    }
  };

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
    const headers = ["Address", "City", "State", "ZIP", "County", "Latitude", "Longitude", "Neighborhood", "Source", "Confidence", "Contact Available", "Property Details Available"];
    const rows = leads.map((lead) => [
      `"${lead.fullAddress.replace(/"/g, '""')}"`,
      `"${(lead.city || "").replace(/"/g, '""')}"`,
      `"${(lead.state || "").replace(/"/g, '""')}"`,
      `"${(lead.postcode || "").replace(/"/g, '""')}"`,
      `"${(lead.county || "").replace(/"/g, '""')}"`,
      lead.latitude,
      lead.longitude,
      `"${(lead.neighborhood || "").replace(/"/g, '""')}"`,
      `"${lead.source}"`,
      `"${lead.confidence}"`,
      lead.unlockId ? "Yes" : "Preview Available",
      lead.unlockId ? "Yes" : "Preview Available"
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
        {/* Unified Active Target Selection Panel (Property or Storm Area Context) */}
        {selectedProperty ? (
          <div className="mx-2.5 mt-2 mb-2 p-3 bg-slate-900/40 border border-emerald-500/25 rounded-lg flex flex-col gap-2.5 shrink-0 select-none animate-in fade-in duration-200">
            {/* Selected Property Summary */}
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-1.5 min-w-0">
                <MapPin size={13} className="text-emerald-500 mt-0.5 shrink-0" />
                <div className="min-w-0">
                  <span className="text-slate-500 font-bold uppercase text-[7px] block tracking-wider leading-none mb-1">
                    Selected Property
                  </span>
                  <h4 className="font-extrabold text-slate-100 text-[11px] leading-tight truncate" title={selectedProperty.fullAddress}>
                    {selectedProperty.fullAddress}
                  </h4>
                  {(selectedProperty.city || selectedProperty.state || selectedProperty.postcode) && (
                    <span className="text-slate-400 text-[9px] block mt-0.5">
                      {[
                        selectedProperty.city,
                        [selectedProperty.state, selectedProperty.postcode].filter(Boolean).join(" ")
                      ].filter(Boolean).join(", ")}
                    </span>
                  )}
                </div>
              </div>
              <button
                type="button"
                onClick={onUnlockProperty}
                className="text-[8.5px] font-black text-slate-505 hover:text-red-400 uppercase tracking-wider bg-slate-950 border border-slate-900 hover:border-red-950/30 px-1.5 py-0.5 rounded cursor-pointer shrink-0 transition-colors ml-2"
              >
                Clear
              </button>
            </div>

            {/* Masked Homeowner Contact Preview */}
            <div className="p-2 bg-slate-950/50 border border-slate-900 rounded-md text-[9px] font-mono text-slate-400 space-y-1 relative overflow-hidden">
              <div className="absolute inset-0 bg-slate-950/10 pointer-events-none flex items-center justify-center select-none opacity-20">
                <span className="font-black text-[10px] tracking-widest text-slate-800 uppercase rotate-6">
                  Preview
                </span>
              </div>
              <div className="flex justify-between items-center border-b border-slate-900/60 pb-1 mb-1">
                <span className="text-[7.5px] font-bold text-slate-500 uppercase tracking-wider">Contact Preview</span>
                <span className="text-[7.5px] font-bold text-emerald-400 bg-emerald-500/10 px-1 rounded">Available</span>
              </div>
              <div className="grid grid-cols-2 gap-x-2 gap-y-1">
                <div><span className="text-slate-650 text-[7px] block uppercase">Owner</span><strong>J*** D****</strong></div>
                <div><span className="text-slate-650 text-[7px] block uppercase">Phone</span><strong>(***) ***-1289</strong></div>
                <div><span className="text-slate-650 text-[7px] block uppercase">Email</span><strong className="block truncate">j***@g****.com</strong></div>
                <div><span className="text-slate-650 text-[7px] block uppercase">Roof</span><strong>Asphalt · 14-18 yrs</strong></div>
              </div>
            </div>

            {/* Product Actions */}
            <div className="border-t border-slate-950/40 pt-2">
              <StormProductActionPanel
                contextType="property"
                contextData={{
                  fullAddress: selectedProperty.fullAddress,
                  latitude: selectedProperty.latitude,
                  longitude: selectedProperty.longitude,
                  city: selectedProperty.city,
                  state: selectedProperty.state,
                  postcode: selectedProperty.postcode,
                  confidence: selectedProperty.confidence,
                }}
                onSelectProduct={(prod) => handleOpenRequestModal("property", selectedProperty, prod)}
              />
            </div>
          </div>
        ) : activeDetail && activeDetail.type === "cluster" ? (
          <div className="mx-2.5 mt-2 mb-2 p-3 bg-slate-900/40 border border-red-500/20 rounded-lg flex flex-col gap-2.5 shrink-0 select-none animate-in fade-in duration-200">
            {/* Selected Storm Area Summary */}
            {(() => {
              const cluster = activeDetail.data as TargetCluster;
              return (
                <>
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-1.5 min-w-0">
                      <Zap size={13} className="text-red-500 mt-0.5 shrink-0" />
                      <div className="min-w-0">
                        <span className="text-slate-500 font-bold uppercase text-[7px] block tracking-wider leading-none mb-1">
                          Selected Storm Area
                        </span>
                        <h4 className="font-extrabold text-slate-100 text-[11px] leading-tight truncate uppercase">
                          {cluster.county ? `${cluster.county} County` : "Storm Target"}, {cluster.state || "ST"}
                        </h4>
                        <span className="text-slate-400 text-[9px] block mt-0.5 truncate">
                          Approx. Area: {formatSPCDescriptor(cluster.name)}
                        </span>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setActiveDetail(null)}
                      className="text-[8.5px] font-black text-slate-505 hover:text-red-400 uppercase tracking-wider bg-slate-950 border border-slate-900 hover:border-red-950/30 px-1.5 py-0.5 rounded cursor-pointer shrink-0 transition-colors ml-2"
                    >
                      Clear
                    </button>
                  </div>

                  {/* Metrics Row */}
                  <div className="grid grid-cols-4 gap-1 text-center bg-slate-950/50 p-1.5 border border-slate-900 rounded-md text-[9px]">
                    <div>
                      <span className="text-slate-505 block text-[6.5px] uppercase font-bold">Threat</span>
                      <span className="font-extrabold text-slate-205 capitalize truncate block">{cluster.mainStormType}</span>
                    </div>
                    <div>
                      <span className="text-slate-505 block text-[6.5px] uppercase font-bold">Score</span>
                      <span className="font-extrabold text-red-400">{cluster.totalScore}</span>
                    </div>
                    <div>
                      <span className="text-slate-505 block text-[6.5px] uppercase font-bold">Radius</span>
                      <span className="font-extrabold text-slate-205">{cluster.suggestedRadius} mi</span>
                    </div>
                    <div>
                      <span className="text-slate-505 block text-[6.5px] uppercase font-bold">Reports</span>
                      <span className="font-extrabold text-slate-205">{cluster.reportsCount}</span>
                    </div>
                  </div>

                  {/* Product Actions */}
                  <div className="border-t border-slate-950/40 pt-2">
                    <StormProductActionPanel
                      contextType="storm-area"
                      contextData={{
                        label: cluster.county ? `${cluster.county} County, ${cluster.state || "ST"}` : `${cluster.name}, ${cluster.state || "ST"}`,
                        county: cluster.county,
                        state: cluster.state,
                        center: cluster.center,
                        radius: cluster.suggestedRadius,
                        reportsCount: cluster.reportsCount,
                        primaryThreat: cluster.mainStormType,
                        score: cluster.totalScore,
                      }}
                      onSelectProduct={(prod) => handleOpenRequestModal("storm-area", cluster, prod)}
                    />
                  </div>
                </>
              );
            })()}
          </div>
        ) : null}

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
            Property Leads
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
                <div className="flex items-center justify-between border-b border-slate-900/40 pb-1.5 px-0.5">
                  <span className="text-[8px] font-extrabold text-slate-500 uppercase tracking-wider">Reports Summary</span>
                  <div className="flex gap-0.5 bg-slate-950/60 p-0.5 rounded border border-slate-900/60">
                    {(["24h", "today", "yesterday"] as const).map((win) => (
                      <button
                        key={win}
                        type="button"
                        onClick={() => onFiltersChange({ timeWindow: win })}
                        className={`px-1.5 py-0.5 rounded text-[8px] font-extrabold capitalize transition-all cursor-pointer ${
                          filters.timeWindow === win
                            ? "bg-red-500/15 text-slate-200"
                            : "text-slate-500 hover:text-slate-300"
                        }`}
                      >
                        {win === "24h" ? "24h" : win}
                      </button>
                    ))}
                  </div>
                </div>
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

              {/* 2. SPC Reports & Legend (Side-by-Side Grid) */}
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
                  <span className="text-[8px] font-extrabold text-slate-500 uppercase tracking-wider block">Supporting Context Only</span>
                  <div className="bg-slate-950/40 p-1.5 rounded border border-slate-900/60 space-y-1 select-none">
                    <span className="text-[8px] font-extrabold text-slate-400 uppercase tracking-wider block border-b border-slate-900/40 pb-0.5">SPC Storm Reports</span>
                    <div className="flex flex-col gap-1 text-[9px] font-semibold">
                      <div className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB] shadow-glow-hail shrink-0"></span>
                        <span className="text-slate-400">Hail Reports (Royal Blue)</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#7C3AED] shadow-glow-wind shrink-0"></span>
                        <span className="text-slate-400">Damaging Wind (Violet)</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#DC2626] shadow-glow-tornado shrink-0"></span>
                        <span className="text-slate-400">Tornado Reports (Crimson Red)</span>
                      </div>
                    </div>
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
                          max="1.0"
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
              {statusBanner && (
                <div className={`p-3 rounded-lg border text-[10.5px] flex justify-between items-start ${
                  statusBanner.type === "success" ? "bg-emerald-950/20 border-emerald-500/30 text-emerald-400" :
                  statusBanner.type === "error" ? "bg-red-950/20 border-red-500/30 text-red-400" :
                  "bg-blue-950/20 border-blue-500/30 text-blue-400"
                }`}>
                  <span className="leading-normal flex-1">{statusBanner.text}</span>
                  <button onClick={() => setStatusBanner(null)} className="text-[10px] font-bold text-slate-500 hover:text-slate-350 ml-2 shrink-0">X</button>
                </div>
              )}

              <div className="bg-slate-900/40 border border-slate-900 rounded-lg p-3 text-[10.5px] text-slate-350 flex flex-col gap-1.5 shadow-sm">
                <div className="flex items-center gap-1.5 font-bold text-slate-200">
                  <Info size={13} className="text-red-500 shrink-0" />
                  <span>What Top Opportunities Shows</span>
                </div>
                <p className="leading-normal text-slate-400">
                  Top Opportunities groups nearby storm reports into high-priority roofing target areas. These are not individual home addresses. The location is an approximate storm report area from NOAA/SPC data. Click an opportunity to zoom into the storm-hit area, then click individual houses to view property and homeowner information.
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
                    {clusters.map((cluster) => {
                      const hasHighestImpact = cluster.highestMagnitude && 
                                                cluster.highestMagnitude !== "N/A" && 
                                                !cluster.highestMagnitude.includes("NaN") && 
                                                !cluster.highestMagnitude.includes("undefined") && 
                                                !cluster.highestMagnitude.includes("null");
                      return (
                        <div
                          key={cluster.id}
                          className="bg-slate-900/40 border border-slate-900 rounded-lg p-3 flex flex-col gap-2 relative group"
                        >
                          {/* Upper row */}
                          <div 
                            onClick={() => {
                              onSelectCoords(cluster.center, `${cluster.name}, ${cluster.state}`, 9.5);
                              setActiveDetail({
                                type: "cluster",
                                coordinates: cluster.center,
                                data: cluster,
                              });
                            }}
                            className="flex justify-between items-start gap-1.5 cursor-pointer"
                          >
                            <div className="truncate">
                              <h4 className="font-extrabold text-xs text-slate-200 uppercase truncate">
                                {cluster.county ? `${cluster.county} County` : "Unknown County"}, {cluster.state || "ST"} Storm Opportunity
                              </h4>
                              <span className="text-[10px] text-slate-400 block mt-0.5 truncate">
                                Approx. storm report area: {formatSPCDescriptor(cluster.name)}
                              </span>
                              <span className="text-[9px] text-slate-500 block leading-tight mt-1 max-w-[240px]">
                                This is a storm report area, not a property address. Click a house on the map to view property and homeowner information.
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

                          {/* New Metrics Layout */}
                          <div className="space-y-1.5 bg-slate-950/40 border border-slate-900/60 p-2 rounded text-[10px] text-slate-400">
                            <div className="flex justify-between items-center">
                              <span>Reports:</span>
                              <span className="font-bold text-slate-200">{cluster.reportsCount} storm reports</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span>Target Area:</span>
                              <span className="font-bold text-slate-200">{cluster.suggestedRadius} mi radius</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span>Primary Threat:</span>
                              <span className="font-bold text-slate-200 capitalize">
                                {cluster.mainStormType} · {
                                  cluster.mainStormType === "hail" ? cluster.hailCount :
                                  cluster.mainStormType === "wind" ? cluster.windCount :
                                  cluster.tornadoCount
                                } reports
                              </span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span>Opportunity Score:</span>
                              <span className="font-bold text-slate-200">{cluster.totalScore}</span>
                            </div>
                            {hasHighestImpact && (
                              <div className="flex justify-between items-center border-t border-slate-900/30 pt-1 mt-1">
                                <span>Highest Measured Impact:</span>
                                <span className="font-bold text-red-400">{cluster.highestMagnitude}</span>
                              </div>
                            )}
                          </div>

                          <p className="text-[8px] text-slate-550 leading-normal italic">
                            Opportunity Score combines storm type, report density, magnitude, recency, and active warning context. Higher scores indicate stronger roofing outreach potential.
                          </p>

                          {/* Tiny breakdown */}
                          <div className="flex gap-2 text-[9px] text-slate-500 font-semibold uppercase">
                            {cluster.hailCount > 0 && <span>Hail: {cluster.hailCount}</span>}
                            {cluster.windCount > 0 && <span>Wind: {cluster.windCount}</span>}
                            {cluster.tornadoCount > 0 && <span className="text-red-400">Torn: {cluster.tornadoCount}</span>}
                          </div>

                          {/* Add Properties in Radius Button */}
                          <div className="pt-1.5 border-t border-slate-900/30 flex gap-1.5 items-center justify-between">
                            <button
                              disabled={loadingClusterId === cluster.id}
                              onClick={(e) => {
                                e.stopPropagation();
                                handleCollectRadiusLeads(cluster);
                              }}
                              className="flex-1 py-1.5 px-3 rounded bg-red-650 hover:bg-red-600 disabled:bg-slate-800 disabled:text-slate-500 text-white text-[9.5px] font-black uppercase tracking-wider transition-all active:scale-[0.98] cursor-pointer flex items-center justify-center gap-1"
                            >
                              {loadingClusterId === cluster.id ? "Adding..." : "Add Properties in Radius"}
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                onSelectCoords(cluster.center, `${cluster.name}, ${cluster.state}`, 9.5);
                                setActiveDetail({
                                  type: "cluster",
                                  coordinates: cluster.center,
                                  data: cluster,
                                });
                              }}
                              className="py-1.5 px-2.5 rounded border border-slate-800 bg-slate-950 text-slate-400 hover:text-slate-200 text-[9.5px] font-black uppercase transition-all cursor-pointer flex items-center justify-center"
                              title="View on Map"
                            >
                              <Eye size={10} />
                            </button>
                          </div>
                        </div>
                      );
                    })}
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
                  <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">Saved Properties</span>
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
                  <p className="text-[11px] font-bold text-slate-350">No saved properties yet</p>
                  <p className="text-[9.5px] text-slate-600 max-w-[220px] leading-normal">
                    Click on any location or address on the map, then click <strong className="text-slate-400">"Access Homeowner Data"</strong> to add it here.
                  </p>
                </div>
              ) : (
                <div className="space-y-2">
                  {leads.map((lead) => {
                    const isActive = selectedProperty?.id === lead.id;
                    return (
                      <div
                        key={lead.id}
                        onClick={() => {
                          onSelectCoords([lead.latitude, lead.longitude], lead.fullAddress, 16.5);
                          setActiveDetail({
                            type: "address",
                            coordinates: [lead.latitude, lead.longitude],
                            data: { ...lead, locked: true },
                          });
                          if (onSelectProperty) {
                            onSelectProperty(lead);
                          }
                        }}
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

      {modalProduct && modalContextType && modalContextData && (
        <ProductRequestModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          productType={modalProduct}
          contextType={modalContextType}
          contextData={modalContextData}
          isEnrichmentEnabled={false}
          onAddLeads={(newLeads) => {
            if (onAddLeads) {
              onAddLeads(newLeads);
            }
          }}
          onTriggerEnrichmentFlow={() => {
            setActiveTab("leads");
          }}
        />
      )}
    </>
  );
}
export default StormSidebar;
