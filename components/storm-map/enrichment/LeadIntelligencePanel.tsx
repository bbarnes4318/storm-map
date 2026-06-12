"use client";

import React from "react";
import { useUser } from "@clerk/nextjs";
import { SelectedPropertyTarget } from "@/lib/weather/types";
import { DataProductType, UnlockResponse } from "@/lib/enrichment/schemas";
import { 
  getUnlockedLeadData, 
  UnlockedDataDetailResponse, 
  EnrichmentApiError 
} from "./enrichment-client";
import { EnrichmentProductCards } from "./EnrichmentProductCards";
import { ComplianceAttestationModal } from "./ComplianceAttestationModal";
import { UnlockLeadModal } from "./UnlockLeadModal";
import { UnlockedLeadDetails } from "./UnlockedLeadDetails";
import { MapPin, ShieldAlert, Coins, Lock, AlertTriangle, LogIn } from "lucide-react";

interface LeadIntelligencePanelProps {
  selectedProperty: SelectedPropertyTarget;
  onUpdateLead: (lead: SelectedPropertyTarget) => void;
  onClearProperty: () => void;
}

export function LeadIntelligencePanel({
  selectedProperty,
  onUpdateLead,
  onClearProperty,
}: LeadIntelligencePanelProps) {
  const { isLoaded, isSignedIn } = useUser();

  const [isLoading, setIsLoading] = React.useState(false);
  const [unlockedData, setUnlockedData] = React.useState<UnlockedDataDetailResponse | null>(null);
  const [errorMsg, setErrorMsg] = React.useState<string | null>(null);

  // Modal and Flow States
  const [selectedProduct, setSelectedProduct] = React.useState<DataProductType | null>(null);
  const [showAttestationModal, setShowAttestationModal] = React.useState(false);
  const [showUnlockModal, setShowUnlockModal] = React.useState(false);
  const [idempotencyKey, setIdempotencyKey] = React.useState<string>("");

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
        // Correction 1: If localStorage contains a stale/invalid unlockId, fail gracefully & clear it
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
    // Correction 4: Check auth
    if (!isSignedIn) {
      return; // Handled by auth prompt display in render
    }

    setSelectedProduct(productType);
    
    // Generate UUIDv4 for idempotency
    const key = `idemp-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
    setIdempotencyKey(key);

    // Open unlock/quote modal directly (if compliance is needed, the API will fail with COMPLIANCE_ATTESTATION_REQUIRED and we trigger the attestation modal)
    setShowUnlockModal(true);
  };

  const handleAttestationSuccess = () => {
    setShowAttestationModal(false);
    // Proceed back to unlock/quote modal
    if (selectedProduct) {
      setShowUnlockModal(true);
    }
  };

  const handleUnlockSuccess = (unlockId: string, _result: UnlockResponse) => {
    setShowUnlockModal(false);
    
    // Correction 1: Update UI state & localStorage via callback
    onUpdateLead({
      ...selectedProperty,
      unlockId,
    });
  };

  const handleTriggerAttestation = () => {
    setShowUnlockModal(false);
    setShowAttestationModal(true);
  };

  return (
    <div className="space-y-4 border-t border-slate-900 pt-3 mt-1.5">
      {/* Panel Header */}
      <div className="flex justify-between items-center px-0.5">
        <div>
          <h3 className="font-extrabold text-[11px] text-slate-200 uppercase tracking-wide flex items-center gap-1">
            <Lock size={11} className="text-red-500 shrink-0" />
            Lead Intelligence
          </h3>
          <p className="text-[9px] text-slate-500 font-medium">
            Unlock homeowner contact, property, and roof metrics.
          </p>
        </div>

        {/* Credit Display */}
        <div className="flex flex-col items-end">
          <div className="flex items-center gap-1 bg-slate-900 border border-slate-800 px-2 py-0.5 rounded text-[9.5px]">
            <Coins size={10} className="text-amber-500" />
            <span className="font-extrabold text-slate-300">Credits: —</span>
          </div>
          <span className="text-[7.5px] text-slate-650 font-bold block mt-0.5 uppercase tracking-tight">
            Purchase coming soon
          </span>
        </div>
      </div>

      {/* Feature Disabled Banner (Correction 3) */}
      <div className="p-2.5 bg-red-950/10 border border-red-500/20 rounded-lg text-[9.5px] text-red-400 flex items-start gap-2 leading-relaxed">
        <AlertTriangle size={12} className="shrink-0 mt-0.5 text-red-500" />
        <div>
          <strong className="block font-bold">Feature Guard Active</strong>
          Lead intelligence unlocks are currently disabled. This feature is being prepared for launch.
        </div>
      </div>

      {isLoading ? (
        <div className="py-8 flex flex-col items-center justify-center gap-2">
          <div className="w-5 h-5 border-2 border-red-500/20 border-t-red-500 rounded-full animate-spin"></div>
          <span className="text-[9px] text-slate-555 font-bold uppercase tracking-wider">
            Loading unlocked intelligence...
          </span>
        </div>
      ) : unlockedData ? (
        /* Unlocked Details View (Correction 2) */
        <UnlockedLeadDetails 
          unlockedData={unlockedData}
          onClose={() => {
            // Re-lock or clear local state
            onUpdateLead({ ...selectedProperty, unlockId: undefined });
          }}
        />
      ) : (
        /* Pre-Purchase Flow */
        <div className="space-y-4">
          {/* Correction 4: Auth Check Prompts */}
          {!isSignedIn ? (
            <div className="p-3 bg-slate-900/40 border border-slate-900 rounded-lg flex flex-col items-center justify-center text-center gap-2">
              <LogIn size={20} className="text-red-500/70" />
              <div className="space-y-0.5">
                <span className="text-[10px] font-extrabold text-slate-200 block">
                  Sign in to unlock lead intelligence
                </span>
                <p className="text-[8.5px] text-slate-500 leading-normal max-w-[240px]">
                  Authorized accounts can request pricing quotes and unlock roof and contact profiles.
                </p>
              </div>
              <a
                href="/storm-map/sign-in"
                className="mt-1 px-3 py-1.5 rounded bg-red-650 hover:bg-red-600 border border-red-650 text-white text-[9px] font-extrabold uppercase transition-all shadow"
              >
                Sign In
              </a>
            </div>
          ) : null}

          {/* Masked Teaser (Correction 2) */}
          <div className="bg-slate-900/10 border border-slate-900 rounded-lg p-3 space-y-2.5 relative overflow-hidden">
            {/* Absolute watermark overlay */}
            <div className="absolute inset-0 bg-slate-950/20 pointer-events-none flex items-center justify-center select-none opacity-40">
              <span className="font-black text-[22px] tracking-widest text-slate-900 uppercase rotate-12">
                Sample Preview
              </span>
            </div>

            <span className="text-[8px] font-extrabold text-slate-500 uppercase tracking-widest block">
              Lead Intelligence Preview
            </span>

            <div className="grid grid-cols-2 gap-x-2 gap-y-1.5 font-mono text-[9.5px] text-slate-400">
              <div>
                <span className="text-slate-600 text-[8px] font-bold block uppercase tracking-tight">Owner</span>
                <span className="font-bold">J*** D****</span>
              </div>
              <div>
                <span className="text-slate-600 text-[8px] font-bold block uppercase tracking-tight">Mobile</span>
                <span className="font-bold">(***) ***-1289</span>
              </div>
              <div>
                <span className="text-slate-600 text-[8px] font-bold block uppercase tracking-tight">Email</span>
                <span className="font-bold pr-1 truncate block">j***@g****.com</span>
              </div>
              <div>
                <span className="text-slate-600 text-[8px] font-bold block uppercase tracking-tight">Home Details</span>
                <span className="font-bold">2,140 sq ft · 1998</span>
              </div>
              <div className="col-span-2 border-t border-slate-900/50 pt-1.5 mt-0.5">
                <span className="text-slate-600 text-[8px] font-bold block uppercase tracking-tight">Roof & Proximity</span>
                <span className="font-bold">Asphalt shingle · 14–18 yrs · 0.4 mi from hail</span>
              </div>
            </div>

            <p className="text-[8px] text-slate-550 leading-snug border-t border-slate-900/40 pt-1.5 italic">
              “Preview is illustrative. Actual data availability varies by provider/source coverage.”
            </p>
          </div>

          {/* Product selection cards (Disabled when not authenticated, Correction 3: Always disabled in UI as API flag is off) */}
          <EnrichmentProductCards 
            onSelectProduct={handleSelectProduct}
            disabled={!isSignedIn} 
          />
        </div>
      )}

      {/* Error Message */}
      {errorMsg && (
        <div className="p-2 bg-red-950/20 border border-red-500/20 rounded-md text-[9.5px] text-red-400 flex items-center gap-1.5">
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
    </div>
  );
}
export default LeadIntelligencePanel;
