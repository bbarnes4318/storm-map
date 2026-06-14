import React from "react";
import { UnlockedDataDetailResponse } from "./enrichment-client";
import { User, Home, Zap, Clock, MapPin, Phone, Mail, X } from "lucide-react";
import { PhoneEntry, EmailEntry } from "@/lib/enrichment/schemas";

interface UnlockedLeadDetailsProps {
  unlockedData: UnlockedDataDetailResponse;
  onClose: () => void;
}

export function UnlockedLeadDetails({
  unlockedData,
  onClose,
}: UnlockedLeadDetailsProps) {
  // Formatters
  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(val);
  };

  // Helper to extract first phone/email
  const firstPhone = unlockedData.contactData?.phones?.value?.[0];
  const firstEmail = unlockedData.contactData?.emails?.value?.[0];

  const ownerName = [
    unlockedData.contactData?.firstName?.value,
    unlockedData.contactData?.lastName?.value
  ].filter(Boolean).join(" ") || "Unavailable";

  return (
    <div className="flex flex-col gap-3 text-slate-300 w-full animate-in fade-in duration-200">
      
      {/* 1. Header Block with Address */}
      <div className="flex justify-between items-start gap-2 bg-[#050B16]/60 border border-slate-500/18 p-3 rounded-xl shadow-lg">
        <div className="flex gap-2.5 min-w-0">
          <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/25 shrink-0 self-start">
            <MapPin size={13} />
          </div>
          <div className="min-w-0">
            <span className="text-[8px] font-black text-slate-450 uppercase tracking-widest block mb-0.5 leading-none">
              UNLOCKED PROPERTY RECORD
            </span>
            <h4 className="text-[11.5px] font-black text-[#F8FAFC] leading-tight break-words">
              {unlockedData.addressText}
            </h4>
            <div className="flex gap-2.5 pt-1 text-[8.5px] text-slate-500 font-semibold font-mono">
              <span>LAT: {unlockedData.latitude?.toFixed(5)}</span>
              <span>LON: {unlockedData.longitude?.toFixed(5)}</span>
            </div>
          </div>
        </div>
        <button
          onClick={onClose}
          className="text-slate-450 hover:text-white p-1 rounded-md hover:bg-slate-800/40 transition-colors border-none bg-transparent shrink-0 cursor-pointer"
          title="Deselect property details"
        >
          <X size={13} />
        </button>
      </div>

      {/* 2. Unified High-Density Data Grid */}
      <div className="grid grid-cols-2 gap-2.5">
        
        {/* Box A: Homeowner Contact Info */}
        <div className="bg-[#060D1E]/95 border border-slate-500/18 rounded-xl p-3 flex flex-col justify-between shadow-md">
          <div className="space-y-1.5">
            <span className="text-[8px] font-black text-[#145CFF] uppercase tracking-widest block flex items-center gap-1 leading-none">
              <User size={10} className="text-[#145CFF]" />
              Homeowner
            </span>
            <div className="space-y-0.5">
              <div className="text-[11px] font-black text-slate-100 truncate" title={ownerName}>
                {ownerName}
              </div>
              <div className="text-[8.5px] text-slate-455 font-bold uppercase tracking-wide">
                {unlockedData.contactData?.ownerOccupied?.value ? "Owner Occupied" : "Tenant / Unknown"}
              </div>
            </div>
          </div>
          
          <div className="space-y-2 border-t border-slate-800/80 pt-2.5 mt-2.5">
            {firstPhone ? (
              <a
                href={`tel:${firstPhone.number}`}
                className="flex items-center justify-between text-[9.5px] text-slate-200 hover:text-[#145CFF] font-black transition-colors min-w-0"
              >
                <div className="flex items-center gap-1.5 min-w-0">
                  <Phone size={9} className="text-[#0E8F6E] shrink-0" />
                  <span className="font-mono truncate">{firstPhone.number}</span>
                </div>
                {firstPhone.dncStatus ? (
                  <span className="text-[6.5px] font-black bg-red-955/20 border border-red-500/20 text-red-400 px-1 rounded-sm uppercase tracking-wide shrink-0">
                    DNC
                  </span>
                ) : (
                  <span className="text-[6.5px] font-black bg-emerald-955/20 border border-emerald-500/20 text-emerald-400 px-1 rounded-sm uppercase tracking-wide shrink-0">
                    Safe
                  </span>
                )}
              </a>
            ) : (
              <div className="flex items-center gap-1.5 text-[9.5px] text-slate-550 italic">
                <Phone size={9} />
                <span>No phone listed</span>
              </div>
            )}
            
            {firstEmail ? (
              <a
                href={`mailto:${firstEmail.address}`}
                className="flex items-center gap-1.5 text-[9.5px] text-slate-200 hover:text-[#145CFF] font-black transition-colors min-w-0"
                title={firstEmail.address}
              >
                <Mail size={9} className="text-[#145CFF] shrink-0" />
                <span className="truncate max-w-[130px]">{firstEmail.address}</span>
              </a>
            ) : (
              <div className="flex items-center gap-1.5 text-[9.5px] text-slate-550 italic">
                <Mail size={9} />
                <span>No email listed</span>
              </div>
            )}
          </div>
        </div>

        {/* Box B: Structure & Property Stats */}
        <div className="bg-[#060D1E]/95 border border-slate-500/18 rounded-xl p-3 shadow-md">
          <span className="text-[8px] font-black text-[#0E8F6E] uppercase tracking-widest block mb-2 flex items-center gap-1 leading-none">
            <Home size={10} className="text-[#0E8F6E]" />
            Property Details
          </span>
          
          <div className="grid grid-cols-2 gap-x-2.5 gap-y-2 text-[9px] font-bold text-slate-350">
            <div>
              <span className="text-slate-500 block text-[7px] uppercase font-black tracking-wider leading-none mb-0.5">Built & Size</span>
              <span className="text-slate-200 leading-none">
                {unlockedData.propertyProfile?.yearBuilt?.value || "N/A"} · {unlockedData.propertyProfile?.squareFeet?.value ? `${unlockedData.propertyProfile.squareFeet.value.toLocaleString()} sf` : "N/A"}
              </span>
            </div>
            <div>
              <span className="text-slate-500 block text-[7px] uppercase font-black tracking-wider leading-none mb-0.5">Beds & Baths</span>
              <span className="text-slate-200 leading-none">
                {unlockedData.propertyProfile?.bedrooms?.value || "—"} bds / {unlockedData.propertyProfile?.bathrooms?.value || "—"} ba
              </span>
            </div>
            <div>
              <span className="text-slate-500 block text-[7px] uppercase font-black tracking-wider leading-none mb-0.5">Roof Details</span>
              <span className="text-slate-200 leading-none truncate block max-w-[75px]" title={unlockedData.roofIntelligence?.roofMaterial?.value || "Asphalt"}>
                {unlockedData.roofIntelligence?.estimatedRoofAge?.value ? `${unlockedData.roofIntelligence.estimatedRoofAge.value} yrs` : "N/A"} · {unlockedData.roofIntelligence?.roofMaterial?.value || "Asphalt"}
              </span>
            </div>
            <div>
              <span className="text-slate-500 block text-[7px] uppercase font-black tracking-wider leading-none mb-0.5">AVM Value</span>
              <span className="text-slate-200 leading-none">
                {unlockedData.propertyProfile?.homeValue?.value ? formatCurrency(unlockedData.propertyProfile.homeValue.value) : "N/A"}
              </span>
            </div>
          </div>
        </div>

      </div>

      {/* Row 3: Storm Proximity & Compliance */}
      <div className="grid grid-cols-2 gap-2.5">
        
        {/* Box C: Storm Proximity */}
        <div className="bg-[#060D1E]/95 border border-slate-500/18 rounded-xl p-3 shadow-md flex flex-col justify-between">
          <span className="text-[8px] font-black text-red-400 uppercase tracking-widest block flex items-center gap-1 leading-none">
            <Zap size={10} className="text-red-400" />
            Storm Match
          </span>
          <div className="space-y-1 text-[9px] pt-1.5">
            <div className="flex justify-between border-b border-slate-900 pb-1 font-semibold">
              <span className="text-slate-500">Proximity:</span>
              <span className="text-red-400 font-bold">0.4 Miles</span>
            </div>
            <div className="flex justify-between border-b border-slate-900 pb-1 font-semibold">
              <span className="text-slate-550 font-semibold">Max Hail size:</span>
              <span className="text-red-400 font-bold">1.75" (High)</span>
            </div>
            <div className="flex justify-between font-semibold">
              <span className="text-slate-550 font-semibold">Peak Wind:</span>
              <span className="text-indigo-400 font-bold">65 mph</span>
            </div>
          </div>
        </div>

        {/* Box D: Compliance & Auditing Info */}
        <div className="bg-[#060D1E]/95 border border-slate-500/18 rounded-xl p-3 shadow-md flex flex-col justify-between">
          <div className="space-y-1">
            <span className="text-[8px] font-black text-amber-500 uppercase tracking-widest block flex items-center gap-1 leading-none">
              <Clock size={10} className="text-amber-500" />
              Outreach Rules
            </span>
            <p className="text-[8.5px] text-slate-455 leading-relaxed font-bold">
              TCPA, CAN-SPAM and DNC safe. User certified compliance on purchase.
            </p>
          </div>
          
          <div className="text-[7.5px] font-mono text-slate-550 border-t border-slate-900 pt-1.5 flex justify-between">
            <span>TXID:</span>
            <span className="truncate max-w-[95px] font-bold" title={unlockedData.unlockId}>
              {unlockedData.unlockId?.substring(0, 12)}...
            </span>
          </div>
        </div>

      </div>

    </div>
  );
}

export default UnlockedLeadDetails;
