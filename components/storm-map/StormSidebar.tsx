"use client";

import React from "react";
import { createPortal } from "react-dom";
import { StormFilterState, StormReport, NwsAlert, TargetCluster, SelectedPropertyTarget, ActivePopupDetail, StormMapStyle } from "@/lib/weather/types";
import { clusterStormReports, formatSPCDescriptor, getDistanceMiles, expandBbox } from "@/lib/weather/geo";
import { allStates, getCountiesByState, USCounty, getCountyByStateAndName } from "@/lib/geo/us-counties";
import { Search, Tornado, Wind, Zap, Layers, Navigation, RefreshCw, ChevronLeft, ChevronRight, MapPin, Eye, Info, AlertCircle, MessageSquare, Download, Trash2, ClipboardList, Compass, ShieldAlert, CheckCircle2, ArrowLeft } from "lucide-react";
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
  wizardStep?: 1 | 2 | 3 | 4;
  onWizardStepChange?: (step: 1 | 2 | 3 | 4) => void;
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
  scanError?: string | null;
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
  wizardStep: externalWizardStep,
  onWizardStepChange: externalSetWizardStep,
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
  scanError = null,
}: StormSidebarProps) {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [isSearching, setIsSearching] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState<"filters" | "targets" | "leads">("filters");
  const [localWizardStep, localSetWizardStep] = React.useState<1 | 2 | 3 | 4>(1);
  const wizardStep = externalWizardStep !== undefined ? externalWizardStep : localWizardStep;
  const setWizardStep = externalSetWizardStep !== undefined ? externalSetWizardStep : localSetWizardStep;

  // Dropdown & Search states declared at the top to prevent ReferenceErrors during early useEffect initialization
  const [countySearchQuery, setCountySearchQuery] = React.useState("");
  const [countyDropdownOpen, setCountyDropdownOpen] = React.useState(false);
  const [stateDropdownOpen, setStateDropdownOpen] = React.useState(false);
  const [radiusDropdownOpen, setRadiusDropdownOpen] = React.useState(false);

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

  // Portal mounting and positioning refs
  const [isMounted, setIsMounted] = React.useState(false);
  const [stateButtonRect, setStateButtonRect] = React.useState<DOMRect | null>(null);
  const [countyButtonRect, setCountyButtonRect] = React.useState<DOMRect | null>(null);

  const stateBtnRef = React.useRef<HTMLButtonElement>(null);
  const countyBtnRef = React.useRef<HTMLButtonElement>(null);
  const scrollContainerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  React.useEffect(() => {
    if (stateDropdownOpen && stateBtnRef.current) {
      setStateButtonRect(stateBtnRef.current.getBoundingClientRect());
    }
  }, [stateDropdownOpen]);

  React.useEffect(() => {
    if (countyDropdownOpen && countyBtnRef.current) {
      setCountyButtonRect(countyBtnRef.current.getBoundingClientRect());
    }
  }, [countyDropdownOpen]);

  React.useEffect(() => {
    if (!stateDropdownOpen && !countyDropdownOpen) return;
    const handleScroll = () => {
      if (stateDropdownOpen && stateBtnRef.current) {
        setStateButtonRect(stateBtnRef.current.getBoundingClientRect());
      }
      if (countyDropdownOpen && countyBtnRef.current) {
        setCountyButtonRect(countyBtnRef.current.getBoundingClientRect());
      }
    };
    const scrollContainer = scrollContainerRef.current;
    scrollContainer?.addEventListener("scroll", handleScroll, true);
    return () => scrollContainer?.removeEventListener("scroll", handleScroll, true);
  }, [stateDropdownOpen, countyDropdownOpen]);

  React.useEffect(() => {
    if (!stateDropdownOpen && !countyDropdownOpen) return;
    const handleOutsideClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInsideStateBtn = stateBtnRef.current?.contains(target);
      const isInsideCountyBtn = countyBtnRef.current?.contains(target);
      const isInsidePortal = target.closest('[data-dropdown-portal]');
      
      if (!isInsideStateBtn && !isInsideCountyBtn && !isInsidePortal) {
        setStateDropdownOpen(false);
        setCountyDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [stateDropdownOpen, countyDropdownOpen]);

  const getDropdownStyle = (btnRect: DOMRect | null, width?: number) => {
    if (!btnRect) return {};
    const dropdownHeight = 220;
    const gap = 4;
    const spaceBelow = window.innerHeight - btnRect.bottom;
    const showAbove = spaceBelow < dropdownHeight && btnRect.top > dropdownHeight;
    
    const top = showAbove 
      ? btnRect.top - dropdownHeight - gap 
      : btnRect.bottom + gap;
      
    return {
      position: "fixed" as const,
      top: `${top}px`,
      left: `${btnRect.left}px`,
      width: width ? `${width}px` : `${btnRect.width}px`,
      maxHeight: `${dropdownHeight}px`,
    };
  };

  // Guided Selector states moved to top

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

  // Dropdown states moved to top

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

  // Scroll to bottom of sidebar when wizard step changes to expose the main actions
  React.useEffect(() => {
    if (scrollContainerRef.current) {
      setTimeout(() => {
        if (scrollContainerRef.current) {
          scrollContainerRef.current.scrollTo({
            top: scrollContainerRef.current.scrollHeight,
            behavior: "smooth"
          });
        }
      }, 100);
    }
  }, [wizardStep]);

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

  const hailCount = filteredReports.filter(r => r.type === "hail").length;
  const windCount = filteredReports.filter(r => r.type === "wind").length;
  const tornadoCount = filteredReports.filter(r => r.type === "tornado").length;

  const isCountySelected = !!tState && !!tCounty;
  const isAnySignalSelected = filters.showHail || filters.showWind || filters.showTornado || filters.showAlerts;
  const isScanUnlockable = isCountySelected && isAnySignalSelected;

  let disabledReasonText = "";
  if (!isCountySelected) {
    disabledReasonText = "Select a county to unlock scan";
  } else if (!isAnySignalSelected) {
    disabledReasonText = "Choose at least one storm signal";
  }

  return (
    <>
      {/* Sidebar container */}
      <div
        className={`fixed md:relative top-[72px] md:top-0 h-[calc(100vh-72px)] md:h-[calc(100vh-72px)] z-[1000] md:z-10 flex flex-col overflow-hidden transition-all duration-300 ${
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
            <span className="h-1.5 w-1.5 rounded-full bg-[#145CFF] animate-pulse shadow-[0_0_6px_rgba(20,92,255,0.4)]"></span>
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-350">
              Lead Finder Console
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
          <div className="mx-3 mt-2.5 bg-[#0E8F6E]/12 border border-[#0E8F6E]/30 rounded-xl p-3 flex flex-col gap-1 text-left select-none animate-in fade-in duration-200 shrink-0">
            <div className="flex items-center justify-between">
              <span className="text-[8px] font-black text-[#00E676] uppercase tracking-widest leading-none">
                Territory Locked
              </span>
              <span className="flex h-1.5 w-1.5 relative shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00E676] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#00E676]"></span>
              </span>
            </div>
            <div className="flex items-center justify-between gap-2 mt-0.5">
              <span className="text-[11.5px] font-black text-[#F8FAFC] truncate">
                {filters.selectedCountyFull || `${filters.selectedCounty} County` || "Knox County"}, {filters.state}
              </span>
              <button
                type="button"
                onClick={handleClearSearch}
                className="text-[8.5px] font-black text-[#60A5FA] hover:text-[#82B1FF] uppercase shrink-0 transition-colors cursor-pointer"
              >
                Clear
              </button>
            </div>
            <span className="text-[9px] font-bold text-slate-450 leading-none">
              {filters.radius} mile radius
            </span>
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
          <div className="flex shrink-0 border-b border-[rgba(20,92,255,0.14)] bg-[#050B16]/80 backdrop-blur-md transition-all duration-300">
            <button
              onClick={() => setActiveTab("filters")}
              className={`flex-1 py-3 text-center text-[10.5px] font-extrabold transition-all border-b-2 uppercase tracking-wider ${
                activeTab === "filters"
                  ? "border-[#145CFF] text-[#F8FAFC] bg-[rgba(20,92,255,0.08)]"
                  : "border-transparent text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-[#145CFF]/5"
              }`}
            >
              Lead Finder
            </button>
            <button
              onClick={() => setActiveTab("leads")}
              className={`flex-1 py-3 text-center text-[10.5px] font-extrabold transition-all border-b-2 flex items-center justify-center gap-1.5 uppercase tracking-wider ${
                activeTab === "leads"
                  ? "border-[#145CFF] text-[#F8FAFC] bg-[rgba(20,92,255,0.08)]"
                  : "border-transparent text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-[#145CFF]/5"
              }`}
            >
              Property Leads
              {leads.length > 0 && (
                <span className="px-1.5 py-0.5 rounded bg-[#0E8F6E]/12 border border-[#0E8F6E]/30 text-[#00A86B] text-[8.5px] font-extrabold animate-pulse">
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
          <div className="flex-1 flex flex-col overflow-hidden relative">
            
            {/* Scrollable Tab Body */}
            <div 
              ref={scrollContainerRef}
              className="flex-1 overflow-y-auto p-2 pb-36 space-y-3.5 custom-scrollbar transition-all duration-300"
            >
              
              {/* === WIZARD: Lead Finder === */}
              {activeTab === "filters" && scanStatus === "idle" && (() => {
                const selectedSignals = [
                  filters.showHail && "Hail",
                  filters.showWind && "Wind",
                  filters.showTornado && "Tornado",
                  filters.showAlerts && "Alerts",
                ].filter(Boolean).join(" + ");

                const hailSeverityLabel = filters.minHailSize === 0 ? "All Sizes" : `≥ ${filters.minHailSize.toFixed(2)}\"` ;

                const formatDateSummary = (dateStr?: string) => {
                  if (!dateStr) return "-";
                  const [y, m, d] = dateStr.split("-");
                  return `${m}/${d}/${y}`;
                };

                const dateRangeSummary = `${formatDateSummary(filters.startDate)} → ${formatDateSummary(filters.endDate)}`;

                const maxDemoDate = (() => {
                  const today = new Date();
                  // Strict over 1 year ago: today - 1 year - 1 day
                  const maxDate = new Date(today.getFullYear() - 1, today.getMonth(), today.getDate() - 1);
                  return maxDate.toISOString().split("T")[0];
                })();

                const isDateMoreThanOneYearOld = (dateStr?: string) => {
                  if (!dateStr) return false;
                  const date = new Date(dateStr + "T00:00:00");
                  const oneYearAgo = new Date();
                  oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
                  oneYearAgo.setDate(oneYearAgo.getDate() - 1);
                  oneYearAgo.setHours(23, 59, 59, 999);
                  return date <= oneYearAgo;
                };

                const showDateError = isDemo && (
                  (filters.startDate && !isDateMoreThanOneYearOld(filters.startDate)) ||
                  (filters.endDate && !isDateMoreThanOneYearOld(filters.endDate))
                );

                const isTerritoryValid = !!tState && !!tCounty;

                const isDatesValid = (() => {
                  if (!filters.startDate || !filters.endDate) return false;
                  if (filters.endDate < filters.startDate) return false;
                  if (isDemo) {
                    return isDateMoreThanOneYearOld(filters.startDate) && isDateMoreThanOneYearOld(filters.endDate);
                  }
                  return true;
                })();

                const isSignalsValid = filters.showHail || filters.showWind || filters.showTornado || filters.showAlerts;

                return (
                <div className="space-y-3 text-left">
                  {/* Progress Header */}
                  <div className="bg-[rgba(11,25,48,0.85)] border border-[rgba(20,92,255,0.18)] rounded-xl p-3.5 shadow-lg shadow-black/25">
                    <div className="flex items-center justify-between mb-2.5">
                      <h3 className="text-[13px] font-black text-[#F8FAFC] tracking-tight">Find Storm Leads</h3>
                      <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Step {wizardStep} of 4</span>
                    </div>
                    <div className="flex gap-1 mb-1.5">
                      {[1, 2, 3, 4].map((s) => (
                        <div key={s} className={`flex-1 h-1.5 rounded-full transition-all duration-500 ${
                          s < wizardStep ? "bg-[#00E676]" : s === wizardStep ? "bg-[#145CFF] shadow-[0_0_8px_rgba(20,92,255,0.5)]" : "bg-slate-800"
                        }`} />
                      ))}
                    </div>
                    <div className="flex justify-between px-0.5">
                      {["Territory", "Dates", "Signals", "Scan"].map((label, i) => (
                        <span key={label} className={`text-[8px] font-bold uppercase tracking-wider transition-colors duration-300 ${
                          i + 1 < wizardStep ? "text-[#00E676]" : i + 1 === wizardStep ? "text-[#60A5FA]" : "text-slate-500"
                        }`}>{label}</span>
                      ))}
                    </div>
                  </div>

                  {/* Completed Step Summaries */}
                  {wizardStep > 1 && (
                    <div className="bg-[rgba(11,25,48,0.55)] border border-[rgba(0,230,118,0.12)] rounded-xl px-3 py-2 flex items-center justify-between animate-in fade-in duration-200">
                      <div className="flex items-center gap-2 min-w-0">
                        <CheckCircle2 size={14} className="text-[#00E676] shrink-0" />
                        <div className="min-w-0">
                          <span className="text-[10px] font-black text-white block truncate">Territory</span>
                          <span className="text-[9px] font-semibold text-slate-400 block truncate">{tCounty?.countyName || "County"}, {tState} · {tRadius} mi</span>
                        </div>
                      </div>
                      <button type="button" onClick={() => setWizardStep(1)} className="text-[8.5px] font-bold text-[#60A5FA] hover:text-white uppercase tracking-wider cursor-pointer shrink-0 ml-2">Edit</button>
                    </div>
                  )}

                  {wizardStep > 2 && (
                    <div className="bg-[rgba(11,25,48,0.55)] border border-[rgba(0,230,118,0.12)] rounded-xl px-3 py-2 flex items-center justify-between animate-in fade-in duration-200">
                      <div className="flex items-center gap-2 min-w-0">
                        <CheckCircle2 size={14} className="text-[#00E676] shrink-0" />
                        <div className="min-w-0">
                          <span className="text-[10px] font-black text-white block truncate">Storm Dates</span>
                          <span className="text-[9px] font-semibold text-slate-400 block truncate">{dateRangeSummary}</span>
                        </div>
                      </div>
                      <button type="button" onClick={() => setWizardStep(2)} className="text-[8.5px] font-bold text-[#60A5FA] hover:text-white uppercase tracking-wider cursor-pointer shrink-0 ml-2">Edit</button>
                    </div>
                  )}

                  {wizardStep > 3 && (
                    <div className="bg-[rgba(11,25,48,0.55)] border border-[rgba(0,230,118,0.12)] rounded-xl px-3 py-2 flex items-center justify-between animate-in fade-in duration-200">
                      <div className="flex items-center gap-2 min-w-0">
                        <CheckCircle2 size={14} className="text-[#00E676] shrink-0" />
                        <div className="min-w-0">
                          <span className="text-[10px] font-black text-white block truncate">Storm Signals</span>
                          <span className="text-[9px] font-semibold text-slate-400 block truncate">{selectedSignals || "None"}{filters.showHail && filters.minHailSize > 0 ? ` · ${hailSeverityLabel}` : ""}</span>
                        </div>
                      </div>
                      <button type="button" onClick={() => setWizardStep(3)} className="text-[8.5px] font-bold text-[#60A5FA] hover:text-white uppercase tracking-wider cursor-pointer shrink-0 ml-2">Edit</button>
                    </div>
                  )}

                  {/* ===== STEP 1: Select Territory ===== */}
                  {wizardStep === 1 && (
                    <div 
                      data-tour="territory"
                      className="bg-[rgba(11,25,48,0.72)] border border-[rgba(20,92,255,0.14)] rounded-xl p-3.5 space-y-3 shadow-lg shadow-black/20 animate-in fade-in slide-in-from-right-2 duration-300"
                    >
                      <div>
                        <h3 className="text-[14px] font-black text-[#F8FAFC]">Select Your Territory</h3>
                        <p className="text-[10px] text-slate-400 font-semibold leading-relaxed mt-0.5">
                          Choose the market where you want to find storm-damage property leads.
                        </p>
                      </div>

                    <div className="grid grid-cols-12 gap-2">
                      {/* State Input */}
                      <div className="col-span-4 flex flex-col gap-1 relative">
                        <label className="text-[8px] font-bold text-slate-400 uppercase tracking-wider pl-0.5">State</label>
                        <div className="relative">
                          <button
                            ref={stateBtnRef}
                            type="button"
                            onClick={() => {
                              setStateDropdownOpen(!stateDropdownOpen);
                              setCountyDropdownOpen(false);
                              setRadiusDropdownOpen(false);
                            }}
                            className="w-full bg-[#050B16] border border-[#145CFF]/25 rounded-lg px-2 py-1.5 text-xs text-[#F8FAFC] font-extrabold focus:outline-none focus:border-[#145CFF] flex items-center justify-between min-h-[32px] cursor-pointer"
                          >
                            <span className="truncate">{tState || "Select State"}</span>
                            <ChevronRight className="text-slate-505 rotate-90 shrink-0" size={10} />
                          </button>

                          {stateDropdownOpen && isMounted && stateButtonRect && createPortal(
                            <div 
                              data-dropdown-portal="state"
                              className="bg-[#071426] border border-[#145CFF]/30 rounded-lg shadow-2xl z-[10500] p-2 flex flex-col w-[130px] overflow-hidden"
                              style={getDropdownStyle(stateButtonRect, 130)}
                            >
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
                                    <span>{st.code || "All"}</span>
                                  </button>
                                ))}
                              </div>
                            </div>,
                            document.body
                          )}
                        </div>
                      </div>

                      {/* County Input */}
                      <div className="col-span-8 flex flex-col gap-1 relative">
                        <label className="text-[8px] font-bold text-slate-400 uppercase tracking-wider pl-0.5">County</label>
                        <button
                          ref={countyBtnRef}
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
                          <ChevronRight className="text-slate-550 rotate-90 shrink-0" size={10} />
                        </button>

                        {countyDropdownOpen && tState && isMounted && countyButtonRect && createPortal(
                          <div 
                            data-dropdown-portal="county"
                            className="bg-[#071426] border border-[#145CFF]/30 rounded-lg shadow-2xl z-[10500] p-2 space-y-1.5 flex flex-col w-[200px] overflow-hidden"
                            style={getDropdownStyle(countyButtonRect, 200)}
                          >
                            <div className="relative shrink-0">
                              <input
                                type="text"
                                value={countySearchQuery}
                                onChange={(e) => setCountySearchQuery(e.target.value)}
                                placeholder="Filter counties..."
                                className="w-full bg-[#050B16] border border-[#145CFF]/20 rounded px-2.5 py-1 text-xs text-[#F8FAFC] placeholder:text-slate-500 focus:outline-none focus:border-[#145CFF]"
                              />
                              <Search className="absolute right-2.5 top-2 text-slate-550" size={11} />
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
                          </div>,
                          document.body
                        )}
                      </div>
                    </div>

                      {/* Radius Chips */}
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[8.5px] font-bold text-slate-400 uppercase tracking-wider pl-0.5">Search Radius (Miles)</label>
                        <div className="flex flex-wrap gap-1.5">
                          {[5, 10, 15, 25, 50, 75, 100].map((r) => {
                            const isSelected = tRadius === r;
                            return (
                              <button
                                key={r}
                                type="button"
                                onClick={() => setTRadius(r)}
                                className={`flex-1 py-2.5 text-center text-[11px] font-black rounded-xl border transition-all duration-200 hover:-translate-y-[1px] active:translate-y-0 cursor-pointer ${
                                  isSelected
                                    ? "bg-[#145CFF]/15 border-[#145CFF] text-[#F8FAFC] shadow-[0_0_14px_rgba(20,92,255,0.3)] ring-1 ring-[#145CFF]/30"
                                    : "bg-[#050B16] border-slate-800 text-slate-400 hover:text-[#F8FAFC] hover:border-slate-700 hover:bg-[#145CFF]/5 hover:shadow-[0_0_8px_rgba(20,92,255,0.1)]"
                                }`}
                              >
                                {r}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Territory Ready Chip */}
                      {tState && tCounty && (
                        <div className="mt-1 p-2 bg-[#0E8F6E]/10 border border-[#0E8F6E]/20 rounded-lg flex items-center gap-2 text-[10px] text-[#00E676] font-extrabold animate-in fade-in duration-200 select-none">
                          <CheckCircle2 size={14} className="text-[#00E676] shrink-0" />
                          <span className="truncate">Territory Ready — {tCounty.countyFullName}, {tState} · {tRadius} mi</span>
                        </div>
                      )}

                      {/* Continue Button */}
                      {isTerritoryValid ? (
                        <button
                          type="button"
                          onClick={() => setWizardStep(2)}
                          className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-[#145CFF] to-[#2570FF] hover:from-[#2570FF] hover:to-[#3b82f6] text-white text-[11px] font-black uppercase tracking-wider transition-all duration-200 hover:scale-[1.01] hover:shadow-[0_0_20px_rgba(20,92,255,0.3)] active:scale-[0.98] cursor-pointer flex items-center justify-center gap-2"
                        >
                          Continue to Storm Dates
                          <ChevronRight size={14} />
                        </button>
                      ) : (
                        <button
                          type="button"
                          disabled
                          className="w-full py-3 px-4 rounded-xl bg-[#091528] border border-slate-800 text-slate-500 text-[11px] font-bold uppercase tracking-wider cursor-not-allowed select-none"
                        >
                          Select a state and county to continue
                        </button>
                      )}
                    </div>
                  )}

                  {/* ===== STEP 2: Select Storm Dates ===== */}
                  {wizardStep === 2 && (
                    <div 
                      data-tour="dates"
                      className="bg-[rgba(11,25,48,0.72)] border border-[rgba(20,92,255,0.14)] rounded-xl p-3.5 space-y-3.5 shadow-lg shadow-black/20 animate-in fade-in slide-in-from-right-2 duration-300"
                    >
                      <div>
                        <h3 className="text-[14px] font-black text-[#F8FAFC]">Select Storm Dates</h3>
                        <p className="text-[10px] text-slate-400 font-semibold leading-relaxed mt-0.5">
                          {isDemo 
                            ? "Demo mode uses historical storm data. Select a From and To date more than 1 year old to continue." 
                            : "Define the custom date range to scan for storm events."}
                        </p>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div className="flex flex-col gap-1">
                          <label className="text-[8.5px] font-bold text-slate-450 uppercase tracking-wider pl-0.5">From Date</label>
                          <input
                            type="date"
                            value={filters.startDate || ""}
                            max={isDemo ? maxDemoDate : undefined}
                            onChange={(e) => onFiltersChange({ startDate: e.target.value })}
                            style={{ colorScheme: "dark" }}
                            className="w-full bg-[#050B16] border border-[#145CFF]/25 rounded-lg px-2.5 py-1.5 text-xs text-[#F8FAFC] font-extrabold focus:outline-none focus:border-[#145CFF] min-h-[32px] cursor-pointer"
                          />
                        </div>
                        <div className="flex flex-col gap-1">
                          <label className="text-[8.5px] font-bold text-slate-450 uppercase tracking-wider pl-0.5">To Date</label>
                          <input
                            type="date"
                            value={filters.endDate || ""}
                            max={isDemo ? maxDemoDate : undefined}
                            onChange={(e) => onFiltersChange({ endDate: e.target.value })}
                            style={{ colorScheme: "dark" }}
                            className="w-full bg-[#050B16] border border-[#145CFF]/25 rounded-lg px-2.5 py-1.5 text-xs text-[#F8FAFC] font-extrabold focus:outline-none focus:border-[#145CFF] min-h-[32px] cursor-pointer"
                          />
                        </div>
                      </div>

                      {showDateError && (
                        <div className="p-2 bg-red-500/10 border border-red-500/25 rounded-lg text-[9.5px] text-red-400 font-extrabold animate-pulse">
                          Demo dates must be more than 1 year old.
                        </div>
                      )}

                      {/* Navigation buttons */}
                      <div className="flex gap-2 pt-1">
                        <button
                          type="button"
                          onClick={() => setWizardStep(1)}
                          className="py-2.5 px-4 rounded-xl bg-[#050B16] border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700 text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1.5"
                        >
                          <ArrowLeft size={12} />
                          Back
                        </button>
                        {isDatesValid ? (
                          <button
                            type="button"
                            onClick={() => setWizardStep(3)}
                            className="flex-1 py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#145CFF] to-[#2570FF] hover:from-[#2570FF] hover:to-[#3b82f6] text-white text-[11px] font-black uppercase tracking-wider transition-all duration-200 hover:scale-[1.01] hover:shadow-[0_0_20px_rgba(20,92,255,0.3)] active:scale-[0.98] cursor-pointer flex items-center justify-center gap-2"
                          >
                            Continue to Signals
                            <ChevronRight size={14} />
                          </button>
                        ) : (
                          <button
                            type="button"
                            disabled
                            className="flex-1 py-2.5 px-4 rounded-xl bg-[#091528] border border-slate-800 text-slate-500 text-[10px] font-bold uppercase tracking-wider cursor-not-allowed select-none text-center"
                          >
                            {!filters.startDate || !filters.endDate 
                              ? "Select a From Date and To Date" 
                              : filters.endDate < filters.startDate 
                                ? "To Date must be after From Date" 
                                : "Demo dates must be more than 1 year old"}
                          </button>
                        )}
                      </div>
                    </div>
                  )}

                  {/* ===== STEP 3: Choose Storm Signals ===== */}
                  {wizardStep === 3 && (
                    <div 
                      data-tour="signals"
                      className="bg-[rgba(11,25,48,0.72)] border border-[rgba(20,92,255,0.14)] rounded-xl p-3.5 space-y-3 shadow-lg shadow-black/20 animate-in fade-in slide-in-from-right-2 duration-300"
                    >
                      <div>
                        <h3 className="text-[14px] font-black text-[#F8FAFC]">Choose Storm Signals</h3>
                        <p className="text-[10px] text-slate-400 font-semibold leading-relaxed mt-0.5">
                          Select the storm events you want included in your lead scan.
                        </p>
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        {/* Hail Signal Card */}
                        <button
                          type="button"
                          onClick={() => onFiltersChange({ showHail: !filters.showHail })}
                          className={`w-full p-2.5 rounded-xl border text-left transition-all duration-200 cursor-pointer flex flex-col justify-between h-[68px] ${
                            filters.showHail
                              ? "bg-[#2F7DFF]/10 border-[#2F7DFF] shadow-[0_0_10px_rgba(47,125,255,0.15)] ring-1 ring-[#2F7DFF]/20"
                              : "bg-[#050B16] border-slate-800 hover:border-slate-700 hover:bg-[#145CFF]/5"
                          }`}
                        >
                          <div className="flex items-center justify-between w-full">
                            <div className="flex items-center gap-1.5 min-w-0">
                              <Zap size={13} className={filters.showHail ? "text-[#2F7DFF]" : "text-slate-600"} />
                              <span className={`text-[10px] font-black uppercase truncate ${filters.showHail ? "text-[#F8FAFC]" : "text-slate-450"}`}>Hail</span>
                            </div>
                            <span className={`w-2 h-2 rounded-full transition-all shrink-0 ${filters.showHail ? "bg-[#2F7DFF] shadow-[0_0_6px_#2f7dff]" : "bg-slate-800 border border-slate-700"}`} />
                          </div>
                          <p className={`text-[8.5px] font-semibold leading-tight line-clamp-2 ${filters.showHail ? "text-slate-350" : "text-slate-550"}`}>Roof-impact & size reports</p>
                        </button>

                        {/* Wind Signal Card */}
                        <button
                          type="button"
                          onClick={() => onFiltersChange({ showWind: !filters.showWind })}
                          className={`w-full p-2.5 rounded-xl border text-left transition-all duration-200 cursor-pointer flex flex-col justify-between h-[68px] ${
                            filters.showWind
                              ? "bg-[#8B5CF6]/10 border-[#8B5CF6] shadow-[0_0_10px_rgba(139,92,246,0.15)] ring-1 ring-[#8B5CF6]/20"
                              : "bg-[#050B16] border-slate-800 hover:border-slate-700 hover:bg-[#145CFF]/5"
                          }`}
                        >
                          <div className="flex items-center justify-between w-full">
                            <div className="flex items-center gap-1.5 min-w-0">
                              <Wind size={13} className={filters.showWind ? "text-[#8B5CF6]" : "text-slate-600"} />
                              <span className={`text-[10px] font-black uppercase truncate ${filters.showWind ? "text-[#F8FAFC]" : "text-slate-450"}`}>Wind</span>
                            </div>
                            <span className={`w-2 h-2 rounded-full transition-all shrink-0 ${filters.showWind ? "bg-[#8B5CF6] shadow-[0_0_6px_#8b5cf6]" : "bg-slate-800 border border-slate-700"}`} />
                          </div>
                          <p className={`text-[8.5px] font-semibold leading-tight line-clamp-2 ${filters.showWind ? "text-slate-350" : "text-slate-550"}`}>High-wind damage indicators</p>
                        </button>

                        {/* Tornado Signal Card */}
                        <button
                          type="button"
                          onClick={() => onFiltersChange({ showTornado: !filters.showTornado })}
                          className={`w-full p-2.5 rounded-xl border text-left transition-all duration-200 cursor-pointer flex flex-col justify-between h-[68px] ${
                            filters.showTornado
                              ? "bg-[#F43F5E]/10 border-[#F43F5E] shadow-[0_0_10px_rgba(244,63,94,0.15)] ring-1 ring-[#F43F5E]/20"
                              : "bg-[#050B16] border-slate-800 hover:border-slate-700 hover:bg-[#145CFF]/5"
                          }`}
                        >
                          <div className="flex items-center justify-between w-full">
                            <div className="flex items-center gap-1.5 min-w-0">
                              <Tornado size={13} className={filters.showTornado ? "text-[#F43F5E]" : "text-slate-600"} />
                              <span className={`text-[10px] font-black uppercase truncate ${filters.showTornado ? "text-[#F8FAFC]" : "text-slate-450"}`}>Tornado</span>
                            </div>
                            <span className={`w-2 h-2 rounded-full transition-all shrink-0 ${filters.showTornado ? "bg-[#F43F5E] shadow-[0_0_6px_#f43f5e]" : "bg-slate-800 border border-slate-700"}`} />
                          </div>
                          <p className={`text-[8.5px] font-semibold leading-tight line-clamp-2 ${filters.showTornado ? "text-slate-350" : "text-slate-550"}`}>Tornado paths & rotation</p>
                        </button>

                        {/* Alerts Signal Card */}
                        <button
                          type="button"
                          onClick={() => onFiltersChange({ showAlerts: !filters.showAlerts })}
                          className={`w-full p-2.5 rounded-xl border text-left transition-all duration-200 cursor-pointer flex flex-col justify-between h-[68px] ${
                            filters.showAlerts
                              ? "bg-[#FBBF24]/10 border-[#FBBF24] shadow-[0_0_10px_rgba(251,191,36,0.15)] ring-1 ring-[#FBBF24]/20"
                              : "bg-[#050B16] border-slate-800 hover:border-slate-700 hover:bg-[#145CFF]/5"
                          }`}
                        >
                          <div className="flex items-center justify-between w-full">
                            <div className="flex items-center gap-1.5 min-w-0">
                              <ShieldAlert size={13} className={filters.showAlerts ? "text-[#FBBF24]" : "text-slate-600"} />
                              <span className={`text-[10px] font-black uppercase truncate ${filters.showAlerts ? "text-[#F8FAFC]" : "text-slate-450"}`}>Alerts</span>
                            </div>
                            <span className={`w-2 h-2 rounded-full transition-all shrink-0 ${filters.showAlerts ? "bg-[#FBBF24] shadow-[0_0_8px_#fbbf24]" : "bg-slate-800 border border-slate-700"}`} />
                          </div>
                          <p className={`text-[8.5px] font-semibold leading-tight line-clamp-2 ${filters.showAlerts ? "text-slate-350" : "text-slate-550"}`}>Active NWS watches & warnings</p>
                        </button>
                      </div>

                      {/* Hail Severity Sub-section */}
                      {filters.showHail && (
                        <div className="flex flex-col gap-1 bg-[#050B16]/50 p-2.5 rounded-xl border border-[rgba(20,92,255,0.10)] animate-in fade-in duration-200">
                          <div className="flex items-center justify-between">
                            <span className="text-[9px] text-[#94A3B8] font-bold uppercase tracking-wider pl-0.5">Hail Severity</span>
                            <select
                              value={filters.minHailSize}
                              onChange={(e) => onFiltersChange({ minHailSize: parseFloat(e.target.value) })}
                              className="bg-[#050B16] border border-[#145CFF]/25 hover:border-[#145CFF]/45 rounded px-2 py-1 text-[9.5px] font-black text-[#F8FAFC] focus:outline-none focus:ring-1 focus:ring-[#145CFF]/55 cursor-pointer appearance-none pr-5 relative text-right"
                              style={{
                                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%2394A3B8'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='3' d='M19 9l-7 7-7-7'/%3E%3C/svg%3E")`,
                                backgroundRepeat: 'no-repeat',
                                backgroundPosition: 'right 4px center',
                                backgroundSize: '8px',
                              }}
                            >
                              <option value="0">All Sizes</option>
                              <option value="1.0">≥ 1.00&quot;</option>
                              <option value="1.5">≥ 1.50&quot;</option>
                              <option value="2.0">≥ 2.00&quot;</option>
                            </select>
                          </div>
                        </div>
                      )}

                      {/* Navigation */}
                      <div className="flex gap-2 pt-1">
                        <button
                          type="button"
                          onClick={() => setWizardStep(2)}
                          className="py-2.5 px-4 rounded-xl bg-[#050B16] border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700 text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1.5"
                        >
                          <ArrowLeft size={12} />
                          Back
                        </button>
                        {isSignalsValid ? (
                          <button
                            type="button"
                            onClick={() => setWizardStep(4)}
                            className="flex-1 py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#145CFF] to-[#2570FF] hover:from-[#2570FF] hover:to-[#3b82f6] text-white text-[11px] font-black uppercase tracking-wider transition-all duration-200 hover:scale-[1.01] hover:shadow-[0_0_20px_rgba(20,92,255,0.3)] active:scale-[0.98] cursor-pointer flex items-center justify-center gap-2"
                          >
                            Continue to Scan
                            <ChevronRight size={14} />
                          </button>
                        ) : (
                          <button
                            type="button"
                            disabled
                            className="flex-1 py-2.5 px-4 rounded-xl bg-[#091528] border border-slate-800 text-slate-500 text-[10px] font-bold uppercase tracking-wider cursor-not-allowed select-none"
                          >
                            Choose at least one storm signal
                          </button>
                        )}
                      </div>
                    </div>
                  )}

                  {/* ===== STEP 4: Ready to Scan ===== */}
                  {wizardStep === 4 && (
                    <div className="bg-[rgba(11,25,48,0.72)] border border-[rgba(20,92,255,0.14)] rounded-xl p-3.5 space-y-3.5 shadow-lg shadow-black/20 animate-in fade-in slide-in-from-right-2 duration-300">
                      <div>
                        <h3 className="text-[14px] font-black text-[#F8FAFC]">Ready to Scan</h3>
                        <p className="text-[10px] text-slate-400 font-semibold leading-relaxed mt-0.5">
                          We&apos;ll scan this territory for storm-damage property lead opportunities.
                        </p>
                      </div>

                      {/* Confirmation Card */}
                      <div className="bg-[#050B16]/60 border border-[rgba(20,92,255,0.12)] rounded-xl p-3 space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Target Territory</span>
                          <span className="text-[10.5px] font-black text-[#F8FAFC]">{tCounty?.countyName || "County"}, {tState}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Radius</span>
                          <span className="text-[10.5px] font-black text-[#F8FAFC]">{tRadius} miles</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Scan Dates</span>
                          <span className="text-[10.5px] font-black text-[#F8FAFC]">{dateRangeSummary}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Storm Signals</span>
                          <span className="text-[10.5px] font-black text-[#F8FAFC]">{selectedSignals}</span>
                        </div>
                        {filters.showHail && filters.minHailSize > 0 && (
                          <div className="flex items-center justify-between">
                            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Hail Severity</span>
                            <span className="text-[10.5px] font-black text-[#F8FAFC]">{hailSeverityLabel}</span>
                          </div>
                        )}
                      </div>

                      {scanError && (
                        <div className="p-3 bg-red-500/10 border border-red-500/25 rounded-lg flex items-start gap-2 text-[10px] text-[#ef4444] font-extrabold animate-pulse">
                          <AlertCircle size={14} className="shrink-0 mt-0.5" />
                          <div className="flex-1 leading-normal">
                            Unable to complete scan. Please check the selected territory and try again.
                            <span className="block text-[8px] font-medium text-red-500/80 mt-0.5">{scanError}</span>
                          </div>
                        </div>
                      )}

                      {/* Hero Scan Button */}
                      <button
                        type="button"
                        onClick={handleScanTerritory}
                        data-tour="scan-button"
                        className="w-full py-4 px-4 rounded-xl bg-[#091528] border border-[#145CFF]/50 text-[#F8FAFC] font-black uppercase text-[12px] tracking-widest transition-all duration-300 flex flex-col items-center justify-center gap-1 shadow-[0_0_20px_rgba(20,92,255,0.25)] hover:shadow-[0_0_30px_rgba(20,92,255,0.4)] hover:-translate-y-[2px] hover:border-[#145CFF] hover:bg-[#0B1D37] active:translate-y-0 active:scale-[0.98] cursor-pointer group relative overflow-hidden"
                      >
                        <div className="flex items-center gap-2.5">
                          <Compass size={15} className="animate-spin text-[#00E676]" style={{ animationDuration: '6s' }} />
                          <span className="font-extrabold text-[13px] text-[#F8FAFC]">SCAN TERRITORY</span>
                          <span className="w-2 h-2 rounded-full bg-[#00E676] animate-pulse shadow-[0_0_8px_#00e676]" />
                        </div>
                        <span className="text-[9px] font-bold text-slate-400 lowercase first-letter:uppercase leading-none tracking-normal">
                          Find storm-damage property leads
                        </span>
                      </button>

                      {/* Back Button */}
                      <button
                        type="button"
                        onClick={() => setWizardStep(3)}
                        className="w-full py-2 px-4 rounded-xl bg-[#050B16] border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700 text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-1.5"
                      >
                        <ArrowLeft size={12} />
                        Back
                      </button>
                    </div>
                  )}
                </div>
              );
              })()}

              {/* Scan Complete State */}
              {activeTab === "filters" && scanStatus === "complete" && (
                <div className="bg-[rgba(11,25,48,0.72)] border border-[rgba(0,230,118,0.18)] rounded-xl p-4 space-y-3 shadow-lg shadow-black/20 text-left animate-in fade-in duration-300">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={18} className="text-[#00E676] shrink-0" />
                    <div>
                      <h3 className="text-[13px] font-black text-[#00E676]">Scan Complete</h3>
                      <p className="text-[9.5px] text-slate-400 font-semibold">{tCounty?.countyName || filters.selectedCounty || "County"}, {tState || filters.state} · {tRadius} mi</p>
                    </div>
                  </div>
                  <div className="text-[9px] font-semibold text-slate-400">
                    {[
                      filters.showHail && "Hail",
                      filters.showWind && "Wind",
                      filters.showTornado && "Tornado",
                      filters.showAlerts && "Alerts",
                    ].filter(Boolean).join(" + ")}
                  </div>
                  {resultLeadEstimate !== null && (
                    <div className="text-center py-2">
                      <span className="text-3xl font-black text-[#F8FAFC]">{resultLeadEstimate}</span>
                      <span className="text-[10px] font-bold text-slate-400 block mt-0.5">Leads Found</span>
                    </div>
                  )}
                </div>
              )}





              {activeTab === "targets" && (
                <div className="space-y-4 text-left">
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

                  <div className="bg-slate-900/40 border border-slate-905 rounded-lg p-3 text-[10.5px] text-slate-350 flex flex-col gap-1.5 shadow-sm">
                    <div className="flex items-center gap-1.5 font-bold text-slate-205">
                      <Info size={13} className="text-[#145CFF] shrink-0" />
                      <span>Opportunity Targeting</span>
                    </div>
                    <p className="leading-normal text-slate-400">
                      These target opportunities represent approximate storm-impacted communities identified by SPC/NOAA datasets. Focus roofing target lists in these territories.
                    </p>
                  </div>

                  {clusters.length === 0 ? (
                    <div className="py-8 text-center border border-dashed border-slate-900 rounded-lg text-slate-600 text-xs">
                      No active storm target clusters found for current filters.
                    </div>
                  ) : (
                    <div className="space-y-2.5">
                      <span className="text-[9.5px] font-bold text-slate-400 uppercase tracking-wide block pl-0.5">Top Opportunity Territories</span>
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
                                    {cluster.county ? `${cluster.county} County` : "Unknown County"}, {cluster.state || "ST"} Storm
                                  </h4>
                                  <span className="text-[10px] text-slate-400 block mt-0.5 truncate">
                                    Strike Zone: {formatSPCDescriptor(cluster.name)}
                                  </span>
                                </div>
                                <span className={`px-2 py-0.5 rounded text-[10px] font-extrabold shrink-0 border ${
                                  cluster.totalScore >= 120
                                    ? "bg-red-500/10 border-red-500/30 text-red-400"
                                    : cluster.totalScore >= 70
                                    ? "bg-orange-500/10 border-orange-500/30 text-orange-400"
                                    : "bg-slate-800 border-slate-700 text-slate-305"
                                }`}>
                                  Score: {cluster.totalScore}
                                </span>
                              </div>

                              <div className="space-y-1.5 bg-slate-950/40 border border-slate-900/60 p-2 rounded text-[10px] text-slate-400">
                                <div className="flex justify-between items-center">
                                  <span>Reports Count:</span>
                                  <span className="font-bold text-slate-200">{cluster.reportsCount}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                  <span>Strike Radius:</span>
                                  <span className="font-bold text-slate-200">{cluster.suggestedRadius} mi</span>
                                </div>
                                <div className="flex justify-between items-center">
                                  <span>Threat Signal:</span>
                                  <span className="font-bold text-slate-200 capitalize">{cluster.mainStormType}</span>
                                </div>
                                {hasHighestImpact && (
                                  <div className="flex justify-between items-center border-t border-slate-900/30 pt-1 mt-1">
                                    <span>Max Measured Intensity:</span>
                                    <span className="font-bold text-[#F8FAFC]">{cluster.highestMagnitude}</span>
                                  </div>
                                )}
                              </div>

                              <div className="pt-1.5 border-t border-slate-900/30 flex gap-1.5 items-center justify-between">
                                <button
                                  disabled={loadingClusterId === cluster.id}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleCollectRadiusLeads(cluster);
                                  }}
                                  className="flex-1 py-2 px-3 rounded-lg bg-[#145CFF] hover:bg-[#2570FF] disabled:bg-[rgba(20,92,255,0.08)] disabled:text-slate-500 text-white text-[10px] font-extrabold uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow-md shadow-[#145CFF]/20"
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
                                  className="py-2 px-2.5 rounded-lg border border-[rgba(20,92,255,0.20)] hover:border-[rgba(20,92,255,0.40)] bg-[rgba(20,92,255,0.08)] hover:bg-[rgba(20,92,255,0.16)] text-[#94A3B8] hover:text-[#F8FAFC] text-[10px] font-extrabold uppercase transition-all cursor-pointer flex items-center justify-center"
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
                <div className="space-y-4 text-left">
                  {selectedProperty && (
                    <div className="p-2.5 bg-slate-900/10 border border-slate-905 rounded-lg animate-in fade-in slide-in-from-top-2 duration-200">
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
                      <span className="text-[10.5px] font-bold text-slate-305 tracking-wide">Saved Properties</span>
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
                    <div className="py-10 text-center border border-dashed border-slate-800 rounded-lg text-slate-500 flex flex-col items-center justify-center gap-2">
                      <MapPin size={20} className="text-slate-700 animate-pulse" />
                      <p className="text-[11px] font-bold text-slate-350">No saved properties yet</p>
                      <p className="text-[9.5px] text-slate-500 max-w-[220px] leading-normal font-medium">
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



          </div>
        )}

      {/* Sticky bottom CTA banner when scanStatus === "complete" */}
      {scanStatus === "complete" && resultLeadEstimate !== null && (
        <div className="shrink-0 relative p-3 bg-[#060D1E]/95 border-t border-[#145CFF]/30 z-30 shadow-2xl flex flex-col gap-2 animate-in slide-in-from-bottom duration-300">
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
        className="fixed top-[92px] left-3 z-[1001] p-2.5 rounded-lg bg-[#061A2F]/90 border border-[rgba(20,92,255,0.24)] text-[#F8FAFC] shadow-glass backdrop-blur-md md:hidden focus:outline-none hover:bg-[#145CFF]/16 transition-all"
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
