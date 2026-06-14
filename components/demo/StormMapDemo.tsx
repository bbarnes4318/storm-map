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
  const [selectedState, setSelectedState] = React.useState("TN");
  const [selectedCounty, setSelectedCounty] = React.useState("Knox County");
  const [selectedRadius, setSelectedRadius] = React.useState(15);
  
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

  // Fetch weather and storm reports on mount so map is live
  React.useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const [alertsRes, reportsRes] = await Promise.all([
          fetch("/storm-map/api/weather/alerts"),
          fetch("/storm-map/api/weather/spc-reports")
        ]);
        if (alertsRes.ok) {
          const alertsData = await alertsRes.json();
          setAlerts(alertsData);
        }
        if (reportsRes.ok) {
          const reportsData = await reportsRes.json();
          setReports(reportsData);
        }
      } catch (e) {
        console.error("Failed to load weather data in walkthrough demo", e);
      }
    };
    fetchWeatherData();
  }, []);

  // Handle slide changes via keyboard arrow keys
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        if (step < 6) {
          if (step === 2) {
            handleSelectorSubmit("TN", "Knox County", 15);
          } else if (step === 3 && !scanCompleted) {
            triggerScanCompletion();
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
  }, [step, scanCompleted, selectedState, selectedCounty, selectedRadius]);

  // Simulated Scanning Animation Sequence (Step 3)
  React.useEffect(() => {
    if (step !== 3) {
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
    if (step !== 3) return;
    
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
    const resolved = getCountyByStateAndName(selectedState, selectedCounty);
    if (resolved) {
      const mockLeads = generateMockLeads(resolved.latitude, resolved.longitude, resolved.countyFullName, resolved.stateAbbreviation);
      setLeads(mockLeads);
    }
    setStep(4);
  };

  // Handle selector submission from Step 2
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

    setStep(3);
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

  // Simulate property click (Step 4 guide helper)
  const handleSimulatePropertyClick = () => {
    if (leads.length > 0) {
      setSelectedProperty(leads[0]);
    }
  };

  return (
    <div className="w-screen h-screen min-h-screen bg-[#030712] text-[#F8FAFC] flex flex-col overflow-hidden relative select-none font-sans">
      
      {/* 1. REAL MAP CANVAS (Fills the entire background) */}
      <div className="absolute inset-0 z-0">
        <StormMap
          filters={filters}
          onFiltersChange={(newF) => setFilters((prev) => ({ ...prev, ...newF }))}
          reports={reports}
          alerts={alerts}
          onRefresh={() => {}}
          isRefreshing={isRefreshing}
          selectedProperty={selectedProperty}
          onLockProperty={(prop) => setSelectedProperty(prop)}
          onUnlockProperty={() => setSelectedProperty(null)}
          leads={leads}
          activeDetail={activeDetail}
          setActiveDetail={(det) => {
            if (typeof det === "function") {
              setActiveDetail(det(activeDetail));
            } else {
              setActiveDetail(det);
            }
          }}
          onAddLeads={(newLeads) => {
            setLeads(prev => [...prev, ...newLeads]);
          }}
        />
      </div>

      {/* Dark backdrop overlay for static slides to keep content highly readable */}
      {(step === 1 || step === 2 || step === 5 || step === 6) && (
        <div className="absolute inset-0 bg-slate-950/70 backdrop-blur-[2px] z-10 pointer-events-none" />
      )}

      {/* 2. Top Progress bar */}
      <div className="relative z-20">
        <DemoProgress currentStep={step} onStepClick={(s) => setStep(s)} />
      </div>

      {/* 3. Main Slide Workspace Container */}
      <div className="flex-1 relative w-full h-full overflow-hidden flex items-center justify-center p-4 md:p-6 lg:p-8 z-15">
        
        {/* Step 1: Hero Intro */}
        <DemoSlide isActive={step === 1} className="max-w-4xl flex flex-col gap-5 text-left p-6 md:p-8 bg-[#060D1E]/90 border border-slate-500/18 backdrop-blur-md rounded-[24px] shadow-2xl animate-in fade-in duration-200 select-text">
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
              className="px-5 py-3 rounded-lg bg-[#145CFF] hover:bg-[#2570FF] text-[#F8FAFC] font-extrabold uppercase text-[11px] tracking-wider transition-all flex items-center gap-1.5 shadow-lg shadow-[#145CFF]/15 cursor-pointer border-none"
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
              className="text-[10px] text-slate-450 hover:text-[#145CFF] underline font-semibold transition-colors bg-transparent border-none cursor-pointer"
            >
              Skip to Product Options & Pricing
            </button>
          </div>
        </DemoSlide>
 
        {/* Step 2: Market Selection */}
        <DemoSlide isActive={step === 2} className="max-w-md bg-[#060D1E]/95 border border-slate-500/18 backdrop-blur-md rounded-[24px] p-6 shadow-2xl animate-in fade-in duration-200">
          <div className="space-y-4">
            <div className="space-y-1">
              <span className="text-[8.5px] font-extrabold uppercase tracking-widest text-[#145CFF]">
                STEP 1 OF 4: DEFINE AREA
              </span>
              <h2 className="text-xl font-black text-[#F8FAFC] tracking-tight">
                Choose Your Market
              </h2>
              <p className="text-[11px] text-slate-400 font-semibold leading-normal">
                Choose a state, county, and search radius. StormTarget Live scans recent hail, wind, tornado, and severe weather activity around that market.
              </p>
            </div>

            <DemoMarketSelector onSearchSubmit={handleSelectorSubmit} />
          </div>
        </DemoSlide>

        {/* Step 3: Scanning / Analysis Animation overlay */}
        <DemoSlide isActive={step === 3} className="max-w-sm bg-[#060D1E]/95 border border-slate-500/18 backdrop-blur-md rounded-[24px] p-6 shadow-2xl animate-in fade-in duration-200">
          <div className="space-y-4 text-left">
            <div className="space-y-1">
              <span className="text-[8.5px] font-extrabold uppercase tracking-widest text-[#145CFF] animate-pulse">
                STEP 2 OF 4: SCANNING LIVE WEATHER
              </span>
              <h2 className="text-lg font-black text-[#F8FAFC] tracking-tight">
                Scanning Storm Activity <br />
                in {selectedCounty}, {selectedState}
              </h2>
              <p className="text-[10px] text-slate-400 font-semibold leading-normal">
                StormTarget Live is checking recent hail, wind, tornado, and severe weather reports inside your selected radius.
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
                  : `Scanning within ${selectedRadius} miles of ${selectedCounty}...`}
              </span>
            </div>
          </div>
        </DemoSlide>

        {/* Step 4: Opportunity Summary & Floating Cards */}
        {step === 4 && (
          <div className="w-full h-full flex flex-col md:flex-row md:justify-end items-center relative pointer-events-none z-10 select-text">
            
            {/* Redesigned Floating Lead Target Info Panel (Left Overlay) */}
            {selectedProperty && (
              <div className="absolute top-4 left-4 z-[999] w-full max-w-[390px] md:max-w-[420px] max-h-[calc(100vh-96px)] overflow-hidden rounded-[24px] bg-[#060D1E]/95 border border-slate-500/18 shadow-2xl flex flex-col animate-in slide-in-from-left duration-300 pointer-events-auto">
                <LeadIntelligencePanel
                  selectedProperty={selectedProperty}
                  onUpdateLead={(updated) => {
                    const updatedLeads = leads.map((l) => (l.id === updated.id ? updated : l));
                    setLeads(updatedLeads);
                    if (selectedProperty && selectedProperty.id === updated.id) {
                      setSelectedProperty(updated);
                    }
                  }}
                  onClearProperty={() => setSelectedProperty(null)}
                  leads={leads}
                  onRemoveLead={(leadId) => {
                    const updatedLeads = leads.filter((l) => l.id !== leadId);
                    setLeads(updatedLeads);
                    if (selectedProperty && selectedProperty.id === leadId) {
                      setSelectedProperty(null);
                    }
                  }}
                  onAddLeads={(newLeads) => {
                    const filtered = newLeads.filter(
                      (newLead) => !leads.some((lead) => lead.fullAddress === newLead.fullAddress)
                    );
                    if (filtered.length > 0) {
                      setLeads([...leads, ...filtered]);
                    }
                  }}
                  filters={filters}
                />
              </div>
            )}

            {/* Walkthrough Tutorial Guide (Right Overlay) */}
            <div className="absolute top-4 right-4 z-[999] w-full max-w-[390px] md:max-w-[400px] max-h-[calc(100vh-96px)] overflow-y-auto rounded-[24px] bg-[#060D1E]/90 border border-slate-500/18 backdrop-blur-md p-5 md:p-6 shadow-2xl flex flex-col justify-between gap-5 animate-in slide-in-from-right duration-300 pointer-events-auto">
              <div className="space-y-4">
                <div className="space-y-1">
                  <span className="text-[8.5px] font-extrabold uppercase tracking-widest text-[#0E8F6E] bg-[#0E8F6E]/10 px-2.5 py-1 rounded border border-[#0E8F6E]/20 inline-block leading-none">
                    STEP 3 OF 4: SCAN COMPLETED
                  </span>
                  <h2 className="text-base font-black text-[#F8FAFC] tracking-tight">
                    {selectedCounty} Opportunity Zone
                  </h2>
                  <p className="text-[10px] text-slate-400 font-semibold leading-relaxed">
                    StormTarget Live has centered the map, drawn your <strong>{selectedRadius} mi</strong> search radius, and highlighted the property targets as green pins.
                  </p>
                </div>

                {/* KPI Metrics row */}
                <div className="grid grid-cols-2 gap-2.5">
                  <div className="bg-[#050B16]/50 border border-slate-800 rounded-xl p-2.5 text-center shadow-lg">
                    <span className="text-[7.5px] font-extrabold text-[#64748B] uppercase tracking-wider block">
                      Storm Impact
                    </span>
                    <span className="text-xs font-black text-red-400">HIGH (1.75" Hail)</span>
                  </div>
                  <div className="bg-[#050B16]/50 border border-slate-800 rounded-xl p-2.5 text-center shadow-lg">
                    <span className="text-[7.5px] font-extrabold text-[#64748B] uppercase tracking-wider block">
                      Target Radius
                    </span>
                    <span className="text-xs font-black text-[#145CFF]">{selectedRadius} mi radius</span>
                  </div>
                </div>

                {/* Tutorial Action Guide */}
                <div className="p-3 bg-indigo-500/5 border border-dashed border-indigo-500/25 rounded-xl space-y-2 text-[10.5px] leading-relaxed">
                  <span className="text-indigo-400 font-extrabold uppercase tracking-wider flex items-center gap-1">
                    <Sparkles size={11} className="animate-spin-slow" />
                    Interactive Walkthrough
                  </span>
                  <p className="text-slate-300">
                    Click on any **green pin** on the live map to open the redesigned **Lead Target Info** panel. You can test saving leads and requesting reports.
                  </p>
                  <button
                    onClick={handleSimulatePropertyClick}
                    className="w-full py-1.5 px-3 rounded-lg bg-indigo-500 hover:bg-indigo-600 text-white text-[9.5px] font-black uppercase tracking-wider transition-all cursor-pointer border-none shadow-md shadow-indigo-500/10"
                  >
                    Simulate Property Select
                  </button>
                </div>
              </div>

              {/* Continue button */}
              <button
                onClick={() => setStep(5)}
                className="w-full flex items-center justify-center gap-1.5 py-3 px-4 rounded-lg bg-[#145CFF] hover:bg-[#2570FF] text-[#F8FAFC] font-extrabold uppercase text-[10.5px] tracking-wider transition-all shadow-md shadow-[#145CFF]/15 cursor-pointer border-none"
              >
                <span>Choose Your Action Path</span>
                <ArrowRight size={12} />
              </button>
            </div>
          </div>
        )}

        {/* Step 5: Product Path Selection */}
        <DemoSlide isActive={step === 5} className="max-w-4xl bg-[#060D1E]/95 border border-slate-500/18 backdrop-blur-md rounded-[24px] p-6 shadow-2xl animate-in fade-in duration-200">
          <div className="space-y-5 flex flex-col h-full min-h-0">
            {/* Header copy */}
            <div className="text-center space-y-1 shrink-0">
              <span className="text-[8.5px] font-extrabold uppercase tracking-widest text-[#145CFF] bg-[#145CFF]/10 px-2.5 py-1 rounded border border-[#145CFF]/20 inline-block leading-none">
                STEP 4 OF 4: CHOOSE ACTION PATH
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
                <span className="text-[9px] text-slate-500 font-extrabold uppercase tracking-wide">Selected Path:</span>
                <span className="text-[10px] text-[#F8FAFC] font-black uppercase tracking-wider flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#145CFF]" />
                  {getProductTitle(selectedProduct)}
                </span>
              </div>
              <button
                onClick={() => setStep(6)}
                className="px-6 py-2.5 rounded-lg bg-[#145CFF] hover:bg-[#2570FF] text-[#F8FAFC] font-extrabold uppercase text-[10px] tracking-widest transition-all flex items-center gap-1 cursor-pointer border-none shadow-md shadow-[#145CFF]/10"
              >
                <span>Continue</span>
                <ChevronRight size={11} strokeWidth={2} />
              </button>
            </div>
          </div>
        </DemoSlide>

        {/* Step 6: Final CTA */}
        <DemoSlide isActive={step === 6} className="max-w-4xl bg-[#060D1E]/95 border border-slate-500/18 backdrop-blur-md rounded-[24px] p-6 md:p-8 shadow-2xl animate-in fade-in duration-200 md:grid md:grid-cols-12 gap-6 items-center select-text">
          {/* Left final sales copy */}
          <div className="md:col-span-7 flex flex-col gap-4 text-left">
            <span className="text-[8.5px] font-extrabold uppercase tracking-widest text-[#00A86B] bg-[#0E8F6E]/10 px-2.5 py-1 rounded border border-[#0E8F6E]/20 self-start leading-none">
              GET STARTED TODAY
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
                className="w-full py-3 px-4 rounded-lg bg-[#145CFF] hover:bg-[#2570FF] text-[#F8FAFC] font-extrabold uppercase text-[10.5px] tracking-wider text-center transition-all shadow-md shadow-[#145CFF]/10 cursor-pointer"
              >
                Use StormTarget Live (Full Platform)
              </a>
              
              <button
                type="button"
                onClick={() => handleOpenRequestModal("report")}
                className="w-full py-3 px-4 rounded-lg bg-[#0E8F6E] hover:bg-[#0EA781] text-[#F8FAFC] font-extrabold uppercase text-[10.5px] tracking-wider text-center transition-all shadow-md shadow-[#0E8F6E]/10 cursor-pointer border-none"
              >
                Request Hail Strike Report (Leads Only)
              </button>
              
              <button
                type="button"
                onClick={() => handleOpenRequestModal("appointments")}
                className="w-full py-3 px-4 rounded-lg bg-[#FBBF24] hover:bg-[#FBBF24]/90 text-slate-950 font-extrabold uppercase text-[10.5px] tracking-wider text-center transition-all shadow-md shadow-[#FBBF24]/10 cursor-pointer border-none"
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
                {selectedCounty}, {selectedState} Market
              </h4>

              <div className="space-y-3.5">
                <div className="flex items-center justify-between border-b border-slate-900 pb-2 text-[10px]">
                  <span className="font-semibold text-slate-500">Active Signals:</span>
                  <span className="font-black text-[#F8FAFC]">3 Storm Hits</span>
                </div>
                
                <div className="flex items-center justify-between border-b border-slate-900 pb-2 text-[10px]">
                  <span className="font-semibold text-slate-500">Target Radius:</span>
                  <span className="font-black text-[#F8FAFC]">{selectedRadius} Miles</span>
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
      <div className="px-6 py-3 bg-[#050B16]/95 border-t border-[#145CFF]/15 flex items-center justify-between shrink-0 select-none z-20">
        <button
          onClick={() => setStep((s) => Math.max(1, s - 1))}
          disabled={step === 1}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#0B1930] hover:bg-[#145CFF]/10 border border-[#145CFF]/10 hover:border-[#145CFF]/30 disabled:opacity-30 disabled:cursor-not-allowed text-xs text-slate-300 font-extrabold uppercase tracking-wider transition-all cursor-pointer"
        >
          <ChevronLeft size={13} />
          Back
        </button>

        <div className="flex items-center gap-1.5">
          {Array.from({ length: 6 }).map((_, idx) => {
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
            if (step < 6) {
              if (step === 2) {
                handleSelectorSubmit(selectedState, selectedCounty, selectedRadius);
              } else if (step === 3 && !scanCompleted) {
                triggerScanCompletion();
              } else {
                setStep((s) => s + 1);
              }
            }
          }}
          disabled={step === 6}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#145CFF] hover:bg-[#2570FF] disabled:opacity-30 disabled:cursor-not-allowed text-xs text-[#F8FAFC] font-extrabold uppercase tracking-wider transition-all cursor-pointer border-none"
        >
          Next
          <ChevronRight size={13} />
        </button>
      </div>

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
              <p className="text-[10px] text-slate-450 font-semibold leading-normal mt-1">
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
                  <label className="text-[9px] font-extrabold text-slate-550 uppercase tracking-widest block font-sans">
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
                  <label className="text-[9px] font-extrabold text-slate-550 uppercase tracking-widest block font-sans">
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
