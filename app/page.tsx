"use client";

import React from "react";
import dynamic from "next/dynamic";
import { StormFilterState, StormReport, NwsAlert, SelectedPropertyTarget, ActivePopupDetail } from "@/lib/weather/types";
import { StormSidebar } from "@/components/storm-map/StormSidebar";
import { AppHeader } from "@/components/storm-map/AppHeader";
import { AlertCircle, RefreshCw, Zap } from "lucide-react";
import { StormTargetWelcomePanel } from "@/components/storm-map/StormTargetWelcomePanel";
import { ProductRequestModal } from "@/components/storm-map/enrichment/ProductRequestModal";
import { ProductType } from "@/components/storm-map/enrichment/StormProductActionPanel";

// Dynamically import the map component with SSR disabled to prevent Mapbox window reference errors
const StormMap = dynamic(() => import("@/components/storm-map/StormMap"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full bg-slate-950 flex flex-col items-center justify-center gap-3.5 text-slate-400">
      <div className="w-12 h-12 border-4 border-red-500/20 border-t-red-500 rounded-full animate-spin"></div>
      <div className="flex flex-col items-center gap-1 text-center">
        <span className="text-xs uppercase font-extrabold tracking-wider text-slate-300">
          Initializing Map Canvas
        </span>
        <span className="text-[10px] text-slate-600 font-medium">
          Loading NOAA Radar & GIS Engines...
        </span>
      </div>
    </div>
  ),
});

