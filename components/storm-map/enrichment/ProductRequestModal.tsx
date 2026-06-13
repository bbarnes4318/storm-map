"use client";

import React from "react";
import { X, CalendarDays, PhoneCall, FileText, Check, AlertTriangle, Sparkles, MapPin, Target } from "lucide-react";
import { ProductType, StormAreaContextData, PropertyContextData } from "./StormProductActionPanel";
import { collectRadiusLeads } from "./enrichment-client";

interface ProductRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  productType: ProductType;
  contextType: "storm-area" | "property";
  contextData: any;
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
  const [isLoading, setIsLoading] = React.useState(false);
  const [statusMsg, setStatusMsg] = React.useState<{ type: "success" | "error" | "info"; text: string } | null>(null);

  // Clear stale errors when modal opens or product changes
  React.useEffect(() => {
    if (isOpen) {
      setStatusMsg(null);
      setIsLoading(false);
    }
  }, [isOpen, productType]);

  if (!isOpen) return null;

  const getProductTitle = () => {
    switch (productType) {
      case "STORM_REPORT_ADDRESSES":
        return "Detailed Storm Report + Addresses";
      case "STORM_REPORT_CONTACT":
        return "Detailed Storm Report + Addresses + Full Homeowner Contact Information";
      case "ROOF_INSPECTION_APPOINTMENTS":
        return "Exclusive Roof Inspection Appointments";
    }
  };

  const getProductIcon = (colorClass = "") => {
    switch (productType) {
      case "STORM_REPORT_ADDRESSES":
        return <FileText className={colorClass || "text-blue-400"} size={16} />;
      case "STORM_REPORT_CONTACT":
        return <PhoneCall className={colorClass || "text-violet-400"} size={16} />;
      case "ROOF_INSPECTION_APPOINTMENTS":
        return <CalendarDays className={colorClass || "text-red-500"} size={16} />;
    }
  };



  const handleAction = async () => {
    setStatusMsg(null);
    setIsLoading(true);

    try {
      if (productType === "STORM_REPORT_ADDRESSES") {
        if (contextType === "storm-area") {
          const area = contextData as StormAreaContextData;
          // Trigger the API endpoint to fetch properties within radius
          const res = await collectRadiusLeads(
            area.center[0], area.center[1], area.radius, "area-opt",
            { county: area.county, state: area.state }
          );
          if (res.leads && res.leads.length > 0) {
            if (onAddLeads) {
              onAddLeads(res.leads);
            }
            setStatusMsg({
              type: "success",
              text: `Successfully generated and added ${res.leads.length} properties inside the ${area.radius} mi storm opportunity area to your Saved Properties.`
            });
          } else {
            setStatusMsg({
              type: "info",
              text: "No available properties found for this storm area radius."
            });
          }
        } else {
          // Property context
          setStatusMsg({
            type: "error",
            text: "Address list generation is best suited for a storm area. Click a storm opportunity to generate addresses."
          });
        }
      } else if (productType === "STORM_REPORT_CONTACT") {
        if (contextType === "property") {
          // Trigger the original quote/unlock flow inside Sidebar/LeadIntelligencePanel
          if (onTriggerEnrichmentFlow) {
            onTriggerEnrichmentFlow();
            onClose();
          }
        } else {
          // Storm area context - bulk contact enrichment not configured yet
          setStatusMsg({
            type: "error",
            text: "Bulk property lead collection is not enabled yet. Connect a property/contact provider to gather homeowners in this radius."
          });
        }
      } else if (productType === "ROOF_INSPECTION_APPOINTMENTS") {
        // Appointment workflow is not active yet
        setStatusMsg({
          type: "error",
          text: "Appointment requests are not active yet. This option will allow contractors to request confirmed in-person inspection appointments for the selected storm area."
        });
      }
    } catch (err: any) {
      console.error(err);
      const errCode = err.code || "";
      const errStatus = err.status || 0;

      // Feature-level disabled
      if (errCode === "FEATURE_DISABLED" || errStatus === 503) {
        setStatusMsg({
          type: "error",
          text: "Lead intelligence is currently disabled on this server. The interface is ready, but homeowner/contact access is not active yet."
        });
      // Product-specific PROVIDER_NOT_CONFIGURED
      } else if (errCode === "PROVIDER_NOT_CONFIGURED") {
        if (productType === "STORM_REPORT_ADDRESSES") {
          setStatusMsg({
            type: "error",
            text: "Bulk property lead collection is not enabled yet. Connect a radius-capable property/address provider to gather properties in this storm area."
          });
        } else if (productType === "STORM_REPORT_CONTACT") {
          setStatusMsg({
            type: "error",
            text: "Homeowner contact provider is not configured yet. Add MELISSA_LICENSE_KEY to the server environment to enable contact data access."
          });
        } else if (productType === "ROOF_INSPECTION_APPOINTMENTS") {
          setStatusMsg({
            type: "error",
            text: "Appointment requests are not active yet. This option will allow contractors to request confirmed in-person roof inspection appointments for the selected storm area."
          });
        } else {
          setStatusMsg({
            type: "error",
            text: "The required service provider is not configured yet."
          });
        }
      // Provider returned no data match
      } else if (errCode === "PROVIDER_NO_MATCH") {
        setStatusMsg({
          type: "info",
          text: "No homeowner contact match was found for this property."
        });
      // Provider timeout
      } else if (errCode === "PROVIDER_TIMEOUT") {
        setStatusMsg({
          type: "error",
          text: "Unable to gather address records from the radius provider right now. Please try again."
        });
      // Provider upstream error
      } else if (errCode === "PROVIDER_ERROR") {
        setStatusMsg({
          type: "error",
          text: "The address provider returned an error. Please try again."
        });
      // Authentication required
      } else if (errCode === "UNAUTHORIZED" || errStatus === 401) {
        setStatusMsg({
          type: "error",
          text: "Sign in to access this product."
        });
      // Generic fallback — only when no known error code matched
      } else {
        setStatusMsg({
          type: "error",
          text: "Unable to process this request right now. Please try again."
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const isActionDisabled = () => {
    if (productType === "ROOF_INSPECTION_APPOINTMENTS") return true;
    if (productType === "STORM_REPORT_CONTACT" && contextType === "storm-area") return true;
    if (productType === "STORM_REPORT_CONTACT" && contextType === "property" && !isEnrichmentEnabled) return true;
    return false;
  };

  const getDisabledTitle = () => {
    if (productType === "ROOF_INSPECTION_APPOINTMENTS") {
      return "Appointment Requests Not Active Yet";
    }
    if (productType === "STORM_REPORT_CONTACT" && contextType === "storm-area") {
      return "Homeowner Contact Provider Not Connected";
    }
    if (productType === "STORM_REPORT_CONTACT" && contextType === "property" && !isEnrichmentEnabled) {
      return "Lead Intelligence Disabled";
    }
    return "Service Not Available";
  };

  const getDisabledExplanation = () => {
    if (productType === "ROOF_INSPECTION_APPOINTMENTS") {
      return "Appointment requests are not active yet. This option will allow contractors to request confirmed in-person roof inspection appointments for the selected storm area.";
    }
    if (productType === "STORM_REPORT_CONTACT" && contextType === "storm-area") {
      return "Homeowner contact provider is not configured yet. Add MELISSA_LICENSE_KEY to the server environment to enable contact data access.";
    }
    if (productType === "STORM_REPORT_CONTACT" && contextType === "property" && !isEnrichmentEnabled) {
      return "Lead intelligence is currently disabled on this server. The interface is ready, but homeowner/contact access is not active yet.";
    }
    return null;
  };

  return (
    <div className="fixed inset-0 z-[2100] flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-md bg-[#090d16] border border-slate-900 rounded-xl shadow-2xl overflow-hidden flex flex-col animate-in zoom-in-95 duration-200 select-text"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-900 px-4 py-3 bg-slate-950/50">
          <div className="flex items-center gap-2">
            {getProductIcon("text-red-500 animate-pulse")}
            <h3 className="font-extrabold text-xs uppercase tracking-wider text-slate-250">
              Confirm Solution Request
            </h3>
          </div>
          <button
            onClick={onClose}
            type="button"
            className="p-1 rounded text-slate-500 hover:text-slate-200 hover:bg-slate-900 border border-transparent transition-colors cursor-pointer"
          >
            <X size={15} />
          </button>
        </div>

        {/* Body */}
        <div className="p-4 space-y-4 flex-1 overflow-y-auto custom-scrollbar text-[10.5px]">
          
          {/* Context Card */}
          <div className="p-3 bg-slate-900/35 border border-slate-850 rounded-lg space-y-2">
            <span className="text-[7.5px] font-black uppercase tracking-widest text-slate-500 block">
              Selected Target Context
            </span>
            {contextType === "storm-area" ? (
              <div className="flex items-start gap-2">
                <Target size={14} className="text-red-400 mt-0.5 shrink-0" />
                <div>
                  <h4 className="font-extrabold text-slate-200 uppercase">{contextData.label}</h4>
                  <p className="text-[9.5px] text-slate-400 mt-0.5">
                    Threat: <span className="capitalize text-slate-300 font-semibold">{contextData.primaryThreat}</span> · Score: <span className="text-slate-300 font-semibold">{contextData.score} pts</span> · Radius: <span className="text-slate-300 font-semibold">{contextData.radius} mi</span>
                  </p>
                </div>
              </div>
            ) : (
              <div className="flex items-start gap-2">
                <MapPin size={14} className="text-emerald-500 mt-0.5 shrink-0" />
                <div>
                  <h4 className="font-extrabold text-slate-200">{contextData.fullAddress}</h4>
                  <p className="text-[9.5px] text-slate-400 mt-0.5">
                    Confidence: <span className="capitalize text-slate-300 font-semibold">{contextData.confidence}</span> · Coordinates: <span className="text-slate-300 font-semibold">{contextData.latitude.toFixed(5)}, {contextData.longitude.toFixed(5)}</span>
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Product Details */}
          <div className="space-y-2">
            <span className="text-[7.5px] font-black uppercase tracking-widest text-slate-500 block">
              Outreach Service
            </span>
            <div className="p-3 border border-slate-900 bg-slate-950/20 rounded-lg space-y-2">
              <h4 className="font-extrabold text-slate-205 text-[11px] uppercase">
                {getProductTitle()}
              </h4>
              {productType === "ROOF_INSPECTION_APPOINTMENTS" && (
                <p className="text-[9px] text-red-400 font-black uppercase tracking-wide italic">
                  Raw data is optional. Booked inspections are the outcome.
                </p>
              )}
              
              <div className="border-t border-slate-900/60 pt-2 space-y-1">
                <span className="text-[7.5px] font-bold text-slate-500 uppercase block tracking-wider mb-1">Includes:</span>
                {productType === "STORM_REPORT_ADDRESSES" && (
                  <>
                    <div className="flex items-center gap-1.5 text-slate-400"><Check size={10} className="text-emerald-500" /> Storm event summary report</div>
                    <div className="flex items-center gap-1.5 text-slate-400"><Check size={10} className="text-emerald-500" /> Hail/wind report metrics</div>
                    <div className="flex items-center gap-1.5 text-slate-400"><Check size={10} className="text-emerald-500" /> Affected target area boundary details</div>
                    <div className="flex items-center gap-1.5 text-slate-400"><Check size={10} className="text-emerald-500" /> Property addresses inside radius</div>
                    <div className="flex items-center gap-1.5 text-slate-400"><Check size={10} className="text-emerald-500" /> CSV export-ready leads list</div>
                  </>
                )}
                {productType === "STORM_REPORT_CONTACT" && (
                  <>
                    <div className="flex items-center gap-1.5 text-slate-400"><Check size={10} className="text-emerald-500" /> Storm report & property addresses</div>
                    <div className="flex items-center gap-1.5 text-slate-400"><Check size={10} className="text-emerald-500" /> Homeowner first/last name</div>
                    <div className="flex items-center gap-1.5 text-slate-400"><Check size={10} className="text-emerald-500" /> Landline and mobile phone numbers (DNC checked)</div>
                    <div className="flex items-center gap-1.5 text-slate-400"><Check size={10} className="text-emerald-500" /> Homeowner email addresses</div>
                    <div className="flex items-center gap-1.5 text-slate-400"><Check size={10} className="text-emerald-500" /> Verified mailing addresses</div>
                  </>
                )}
                {productType === "ROOF_INSPECTION_APPOINTMENTS" && (
                  <>
                    <div className="flex items-center gap-1.5 text-slate-400"><Check size={10} className="text-red-500" /> Outbound homeowner target outreach campaign</div>
                    <div className="flex items-center gap-1.5 text-slate-400"><Check size={10} className="text-red-500" /> Interest qualification & storm damage screen</div>
                    <div className="flex items-center gap-1.5 text-slate-400"><Check size={10} className="text-red-500" /> Calendar scheduling of inspection appointments</div>
                    <div className="flex items-center gap-1.5 text-slate-400"><Check size={10} className="text-red-500" /> 100% Exclusive, confirmed in-person appointment</div>
                    <div className="flex items-center gap-1.5 text-slate-400"><Check size={10} className="text-red-500" /> Route-ready appointment detail coordinates</div>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Status / Disabled Explanations */}
          {isActionDisabled() && (
            <div className="p-3 bg-red-950/15 border border-red-500/20 rounded-lg text-red-400 flex items-start gap-2 leading-relaxed">
              <AlertTriangle size={14} className="shrink-0 mt-0.5 text-red-500" />
              <div>
                <strong className="block font-bold">{getDisabledTitle()}</strong>
                {getDisabledExplanation()}
              </div>
            </div>
          )}

          {/* Toast / Status Message */}
          {/* Show statusMsg ONLY when the disabled banner is NOT already showing — prevents duplicate stacking */}
          {!isActionDisabled() && statusMsg && (
            <div className={`p-3 rounded-lg border flex items-start gap-2 leading-relaxed ${
              statusMsg.type === "success" ? "bg-emerald-950/15 border-emerald-500/20 text-emerald-400" :
              statusMsg.type === "error" ? "bg-red-950/15 border-red-500/20 text-red-400" :
              "bg-blue-950/15 border-blue-500/20 text-blue-400"
            }`}>
              {statusMsg.type === "error" ? (
                <AlertTriangle size={14} className="shrink-0 mt-0.5 text-red-500" />
              ) : statusMsg.type === "info" ? (
                <AlertTriangle size={14} className="shrink-0 mt-0.5 text-blue-400" />
              ) : (
                <Check size={14} className="shrink-0 mt-0.5 text-emerald-450" />
              )}
              <span>{statusMsg.text}</span>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="border-t border-slate-900 p-3 bg-slate-950/50 flex justify-end gap-2 text-[10px]">
          <button
            onClick={onClose}
            disabled={isLoading}
            className="px-3.5 py-2 rounded border border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-900 font-extrabold uppercase transition-all cursor-pointer"
          >
            Cancel
          </button>
          
          {!isActionDisabled() && (
            <button
              onClick={handleAction}
              disabled={isLoading}
              className="px-4 py-2 rounded bg-red-650 hover:bg-red-600 disabled:bg-slate-800 disabled:text-slate-500 text-white font-black uppercase tracking-wider transition-all active:scale-[0.98] cursor-pointer flex items-center justify-center gap-1 shadow-md"
            >
              {isLoading ? (
                <>
                  <span className="w-3.5 h-3.5 border-2 border-white/20 border-t-white rounded-full animate-spin"></span>
                  Processing...
                </>
              ) : productType === "STORM_REPORT_ADDRESSES" ? (
                "Generate Addresses"
              ) : productType === "STORM_REPORT_CONTACT" ? (
                "Get Contact Info"
              ) : (
                "Request Appointments"
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
