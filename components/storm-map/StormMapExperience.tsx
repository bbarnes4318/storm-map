"use client";

import React from "react";
import dynamic from "next/dynamic";
import { StormFilterState, StormReport, NwsAlert, SelectedPropertyTarget, ActivePopupDetail } from "@/lib/weather/types";
import { StormSidebar } from "@/components/storm-map/StormSidebar";
import { AppHeader } from "@/components/storm-map/AppHeader";
import { LeadIntelligencePanel } from "@/components/storm-map/enrichment/LeadIntelligencePanel";
import { AlertCircle, RefreshCw, Zap, Layers, Compass } from "lucide-react";
import { TerritoryScanOverlay } from "@/components/storm-map/TerritoryScanOverlay";
import { TerritoryLeadResultCard } from "@/components/storm-map/TerritoryLeadResultCard";
import { MapErrorBoundary } from "./MapErrorBoundary";
import { SampleLeadFileModal } from "@/components/storm-map/SampleLeadFileModal";
import { UpgradeCheckoutModal } from "@/components/storm-map/UpgradeCheckoutModal";
import { GuidedDemoOverlay } from "@/components/storm-map/GuidedDemoOverlay";
import { getCountyByStateAndName } from "@/lib/geo/us-counties";
import { getDistanceMiles } from "@/lib/weather/geo";

// Dynamically import the map component with SSR disabled to prevent Mapbox window reference errors
const StormMap = dynamic(() => import("@/components/storm-map/StormMap"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full bg-slate-950 flex flex-col items-center justify-center gap-3.5 text-slate-400">
      <div className="w-12 h-12 border-4 border-[#145CFF]/20 border-t-[#145CFF] rounded-full animate-spin"></div>
      <div className="flex flex-col items-center gap-1 text-center">
        <span className="text-xs uppercase font-extrabold tracking-wider text-slate-300">
          Initializing Map Canvas
        </span>
        <span className="text-[10px] text-slate-650 font-medium">
          Loading NOAA Radar & GIS Engines...
        </span>
      </div>
    </div>
  ),
});

// Helpers to get default dates
const getDemoDefaultDates = () => {
  const today = new Date();
  // newest demo date is today - 1 year - 1 day (strict over 1 year ago)
  const maxDate = new Date(today.getFullYear() - 1, today.getMonth(), today.getDate() - 1);
  const minDate = new Date(maxDate);
  minDate.setDate(minDate.getDate() - 7);
  
  return {
    startDate: minDate.toISOString().split("T")[0],
    endDate: maxDate.toISOString().split("T")[0]
  };
};

const getNormalDefaultDates = () => {
  const today = new Date();
  const fromDate = new Date();
  fromDate.setDate(fromDate.getDate() - 7);
  
  return {
    startDate: fromDate.toISOString().split("T")[0],
    endDate: today.toISOString().split("T")[0]
  };
};

interface StormMapExperienceProps {
  isDemo?: boolean;
}

