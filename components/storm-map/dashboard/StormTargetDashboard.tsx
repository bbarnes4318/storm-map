"use client";

import React from "react";
import { 
  FileText, 
  Download, 
  UserPlus, 
  MoreVertical, 
  ShieldAlert, 
  Zap, 
  Wind, 
  Home, 
  User, 
  CalendarDays, 
  Compass, 
  Lock, 
  ArrowRight,
  Sparkles,
  Map,
  Shield,
  HelpCircle,
  TrendingUp,
  AlertCircle
} from "lucide-react";
import { SelectedPropertyTarget, StormReport, NwsAlert } from "@/lib/weather/types";
import { USCounty } from "@/lib/geo/us-counties";
import { getDistanceMiles, calculateReportScore } from "@/lib/weather/geo";
import { StormTargetPurchaseDrawer, PurchaseProductType } from "./StormTargetPurchaseDrawer";

interface StormTargetDashboardProps {
  selectedProperty: SelectedPropertyTarget | null;
  selectedMarket: {
    stateCode: string;
    counties: USCounty[];
    radiusMiles: number;
  } | null;
  reports: StormReport[];
  alerts: NwsAlert[];
  leads: SelectedPropertyTarget[];
  onTriggerGeocodeAddress: (address: string) => Promise<boolean>;
  onClearAll: () => void;
  onOpenLiveStormMap: () => void;
}

