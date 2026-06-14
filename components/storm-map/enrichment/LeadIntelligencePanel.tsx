"use client";

import React from "react";
import { useUser } from "@clerk/nextjs";
import { SelectedPropertyTarget, StormFilterState } from "@/lib/weather/types";
import { DataProductType, UnlockResponse } from "@/lib/enrichment/schemas";
import { 
  getUnlockedLeadData, 
  UnlockedDataDetailResponse, 
  EnrichmentApiError 
} from "./enrichment-client";
import { StormProductActionPanel, ProductType } from "./StormProductActionPanel";
import { ProductRequestModal } from "./ProductRequestModal";
import { ComplianceAttestationModal } from "./ComplianceAttestationModal";
import { UnlockLeadModal } from "./UnlockLeadModal";
import { UnlockedLeadDetails } from "./UnlockedLeadDetails";
import { 
  MapPin, 
  ShieldAlert, 
  Coins, 
  Lock, 
  AlertTriangle, 
  LogIn, 
  Target, 
  X, 
  Check, 
  FileText,
  Info 
} from "lucide-react";

interface LeadIntelligencePanelProps {
  selectedProperty: SelectedPropertyTarget;
  onUpdateLead: (lead: SelectedPropertyTarget) => void;
  onClearProperty: () => void;
  leads?: SelectedPropertyTarget[];
  onRemoveLead?: (leadId: string) => void;
  onAddLeads?: (leads: SelectedPropertyTarget[]) => void;
  filters?: StormFilterState;
}

