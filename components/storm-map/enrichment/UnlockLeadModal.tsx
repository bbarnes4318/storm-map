import React from "react";
import { X, Clock, HelpCircle, AlertTriangle, Coins, CheckSquare } from "lucide-react";
import { SelectedPropertyTarget } from "@/lib/weather/types";
import { DataProductType, UnlockResponse } from "@/lib/enrichment/schemas";
import { getQuote, unlockLead, EnrichmentApiError } from "./enrichment-client";

interface UnlockLeadModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedProperty: SelectedPropertyTarget;
  productType: DataProductType;
  idempotencyKey: string;
  onSuccess: (unlockId: string, unlockedData: UnlockResponse) => void;
  onTriggerAttestation: () => void;
}

export function UnlockLeadModal({
  isOpen,
  onClose,
  selectedProperty,
  productType,
  idempotencyKey,
  onSuccess,
  onTriggerAttestation,
}: UnlockLeadModalProps) {
  const [isLoadingQuote, setIsLoadingQuote] = React.useState(true);
  const [isUnlocking, setIsUnlocking] = React.useState(false);
  
  const [quoteId, setQuoteId] = React.useState<string | null>(null);
  const [creditCost, setCreditCost] = React.useState<number | null>(null);
  const [expiresAt, setExpiresAt] = React.useState<string | null>(null);
  
  const [timeLeft, setTimeLeft] = React.useState<string>("");
  const [errorMsg, setErrorMsg] = React.useState<string | null>(null);
  const [isDisabledFeature, setIsDisabledFeature] = React.useState(false);
  const [isInsufficientCredits, setIsInsufficientCredits] = React.useState(false);

  // Fetch quote
  const fetchQuote = React.useCallback(async () => {
    setIsLoadingQuote(true);
    setErrorMsg(null);
    setIsInsufficientCredits(false);
    try {
      const q = await getQuote({
        address: selectedProperty.fullAddress,
        latitude: selectedProperty.latitude,
        longitude: selectedProperty.longitude,
        productType,
      });
      setQuoteId(q.quoteId);
      setCreditCost(q.creditCost);
      setExpiresAt(q.expiresAt);
    } catch (err: unknown) {
      console.error("Quoting failed:", err);
      if (err instanceof EnrichmentApiError) {
        if (err.code === "FEATURE_DISABLED") {
          setIsDisabledFeature(true);
          setErrorMsg("Lead Intelligence is currently disabled on this server. The interface is ready, but purchases/access are not active yet.");
        } else if (err.code === "COMPLIANCE_ATTESTATION_REQUIRED") {
          onTriggerAttestation();
        } else if (err.code === "UNAUTHORIZED") {
          setErrorMsg("Session expired. Please sign in to request a quote.");
        } else {
          setErrorMsg(err.message || "Failed to generate a price quote.");
        }
      } else {
        setErrorMsg("Failed to connect to the pricing engine. Please try again.");
      }
    } finally {
      setIsLoadingQuote(false);
    }
  }, [selectedProperty, productType, onTriggerAttestation]);

  // Fetch quote on open or changes
  React.useEffect(() => {
    if (isOpen) {
      fetchQuote();
    }
  }, [isOpen, fetchQuote]);

  // Countdown timer for quote expiration
  React.useEffect(() => {
    if (!expiresAt || !isOpen) return;

    const timer = setInterval(() => {
      const limit = new Date(expiresAt).getTime();
      const now = Date.now();
      const diff = limit - now;

      if (diff <= 0) {
        setTimeLeft("Expired");
        clearInterval(timer);
        // Automatically fetch new quote on expiration
        fetchQuote();
      } else {
        const mins = Math.floor(diff / 60000);
        const secs = Math.floor((diff % 60000) / 1000);
        setTimeLeft(`${mins}:${secs.toString().padStart(2, "0")}`);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [expiresAt, isOpen, fetchQuote]);

  if (!isOpen) return null;

  const handleUnlock = async () => {
    if (!quoteId) return;
    setIsUnlocking(true);
    setErrorMsg(null);
    setIsInsufficientCredits(false);

    try {
      const result = await unlockLead(quoteId, idempotencyKey);
      onSuccess(result.unlockId, result);
    } catch (err: unknown) {
      console.error("Unlock failed:", err);
      if (err instanceof EnrichmentApiError) {
        if (err.code === "FEATURE_DISABLED") {
          setIsDisabledFeature(true);
          setErrorMsg("Lead Intelligence is currently disabled on this server. The interface is ready, but purchases/access are not active yet.");
        } else if (err.code === "INSUFFICIENT_CREDITS") {
          setIsInsufficientCredits(true);
          setErrorMsg("Insufficient credits. Credit purchase is coming soon. Contact us to add credits.");
        } else if (err.code === "COMPLIANCE_ATTESTATION_REQUIRED") {
          onTriggerAttestation();
        } else if (err.code === "PROVIDER_NO_MATCH") {
          setErrorMsg("No matching records found for this property at the provider. No credits were charged.");
        } else if (err.code === "QUOTE_EXPIRED") {
          setErrorMsg("The quote expired. Generating a new quote...");
          fetchQuote();
        } else if (err.code === "UNAUTHORIZED") {
          setErrorMsg("Session expired. Please sign in to access details.");
        } else {
          setErrorMsg(err.message || "An unexpected error occurred during the request.");
        }
      } else {
        setErrorMsg("Failed to complete transaction. Please check connection and try again.");
      }
    } finally {
      setIsUnlocking(false);
    }
  };

  const getProductName = (type: DataProductType): string => {
    switch (type) {
      case "PROPERTY_PROFILE": return "Property Profile";
      case "OWNER_CONTACT": return "Homeowner Contact Information";
      case "ROOF_INTELLIGENCE": return "Roof Intelligence";
      case "FULL_STORM_LEAD": return "Full Storm Lead";
    }
  };

  const getButtonText = (): string => {
    if (isUnlocking) return "Processing...";
    const creditsSuffix = creditCost ? ` (${creditCost} Credits)` : "";
    switch (productType) {
      case "PROPERTY_PROFILE":
      case "ROOF_INTELLIGENCE":
        return `Access Details${creditsSuffix}`;
      case "OWNER_CONTACT":
        return `Get Contact Information${creditsSuffix}`;
      case "FULL_STORM_LEAD":
        return `Request Lead Intelligence${creditsSuffix}`;
      default:
        return `Access Details${creditsSuffix}`;
    }
  };

  return (
    <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
      <div 
        className="relative w-full max-w-sm bg-slate-950 border border-slate-800 rounded-xl shadow-2xl overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-900 px-4 py-3 bg-slate-950">
          <div className="flex items-center gap-1.5 text-slate-200">
            <Coins size={14} className="text-red-500 shrink-0 animate-pulse" />
            <h3 className="font-extrabold text-[11px] uppercase tracking-wider">
              Confirm Access
            </h3>
          </div>
          <button
            onClick={onClose}
            type="button"
            className="p-1 rounded text-slate-500 hover:text-slate-200 hover:bg-slate-900 border border-transparent transition-colors"
          >
            <X size={14} />
          </button>
        </div>

        {/* Body */}
        <div className="p-4 space-y-3.5 flex-1 overflow-y-auto">
          {isLoadingQuote ? (
            <div className="py-8 flex flex-col items-center justify-center gap-2">
              <div className="w-6 h-6 border-2 border-red-500/20 border-t-red-500 rounded-full animate-spin"></div>
              <span className="text-[10px] text-slate-555 font-bold uppercase tracking-wider">
                Calculating credit cost...
              </span>
            </div>
          ) : (
            <>
              {/* Product Info */}
              <div className="bg-slate-900/20 border border-slate-900 rounded-lg p-3 space-y-2">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-[8px] text-slate-500 font-extrabold uppercase block tracking-wider">
                      Product Type
                    </span>
                    <span className="text-xs font-black text-slate-200 uppercase">
                      {getProductName(productType)}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 bg-red-950/20 border border-red-500/35 px-2 py-0.5 rounded">
                    <span className="text-red-400 font-extrabold text-xs">
                      {creditCost}
                    </span>
                    <span className="text-red-500 font-bold text-[8px] uppercase">
                      Credits
                    </span>
                  </div>
                </div>

                <div className="border-t border-slate-900/60 pt-1.5 flex justify-between items-center text-[9px]">
                  <div className="flex items-center gap-1 text-slate-400">
                    <Clock size={10} className="text-slate-500" />
                    <span>Quote Expiration</span>
                  </div>
                  <span className="font-mono font-bold text-red-500">
                    {timeLeft}
                  </span>
                </div>
              </div>

              {/* Property Details */}
              <div className="space-y-1.5">
                <span className="text-[8px] text-slate-500 font-extrabold uppercase block tracking-wider">
                  Target Address
                </span>
                <p className="text-[10.5px] text-slate-250 font-bold leading-tight">
                  {selectedProperty.fullAddress}
                </p>
              </div>

              {/* Notice */}
              <div className="flex items-start gap-1.5 text-[8.5px] text-slate-500 leading-normal bg-slate-900/10 p-2 rounded border border-slate-900/60">
                <HelpCircle size={12} className="shrink-0 text-slate-600 mt-0.5" />
                <span>
                  Preview is illustrative. Actual data availability varies by provider/source coverage. No credits are charged if provider returns no match.
                </span>
              </div>

              {/* Error Banner */}
              {errorMsg && (
                <div className={`p-2.5 rounded-lg border text-[9.5px] flex items-start gap-1.5 ${
                  isDisabledFeature || isInsufficientCredits
                    ? "bg-red-950/15 border-red-500/30 text-red-400"
                    : "bg-amber-950/15 border-amber-500/30 text-amber-400"
                }`}>
                  <AlertTriangle size={12} className="shrink-0 mt-0.5" />
                  <span className="leading-tight">{errorMsg}</span>
                </div>
              )}
            </>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-slate-900 p-3 bg-slate-950/40 flex justify-end gap-2 text-[10px]">
          <button
            onClick={onClose}
            disabled={isUnlocking}
            className="px-3 py-1.5 rounded border border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-900 font-extrabold uppercase transition-all"
          >
            Cancel
          </button>
          <button
            onClick={handleUnlock}
            disabled={isLoadingQuote || isUnlocking || isDisabledFeature || isInsufficientCredits}
            className={`px-3 py-1.5 rounded text-white font-extrabold uppercase transition-all flex items-center gap-1 cursor-pointer ${
              isDisabledFeature || isInsufficientCredits
                ? "bg-slate-900 border border-slate-800 text-slate-600 cursor-not-allowed"
                : isUnlocking
                ? "bg-red-800 border border-red-700 opacity-60 cursor-wait"
                : "bg-red-650 hover:bg-red-600 border border-red-650"
            }`}
          >
            {getButtonText()}
          </button>
        </div>
      </div>
    </div>
  );
}
export default UnlockLeadModal;
