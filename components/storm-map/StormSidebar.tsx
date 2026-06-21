"use client";

import React from "react";
import { StormFilterState, StormReport, NwsAlert, TargetCluster, SelectedPropertyTarget, ActivePopupDetail, StormMapStyle } from "@/lib/weather/types";
import { clusterStormReports, formatSPCDescriptor, getDistanceMiles, expandBbox } from "@/lib/weather/geo";
import { allStates, getCountiesByState, USCounty, getCountyByStateAndName } from "@/lib/geo/us-counties";
import { Search, Tornado, Wind, Zap, Layers, Navigation, RefreshCw, ChevronLeft, ChevronRight, MapPin, Eye, Info, AlertCircle, MessageSquare, Download, Trash2, ClipboardList, Compass, ShieldAlert } from "lucide-react";
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
  isDemo?: boolean;
  demoStep?: number;
  tempState?: string;
  setTempState?: (state: string) => void;
  tempCounty?: USCounty | null;
  setTempCounty?: (county: USCounty | null) => void;
  tempRadius?: number;
  setTempRadius?: (radius: number) => void;
  scanStatus?: "idle" | "scanning" | "complete";
  scanNonce?: number;
  onScanStart?: (selectedState: string, selectedCounty: string, selectedRadius: number) => void;
  onOpenSampleModal?: () => void;
  onOpenUpgradeModal?: () => void;
  resultLeadEstimate?: number | null;
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
  isDemo = false,
  demoStep = 0,
  tempState,
  setTempState,
  tempCounty,
  setTempCounty,
  tempRadius,
  setTempRadius,
  scanStatus = "idle",
  scanNonce = 0,
  onScanStart,
  onOpenSampleModal,
  onOpenUpgradeModal,
  resultLeadEstimate = null,
}: StormSidebarProps) {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [isSearching, setIsSearching] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState<"filters" | "targets" | "leads">("filters");

  const [logs, setLogs] = React.useState<string[]>([]);
  React.useEffect(() => {
    if (scanStatus === "scanning") {
      setLogs([]);
      const startTimestamp = new Date().toLocaleTimeString();
      const messages = [
        `[${startTimestamp}] INIT: Satellite connection established`,
        `[${startTimestamp}] TARGET: Locking territory at ${tCounty?.countyFullName || filters.selectedCounty || "Target Area"}, ${tState || filters.state}`,
        `[${startTimestamp}] RADAR: Initializing NOAA reflectivity sweep`,
        `[${startTimestamp}] WEATHER: Querying live storm cells`,
        `[${startTimestamp}] ALERTS: Fetching NWS hazard polygons`,
        `[${startTimestamp}] CALC: Running proprietary B2B estimator formula`,
        `[${startTimestamp}] COMPILING: Generating mock target file...`,
        `[${startTimestamp}] DONE: Territory locked. Visualizing results.`,
      ];
      
      const timeouts = messages.map((msg, i) => 
        setTimeout(() => {
          setLogs((prev) => [...prev, msg]);
        }, i * 200)
      );
      return () => timeouts.forEach(clearTimeout);
    }
  }, [scanStatus, tCounty, tState, filters.selectedCounty, filters.state]);

  const handleScanTerritory = () => {
    if (!tState || !tCounty) return;
    if (onScanStart) {
      onScanStart(tState, tCounty.countyName, tRadius);
    }
  };

  // Guided Selector local inputs state
  const [localTempState, setLocalTempState] = React.useState(filters.state || "");
  const [localTempCounty, setLocalTempCounty] = React.useState<USCounty | null>(null);
  const [localTempRadius, setLocalTempRadius] = React.useState(filters.radius || 15);

  const tState = tempState !== undefined ? tempState : localTempState;
  const setTState = setTempState !== undefined ? setTempState : setLocalTempState;

  const tCounty = tempCounty !== undefined ? tempCounty : localTempCounty;
  const setTCounty = setTempCounty !== undefined ? setTempCounty : setLocalTempCounty;

  const tRadius = tempRadius !== undefined ? tempRadius : localTempRadius;
  const setTRadius = setTempRadius !== undefined ? setTempRadius : setLocalTempRadius;

  const [countySearchQuery, setCountySearchQuery] = React.useState("");
  const [countyDropdownOpen, setCountyDropdownOpen] = React.useState(false);
  const [stateDropdownOpen, setStateDropdownOpen] = React.useState(false);
  const [radiusDropdownOpen, setRadiusDropdownOpen] = React.useState(false);

  // Auto-open dropdowns depending on demo step
  React.useEffect(() => {
    if (isDemo) {
      if (demoStep === 2) {
        setStateDropdownOpen(true);
        setCountyDropdownOpen(false);
        setRadiusDropdownOpen(false);
      } else if (demoStep === 3) {
        setStateDropdownOpen(false);
        setCountyDropdownOpen(true);
        setRadiusDropdownOpen(false);
      } else if (demoStep === 4) {
        setStateDropdownOpen(false);
        setCountyDropdownOpen(false);
        setRadiusDropdownOpen(true);
      } else {
        setStateDropdownOpen(false);
        setCountyDropdownOpen(false);
        setRadiusDropdownOpen(false);
      }
    }
  }, [demoStep, isDemo]);

  React.useEffect(() => {
    if (!filters.center) {
      setTState("");
      setTCounty(null);
      setTRadius(15);
      setCountySearchQuery("");
      setCountyDropdownOpen(false);
    } else {
      if (filters.state) {
        setTState(filters.state);
      }
      if (filters.radius) {
        setTRadius(filters.radius);
      }
      if (filters.selectedCounty && filters.state) {
        const county = getCountyByStateAndName(filters.state, filters.selectedCounty);
        if (county) {
          setTCounty(county);
        }
      }
    }
  }, [filters.center, filters.state, filters.selectedCounty, filters.radius]);

  const filteredCounties = React.useMemo(() => {
    if (!tState) return [];
    const list = getCountiesByState(tState);
    if (!countySearchQuery.trim()) return list;
    const q = countySearchQuery.toLowerCase().trim();
    return list.filter(
      (c) =>
        c.countyName.toLowerCase().includes(q) ||
        c.countyFullName.toLowerCase().includes(q)
    );
  }, [tState, countySearchQuery]);
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
      const res = await collectRadiusLeads(
        cluster.center[0],
        cluster.center[1],
        cluster.suggestedRadius,
        cluster.id,
        { county: cluster.county, state: cluster.state }
      );
      if (res.leads && res.leads.length > 0) {
        if (onAddLeads) {
          onAddLeads(res.leads);
        }
        setStatusBanner({
          type: "success",
          text: `Added ${res.leads.length} properties from this ${cluster.suggestedRadius} mi storm area.`
        });
        setActiveTab("leads");
      } else {
        setStatusBanner({
          type: "info",
          text: res.message || "No address-tagged properties were returned for this storm area."
        });
      }
    } catch (err: any) {
      console.error(err);
      if (err.code === "PROVIDER_NOT_CONFIGURED" || err.message?.includes("provider")) {
        setStatusBanner({
          type: "error",
          text: "Bulk property lead collection is not enabled yet. Connect a radius-capable property/address provider to gather properties in this storm area."
        });
      } else if (err.code === "FEATURE_DISABLED") {
        setStatusBanner({
          type: "error",
          text: "Lead intelligence is currently disabled on this server. The interface is ready, but homeowner/contact access is not active yet."
        });
      } else if (err.code === "PROVIDER_TIMEOUT") {
        setStatusBanner({
          type: "error",
          text: "Unable to gather address records from the radius provider right now. Please try again."
        });
      } else if (err.code === "PROVIDER_ERROR") {
        setStatusBanner({
          type: "error",
          text: "The address provider returned an error. Please try again."
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

  // Guided Search Submit
  const handleSearchSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!tState || !tCounty) return;

    onFiltersChange({ searchStatus: "loading" });
    
    // Simulate B2B scan latency
    setTimeout(() => {
      onFiltersChange({
        center: [tCounty.latitude, tCounty.longitude],
        state: tState,
        radius: tRadius,
        selectedCounty: tCounty.countyName,
        selectedCountyFull: tCounty.countyFullName,
        selectedCountyFips: tCounty.fips,
        countyBbox: tCounty.bbox,
        searchStatus: "complete",
        searchQuery: `${tCounty.countyFullName}, ${tState}`
      });
    }, 1200);
  };

  const handleClearSearch = () => {
    setSearchQuery("");
    onFiltersChange({
      center: null,
      searchQuery: "",
      state: "",
      selectedCounty: undefined,
      selectedCountyFull: undefined,
      selectedCountyFips: undefined,
      countyBbox: undefined,
      searchStatus: "empty"
    });
  };

  const handleExportCSV = () => {
    if (leads.length === 0) return;
    const headers = [
      "Address", "City", "State", "ZIP", "County",
      "Latitude", "Longitude",
      "Source", "Confidence",
      "Contact Available", "Property Details Available"
    ];
    const rows = leads.map((lead: any) => [
      `"${lead.fullAddress.replace(/"/g, '""')}"`,
      `"${(lead.city || "").replace(/"/g, '""')}"`,
      `"${(lead.state || "").replace(/"/g, '""')}"`,
      `"${(lead.postcode || "").replace(/"/g, '""')}"`,
      `"${(lead.county || "").replace(/"/g, '""')}"`,
      lead.latitude,
      lead.longitude,
      `"${lead.source || "map-click"}"`,
      `"${lead.confidence || "unknown"}"`,
      lead.contactAvailable === false ? "No" : lead.unlockId ? "Yes" : "Preview Available",
      lead.propertyDetailsAvailable === false ? "No" : lead.unlockId ? "Yes" : "Preview Available"
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
      
      // Radius and County Bounding Box filter
      if (filters.center && filters.radius > 0) {
        const dist = getDistanceMiles(filters.center[0], filters.center[1], r.lat, r.lon);
        let inBbox = false;
        if (filters.countyBbox) {
          const exp = expandBbox(filters.countyBbox, filters.radius, filters.center[0]);
          inBbox = r.lon >= exp[0] && r.lon <= exp[2] && r.lat >= exp[1] && r.lat <= exp[3];
        }
        if (dist > filters.radius && !inBbox) {
          return false;
        }
      }

      // Report type toggles
      if (r.type === "hail") {
        if (!filters.showHail) return false;
        const sizeFloat = parseFloat(r.magnitude || "");
        const displaySize = !isNaN(sizeFloat) ? (sizeFloat > 10 ? sizeFloat / 100 : sizeFloat) : 0;
        if (displaySize < filters.minHailSize) return false;
      }
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
        className={`fixed md:relative top-[56px] md:top-0 h-[calc(100vh-56px)] md:h-full z-[1000] md:z-10 flex flex-col overflow-hidden transition-all duration-300 ${
          sidebarOpen ? "w-[360px]" : "w-0 md:w-0 border-r-0"
        }`}
        style={{
          background: "linear-gradient(180deg, #071426 0%, #050B16 100%)",
          borderRight: sidebarOpen ? "1px solid rgba(20, 92, 255, 0.20)" : "none"
        }}
      >
        {/* Logo & Controls Header */}
        <div className="p-3 border-b border-[#145CFF]/20 bg-[#071426]/50 flex items-center justify-between shrink-0 select-none">
          <div className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_#10b981]"></span>
            <span className="text-[11px] font-black uppercase tracking-widest text-[#F8FAFC]">
              STORM TARGET INTEL
            </span>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            <a
              href="https://sms.leadzer.io"
              target="_blank"
              rel="noopener noreferrer"
              className="p-1 rounded border border-[#145CFF]/15 text-slate-400 hover:text-[#F8FAFC] bg-[#0B1930]/40 hover:bg-[#145CFF]/10 hover:border-[#145CFF]/30 transition-all flex items-center gap-0.5 text-[9px] font-extrabold uppercase"
              title="Open SMS App"
            >
              <MessageSquare size={10} className="text-[#145CFF] shrink-0" />
              <span>SMS</span>
            </a>
            <button
              onClick={onResetView}
              className="p-1 rounded border border-[#145CFF]/15 text-slate-400 hover:text-[#F8FAFC] bg-[#0B1930]/40 hover:bg-[#145CFF]/10 hover:border-[#145CFF]/30 transition-all"
              title="Reset Map Bounds"
              type="button"
            >
              <Navigation size={10} />
            </button>
            <button
              onClick={onRefresh}
              disabled={isRefreshing}
              className="p-1 rounded border border-[#145CFF]/15 text-slate-400 hover:text-[#F8FAFC] bg-[#0B1930]/40 hover:bg-[#145CFF]/10 hover:border-[#145CFF]/30 transition-all"
              title="Refresh Weather Data"
              type="button"
            >
              <RefreshCw size={10} className={isRefreshing ? "animate-spin" : ""} />
            </button>
            <button
              onClick={() => setSidebarOpen(false)}
              className="p-1 rounded border border-[#145CFF]/15 text-slate-400 hover:text-[#F8FAFC] bg-[#0B1930]/40 hover:bg-[#145CFF]/10 hover:border-[#145CFF]/30 transition-all md:hidden"
              title="Close Sidebar"
              type="button"
            >
              <ChevronLeft size={10} />
            </button>
          </div>
        </div>

        {/* Results Header Status banner */}
        {filters.selectedCounty && filters.state && scanStatus !== "scanning" && (
          <div className="mx-3 mt-2 bg-[#0E8F6E]/8 border border-[#0E8F6E]/20 rounded-lg p-2 flex items-center justify-between text-[9px] text-[#0E8F6E] font-extrabold uppercase tracking-wide shrink-0 select-none animate-in fade-in duration-200">
            <span className="truncate">
              Locked: {filters.selectedCounty}, {filters.state}
            </span>
            <span className="flex h-1.5 w-1.5 relative shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#0E8F6E] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#0E8F6E]"></span>
            </span>
          </div>
        )}

        {/* Target location display (Only when active and not scanning) */}
        {filters.center && scanStatus !== "scanning" && (
          <div className="px-2.5 py-1.5 border-b border-[#145CFF]/15 bg-[#0B1930]/20 text-[9px] text-slate-400 flex items-center justify-between gap-1 shrink-0">
            <div className="flex items-center gap-1 truncate">
              <MapPin size={9} className="text-[#145CFF] shrink-0" />
              <span className="truncate font-semibold" title={filters.searchQuery || "Selected Center"}>
                Target: {filters.searchQuery || "Geocoded Point"}
              </span>
            </div>
            <button
              type="button"
              onClick={handleClearSearch}
              className="text-[8px] font-extrabold text-[#145CFF] hover:text-[#2570FF] uppercase shrink-0"
            >
              Clear
            </button>
          </div>
        )}
        {/* Unified Active Target Selection Panel (Storm Area Context) */}
        {activeDetail && activeDetail.type === "cluster" ? (
          <div className="mx-2.5 mt-2 mb-2 p-3 bg-[rgba(11,25,48,0.72)] border border-[rgba(20,92,255,0.20)] rounded-xl flex flex-col gap-2.5 shrink-0 select-none animate-in fade-in duration-200 max-h-[380px] md:max-h-[420px] overflow-y-auto custom-scrollbar pb-4 shadow-lg shadow-black/30 backdrop-blur-md">
            {/* Selected Storm Area Summary */}
            {(() => {
              const cluster = activeDetail.data as TargetCluster;
              const stormColor = cluster.mainStormType === "tornado" ? "text-[#F43F5E]" : cluster.mainStormType === "wind" ? "text-[#8B5CF6]" : "text-[#2F7DFF]";
              return (
                <>
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-1.5 min-w-0">
                      <Zap size={13} className={`${stormColor} mt-0.5 shrink-0 animate-pulse`} />
                      <div className="min-w-0">
                        <span className="text-[#64748B] font-bold uppercase text-[7px] block tracking-wider leading-none mb-1">
                          Selected Storm Area
                        </span>
                        <h4 className="font-extrabold text-[#F8FAFC] text-[11px] leading-tight truncate uppercase">
                          {cluster.county ? `${cluster.county} County` : "Storm Target"}, {cluster.state || "ST"}
                        </h4>
                        <span className="text-[#94A3B8] text-[9px] block mt-0.5 truncate">
                          Approx. Area: {formatSPCDescriptor(cluster.name)}
                        </span>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setActiveDetail(null)}
                      className="text-[8.5px] font-bold text-[#94A3B8] hover:text-[#F8FAFC] uppercase tracking-wider bg-[rgba(20,92,255,0.08)] hover:bg-[rgba(20,92,255,0.16)] border border-[rgba(20,92,255,0.20)] px-2 py-0.5 rounded transition-all cursor-pointer shrink-0 ml-2"
                    >
                      Clear
                    </button>
                  </div>

                  {/* Metrics Row */}
                  <div className="grid grid-cols-4 gap-1 text-center bg-[#050B16]/70 p-1.5 border border-[rgba(20,92,255,0.14)] rounded-lg text-[9px] shadow-inner">
                    <div>
                      <span className="text-[#64748B] block text-[6.5px] uppercase font-bold">Threat</span>
                      <span className="font-extrabold text-[#F8FAFC] capitalize truncate block">{cluster.mainStormType}</span>
                    </div>
                    <div>
                      <span className="text-[#64748B] block text-[6.5px] uppercase font-bold">Score</span>
                      <span className="font-extrabold text-[#F8FAFC]">{cluster.totalScore}</span>
                    </div>
                    <div>
                      <span className="text-[#64748B] block text-[6.5px] uppercase font-bold">Radius</span>
                      <span className="font-extrabold text-[#F8FAFC]">{cluster.suggestedRadius} mi</span>
                    </div>
                    <div>
                      <span className="text-[#64748B] block text-[6.5px] uppercase font-bold">Reports</span>
                      <span className="font-extrabold text-[#F8FAFC]">{cluster.reportsCount}</span>
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
        {scanStatus !== "scanning" && (
          <div className={`flex border-b border-[rgba(20,92,255,0.14)] bg-[#050B16]/80 backdrop-blur-md transition-all duration-300 ${
            isDemo && demoStep >= 2 && demoStep <= 8 ? "opacity-20 pointer-events-none blur-[1px]" : ""
          }`}>
            <button
              onClick={() => setActiveTab("filters")}
              className={`flex-1 py-2.5 text-center text-[10px] font-extrabold transition-all border-b-2 uppercase ${
                activeTab === "filters"
                  ? "border-[#145CFF] text-[#F8FAFC] bg-[rgba(20,92,255,0.08)]"
                  : "border-transparent text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-[#145CFF]/5"
              }`}
            >
              FILTERS
            </button>
            <button
              onClick={() => setActiveTab("targets")}
              className={`flex-1 py-2.5 text-center text-[10px] font-extrabold transition-all border-b-2 flex items-center justify-center gap-1.5 uppercase ${
                activeTab === "targets"
                  ? "border-[#145CFF] text-[#F8FAFC] bg-[rgba(20,92,255,0.08)]"
                  : "border-transparent text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-[#145CFF]/5"
              }`}
            >
              OPPORTUNITIES
              {clusters.length > 0 && (
                <span className="px-1.5 py-0.5 rounded-md bg-[rgba(20,92,255,0.14)] text-[#145CFF] border border-[rgba(20,92,255,0.24)] text-[8px] font-extrabold">
                  {clusters.length}
                </span>
              )}
            </button>
            <button
              onClick={() => setActiveTab("leads")}
              className={`flex-1 py-2.5 text-center text-[10px] font-extrabold transition-all border-b-2 flex items-center justify-center gap-1.5 uppercase ${
                activeTab === "leads"
                  ? "border-[#145CFF] text-[#F8FAFC] bg-[rgba(20,92,255,0.08)]"
                  : "border-transparent text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-[#145CFF]/5"
              }`}
            >
              Property Leads
              {leads.length > 0 && (
                <span className="px-1.5 py-0.5 rounded-md bg-[#0E8F6E]/16 text-[#00A86B] border border-[#0E8F6E]/30 text-[8px] font-extrabold animate-pulse">
                  {leads.length}
                </span>
              )}
            </button>
          </div>
        )}

        {/* Tab Contents OR Scanning HUD */}
        {scanStatus === "scanning" ? (
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            <div className="bg-[#0B1930]/72 border border-[#145CFF]/25 rounded-xl p-4 text-center space-y-4 shadow-xl select-none animate-pulse">
              <div className="relative w-12 h-12 mx-auto flex items-center justify-center">
                <div className="absolute inset-0 rounded-full border-2 border-[#145CFF]/20 border-t-[#145CFF] animate-spin" />
                <Compass className="w-5 h-5 text-[#145CFF]" />
              </div>
              <div className="space-y-1">
                <h4 className="font-extrabold text-[#F8FAFC] text-[11px] uppercase tracking-widest text-[#2F7DFF] flex items-center justify-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-ping"></span>
                  Radar Scan Active
                </h4>
                <p className="text-[9.5px] text-slate-400 font-semibold">
                  Analyzing {tCounty?.countyFullName || filters.selectedCounty || "territory"}, {tState || filters.state}
                </p>
              </div>
            </div>

            <div className="space-y-1.5">
              <span className="text-[8px] font-extrabold text-[#64748B] uppercase tracking-wider block px-0.5">
                HUD Tactical Scan Logs
              </span>
              <div className="font-mono text-[9px] text-[#00FF66] bg-black/95 p-3 rounded-lg border border-[#145CFF]/30 h-56 overflow-y-auto space-y-1 shadow-inner custom-scrollbar text-left">
                {logs.map((log, i) => (
                  <div key={i} className="animate-in fade-in duration-100">{log}</div>
                ))}
                <div className="w-1.5 h-3 bg-[#00FF66] inline-block animate-pulse"></div>
              </div>
            </div>
          </div>
        ) : (
          <div className={`flex-1 overflow-y-auto p-2 space-y-3.5 custom-scrollbar transition-all duration-300 ${
            isDemo && demoStep >= 2 && demoStep <= 8 ? "opacity-20 pointer-events-none blur-[1px]" : ""
          }`}>
            {activeTab === "filters" && (
              <div className="space-y-3.5">
                {/* Step 1: Select Territory */}
                <div className="bg-[rgba(11,25,48,0.72)] border border-[rgba(20,92,255,0.14)] rounded-xl p-3.5 space-y-3 shadow-lg shadow-black/20 text-left">
                  <div className="flex items-center gap-2 border-b border-slate-900/40 pb-1.5">
                    <div className="flex h-5 w-5 items-center justify-center rounded-full bg-[#145CFF] text-white text-[10px] font-black">1</div>
                    <h3 className="text-[10.5px] font-black uppercase tracking-wider text-slate-200">Select Territory</h3>
                  </div>

                  <div className="grid grid-cols-12 gap-2">
                    {/* State Input */}
                    <div className="col-span-4 flex flex-col gap-1 relative">
                      <label className="text-[8px] font-bold text-slate-400 uppercase tracking-wider">State</label>
                      <div className="relative">
                        <button
                          type="button"
                          onClick={() => {
                            setStateDropdownOpen(!stateDropdownOpen);
                            setCountyDropdownOpen(false);
                            setRadiusDropdownOpen(false);
                          }}
                          className="w-full bg-[#050B16] border border-[#145CFF]/25 rounded-lg px-2 py-1.5 text-xs text-[#F8FAFC] font-extrabold focus:outline-none focus:border-[#145CFF] flex items-center justify-between min-h-[32px] cursor-pointer"
                        >
                          <span className="truncate">{tState || "ST"}</span>
                          <ChevronRight className="text-slate-500 rotate-90 shrink-0" size={10} />
                        </button>

                        {stateDropdownOpen && (
                          <div className="absolute top-10 left-0 bg-[#071426] border border-[#145CFF]/30 rounded-lg shadow-2xl z-[1050] p-2 space-y-1.5 max-h-48 flex flex-col w-[120px]">
                            <div className="flex-1 overflow-y-auto space-y-0.5 pr-0.5 custom-scrollbar">
                              {allStates.map((st) => (
                                <button
                                  key={st.code}
                                  type="button"
                                  onClick={() => {
                                    setTState(st.code);
                                    setTCounty(null);
                                    setCountySearchQuery("");
                                    setStateDropdownOpen(false);
                                  }}
                                  className="w-full flex items-center justify-between px-2 py-1 text-xs rounded font-semibold text-left transition-all cursor-pointer text-slate-350 hover:text-[#F8FAFC] hover:bg-[#145CFF]/10"
                                >
                                  <span>{st.code}</span>
                                </button>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* County Input */}
                    <div className="col-span-8 flex flex-col gap-1 relative">
                      <label className="text-[8px] font-bold text-slate-400 uppercase tracking-wider">County</label>
                      <button
                        type="button"
                        disabled={!tState}
                        onClick={() => {
                          setCountyDropdownOpen(!countyDropdownOpen);
                          setStateDropdownOpen(false);
                          setRadiusDropdownOpen(false);
                        }}
                        className="w-full bg-[#050B16] border border-[#145CFF]/25 rounded-lg px-2.5 py-1.5 text-xs text-left text-[#F8FAFC] font-extrabold focus:outline-none focus:border-[#145CFF] disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-between min-h-[32px] cursor-pointer"
                      >
                        <span className="truncate">
                          {tCounty ? tCounty.countyName : "Select County"}
                        </span>
                        <ChevronRight className="text-slate-500 rotate-90 shrink-0" size={10} />
                      </button>

                      {countyDropdownOpen && tState && (
                        <div className="absolute top-10 left-0 right-0 bg-[#071426] border border-[#145CFF]/30 rounded-lg shadow-2xl z-[1050] p-2 space-y-1.5 max-h-48 flex flex-col w-[200px]">
                          <div className="relative shrink-0">
                            <input
                              type="text"
                              value={countySearchQuery}
                              onChange={(e) => setCountySearchQuery(e.target.value)}
                              placeholder="Filter counties..."
                              className="w-full bg-[#050B16] border border-[#145CFF]/20 rounded px-2.5 py-1 text-xs text-[#F8FAFC] placeholder:text-slate-500 focus:outline-none focus:border-[#145CFF]"
                            />
                            <Search className="absolute right-2.5 top-2 text-slate-500" size={11} />
                          </div>

                          <div className="flex-1 overflow-y-auto space-y-0.5 pr-0.5 custom-scrollbar">
                            {filteredCounties.length === 0 ? (
                              <div className="text-center text-[10px] text-slate-500 py-2 italic">
                                No counties found
                              </div>
                            ) : (
                              filteredCounties.map((c) => (
                                <button
                                  key={c.fips}
                                  type="button"
                                  onClick={() => {
                                    setTCounty(c);
                                    setCountyDropdownOpen(false);
                                  }}
                                  className="w-full flex items-center justify-between px-2 py-1 text-xs rounded font-semibold text-left transition-all cursor-pointer text-slate-350 hover:text-[#F8FAFC] hover:bg-[#145CFF]/10"
                                >
                                  <span>{c.countyFullName}</span>
                                  {tCounty?.fips === c.fips && (
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

                  {/* Radius Button Group */}
                  <div className="flex flex-col gap-1 relative">
                    <label className="text-[8px] font-bold text-slate-400 uppercase tracking-wider">Search Radius (Miles)</label>
                    <div className="flex flex-wrap gap-1">
                      {[5, 10, 15, 25, 50, 75, 100].map((r) => {
                        const isSelected = tRadius === r;
                        return (
                          <button
                            key={r}
                            type="button"
                            onClick={() => setTRadius(r)}
                            className={`flex-1 py-1.5 px-1 text-center text-[10px] font-extrabold rounded-lg border transition-all cursor-pointer ${
                              isSelected
                                ? "bg-[#145CFF]/20 border-[#145CFF] text-[#F8FAFC] shadow-sm shadow-[#145CFF]/10"
                                : "bg-[#050B16] border-slate-700/30 text-slate-450 hover:text-[#F8FAFC] hover:border-slate-500/50"
                            }`}
                          >
                            {r}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Step 2: Choose Storm Signals */}
                <div className={`bg-[rgba(11,25,48,0.72)] border border-[rgba(20,92,255,0.14)] rounded-xl p-3.5 space-y-3 shadow-lg shadow-black/20 text-left transition-opacity duration-300 ${
                  !tState || !tCounty ? "opacity-45 pointer-events-none" : ""
                }`}>
                  <div className="flex items-center gap-2 border-b border-slate-900/40 pb-1.5">
                    <div className={`flex h-5 w-5 items-center justify-center rounded-full text-white text-[10px] font-black ${
                      !tState || !tCounty ? "bg-slate-700 text-slate-400" : "bg-[#145CFF]"
                    }`}>2</div>
                    <h3 className="text-[10.5px] font-black uppercase tracking-wider text-slate-200">Choose Storm Signals</h3>
                  </div>

                  <div className="space-y-2.5">
                    <span className="text-[8px] font-bold text-[#64748B] uppercase tracking-wider block">Acquisition Channels</span>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => onFiltersChange({ showHail: !filters.showHail })}
                        className={`flex items-center justify-between p-2 rounded-lg border text-left transition-all cursor-pointer ${
                          filters.showHail
                            ? "bg-[#2F7DFF]/10 border-[#2F7DFF] text-[#F8FAFC] shadow-sm shadow-[#2F7DFF]/5"
                            : "bg-[#050B16] border-slate-750 text-slate-450 hover:text-slate-350 hover:border-slate-500/50"
                        }`}
                      >
                        <div className="flex items-center gap-1.5">
                          <Zap size={12} className={filters.showHail ? "text-[#2F7DFF]" : "text-slate-600"} />
                          <span className="text-[10px] font-black uppercase">Hail</span>
                        </div>
                        {filters.showHail && <span className="w-1.5 h-1.5 rounded-full bg-[#2F7DFF] shadow-[0_0_8px_#2f7dff]"></span>}
                      </button>

                      <button
                        type="button"
                        onClick={() => onFiltersChange({ showWind: !filters.showWind })}
                        className={`flex items-center justify-between p-2 rounded-lg border text-left transition-all cursor-pointer ${
                          filters.showWind
                            ? "bg-[#8B5CF6]/10 border-[#8B5CF6] text-[#F8FAFC] shadow-sm shadow-[#8B5CF6]/5"
                            : "bg-[#050B16] border-slate-750 text-slate-450 hover:text-slate-350 hover:border-slate-500/50"
                        }`}
                      >
                        <div className="flex items-center gap-1.5">
                          <Wind size={12} className={filters.showWind ? "text-[#8B5CF6]" : "text-slate-650"} />
                          <span className="text-[10px] font-black uppercase">Wind</span>
                        </div>
                        {filters.showWind && <span className="w-1.5 h-1.5 rounded-full bg-[#8B5CF6] shadow-[0_0_8px_#8b5cf6]"></span>}
                      </button>

                      <button
                        type="button"
                        onClick={() => onFiltersChange({ showTornado: !filters.showTornado })}
                        className={`flex items-center justify-between p-2 rounded-lg border text-left transition-all cursor-pointer ${
                          filters.showTornado
                            ? "bg-[#F43F5E]/10 border-[#F43F5E] text-[#F8FAFC] shadow-sm shadow-[#F43F5E]/5"
                            : "bg-[#050B16] border-slate-750 text-slate-450 hover:text-slate-350 hover:border-slate-500/50"
                        }`}
                      >
                        <div className="flex items-center gap-1.5">
                          <Tornado size={12} className={filters.showTornado ? "text-[#F43F5E]" : "text-slate-650"} />
                          <span className="text-[10px] font-black uppercase">Tornado</span>
                        </div>
                        {filters.showTornado && <span className="w-1.5 h-1.5 rounded-full bg-[#F43F5E] shadow-[0_0_8px_#f43f5e]"></span>}
                      </button>

                      <button
                        type="button"
                        onClick={() => onFiltersChange({ showAlerts: !filters.showAlerts })}
                        className={`flex items-center justify-between p-2 rounded-lg border text-left transition-all cursor-pointer ${
                          filters.showAlerts
                            ? "bg-[#FBBF24]/10 border-[#FBBF24] text-[#F8FAFC] shadow-sm shadow-[#FBBF24]/5"
                            : "bg-[#050B16] border-slate-750 text-slate-450 hover:text-slate-350 hover:border-slate-500/50"
                        }`}
                      >
                        <div className="flex items-center gap-1.5">
                          <ShieldAlert size={12} className={filters.showAlerts ? "text-[#FBBF24]" : "text-slate-650"} />
                          <span className="text-[10px] font-black uppercase">Alerts</span>
                        </div>
                        {filters.showAlerts && <span className="w-1.5 h-1.5 rounded-full bg-[#FBBF24] shadow-[0_0_8px_#fbbf24]"></span>}
                      </button>
                    </div>

                    {filters.showHail && (
                      <div className="flex items-center justify-between bg-[#050B16]/50 p-2 rounded-lg border border-[rgba(20,92,255,0.10)] mt-2">
                        <span className="text-[9px] text-[#94A3B8] font-bold uppercase tracking-wider">Min Hail Size</span>
                        <select
                          value={filters.minHailSize}
                          onChange={(e) => onFiltersChange({ minHailSize: parseFloat(e.target.value) })}
                          className="bg-[#050B16] border border-[#145CFF]/20 hover:border-[#145CFF]/45 rounded px-2 py-1 text-[9px] font-extrabold text-[#F8FAFC] focus:outline-none focus:ring-1 focus:ring-[#145CFF]/55 cursor-pointer appearance-none pr-5 relative text-right"
                          style={{
                            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%2394A3B8'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='3' d='M19 9l-7 7-7-7'/%3E%3C/svg%3E")`,
                            backgroundRepeat: 'no-repeat',
                            backgroundPosition: 'right 4px center',
                            backgroundSize: '8px',
                          }}
                        >
                          <option value="0">All Sizes</option>
                          <option value="1.0">≥ 1.00" (Severe)</option>
                          <option value="1.5">≥ 1.50"</option>
                          <option value="2.0">≥ 2.00" (Significant)</option>
                        </select>
                      </div>
                    )}
                  </div>
                </div>

                {/* Step 3: Scan Territory */}
                <div className={`bg-[rgba(11,25,48,0.72)] border border-[rgba(20,92,255,0.14)] rounded-xl p-3.5 space-y-3 shadow-lg shadow-black/20 text-left transition-opacity duration-300 ${
                  !tState || !tCounty ? "opacity-45 pointer-events-none" : ""
                }`}>
                  <div className="flex items-center gap-2 border-b border-slate-900/40 pb-1.5">
                    <div className={`flex h-5 w-5 items-center justify-center rounded-full text-white text-[10px] font-black ${
                      !tState || !tCounty ? "bg-slate-700 text-slate-400" : "bg-[#145CFF]"
                    }`}>3</div>
                    <h3 className="text-[10.5px] font-black uppercase tracking-wider text-slate-200">Scan Territory</h3>
                  </div>

                  <button
                    type="button"
                    disabled={!tState || !tCounty}
                    onClick={handleScanTerritory}
                    className="w-full py-2.5 px-4 rounded-lg bg-gradient-to-r from-[#145CFF] to-[#2570FF] hover:from-[#2570FF] hover:to-[#3b82f6] disabled:from-[#145CFF]/10 disabled:to-[#145CFF]/10 disabled:text-[#145CFF]/30 disabled:cursor-not-allowed border-none text-[#F8FAFC] font-black uppercase text-[10.5px] tracking-widest transition-all flex items-center justify-center gap-2 shadow-md shadow-[#145CFF]/20 hover:shadow-[#145CFF]/35 hover:-translate-y-[1px] active:translate-y-0 active:scale-[0.98] cursor-pointer"
                  >
                    <Navigation size={12} className="rotate-45" />
                    <span>Scan Territory</span>
                  </button>

                  {tState && tCounty && (
                    <p className="text-[9px] text-slate-450 leading-normal font-medium text-center bg-[#050B16]/50 p-2 rounded-lg border border-[rgba(20,92,255,0.06)]">
                      Scan matching storm events and property records in{" "}
                      <strong className="text-slate-355">{tCounty.countyFullName}</strong>,{" "}
                      <strong className="text-slate-355">{tState}</strong> within{" "}
                      <strong className="text-slate-355">{tRadius}</strong> miles.
                    </p>
                  )}
                </div>

                {/* Reports Summary */}
                <div className="bg-[rgba(11,25,48,0.72)] border border-[rgba(20,92,255,0.14)] rounded-xl p-3 space-y-2.5 shadow-lg shadow-black/20 text-left">
                  <div className="flex items-center justify-between border-b border-slate-900/40 pb-1.5">
                    <span className="text-[8.5px] font-extrabold text-[#64748B] uppercase tracking-wider">Reports Summary</span>
                    <div className="relative">
                      <select
                        value={filters.timeWindow}
                        onChange={(e) => {
                          const val = e.target.value as any;
                          if (val === "custom") {
                            const todayStr = new Date().toISOString().slice(0, 10);
                            onFiltersChange({
                              timeWindow: val,
                              startDate: filters.startDate || todayStr,
                              endDate: filters.endDate || todayStr,
                            });
                          } else {
                            onFiltersChange({ timeWindow: val });
                          }
                        }}
                        className="bg-[#050B16]/80 border border-[#145CFF]/20 hover:border-[#145CFF]/40 rounded px-1.5 py-0.5 text-[8px] font-extrabold text-[#F8FAFC] focus:outline-none focus:ring-1 focus:ring-[#145CFF]/55 cursor-pointer appearance-none pr-4 select-none relative"
                        style={{
                          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%2394A3B8'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='3' d='M19 9l-7 7-7-7'/%3E%3C/svg%3E")`,
                          backgroundRepeat: 'no-repeat',
                          backgroundPosition: 'right 3px center',
                          backgroundSize: '8px',
                        }}
                      >
                        <option value="24h">24h</option>
                        <option value="today">Today</option>
                        <option value="yesterday">Yesterday</option>
                        <option value="7d">7 Days</option>
                        <option value="30d">30 Days</option>
                        <option value="custom">Custom</option>
                      </select>
                    </div>
                  </div>

                  {filters.timeWindow === "custom" && (
                    <div className="flex items-center gap-1.5 bg-[#050B16]/50 p-1.5 rounded-lg border border-[rgba(20,92,255,0.10)] text-left">
                      <div className="flex-1 flex flex-col gap-0.5">
                        <span className="text-[7px] text-[#64748B] font-bold uppercase pl-0.5">From</span>
                        <input
                          type="date"
                          value={filters.startDate || ""}
                          max={new Date().toISOString().slice(0, 10)}
                          onChange={(e) => onFiltersChange({ startDate: e.target.value })}
                          className="bg-[#050B16]/80 border border-[rgba(20,92,255,0.15)] text-[#F8FAFC] text-[8px] font-extrabold rounded px-1 py-0.5 focus:outline-none focus:border-[#145CFF]/50 [color-scheme:dark] w-full"
                        />
                      </div>
                      <div className="flex-1 flex flex-col gap-0.5">
                        <span className="text-[7px] text-[#64748B] font-bold uppercase pl-0.5">To</span>
                        <input
                          type="date"
                          value={filters.endDate || ""}
                          max={new Date().toISOString().slice(0, 10)}
                          onChange={(e) => onFiltersChange({ endDate: e.target.value })}
                          className="bg-[#050B16]/80 border border-[rgba(20,92,255,0.15)] text-[#F8FAFC] text-[8px] font-extrabold rounded px-1 py-0.5 focus:outline-none focus:border-[#145CFF]/50 [color-scheme:dark] w-full"
                        />
                      </div>
                    </div>
                  )}

                  <div className="grid grid-cols-4 gap-1 text-center">
                    <div className="bg-[#050B16]/65 p-1.5 rounded-lg border border-[rgba(20,92,255,0.10)]">
                      <span className="text-sm font-black text-[#60A5FA]">{hailCount}</span>
                      <span className="text-[7px] text-[#64748B] block font-bold uppercase leading-none mt-0.5">Hail</span>
                    </div>
                    <div className="bg-[#050B16]/65 p-1.5 rounded-lg border border-[rgba(20,92,255,0.10)]">
                      <span className="text-sm font-black text-[#A78BFA]">{windCount}</span>
                      <span className="text-[7px] text-[#64748B] block font-bold uppercase leading-none mt-0.5">Wind</span>
                    </div>
                    <div className="bg-[#050B16]/65 p-1.5 rounded-lg border border-[rgba(20,92,255,0.10)]">
                      <span className="text-sm font-black text-[#FB7185]">{tornadoCount}</span>
                      <span className="text-[7px] text-[#64748B] block font-bold uppercase leading-none mt-0.5">Torn</span>
                    </div>
                    <div className="bg-[#050B16]/65 p-1.5 rounded-lg border border-[rgba(20,92,255,0.10)]">
                      <span className="text-sm font-black text-[#FBBF24]">{warningCount}</span>
                      <span className="text-[7px] text-[#64748B] block font-bold uppercase leading-none mt-0.5">Warn</span>
                    </div>
                  </div>

                  <div className="text-[8px] text-[#64748B] flex justify-between items-center border-t border-slate-900/40 pt-1.5 font-semibold px-0.5">
                    <span>Total reports: {hailCount + windCount + tornadoCount}</span>
                    <span>Active watches: {watchCount}</span>
                  </div>
                </div>

                {/* Advanced Map Settings Accordion & Legend */}
                <div className="pt-1.5 relative text-left">
                  <details className="group border border-[rgba(20,92,255,0.14)] rounded-xl bg-[rgba(11,25,48,0.40)] overflow-visible">
                    <summary className="flex items-center justify-between px-3 py-2.5 text-[9.5px] font-extrabold text-[#94A3B8] hover:text-[#F8FAFC] uppercase tracking-wider cursor-pointer hover:bg-[rgba(20,92,255,0.08)] rounded-xl select-none transition-colors">
                      <span className="flex items-center gap-1.5">
                        <Layers size={11} className="text-slate-505" />
                        Advanced Map Settings
                      </span>
                      <span className="text-[8px] text-[#64748B] group-open:rotate-180 transition-transform">▼</span>
                    </summary>
                    <div className="p-3 border-t border-[rgba(20,92,255,0.14)] rounded-b-xl bg-[#091122]/90 backdrop-blur-md space-y-3.5">
                      <div className="space-y-1">
                        <label className="text-[8.5px] font-bold text-[#94A3B8] block uppercase">Basemap style</label>
                        <select
                          value={filters.mapStyle}
                          onChange={(e) => onFiltersChange({ mapStyle: e.target.value as StormMapStyle })}
                          className="w-full bg-[#050B16] border border-[rgba(20,92,255,0.20)] rounded-lg px-2.5 py-1.5 text-[10px] text-[#F8FAFC] focus:outline-none focus:border-[#145CFF] focus:ring-1 focus:ring-[#145CFF]/30 transition-all cursor-pointer"
                        >
                          <option value="streets">Streets</option>
                          <option value="dark">Operational Dark</option>
                          <option value="satellite">Satellite Streets</option>
                        </select>
                      </div>

                      <label className="flex items-center justify-between px-2 py-1.5 rounded-lg bg-[rgba(11,25,48,0.40)] border border-[rgba(20,92,255,0.10)] hover:border-[rgba(20,92,255,0.20)] hover:bg-[rgba(11,25,48,0.72)] cursor-pointer transition-colors">
                        <span className="text-[10px] text-[#94A3B8]">Show neighborhood labels</span>
                        <input
                          type="checkbox"
                          checked={filters.showNeighborhoodLabels}
                          onChange={(e) => onFiltersChange({ showNeighborhoodLabels: e.target.checked })}
                          className="w-3.5 h-3.5 rounded border-[rgba(20,92,255,0.24)] bg-[#050B16] text-[#145CFF] focus:ring-0 cursor-pointer accent-[#145CFF]"
                        />
                      </label>

                      <label className="flex items-center justify-between px-2 py-1.5 rounded-lg bg-[rgba(11,25,48,0.40)] border border-[rgba(20,92,255,0.10)] hover:border-[rgba(20,92,255,0.20)] hover:bg-[rgba(11,25,48,0.72)] cursor-pointer transition-colors">
                        <span className="text-[10px] text-[#94A3B8]">Show building footprints</span>
                        <input
                          type="checkbox"
                          checked={filters.showBuildings}
                          onChange={(e) => onFiltersChange({ showBuildings: e.target.checked })}
                          className="w-3.5 h-3.5 rounded border-[rgba(20,92,255,0.24)] bg-[#050B16] text-[#145CFF] focus:ring-0 cursor-pointer accent-[#145CFF]"
                        />
                      </label>

                      <label className="flex items-center justify-between px-2 py-1.5 rounded-lg bg-[rgba(11,25,48,0.40)] border border-[rgba(20,92,255,0.10)] hover:border-[rgba(20,92,255,0.20)] hover:bg-[rgba(11,25,48,0.72)] cursor-pointer transition-colors">
                        <span className="text-[10px] text-[#94A3B8]">Show house numbers</span>
                        <input
                          type="checkbox"
                          checked={filters.showHouseNumbers}
                          onChange={(e) => onFiltersChange({ showHouseNumbers: e.target.checked })}
                          className="w-3.5 h-3.5 rounded border-[rgba(20,92,255,0.24)] bg-[#050B16] text-[#145CFF] focus:ring-0 cursor-pointer accent-[#145CFF]"
                        />
                      </label>

                      <label className="flex items-center justify-between px-2 py-1.5 rounded-lg bg-[rgba(11,25,48,0.40)] border border-[rgba(20,92,255,0.10)] hover:border-[rgba(20,92,255,0.20)] hover:bg-[rgba(11,25,48,0.72)] cursor-pointer transition-colors">
                        <span className="text-[10px] text-[#94A3B8] flex items-center gap-1.5">
                          <Layers size={11} className="text-[#64748B]" />
                          NOAA Radar Overlay
                        </span>
                        <input
                          type="checkbox"
                          checked={filters.showRadar}
                          onChange={(e) => onFiltersChange({ showRadar: e.target.checked })}
                          className="w-3.5 h-3.5 rounded border-[rgba(20,92,255,0.24)] bg-[#050B16] text-[#145CFF] focus:ring-0 cursor-pointer accent-[#145CFF]"
                        />
                      </label>

                      {filters.showRadar && (
                        <div className="p-2 bg-[#050B16]/60 border border-[rgba(20,92,255,0.15)] rounded-lg space-y-1">
                          <div className="flex justify-between text-[9px] text-[#94A3B8] font-bold">
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
                            className="w-full h-1 bg-slate-800 rounded appearance-none cursor-pointer accent-[#145CFF]"
                          />
                        </div>
                      )}

                      <label className="flex items-center justify-between px-2 py-1.5 rounded-lg bg-[rgba(11,25,48,0.40)] border border-[rgba(20,92,255,0.10)] hover:border-[rgba(20,92,255,0.20)] hover:bg-[rgba(11,25,48,0.72)] cursor-pointer transition-colors">
                        <span className="text-[10px] text-[#94A3B8] flex items-center gap-1.5">
                          <AlertCircle size={11} className="text-amber-500" />
                          Active NWS Alert Areas
                        </span>
                        <input
                          type="checkbox"
                          checked={filters.showAlerts}
                          onChange={(e) => onFiltersChange({ showAlerts: e.target.checked })}
                          className="w-3.5 h-3.5 rounded border-[rgba(20,92,255,0.24)] bg-[#050B16] text-[#145CFF] focus:ring-0 cursor-pointer accent-[#145CFF]"
                        />
                      </label>
                    </div>
                  </details>

                  <div className="mt-2.5">
                    <StormLegend className="bg-[rgba(11,25,48,0.20)] border border-[rgba(20,92,255,0.10)] rounded-lg p-2.5 text-[9.5px] text-slate-400 w-full" />
                  </div>
                </div>
              </div>
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
                              className="flex-1 py-2 px-3 rounded-lg bg-[#145CFF] hover:bg-[#2570FF] disabled:bg-[rgba(20,92,255,0.08)] disabled:text-slate-500 text-white text-[10px] font-extrabold uppercase tracking-wider transition-all hover:-translate-y-[1px] active:translate-y-0 active:scale-[0.98] cursor-pointer flex items-center justify-center gap-1.5 shadow-md shadow-[#145CFF]/20 hover:shadow-[#145CFF]/30"
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
                              className="py-2 px-2.5 rounded-lg border border-[rgba(20,92,255,0.20)] hover:border-[rgba(20,92,255,0.40)] bg-[rgba(20,92,255,0.08)] hover:bg-[rgba(20,92,255,0.16)] text-[#94A3B8] hover:text-[#F8FAFC] text-[10px] font-extrabold uppercase transition-all cursor-pointer flex items-center justify-center shadow-sm"
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
                      className="flex items-center gap-1 px-2 py-1 bg-[#145CFF] hover:bg-[#2570FF] text-white text-[9px] font-extrabold uppercase rounded shadow transition-colors cursor-pointer border-none"
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
                            ? "bg-[#0E8F6E]/12 border-[#0E8F6E]/40 hover:border-[#0E8F6E]/60 shadow-md shadow-[#0E8F6E]/5"
                            : "bg-[rgba(11,25,48,0.40)] hover:bg-[rgba(11,25,48,0.72)] border-[rgba(20,92,255,0.14)] hover:border-[rgba(20,92,255,0.30)]"
                        }`}
                      >
                        <div className="flex gap-2 truncate">
                          <MapPin
                            size={12}
                            className={`shrink-0 mt-0.5 ${isActive ? "text-[#0E8F6E] animate-bounce" : "text-slate-600 group-hover:text-slate-400"}`}
                          />
                          <div className="truncate flex flex-col gap-0.5">
                            <span className={`text-[11px] font-bold leading-tight truncate ${isActive ? "text-[#F8FAFC] animate-pulse" : "text-[#94A3B8]"}`}>
                              {lead.fullAddress}
                            </span>
                            <span className="text-[9.5px] text-[#64748B] font-medium">
                              {[lead.city, lead.state, lead.postcode].filter(Boolean).join(", ")}
                            </span>
                            <div className="flex items-center gap-1.5 mt-1">
                              <span className="text-[8.5px] text-[#64748B] font-mono">
                                {lead.latitude.toFixed(4)}, {lead.longitude.toFixed(4)}
                              </span>
                              <span className={`px-1.5 py-0.2 rounded-sm text-[7px] font-extrabold uppercase ${
                                lead.confidence === "exact"
                                  ? "bg-[#0E8F6E]/12 text-[#00A86B] border border-[#0E8F6E]/20"
                                  : "bg-[#F59E0B]/12 text-[#F59E0B]/90 border border-[#F59E0B]/20"
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
                          className="text-[#64748B] hover:text-[#F43F5E] p-1.5 rounded-md bg-[rgba(20,92,255,0.06)] hover:bg-[#F43F5E]/10 border border-[rgba(20,92,255,0.12)] hover:border-[#F43F5E]/20 transition-all shrink-0"
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
      )}

      {/* Sticky bottom CTA banner when scanStatus === "complete" */}
      {scanStatus === "complete" && resultLeadEstimate !== null && (
        <div className="sticky bottom-0 left-0 right-0 p-3 bg-[#060D1E]/95 border-t border-[#145CFF]/30 backdrop-blur-md z-30 shadow-2xl flex flex-col gap-2 animate-in slide-in-from-bottom duration-300">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[7.5px] font-black text-emerald-500 uppercase tracking-widest block leading-none mb-1">
                Scanned Leads Found!
              </span>
              <h4 className="text-[11.5px] font-black text-[#F8FAFC] uppercase truncate">
                {resultLeadEstimate} Estimated Leads
              </h4>
              <span className="text-[8.5px] text-slate-450 block truncate">
                In {filters.selectedCounty || tCounty?.countyName || "County"}, {filters.state || tState} ({filters.radius} mi)
              </span>
            </div>
            <div className="flex h-2.5 w-2.5 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-1.5 pt-1">
            <button
              onClick={onOpenSampleModal}
              className="py-1.5 px-2 rounded bg-[#0B1930]/60 hover:bg-[#145CFF]/10 border border-[#145CFF]/30 hover:border-[#145CFF]/50 text-slate-350 hover:text-white text-[9.5px] font-black uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-1 shadow-sm"
            >
              View Sample
            </button>
            <button
              onClick={onOpenUpgradeModal}
              className="py-1.5 px-2 rounded bg-gradient-to-r from-[#145CFF] to-[#2570FF] hover:from-[#2570FF] hover:to-[#3b82f6] text-white text-[9.5px] font-black uppercase tracking-wider transition-all hover:scale-[1.02] cursor-pointer flex items-center justify-center gap-1 shadow-md shadow-[#145CFF]/20"
            >
              Unlock Leads
            </button>
          </div>
        </div>
      )}
      </div>

      {/* Floating Toggle Button for Mobile */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="fixed top-[68px] left-3 z-[1001] p-2.5 rounded-lg bg-[#061A2F]/90 border border-[rgba(20,92,255,0.24)] text-[#F8FAFC] shadow-glass backdrop-blur-md md:hidden focus:outline-none hover:bg-[#145CFF]/16 transition-all"
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
