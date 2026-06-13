import React from "react";
import { UnlockedDataDetailResponse } from "./enrichment-client";
import { User, Home, Shield, Zap, Info, Clock, AlertTriangle, MapPin } from "lucide-react";
import { PhoneEntry, EmailEntry, Permit } from "@/lib/enrichment/schemas";

interface UnlockedLeadDetailsProps {
  unlockedData: UnlockedDataDetailResponse;
  onClose: () => void;
}

type TabType = "overview" | "contact" | "property" | "roof" | "storm" | "compliance";

export function UnlockedLeadDetails({
  unlockedData,
  onClose,
}: UnlockedLeadDetailsProps) {
  const [activeTab, setActiveTab] = React.useState<TabType>("contact");

  // Helper to format values with fallback
  const renderVal = <T,>(
    meta: { value: T } | null | undefined,
    formatter?: (val: T) => React.ReactNode
  ) => {
    if (!meta || meta.value === undefined || meta.value === null || meta.value === "") {
      return <span className="text-slate-600 font-semibold italic">Unavailable</span>;
    }
    return formatter ? formatter(meta.value) : <span className="text-slate-100 font-bold">{String(meta.value)}</span>;
  };

  const renderSimpleVal = <T,>(
    val: T | null | undefined,
    formatter?: (val: T) => React.ReactNode
  ) => {
    if (val === undefined || val === null || val === "") {
      return <span className="text-slate-600 font-semibold italic">Unavailable</span>;
    }
    return formatter ? formatter(val) : <span className="text-slate-100 font-bold">{String(val)}</span>;
  };

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(val);
  };

  const formatDate = (val: string) => {
    try {
      return new Date(val).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
    } catch {
      return val;
    }
  };

  const getConfidenceBadge = (confidence: number) => {
    const pct = Math.round(confidence * 100);
    let color = "text-slate-500 bg-slate-900 border-slate-800";
    if (confidence >= 0.85) {
      color = "text-emerald-400 bg-emerald-500/10 border-emerald-500/20";
    } else if (confidence >= 0.6) {
      color = "text-amber-400 bg-amber-500/10 border-amber-500/20";
    }
    return (
      <span className={`px-1 rounded-sm text-[8px] font-bold border ${color}`}>
        {pct}% Conf
      </span>
    );
  };

  const tabs: { id: TabType; label: string; icon: React.ComponentType<{ size?: number; className?: string }> }[] = [
    { id: "overview", label: "Overview", icon: Info },
    { id: "contact", label: "Homeowner Contact", icon: User },
    { id: "property", label: "Property Details", icon: Home },
    { id: "roof", label: "Roof Intelligence", icon: Shield },
    { id: "storm", label: "Storm Context", icon: Zap },
    { id: "compliance", label: "Source & Compliance", icon: Clock },
  ];

  return (
    <div className="bg-slate-950 border border-slate-900 rounded-lg overflow-hidden flex flex-col min-h-[350px] max-h-[550px]">
      {/* Selected Address Header (Always Visible) */}
      <div className="p-3 bg-slate-900/30 border-b border-slate-900 flex items-start gap-2 shrink-0 animate-in fade-in slide-in-from-top-1 duration-150">
        <MapPin size={13} className="text-emerald-500 shrink-0 mt-0.5" />
        <div className="min-w-0 flex-1">
          <span className="text-slate-500 font-bold uppercase text-[7px] block tracking-wider leading-none mb-1">Selected Target Address</span>
          <span className="text-slate-200 font-black text-[11px] leading-tight block break-words">
            {unlockedData.addressText}
          </span>
        </div>
      </div>

      {/* Mini tabs bar */}
      <div className="flex border-b border-slate-900 bg-slate-950 overflow-x-auto shrink-0 custom-scrollbar">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-1 px-3 py-2 border-b-2 text-[8.5px] font-extrabold uppercase transition-all shrink-0 select-none ${
                isActive
                  ? "border-red-500 text-slate-200 bg-slate-900/10"
                  : "border-transparent text-slate-500 hover:text-slate-350"
              }`}
            >
              <Icon size={10} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab content area */}
      <div className="flex-1 overflow-y-auto p-3 space-y-3.5 min-h-0 text-[10px] custom-scrollbar">
        {activeTab === "overview" && (
          <div className="space-y-2.5">
            <h4 className="font-extrabold text-[11px] text-slate-200 uppercase tracking-wide">
              Lead Intelligence Overview
            </h4>
            <div className="grid grid-cols-2 gap-2 bg-slate-900/15 border border-slate-900 p-2.5 rounded-lg">
              <div className="flex flex-col gap-0.5">
                <span className="text-slate-500 font-bold uppercase text-[7.5px]">Product Accessed</span>
                <span className="text-slate-200 font-bold uppercase truncate">{unlockedData.productType}</span>
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="text-slate-500 font-bold uppercase text-[7.5px]">Credits Expended</span>
                <span className="text-slate-200 font-bold">{unlockedData.creditsCharged} Credits</span>
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="text-slate-500 font-bold uppercase text-[7.5px]">Provider Source</span>
                <span className="text-slate-200 font-bold uppercase truncate">{unlockedData.providerSource}</span>
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="text-slate-500 font-bold uppercase text-[7.5px]">Purchased At</span>
                <span className="text-slate-200 font-medium truncate">{formatDate(unlockedData.createdAt)}</span>
              </div>
            </div>

          </div>
        )}

        {activeTab === "contact" && (
          <div className="space-y-3">
            <h4 className="font-extrabold text-[11px] text-slate-200 uppercase tracking-wide">
              Homeowner Contact Intelligence
            </h4>

            {unlockedData.contactData ? (
              <div className="space-y-3">
                {/* Name & Demographics */}
                <div className="grid grid-cols-2 gap-2 bg-slate-900/15 border border-slate-900 p-2.5 rounded-lg">
                  <div className="flex flex-col gap-0.5">
                    <span className="text-slate-500 font-bold uppercase text-[7.5px]">First Name</span>
                    <div className="flex items-center gap-1.5">
                      {renderVal(unlockedData.contactData.firstName)}
                      {unlockedData.contactData.firstName?.confidence && getConfidenceBadge(unlockedData.contactData.firstName.confidence)}
                    </div>
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <span className="text-slate-500 font-bold uppercase text-[7.5px]">Last Name</span>
                    <div className="flex items-center gap-1.5">
                      {renderVal(unlockedData.contactData.lastName)}
                      {unlockedData.contactData.lastName?.confidence && getConfidenceBadge(unlockedData.contactData.lastName.confidence)}
                    </div>
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <span className="text-slate-500 font-bold uppercase text-[7.5px]">Age Range</span>
                    {renderVal(unlockedData.contactData.ageRange)}
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <span className="text-slate-500 font-bold uppercase text-[7.5px]">Owner Occupied</span>
                    {renderVal(unlockedData.contactData.ownerOccupied, (v) => 
                      <span className="text-slate-200 font-bold">{v ? "Yes" : "No"}</span>
                    )}
                  </div>
                </div>

                {/* Phones */}
                <div className="space-y-1.5">
                  <span className="text-slate-500 font-bold uppercase text-[8px] tracking-wider block">
                    Phone Numbers
                  </span>
                  {unlockedData.contactData.phones?.value && unlockedData.contactData.phones.value.length > 0 ? (
                    <div className="space-y-1">
                      {unlockedData.contactData.phones.value.map((ph: PhoneEntry, i: number) => (
                        <div key={i} className="flex items-center justify-between p-2 bg-slate-900/15 border border-slate-900 rounded-md">
                          <div className="flex flex-col">
                            <span className="text-slate-200 font-mono font-bold">{ph.number}</span>
                            <span className="text-[8px] text-slate-500 capitalize">{ph.type || "unknown"}</span>
                          </div>
                          <div className="flex gap-1">
                            {ph.dncStatus ? (
                              <span className="px-1.5 py-0.2 rounded-sm bg-red-950/20 border border-red-900/30 text-red-400 text-[7.5px] font-extrabold uppercase">
                                DNC
                              </span>
                            ) : (
                              <span className="px-1.5 py-0.2 rounded-sm bg-emerald-950/20 border border-emerald-900/30 text-emerald-400 text-[7.5px] font-extrabold uppercase">
                                Active
                              </span>
                            )}
                            {ph.litigatorStatus && (
                              <span className="px-1.5 py-0.2 rounded-sm bg-red-650/15 border border-red-500/20 text-red-400 text-[7.5px] font-extrabold uppercase">
                                LIT
                              </span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="p-2 text-center text-slate-600 bg-slate-900/10 border border-slate-900 rounded border-dashed italic">
                      No phone records returned
                    </div>
                  )}
                </div>

                {/* Emails */}
                <div className="space-y-1.5">
                  <span className="text-slate-500 font-bold uppercase text-[8px] tracking-wider block">
                    Email Addresses
                  </span>
                  {unlockedData.contactData.emails?.value && unlockedData.contactData.emails.value.length > 0 ? (
                    <div className="space-y-1">
                      {unlockedData.contactData.emails.value.map((em: EmailEntry, i: number) => (
                        <div key={i} className="flex items-center justify-between p-2 bg-slate-900/15 border border-slate-900 rounded-md">
                          <span className="text-slate-200 font-bold truncate pr-3">{em.address}</span>
                          <span className={`px-1.5 py-0.2 rounded-sm text-[7.5px] font-extrabold uppercase border ${
                            em.deliverability === "deliverable"
                              ? "bg-emerald-950/20 border-emerald-900/30 text-emerald-400"
                              : "bg-slate-900 border-slate-800 text-slate-500"
                          }`}>
                            {em.deliverability || "unknown"}
                          </span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="p-2 text-center text-slate-600 bg-slate-900/10 border border-slate-900 rounded border-dashed italic">
                      No email records returned
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="py-6 text-center text-slate-600 bg-slate-900/10 border border-slate-900 rounded border-dashed italic">
                Owner Contact product was not purchased or returned empty.
              </div>
            )}
          </div>
        )}

        {activeTab === "property" && (
          <div className="space-y-3">
            <h4 className="font-extrabold text-[11px] text-slate-200 uppercase tracking-wide">
              Property Intelligence Profile
            </h4>

            {unlockedData.propertyProfile ? (
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-2 bg-slate-900/15 border border-slate-900 p-2.5 rounded-lg">
                  <div className="flex flex-col gap-0.5">
                    <span className="text-slate-500 font-bold uppercase text-[7.5px]">Year Built</span>
                    {renderVal(unlockedData.propertyProfile.yearBuilt)}
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <span className="text-slate-500 font-bold uppercase text-[7.5px]">Square Footage</span>
                    {renderVal(unlockedData.propertyProfile.squareFeet, (v) => 
                      <span className="text-slate-200 font-bold">{v.toLocaleString()} sq ft</span>
                    )}
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <span className="text-slate-500 font-bold uppercase text-[7.5px]">AVM Value</span>
                    {renderVal(unlockedData.propertyProfile.homeValue, (v) => 
                      <span className="text-slate-200 font-bold">{formatCurrency(v)}</span>
                    )}
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <span className="text-slate-500 font-bold uppercase text-[7.5px]">Lot Size</span>
                    {renderVal(unlockedData.propertyProfile.lotSize, (v) => 
                      <span className="text-slate-200 font-bold">{v} acres</span>
                    )}
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <span className="text-slate-500 font-bold uppercase text-[7.5px]">Beds / Baths</span>
                    <div className="text-slate-200 font-bold">
                      {unlockedData.propertyProfile.bedrooms?.value || "—"} bds · {unlockedData.propertyProfile.bathrooms?.value || "—"} ba
                    </div>
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <span className="text-slate-500 font-bold uppercase text-[7.5px]">Foundation Type</span>
                    {renderVal(unlockedData.propertyProfile.foundation)}
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <span className="text-slate-500 font-bold uppercase text-[7.5px]">Parcel ID</span>
                    {renderVal(unlockedData.propertyProfile.parcelId)}
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <span className="text-slate-500 font-bold uppercase text-[7.5px]">County</span>
                    {renderVal(unlockedData.propertyProfile.county)}
                  </div>
                </div>

                {/* Permits */}
                <div className="space-y-1.5">
                  <span className="text-slate-500 font-bold uppercase text-[8px] tracking-wider block">
                    Public Records & Permits
                  </span>
                  {unlockedData.propertyProfile.permits?.value && unlockedData.propertyProfile.permits.value.length > 0 ? (
                    <div className="space-y-1">
                      {unlockedData.propertyProfile.permits.value.map((per: Permit, i: number) => (
                        <div key={i} className="p-2 bg-slate-900/15 border border-slate-900 rounded-md space-y-1">
                          <div className="flex justify-between items-center text-[9px] font-bold">
                            <span className="text-slate-300 truncate">{per.description}</span>
                            {per.amount && <span className="text-red-400 font-mono shrink-0">{formatCurrency(per.amount)}</span>}
                          </div>
                          <div className="text-[7.5px] text-slate-500 font-semibold">
                            Date: {formatDate(per.date)}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="p-2 text-center text-slate-600 bg-slate-900/10 border border-slate-900 rounded border-dashed italic">
                      No permit logs found
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="py-6 text-center text-slate-600 bg-slate-900/10 border border-slate-900 rounded border-dashed italic">
                Property Profile product was not purchased or returned empty.
              </div>
            )}
          </div>
        )}

        {activeTab === "roof" && (
          <div className="space-y-3">
            <h4 className="font-extrabold text-[11px] text-slate-200 uppercase tracking-wide">
              Roof Intelligence Profile
            </h4>

            {unlockedData.roofIntelligence ? (
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-2 bg-slate-900/15 border border-slate-900 p-2.5 rounded-lg">
                  <div className="flex flex-col gap-0.5">
                    <span className="text-slate-500 font-bold uppercase text-[7.5px]">Roof Shape</span>
                    {renderVal(unlockedData.roofIntelligence.roofType)}
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <span className="text-slate-500 font-bold uppercase text-[7.5px]">Covering Material</span>
                    {renderVal(unlockedData.roofIntelligence.roofMaterial)}
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <span className="text-slate-500 font-bold uppercase text-[7.5px]">Estimated Age</span>
                    {renderVal(unlockedData.roofIntelligence.estimatedRoofAge, (v) => 
                      <span className="text-slate-200 font-bold">{v} Years</span>
                    )}
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <span className="text-slate-500 font-bold uppercase text-[7.5px]">Last Permit Date</span>
                    {renderVal(unlockedData.roofIntelligence.lastRoofPermitDate, (v) => 
                      <span className="text-slate-200 font-bold">{formatDate(v)}</span>
                    )}
                  </div>
                  <div className="flex flex-col gap-0.5 col-span-2 border-t border-slate-900/50 pt-1.5 mt-0.5">
                    <span className="text-slate-500 font-bold uppercase text-[7.5px]">Permit Summary / Notes</span>
                    {renderVal(unlockedData.roofIntelligence.permitSummary)}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 bg-slate-900/15 border border-slate-900 p-2.5 rounded-lg">
                  <div className="flex flex-col gap-0.5">
                    <span className="text-slate-500 font-bold uppercase text-[7.5px]">Provider Source</span>
                    {renderVal(unlockedData.roofIntelligence.imageryProvider)}
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <span className="text-slate-500 font-bold uppercase text-[7.5px]">Confidence Score</span>
                    {renderVal(unlockedData.roofIntelligence.confidence, (v) => getConfidenceBadge(v))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="py-6 text-center text-slate-600 bg-slate-900/10 border border-slate-900 rounded border-dashed italic">
                Roof Intelligence product was not purchased or returned empty.
              </div>
            )}
          </div>
        )}

        {activeTab === "storm" && (
          <div className="space-y-3">
            <h4 className="font-extrabold text-[11px] text-slate-200 uppercase tracking-wide">
              Storm Proximity Context
            </h4>
            <div className="grid grid-cols-2 gap-2 bg-slate-900/15 border border-slate-900 p-2.5 rounded-lg">
              <div className="flex flex-col gap-0.5">
                <span className="text-slate-500 font-bold uppercase text-[7.5px]">Target Latitude</span>
                {renderSimpleVal(unlockedData.latitude, (v) => 
                  <span className="text-slate-200 font-mono font-bold">{v.toFixed(6)}</span>
                )}
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="text-slate-500 font-bold uppercase text-[7.5px]">Target Longitude</span>
                {renderSimpleVal(unlockedData.longitude, (v) => 
                  <span className="text-slate-200 font-mono font-bold">{v.toFixed(6)}</span>
                )}
              </div>
            </div>

            <div className="p-3 bg-red-950/5 border border-red-500/20 rounded-lg flex items-center justify-between text-[10.5px]">
              <div className="flex flex-col">
                <span className="text-slate-400 font-bold uppercase text-[8px] tracking-wider block">
                  Interactive Context
                </span>
                <span className="text-slate-200 font-bold leading-tight">
                  Nearest hail report is approximately 0.4 miles.
                </span>
              </div>
              <Zap size={14} className="text-red-500 shrink-0" />
            </div>
          </div>
        )}

        {activeTab === "compliance" && (
          <div className="space-y-3.5">
            <h4 className="font-extrabold text-[11px] text-slate-200 uppercase tracking-wide">
              Provider & Compliance Audit
            </h4>
            <div className="grid grid-cols-1 gap-2 bg-slate-900/15 border border-slate-900 p-2.5 rounded-lg text-slate-350 leading-relaxed">
              <div className="space-y-1">
                <span className="text-slate-500 font-bold uppercase text-[7.5px] block">System Audit Info</span>
                <p>Provider: <strong className="text-slate-200 uppercase">{unlockedData.providerSource}</strong></p>
                <p>Access Transaction ID: <strong className="text-slate-200 font-mono">{unlockedData.unlockId}</strong></p>
              </div>
            </div>

            <div className="flex items-start gap-1.5 p-2.5 bg-red-950/10 border border-red-500/20 rounded-lg text-[9px] text-slate-400 leading-normal">
              <AlertTriangle size={12} className="text-red-500 shrink-0 mt-0.5" />
              <span>
                <strong>Lawful Use Certification</strong>: This data was accessed under signed compliance attestation. Marketing calls, SMS, and mailing outreach must comply with TCPA, DNC registry, CAN-SPAM, and state laws.
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
export default UnlockedLeadDetails;