export function StormTargetDashboard({
  selectedProperty,
  selectedMarket,
  reports,
  alerts,
  leads,
  onTriggerGeocodeAddress,
  onClearAll,
  onOpenLiveStormMap
}: StormTargetDashboardProps) {
  // Purchase drawer state
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);
  const [drawerProduct, setDrawerProduct] = React.useState<PurchaseProductType>("STORMTARGET_LIVE");
  const [drawerQuantity, setDrawerQuantity] = React.useState("1,000 records");

  // Gated states (simulated on-demand request triggers)
  const [isHomeownerUnlocked, setIsHomeownerUnlocked] = React.useState(false);
  const [isRoofConnected, setIsRoofConnected] = React.useState(false);
  const [isHistoryConnected, setIsHistoryConnected] = React.useState(false);

  // Compute stats based on selected target context
  const targetMetrics = React.useMemo(() => {
    let maxHailVal = 0;
    let maxWindVal = 0;
    let maxRiskScore = 0;
    let nearbyReportsCount = 0;
    
    let primaryThreat = "None";
    let representativeReport: StormReport | null = null;
    let filteredReports: StormReport[] = [];

    if (selectedProperty) {
      // 1. Property Selected: Filter reports within 25 miles
      const pLat = selectedProperty.latitude;
      const pLon = selectedProperty.longitude;

      filteredReports = reports.filter(r => {
        const dist = getDistanceMiles(pLat, pLon, r.lat, r.lon);
        return dist <= 25;
      });

      nearbyReportsCount = filteredReports.length;

      filteredReports.forEach(r => {
        const score = calculateReportScore(r, alerts, reports);
        if (score > maxRiskScore) maxRiskScore = score;

        if (r.type === "hail" && r.magnitude) {
          let size = parseFloat(r.magnitude);
          if (size > 10) size = size / 100;
          if (size > maxHailVal) {
            maxHailVal = size;
            representativeReport = r;
          }
        } else if (r.type === "wind" && r.magnitude) {
          const speed = parseFloat(r.magnitude);
          if (speed > maxWindVal) {
            maxWindVal = speed;
            if (!representativeReport || representativeReport.type !== "hail") {
              representativeReport = r;
            }
          }
        } else if (r.type === "tornado") {
          if (!representativeReport) {
            representativeReport = r;
          }
        }
      });
    } else if (selectedMarket) {
      // 2. County/Market Selected: Filter reports within selected counties bounding boxes/centroids
      const countyNames = selectedMarket.counties.map(c => c.countyName.toLowerCase());
      const state = selectedMarket.stateCode.toLowerCase();

      filteredReports = reports.filter(r => 
        r.state.toLowerCase() === state && 
        countyNames.includes(r.county.toLowerCase())
      );

      nearbyReportsCount = filteredReports.length;

      filteredReports.forEach(r => {
        const score = calculateReportScore(r, alerts, reports);
        if (score > maxRiskScore) maxRiskScore = score;

        if (r.type === "hail" && r.magnitude) {
          let size = parseFloat(r.magnitude);
          if (size > 10) size = size / 100;
          if (size > maxHailVal) {
            maxHailVal = size;
            representativeReport = r;
          }
        } else if (r.type === "wind" && r.magnitude) {
          const speed = parseFloat(r.magnitude);
          if (speed > maxWindVal) {
            maxWindVal = speed;
            if (!representativeReport || representativeReport.type !== "hail") {
              representativeReport = r;
            }
          }
        } else if (r.type === "tornado") {
          if (!representativeReport) {
            representativeReport = r;
          }
        }
      });
    }

    if (maxHailVal > 0 && maxHailVal >= 1.5) {
      primaryThreat = "Severe Hail Strike";
    } else if (maxHailVal > 0) {
      primaryThreat = "Hail Strike";
    } else if (maxWindVal > 0 && maxWindVal >= 60) {
      primaryThreat = "High Wind Damage";
    } else if (maxWindVal > 0) {
      primaryThreat = "Wind Damage";
    } else if (nearbyReportsCount > 0) {
      primaryThreat = "Severe Weather Alert";
    }

    // Risk Level Mapping
    let riskLevel: "Critical" | "High" | "Medium" | "Low" = "Low";
    if (maxRiskScore >= 80) riskLevel = "Critical";
    else if (maxRiskScore >= 50) riskLevel = "High";
    else if (maxRiskScore >= 30) riskLevel = "Medium";

    return {
      maxHail: maxHailVal > 0 ? `${maxHailVal.toFixed(2)} in` : "No hail detected",
      peakWind: maxWindVal > 0 ? `${maxWindVal} mph` : "No wind report",
      riskScore: nearbyReportsCount > 0 ? Math.min(Math.round(maxRiskScore), 100) : 0,
      riskLevel,
      primaryThreat,
      representativeReport,
      reportsCount: nearbyReportsCount,
      allLocalReports: filteredReports
    };
  }, [selectedProperty, selectedMarket, reports, alerts]);

  // Context Descriptions
  const headerTitle = selectedProperty 
    ? selectedProperty.fullAddress 
    : selectedMarket 
      ? `${selectedMarket.counties.map(c => c.countyName).join(", ")} County, ${selectedMarket.stateCode} Storm Opportunity`
      : "No Active Target Selected";

  const contextLabelForDrawer = selectedProperty 
    ? selectedProperty.fullAddress 
    : selectedMarket 
      ? `${selectedMarket.counties.map(c => c.countyFullName).join(", ")}, ${selectedMarket.stateCode} (${selectedMarket.radiusMiles} mi radius)`
      : "";

  const handleOpenDrawer = (prod: PurchaseProductType, qty?: string) => {
    setDrawerProduct(prod);
    if (qty) setDrawerQuantity(qty);
    setIsDrawerOpen(true);
  };

  const handleUnlockHomeownerData = () => {
    // Strictly simulate gating request
    setIsHomeownerUnlocked(true);
  };

  const handleConnectRoof = () => {
    // strictly simulate gating request
    setIsRoofConnected(true);
  };

  const handleConnectHistory = () => {
    // strictly simulate gating request
    setIsHistoryConnected(true);
  };

  return (
    <div className="w-full flex-1 flex flex-col md:flex-row overflow-hidden bg-[#F8FAFC]">
      {/* Scrollable Main Workspace */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar text-[#0F172A]">
        {/* Header Block */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#E5E7EB] pb-4">
          <div className="space-y-1">
            <h1 className="text-xl md:text-2xl font-black text-[#0F172A] tracking-tight leading-snug">
              {headerTitle}
            </h1>
            <div className="flex flex-wrap items-center gap-2">
              <span className="bg-[#0E8F6E]/10 border border-[#0E8F6E]/20 text-[#0E8F6E] px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider">
                NOAA Verified
              </span>
              <span className="text-[10px] text-[#64748B] font-semibold">
                Updated 5m ago
              </span>
              {(selectedProperty || selectedMarket) && (
                <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider border ${
                  targetMetrics.riskLevel === "Critical" ? "bg-red-50 border-red-200 text-red-700" :
                  targetMetrics.riskLevel === "High" ? "bg-orange-50 border-orange-200 text-orange-700" :
                  targetMetrics.riskLevel === "Medium" ? "bg-yellow-50 border-yellow-200 text-yellow-700" :
                  "bg-slate-50 border-slate-200 text-slate-700"
                }`}>
                  {targetMetrics.riskLevel} Opportunity
                </span>
              )}
            </div>
          </div>

          {/* Header Actions */}
          <div className="flex items-center gap-2">
            <button 
              className="flex items-center gap-1.5 px-3 py-2 bg-[#145CFF] hover:bg-[#2570FF] text-white text-xs font-black uppercase tracking-wider rounded-lg shadow-sm transition-all border-none cursor-pointer"
              onClick={() => alert("Report generation request submitted successfully.")}
            >
              <FileText size={13} />
              <span>{selectedProperty ? "Create Report" : "Create Market Report"}</span>
            </button>
            
            <button 
              className="flex items-center gap-1.5 px-3 py-2 bg-white hover:bg-slate-50 border border-[#E5E7EB] text-[#475569] text-xs font-black uppercase tracking-wider rounded-lg transition-all cursor-pointer"
              onClick={() => {
                if (leads.length === 0) {
                  alert("No lead records available to export yet. Generate addresses or select a market first.");
                  return;
                }
                alert(`Exporting ${leads.length} records to CSV...`);
              }}
            >
              <Download size={13} />
              <span>{selectedProperty ? "Export CSV" : "Export Leads"}</span>
            </button>

            <button 
              className="flex items-center gap-1.5 px-3 py-2 bg-white hover:bg-slate-50 border border-[#E5E7EB] text-[#475569] text-xs font-black uppercase tracking-wider rounded-lg transition-all cursor-pointer"
              onClick={() => alert("Assignment request registered.")}
            >
              <UserPlus size={13} />
              <span>{selectedProperty ? "Assign Lead" : "Assign Territory"}</span>
            </button>

            <button 
              onClick={onClearAll}
              className="p-2 bg-white border border-[#E5E7EB] text-[#64748B] hover:text-[#0F172A] rounded-lg transition-all cursor-pointer"
              title="Reset target opportunity"
            >
              Clear
            </button>
          </div>
        </div>

        {/* KPI Strip */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
          {/* KPI 1: Damage Risk Score */}
          <div className="bg-white border border-[#E5E7EB] rounded-xl p-4 shadow-sm space-y-1">
            <span className="text-[9px] font-black text-[#64748B] uppercase tracking-wider block">Damage Risk Score</span>
            <div className="flex items-baseline gap-1.5">
              <span className="text-xl md:text-2xl font-black text-[#0F172A]">
                {selectedProperty || selectedMarket ? targetMetrics.riskScore : "Pending"}
              </span>
              {selectedProperty || selectedMarket ? (
                <span className="text-[10px] font-bold text-[#64748B]">/ 100</span>
              ) : null}
            </div>
            {(selectedProperty || selectedMarket) ? (
              <span className={`text-[9.5px] font-bold ${
                targetMetrics.riskLevel === "Critical" || targetMetrics.riskLevel === "High" ? "text-red-650" :
                targetMetrics.riskLevel === "Medium" ? "text-amber-600" : "text-[#0E8F6E]"
              }`}>
                {targetMetrics.riskLevel} Severity
              </span>
            ) : (
              <span className="text-[9.5px] text-slate-400 italic">No target selected</span>
            )}
          </div>

          {/* KPI 2: Max Hail */}
          <div className="bg-white border border-[#E5E7EB] rounded-xl p-4 shadow-sm space-y-1">
            <span className="text-[9px] font-black text-[#64748B] uppercase tracking-wider block">Max Hail</span>
            <div className="flex items-center gap-1.5">
              <ShieldAlert size={16} className="text-[#145CFF]" />
              <span className="text-xl font-black text-[#0F172A] truncate">
                {selectedProperty || selectedMarket ? targetMetrics.maxHail : "Pending"}
              </span>
            </div>
            <span className="text-[9.5px] text-slate-400 italic block truncate">
              {selectedProperty || selectedMarket ? `${targetMetrics.primaryThreat}` : "Unavailable"}
            </span>
          </div>

          {/* KPI 3: Peak Wind */}
          <div className="bg-white border border-[#E5E7EB] rounded-xl p-4 shadow-sm space-y-1">
            <span className="text-[9px] font-black text-[#64748B] uppercase tracking-wider block">Peak Wind</span>
            <div className="flex items-center gap-1.5">
              <Wind size={16} className="text-[#145CFF]" />
              <span className="text-xl font-black text-[#0F172A] truncate">
                {selectedProperty || selectedMarket ? targetMetrics.peakWind : "Pending"}
              </span>
            </div>
            <span className="text-[9.5px] text-slate-400 italic block">
              {selectedProperty || selectedMarket ? "Near target coordinates" : "Unavailable"}
            </span>
          </div>

          {/* KPI 4: Roof Size / Property Count */}
          <div className="bg-white border border-[#E5E7EB] rounded-xl p-4 shadow-sm space-y-1">
            <span className="text-[9px] font-black text-[#64748B] uppercase tracking-wider block">
              {selectedProperty ? "Roof Size" : "Affected Properties"}
            </span>
            <div className="flex items-center gap-1.5">
              <Home size={16} className="text-[#145CFF]" />
              <span className="text-xl font-black text-[#0F172A] truncate">
                {selectedProperty ? "Not Connected" : selectedMarket ? `${leads.length} leads` : "Pending"}
              </span>
            </div>
            <span className="text-[9.5px] text-slate-400 italic block truncate">
              {selectedProperty ? "Imagery provider offline" : selectedMarket ? "Aggregated search area" : "Unavailable"}
            </span>
          </div>

          {/* KPI 5: Contact Readiness */}
          <div className="bg-white border border-[#E5E7EB] rounded-xl p-4 shadow-sm space-y-1">
            <span className="text-[9px] font-black text-[#64748B] uppercase tracking-wider block">Contact Readiness</span>
            <div className="flex items-center gap-1.5">
              <User size={16} className="text-[#0E8F6E]" />
              <span className="text-xl font-black text-[#0F172A]">
                {selectedProperty ? (isHomeownerUnlocked ? "High" : "Gated") : "Unavailable"}
              </span>
            </div>
            <span className="text-[9.5px] text-[#0E8F6E] font-bold block truncate">
              {selectedProperty ? (isHomeownerUnlocked ? "Contact unlocked" : "Click card to unlock") : "No active property"}
            </span>
          </div>
        </div>

        {/* Four Primary Detail Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* CARD 1: Property / Address Summary */}
          <div className="bg-white border border-[#E5E7EB] rounded-xl p-5 shadow-sm space-y-4">
            <div className="border-b border-[#E5E7EB] pb-2 flex items-center justify-between">
              <h3 className="font-extrabold text-xs uppercase tracking-wider text-[#0F172A] flex items-center gap-1.5">
                <Home size={14} className="text-[#145CFF]" />
                Property / Address Summary
              </h3>
              <span className="text-[9px] font-bold text-[#64748B] uppercase bg-slate-100 px-1.5 py-0.5 rounded">
                Section 1
              </span>
            </div>

            {selectedProperty ? (
              <div className="space-y-3">
                {/* Image Placeholder */}
                <div className="w-full h-32 bg-slate-200 rounded-lg flex items-center justify-center text-[#64748B] text-xs font-bold border border-slate-300 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-tr from-slate-200 via-slate-100 to-slate-200"></div>
                  <span className="z-10 flex items-center gap-1.5">
                    <Map size={14} /> Property Imagery Preview Unavailable
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="text-[8px] font-black uppercase tracking-widest text-[#64748B] block">Full Address</span>
                    <span className="font-semibold text-[#0F172A]">{selectedProperty.fullAddress}</span>
                  </div>
                  <div>
                    <span className="text-[8px] font-black uppercase tracking-widest text-[#64748B] block">County</span>
                    <span className="font-semibold text-[#0F172A]">{selectedProperty.county || "Not resolved"}</span>
                  </div>
                  <div>
                    <span className="text-[8px] font-black uppercase tracking-widest text-[#64748B] block">Coordinates</span>
                    <span className="font-semibold text-[#0F172A] font-mono">
                      {selectedProperty.latitude.toFixed(5)}, {selectedProperty.longitude.toFixed(5)}
                    </span>
                  </div>
                  <div>
                    <span className="text-[8px] font-black uppercase tracking-widest text-[#64748B] block">Property Type</span>
                    <span className="text-slate-400 italic">Not Connected</span>
                  </div>
                  <div>
                    <span className="text-[8px] font-black uppercase tracking-widest text-[#64748B] block">Year Built</span>
                    <span className="text-slate-400 italic">Not Connected</span>
                  </div>
                  <div>
                    <span className="text-[8px] font-black uppercase tracking-widest text-[#64748B] block">Estimated Value</span>
                    <span className="text-slate-400 italic">Not Connected</span>
                  </div>
                </div>
              </div>
            ) : selectedMarket ? (
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="text-[8px] font-black uppercase tracking-widest text-[#64748B] block">Target State</span>
                    <span className="font-semibold text-[#0F172A]">{selectedMarket.stateCode}</span>
                  </div>
                  <div>
                    <span className="text-[8px] font-black uppercase tracking-widest text-[#64748B] block">Selected Counties</span>
                    <span className="font-semibold text-[#0F172A] truncate block">
                      {selectedMarket.counties.map(c => c.countyName).join(", ")}
                    </span>
                  </div>
                  <div>
                    <span className="text-[8px] font-black uppercase tracking-widest text-[#64748B] block">Radius Range</span>
                    <span className="font-semibold text-[#0F172A]">{selectedMarket.radiusMiles} miles</span>
                  </div>
                  <div>
                    <span className="text-[8px] font-black uppercase tracking-widest text-[#64748B] block">Storm Reports Found</span>
                    <span className="font-semibold text-[#0F172A]">{targetMetrics.reportsCount} reports</span>
                  </div>
                  <div>
                    <span className="text-[8px] font-black uppercase tracking-widest text-[#64748B] block">Affected Properties</span>
                    <span className="font-semibold text-[#0F172A]">{leads.length} records</span>
                  </div>
                  <div>
                    <span className="text-[8px] font-black uppercase tracking-widest text-[#64748B] block">Address Records</span>
                    <span className="font-semibold text-[#0F172A]">{leads.length} available</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-12 text-[#64748B] text-xs italic">
                No active property or market target selected.
              </div>
            )}
          </div>

          {/* CARD 2: Homeowner Contact Information */}
          <div className="bg-white border border-[#E5E7EB] rounded-xl p-5 shadow-sm space-y-4">
            <div className="border-b border-[#E5E7EB] pb-2 flex items-center justify-between">
              <h3 className="font-extrabold text-xs uppercase tracking-wider text-[#0F172A] flex items-center gap-1.5">
                <User size={14} className="text-[#0E8F6E]" />
                Homeowner Contact Information
              </h3>
              <span className="text-[9px] font-bold text-[#64748B] uppercase bg-slate-100 px-1.5 py-0.5 rounded">
                Section 2
              </span>
            </div>

            {selectedProperty ? (
              isHomeownerUnlocked ? (
                <div className="grid grid-cols-2 gap-3 text-xs animate-in fade-in duration-300">
                  <div>
                    <span className="text-[8px] font-black uppercase tracking-widest text-[#64748B] block">Owner Name</span>
                    <span className="font-bold text-[#0F172A]">Unlocked</span>
                  </div>
                  <div>
                    <span className="text-[8px] font-black uppercase tracking-widest text-[#64748B] block">Co-Owner Name</span>
                    <span className="text-slate-400 italic">Not Available</span>
                  </div>
                  <div>
                    <span className="text-[8px] font-black uppercase tracking-widest text-[#64748B] block">Phone Number</span>
                    <span className="font-bold text-[#0F172A]">Unlocked</span>
                  </div>
                  <div>
                    <span className="text-[8px] font-black uppercase tracking-widest text-[#64748B] block">Email Address</span>
                    <span className="font-bold text-[#0F172A]">Unlocked</span>
                  </div>
                  <div>
                    <span className="text-[8px] font-black uppercase tracking-widest text-[#64748B] block">Lead Status</span>
                    <span className="font-semibold text-[#0E8F6E]">New</span>
                  </div>
                  <div>
                    <span className="text-[8px] font-black uppercase tracking-widest text-[#64748B] block">Assigned Representative</span>
                    <span className="text-slate-400 italic">Unassigned</span>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center text-center py-6 space-y-3">
                  <div className="w-10 h-10 rounded-full bg-[#145CFF]/10 flex items-center justify-center text-[#145CFF]">
                    <Lock size={16} />
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-extrabold text-xs text-[#0F172A]">Homeowner Contact Information Gated</h4>
                    <p className="text-[10px] text-[#64748B] max-w-xs leading-normal">
                      Homeowner contact data is available after selecting a property and requesting contact information.
                    </p>
                  </div>
                  <button
                    onClick={handleUnlockHomeownerData}
                    className="flex items-center gap-1.5 px-4 py-2 bg-[#145CFF] hover:bg-[#2570FF] text-white text-[10px] font-black uppercase tracking-wider rounded-lg shadow-sm border-none cursor-pointer"
                  >
                    <span>Get Homeowner Contact Info</span>
                    <ArrowRight size={12} />
                  </button>
                </div>
              )
            ) : (
              <div className="text-center py-12 text-[#64748B] text-xs italic">
                Select an individual property from the list or map to request contact data.
              </div>
            )}
          </div>

          {/* CARD 3: Storm Information / Storm Intelligence */}
          <div className="bg-white border border-[#E5E7EB] rounded-xl p-5 shadow-sm space-y-4">
            <div className="border-b border-[#E5E7EB] pb-2 flex items-center justify-between">
              <h3 className="font-extrabold text-xs uppercase tracking-wider text-[#0F172A] flex items-center gap-1.5">
                <Zap size={14} className="text-[#145CFF]" />
                Storm Proximity & Intelligence
              </h3>
              <span className="text-[9px] font-bold text-[#64748B] uppercase bg-slate-100 px-1.5 py-0.5 rounded">
                Section 3
              </span>
            </div>

            {(selectedProperty || selectedMarket) && targetMetrics.reportsCount > 0 ? (
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="text-[8px] font-black uppercase tracking-widest text-[#64748B] block">Event Type</span>
                    <span className="font-bold text-[#0F172A] uppercase">
                      {targetMetrics.representativeReport?.type || "Severe Weather"}
                    </span>
                  </div>
                  <div>
                    <span className="text-[8px] font-black uppercase tracking-widest text-[#64748B] block">Event Date</span>
                    <span className="font-semibold text-[#0F172A]">
                      {targetMetrics.representativeReport?.eventDate === "today" ? "Today" : "Yesterday"}
                    </span>
                  </div>
                  <div>
                    <span className="text-[8px] font-black uppercase tracking-widest text-[#64748B] block">Max Hail Size</span>
                    <span className="font-semibold text-[#0F172A]">{targetMetrics.maxHail}</span>
                  </div>
                  <div>
                    <span className="text-[8px] font-black uppercase tracking-widest text-[#64748B] block">Peak Wind Gust</span>
                    <span className="font-semibold text-[#0F172A]">{targetMetrics.peakWind}</span>
                  </div>
                  <div>
                    <span className="text-[8px] font-black uppercase tracking-widest text-[#64748B] block">Data Source</span>
                    <span className="font-semibold text-[#0F172A]">NOAA SPC Feed</span>
                  </div>
                  <div>
                    <span className="text-[8px] font-black uppercase tracking-widest text-[#64748B] block">Impact Threat</span>
                    <span className="font-semibold text-[#145CFF]">{targetMetrics.primaryThreat}</span>
                  </div>
                </div>

                {/* Radar/Impact Placeholder */}
                <div className="h-24 bg-slate-100 rounded-lg border border-slate-200 flex items-center justify-center text-[#64748B] text-[10px] font-bold relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-tr from-blue-50 via-slate-100 to-indigo-50"></div>
                  <span className="z-10 flex items-center gap-1.5">
                    <Compass size={14} className="animate-spin text-[#145CFF] [animation-duration:8s]" /> 
                    Storm impact preview unavailable
                  </span>
                </div>
              </div>
            ) : (
              <div className="text-center py-12 text-[#64748B] text-xs italic">
                {selectedProperty || selectedMarket 
                  ? "No storm activity detected inside the search boundaries." 
                  : "Select a county or property to retrieve storm parameters."}
              </div>
            )}
          </div>

          {/* CARD 4: Roof Information */}
          <div className="bg-white border border-[#E5E7EB] rounded-xl p-5 shadow-sm space-y-4">
            <div className="border-b border-[#E5E7EB] pb-2 flex items-center justify-between">
              <h3 className="font-extrabold text-xs uppercase tracking-wider text-[#0F172A] flex items-center gap-1.5">
                <Shield size={14} className="text-[#145CFF]" />
                Roof Information
              </h3>
              <span className="text-[9px] font-bold text-[#64748B] uppercase bg-slate-100 px-1.5 py-0.5 rounded">
                Section 4
              </span>
            </div>

            {selectedProperty ? (
              isRoofConnected ? (
                <div className="grid grid-cols-2 gap-3 text-xs animate-in fade-in duration-300">
                  <div>
                    <span className="text-[8px] font-black uppercase tracking-widest text-[#64748B] block">Roof Type</span>
                    <span className="text-slate-400 italic">Not Connected</span>
                  </div>
                  <div>
                    <span className="text-[8px] font-black uppercase tracking-widest text-[#64748B] block">Roof Material</span>
                    <span className="text-slate-400 italic">Not Connected</span>
                  </div>
                  <div>
                    <span className="text-[8px] font-black uppercase tracking-widest text-[#64748B] block">Roof Age</span>
                    <span className="text-slate-400 italic">Not Connected</span>
                  </div>
                  <div>
                    <span className="text-[8px] font-black uppercase tracking-widest text-[#64748B] block">Roof Area</span>
                    <span className="text-slate-400 italic">Not Connected</span>
                  </div>
                  <div>
                    <span className="text-[8px] font-black uppercase tracking-widest text-[#64748B] block">Detached Garage</span>
                    <span className="text-slate-400 italic">Not Connected</span>
                  </div>
                  <div>
                    <span className="text-[8px] font-black uppercase tracking-widest text-[#64748B] block">Overall Condition</span>
                    <span className="text-slate-400 italic">Not Connected</span>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center text-center py-6 space-y-3">
                  <div className="w-10 h-10 rounded-full bg-[#145CFF]/10 flex items-center justify-center text-[#145CFF]">
                    <Shield size={16} />
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-extrabold text-xs text-[#0F172A]">Roof Intelligence Provider Not Connected</h4>
                    <p className="text-[10px] text-[#64748B] max-w-xs leading-normal">
                      Roof structure, materials, age, and geometry datasets require a connected roof intelligence provider.
                    </p>
                  </div>
                  <button
                    onClick={handleConnectRoof}
                    className="flex items-center gap-1.5 px-4 py-2 bg-[#145CFF] hover:bg-[#2570FF] text-white text-[10px] font-black uppercase tracking-wider rounded-lg shadow-sm border-none cursor-pointer"
                  >
                    <span>Request Roof / Property Data</span>
                    <ArrowRight size={12} />
                  </button>
                </div>
              )
            ) : (
              <div className="text-center py-12 text-[#64748B] text-xs italic">
                Select an individual property from the list or map to request roof details.
              </div>
            )}
          </div>
        </div>

        {/* Three Product Opportunity Cards */}
        {selectedMarket && (
          <div className="space-y-4 pt-4 border-t border-[#E5E7EB]">
            <div className="flex items-center gap-2">
              <Sparkles size={16} className="text-[#145CFF]" />
              <h3 className="font-extrabold text-sm text-[#0F172A] uppercase tracking-wider">
                Select Your Outreach Solution
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Product 1: StormTarget Live */}
              <div className="bg-white border border-[#E5E7EB] hover:border-[#145CFF]/30 transition-all rounded-xl p-5 shadow-sm flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black text-[#145CFF] bg-[#145CFF]/5 border border-[#145CFF]/10 px-2 py-0.5 rounded uppercase">
                      Option 1
                    </span>
                    <span className="text-[10px] font-black text-[#0F172A]">$249/mo</span>
                  </div>
                  <h4 className="font-black text-sm text-[#0F172A]">StormTarget Live</h4>
                  <p className="text-[11px] text-[#475569] leading-relaxed">
                    Purchase access to the full live storm intelligence system. Identify storm strikes in your specific markets, generate property address lists, and request homeowner contact information in real time.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => handleOpenDrawer("STORMTARGET_LIVE")}
                  className="w-full py-2 bg-[#145CFF] hover:bg-[#2570FF] text-white text-xs font-black uppercase tracking-wider rounded-lg shadow-sm border-none transition-all cursor-pointer text-center"
                >
                  Purchase StormTarget Live
                </button>
              </div>

              {/* Product 2: Hail Strike Report */}
              <div className="bg-white border border-[#E5E7EB] hover:border-[#145CFF]/30 transition-all rounded-xl p-5 shadow-sm flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black text-[#145CFF] bg-[#145CFF]/5 border border-[#145CFF]/10 px-2 py-0.5 rounded uppercase">
                      Option 2
                    </span>
                    <span className="text-[10px] font-black text-[#0F172A]">Custom Proposal</span>
                  </div>
                  <h4 className="font-black text-sm text-[#0F172A]">Hail Strike Report</h4>
                  <p className="text-[11px] text-[#475569] leading-relaxed">
                    Get a targeted report of homeowner names, property addresses, and available contact data within your selected county radius. Select package volume before ordering.
                  </p>
                </div>
                
                <div className="space-y-2">
                  <button
                    type="button"
                    onClick={() => handleOpenDrawer("HAIL_STRIKE_REPORT")}
                    className="w-full py-2 bg-[#145CFF] hover:bg-[#2570FF] text-white text-xs font-black uppercase tracking-wider rounded-lg shadow-sm border-none transition-all cursor-pointer text-center"
                  >
                    Purchase Hail Strike Report
                  </button>
                </div>
              </div>

              {/* Product 3: Homeowner Appointments */}
              <div className="bg-white border border-[#E5E7EB] hover:border-[#0E8F6E]/30 transition-all rounded-xl p-5 shadow-sm flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black text-[#0E8F6E] bg-[#0E8F6E]/5 border border-[#0E8F6E]/10 px-2 py-0.5 rounded uppercase">
                      Option 3
                    </span>
                    <span className="text-[10px] font-black text-[#0E8F6E]">Pay-per-Lead</span>
                  </div>
                  <h4 className="font-black text-sm text-[#0F172A]">Homeowner Appointments</h4>
                  <p className="text-[11px] text-[#475569] leading-relaxed">
                    We use the same storm intelligence data to set up exclusive, guaranteed roof inspection appointments for your team. Ready to pitch.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => handleOpenDrawer("HOMEOWNER_APPOINTMENTS")}
                  className="w-full py-2 bg-[#0E8F6E] hover:bg-[#0c7a5e] text-white text-xs font-black uppercase tracking-wider rounded-lg shadow-sm border-none transition-all cursor-pointer text-center"
                >
                  Request Appointment Package
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Bottom Panel: Property Overview & Storm Impact Map Preview */}
        <div className="bg-white border border-[#E5E7EB] rounded-xl p-5 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-[#E5E7EB] pb-2">
            <h3 className="font-extrabold text-xs uppercase tracking-wider text-[#0F172A] flex items-center gap-1.5">
              <Map size={14} className="text-[#145CFF]" />
              Property Overview & Storm Impact
            </h3>
            <button
              onClick={onOpenLiveStormMap}
              className="text-[10px] text-[#145CFF] hover:text-[#2570FF] font-black uppercase tracking-wider cursor-pointer"
            >
              Open Live Storm Map
            </button>
          </div>

          <div className="h-64 bg-slate-100 border border-slate-200 rounded-lg overflow-hidden flex flex-col items-center justify-center text-center relative select-none">
            {/* Impact overlay gradient pattern */}
            <div className="absolute inset-0 bg-gradient-to-tr from-slate-200 via-slate-100 to-slate-200"></div>
            
            {selectedProperty ? (
              <div className="z-10 space-y-2">
                <div className="text-[#145CFF] flex justify-center">
                  <MapPin size={28} className="animate-bounce" />
                </div>
                <h4 className="font-extrabold text-xs text-[#0F172A]">Property Satellite Map Preview Unavailable</h4>
                <p className="text-[10px] text-[#64748B] max-w-xs leading-normal">
                  No spatial image feed connected. Open the <strong>Live Storms</strong> page to interact with the radar map overlay.
                </p>
              </div>
            ) : selectedMarket ? (
              <div className="z-10 space-y-2.5">
                <div className="text-[#145CFF] flex justify-center">
                  <TrendingUp size={28} className="animate-pulse" />
                </div>
                <h4 className="font-extrabold text-xs text-[#0F172A] uppercase tracking-wide">
                  Market Opportunity Bounds Preview
                </h4>
                <div className="text-[10px] text-[#64748B] max-w-sm leading-normal space-y-1">
                  <p>State: <strong>{selectedMarket.stateCode}</strong></p>
                  <p>Radius Search: <strong>{selectedMarket.radiusMiles} mi</strong> around selected counties</p>
                  <p>Reports Inside Radius: <strong>{targetMetrics.reportsCount}</strong></p>
                </div>
              </div>
            ) : (
              <div className="z-10 text-slate-400 italic text-xs">
                No active property or market target. Configure in selectors to build map preview.
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Right-side Storm History Timeline Panel */}
      <div className="w-full md:w-80 border-t md:border-t-0 md:border-l border-[#E5E7EB] bg-white p-5 flex flex-col justify-between shrink-0">
        <div className="space-y-4">
          <div className="border-b border-[#E5E7EB] pb-2 flex items-center justify-between">
            <div className="space-y-0.5">
              <h3 className="font-extrabold text-xs uppercase tracking-wider text-[#0F172A]">
                Recent Storm Events
              </h3>
              <span className="text-[9px] text-[#64748B] font-semibold block">Last 12-36 months</span>
            </div>
            <span className="text-[9px] font-bold text-[#64748B] uppercase bg-slate-100 px-1.5 py-0.5 rounded">
              Timeline
            </span>
          </div>

          {(selectedProperty || selectedMarket) && targetMetrics.reportsCount > 0 ? (
            isHistoryConnected ? (
              <div className="space-y-3 max-h-[400px] overflow-y-auto pr-1 custom-scrollbar text-xs">
                {targetMetrics.allLocalReports.slice(0, 10).map((r, idx) => (
                  <div key={idx} className="p-2.5 bg-[#F8FAFC] border border-[#E5E7EB] rounded-lg space-y-1 animate-in fade-in duration-200">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-[#0F172A] uppercase">{r.type}</span>
                      <span className="text-[8.5px] font-mono text-[#64748B]">{r.timeRaw}</span>
                    </div>
                    <p className="text-[9px] text-[#475569] leading-snug truncate">{r.location}</p>
                    <div className="flex items-center justify-between pt-1">
                      <span className="text-[9px] font-black text-[#145CFF]">
                        {r.magnitude ? `${r.magnitude} ${r.type === 'hail' ? 'in' : r.type === 'wind' ? 'mph' : ''}` : 'N/A'}
                      </span>
                      <span className="bg-[#145CFF]/5 text-[#145CFF] text-[8px] font-bold px-1 py-0.2 border border-[#145CFF]/10 rounded">
                        Verified
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center text-center py-10 space-y-3">
                <div className="w-9 h-9 rounded-full bg-[#145CFF]/10 flex items-center justify-center text-[#145CFF]">
                  <AlertCircle size={15} />
                </div>
                <div className="space-y-0.5">
                  <h4 className="font-extrabold text-xs text-[#0F172A]">Full History Gated</h4>
                  <p className="text-[10px] text-[#64748B] leading-relaxed max-w-[200px] mx-auto">
                    Historical storm history is not fully connected yet. Current view uses available live/recent storm reports.
                  </p>
                </div>
                <button
                  onClick={handleConnectHistory}
                  className="px-3.5 py-1.5 bg-[#145CFF] hover:bg-[#2570FF] text-white text-[9.5px] font-black uppercase tracking-wider rounded-lg shadow-sm border-none cursor-pointer"
                >
                  View Full Storm History
                </button>
              </div>
            )
          ) : (
            <div className="text-center py-12 text-[#64748B] text-xs italic">
              No recent storm reports detected in this target area.
            </div>
          )}
        </div>

        <div className="border-t border-slate-100 pt-4 mt-4 bg-white space-y-1">
          <div className="p-2.5 bg-[#F8FAFC] border border-[#E5E7EB] rounded-lg text-[10px] text-[#475569] leading-relaxed flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-[#0E8F6E] animate-ping"></div>
            <span>Feeds active: Doppler radar online.</span>
          </div>
        </div>
      </div>

      {/* Purchase Request Drawer portal mount */}
      <StormTargetPurchaseDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        productType={drawerProduct}
        contextLabel={contextLabelForDrawer}
        recordQuantity={drawerQuantity}
      />
    </div>
  );
}
export default StormTargetDashboard;