export function StormMapExperience({ isDemo = false }: StormMapExperienceProps) {
  const initialDates = isDemo ? getDemoDefaultDates() : getNormalDefaultDates();

  const [filters, setFilters] = React.useState<StormFilterState>({
    searchQuery: "",
    state: "",
    radius: 15,
    center: null,
    targetZoom: undefined,
    showHail: true,
    showWind: true,
    showTornado: true,
    showAlerts: true,
    showRadar: true,
    radarOpacity: 1.0,
    timeWindow: "custom", // default to custom so From/To Dates are active
    startDate: initialDates.startDate,
    endDate: initialDates.endDate,
    minHailSize: 0,
    mapStyle: "dark",
    showNeighborhoodLabels: true,
    showHouseNumbers: true,
    showBuildings: true,
    selectedCounty: undefined,
    selectedCountyFull: undefined,
    selectedCountyFips: undefined,
    countyBbox: undefined,
    searchStatus: "empty",
  });

  const [selectedProperty, setSelectedProperty] = React.useState<SelectedPropertyTarget | null>(null);
  const [activeDetail, setActiveDetail] = React.useState<ActivePopupDetail | null>(null);
  const [leads, setLeads] = React.useState<SelectedPropertyTarget[]>([]);

  // Scan Orchestration States
  const [scanStatus, setScanStatus] = React.useState<"idle" | "scanning" | "complete">("idle");
  const [scanNonce, setScanNonce] = React.useState<number>(0);
  const [sampleModalOpen, setSampleModalOpen] = React.useState<boolean>(false);
  const [upgradeModalOpen, setUpgradeModalOpen] = React.useState<boolean>(false);
  const [resultLeadEstimate, setResultLeadEstimate] = React.useState<number | null>(null);
  const [scanError, setScanError] = React.useState<string | null>(null);

  // Guided Walkthrough State (0 = disabled, 1..10 = steps)
  const [tourStep, setTourStep] = React.useState<number>(isDemo ? 1 : 0);
  const [wizardStep, setWizardStep] = React.useState<1 | 2 | 3 | 4>(1);
  const [experienceMode, setExperienceMode] = React.useState<"choice" | "explore" | "target">(isDemo ? "target" : "choice");

  // Sidebar open state
  const [sidebarOpen, setSidebarOpen] = React.useState(true);

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

  const handleLockProperty = (property: SelectedPropertyTarget | null) => {
    if (!property) return;
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

  // Fetch weather and storm report datasets
  const fetchWeatherData = React.useCallback(async (isBackground = false) => {
    if (!isBackground) setIsLoading(true);
    else setIsRefreshing(true);

    let alertsError = false;
    let reportsError = false;
    let fetchedAlerts: NwsAlert[] = [];
    let fetchedReports: StormReport[] = [];

    // 1. Fetch NWS Alerts
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

    // 2. Fetch SPC Storm Reports
    try {
      let url = "/storm-map/api/weather/spc-reports";
      const params = new URLSearchParams();
      if (filters.timeWindow) {
        params.append("timeWindow", filters.timeWindow);
      }
      if (filters.timeWindow === "custom") {
        if (filters.startDate) params.append("startDate", filters.startDate);
        if (filters.endDate) params.append("endDate", filters.endDate);
      }
      const queryString = params.toString();
      if (queryString) {
        url += `?${queryString}`;
      }

      const res = await fetch(url);
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
  }, [filters.timeWindow, filters.startDate, filters.endDate]);

  // Initial load on component mount
  React.useEffect(() => {
    fetchWeatherData();

    // Auto refresh data every 5 minutes (300,000 ms)
    const interval = setInterval(() => {
      fetchWeatherData(true);
    }, 5 * 60 * 1000);

    return () => clearInterval(interval);
  }, [fetchWeatherData]);

  React.useEffect(() => {
    if (!filters.center) {
      setScanStatus("idle");
      setResultLeadEstimate(null);
    }
  }, [filters.center]);

  const handleFiltersChange = (newFilters: Partial<StormFilterState>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };

  const handleSelectCoords = (coords: [number, number], label: string, targetZoom?: number) => {
    setFilters((prev) => ({
      ...prev,
      center: coords,
      searchQuery: label,
      targetZoom: targetZoom,
      radius: prev.radius === 0 ? 50 : prev.radius,
    }));
  };

  const handleResetView = () => {
    const resetDates = isDemo ? getDemoDefaultDates() : getNormalDefaultDates();
    setFilters({
      searchQuery: "",
      state: "",
      radius: 15,
      center: null,
      targetZoom: undefined,
      showHail: true,
      showWind: true,
      showTornado: true,
      showAlerts: true,
      showRadar: true,
      radarOpacity: 1.0,
      timeWindow: "custom",
      startDate: resetDates.startDate,
      endDate: resetDates.endDate,
      minHailSize: 0,
      mapStyle: "dark",
      showNeighborhoodLabels: true,
      showHouseNumbers: true,
      showBuildings: true,
      selectedCounty: undefined,
      selectedCountyFull: undefined,
      selectedCountyFips: undefined,
      countyBbox: undefined,
      searchStatus: "empty",
    });
    setScanStatus("idle");
    setResultLeadEstimate(null);
  };

  const resetDemoExperience = React.useCallback((tourStart: boolean = true) => {
    setWizardStep(1);
    setScanStatus("idle");
    setScanNonce(0);
    setResultLeadEstimate(null);
    setScanError(null);
    setSampleModalOpen(false);
    setUpgradeModalOpen(false);
    setSelectedProperty(null);
    setActiveDetail(null);
    setTourStep(tourStart ? 1 : 0);

    const demoDates = getDemoDefaultDates();
    setFilters({
      searchQuery: "",
      state: "",
      radius: 15,
      center: null,
      targetZoom: undefined,
      showHail: true,
      showWind: true,
      showTornado: true,
      showAlerts: true,
      showRadar: true,
      radarOpacity: 1.0,
      timeWindow: "custom",
      startDate: demoDates.startDate,
      endDate: demoDates.endDate,
      minHailSize: 0,
      mapStyle: "dark",
      showNeighborhoodLabels: true,
      showHouseNumbers: true,
      showBuildings: true,
      selectedCounty: undefined,
      selectedCountyFull: undefined,
      selectedCountyFips: undefined,
      countyBbox: undefined,
      searchStatus: "empty",
    });
  }, []);

  const handleScanStart = (selectedState: string, selectedCounty: string, selectedRadius: number) => {
    setScanError(null);
    try {
      if (!selectedState || !selectedCounty) {
        throw new Error("State and County must be selected.");
      }

      const countyData = getCountyByStateAndName(selectedState, selectedCounty);
      if (!countyData) {
        throw new Error(`Unable to locate geographic boundary data for ${selectedCounty}, ${selectedState}.`);
      }

      if (!countyData.centroid || typeof countyData.centroid.lat !== "number" || typeof countyData.centroid.lon !== "number") {
        throw new Error(`Geographic coordinates for ${selectedCounty} are missing or invalid.`);
      }

      if (!countyData.bbox || typeof countyData.bbox.west !== "number") {
        throw new Error(`Bounding box bounds for ${selectedCounty} are missing or invalid.`);
      }

      const centerCoords: [number, number] = [countyData.centroid.lat, countyData.centroid.lon];

      const reportsArray = reports || [];
      // Filter reports in radius to compute multiplier
      const filteredInRadius = reportsArray.filter((r) => {
        if (!r) return false;
        if (r.state.toUpperCase() !== selectedState.toUpperCase()) return false;
        const dist = getDistanceMiles(centerCoords[0], centerCoords[1], r.lat, r.lon);
        if (dist > selectedRadius) return false;
        
        // Layer toggles
        if (r.type === "hail" && !filters.showHail) return false;
        if (r.type === "wind" && !filters.showWind) return false;
        if (r.type === "tornado" && !filters.showTornado) return false;
        
        // Hail size filter
        if (r.type === "hail" && filters.minHailSize > 0) {
          const hSize = parseFloat(r.magnitude || "0");
          if (!isNaN(hSize) && hSize < filters.minHailSize) return false;
        }
        return true;
      });

      const hCount = filteredInRadius.filter((r) => r.type === "hail").length;
      const wCount = filteredInRadius.filter((r) => r.type === "wind").length;
      const tCount = filteredInRadius.filter((r) => r.type === "tornado").length;
      
      // Count warnings in county defensively
      const alertsArray = alerts || [];
      const warnCount = alertsArray.filter((a) => {
        if (!a || !a.event || typeof a.event.includes !== "function") return false;
        if (!a.event.includes("Warning")) return false;
        
        const areaDescLower = (a.areaDesc || "").toLowerCase();
        const headlineLower = (a.headline || "").toLowerCase();
        const countyLower = selectedCounty.toLowerCase();
        
        return areaDescLower.includes(countyLower) || headlineLower.includes(countyLower);
      }).length;

      // Calculate lead estimate
      const base = selectedRadius * selectedRadius * 2.8;
      const stormMultiplier = 1 + hCount * 0.12 + wCount * 0.08 + tCount * 0.18 + warnCount * 0.10;
      
      let hailSizeMultiplier = 1.0;
      if (filters.minHailSize === 1.0) hailSizeMultiplier = 1.15;
      else if (filters.minHailSize === 1.5) hailSizeMultiplier = 1.3;
      else if (filters.minHailSize === 2.0) hailSizeMultiplier = 1.5;

      const estimated = Math.round(base * stormMultiplier * hailSizeMultiplier);
      const clampedEstimate = Math.max(47, Math.min(2500, estimated));

      setResultLeadEstimate(clampedEstimate);

      // Update filters
      setFilters((prev) => ({
        ...prev,
        state: selectedState,
        selectedCounty: countyData.countyName,
        selectedCountyFull: countyData.countyFullName,
        selectedCountyFips: countyData.fips,
        countyBbox: {
          west: countyData.bbox.west,
          south: countyData.bbox.south,
          east: countyData.bbox.east,
          north: countyData.bbox.north,
        },
        center: centerCoords,
        radius: selectedRadius,
        searchQuery: `${countyData.countyFullName}, ${selectedState}`,
        searchStatus: "complete",
      }));

      // Trigger scanning
      setScanStatus("scanning");
      setScanNonce((prev) => prev + 1);
    } catch (err: any) {
      console.error("Defensive Scan Start failed:", err);
      setScanError(err.message || "An unexpected error occurred during scan orchestration.");
      setScanStatus("idle");
      setResultLeadEstimate(null);
    }
  };

  const handleScanComplete = () => {
    setScanStatus("complete");
  };

  // Walkthrough Auto-Sync Effects
  React.useEffect(() => {
    if (!isDemo || tourStep <= 0) return;

    // Auto-advance Step 5 (Launch Scan) -> Step 6 (Watch Scan)
    if (scanStatus === "scanning" && tourStep === 5) {
      setTourStep(6);
    }
    // Auto-advance Step 6 (Watch Scan) -> Step 7 (Leads Found)
    if (scanStatus === "complete" && tourStep === 6) {
      setTourStep(7);
    }
  }, [scanStatus, tourStep, isDemo]);

  React.useEffect(() => {
    if (!isDemo || tourStep <= 0) return;

    // Auto-advance Step 8 (View Sample button) -> Step 9 (Sample Modal) when modal opens
    if (sampleModalOpen && (tourStep === 7 || tourStep === 8)) {
      setTourStep(9);
    }
    // End tour when modal closes from Step 9
    if (!sampleModalOpen && tourStep === 9) {
      setTourStep(0);
    }
  }, [sampleModalOpen, tourStep, isDemo]);

  React.useEffect(() => {
    if (!isDemo || tourStep <= 0) return;

    // Sync tour step to wizard step
    if (tourStep === 1 || tourStep === 2) {
      setWizardStep(1);
    } else if (tourStep === 3) {
      setWizardStep(2);
    } else if (tourStep === 4) {
      setWizardStep(3);
    } else if (tourStep >= 5) {
      setWizardStep(4);
    }
  }, [tourStep, isDemo]);

  React.useEffect(() => {
    if (!isDemo || tourStep <= 0) return;

    // Sync wizard step changes (like clicking "Continue" in sidebar) back to tour step
    if (wizardStep === 2 && tourStep < 3) {
      setTourStep(3);
    } else if (wizardStep === 3 && tourStep < 4) {
      setTourStep(4);
    } else if (wizardStep === 4 && tourStep < 5) {
      setTourStep(5);
    }
  }, [wizardStep, tourStep, isDemo]);

  return (
    <div className="h-screen w-full flex flex-col overflow-hidden bg-slate-950 font-sans relative">
      <AppHeader sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      
      <div className="flex-1 w-full flex min-h-0 overflow-hidden relative">
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
          scanStatus={scanStatus}
          scanNonce={scanNonce}
          onScanStart={handleScanStart}
          onOpenSampleModal={() => setSampleModalOpen(true)}
          onOpenUpgradeModal={() => setUpgradeModalOpen(true)}
          resultLeadEstimate={resultLeadEstimate}
          isDemo={isDemo}
          demoStep={tourStep}
          wizardStep={wizardStep}
          onWizardStepChange={setWizardStep}
          scanError={scanError}
          experienceMode={experienceMode}
          setExperienceMode={setExperienceMode}
        />

        {/* Main Map Viewer Panel */}
        <div className="flex-1 h-full relative flex flex-col">
          
          {/* Granular Error Banners */}
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
              <div className="w-12 h-12 border-4 border-red-650/10 border-t-red-650 rounded-full animate-spin"></div>
              <div className="flex flex-col items-center gap-1.5 text-center">
                <span className="text-xs uppercase font-extrabold tracking-wider text-slate-305 flex items-center gap-1.5">
                  <Zap size={14} className="text-red-500 animate-pulse" />
                  Initializing StormTarget Live
                </span>
                <p className="text-[10px] text-slate-600 font-medium max-w-[280px]">
                  Connecting to NOAA/NWS alerts API and parsing Storm Prediction Center climo reports...
                </p>
              </div>
            </div>
          ) : (
            <>
              {/* Client-side Hydrated Mapbox Canvas */}
              <MapErrorBoundary fallbackText="Something went wrong rendering the interactive map. Please reload.">
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
                  scanStatus={scanStatus}
                  scanNonce={scanNonce}
                  onScanComplete={handleScanComplete}
                />
              </MapErrorBoundary>

              {/* Tactical Scanning HUD Overlay */}
              {scanStatus === "scanning" && filters.selectedCounty && filters.state && (
                <MapErrorBoundary fallbackText="Something went wrong displaying the scanning HUD. Please try again.">
                  <TerritoryScanOverlay
                    selectedCounty={filters.selectedCounty}
                    stateCode={filters.state}
                    radius={filters.radius}
                    showHail={filters.showHail}
                    showWind={filters.showWind}
                    showTornado={filters.showTornado}
                    showAlerts={filters.showAlerts}
                  />
                </MapErrorBoundary>
              )}

              {/* Floating Lead Target Scan Result Card */}
              {scanStatus === "complete" && filters.selectedCounty && filters.state && resultLeadEstimate !== null && (
                <MapErrorBoundary fallbackText="Something went wrong displaying the scan result. Please try again.">
                  <TerritoryLeadResultCard
                    leadCount={resultLeadEstimate}
                    county={filters.selectedCounty}
                    state={filters.state}
                    radius={filters.radius}
                    center={filters.center}
                    showHail={filters.showHail}
                    showWind={filters.showWind}
                    showTornado={filters.showTornado}
                    showAlerts={filters.showAlerts}
                    minHailSize={filters.minHailSize}
                    reports={reports}
                    alerts={alerts}
                    onViewSample={() => setSampleModalOpen(true)}
                    onUpgrade={() => setUpgradeModalOpen(true)}
                    onClose={() => {
                      setScanStatus("idle");
                      setResultLeadEstimate(null);
                    }}
                    isDemo={isDemo}
                  />
                </MapErrorBoundary>
              )}

              {/* Redesigned Floating Lead Target Info Panel */}
              {selectedProperty && (
                <div className="fixed bottom-0 left-0 right-0 md:absolute md:top-4 md:left-4 md:bottom-auto md:right-auto z-[999] w-full md:w-[410px] max-h-[75vh] md:max-h-[calc(100vh-96px)] overflow-hidden rounded-t-[24px] md:rounded-[24px] bg-[#060D1E]/90 backdrop-blur-md border-t md:border border-slate-500/18 shadow-2xl flex flex-col animate-in slide-in-from-bottom md:slide-in-from-left duration-300">
                  <LeadIntelligencePanel
                    selectedProperty={selectedProperty}
                    onUpdateLead={handleUpdateLead}
                    onClearProperty={handleUnlockProperty}
                    leads={leads}
                    onRemoveLead={handleRemoveLead}
                    onAddLeads={handleAddLeads}
                    filters={filters}
                  />
                </div>
              )}
            </>
          )}

        </div>
      </div>

      {/* Excel-Style Sample Leads Preview Modal */}
      {sampleModalOpen && filters.selectedCounty && filters.state && (
        <SampleLeadFileModal
          isOpen={sampleModalOpen}
          onClose={() => setSampleModalOpen(false)}
          county={filters.selectedCounty}
          state={filters.state}
          onUpgrade={() => {
            setSampleModalOpen(false);
            setUpgradeModalOpen(true);
          }}
          onContinueExploring={() => {
            if (isDemo) {
              resetDemoExperience(true);
            } else {
              setSampleModalOpen(false);
            }
          }}
          isDemo={isDemo}
        />
      )}

      {/* Premium Territory Upgrade Form/Checkout Modal */}
      {upgradeModalOpen && filters.selectedCounty && filters.state && (
        <UpgradeCheckoutModal
          isOpen={upgradeModalOpen}
          onClose={() => setUpgradeModalOpen(false)}
          county={filters.selectedCounty}
          state={filters.state}
        />
      )}

      {/* Guided Walkthrough Overlay */}
      {isDemo && tourStep > 0 && (
        <GuidedDemoOverlay
          step={tourStep}
          setStep={setTourStep}
          filters={filters}
          scanStatus={scanStatus}
          sampleModalOpen={sampleModalOpen}
          onRestart={() => {
            resetDemoExperience(true);
          }}
        />
      )}
      {/* Entry Experience Selector Overlay */}
      {!isDemo && experienceMode === "choice" && (
        <div className="fixed inset-0 z-[5000] flex items-center justify-center bg-black/85 backdrop-blur-md p-4 select-none animate-in fade-in duration-300">
          <div className="w-full max-w-2xl bg-[#071426] border border-[#145CFF]/30 rounded-2xl p-8 flex flex-col items-center text-center space-y-6 shadow-2xl relative overflow-hidden animate-in scale-in duration-300">
            <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-[#145CFF] via-[#00E676] to-[#145CFF]" />
            
            <div>
              <h2 className="text-xl md:text-2xl font-black text-[#F8FAFC] uppercase tracking-wider">Welcome to StormTarget</h2>
              <p className="text-xs text-slate-400 font-semibold max-w-md mt-1.5 leading-relaxed">
                Choose how you want to interact with our live storm-damage property intelligence console.
              </p>
            </div>

            <div className="flex flex-col md:flex-row gap-4 w-full pt-2">
              {/* Option 1: Explore Map */}
              <div 
                onClick={() => setExperienceMode("explore")}
                className="flex-1 p-6 rounded-xl border border-slate-800 hover:border-[#00E676]/50 bg-[#050B16]/50 hover:bg-[#00E676]/5 cursor-pointer transition-all duration-300 flex flex-col items-center justify-between text-center group h-64 hover:shadow-[0_0_20px_rgba(0,230,118,0.15)]"
              >
                <div className="w-12 h-12 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-450 group-hover:text-[#00E676] group-hover:border-[#00E676]/30 transition-all">
                  <Layers className="w-6 h-6" />
                </div>
                <div className="space-y-1.5 my-4">
                  <h3 className="text-sm font-black text-white uppercase tracking-wide group-hover:text-[#00E676] transition-colors">Explore Map Myself</h3>
                  <p className="text-[10.5px] text-slate-400 font-semibold leading-relaxed">
                    Browse live SPC storm damage reports, radar loops, and opportunity territories at your own pace.
                  </p>
                </div>
                <button type="button" className="w-full py-2.5 bg-slate-900 group-hover:bg-[#00E676] text-slate-350 group-hover:text-[#050B16] text-[10px] font-black uppercase tracking-wider rounded-lg transition-all border-none cursor-pointer">
                  Start Exploring
                </button>
              </div>

              {/* Option 2: Target Location */}
              <div 
                onClick={() => setExperienceMode("target")}
                className="flex-1 p-6 rounded-xl border border-slate-800 hover:border-[#145CFF]/50 bg-[#050B16]/50 hover:bg-[#145CFF]/5 cursor-pointer transition-all duration-300 flex flex-col items-center justify-between text-center group h-64 hover:shadow-[0_0_20px_rgba(20,92,255,0.15)]"
              >
                <div className="w-12 h-12 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-450 group-hover:text-[#145CFF] group-hover:border-[#145CFF]/30 transition-all">
                  <Compass className="w-6 h-6" />
                </div>
                <div className="space-y-1.5 my-4">
                  <h3 className="text-sm font-black text-white uppercase tracking-wide group-hover:text-[#145CFF] transition-colors">Target a Location</h3>
                  <p className="text-[10.5px] text-slate-400 font-semibold leading-relaxed">
                    Follow our step-by-step territory scan to generate a precise list of storm-damage property leads.
                  </p>
                </div>
                <button type="button" className="w-full py-2.5 bg-slate-900 group-hover:bg-[#145CFF] text-slate-350 group-hover:text-white text-[10px] font-black uppercase tracking-wider rounded-lg transition-all border-none cursor-pointer">
                  Target Location
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
