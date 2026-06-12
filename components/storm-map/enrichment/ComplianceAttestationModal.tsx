import React from "react";
import { X, ShieldAlert, CheckCircle, AlertTriangle } from "lucide-react";
import { attest, EnrichmentApiError } from "./enrichment-client";

interface ComplianceAttestationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function ComplianceAttestationModal({
  isOpen,
  onClose,
  onSuccess,
}: ComplianceAttestationModalProps) {
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState<string | null>(null);
  const [isDisabledFeature, setIsDisabledFeature] = React.useState(false);

  // Reset states when opening
  React.useEffect(() => {
    if (isOpen) {
      setIsSubmitting(false);
      setErrorMsg(null);
      setIsDisabledFeature(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleAgree = async () => {
    setIsSubmitting(true);
    setErrorMsg(null);
    try {
      await attest(true);
      onSuccess();
    } catch (err: unknown) {
      console.error("Compliance attestation failed:", err);
      if (err instanceof EnrichmentApiError) {
        if (err.code === "FEATURE_DISABLED") {
          setIsDisabledFeature(true);
          setErrorMsg("Lead intelligence unlocks are not enabled on this server yet.");
        } else if (err.code === "UNAUTHORIZED") {
          setErrorMsg("Session expired. Please sign in to submit compliance attestation.");
        } else {
          setErrorMsg(err.message || "Failed to submit attestation. Please try again.");
        }
      } else {
        setErrorMsg("Failed to connect to the compliance server. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
      <div 
        className="relative w-full max-w-md bg-slate-950 border border-slate-800 rounded-xl shadow-2xl overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-900 px-4 py-3 bg-slate-950">
          <div className="flex items-center gap-1.5 text-red-500">
            <ShieldAlert size={14} className="shrink-0" />
            <h3 className="font-extrabold text-[11px] uppercase tracking-wider text-slate-200">
              Compliance Attestation Required
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

        {/* Content */}
        <div className="p-4 space-y-3">
          <div className="p-3 bg-slate-900/35 border border-slate-900 rounded-lg text-slate-300 text-[10px] leading-relaxed">
            I will use this data only for lawful home-services marketing and will honor all opt-out, DNC, TCPA, and applicable privacy requirements. I understand this data may not be used for FCRA-covered eligibility decisions such as credit, insurance underwriting, employment, housing, or tenant screening.
          </div>

          {/* Error Banner */}
          {errorMsg && (
            <div className={`p-2.5 rounded-lg border text-[9.5px] flex items-start gap-1.5 ${
              isDisabledFeature 
                ? "bg-red-950/15 border-red-500/30 text-red-400" 
                : "bg-amber-950/15 border-amber-500/30 text-amber-400"
            }`}>
              <AlertTriangle size={12} className="shrink-0 mt-0.5" />
              <span>{errorMsg}</span>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-slate-900 p-3 bg-slate-950/40 flex justify-end gap-2 text-[10px]">
          <button
            onClick={onClose}
            disabled={isSubmitting}
            className="px-3 py-1.5 rounded border border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-900 font-extrabold uppercase transition-all"
          >
            Cancel
          </button>
          <button
            onClick={handleAgree}
            disabled={isSubmitting || isDisabledFeature}
            className={`px-3 py-1.5 rounded text-white font-extrabold uppercase transition-all flex items-center gap-1 ${
              isDisabledFeature
                ? "bg-slate-900 border border-slate-800 text-slate-600 cursor-not-allowed"
                : isSubmitting
                ? "bg-red-800 border border-red-700 opacity-60 cursor-wait"
                : "bg-red-650 hover:bg-red-600 border border-red-650"
            }`}
          >
            {isSubmitting ? "Attesting..." : "I Agree & Continue"}
          </button>
        </div>
      </div>
    </div>
  );
}
export default ComplianceAttestationModal;
