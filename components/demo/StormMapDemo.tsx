"use client";

import React from "react";
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
  Sparkles
} from "lucide-react";
import DemoProgress from "./DemoProgress";
import DemoRadarPreview from "./DemoRadarPreview";
import DemoMarketSelector from "./DemoMarketSelector";
import DemoProductCards from "./DemoProductCards";
import DemoSlide from "./DemoSlide";

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

  // Handle slide changes via keyboard arrow keys
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        if (step < 6) {
          if (step === 2) {
            handleSelectorSubmit("TN", "Knox County", 15);
          } else if (step === 3 && !scanCompleted) {
            setScanProgress(100);
            setScanCompleted(true);
            setCheckedProgressItems([0, 1, 2, 3, 4]);
            setStep(4);
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
  }, [step, scanCompleted]);

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
          setScanCompleted(true);
          return 100;
        }
        return next;
      });
    }, 120);

    return () => clearInterval(interval);
  }, [step]);

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

  // Handle selector submission from Step 2
  const handleSelectorSubmit = (state: string, county: string, radius: number) => {
    setSelectedState(state);
    setSelectedCounty(county);
    setSelectedRadius(radius);
    setFormData((prev) => ({ ...prev, market: `${county}, ${state}` }));
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

  return (
    <div className="w-screen h-screen min-h-screen bg-[#071426] text-[#F8FAFC] flex flex-col overflow-hidden select-none font-sans">
      
      {/* Top Progress bar */}
      <DemoProgress currentStep={step} onStepClick={(s) => setStep(s)} />

      {/* Main Slide Workspace Container */}
      <div className="flex-1 relative w-full h-full overflow-hidden bg-gradient-to-b from-[#071426] to-[#040A12] flex items-center justify-center p-4 md:p-6 lg:p-8">
        
        {/* Step 1: Hero Intro */}
        <DemoSlide isActive={step === 1} className="max-w-6xl md:grid md:grid-cols-12 gap-6 items-center justify-between">
          {/* Left Copy Column */}
          <div className="md:col-span-7 flex flex-col gap-4 text-left select-text">
            <span className="text-[9px] font-black uppercase tracking-widest text-[#145CFF] bg-[#145CFF]/10 px-2.5 py-1 rounded-md border border-[#145CFF]/20 self-start leading-none">
              LIVE STORM INTELLIGENCE FOR ROOFING CONTRACTORS
            </span>
            
            <h1 className="text-2xl md:text-4xl font-black text-[#F8FAFC] leading-[1.15] tracking-tight">
              Find Storm-Hit Homes <br className="hidden md:inline" />
              Before Your Competition Does
            </h1>
            
            <p className="text-xs md:text-sm text-slate-300 font-semibold leading-relaxed max-w-lg">
              StormTarget Live helps roofing contractors identify where hail, wind, and severe storms just hit — then turn those storm events into homeowner leads, property intelligence, and roof inspection appointments.
            </p>

            <p className="text-[10.5px] text-slate-455 leading-normal font-semibold max-w-lg">
              Start with the live storm map, choose your target market, and decide whether you want full platform access, a ready-to-use Hail Strike Report, or done-for-you homeowner appointments.
            </p>

            {/* CTAs */}
            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={() => setStep(2)}
                className="px-5 py-3 rounded-lg bg-[#145CFF] hover:bg-[#2570FF] text-[#F8FAFC] font-extrabold uppercase text-[11px] tracking-wider transition-all flex items-center gap-1.5 shadow-lg shadow-[#145CFF]/15 cursor-pointer"
              >
                <Play size={11} className="fill-[#F8FAFC]" />
                Start Walkthrough
              </button>
              <a
                href="/storm-map"
                className="px-5 py-3 rounded-lg bg-[#050B16] hover:bg-[#0B1930] text-slate-300 hover:text-slate-100 font-extrabold uppercase text-[11px] tracking-wider border border-[#145CFF]/20 hover:border-[#145CFF]/45 transition-all cursor-pointer"
              >
                View Live Map
              </a>
            </div>

            {/* Skip to Product Options link */}
            <div className="pt-1 select-none">
              <button
                onClick={handleSkipToOptions}
                className="text-[10px] text-slate-450 hover:text-[#145CFF] underline font-semibold transition-colors"
              >
                Skip to Product Options & Pricing
              </button>
            </div>
          </div>

          {/* Right Graphic Preview Column */}
          <div className="md:col-span-5 w-full h-[65%] md:h-[85%] max-h-[420px] flex items-center justify-center">
            <DemoRadarPreview scanning={false} showOpportunities={false} selectedRadius={15} />
          </div>

          {/* Bottom Value Chips */}
          <div className="col-span-12 grid grid-cols-3 gap-3 pt-3 border-t border-[#145CFF]/10 select-none">
            {[
              { title: "Live Storm Tracking", desc: "Real-time NOAA radar and NWS warning scans" },
              { title: "County-Level Targeting", desc: "No addresses needed, target what you serve" },
              { title: "Leads or Appointments", desc: "Flexible paths to turn storm data into roof sales" },
            ].map((chip) => (
              <div key={chip.title} className="flex gap-2.5 items-start bg-[#0B1930]/30 border border-[#145CFF]/10 rounded-lg p-2.5">
                <div className="p-1.5 rounded bg-[#145CFF]/10 text-[#145CFF] mt-0.5">
                  <Sparkles size={11} />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-black text-[#F8FAFC] leading-none uppercase tracking-wide">
                    {chip.title}
                  </span>
                  <span className="text-[8.5px] text-slate-500 font-semibold leading-normal mt-0.5">
                    {chip.desc}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </DemoSlide>

        {/* Step 2: Market Selection */}
        <DemoSlide isActive={step === 2} className="max-w-5xl md:grid md:grid-cols-12 gap-6 items-center justify-between">
          {/* Left Selector Column */}
          <div className="md:col-span-5 flex flex-col justify-center gap-4 text-left">
            <div className="space-y-1">
              <span className="text-[8.5px] font-extrabold uppercase tracking-widest text-[#145CFF]">
                STEP 1 OF 4: DEFINE AREA
              </span>
              <h2 className="text-xl md:text-2xl font-black text-[#F8FAFC] tracking-tight">
                Choose Your Market
              </h2>
              <p className="text-[11px] text-slate-300 font-semibold leading-relaxed">
                Choose a state, county, and search radius. StormTarget Live scans recent hail, wind, tornado, and severe weather activity around that market so you can focus on the neighborhoods most likely to need roof inspections.
              </p>
            </div>

            <DemoMarketSelector onSearchSubmit={handleSelectorSubmit} />
          </div>

          {/* Right Map Preview Column */}
          <div className="md:col-span-7 w-full h-[65%] md:h-[85%] max-h-[420px] flex items-center justify-center">
            <DemoRadarPreview scanning={false} showOpportunities={false} selectedRadius={selectedRadius} />
          </div>
        </DemoSlide>

        {/* Step 3: Scanning / Analysis Animation */}
        <DemoSlide isActive={step === 3} className="max-w-5xl md:grid md:grid-cols-12 gap-6 items-center justify-between">
          {/* Left Radar Map Column */}
          <div className="md:col-span-7 w-full h-[65%] md:h-[85%] max-h-[420px] flex items-center justify-center">
            <DemoRadarPreview scanning={true} scanProgress={scanProgress} showOpportunities={scanProgress > 70} selectedRadius={selectedRadius} />
          </div>

          {/* Right Process/Status Column */}
          <div className="md:col-span-5 flex flex-col justify-center gap-4 text-left">
            <div className="space-y-1">
              <span className="text-[8.5px] font-extrabold uppercase tracking-widest text-[#145CFF] animate-pulse">
                STEP 2 OF 4: SCANNING LIVE WEATHER
              </span>
              <h2 className="text-xl md:text-2xl font-black text-[#F8FAFC] tracking-tight">
                Scanning Storm Activity <br />
                in {selectedCounty}, {selectedState}
              </h2>
              <p className="text-[11px] text-slate-400 font-semibold leading-normal">
                StormTarget Live is checking recent hail, wind, tornado, and severe weather reports inside your selected radius.
              </p>
            </div>

            {/* Checklist Items */}
            <div className="bg-[#0B1930]/40 border border-[#145CFF]/15 rounded-xl p-4 space-y-3">
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
                          ? "text-slate-300"
                          : isScanningNow
                          ? "text-[#F8FAFC] font-extrabold"
                          : "text-slate-550"
                      }`}
                    >
                      {item}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Status Output Bar */}
            <div className="bg-[#050B16] border border-[#145CFF]/10 rounded-lg p-3 flex items-center justify-between text-[10px] font-bold text-slate-400 select-none">
              <span className="truncate flex items-center gap-1.5">
                <span className={`w-1.5 h-1.5 rounded-full ${scanCompleted ? "bg-[#00A86B]" : "bg-[#145CFF] animate-ping"}`} />
                {scanCompleted
                  ? "Storm activity found. Opportunity summary ready."
                  : `Analyzing storm activity within ${selectedRadius} miles of ${selectedCounty}...`}
              </span>
            </div>

            {/* Navigation button appears when scanning finishes */}
            {scanCompleted ? (
              <button
                onClick={() => setStep(4)}
                className="w-full flex items-center justify-center gap-1.5 py-3 px-4 rounded-lg bg-[#0E8F6E] hover:bg-[#0EA781] text-[#F8FAFC] font-extrabold uppercase text-[10.5px] tracking-wider transition-all shadow-md shadow-[#0E8F6E]/10 cursor-pointer animate-in zoom-in-95 duration-200"
              >
                <span>View Opportunity Summary</span>
                <ArrowRight size={12} />
              </button>
            ) : (
              <button
                disabled
                className="w-full flex items-center justify-center gap-1.5 py-3 px-4 rounded-lg bg-[#145CFF]/15 text-[#145CFF]/40 border-none cursor-not-allowed text-[10.5px] font-extrabold uppercase tracking-wider"
              >
                Scanning Market...
              </button>
            )}
          </div>
        </DemoSlide>

        {/* Step 4: Opportunity Summary */}
        <DemoSlide isActive={step === 4} className="max-w-5xl">
          {/* Top Row: Title */}
          <div className="text-center md:text-left space-y-1 shrink-0">
            <span className="text-[8.5px] font-extrabold uppercase tracking-widest text-[#0E8F6E] bg-[#0E8F6E]/10 px-2.5 py-1 rounded border border-[#0E8F6E]/20 inline-block leading-none">
              STEP 3 OF 4: SCAN COMPLETED
            </span>
            <h2 className="text-xl md:text-2xl font-black text-[#F8FAFC] tracking-tight">
              {selectedCounty} Storm Opportunity Found
            </h2>
            <p className="text-[11px] text-slate-400 font-semibold leading-relaxed max-w-2xl">
              StormTarget Live highlights the market, severity, and next-best actions so your team can move before competitors flood the area.
            </p>
          </div>

          {/* Middle Row: Content Split */}
          <div className="flex-1 grid grid-cols-1 md:grid-cols-12 gap-6 items-center justify-between min-h-0 py-4">
            {/* Left KPI/Map preview area */}
            <div className="md:col-span-7 w-full h-full flex flex-col justify-between gap-3 min-h-0">
              {/* KPI Metrics row */}
              <div className="grid grid-cols-4 gap-2.5 shrink-0">
                {[
                  { label: "Active Signals", val: "3", color: "text-[#145CFF]" },
                  { label: "High-Impact", val: "8", color: "text-[#F43F5E]" },
                  { label: "Target Radius", val: `${selectedRadius} mi`, color: "text-slate-300" },
                  { label: "Opportunity", val: "HIGH", color: "text-[#00A86B]" },
                ].map((kpi) => (
                  <div key={kpi.label} className="bg-[#0B1930]/40 border border-[#145CFF]/15 rounded-xl p-3 flex flex-col gap-0.5 text-center shadow-lg shadow-black/10">
                    <span className="text-[7.5px] font-extrabold text-[#64748B] uppercase tracking-wider block">
                      {kpi.label}
                    </span>
                    <span className={`text-sm md:text-base font-black ${kpi.color}`}>
                      {kpi.val}
                    </span>
                  </div>
                ))}
              </div>

              {/* Simulated Results Preview panel */}
              <div className="flex-1 min-h-0 relative bg-[#050B16] rounded-xl border border-[#145CFF]/15 overflow-hidden flex flex-col p-3 gap-2">
                <div className="flex items-center justify-between border-b border-[#145CFF]/10 pb-1.5 shrink-0 select-none">
                  <span className="text-[8px] font-extrabold text-[#64748B] uppercase tracking-widest flex items-center gap-1">
                    <MapPin size={10} className="text-[#145CFF]" />
                    Identified Opportunity Zones
                  </span>
                  <span className="text-[7.5px] font-mono text-emerald-500 uppercase flex items-center gap-1">
                    <span className="w-1 h-1 rounded-full bg-emerald-500 animate-ping" />
                    Map Synced
                  </span>
                </div>

                {/* List of mock neighborhoods */}
                <div className="flex-1 overflow-y-auto space-y-2 pr-0.5 custom-scrollbar min-h-0">
                  {[
                    { name: "Farragut (West Knox)", impact: "1.75\" Hail Strike Detected", severity: "High Intensity" },
                    { name: "Bearden / Sequoyah Hills", impact: "1.25\" Hail Strike + 60mph Wind", severity: "Medium Intensity" },
                    { name: "Powell / Halls", impact: "NWS Tornado Warning Overlay", severity: "High Intensity" },
                  ].map((item) => (
                    <div key={item.name} className="p-2.5 bg-[#0B1930]/30 border border-[#145CFF]/10 rounded-lg flex items-center justify-between gap-3 text-left">
                      <div className="space-y-0.5 truncate">
                        <span className="text-[9.5px] font-black text-[#F8FAFC] tracking-tight leading-none block">
                          {item.name}
                        </span>
                        <span className="text-[8.5px] text-slate-400 font-semibold leading-none block">
                          {item.impact}
                        </span>
                      </div>
                      <span className={`px-2 py-0.5 rounded-sm text-[7.5px] font-black uppercase tracking-wider shrink-0 ${
                        item.severity === "High Intensity"
                          ? "bg-rose-500/10 text-[#F43F5E] border border-rose-500/20"
                          : "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                      }`}>
                        {item.severity}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Summary column */}
            <div className="md:col-span-5 flex flex-col gap-4 text-left justify-center select-text">
              <div className="bg-[#0B1930]/40 border border-[#145CFF]/15 rounded-xl p-4.5 space-y-3 shadow-xl shadow-black/10">
                <span className="text-[8.5px] font-extrabold uppercase tracking-widest text-[#145CFF] block">
                  MARKET SUMMARY
                </span>
                <p className="text-[10px] text-slate-300 leading-relaxed font-semibold">
                  Recent severe weather activity was detected inside your selected market. StormTarget Live helps you move from storm activity to actionable roofing opportunities by combining storm intelligence, property targeting, and lead or appointment options.
                </p>
                
                <div className="border-t border-[#145CFF]/10 pt-2.5 flex gap-2 items-start bg-[#F43F5E]/5 border border-dashed border-[#F43F5E]/20 p-3 rounded-lg">
                  <Info size={14} className="text-[#F43F5E] shrink-0 mt-0.5" />
                  <p className="text-[9px] text-[#FBBF24] font-black uppercase tracking-wide leading-tight">
                    Storms fade fast. Homeowner intent does too.
                  </p>
                </div>
              </div>

              {/* Continue button */}
              <button
                onClick={() => setStep(5)}
                className="w-full flex items-center justify-center gap-1.5 py-3.5 px-4 rounded-lg bg-[#145CFF] hover:bg-[#2570FF] text-[#F8FAFC] font-extrabold uppercase text-[10.5px] tracking-wider transition-all shadow-md shadow-[#145CFF]/15 cursor-pointer"
              >
                <span>Choose Your Action Path</span>
                <ArrowRight size={12} />
              </button>
            </div>
          </div>
        </DemoSlide>

        {/* Step 5: Product Path Selection */}
        <DemoSlide isActive={step === 5} className="max-w-6xl">
          {/* Header copy */}
          <div className="text-center space-y-1 shrink-0">
            <span className="text-[8.5px] font-extrabold uppercase tracking-widest text-[#145CFF] bg-[#145CFF]/10 px-2.5 py-1 rounded border border-[#145CFF]/20 inline-block leading-none">
              STEP 4 OF 4: CHOOSE ACTION PATH
            </span>
            <h2 className="text-xl md:text-2xl font-black text-[#F8FAFC] tracking-tight">
              Choose How You Want to Turn Storm Data Into Revenue
            </h2>
            <p className="text-[11px] text-slate-400 font-semibold leading-relaxed max-w-xl mx-auto">
              Every contractor works differently. StormTarget Live gives you three ways to act on the same storm intelligence.
            </p>
          </div>

          {/* Product option cards grid */}
          <div className="flex-1 flex items-center justify-center py-4 min-h-0">
            <DemoProductCards selectedProductId={selectedProduct} onSelectProduct={setSelectedProduct} />
          </div>

          {/* Bottom Row: continues */}
          <div className="flex items-center justify-between border-t border-[#145CFF]/10 pt-4 shrink-0 bg-[#050B16]/30 px-4 py-3 rounded-xl">
            <div className="flex items-center gap-2">
              <span className="text-[9px] text-[#64748B] font-extrabold uppercase tracking-wide">Selected Path:</span>
              <span className="text-[10px] text-[#F8FAFC] font-black uppercase tracking-wider flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#145CFF]" />
                {getProductTitle(selectedProduct)}
              </span>
            </div>
            <button
              onClick={() => setStep(6)}
              className="px-6 py-2.5 rounded-lg bg-[#145CFF] hover:bg-[#2570FF] text-[#F8FAFC] font-extrabold uppercase text-[10px] tracking-widest transition-all flex items-center gap-1 cursor-pointer"
            >
              <span>Continue</span>
              <ChevronRight size={11} strokeWidth={2} />
            </button>
          </div>
        </DemoSlide>

        {/* Step 6: Final CTA */}
        <DemoSlide isActive={step === 6} className="max-w-5xl md:grid md:grid-cols-12 gap-6 items-center justify-between">
          {/* Left final sales copy */}
          <div className="md:col-span-7 flex flex-col gap-4 text-left select-text">
            <span className="text-[8.5px] font-extrabold uppercase tracking-widest text-[#00A86B] bg-[#0E8F6E]/10 px-2.5 py-1 rounded border border-[#0E8F6E]/20 self-start leading-none">
              GET STARTED TODAY
            </span>
            
            <h1 className="text-2xl md:text-3xl font-black text-[#F8FAFC] leading-tight tracking-tight">
              Ready to Work This Storm?
            </h1>
            
            <p className="text-xs text-slate-300 font-semibold leading-relaxed max-w-lg">
              Choose the option that fits your team and start turning storm activity into real roofing opportunities.
            </p>

            <div className="bg-[#050B16] border border-[#145CFF]/15 rounded-xl p-4 flex gap-3 items-start max-w-lg">
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
                className="w-full py-3 px-4 rounded-lg bg-[#0E8F6E] hover:bg-[#0EA781] text-[#F8FAFC] font-extrabold uppercase text-[10.5px] tracking-wider text-center transition-all shadow-md shadow-[#0E8F6E]/10 cursor-pointer"
              >
                Request Hail Strike Report (Leads Only)
              </button>
              
              <button
                type="button"
                onClick={() => handleOpenRequestModal("appointments")}
                className="w-full py-3 px-4 rounded-lg bg-[#FBBF24] hover:bg-[#FBBF24]/90 text-slate-950 font-extrabold uppercase text-[10.5px] tracking-wider text-center transition-all shadow-md shadow-[#FBBF24]/10 cursor-pointer"
              >
                Request Homeowner Appointments (DFY)
              </button>
            </div>

            {/* Bottom links */}
            <div className="flex items-center gap-4 pt-1 select-none">
              <a
                href="/storm-map"
                className="text-[9.5px] text-slate-455 hover:text-slate-300 font-extrabold uppercase tracking-wider"
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
                }}
                className="text-[9.5px] text-slate-455 hover:text-slate-300 font-extrabold uppercase tracking-wider flex items-center gap-1 cursor-pointer"
              >
                <RotateCcw size={10} />
                Restart Walkthrough
              </button>
            </div>
          </div>

          {/* Right selected summary card column */}
          <div className="md:col-span-5 w-full flex justify-center select-text">
            <div className="w-full max-w-sm bg-[#0B1930]/40 border border-[#145CFF]/20 rounded-2xl p-5 shadow-2xl relative">
              <div className="absolute top-0 left-0 right-0 h-1.5 rounded-t-2xl bg-[#00A86B]" />
              
              <span className="text-[8px] font-extrabold text-[#00A86B] uppercase tracking-widest block mb-1">
                CHOSEN MARKET SUMMARY
              </span>
              
              <h4 className="text-sm font-black text-[#F8FAFC] tracking-tight leading-none mb-4">
                {selectedCounty}, {selectedState} Market
              </h4>

              <div className="space-y-3.5">
                <div className="flex items-center justify-between border-b border-[#145CFF]/10 pb-2 text-[10px]">
                  <span className="font-semibold text-slate-450">Active Signals:</span>
                  <span className="font-black text-[#F8FAFC]">3 Storm Hits</span>
                </div>
                
                <div className="flex items-center justify-between border-b border-[#145CFF]/10 pb-2 text-[10px]">
                  <span className="font-semibold text-slate-450">Target Radius:</span>
                  <span className="font-black text-[#F8FAFC]">{selectedRadius} Miles</span>
                </div>

                <div className="flex items-center justify-between border-b border-[#145CFF]/10 pb-2 text-[10px]">
                  <span className="font-semibold text-slate-450">Selected Product:</span>
                  <span className="font-black text-[#145CFF] uppercase tracking-wide">
                    {selectedProduct === "platform" ? "Full Access" : selectedProduct === "report" ? "Leads Only" : "Appointments"}
                  </span>
                </div>

                <div className="pt-2 bg-[#050B16]/50 border border-[#145CFF]/10 rounded-lg p-3 text-[9.5px] leading-relaxed text-slate-400 font-semibold">
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
      <div className="px-6 py-3 bg-[#050B16] border-t border-[#145CFF]/15 flex items-center justify-between shrink-0 select-none z-50">
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
                handleSelectorSubmit("TN", "Knox County", 15);
              } else if (step === 3 && !scanCompleted) {
                setScanProgress(100);
                setScanCompleted(true);
                setCheckedProgressItems([0, 1, 2, 3, 4]);
                setStep(4);
              } else {
                setStep((s) => s + 1);
              }
            }
          }}
          disabled={step === 6}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#145CFF] hover:bg-[#2570FF] disabled:opacity-30 disabled:cursor-not-allowed text-xs text-[#F8FAFC] font-extrabold uppercase tracking-wider transition-all cursor-pointer"
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
            {/* Top green glow bar */}
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
                {/* Name */}
                <div className="space-y-1.5">
                  <label className="text-[9px] font-extrabold text-slate-500 uppercase tracking-widest block">
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
                      className="w-full bg-[#050B16] border border-[#145CFF]/20 rounded-lg pl-8 pr-3 py-2 text-xs text-[#F8FAFC] focus:outline-none focus:border-[#145CFF] placeholder:text-slate-600"
                    />
                  </div>
                </div>

                {/* Company */}
                <div className="space-y-1.5">
                  <label className="text-[9px] font-extrabold text-slate-500 uppercase tracking-widest block">
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
                      className="w-full bg-[#050B16] border border-[#145CFF]/20 rounded-lg pl-8 pr-3 py-2 text-xs text-[#F8FAFC] focus:outline-none focus:border-[#145CFF] placeholder:text-slate-600"
                    />
                  </div>
                </div>

                {/* Email */}
                <div className="space-y-1.5">
                  <label className="text-[9px] font-extrabold text-slate-500 uppercase tracking-widest block">
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
                      className="w-full bg-[#050B16] border border-[#145CFF]/20 rounded-lg pl-8 pr-3 py-2 text-xs text-[#F8FAFC] focus:outline-none focus:border-[#145CFF] placeholder:text-slate-600"
                    />
                  </div>
                </div>

                {/* Phone */}
                <div className="space-y-1.5">
                  <label className="text-[9px] font-extrabold text-slate-500 uppercase tracking-widest block">
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
                      className="w-full bg-[#050B16] border border-[#145CFF]/20 rounded-lg pl-8 pr-3 py-2 text-xs text-[#F8FAFC] focus:outline-none focus:border-[#145CFF] placeholder:text-slate-600"
                    />
                  </div>
                </div>

                {/* Selected Market (Pre-filled, read-only) */}
                <div className="space-y-1.5">
                  <label className="text-[9px] font-extrabold text-slate-500 uppercase tracking-widest block">
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

                {/* Actions */}
                <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-[#145CFF]/15">
                  <button
                    type="button"
                    onClick={() => setModalOpen(false)}
                    className="px-4 py-2 rounded-lg bg-transparent text-slate-400 hover:text-slate-200 text-[10px] font-black uppercase tracking-wider cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-lg bg-[#145CFF] hover:bg-[#2570FF] text-[#F8FAFC] text-[10px] font-black uppercase tracking-wider shadow-md shadow-[#145CFF]/10 cursor-pointer"
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
