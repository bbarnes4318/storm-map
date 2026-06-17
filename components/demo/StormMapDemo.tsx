"use client";

import React from "react";
import dynamic from "next/dynamic";
import { 
  ChevronRight, 
  ChevronLeft, 
  Check, 
  Zap, 
  AlertCircle, 
  Play, 
  Info, 
  Phone, 
  Mail, 
  Building, 
  MapPin, 
  User, 
  ShieldAlert,
  ArrowRight,
  RotateCcw,
  Sparkles,
  Target,
  X
} from "lucide-react";
import { 
  StormFilterState, 
  StormReport, 
  NwsAlert, 
  SelectedPropertyTarget, 
  ActivePopupDetail 
} from "@/lib/weather/types";
import { getCountyByStateAndName } from "@/lib/geo/us-counties";
import { LeadIntelligencePanel } from "@/components/storm-map/enrichment/LeadIntelligencePanel";
import { AppHeader } from "@/components/storm-map/AppHeader";
import { StormSidebar } from "@/components/storm-map/StormSidebar";
import DemoProgress from "./DemoProgress";
import DemoMarketSelector from "./DemoMarketSelector";
import DemoProductCards from "./DemoProductCards";
import DemoSlide from "./DemoSlide";

// Dynamically import the real Mapbox map component with SSR disabled
const StormMap = dynamic(() => import("@/components/storm-map/StormMap"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full bg-slate-950 flex flex-col items-center justify-center gap-3.5 text-slate-400">
      <div className="w-12 h-12 border-4 border-red-500/20 border-t-red-500 rounded-full animate-spin"></div>
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

// Helper to generate mock property leads in Knox County or selected county centroids
const generateMockLeads = (lat: number, lon: number, countyName: string, stateCode: string): SelectedPropertyTarget[] => {
  return [
    {
      id: "mock-lead-1",
      latitude: lat + 0.003,
      longitude: lon - 0.004,
      fullAddress: `2714 Willow Creek Dr, ${countyName}, ${stateCode} 37922`,
      city: countyName,
      county: countyName,
      state: stateCode,
      postcode: "37922",
      source: "map-feature" as const,
      confidence: "exact" as const,
      locked: true,
    },
    {
      id: "mock-lead-2",
      latitude: lat - 0.002,
      longitude: lon + 0.005,
      fullAddress: `809 Shadow Oak Lane, ${countyName}, ${stateCode} 37923`,
      city: countyName,
      county: countyName,
      state: stateCode,
      postcode: "37923",
      source: "map-feature" as const,
      confidence: "exact" as const,
      locked: true,
    }
  ];
};

export default function StormMapDemo() {
  const [step, setStep] = React.useState(1);
  const [selectedProduct, setSelectedProduct] = React.useState("platform");
  
  // Selection states from Selector (Step 2)
  const [selectedState, setSelectedState] = React.useState("");
  const [selectedCounty, setSelectedCounty] = React.useState("");
  const [selectedRadius, setSelectedRadius] = React.useState(10);
  
  // Scanning progress state (Step 3)
  const [scanProgress, setScanProgress] = React.useState(0);
  const [scanCompleted, setScanCompleted] = React.useState(false);
  const [checkedProgressItems, setCheckedProgressItems] = React.useState<number[]>([]);

  // Real weather and map state
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
    timeWindow: "24h",
    startDate: undefined,
    endDate: undefined,
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
  const [reports, setReports] = React.useState<StormReport[]>([]);
  const [alerts, setAlerts] = React.useState<NwsAlert[]>([]);
  const [isRefreshing, setIsRefreshing] = React.useState(false);
  const [sidebarOpen, setSidebarOpen] = React.useState(true);
  const [lastUpdated, setLastUpdated] = React.useState<Date | null>(null);

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
      timeWindow: "24h",
      startDate: undefined,
      endDate: undefined,
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
    setStep(2);
  };

  const handleRemoveLead = (leadId: string) => {
    const updatedLeads = leads.filter((l) => l.id !== leadId);
    setLeads(updatedLeads);
    if (selectedProperty && selectedProperty.id === leadId) {
      setSelectedProperty(null);
    }
  };

  const handleUpdateLead = (updatedLead: SelectedPropertyTarget) => {
    const updated = leads.map((l) => (l.id === updatedLead.id ? updatedLead : l));
    setLeads(updated);
    if (selectedProperty && selectedProperty.id === updatedLead.id) {
      setSelectedProperty(updatedLead);
    }
  };

  const handleAddLeads = (newLeads: SelectedPropertyTarget[]) => {
    const filteredNewLeads = newLeads.filter(
      (newLead) => !leads.some((lead) => lead.fullAddress === newLead.fullAddress)
    );
    if (filteredNewLeads.length > 0) {
      setLeads([...leads, ...filteredNewLeads]);
    }
  };

  // Auto-advance logic for selector steps
  React.useEffect(() => {
    if (step === 2 && selectedState === "TN") {
      const t = setTimeout(() => setStep(3), 800);
      return () => clearTimeout(t);
    }
  }, [selectedState, step]);

  React.useEffect(() => {
    if (step === 3 && (selectedCounty === "Knox" || selectedCounty === "Knox County")) {
      const t = setTimeout(() => setStep(4), 800);
      return () => clearTimeout(t);
    }
  }, [selectedCounty, step]);

  React.useEffect(() => {
    if (step === 4 && selectedRadius === 15) {
      const t = setTimeout(() => setStep(5), 800);
      return () => clearTimeout(t);
    }
  }, [selectedRadius, step]);

  // Synchronize search click to transition from step 5 to 6
  React.useEffect(() => {
    if (step === 5 && filters.searchStatus === "loading") {
      setStep(6);
    }
  }, [filters.searchStatus, step]);

  // Transition from step 7 (click pin) to step 8 (save lead)
  React.useEffect(() => {
    if (step === 7 && selectedProperty) {
      const t = setTimeout(() => setStep(8), 800);
      return () => clearTimeout(t);
    }
  }, [selectedProperty, step]);

  // Transition from step 8 (save lead) to step 9 (choose path)
  React.useEffect(() => {
    const isAlreadySaved = selectedProperty && leads.some(
      (l) => l.latitude === selectedProperty.latitude && l.longitude === selectedProperty.longitude
    );
    if (step === 8 && isAlreadySaved) {
      const t = setTimeout(() => setStep(9), 1200);
      return () => clearTimeout(t);
    }
  }, [leads, selectedProperty, step]);

  // Request modal form state
  const [modalOpen, setModalOpen] = React.useState(false);
  const [modalProduct, setModalProduct] = React.useState("");
  const [formSubmitted, setFormSubmitted] = React.useState(false);
  const [formData, setFormData] = React.useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    market: "Knox County, TN",
  });

  // Fetch weather and storm reports on filter change so map is live
  const fetchWeatherData = React.useCallback(async () => {
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

      const [alertsRes, reportsRes] = await Promise.all([
        fetch("/storm-map/api/weather/alerts"),
        fetch(url)
      ]);
      if (alertsRes.ok) {
        const alertsData = await alertsRes.json();
        setAlerts(alertsData);
      }
      if (reportsRes.ok) {
        const reportsData = await reportsRes.json();
        setReports(reportsData);
      }
      setLastUpdated(new Date());
    } catch (e) {
      console.error("Failed to load weather data in walkthrough demo", e);
    }
  }, [filters.timeWindow, filters.startDate, filters.endDate]);

  React.useEffect(() => {
    fetchWeatherData();
  }, [fetchWeatherData]);

  // Handle slide changes via keyboard arrow keys
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        if (step < 10) {
          if (step === 2) {
            setSelectedState("TN");
          } else if (step === 3) {
            setSelectedCounty("Knox County");
          } else if (step === 4) {
            setSelectedRadius(15);
          } else if (step === 5) {
            handleSelectorSubmit(selectedState || "TN", selectedCounty || "Knox County", selectedRadius || 15);
          } else if (step === 6 && !scanCompleted) {
            triggerScanCompletion();
          } else if (step === 7) {
            handleSimulatePropertyClick();
          } else if (step === 8) {
            if (selectedProperty) {
              handleAddLeads([{ ...selectedProperty, locked: true }]);
            }
            setStep(9);
          } else {
            setStep((s) => s + 1);
          }
        }
      } else if (e.key === "ArrowLeft") {
        if (step > 1) {
          setStep((s) => s - 1);
        }
      } else if (e.key === "Escape") {
        setModalOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [step, scanCompleted, selectedState, selectedCounty, selectedRadius, selectedProperty]);

  // Simulated Scanning Animation Sequence (Step 6)
  React.useEffect(() => {
    if (step !== 6) {
      setScanProgress(0);
      setScanCompleted(false);
      setCheckedProgressItems([]);
      return;
    }

    const interval = setInterval(() => {
      setScanProgress((prev) => {
        const next = prev + 5;
        if (next >= 100) {
          clearInterval(interval);
          triggerScanCompletion();
          return 100;
        }
        return next;
      });
    }, 120);

    return () => clearInterval(interval);
  }, [step, selectedState, selectedCounty, selectedRadius]);

  // Synchronize checkmarks with progress percentage
  React.useEffect(() => {
    if (step !== 6) return;
    
    const items = [];
    if (scanProgress >= 20) items.push(0);
    if (scanProgress >= 40) items.push(1);
    if (scanProgress >= 60) items.push(2);
    if (scanProgress >= 80) items.push(3);
    if (scanProgress >= 95) items.push(4);
    
    setCheckedProgressItems(items);
  }, [scanProgress, step]);

  const triggerScanCompletion = () => {
    setScanCompleted(true);
    setScanProgress(100);
    setCheckedProgressItems([0, 1, 2, 3, 4]);
    
    // Set filters to complete
    setFilters((f) => ({ ...f, searchStatus: "complete" }));
    
    // Seed mock leads in the selected county centroid
    const stateVal = selectedState || "TN";
    const countyVal = selectedCounty || "Knox County";
    const resolved = getCountyByStateAndName(stateVal, countyVal);
    if (resolved) {
      const mockLeads = generateMockLeads(resolved.latitude, resolved.longitude, resolved.countyFullName, resolved.stateAbbreviation);
      setLeads(mockLeads);
    }
    setStep(7);
  };

  // Handle selector submission from Step 5
  const handleSelectorSubmit = (state: string, county: string, radius: number) => {
    setSelectedState(state);
    setSelectedCounty(county);
    setSelectedRadius(radius);
    setFormData((prev) => ({ ...prev, market: `${county}, ${state}` }));
    
    // Resolve county centroid and bbox in us-counties
    const resolved = getCountyByStateAndName(state, county);
    if (resolved) {
      setFilters((prev) => ({
        ...prev,
        state,
        selectedCounty: resolved.countyName,
        selectedCountyFull: resolved.countyFullName,
        selectedCountyFips: resolved.fips,
        center: [resolved.latitude, resolved.longitude],
        countyBbox: resolved.bbox,
        radius: radius,
        searchStatus: "loading",
      }));
    }

    setStep(6);
  };

  const handleOpenRequestModal = (productType: string) => {
    setModalProduct(productType);
    setFormSubmitted(false);
    setModalOpen(true);
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => {
      setModalOpen(false);
      setFormSubmitted(false);
      setFormData({
        name: "",
        company: "",
        email: "",
        phone: "",
        market: `${selectedCounty}, ${selectedState}`,
      });
    }, 2500);
  };

  // Skip from Step 1 straight to Step 5 (Product Options)
  const handleSkipToOptions = () => {
    setStep(5);
  };

  const getProductTitle = (id: string) => {
    if (id === "platform") return "StormTarget Live (Full Access)";
    if (id === "report") return "Hail Strike Report (Leads Only)";
    if (id === "appointments") return "Homeowner Appointments (Done For You)";
    return "";
  };

  // Simulate property click (Step 7 guide helper)
  const handleSimulatePropertyClick = () => {
    let currentLeads = leads;
    if (currentLeads.length === 0) {
      const stateVal = selectedState || "TN";
      const countyVal = selectedCounty || "Knox County";
      const resolved = getCountyByStateAndName(stateVal, countyVal);
      if (resolved) {
        currentLeads = generateMockLeads(resolved.latitude, resolved.longitude, resolved.countyFullName, resolved.stateAbbreviation);
        setLeads(currentLeads);
      }
    }
    if (currentLeads.length > 0) {
      setSelectedProperty(currentLeads[0]);
    }
  };

  const autoFillSaveLead = () => {
    if (selectedProperty) {
      handleAddLeads([{ ...selectedProperty, locked: true }]);
    } else {
      const stateVal = selectedState || "TN";
      const countyVal = selectedCounty || "Knox County";
      const resolved = getCountyByStateAndName(stateVal, countyVal);
      if (resolved) {
        const mockLeads = generateMockLeads(resolved.latitude, resolved.longitude, resolved.countyFullName, resolved.stateAbbreviation);
        setLeads(mockLeads);
        setSelectedProperty(mockLeads[0]);
        handleAddLeads([{ ...mockLeads[0], locked: true }]);
      }
    }
    setStep(9);
  };

  return (
    <div className="h-screen w-full flex flex-col overflow-hidden bg-slate-950 font-sans relative">
      {/* App Header */}
      <AppHeader sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div className="flex-1 w-full flex overflow-hidden relative">
        {/* Collapsible Sidebar */}
        <StormSidebar
          filters={filters}
          onFiltersChange={handleFiltersChange}
          reports={reports}
          alerts={alerts}
          onSelectCoords={handleSelectCoords}
          onResetView={handleResetView}
          onRefresh={() => {}}
          isRefreshing={isRefreshing}
          lastUpdated={lastUpdated}
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          selectedProperty={selectedProperty}
          onUnlockProperty={() => setSelectedProperty(null)}
          leads={leads}
          onRemoveLead={handleRemoveLead}
          onUpdateLead={handleUpdateLead}
          activeDetail={activeDetail}
          setActiveDetail={setActiveDetail}
          onSelectProperty={(prop) => {
            setSelectedProperty(prop);
          }}
          onAddLeads={handleAddLeads}
          isDemo={true}
          demoStep={step}
          tempState={selectedState}
          setTempState={setSelectedState}
          tempCounty={selectedCounty ? getCountyByStateAndName(selectedState || "TN", selectedCounty) : null}
          setTempCounty={(county) => {
            if (county) {
              setSelectedCounty(county.countyName);
              setSelectedState(county.stateAbbreviation);
            } else {
              setSelectedCounty("");
            }
          }}
          tempRadius={selectedRadius}
          setTempRadius={setSelectedRadius}
        />

        {/* Main Map Viewer Panel */}
        <div className="flex-1 h-full relative flex flex-col">
          {/* Map canvas */}
          <StormMap
            filters={filters}
            onFiltersChange={handleFiltersChange}
            reports={reports}
            alerts={alerts}
            onRefresh={() => {}}
            isRefreshing={isRefreshing}
            selectedProperty={selectedProperty}
            onLockProperty={(prop) => {
              setSelectedProperty(prop);
            }}
            onUnlockProperty={() => setSelectedProperty(null)}
            leads={leads}
            activeDetail={activeDetail}
            setActiveDetail={setActiveDetail}
            onAddLeads={handleAddLeads}
            isDemo={true}
            demoStep={step}
          />

          {/* Dim backdrop overlay for static slides to keep content highly readable with background blur */}
          {(step === 1 || step === 6 || step === 8 || step === 9 || step === 10) && (
            <div className="absolute inset-0 bg-[#020617]/65 backdrop-blur-[5px] z-10 pointer-events-none" />
          )}

          {/* Top Progress bar */}
          <div className="absolute top-0 left-0 right-0 z-20 pointer-events-auto">
            <DemoProgress currentStep={step} onStepClick={(s) => setStep(s)} />
          </div>

          {/* Main Slide Workspace Container */}
          <div className="absolute inset-0 overflow-hidden flex items-center justify-center p-4 md:p-6 lg:p-8 z-20 pointer-events-none">
            
            {/* Step 1: Hero Intro */}
            <DemoSlide isActive={step === 1} className="max-w-4xl flex flex-col gap-5 text-left p-6 md:p-8 bg-[#060D1E]/95 border border-slate-500/18 rounded-[24px] shadow-2xl animate-in fade-in duration-200 select-text pointer-events-auto">
              <span className="text-[9px] font-black uppercase tracking-widest text-[#145CFF] bg-[#145CFF]/10 px-2.5 py-1 rounded-md border border-[#145CFF]/20 self-start leading-none">
                LIVE STORM INTELLIGENCE FOR ROOFING CONTRACTORS
              </span>
              
              <h1 className="text-2xl md:text-4xl font-black text-[#F8FAFC] leading-[1.15] tracking-tight">
                Find Storm-Hit Homes <br />
                Before Your Competition Does
              </h1>
              
              <p className="text-xs md:text-sm text-slate-300 font-semibold leading-relaxed max-w-lg">
                StormTarget Live helps roofing contractors identify where hail, wind, and severe storms just hit — then turn those storm events into homeowner leads, property intelligence, and roof inspection appointments.
              </p>

              <p className="text-[10.5px] text-slate-455 leading-normal font-semibold max-w-lg">
                Start with the live storm map, choose your target market, and decide whether you want full platform access, a ready-to-use Hail Strike Report, or done-for-you homeowner appointments.
              </p>

              <div className="flex items-center gap-3 pt-2 select-none">
                <button
                  onClick={() => setStep(2)}
                  className="px-5 py-3 rounded-lg bg-[#145CFF] hover:bg-[#2570FF] text-[#F8FAFC] font-extrabold uppercase text-[11px] tracking-wider transition-all flex items-center gap-1.5 shadow-lg shadow-[#145CFF]/15 cursor-pointer border-none ring-2 ring-indigo-400/50 animate-pulse hover:scale-105"
                >
                  <Play size={11} className="fill-[#F8FAFC]" />
                  Start Walkthrough
                </button>
                <a
                  href="/storm-map"
                  className="px-5 py-3 rounded-lg bg-[#050B16]/50 hover:bg-[#0B1930] text-slate-300 hover:text-slate-100 font-extrabold uppercase text-[11px] tracking-wider border border-[#145CFF]/20 hover:border-[#145CFF]/45 transition-all cursor-pointer"
                >
                  View Live Map
                </a>
              </div>

              <div className="pt-1 select-none">
                <button
                  onClick={handleSkipToOptions}
                  className="text-[10px] text-slate-455 hover:text-[#145CFF] underline font-semibold transition-colors bg-transparent border-none cursor-pointer"
                >
                  Skip to Product Options & Pricing
                </button>
              </div>
            </DemoSlide>
                      {/* Step 2: Select State */}
            <DemoSlide isActive={step === 2} className="absolute top-16 right-4 z-[999] w-full max-w-[390px] md:max-w-[400px] bg-[#060D1E]/95 border border-slate-500/18 rounded-[24px] p-6 shadow-2xl animate-in slide-in-from-right duration-300 pointer-events-auto">
              <div className="space-y-4">
                <div className="space-y-1">
                  <span className="text-[8.5px] font-extrabold uppercase tracking-widest text-[#145CFF] bg-[#145CFF]/10 px-2 py-0.5 rounded border border-[#145CFF]/20 inline-block leading-none">
                    STEP 2 OF 10: CHOOSE YOUR MARKET
                  </span>
                  <h2 className="text-xl font-black text-[#F8FAFC] tracking-tight">
                    Choose Your Market
                  </h2>
                  <p className="text-[11px] text-slate-400 font-semibold leading-relaxed">
                    Use the **Storm Intelligence Panel** on the left to select your target territory.
                  </p>
                  <p className="text-[11.5px] text-slate-200 font-extrabold leading-relaxed mt-1.5 flex items-center gap-1.5">
                    <span className="w-4 h-4 rounded-full bg-indigo-650 text-white flex items-center justify-center text-[9px] font-bold">1</span>
                    Select **Tennessee (TN)** as the state.
                  </p>
                </div>

                <div className="p-3 bg-indigo-500/5 border border-dashed border-indigo-500/20 rounded-xl space-y-2 text-[10.5px] leading-relaxed text-slate-350">
                  <span className="text-indigo-400 font-extrabold uppercase tracking-wider flex items-center gap-1">
                    <Sparkles size={12} className="animate-pulse" />
                    State Selector Guide
                  </span>
                  <p>
                    The State selector has been expanded for you on the left panel. Click the flashing **TN** option in the list.
                  </p>
                </div>

                <button
                  onClick={() => setSelectedState("TN")}
                  className="w-full flex items-center justify-center gap-1.5 py-3 px-4 rounded-lg bg-[#145CFF] hover:bg-[#2570FF] text-[#F8FAFC] font-extrabold uppercase text-[10px] tracking-wider transition-all shadow-md shadow-[#145CFF]/15 cursor-pointer border-none ring-2 ring-indigo-400/40 animate-pulse"
                >
                  <span>Auto-Select TN</span>
                  <ArrowRight size={12} />
                </button>
              </div>
            </DemoSlide>

            {/* Step 3: Choose County */}
            <DemoSlide isActive={step === 3} className="absolute top-16 right-4 z-[999] w-full max-w-[390px] md:max-w-[400px] bg-[#060D1E]/95 border border-slate-500/18 rounded-[24px] p-6 shadow-2xl animate-in slide-in-from-right duration-300 pointer-events-auto">
              <div className="space-y-4">
                <div className="space-y-1">
                  <span className="text-[8.5px] font-extrabold uppercase tracking-widest text-[#145CFF] bg-[#145CFF]/10 px-2 py-0.5 rounded border border-[#145CFF]/20 inline-block leading-none">
                    STEP 3 OF 10: CHOOSE YOUR MARKET
                  </span>
                  <h2 className="text-xl font-black text-[#F8FAFC] tracking-tight">
                    Choose Your Market
                  </h2>
                  <p className="text-[11px] text-slate-400 font-semibold leading-relaxed">
                    Use the **Storm Intelligence Panel** on the left to select your target territory.
                  </p>
                  <p className="text-[11.5px] text-slate-200 font-extrabold leading-relaxed mt-1.5 flex items-center gap-1.5">
                    <span className="w-4 h-4 rounded-full bg-indigo-650 text-white flex items-center justify-center text-[9px] font-bold">2</span>
                    Choose **Knox County** from the county selector.
                  </p>
                </div>

                <div className="p-3 bg-indigo-500/5 border border-dashed border-indigo-500/20 rounded-xl space-y-2 text-[10.5px] leading-relaxed text-slate-355">
                  <span className="text-indigo-400 font-extrabold uppercase tracking-wider flex items-center gap-1">
                    <Sparkles size={12} className="animate-pulse" />
                    County Selector Guide
                  </span>
                  <p>
                    The County selector is now open. Find and click **Knox County** in the scrollable list.
                  </p>
                </div>

                <button
                  onClick={() => setSelectedCounty("Knox County")}
                  className="w-full flex items-center justify-center gap-1.5 py-3 px-4 rounded-lg bg-[#145CFF] hover:bg-[#2570FF] text-[#F8FAFC] font-extrabold uppercase text-[10px] tracking-wider transition-all shadow-md shadow-[#145CFF]/15 cursor-pointer border-none ring-2 ring-indigo-400/40 animate-pulse"
                >
                  <span>Auto-Select Knox County</span>
                  <ArrowRight size={12} />
                </button>
              </div>
            </DemoSlide>

            {/* Step 4: Select Radius */}
            <DemoSlide isActive={step === 4} className="absolute top-16 right-4 z-[999] w-full max-w-[390px] md:max-w-[400px] bg-[#060D1E]/95 border border-slate-500/18 rounded-[24px] p-6 shadow-2xl animate-in slide-in-from-right duration-300 pointer-events-auto">
              <div className="space-y-4">
                <div className="space-y-1">
                  <span className="text-[8.5px] font-extrabold uppercase tracking-widest text-[#145CFF] bg-[#145CFF]/10 px-2 py-0.5 rounded border border-[#145CFF]/20 inline-block leading-none">
                    STEP 4 OF 10: CHOOSE YOUR MARKET
                  </span>
                  <h2 className="text-xl font-black text-[#F8FAFC] tracking-tight">
                    Choose Your Market
                  </h2>
                  <p className="text-[11px] text-slate-400 font-semibold leading-relaxed">
                    Use the **Storm Intelligence Panel** on the left to select your target territory.
                  </p>
                  <p className="text-[11.5px] text-slate-200 font-extrabold leading-relaxed mt-1.5 flex items-center gap-1.5">
                    <span className="w-4 h-4 rounded-full bg-indigo-650 text-white flex items-center justify-center text-[9px] font-bold">3</span>
                    Choose a **15 miles** search radius.
                  </p>
                </div>

                <div className="p-3 bg-indigo-500/5 border border-dashed border-indigo-500/20 rounded-xl space-y-2 text-[10.5px] leading-relaxed text-slate-355">
                  <span className="text-indigo-400 font-extrabold uppercase tracking-wider flex items-center gap-1">
                    <Sparkles size={12} className="animate-pulse" />
                    Radius Selector Guide
                  </span>
                  <p>
                    The Radius dropdown is open. Select the **15 mi** option to set the weather scan boundary.
                  </p>
                </div>

                <button
                  onClick={() => setSelectedRadius(15)}
                  className="w-full flex items-center justify-center gap-1.5 py-3 px-4 rounded-lg bg-[#145CFF] hover:bg-[#2570FF] text-[#F8FAFC] font-extrabold uppercase text-[10px] tracking-wider transition-all shadow-md shadow-[#145CFF]/15 cursor-pointer border-none ring-2 ring-indigo-400/40 animate-pulse"
                >
                  <span>Auto-Select 15 Miles</span>
                  <ArrowRight size={12} />
                </button>
              </div>
            </DemoSlide>

            {/* Step 5: Click Scan */}
            <DemoSlide isActive={step === 5} className="absolute top-16 right-4 z-[999] w-full max-w-[390px] md:max-w-[400px] bg-[#060D1E]/95 border border-slate-500/18 rounded-[24px] p-6 shadow-2xl animate-in slide-in-from-right duration-300 pointer-events-auto">
              <div className="space-y-4">
                <div className="space-y-1">
                  <span className="text-[8.5px] font-extrabold uppercase tracking-widest text-[#145CFF] bg-[#145CFF]/10 px-2 py-0.5 rounded border border-[#145CFF]/20 inline-block leading-none">
                    STEP 5 OF 10: RUN WEATHER SCANNER
                  </span>
                  <h2 className="text-xl font-black text-[#F8FAFC] tracking-tight">
                    Choose Your Market
                  </h2>
                  <p className="text-[11px] text-slate-400 font-semibold leading-relaxed">
                    Use the **Storm Intelligence Panel** on the left to select your target territory.
                  </p>
                  <p className="text-[11.5px] text-slate-200 font-extrabold leading-relaxed mt-1.5 flex items-center gap-1.5">
                    <span className="w-4 h-4 rounded-full bg-indigo-650 text-white flex items-center justify-center text-[9px] font-bold">4</span>
                    Click the blue **search button** (with the triangle navigation icon) to run the scanner.
                  </p>
                </div>

                <div className="p-3 bg-indigo-500/5 border border-dashed border-indigo-500/20 rounded-xl space-y-2 text-[10.5px] leading-relaxed text-slate-355">
                  <span className="text-indigo-400 font-extrabold uppercase tracking-wider flex items-center gap-1">
                    <Sparkles size={12} className="animate-pulse" />
                    Scan Execution Guide
                  </span>
                  <p>
                    Click the pulsing blue **Scan Selected Territory** button (marked with badge <span className="px-1.5 py-0.5 rounded bg-indigo-650 text-white font-bold">4</span>) to fetch weather alerts and storm cells.
                  </p>
                </div>

                <button
                  onClick={() => handleSelectorSubmit("TN", "Knox County", 15)}
                  className="w-full flex items-center justify-center gap-1.5 py-3 px-4 rounded-lg bg-[#145CFF] hover:bg-[#2570FF] text-[#F8FAFC] font-extrabold uppercase text-[10px] tracking-wider transition-all shadow-md shadow-[#145CFF]/15 cursor-pointer border-none ring-2 ring-indigo-400/40 animate-pulse"
                >
                  <span>Simulate Scan Execution</span>
                  <ArrowRight size={12} />
                </button>
              </div>
            </DemoSlide>

            {/* Step 6: Scanning Checklist Overlay */}
            <DemoSlide isActive={step === 6} className="max-w-sm bg-[#060D1E]/95 border border-slate-500/18 rounded-[24px] p-6 shadow-2xl animate-in fade-in duration-200 pointer-events-auto">
              <div className="space-y-4 text-left">
                <div className="space-y-1">
                  <span className="text-[8.5px] font-extrabold uppercase tracking-widest text-[#145CFF] animate-pulse">
                    STEP 6 OF 10: SCANNING LIVE WEATHER
                  </span>
                  <h2 className="text-lg font-black text-[#F8FAFC] tracking-tight">
                    Scanning Storm Activity <br />
                    in {selectedCounty || "Knox County"}, {selectedState || "TN"}
                  </h2>
                  <p className="text-[10px] text-slate-400 font-semibold leading-normal">
                    StormTarget Live is checking recent NOAA alerts and SPC storm reports inside your selected radius.
                  </p>
                </div>

                {/* Checklist Items */}
                <div className="bg-[#050B16]/60 border border-[#145CFF]/15 rounded-xl p-4 space-y-3">
                  {[
                    "Scanning NOAA/NWS alerts",
                    "Checking SPC storm reports",
                    "Mapping storm impact radius",
                    "Finding affected neighborhoods",
                    "Preparing opportunity summary",
                  ].map((item, idx) => {
                    const isChecked = checkedProgressItems.includes(idx);
                    const isScanningNow = idx === checkedProgressItems.length;

                    return (
                      <div key={item} className="flex items-center gap-3 select-none">
                        <div
                          className={`w-4 h-4 rounded-full border flex items-center justify-center transition-all ${
                            isChecked
                              ? "bg-[#0E8F6E]/15 border-[#0E8F6E] text-[#00A86B]"
                              : isScanningNow
                              ? "border-[#145CFF] bg-[#145CFF]/5 text-[#145CFF] animate-pulse"
                              : "border-slate-800 bg-[#050B16] text-slate-600"
                          }`}
                        >
                          {isChecked ? (
                            <Check size={9} strokeWidth={3} />
                          ) : isScanningNow ? (
                            <span className="w-1 h-1 rounded-full bg-[#145CFF] animate-ping" />
                          ) : (
                            <span className="w-1 h-1 rounded-full bg-slate-800" />
                          )}
                        </div>
                        <span
                          className={`text-[10px] font-semibold tracking-wide transition-colors ${
                            isChecked
                              ? "text-slate-350"
                              : isScanningNow
                              ? "text-[#F8FAFC] font-extrabold"
                              : "text-slate-600"
                          }`}
                        >
                          {item}
                        </span>
                      </div>
                    );
                  })}
                </div>

                {/* Status Output Bar */}
                <div className="bg-[#050B16] border border-[#145CFF]/10 rounded-lg p-3 flex items-center justify-between text-[9px] font-bold text-slate-400 select-none">
                  <span className="truncate flex items-center gap-1.5">
                    <span className={`w-1.5 h-1.5 rounded-full ${scanCompleted ? "bg-[#00A86B]" : "bg-[#145CFF] animate-ping"}`} />
                    {scanCompleted
                      ? "Storm activity found. Opportunity summary ready."
                      : `Scanning within ${selectedRadius || 15} miles...`}
                  </span>
                </div>
              </div>
            </DemoSlide>

            {/* Step 7: Click green map pin */}
            <DemoSlide isActive={step === 7} className="absolute top-16 right-4 z-[999] w-full max-w-[390px] md:max-w-[400px] bg-[#060D1E]/95 border border-slate-500/18 rounded-[24px] p-6 shadow-2xl animate-in slide-in-from-right duration-300 pointer-events-auto">
              <div className="space-y-4">
                <div className="space-y-1">
                  <span className="text-[8.5px] font-extrabold uppercase tracking-widest text-[#0E8F6E] bg-[#0E8F6E]/10 px-2 py-0.5 rounded border border-[#0E8F6E]/20 inline-block leading-none">
                    STEP 7 OF 10: EXPLORE PROPERTY
                  </span>
                  <h2 className="text-xl font-black text-[#F8FAFC] tracking-tight">
                    Select a Storm-Hit Property
                  </h2>
                  <p className="text-[11px] text-slate-400 font-semibold leading-relaxed">
                    Click the flashing **green pin** on the live map to open its B2B contact details and roof dimensions preview.
                  </p>
                </div>

                <div className="p-3 bg-emerald-500/5 border border-dashed border-emerald-500/20 rounded-xl space-y-2 text-[10.5px] leading-relaxed text-slate-350">
                  <span className="text-emerald-400 font-extrabold uppercase tracking-wider flex items-center gap-1">
                    <Sparkles size={12} className="animate-pulse" />
                    Map Interaction Guide
                  </span>
                  <p>
                    Severe hail was detected! Click the bouncing map marker with the tooltip "Click Pin to View Target 👇" to inspect the homeowner record.
                  </p>
                </div>

                <button
                  onClick={handleSimulatePropertyClick}
                  className="w-full flex items-center justify-center gap-1.5 py-3 px-4 rounded-lg bg-[#0E8F6E] hover:bg-[#0EA781] text-[#F8FAFC] font-extrabold uppercase text-[10px] tracking-wider transition-all shadow-md shadow-[#0E8F6E]/15 cursor-pointer border-none ring-2 ring-emerald-450/40 animate-pulse"
                >
                  <span>Simulate Pin Click</span>
                  <ArrowRight size={12} />
                </button>
              </div>
            </DemoSlide>

            {/* Step 8: Save Lead */}
            <DemoSlide isActive={step === 8} className="absolute top-16 right-4 z-[999] w-full max-w-[390px] md:max-w-[400px] bg-[#060D1E]/95 border border-slate-500/18 rounded-[24px] p-6 shadow-2xl animate-in slide-in-from-right duration-300 pointer-events-auto">
              <div className="space-y-4">
                <div className="space-y-1">
                  <span className="text-[8.5px] font-extrabold uppercase tracking-widest text-[#0E8F6E] bg-[#0E8F6E]/10 px-2 py-0.5 rounded border border-[#0E8F6E]/20 inline-block leading-none">
                    STEP 8 OF 10: SAVE OPPORTUNITY
                  </span>
                  <h2 className="text-xl font-black text-[#F8FAFC] tracking-tight">
                    Add Target to Your Leads List
                  </h2>
                  <p className="text-[11px] text-slate-400 font-semibold leading-relaxed">
                    Click the glowing **Save Lead** button in the property details panel on the left to save this target.
                  </p>
                </div>

                <div className="p-3 bg-indigo-500/5 border border-dashed border-indigo-500/20 rounded-xl space-y-2 text-[10.5px] leading-relaxed text-slate-350">
                  <span className="text-indigo-400 font-extrabold uppercase tracking-wider flex items-center gap-1">
                    <Sparkles size={12} className="animate-pulse" />
                    Lead Panel Guide
                  </span>
                  <p>
                    Saving adds this record to your local database, allowing you to export the contact details, download the roof structure report, or request appointments.
                  </p>
                </div>

                <button
                  onClick={autoFillSaveLead}
                  className="w-full flex items-center justify-center gap-1.5 py-3 px-4 rounded-lg bg-[#145CFF] hover:bg-[#2570FF] text-[#F8FAFC] font-extrabold uppercase text-[10px] tracking-wider transition-all shadow-md shadow-[#145CFF]/15 cursor-pointer border-none ring-2 ring-indigo-400/40 animate-pulse"
                >
                  <span>Simulate Save Lead</span>
                  <ArrowRight size={12} />
                </button>
              </div>
            </DemoSlide>

            {/* Step 9: Product Path Selection */}
            <DemoSlide isActive={step === 9} className="max-w-4xl bg-[#060D1E]/95 border border-slate-500/18 rounded-[24px] p-6 shadow-2xl animate-in fade-in duration-200 pointer-events-auto">
              <div className="space-y-5 flex flex-col h-full min-h-0">
                {/* Header copy */}
                <div className="text-center space-y-1 shrink-0">
                  <span className="text-[8.5px] font-extrabold uppercase tracking-widest text-[#145CFF] bg-[#145CFF]/10 px-2.5 py-1 rounded border border-[#145CFF]/20 inline-block leading-none">
                    STEP 9 OF 10: CHOOSE ACTION PATH
                  </span>
                  <h2 className="text-xl font-black text-[#F8FAFC] tracking-tight">
                    Choose How You Want to Turn Storm Data Into Revenue
                  </h2>
                  <p className="text-[10.5px] text-slate-400 font-semibold leading-relaxed max-w-xl mx-auto">
                    Every contractor works differently. StormTarget Live gives you three ways to act on the same storm intelligence.
                  </p>
                </div>

                {/* Product option cards grid */}
                <div className="flex-1 overflow-y-auto custom-scrollbar py-2 min-h-0">
                  <DemoProductCards selectedProductId={selectedProduct} onSelectProduct={setSelectedProduct} />
                </div>

                {/* Bottom Row: continues */}
                <div className="flex items-center justify-between border-t border-slate-800 pt-4 shrink-0 px-1 select-none">
                  <div className="flex items-center gap-2">
                    <span className="text-[9px] text-slate-555 font-extrabold uppercase tracking-wide">Selected Path:</span>
                    <span className="text-[10px] text-[#F8FAFC] font-black uppercase tracking-wider flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#145CFF]" />
                      {getProductTitle(selectedProduct)}
                    </span>
                  </div>
                  <button
                    onClick={() => setStep(10)}
                    className="px-6 py-2.5 rounded-lg bg-[#145CFF] hover:bg-[#2570FF] text-[#F8FAFC] font-extrabold uppercase text-[10px] tracking-widest transition-all flex items-center gap-1 cursor-pointer border-none shadow-md shadow-[#145CFF]/10 ring-2 ring-indigo-400 animate-pulse"
                  >
                    <span>Continue</span>
                    <ChevronRight size={11} strokeWidth={2} />
                  </button>
                </div>
              </div>
            </DemoSlide>

            {/* Step 10: Final CTA */}
            <DemoSlide isActive={step === 10} className="max-w-4xl bg-[#060D1E]/95 border border-slate-500/18 rounded-[24px] p-6 md:p-8 shadow-2xl animate-in fade-in duration-200 md:grid md:grid-cols-12 gap-6 items-center select-text pointer-events-auto">
              {/* Left final sales copy */}
              <div className="md:col-span-7 flex flex-col gap-4 text-left">
                <span className="text-[8.5px] font-extrabold uppercase tracking-widest text-[#00A86B] bg-[#0E8F6E]/10 px-2.5 py-1 rounded border border-[#0E8F6E]/20 self-start leading-none">
                  STEP 10 OF 10: GET STARTED
                </span>
                
                <h1 className="text-2xl font-black text-[#F8FAFC] leading-tight tracking-tight">
                  Ready to Work This Storm?
                </h1>
                
                <p className="text-[11.5px] text-slate-300 font-semibold leading-relaxed max-w-lg">
                  Choose the option that fits your team and start turning storm activity into real roofing opportunities.
                </p>

                <div className="bg-[#050B16]/50 border border-slate-800 rounded-xl p-4 flex gap-3 items-start max-w-lg">
                  <Info className="text-[#145CFF] shrink-0 mt-0.5" size={16} />
                  <div className="space-y-1">
                    <span className="text-[9px] font-black text-[#F8FAFC] uppercase tracking-wider block">
                      TIME-SENSITIVE CONVERSION
                    </span>
                    <p className="text-[10px] text-[#FBBF24] leading-normal font-semibold">
                      The sooner you act after a hail or wind event, the better your chance of reaching homeowners before competitors are already at the door.
                    </p>
                  </div>
                </div>

                {/* Action Buttons row */}
                <div className="flex flex-col gap-2 pt-2 max-w-md select-none">
                  <a
                    href="/storm-map"
                    className="w-full py-3 px-4 rounded-lg bg-[#145CFF] hover:bg-[#2570FF] text-[#F8FAFC] font-extrabold uppercase text-[10.5px] tracking-wider text-center transition-all shadow-md shadow-[#145CFF]/10 cursor-pointer ring-1 ring-indigo-400/30 hover:scale-[1.02]"
                  >
                    Use StormTarget Live (Full Platform)
                  </a>
                  
                  <button
                    type="button"
                    onClick={() => handleOpenRequestModal("report")}
                    className="w-full py-3 px-4 rounded-lg bg-[#0E8F6E] hover:bg-[#0EA781] text-[#F8FAFC] font-extrabold uppercase text-[10.5px] tracking-wider text-center transition-all shadow-md shadow-[#0E8F6E]/10 cursor-pointer border-none ring-1 ring-emerald-400/30 hover:scale-[1.02]"
                  >
                    Request Hail Strike Report (Leads Only)
                  </button>
                  
                  <button
                    type="button"
                    onClick={() => handleOpenRequestModal("appointments")}
                    className="w-full py-3 px-4 rounded-lg bg-[#FBBF24] hover:bg-[#FBBF24]/90 text-slate-955 font-extrabold uppercase text-[10.5px] tracking-wider text-center transition-all shadow-md shadow-[#FBBF24]/10 cursor-pointer border-none ring-1 ring-amber-400/30 hover:scale-[1.02]"
                  >
                    Request Homeowner Appointments (DFY)
                  </button>
                </div>

                {/* Bottom links */}
                <div className="flex items-center gap-4 pt-1 select-none">
                  <a
                    href="/storm-map"
                    className="text-[9.5px] text-slate-455 hover:text-slate-350 font-extrabold uppercase tracking-wider"
                  >
                    Back to Live Map
                  </a>
                  <span className="text-slate-700">|</span>
                  <button
                    onClick={() => {
                      setStep(1);
                      setScanProgress(0);
                      setScanCompleted(false);
                      setCheckedProgressItems([]);
                      setSelectedProperty(null);
                      setLeads([]);
                      setFilters((prev) => ({ ...prev, center: null, searchQuery: "", state: "", selectedCounty: undefined, searchStatus: "empty" }));
                    }}
                    className="text-[9.5px] text-slate-455 hover:text-slate-350 font-extrabold uppercase tracking-wider flex items-center gap-1 cursor-pointer border-none bg-transparent"
                  >
                    <RotateCcw size={10} />
                    Restart Walkthrough
                  </button>
                </div>
              </div>

              {/* Right selected summary card column */}
              <div className="md:col-span-5 w-full flex justify-center">
                <div className="w-full max-w-sm bg-[#050B16]/50 border border-slate-800 rounded-2xl p-5 shadow-2xl relative">
                  <div className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl bg-[#00A86B]" />
                  
                  <span className="text-[8px] font-extrabold text-[#00A86B] uppercase tracking-widest block mb-1">
                    CHOSEN MARKET SUMMARY
                  </span>
                  
                  <h4 className="text-sm font-black text-[#F8FAFC] tracking-tight leading-none mb-4">
                    {selectedCounty || "Knox County"}, {selectedState || "TN"} Market
                  </h4>

                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between border-b border-slate-900 pb-2 text-[10px]">
                      <span className="font-semibold text-slate-500">Active Signals:</span>
                      <span className="font-black text-[#F8FAFC]">3 Storm Hits</span>
                    </div>
                    
                    <div className="flex items-center justify-between border-b border-slate-900 pb-2 text-[10px]">
                      <span className="font-semibold text-slate-500">Target Radius:</span>
                      <span className="font-black text-[#F8FAFC]">{selectedRadius || 15} Miles</span>
                    </div>

                    <div className="flex items-center justify-between border-b border-slate-900 pb-2 text-[10px]">
                      <span className="font-semibold text-slate-500">Selected Product:</span>
                      <span className="font-black text-[#145CFF] uppercase tracking-wider">
                        {selectedProduct === "platform" ? "Full Access" : selectedProduct === "report" ? "Leads Only" : "Appointments"}
                      </span>
                    </div>

                    <div className="pt-2 bg-[#050B16]/50 border border-slate-805 rounded-xl p-3 text-[9.5px] leading-relaxed text-slate-400 font-semibold">
                      <span className="text-[#00A86B] font-extrabold block uppercase tracking-wider mb-0.5">
                        Ready to Proceed?
                      </span>
                      Click one of the CTA paths on the left to activate your request or load the Live map console directly.
                    </div>
                  </div>
                </div>
              </div>
            </DemoSlide>
          </div>

          {/* Floating Bottom Nav Controls */}
          <div className="absolute bottom-0 left-0 right-0 px-6 py-3 bg-[#050B16]/95 border-t border-[#145CFF]/15 flex items-center justify-between shrink-0 select-none z-20 pointer-events-auto">
            <button
              onClick={() => setStep((s) => Math.max(1, s - 1))}
              disabled={step === 1}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#0B1930] hover:bg-[#145CFF]/10 border border-[#145CFF]/10 hover:border-[#145CFF]/30 disabled:opacity-30 disabled:cursor-not-allowed text-xs text-slate-300 font-extrabold uppercase tracking-wider transition-all cursor-pointer"
            >
              <ChevronLeft size={13} />
              Back
            </button>

            <div className="flex items-center gap-1.5">
              {Array.from({ length: 10 }).map((_, idx) => {
                const stepNum = idx + 1;
                const isActive = stepNum === step;

                return (
                  <button
                    key={idx}
                    onClick={() => setStep(stepNum)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      isActive ? "bg-[#145CFF] w-4" : "bg-slate-700 hover:bg-slate-500"
                    }`}
                    title={`Go to step ${stepNum}`}
                  />
                );
              })}
            </div>

            <button
              onClick={() => {
                if (step < 10) {
                  if (step === 2) {
                    setSelectedState("TN");
                  } else if (step === 3) {
                    setSelectedCounty("Knox County");
                  } else if (step === 4) {
                    setSelectedRadius(15);
                  } else if (step === 5) {
                    handleSelectorSubmit(selectedState || "TN", selectedCounty || "Knox County", selectedRadius || 15);
                  } else if (step === 6 && !scanCompleted) {
                    triggerScanCompletion();
                  } else if (step === 7) {
                    handleSimulatePropertyClick();
                  } else if (step === 8) {
                    if (selectedProperty) {
                      handleAddLeads([{ ...selectedProperty, locked: true }]);
                    }
                    setStep(9);
                  } else {
                    setStep((s) => s + 1);
                  }
                }
              }}
              disabled={step === 10}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#145CFF] hover:bg-[#2570FF] disabled:opacity-30 disabled:cursor-not-allowed text-xs text-[#F8FAFC] font-extrabold uppercase tracking-wider transition-all cursor-pointer border-none"
            >
              Next
              <ChevronRight size={13} />
            </button>
          </div>
        </div>
      </div>

      {/* Redesigned Floating Lead Target Info Panel */}
      {selectedProperty && (
        <div className="fixed bottom-0 left-0 right-0 md:absolute md:top-20 md:left-4 md:bottom-auto md:right-auto z-[999] w-full md:w-[410px] max-h-[75vh] md:max-h-[calc(100vh-96px)] overflow-hidden rounded-t-[24px] md:rounded-[24px] bg-[#060D1E]/90 backdrop-blur-md border-t md:border border-slate-500/18 shadow-2xl flex flex-col animate-in slide-in-from-bottom md:slide-in-from-left duration-300">
          <LeadIntelligencePanel
            selectedProperty={selectedProperty}
            onUpdateLead={handleUpdateLead}
            onClearProperty={() => setSelectedProperty(null)}
            leads={leads}
            onRemoveLead={handleRemoveLead}
            onAddLeads={handleAddLeads}
            filters={filters}
            isDemo={true}
            demoStep={step}
          />
        </div>
      )}

      {/* Polished Request Modal / Drawer */}
      {modalOpen && (
        <div className="fixed inset-0 z-[1010] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div 
            onClick={(e) => e.stopPropagation()} 
            className="w-full max-w-md bg-[#071426] border border-[#145CFF]/30 rounded-2xl shadow-2xl p-6 relative overflow-hidden animate-in zoom-in-95 duration-200 select-text"
          >
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#145CFF]" />

            <div className="pb-4 mb-4 border-b border-[#145CFF]/15">
              <h3 className="text-base font-black text-[#F8FAFC] tracking-tight">
                Request {modalProduct === "report" ? "Hail Strike Report" : "Homeowner Appointments"}
              </h3>
              <p className="text-[10px] text-slate-455 font-semibold leading-normal mt-1">
                Enter your details below and our team will build your custom report or set up your appointment campaign.
              </p>
            </div>

            {formSubmitted ? (
              <div className="py-8 text-center space-y-3.5 animate-in fade-in duration-200">
                <div className="w-10 h-10 rounded-full bg-[#0E8F6E]/12 border border-[#0E8F6E]/30 text-[#00A86B] flex items-center justify-center mx-auto animate-bounce">
                  <Check size={20} strokeWidth={3} />
                </div>
                <div className="space-y-1">
                  <h4 className="font-extrabold text-[#F8FAFC] text-xs uppercase tracking-wider">
                    Request Received Successfully
                  </h4>
                  <p className="text-[10px] text-slate-400 font-semibold">
                    We are compiling data for {formData.market}. Our account manager will contact you shortly.
                  </p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-3.5">
                <div className="space-y-1.5">
                  <label className="text-[9px] font-extrabold text-slate-555 uppercase tracking-widest block font-sans">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-2.5 top-2.5 text-slate-600" size={12} />
                    <input
                      required
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleFormChange}
                      placeholder="e.g. John Doe"
                      className="w-full bg-[#050B16] border border-[#145CFF]/20 rounded-lg pl-8 pr-3 py-2 text-xs text-[#F8FAFC] focus:outline-none focus:border-[#145CFF] placeholder:text-slate-655"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[9px] font-extrabold text-slate-555 uppercase tracking-widest block font-sans">
                    Company Name
                  </label>
                  <div className="relative">
                    <Building className="absolute left-2.5 top-2.5 text-slate-600" size={12} />
                    <input
                      required
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleFormChange}
                      placeholder="e.g. Elite Roofing LLC"
                      className="w-full bg-[#050B16] border border-[#145CFF]/20 rounded-lg pl-8 pr-3 py-2 text-xs text-[#F8FAFC] focus:outline-none focus:border-[#145CFF] placeholder:text-slate-655"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[9px] font-extrabold text-slate-555 uppercase tracking-widest block font-sans">
                    Work Email
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-2.5 top-2.5 text-slate-600" size={12} />
                    <input
                      required
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleFormChange}
                      placeholder="e.g. john@company.com"
                      className="w-full bg-[#050B16] border border-[#145CFF]/20 rounded-lg pl-8 pr-3 py-2 text-xs text-[#F8FAFC] focus:outline-none focus:border-[#145CFF] placeholder:text-slate-655"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[9px] font-extrabold text-slate-555 uppercase tracking-widest block font-sans">
                    Phone Number
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-2.5 top-2.5 text-slate-600" size={12} />
                    <input
                      required
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleFormChange}
                      placeholder="e.g. (555) 000-0000"
                      className="w-full bg-[#050B16] border border-[#145CFF]/20 rounded-lg pl-8 pr-3 py-2 text-xs text-[#F8FAFC] focus:outline-none focus:border-[#145CFF] placeholder:text-slate-655"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[9px] font-extrabold text-slate-555 uppercase tracking-widest block font-sans">
                    Selected Market Area
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-2.5 top-2.5 text-slate-600" size={12} />
                    <input
                      readOnly
                      type="text"
                      value={formData.market}
                      className="w-full bg-[#050B16] border border-[#145CFF]/20 rounded-lg pl-8 pr-3 py-2 text-xs text-slate-500 cursor-not-allowed focus:outline-none"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-[#145CFF]/15">
                  <button
                    type="button"
                    onClick={() => setModalOpen(false)}
                    className="px-4 py-2 rounded-lg bg-transparent text-slate-400 hover:text-slate-200 text-[10px] font-black uppercase tracking-wider cursor-pointer border-none"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-lg bg-[#145CFF] hover:bg-[#2570FF] text-[#F8FAFC] text-[10px] font-black uppercase tracking-wider shadow-md shadow-[#145CFF]/10 cursor-pointer border-none"
                  >
                    Submit Request
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
