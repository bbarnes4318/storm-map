"use client";

import React from "react";
import { createPortal } from "react-dom";
import { 
  X, 
  CalendarDays, 
  PhoneCall, 
  FileText, 
  Check, 
  AlertTriangle, 
  MapPin, 
  Target, 
  ArrowRight, 
  FileDown 
} from "lucide-react";
import { ProductType, StormAreaContextData, PropertyContextData } from "./StormProductActionPanel";
import { collectRadiusLeads } from "./enrichment-client";

interface ProductRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  productType: ProductType | "ZIP_REPORT";
  contextType: "storm-area" | "property" | "standalone";
  contextData?: any;
  isEnrichmentEnabled: boolean;
  onAddLeads?: (leads: any[]) => void;
  onTriggerEnrichmentFlow?: () => void; // Trigger original quote/unlock flow if property contact info is chosen
}

export function ProductRequestModal({
  isOpen,
  onClose,
  productType,
  contextType,
  contextData,
  isEnrichmentEnabled,
  onAddLeads,
  onTriggerEnrichmentFlow,
}: ProductRequestModalProps) {
  const [isMounted, setIsMounted] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [statusMsg, setStatusMsg] = React.useState<{ type: "success" | "error" | "info"; text: string } | null>(null);
  const [collectedLeads, setCollectedLeads] = React.useState<any[]>([]);
  
  // Custom states for ZIP report mode
  const [zipOrArea, setZipOrArea] = React.useState("");
  const [notes, setNotes] = React.useState("");
  const [contactMethod, setContactMethod] = React.useState("");

  // Mount check to safe-guard SSR portals
  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  // Reset states on toggle or product change
  React.useEffect(() => {
    if (isOpen) {
      setStatusMsg(null);
      setIsLoading(false);
      setCollectedLeads([]);
      setZipOrArea("");
      setNotes("");
      setContactMethod("");
    }
  }, [isOpen, productType, contextType]);

  if (!isOpen || !isMounted) return null;

  const getProductTitle = () => {
    switch (productType) {
      case "STORM_REPORT_ADDRESSES":
        return "Storm Report + Address List";
      case "STORM_REPORT_CONTACT":
        return "Homeowner Contact Data";
      case "ROOF_INSPECTION_APPOINTMENTS":
        return "Inspection Appointments";
      case "ZIP_REPORT":
        return "Request Hail Strike Report";
    }
  };

  const getProductIcon = (colorClass = "") => {
    switch (productType) {
      case "STORM_REPORT_ADDRESSES":
        return <FileText className={colorClass || "text-[#145CFF]"} size={16} />;
      case "STORM_REPORT_CONTACT":
        return <PhoneCall className={colorClass || "text-[#145CFF]"} size={16} />;
      case "ROOF_INSPECTION_APPOINTMENTS":
        return <CalendarDays className={colorClass || "text-[#0E8F6E]"} size={16} />;
      case "ZIP_REPORT":
        return <FileText className={colorClass || "text-[#145CFF]"} size={16} />;
    }
  };

  // Switch to Property Leads tab inside Sidebar
  const handleSwitchToLeads = () => {
    if (onTriggerEnrichmentFlow) {
      onTriggerEnrichmentFlow();
    }
    onClose();
  };

  // Export collected radius leads to a browser-downloaded CSV file
  const handleExportCSV = () => {
    if (collectedLeads.length === 0) return;
    const headers = ["Address", "City", "State", "ZIP", "Latitude", "Longitude", "Confidence"];
    const rows = collectedLeads.map(l => [
      `"${l.fullAddress || ''}"`,
      `"${l.city || ''}"`,
      `"${l.state || ''}"`,
      `"${l.postcode || ''}"`,
      l.latitude || '',
      l.longitude || '',
      `"${l.confidence || 'unknown'}"`
    ]);
    const csvContent = [headers.join(","), ...rows.map(e => e.join(","))].join("\n");
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    const dateStr = new Date().toISOString().slice(0,10);
    link.setAttribute("download", `stormtarget_leads_${dateStr}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Perform backend radius property collection
  const handleAddressGeneration = async () => {
    setStatusMsg(null);
    setIsLoading(true);

    try {
      const area = contextData as StormAreaContextData;
      const res = await collectRadiusLeads(
        area.center[0], 
        area.center[1], 
        area.radius, 
        "area-opt",
        { county: area.county, state: area.state }
      );

      if (res.leads && res.leads.length > 0) {
        if (onAddLeads) {
          onAddLeads(res.leads);
        }
        setCollectedLeads(res.leads);
      } else {
        setStatusMsg({
          type: "info",
          text: "No available properties found for this storm area radius."
        });
      }
    } catch (err: any) {
      console.error("Radius leads query failed:", err);
      const errCode = err.code || "";
      const errStatus = err.status || 0;

      // Professional product-specific error messages
      if (errCode === "FEATURE_DISABLED" || errStatus === 503) {
        setStatusMsg({
          type: "error",
          text: "Lead intelligence is currently disabled on this server. The interface is ready, but homeowner/contact access is not active yet."
        });
      } else if (errCode === "PROVIDER_NOT_CONFIGURED") {
        setStatusMsg({
          type: "error",
          text: "Bulk property lead collection is not enabled yet. Connect a radius-capable property/address provider to gather properties in this storm area."
        });
      } else if (errCode === "PROVIDER_TIMEOUT") {
        setStatusMsg({
          type: "error",
          text: "Unable to gather address records from the radius provider right now. Please try again."
        });
      } else if (errCode === "PROVIDER_ERROR") {
        setStatusMsg({
          type: "error",
          text: "The address provider returned an error. Please try again."
        });
      } else if (errCode === "UNAUTHORIZED" || errStatus === 401) {
        setStatusMsg({
          type: "error",
          text: "Sign in to access this product."
        });
      } else {
        setStatusMsg({
          type: "error",
          text: "We encountered a temporary connection issue. Please retry your request."
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleContactAction = () => {
    // Preserve existing compliance, auth & unlock triggers in parent
    if (onTriggerEnrichmentFlow) {
      onTriggerEnrichmentFlow();
    }
    onClose();
  };

  // Render content depending on active product selected
  const renderDrawerBody = () => {
    // Standalone Hail Strike Report Request (ZIP_REPORT)
    if (productType === "ZIP_REPORT") {
      return (
        <div className="space-y-4 animate-in fade-in duration-200">
          <div className="p-4 bg-[#0B1220]/60 border border-[#145CFF]/15 rounded-lg space-y-3 shadow-md">
            <div className="flex items-center gap-2 text-[#F8FAFC]">
              <FileText size={18} className="text-[#145CFF]" />
              <h4 className="font-extrabold text-xs uppercase tracking-wider">Hail Strike Report Requests</h4>
            </div>
            <p className="text-[10px] text-slate-400 leading-relaxed">
              This option will allow contractors to request targeted hail-strike lead reports by ZIP code, neighborhood, or selected storm area.
            </p>
            <div className="p-2.5 bg-[#145CFF]/5 border border-[#145CFF]/10 rounded text-[9px] text-[#145CFF] font-extrabold tracking-wide uppercase italic">
              Lead reports are generated on demand.
            </div>
            <p className="text-[9.5px] text-slate-500 leading-relaxed pt-1 border-t border-slate-900">
              Our GIS desk compiles property records, homeowner registration directories, and historical radar overlays to deliver ready-to-use spreadsheet files.
            </p>
          </div>

          <div className="space-y-3 pt-2">
            <div className="space-y-1">
              <label className="text-[8px] font-black uppercase text-slate-500 tracking-wider">
                ZIP Code or Target Area
              </label>
              <input
                type="text"
                value={zipOrArea}
                onChange={(e) => setZipOrArea(e.target.value)}
                placeholder="e.g. 73072, Norman OK, or North Dallas"
                className="w-full bg-[#050B16]/60 border border-slate-800 rounded px-2.5 py-1.5 text-[10px] text-[#F8FAFC] focus:outline-none focus:border-[#145CFF] placeholder:text-slate-600"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[8px] font-black uppercase text-slate-500 tracking-wider">
                Notes / Target Market Details
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Describe specific criteria, minimum roof age, or target neighborhoods..."
                rows={3}
                className="w-full bg-[#050B16]/60 border border-slate-800 rounded px-2.5 py-1.5 text-[10px] text-[#F8FAFC] focus:outline-none focus:border-[#145CFF] resize-none placeholder:text-slate-600"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[8px] font-black uppercase text-slate-550 tracking-wider">
                Preferred Contact Method
              </label>
              <input
                type="text"
                value={contactMethod}
                onChange={(e) => setContactMethod(e.target.value)}
                placeholder="Email address or Phone number"
                className="w-full bg-[#050B16]/60 border border-slate-800 rounded px-2.5 py-1.5 text-[10px] text-[#F8FAFC] focus:outline-none focus:border-[#145CFF] placeholder:text-slate-600"
              />
            </div>
            <div className="p-3 bg-amber-500/5 border border-amber-500/10 rounded-lg text-[9px] text-amber-500/80 leading-relaxed">
              <strong>Notice:</strong> Standalone report requesting is currently in beta/waitlist mode. Submitting this form adds your request to our priority queue but will not perform a live charge or active data generation yet.
            </div>
          </div>
        </div>
      );
    }

    // 1. SUCCESS STATE (Currently only STORM_REPORT_ADDRESSES can succeed inline in this drawer)
    if (productType === "STORM_REPORT_ADDRESSES" && collectedLeads.length > 0) {
      return (
        <div className="space-y-5 animate-in fade-in duration-300">
          <div className="p-5 bg-[#0E8F6E]/5 border border-[#0E8F6E]/20 rounded-lg text-center space-y-3">
            <div className="mx-auto w-10 h-10 rounded-full bg-[#0E8F6E]/10 border border-[#0E8F6E]/30 flex items-center justify-center text-[#0E8F6E] animate-pulse">
              <Check size={20} />
            </div>
            <h3 className="font-extrabold text-[12px] text-[#F8FAFC] uppercase tracking-wide">
              Address List Generated
            </h3>
            <p className="text-[10px] text-slate-400 leading-relaxed">
              Successfully gathered and added <strong className="text-[#F8FAFC]">{collectedLeads.length}</strong> property addresses within the <strong className="text-[#F8FAFC]">{contextData.radius} mi</strong> storm target radius to your Property Leads.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 mt-4">
            <button
              type="button"
              onClick={handleSwitchToLeads}
              className="flex items-center justify-center gap-1.5 w-full text-center py-2 px-3.5 rounded bg-[#145CFF] hover:bg-[#1F5BFF] text-white text-[9.5px] font-black uppercase tracking-wider transition-all active:scale-[0.98] cursor-pointer shadow-md shadow-[#145CFF]/15 border-none"
            >
              View Property Leads
              <ArrowRight size={11} />
            </button>
            <button
              type="button"
              onClick={handleExportCSV}
              className="flex items-center justify-center gap-1.5 w-full text-center py-2 px-3.5 rounded bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-200 text-[9.5px] font-black uppercase tracking-wider transition-all active:scale-[0.98] cursor-pointer"
            >
              <FileDown size={11} />
              Export CSV
            </button>
          </div>
        </div>
      );
    }

    // 2. PRODUCT 3: APPOINTMENTS (Polished unavailable state)
    if (productType === "ROOF_INSPECTION_APPOINTMENTS") {
      return (
        <div className="space-y-4">
          <div className="p-4 bg-[#0B1220]/60 border border-[#145CFF]/15 rounded-lg space-y-3 shadow-md">
            <div className="flex items-center gap-2 text-[#F8FAFC]">
              <CalendarDays size={18} className="text-[#0E8F6E]" />
              <h4 className="font-extrabold text-xs uppercase tracking-wider">Appointment Requests Not Active Yet</h4>
            </div>
            <p className="text-[10px] text-slate-400 leading-relaxed">
              This option will allow contractors to request confirmed in-person roof inspection appointments for the selected storm area.
            </p>
            <div className="p-2.5 bg-[#0E8F6E]/5 border border-[#0E8F6E]/10 rounded text-[9px] text-[#0E8F6E] font-extrabold tracking-wide uppercase italic">
              Booked inspections are the outcome.
            </div>
            <p className="text-[9.5px] text-slate-500 leading-relaxed pt-1 border-t border-slate-900">
              Outreach, storm-damage pre-screening, and calendar scheduling will be fully managed by our agent desk to deliver exclusive, ready-to-run opportunities.
            </p>
          </div>
        </div>
      );
    }

    // 3. PRODUCT 2: CONTACT DATA
    if (productType === "STORM_REPORT_CONTACT") {
      // Blocked: running against storm-area (requires a selected property address first)
      if (contextType === "storm-area") {
        return (
          <div className="space-y-4">
            <div className="p-4 bg-[#0B1220]/60 border border-amber-500/20 rounded-lg space-y-3 shadow-md">
              <div className="flex items-center gap-2 text-[#F8FAFC]">
                <PhoneCall size={18} className="text-amber-500 animate-pulse" />
                <h4 className="font-extrabold text-xs uppercase tracking-wider text-amber-500">Select a Property First</h4>
              </div>
              <p className="text-[10px] text-slate-400 leading-relaxed">
                Choose a property from the map or Property Leads tab before requesting homeowner contact information.
              </p>
              <p className="text-[9.5px] text-slate-500 leading-relaxed border-t border-slate-900 pt-2">
                We do not support bulk or storm-wide radius contact retrieval to protect consumer privacy and maintain regulatory compliance. Select individual properties to request details.
              </p>
            </div>
          </div>
        );
      }

      // Actionable: property selected
      return (
        <div className="space-y-4 animate-in fade-in duration-200">
          <div className="p-3 bg-slate-900/30 border border-slate-850 rounded-lg space-y-2">
            <span className="text-[7.5px] font-black uppercase tracking-widest text-slate-500 block">
              Target Address
            </span>
            <div className="flex items-start gap-2">
              <MapPin size={14} className="text-[#0E8F6E] mt-0.5 shrink-0" />
              <div>
                <h4 className="font-extrabold text-[#F8FAFC] leading-snug">{contextData.fullAddress}</h4>
                {contextData.confidence && (
                  <p className="text-[9px] text-slate-400 mt-0.5 font-mono">
                    Confidence: <span className="uppercase font-bold text-slate-300">{contextData.confidence}</span>
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="p-4 bg-[#0B1220]/50 border border-slate-900 rounded-lg space-y-2.5">
            <span className="text-[7.5px] font-black uppercase tracking-widest text-[#145CFF] block">
              Contact Intelligence Includes
            </span>
            <div className="space-y-1.5 text-[9.5px] text-slate-400">
              <div className="flex items-center gap-2"><Check size={12} className="text-[#0E8F6E]" /> Homeowner first & last name</div>
              <div className="flex items-center gap-2"><Check size={12} className="text-[#0E8F6E]" /> DNC-checked phone numbers (landline/mobile)</div>
              <div className="flex items-center gap-2"><Check size={12} className="text-[#0E8F6E]" /> Active personal email addresses</div>
              <div className="flex items-center gap-2"><Check size={12} className="text-[#0E8F6E]" /> Stored, provider-normalized metadata</div>
            </div>
          </div>

          <div className="p-3 bg-[#145CFF]/5 border border-[#145CFF]/15 rounded-lg text-[9px] text-slate-450 leading-relaxed">
            Clicking below will initiate the secure authentication check, regulatory compliance attestation, credit check, and data retrieval flow.
          </div>
        </div>
      );
    }

    // 4. PRODUCT 1: ADDRESS LIST
    if (productType === "STORM_REPORT_ADDRESSES") {
      // Blocked: running against property (requires a storm opportunity area first)
      if (contextType === "property") {
        return (
          <div className="space-y-4">
            <div className="p-4 bg-[#0B1220]/60 border border-amber-500/20 rounded-lg space-y-3 shadow-md">
              <div className="flex items-center gap-2 text-[#F8FAFC]">
                <FileText size={18} className="text-amber-500" />
                <h4 className="font-extrabold text-xs uppercase tracking-wider text-amber-500">Storm Target Area Required</h4>
              </div>
              <p className="text-[10px] text-slate-400 leading-relaxed">
                Address list generation is best suited for a storm area. Click a storm opportunity circle on the map to generate matching addresses.
              </p>
            </div>
          </div>
        );
      }

      // Blocked: running standalone (requires a storm opportunity area selected)
      if (contextType === "standalone" || !contextData) {
        return (
          <div className="space-y-4">
            <div className="p-4 bg-[#0B1220]/60 border border-amber-500/20 rounded-lg space-y-3 shadow-md">
              <div className="flex items-center gap-2 text-[#F8FAFC]">
                <FileText size={18} className="text-amber-500" />
                <h4 className="font-extrabold text-xs uppercase tracking-wider text-amber-500">Select a Storm Opportunity First</h4>
              </div>
              <p className="text-[10px] text-slate-400 leading-relaxed">
                Choose a storm opportunity from the map or Opportunities tab before generating an address list.
              </p>
            </div>
          </div>
        );
      }

      // Actionable: storm-area selected
      return (
        <div className="space-y-4 animate-in fade-in duration-200">
          <div className="p-3 bg-[#001B46]/20 border border-[#145CFF]/15 rounded-lg space-y-2">
            <span className="text-[7.5px] font-black uppercase tracking-widest text-[#145CFF] block">
              Selected Storm Target Area
            </span>
            <div className="flex items-start gap-2">
              <Target size={14} className="text-red-500 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-extrabold text-[#F8FAFC] uppercase">{contextData.label}</h4>
                <p className="text-[9.5px] text-slate-450 mt-1 leading-snug">
                  Threat: <span className="text-slate-200 uppercase font-semibold">{contextData.primaryThreat}</span> · Score: <span className="text-slate-200 font-semibold">{contextData.score} pts</span>
                </p>
                <p className="text-[9.5px] text-slate-450 leading-snug">
                  Radius: <span className="text-slate-200 font-semibold">{contextData.radius} mi</span> · Storm Reports: <span className="text-slate-200 font-semibold">{contextData.reportsCount}</span>
                </p>
              </div>
            </div>
          </div>

          <div className="p-4 bg-[#0B1220]/50 border border-slate-900 rounded-lg space-y-2.5">
            <span className="text-[7.5px] font-black uppercase tracking-widest text-[#145CFF] block">
              Address List Generation Includes
            </span>
            <div className="space-y-1.5 text-[9.5px] text-slate-400">
              <div className="flex items-center gap-2"><Check size={12} className="text-[#0E8F6E]" /> Street addresses inside the affected boundary</div>
              <div className="flex items-center gap-2"><Check size={12} className="text-[#0E8F6E]" /> Storm reports and meteorological metrics</div>
              <div className="flex items-center gap-2"><Check size={12} className="text-[#0E8F6E]" /> Instant addition of leads to the Property Leads tab</div>
              <div className="flex items-center gap-2"><Check size={12} className="text-[#0E8F6E]" /> Ready-to-go CSV export downloads</div>
            </div>
          </div>

          {statusMsg && (
            <div className={`p-3 rounded-lg border text-[9.5px] flex items-start gap-2 leading-relaxed ${
              statusMsg.type === "success" ? "bg-emerald-950/15 border-emerald-500/20 text-[#0E8F6E]" :
              statusMsg.type === "error" ? "bg-red-950/15 border-red-500/20 text-red-400" :
              "bg-blue-950/15 border-blue-500/20 text-[#145CFF]"
            }`}>
              <AlertTriangle size={14} className="shrink-0 mt-0.5 text-current" />
              <span>{statusMsg.text}</span>
            </div>
          )}
        </div>
      );
    }
  };

  const isActionDisabled = () => {
    if (isLoading) return true;
    if (productType === "ROOF_INSPECTION_APPOINTMENTS") return true;
    if (productType === "ZIP_REPORT") return true;
    if (productType === "STORM_REPORT_CONTACT" && contextType === "storm-area") return true;
    if (productType === "STORM_REPORT_ADDRESSES" && (contextType === "property" || contextType === "standalone" || !contextData)) return true;
    return false;
  };

  const getActionBtnText = () => {
    if (isLoading) return "Processing...";
    if (productType === "STORM_REPORT_ADDRESSES") return "Generate Addresses";
    if (productType === "STORM_REPORT_CONTACT") return "Get Contact Info";
    return "Request Solution";
  };

  const handleActionClick = () => {
    if (productType === "STORM_REPORT_ADDRESSES") {
      handleAddressGeneration();
    } else if (productType === "STORM_REPORT_CONTACT") {
      handleContactAction();
    }
  };

  const showSubmitBtn = !isActionDisabled() && collectedLeads.length === 0;

  // React portal node to render outside clipped container hierarchy
  const portalNode = (
    <div className="fixed inset-0 z-[2099] flex justify-end">
      {/* Backdrop overlay */}
      <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm transition-opacity" onClick={onClose} />

      {/* Drawer slide-out panel */}
      <div 
        className="fixed bottom-0 md:top-0 md:bottom-auto right-0 h-[85vh] md:h-full w-full max-w-md bg-[#0B1220] border-t md:border-t-0 md:border-l border-slate-800 shadow-2xl flex flex-col z-[2200] rounded-t-2xl md:rounded-t-none animate-in slide-in-from-bottom md:slide-in-from-right duration-300 select-text"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-900 px-5 py-4 bg-[#061A2F]/90 backdrop-blur-md">
          <div className="flex items-center gap-2">
            {getProductIcon("text-[#145CFF]")}
            <h3 className="font-extrabold text-[12px] uppercase tracking-wider text-[#F8FAFC]">
              {getProductTitle()}
            </h3>
          </div>
          <button
            onClick={onClose}
            type="button"
            className="p-1.5 rounded-lg text-slate-500 hover:text-slate-200 hover:bg-slate-900 border border-transparent transition-colors cursor-pointer"
            aria-label="Close drawer"
          >
            <X size={16} />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="p-5 space-y-5 flex-1 overflow-y-auto custom-scrollbar text-[10px] text-slate-350">
          {renderDrawerBody()}
        </div>

        {/* Footer */}
        <div className="border-t border-slate-900 p-4 bg-slate-950/40 flex justify-end gap-3 text-[10px]">
          <button
            onClick={onClose}
            disabled={isLoading}
            className="px-4 py-2 rounded border border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-900 font-extrabold uppercase transition-all cursor-pointer"
          >
            {collectedLeads.length > 0 ? "Done" : "Cancel"}
          </button>
          
          {showSubmitBtn && (
            <button
              onClick={handleActionClick}
              disabled={isLoading}
              className="px-5 py-2 rounded bg-[#145CFF] hover:bg-[#1F5BFF] disabled:bg-slate-900 disabled:text-slate-600 disabled:border-slate-850 disabled:cursor-not-allowed border-none text-[#F8FAFC] font-black uppercase tracking-wider transition-all active:scale-[0.98] cursor-pointer flex items-center justify-center gap-1.5 shadow-md shadow-[#145CFF]/15"
            >
              {isLoading && (
                <span className="w-3.5 h-3.5 border-2 border-white/20 border-t-[#F8FAFC] rounded-full animate-spin"></span>
              )}
              {getActionBtnText()}
            </button>
          )}
        </div>
      </div>
    </div>
  );

  return createPortal(portalNode, document.body);
}

export default ProductRequestModal;