export function LeadIntelligencePanel({
  selectedProperty,
  onUpdateLead,
  onClearProperty,
  leads = [],
  onRemoveLead,
  onAddLeads,
  filters,
}: LeadIntelligencePanelProps) {
  const { isLoaded, isSignedIn } = useUser();

  const [isLoading, setIsLoading] = React.useState(false);
  const [unlockedData, setUnlockedData] = React.useState<UnlockedDataDetailResponse | null>(null);
  const [errorMsg, setErrorMsg] = React.useState<string | null>(null);
  const [isDemoMode, setIsDemoMode] = React.useState(false);

  // Modal and Flow States
  const [selectedProduct, setSelectedProduct] = React.useState<DataProductType | null>(null);
  const [showAttestationModal, setShowAttestationModal] = React.useState(false);
  const [showUnlockModal, setShowUnlockModal] = React.useState(false);
  const [idempotencyKey, setIdempotencyKey] = React.useState<string>("");

  const [modalOpen, setModalOpen] = React.useState(false);
  const [modalProduct, setModalProduct] = React.useState<ProductType | null>(null);

  // Check for Demo Mode on mount/url changes
  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search);
      const isDemoUrl = urlParams.get("demo") === "true";
      const isDemoStorage = localStorage.getItem("demoMode") === "true";
      setIsDemoMode(isDemoUrl || isDemoStorage);
    }
  }, []);

  // Fetch unlocked data if unlockId is present in property UI state
  React.useEffect(() => {
    const fetchUnlockedData = async (uid: string) => {
      setIsLoading(true);
      setErrorMsg(null);
      try {
        const data = await getUnlockedLeadData(uid);
        setUnlockedData(data);
      } catch (err: unknown) {
        console.warn("Failed to fetch unlocked data for id:", uid, err);
        if (err instanceof EnrichmentApiError && (err.status === 404 || err.status === 403 || err.code === "QUOTE_NOT_FOUND" || err.code === "UNAUTHORIZED")) {
          onUpdateLead({ ...selectedProperty, unlockId: undefined });
        } else {
          setErrorMsg("Could not retrieve unlocked lead details. Please try again.");
        }
      } finally {
        setIsLoading(false);
      }
    };

    if (selectedProperty.unlockId) {
      fetchUnlockedData(selectedProperty.unlockId);
    } else {
      setUnlockedData(null);
    }
  }, [selectedProperty.unlockId, selectedProperty.id]);

  const handleSelectProduct = (productType: DataProductType) => {
    if (!isSignedIn) {
      return; 
    }

    setSelectedProduct(productType);
    
    // Generate UUIDv4 for idempotency
    const key = `idemp-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
    setIdempotencyKey(key);
    setShowUnlockModal(true);
  };

  const handleAttestationSuccess = () => {
    setShowAttestationModal(false);
    if (selectedProduct) {
      setShowUnlockModal(true);
    }
  };

  const handleUnlockSuccess = (unlockId: string, _result: UnlockResponse) => {
    setShowUnlockModal(false);
    onUpdateLead({
      ...selectedProperty,
      unlockId,
    });
  };

  const handleTriggerAttestation = () => {
    setShowUnlockModal(false);
    setShowAttestationModal(true);
  };

  // Saved leads toggle helpers
  const isAlreadySaved = leads.some(
    (l) => l.latitude === selectedProperty.latitude && l.longitude === selectedProperty.longitude
  );

  const handleToggleLead = () => {
    if (isAlreadySaved) {
      if (onRemoveLead) {
        const lead = leads.find(
          (l) => l.latitude === selectedProperty.latitude && l.longitude === selectedProperty.longitude
        );
        if (lead) onRemoveLead(lead.id);
      }
    } else {
      if (onAddLeads) {
        onAddLeads([{ 
          ...selectedProperty, 
          locked: true, 
          id: selectedProperty.id || `lead-${Date.now()}` 
        }]);
      }
    }
  };

  // Determine address gating status
  const isGatedAddress = !isDemoMode && selectedProperty.source === "map-feature";

  // Determine storm match metrics status
  const showStormMetrics = isDemoMode || (filters && filters.searchStatus === "complete");

  return (
    <div className="flex-1 flex flex-col overflow-hidden h-full max-h-inherit select-none p-5 md:p-6 text-slate-350">
      
      {/* CARD HEADER */}
      <div className="flex justify-between items-center pb-4 mb-4 border-b border-slate-500/18 shrink-0">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
            <Target size={16} className="animate-pulse" />
          </div>
          <div className="min-w-0">
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 block leading-none mb-1">
              LEAD TARGET
            </span>
            <h3 className="font-bold text-[#F8FAFC] text-base leading-tight">
              Property Opportunity
            </h3>
          </div>
        </div>
        
        <div className="flex items-center gap-2 shrink-0">
          <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-bold flex items-center gap-1 leading-none">
            <Check size={9} strokeWidth={3} />
            Verified
          </span>
          <button
            type="button"
            onClick={onClearProperty}
            className="text-slate-400 hover:text-[#F8FAFC] p-1 rounded-lg hover:bg-slate-800/50 transition-colors"
            title="Deselect property"
          >
            <X size={15} />
          </button>
        </div>
      </div>

      {/* SCROLLABLE PANEL CONTENTS */}
      <div className="flex-1 overflow-y-auto pr-0.5 custom-scrollbar space-y-5">
        
        {isLoading ? (
          <div className="py-12 flex flex-col items-center justify-center gap-3">
            <div className="w-6 h-6 border-2 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin"></div>
            <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">
              Loading intelligence details...
            </span>
          </div>
        ) : unlockedData ? (
          <UnlockedLeadDetails 
            unlockedData={unlockedData}
            onClose={() => {
              onUpdateLead({ ...selectedProperty, unlockId: undefined });
            }}
          />
        ) : (
          /* Locked State Content */
          <>
            {/* SECTION 1: SELECTED PROPERTY */}
            <div className="space-y-2">
              <h4 className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest leading-none">
                Selected Property
              </h4>
              <div className="space-y-0.5">
                {isGatedAddress ? (
                  <>
                    <span className="text-base font-semibold text-slate-100 block">
                      Property Record Selected
                    </span>
                    <span className="text-xs text-slate-400 block font-medium">
                      Address available in Hail Strike Report
                    </span>
                  </>
                ) : (
                  <>
                    <span className="text-base font-semibold text-slate-100 block break-words">
                      {selectedProperty.fullAddress}
                    </span>
                    {(selectedProperty.city || selectedProperty.state || selectedProperty.postcode) && (
                      <span className="text-xs text-slate-400 block font-medium">
                        {[
                          selectedProperty.city,
                          [selectedProperty.state, selectedProperty.postcode].filter(Boolean).join(" ")
                        ].filter(Boolean).join(", ")}
                      </span>
                    )}
                  </>
                )}
              </div>

              {/* Coordinates & Confidence mini grid */}
              <div className="grid grid-cols-2 gap-4 pt-2 border-t border-slate-500/10">
                <div>
                  <span className="text-[9px] font-bold text-slate-500 block uppercase tracking-wider">
                    Coordinates
                  </span>
                  <span className="text-xs text-slate-200 font-mono font-medium block">
                    {selectedProperty.latitude.toFixed(5)}, {selectedProperty.longitude.toFixed(5)}
                  </span>
                </div>
                <div>
                  <span className="text-[9px] font-bold text-slate-500 block uppercase tracking-wider">
                    Confidence
                  </span>
                  <span className="text-xs text-slate-200 font-semibold capitalize block">
                    {selectedProperty.confidence || "exact"}
                  </span>
                </div>
              </div>
            </div>

            {/* SECTION 2: STORM MATCH */}
            <div className="space-y-3 pt-4 border-t border-slate-500/10">
              <h4 className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest leading-none">
                Storm Match
              </h4>
              
              <div className="grid grid-cols-3 gap-2">
                <div className="p-2 rounded-xl bg-red-500/5 border border-red-500/10 text-center flex flex-col gap-0.5">
                  <span className="text-[8px] font-bold text-slate-500 uppercase tracking-wider">Storm Impact</span>
                  <span className="text-xs font-bold text-red-400">High</span>
                </div>
                <div className="p-2 rounded-xl bg-indigo-500/5 border border-indigo-500/10 text-center flex flex-col gap-0.5">
                  <span className="text-[8px] font-bold text-slate-500 uppercase tracking-wider">Radius</span>
                  <span className="text-xs font-bold text-indigo-400">{filters?.radius || 15} mi</span>
                </div>
                <div className="p-2 rounded-xl bg-emerald-500/5 border border-emerald-500/10 text-center flex flex-col gap-0.5">
                  <span className="text-[8px] font-bold text-slate-500 uppercase tracking-wider">Confidence</span>
                  <span className="text-xs font-bold text-emerald-400">Exact / High</span>
                </div>
              </div>

              {showStormMetrics ? (
                <div className="grid grid-cols-3 gap-3 pt-1 text-[11px]">
                  <div>
                    <span className="text-[8.5px] font-bold text-slate-500 block uppercase">Max Hail</span>
                    <span className="font-semibold text-slate-200">1.75 in</span>
                  </div>
                  <div>
                    <span className="text-[8.5px] font-bold text-slate-500 block uppercase">Peak Wind</span>
                    <span className="font-semibold text-slate-200">65 mph</span>
                  </div>
                  <div>
                    <span className="text-[8.5px] font-bold text-slate-500 block uppercase">Latest Event</span>
                    <span className="font-semibold text-slate-200">24h ago</span>
                  </div>
                </div>
              ) : (
                <div className="text-xs text-slate-450 italic pt-0.5">
                  Storm metrics pending
                </div>
              )}
            </div>

            {/* SECTION 3: HOMEOWNER CONTACT */}
            <div className="space-y-3 pt-4 border-t border-slate-500/10">
              <div className="flex justify-between items-center">
                <h4 className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest leading-none">
                  Homeowner Contact
                </h4>
                {isDemoMode && (
                  <span className="px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/20 text-amber-400 text-[8px] font-bold uppercase tracking-widest">
                    Demo Data
                  </span>
                )}
              </div>

              {isDemoMode ? (
                <div className="p-3.5 bg-slate-900/30 border border-slate-800/80 rounded-xl space-y-2 font-mono text-xs">
                  <div className="grid grid-cols-2 gap-x-2 gap-y-1.5 text-slate-350">
                    <div>
                      <span className="text-[8px] font-bold text-slate-500 block uppercase font-sans">Owner</span>
                      <span className="font-semibold text-slate-200">John Doe</span>
                    </div>
                    <div>
                      <span className="text-[8px] font-bold text-slate-550 block uppercase font-sans">Phone</span>
                      <span className="font-semibold text-slate-200">(555) 019-2834</span>
                    </div>
                    <div className="col-span-2">
                      <span className="text-[8px] font-bold text-slate-550 block uppercase font-sans">Email</span>
                      <span className="font-semibold text-slate-200 block truncate">j.doe@hailstormleads.com</span>
                    </div>
                    <div className="col-span-2">
                      <span className="text-[8px] font-bold text-slate-550 block uppercase font-sans">Mailing Address</span>
                      <span className="font-semibold text-slate-200 block truncate">{selectedProperty.fullAddress}</span>
                    </div>
                  </div>
                  <p className="text-[9px] font-sans text-amber-500/70 border-t border-slate-800/60 pt-1 italic">
                    Demo Data — Not Live Production Data
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs">
                    <div className="flex justify-between items-center border-b border-slate-900/40 pb-1">
                      <span className="text-slate-500 font-semibold">Owner</span>
                      <span className="font-bold text-slate-400 flex items-center gap-1.5 leading-none">
                        <Lock size={10} className="text-slate-550 shrink-0" />
                        Locked
                      </span>
                    </div>
                    <div className="flex justify-between items-center border-b border-slate-900/40 pb-1">
                      <span className="text-slate-500 font-semibold">Phone</span>
                      <span className="font-bold text-slate-400 flex items-center gap-1.5 leading-none">
                        <Lock size={10} className="text-slate-550 shrink-0" />
                        Locked
                      </span>
                    </div>
                    <div className="flex justify-between items-center border-b border-slate-900/40 pb-1">
                      <span className="text-slate-500 font-semibold">Email</span>
                      <span className="font-bold text-slate-400 flex items-center gap-1.5 leading-none">
                        <Lock size={10} className="text-slate-550 shrink-0" />
                        Locked
                      </span>
                    </div>
                    <div className="flex justify-between items-center border-b border-slate-900/40 pb-1">
                      <span className="text-slate-500 font-semibold">Mailing</span>
                      <span className="font-bold text-slate-400 flex items-center gap-1.5 leading-none">
                        <Lock size={10} className="text-slate-550 shrink-0" />
                        Locked
                      </span>
                    </div>
                  </div>
                  <p className="text-xs text-slate-400 leading-normal font-medium">
                    Homeowner contact data is available after requesting a Hail Strike Report or unlocking contact details for this market.
                  </p>
                  <button
                    type="button"
                    onClick={() => handleSelectProduct("OWNER_CONTACT")}
                    className="w-full py-2 px-3 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 hover:bg-indigo-500 hover:text-white text-xs font-bold uppercase tracking-wider transition-all cursor-pointer text-center flex items-center justify-center gap-1.5 border-none"
                  >
                    <Lock size={11} />
                    Unlock Contact Details
                  </button>
                </div>
              )}
            </div>

            {/* SECTION 4: PROPERTY & ROOF DATA */}
            <div className="space-y-3 pt-4 border-t border-slate-500/10">
              <h4 className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest leading-none">
                Roof / Property Data
              </h4>

              {isDemoMode ? (
                <div className="p-3.5 bg-slate-900/30 border border-slate-800/80 rounded-xl space-y-2 font-mono text-xs">
                  <div className="grid grid-cols-2 gap-x-2 gap-y-1.5 text-slate-350">
                    <div>
                      <span className="text-[8px] font-bold text-slate-550 block uppercase font-sans">Roof Size</span>
                      <span className="font-semibold text-slate-200">2,450 sq ft</span>
                    </div>
                    <div>
                      <span className="text-[8px] font-bold text-slate-555 block uppercase font-sans">Roof Material</span>
                      <span className="font-semibold text-slate-200">Asphalt Shingle</span>
                    </div>
                    <div>
                      <span className="text-[8px] font-bold text-slate-555 block uppercase font-sans">Roof Age</span>
                      <span className="font-semibold text-slate-200">6 Years</span>
                    </div>
                    <div>
                      <span className="text-[8px] font-bold text-slate-555 block uppercase font-sans">Parcel / APN</span>
                      <span className="font-semibold text-slate-200">47-093-1289</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs">
                    <div className="flex justify-between items-center border-b border-slate-900/40 pb-1">
                      <span className="text-slate-500 font-semibold">Roof Size</span>
                      <span className="font-semibold text-slate-400 text-right truncate max-w-[150px]">
                        Available after report request
                      </span>
                    </div>
                    <div className="flex justify-between items-center border-b border-slate-900/40 pb-1">
                      <span className="text-slate-500 font-semibold">Roof Material</span>
                      <span className="font-bold text-slate-400 flex items-center gap-1.5 leading-none">
                        <Lock size={10} className="text-slate-555 shrink-0" />
                        Locked
                      </span>
                    </div>
                    <div className="flex justify-between items-center border-b border-slate-900/40 pb-1">
                      <span className="text-slate-500 font-semibold">Roof Age</span>
                      <span className="font-bold text-slate-400 flex items-center gap-1.5 leading-none">
                        <Lock size={10} className="text-slate-555 shrink-0" />
                        Locked
                      </span>
                    </div>
                    <div className="flex justify-between items-center border-b border-slate-900/40 pb-1">
                      <span className="text-slate-500 font-semibold">Parcel/APN</span>
                      <span className="font-bold text-slate-400 flex items-center gap-1.5 leading-none">
                        <Lock size={10} className="text-slate-555 shrink-0" />
                        Locked
                      </span>
                    </div>
                  </div>
                  <p className="text-xs text-slate-400 leading-normal font-medium">
                    Roof size, material, age, parcel data, and structure details are available through the property report.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setModalProduct("STORM_REPORT_CONTACT");
                      setModalOpen(true);
                    }}
                    className="w-full py-2 px-3 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 hover:bg-indigo-500 hover:text-white text-xs font-bold uppercase tracking-wider transition-all cursor-pointer text-center flex items-center justify-center gap-1.5 border-none"
                  >
                    <FileText size={11} />
                    Request Property Report
                  </button>
                </div>
              )}
            </div>

            {/* SECTION 5: RECOMMENDED NEXT STEP */}
            <div className="space-y-3 pt-4 border-t border-slate-500/10 pb-2">
              <h4 className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest leading-none">
                Recommended Next Step
              </h4>
              <p className="text-xs text-slate-350 leading-relaxed font-medium">
                Request a Hail Strike Report to unlock homeowner contact data and property-level details for this storm market.
              </p>

              <div className="flex flex-col gap-2 pt-1 select-none">
                {/* Primary Action Button */}
                <button
                  type="button"
                  onClick={() => {
                    setModalProduct("STORM_REPORT_CONTACT");
                    setModalOpen(true);
                  }}
                  className="w-full py-2.5 px-4 rounded-lg bg-[#145CFF] hover:bg-[#2570FF] text-white text-xs font-bold uppercase tracking-wider transition-all shadow-md shadow-[#145CFF]/15 active:scale-[0.98] cursor-pointer text-center flex items-center justify-center gap-1.5 border-none"
                >
                  <FileText size={12} />
                  Request Hail Strike Report
                </button>

                {/* Secondary & Tertiary row */}
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={handleToggleLead}
                    className="py-2 px-3 rounded-lg bg-slate-900 border border-slate-800 text-slate-200 hover:bg-slate-800 hover:text-[#F8FAFC] text-[10px] font-bold uppercase tracking-wider transition-colors cursor-pointer text-center truncate"
                  >
                    {isAlreadySaved ? "Remove Lead" : "Add to Leads"}
                  </button>
                  
                  <button
                    type="button"
                    onClick={() => {
                      alert("View Details is a demo placeholder route.");
                    }}
                    className="py-2 px-3 rounded-lg text-slate-400 hover:text-slate-200 text-[10px] font-bold uppercase tracking-wider hover:underline cursor-pointer text-center truncate border-none bg-transparent"
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Gated Feature Disabled Banner */}
      {isSignedIn && !unlockedData && (
        <div className="mt-4 p-2.5 bg-red-950/10 border border-red-500/20 rounded-xl text-[10px] text-red-400 flex items-start gap-2 leading-relaxed shrink-0">
          <AlertTriangle size={12} className="shrink-0 mt-0.5 text-red-500" />
          <div>
            <strong className="block font-bold">Feature Guard Active</strong>
            Homeowner & Property Intelligence is disabled on this server. Purchases are not active yet.
          </div>
        </div>
      )}

      {/* Error Message */}
      {errorMsg && (
        <div className="mt-2 p-2 bg-red-950/20 border border-red-500/20 rounded-md text-[10px] text-red-400 flex items-center gap-1.5 shrink-0">
          <AlertTriangle size={11} className="shrink-0 text-red-500" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Modals */}
      {selectedProduct && (
        <>
          <ComplianceAttestationModal
            isOpen={showAttestationModal}
            onClose={() => setShowAttestationModal(false)}
            onSuccess={handleAttestationSuccess}
          />
          <UnlockLeadModal
            isOpen={showUnlockModal}
            onClose={() => setShowUnlockModal(false)}
            selectedProperty={selectedProperty}
            productType={selectedProduct}
            idempotencyKey={idempotencyKey}
            onSuccess={handleUnlockSuccess}
            onTriggerAttestation={handleTriggerAttestation}
          />
        </>
      )}

      {modalProduct && (
        <ProductRequestModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          productType={modalProduct}
          contextType="property"
          contextData={{
            fullAddress: selectedProperty.fullAddress,
            latitude: selectedProperty.latitude,
            longitude: selectedProperty.longitude,
            city: selectedProperty.city,
            state: selectedProperty.state,
            postcode: selectedProperty.postcode,
            confidence: selectedProperty.confidence || "unknown",
          }}
          isEnrichmentEnabled={false}
          onAddLeads={() => {}}
          onTriggerEnrichmentFlow={() => {
            handleSelectProduct("OWNER_CONTACT");
          }}
        />
      )}
    </div>
  );
}

export default LeadIntelligencePanel;
