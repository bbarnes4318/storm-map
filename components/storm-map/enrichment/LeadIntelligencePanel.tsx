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
  FileText 
} from "lucide-react";

interface LeadIntelligencePanelProps {
  selectedProperty: SelectedPropertyTarget;
  onUpdateLead: (lead: SelectedPropertyTarget) => void;
  onClearProperty: () => void;
  leads?: SelectedPropertyTarget[];
  onRemoveLead?: (leadId: string) => void;
  onAddLeads?: (leads: SelectedPropertyTarget[]) => void;
  filters?: StormFilterState;
  isDemo?: boolean;
  demoStep?: number;
}

export function LeadIntelligencePanel({
  selectedProperty,
  onUpdateLead,
  onClearProperty,
  leads = [],
  onRemoveLead,
  onAddLeads,
  filters,
  isDemo = false,
  demoStep = 0,
}: LeadIntelligencePanelProps) {
  const { isSignedIn } = useUser();

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
    if (isDemo) {
      setIsDemoMode(true);
      return;
    }
    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search);
      const isDemoUrl = urlParams.get("demo") === "true";
      const isDemoStorage = localStorage.getItem("demoMode") === "true";
      setIsDemoMode(isDemoUrl || isDemoStorage);
    }
  }, [isDemo]);

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
    <div className="flex-1 flex flex-col h-full select-none p-4 text-slate-350 bg-slate-950/20 backdrop-blur-md">
      
      {/* CARD HEADER */}
      <div className="flex justify-between items-center pb-2.5 mb-2.5 border-b border-slate-500/18 shrink-0">
        <div className="flex items-center gap-2 min-w-0">
          <div className="p-1.5 rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
            <Target size={14} className="animate-pulse" />
          </div>
          <div className="min-w-0">
            <span className="text-[8.5px] font-extrabold uppercase tracking-widest text-slate-450 block leading-none mb-0.5">
              LEAD TARGET
            </span>
            <h3 className="font-bold text-[#F8FAFC] text-sm leading-tight">
              Property Opportunity
            </h3>
          </div>
        </div>
        
        <div className="flex items-center gap-1.5 shrink-0">
          <span className="px-1.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[8.5px] font-bold flex items-center gap-0.5 leading-none">
            <Check size={8} strokeWidth={3} />
            Verified
          </span>
          <button
            type="button"
            onClick={onClearProperty}
            className="text-slate-400 hover:text-[#F8FAFC] p-1 rounded-lg hover:bg-slate-800/50 transition-colors border-none bg-transparent"
            title="Deselect property"
          >
            <X size={13} />
          </button>
        </div>
      </div>

      {/* CONTENTS */}
      <div className="flex-1 flex flex-col gap-3 min-h-0">
        
        {isLoading ? (
          <div className="py-12 flex flex-col items-center justify-center gap-3">
            <div className="w-5 h-5 border-2 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin"></div>
            <span className="text-[9px] text-slate-500 font-bold uppercase tracking-wider">
              Loading details...
            </span>
          </div>
        ) : unlockedData ? (
          <div className="flex-1 flex flex-col min-h-0">
            <UnlockedLeadDetails 
              unlockedData={unlockedData}
              onClose={() => {
                onUpdateLead({ ...selectedProperty, unlockId: undefined });
              }}
            />
          </div>
        ) : (
          /* Locked State Content - Optimized for Space */
          <>
            {/* SECTION 1: SELECTED PROPERTY */}
            <div className="space-y-1">
              <span className="text-[9px] font-extrabold text-slate-500 uppercase tracking-wider">
                Selected Property
              </span>
              <div className="space-y-0.5">
                {isGatedAddress ? (
                  <>
                    <span className="text-sm font-semibold text-slate-100 block">
                      Property Record Selected
                    </span>
                    <span className="text-[10.5px] text-slate-400 block font-medium">
                      Address available in Hail Strike Report
                    </span>
                  </>
                ) : (
                  <>
                    <span className="text-sm font-semibold text-slate-100 block break-words">
                      {selectedProperty.fullAddress}
                    </span>
                    {(selectedProperty.city || selectedProperty.state || selectedProperty.postcode) && (
                      <span className="text-[10.5px] text-slate-400 block font-medium">
                        {[
                          selectedProperty.city,
                          [selectedProperty.state, selectedProperty.postcode].filter(Boolean).join(" ")
                        ].filter(Boolean).join(", ")}
                      </span>
                    )}
                  </>
                )}
              </div>

              {/* Coordinates & Confidence mini row */}
              <div className="flex gap-4 pt-1 text-[10.5px] text-slate-400">
                <div>
                  Coords: <span className="font-mono text-slate-200 font-medium">
                    {selectedProperty.latitude.toFixed(4)}, {selectedProperty.longitude.toFixed(4)}
                  </span>
                </div>
                <div>
                  Confidence: <span className="font-semibold text-slate-200 capitalize">
                    {selectedProperty.confidence || "exact"}
                  </span>
                </div>
              </div>
            </div>

            {/* SECTION 2: STORM MATCH */}
            <div className="space-y-1">
              <span className="text-[9px] font-extrabold text-slate-500 uppercase tracking-wider block">
                Storm Match
              </span>
              
              {showStormMetrics ? (
                <div className="grid grid-cols-3 gap-1.5 text-[10px]">
                  <div className="bg-red-500/5 border border-red-500/10 p-1.5 rounded-lg text-center flex flex-col">
                    <span className="text-slate-500 text-[7.5px] uppercase font-bold leading-none mb-0.5">Hail Impact</span>
                    <span className="font-semibold text-red-400">1.75" (High)</span>
                  </div>
                  <div className="bg-indigo-500/5 border border-indigo-500/10 p-1.5 rounded-lg text-center flex flex-col">
                    <span className="text-slate-500 text-[7.5px] uppercase font-bold leading-none mb-0.5">Peak Wind</span>
                    <span className="font-semibold text-indigo-400">65 mph</span>
                  </div>
                  <div className="bg-emerald-500/5 border border-emerald-500/10 p-1.5 rounded-lg text-center flex flex-col">
                    <span className="text-slate-500 text-[7.5px] uppercase font-bold leading-none mb-0.5">Radius</span>
                    <span className="font-semibold text-emerald-400">{filters?.radius || 15} mi</span>
                  </div>
                </div>
              ) : (
                <div className="text-xs text-slate-500 italic">
                  Storm metrics pending
                </div>
              )}
            </div>

            {/* SECTION 3: HOMEOWNER CONTACT */}
            <div className="space-y-1">
              <div className="flex justify-between items-center">
                <span className="text-[9px] font-extrabold text-slate-500 uppercase tracking-wider">
                  Homeowner Contact
                </span>
                {!isDemoMode && (
                  <button
                    type="button"
                    onClick={() => handleSelectProduct("OWNER_CONTACT")}
                    className="text-[8px] font-bold text-indigo-400 hover:text-indigo-300 uppercase tracking-wider bg-indigo-500/10 border border-indigo-500/20 px-1.5 py-0.5 rounded leading-none"
                  >
                    Unlock Details
                  </button>
                )}
              </div>

              {isDemoMode ? (
                <div className="p-2 bg-slate-900/30 border border-slate-900/80 rounded-xl space-y-0.5 font-mono text-[10px] text-slate-350">
                  <div className="grid grid-cols-2 gap-x-2 gap-y-0.5">
                    <div className="flex justify-between">
                      <span className="text-slate-550 font-sans">Owner:</span>
                      <span className="font-semibold text-slate-200">John Doe</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-550 font-sans">Phone:</span>
                      <span className="font-semibold text-slate-200">(555) 019-2834</span>
                    </div>
                    <div className="col-span-2 flex justify-between">
                      <span className="text-slate-555 font-sans">Email:</span>
                      <span className="font-semibold text-slate-200 truncate max-w-[170px]">j.doe@hailstorm.com</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-x-3 gap-y-0.5 text-[10px] bg-slate-900/20 border border-slate-900/80 p-2 rounded-xl text-slate-400">
                  <div className="flex justify-between"><span>Owner:</span><span className="font-semibold text-slate-500">Locked</span></div>
                  <div className="flex justify-between"><span>Phone:</span><span className="font-semibold text-slate-500">Locked</span></div>
                  <div className="flex justify-between"><span>Email:</span><span className="font-semibold text-slate-500">Locked</span></div>
                  <div className="flex justify-between"><span>Mailing:</span><span className="font-semibold text-slate-500">Locked</span></div>
                </div>
              )}
            </div>

            {/* SECTION 4: PROPERTY & ROOF DATA */}
            <div className="space-y-1">
              <div className="flex justify-between items-center">
                <span className="text-[9px] font-extrabold text-slate-500 uppercase tracking-wider">
                  Roof / Property Data
                </span>
                {!isDemoMode && (
                  <button
                    type="button"
                    onClick={() => {
                      setModalProduct("STORM_REPORT_CONTACT");
                      setModalOpen(true);
                    }}
                    className="text-[8px] font-bold text-indigo-400 hover:text-indigo-300 uppercase tracking-wider bg-indigo-500/10 border border-indigo-500/20 px-1.5 py-0.5 rounded leading-none"
                  >
                    Request Report
                  </button>
                )}
              </div>

              {isDemoMode ? (
                <div className="p-2 bg-slate-900/30 border border-slate-900/80 rounded-xl space-y-0.5 font-mono text-[10px] text-slate-350">
                  <div className="grid grid-cols-2 gap-x-2 gap-y-0.5">
                    <div className="flex justify-between"><span>Roof Size:</span><span className="font-semibold text-slate-200">2,450 sq ft</span></div>
                    <div className="flex justify-between"><span>Material:</span><span className="font-semibold text-slate-200">Asphalt</span></div>
                    <div className="flex justify-between"><span>Roof Age:</span><span className="font-semibold text-slate-200">6 Years</span></div>
                    <div className="flex justify-between"><span>APN:</span><span className="font-semibold text-slate-200">47-093-128</span></div>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-x-3 gap-y-0.5 text-[10px] bg-slate-900/20 border border-slate-900/80 p-2 rounded-xl text-slate-400">
                  <div className="flex justify-between"><span>Roof Size:</span><span className="font-semibold text-slate-550">Gated</span></div>
                  <div className="flex justify-between"><span>Material:</span><span className="font-semibold text-slate-550">Locked</span></div>
                  <div className="flex justify-between"><span>Roof Age:</span><span className="font-semibold text-slate-550">Locked</span></div>
                  <div className="flex justify-between"><span>Parcel/APN:</span><span className="font-semibold text-slate-550">Locked</span></div>
                </div>
              )}
            </div>

            {/* SECTION 5: RECOMMENDED NEXT STEP */}
            <div className="space-y-2 pt-2.5 border-t border-slate-500/18">
              <div className="flex flex-col gap-0.5">
                <span className="text-[9px] font-extrabold text-slate-500 uppercase tracking-wider block">
                  Recommended Next Step
                </span>
                <p className="text-[10.5px] text-slate-400 leading-tight">
                  Request a Hail Strike Report to unlock contact details and structural dimensions.
                </p>
              </div>

              <div className="flex gap-2 relative">
                {isDemo && demoStep === 8 && !isAlreadySaved && (
                  <div className="absolute -top-7 right-2 bg-indigo-650 text-white text-[8px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded shadow-lg animate-bounce z-[1002] whitespace-nowrap border border-indigo-400">
                    Click Save Lead! 👇
                  </div>
                )}
                {/* Primary Action Button */}
                <button
                  type="button"
                  onClick={() => {
                    setModalProduct("STORM_REPORT_CONTACT");
                    setModalOpen(true);
                  }}
                  className="flex-1 py-2 px-3 rounded-lg bg-[#145CFF] hover:bg-[#2570FF] text-white text-[10px] font-bold uppercase tracking-wider transition-all border-none cursor-pointer shadow-md shadow-[#145CFF]/15"
                >
                  Request Report
                </button>

                {/* Secondary Button */}
                <button
                  type="button"
                  onClick={handleToggleLead}
                  className={`px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white text-[10px] font-bold uppercase tracking-wider transition-colors cursor-pointer ${
                    isDemo && demoStep === 8 && !isAlreadySaved
                      ? "ring-2 ring-indigo-500 bg-indigo-500/20 animate-pulse"
                      : ""
                  }`}
                >
                  {isAlreadySaved ? "Remove" : "Save Lead"}
                </button>
              </div>
            </div>
          </>
        )}
      </div>

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