export default function StormMapPage() {
  const [filters, setFilters] = React.useState<StormFilterState>({
    searchQuery: "",
    state: "",
    radius: 0,
    center: null,
    targetZoom: undefined,
    showHail: true,
    showWind: true,
    showTornado: true,
    showAlerts: true,
    showRadar: true,
    radarOpacity: 1.0,
    timeWindow: "24h",
    mapStyle: "dark",
    showNeighborhoodLabels: true,
    showHouseNumbers: true,
    showBuildings: true,
  });

  const [selectedProperty, setSelectedProperty] = React.useState<SelectedPropertyTarget | null>(null);
  const [activeDetail, setActiveDetail] = React.useState<ActivePopupDetail | null>(null);
  const [leads, setLeads] = React.useState<SelectedPropertyTarget[]>([]);

  const [welcomeOpen, setWelcomeOpen] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState<"start" | "filters" | "targets" | "leads">("start");

  // Lifted modal drawer states
  const [modalOpen, setModalOpen] = React.useState(false);
  const [modalProduct, setModalProduct] = React.useState<ProductType | "ZIP_REPORT" | null>(null);
  const [modalContextType, setModalContextType] = React.useState<"storm-area" | "property" | "standalone" | null>(null);
  const [modalContextData, setModalContextData] = React.useState<any | null>(null);

  // Check localStorage for dismissal on mount to avoid hydration mismatch
  React.useEffect(() => {
    try {
      const dismissed = localStorage.getItem("stormtargetWelcomeDismissed");
      if (dismissed !== "true") {
        setWelcomeOpen(true);
      }
    } catch (e) {
      console.error("Failed to check welcome dismissal", e);
      setWelcomeOpen(true);
    }
  }, []);

  const handleCloseWelcome = () => {
    setWelcomeOpen(false);
    try {
      localStorage.setItem("stormtargetWelcomeDismissed", "true");
    } catch (e) {
      console.error("Failed to set welcome dismissal", e);
    }
  };

  const handleOpenWelcome = () => {
    setWelcomeOpen(true);
  };

  const handleOpenRequestModal = (
    contextType: "storm-area" | "property" | "standalone",
    contextData: any,
    product: ProductType | "ZIP_REPORT"
  ) => {
    setModalContextType(contextType);
    setModalContextData(contextData);
    setModalProduct(product);
    setModalOpen(true);
  };

  const handleSelectWelcomeOption = (option: "map" | "report" | "appointments") => {
    setWelcomeOpen(false);
    // Mark welcome panel as dismissed in localStorage too when selecting an option
    try {
      localStorage.setItem("stormtargetWelcomeDismissed", "true");
    } catch (e) {
      console.error("Failed to set welcome dismissal", e);
    }

    if (option === "map") {
      setActiveTab("targets");
    } else if (option === "report") {
      handleOpenRequestModal("standalone", null, "ZIP_REPORT");
    } else if (option === "appointments") {
      handleOpenRequestModal("standalone", null, "ROOF_INSPECTION_APPOINTMENTS");
    }
  };

  // Load from localStorage on mount
  React.useEffect(() => {
    try {
      const saved = localStorage.getItem("storm_map_locked_leads");
      if (saved) {
        setLeads(JSON.parse(saved));
      }
    } catch (e) {
      console.error("Failed to load leads from localStorage", e);
    }
  }, []);

  // Save to localStorage helper
  const saveLeads = (updatedLeads: SelectedPropertyTarget[]) => {
    setLeads(updatedLeads);
    try {
      localStorage.setItem("storm_map_locked_leads", JSON.stringify(updatedLeads));
    } catch (e) {
      console.error("Failed to save leads to localStorage", e);
    }
  };

  const handleLockProperty = (property: SelectedPropertyTarget) => {
    const isAlreadyLead = leads.some(
      (l) => l.latitude === property.latitude && l.longitude === property.longitude
    );
    if (!isAlreadyLead) {
      const newLead = { ...property, locked: true, id: property.id || `lead-${Date.now()}` };
      const updatedLeads = [...leads, newLead];
      saveLeads(updatedLeads);
    }
    setSelectedProperty({ ...property, locked: true });
  };

  const handleUnlockProperty = () => {
    setSelectedProperty(null);
  };

  const handleRemoveLead = (leadId: string) => {
    const updatedLeads = leads.filter((l) => l.id !== leadId);
    saveLeads(updatedLeads);
    if (selectedProperty && selectedProperty.id === leadId) {
      setSelectedProperty(null);
    }
  };

  const handleUpdateLead = (updatedLead: SelectedPropertyTarget) => {
    const updated = leads.map((l) => (l.id === updatedLead.id ? updatedLead : l));
    saveLeads(updated);
    if (selectedProperty && selectedProperty.id === updatedLead.id) {
      setSelectedProperty(updatedLead);
    }
  };

  const handleAddLeads = (newLeads: SelectedPropertyTarget[]) => {
    const filteredNewLeads = newLeads.filter(
      (newLead) => !leads.some((lead) => lead.fullAddress === newLead.fullAddress)
    );
    if (filteredNewLeads.length > 0) {
      saveLeads([...leads, ...filteredNewLeads]);
    }
  };

  const [reports, setReports] = React.useState<StormReport[]>([]);
  const [alerts, setAlerts] = React.useState<NwsAlert[]>([]);
  
  const [isLoading, setIsLoading] = React.useState(true);
  const [isRefreshing, setIsRefreshing] = React.useState(false);
  const [lastUpdated, setLastUpdated] = React.useState<Date | null>(null);
  
  // Track granular fetch error states
  const [errors, setErrors] = React.useState({
    alerts: false,
    reports: false,
  });

  const [sidebarOpen, setSidebarOpen] = React.useState(true);

  // Fetch weather and storm report datasets
  const fetchWeatherData = React.useCallback(async (isBackground = false) => {
    if (!isBackground) setIsLoading(true);
    else setIsRefreshing(true);

    let alertsError = false;
    let reportsError = false;
    let fetchedAlerts: NwsAlert[] = [];
    let fetchedReports: StormReport[] = [];

    // 1. Fetch NWS Alerts (using basePath prefix)
    try {
      const res = await fetch("/storm-map/api/weather/alerts");
      if (!res.ok) throw new Error("Alerts API error");
      fetchedAlerts = await res.json();
      setErrors((prev) => ({ ...prev, alerts: false }));
    } catch (e) {
      console.error("Failed to load NWS alerts:", e);
      alertsError = true;
      setErrors((prev) => ({ ...prev, alerts: true }));
    }

    // 2. Fetch SPC Storm Reports (using basePath prefix)
    try {
      const res = await fetch("/storm-map/api/weather/spc-reports");
      if (!res.ok) throw new Error("Reports API error");
      fetchedReports = await res.json();
      setErrors((prev) => ({ ...prev, reports: false }));
    } catch (e) {
      console.error("Failed to load SPC reports:", e);
      reportsError = true;
      setErrors((prev) => ({ ...prev, reports: true }));
    }

    // Update states
    if (!alertsError) setAlerts(fetchedAlerts);
    if (!reportsError) setReports(fetchedReports);

    setLastUpdated(new Date());
    setIsLoading(false);
    setIsRefreshing(false);
  }, []);

  // Initial load on component mount
  React.useEffect(() => {
    fetchWeatherData();

    // Auto refresh data every 5 minutes (300,000 ms)
    const interval = setInterval(() => {
      fetchWeatherData(true);
    }, 5 * 60 * 1000);

    return () => clearInterval(interval);
  }, [fetchWeatherData]);

  const handleFiltersChange = (newFilters: Partial<StormFilterState>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };

  const handleSelectCoords = (coords: [number, number], label: string, targetZoom?: number) => {
    setFilters((prev) => ({
      ...prev,
      center: coords,
      searchQuery: label,
      targetZoom: targetZoom,
      // Default to 50 miles search radius when a location is geocoded
      radius: prev.radius === 0 ? 50 : prev.radius,
    }));
  };

  const handleResetView = () => {
    setFilters({
      searchQuery: "",
      state: "",
      radius: 0,
      center: null,
      targetZoom: undefined,
      showHail: true,
      showWind: true,
      showTornado: true,
      showAlerts: true,
      showRadar: true,
      radarOpacity: 1.0,
      timeWindow: "24h",
      mapStyle: "dark",
      showNeighborhoodLabels: true,
      showHouseNumbers: true,
      showBuildings: true,
    });
  };

  return (
    <div className="h-screen w-full flex flex-col overflow-hidden bg-slate-950 font-sans relative">
      <AppHeader sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} onOpenWelcome={handleOpenWelcome} />
      
      <div className="flex-1 w-full flex overflow-hidden relative">
        {/* Collapsible Sidebar */}
        <StormSidebar
          filters={filters}
          onFiltersChange={handleFiltersChange}
          reports={reports}
          alerts={alerts}
          onSelectCoords={handleSelectCoords}
          onResetView={handleResetView}
          onRefresh={() => fetchWeatherData(true)}
          isRefreshing={isRefreshing}
          lastUpdated={lastUpdated}
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          selectedProperty={selectedProperty}
          onUnlockProperty={handleUnlockProperty}
          leads={leads}
          onRemoveLead={handleRemoveLead}
          onUpdateLead={handleUpdateLead}
          activeDetail={activeDetail}
          setActiveDetail={setActiveDetail}
          onSelectProperty={handleLockProperty}
          onAddLeads={handleAddLeads}
          activeTab={activeTab}
          onTabChange={setActiveTab}
          onOpenRequestModal={handleOpenRequestModal}
        />

        {/* Main Map Viewer Panel */}
        <div className="flex-1 h-full relative flex flex-col">
          
          {/* Granular Error Banners (Non-crashing alerts with manual retry triggers) */}
          {(errors.alerts || errors.reports) && (
            <div className="absolute top-3 left-1/2 -translate-x-1/2 z-[1002] max-w-md w-[90%] flex flex-col gap-1.5">
              {errors.alerts && (
                <div className="bg-red-950/90 border border-red-500/30 p-2.5 rounded-lg flex items-center justify-between text-xs text-red-200 shadow-glass backdrop-blur-sm">
                  <div className="flex items-center gap-2">
                    <AlertCircle size={14} className="text-red-400 shrink-0" />
                    <span>NWS Warning Polygons temporary unavailable.</span>
                  </div>
                  <button
                    onClick={() => fetchWeatherData()}
                    className="px-2 py-1 rounded bg-red-900/40 hover:bg-red-900 border border-red-500/20 text-[10px] font-extrabold uppercase transition-colors shrink-0"
                  >
                    Retry
                  </button>
                </div>
              )}
              
              {errors.reports && (
                <div className="bg-red-950/90 border border-red-500/30 p-2.5 rounded-lg flex items-center justify-between text-xs text-red-200 shadow-glass backdrop-blur-sm">
                  <div className="flex items-center gap-2">
                    <AlertCircle size={14} className="text-red-400 shrink-0" />
                    <span>SPC Storm Reports temporary unavailable.</span>
                  </div>
                  <button
                    onClick={() => fetchWeatherData()}
                    className="px-2 py-1 rounded bg-red-900/40 hover:bg-red-900 border border-red-500/20 text-[10px] font-extrabold uppercase transition-colors shrink-0"
                  >
                    Retry
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Dynamic Loading Panel */}
          {isLoading ? (
            <div className="w-full h-full bg-slate-950 flex flex-col items-center justify-center gap-4 text-slate-400">
              <div className="w-12 h-12 border-4 border-red-600/10 border-t-red-600 rounded-full animate-spin"></div>
              <div className="flex flex-col items-center gap-1.5 text-center">
                <span className="text-xs uppercase font-extrabold tracking-wider text-slate-300 flex items-center gap-1.5">
                  <Zap size={14} className="text-red-500 animate-pulse" />
                  Initializing StormTarget Live
                </span>
                <p className="text-[10px] text-slate-600 font-medium max-w-[280px]">
                  Connecting to NOAA/NWS alerts API and parsing Storm Prediction Center climo reports...
                </p>
              </div>
            </div>
          ) : (
            /* Client-side Hydrated Mapbox Canvas */
            <StormMap
              filters={filters}
              onFiltersChange={handleFiltersChange}
              reports={reports}
              alerts={alerts}
              onRefresh={() => fetchWeatherData(true)}
              isRefreshing={isRefreshing}
              selectedProperty={selectedProperty}
              onLockProperty={handleLockProperty}
              onUnlockProperty={handleUnlockProperty}
              leads={leads}
              activeDetail={activeDetail}
              setActiveDetail={setActiveDetail}
              onAddLeads={handleAddLeads}
            />
          )}

        </div>
      </div>

      {/* Onboarding Welcome Panel Overlay */}
      <StormTargetWelcomePanel
        isOpen={welcomeOpen}
        onClose={handleCloseWelcome}
        onSelectOption={handleSelectWelcomeOption}
      />

      {/* App-level Product Action Request Drawer Overlay */}
      {modalOpen && modalProduct && modalContextType && (
        <ProductRequestModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          productType={modalProduct}
          contextType={modalContextType}
          contextData={modalContextData}
          isEnrichmentEnabled={false}
          onAddLeads={handleAddLeads}
          onTriggerEnrichmentFlow={() => setActiveTab("leads")}
        />
      )}
    </div>
  );
}
