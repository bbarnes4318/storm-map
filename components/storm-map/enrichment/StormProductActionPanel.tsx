"use client";

import React from "react";
import { FileText, PhoneCall, CalendarDays, Check, Sparkles, AlertCircle, MapPin, Target } from "lucide-react";

export type ProductType = 
  | "STORM_REPORT_ADDRESSES"
  | "STORM_REPORT_CONTACT"
  | "ROOF_INSPECTION_APPOINTMENTS";

export interface StormAreaContextData {
  label: string;
  county?: string;
  state?: string;
  center: [number, number];
  radius: number;
  reportsCount: number;
  primaryThreat: string;
  score: number;
}

export interface PropertyContextData {
  fullAddress: string;
  latitude: number;
  longitude: number;
  city?: string;
  state?: string;
  postcode?: string;
  confidence: string;
}

interface StormProductActionPanelProps {
  contextType: "storm-area" | "property";
  contextData: StormAreaContextData | PropertyContextData;
  onSelectProduct: (product: ProductType) => void;
  compact?: boolean; // Keep prop signature intact, but map both to premium selectors
}

export function StormProductActionPanel({
  contextType,
  contextData,
  onSelectProduct,
  compact = false,
}: StormProductActionPanelProps) {

  // Parse storm-area data safely
  const getStormAreaContext = () => {
    if (contextType !== "storm-area") return null;
    const data = contextData as StormAreaContextData;
    
    const parts = [];
    if (data.county && !data.county.includes("undefined") && !data.county.includes("null")) {
      parts.push(`Selected Area: ${data.county} County, ${data.state || "USA"}`);
    } else if (data.label && !data.label.includes("undefined")) {
      parts.push(`Selected Area: ${data.label}`);
    }
    
    if (data.radius && !isNaN(data.radius) && data.radius > 0) {
      parts.push(`Radius: ${data.radius} mi`);
    }
    if (data.reportsCount && !isNaN(data.reportsCount) && data.reportsCount > 0) {
      parts.push(`Reports: ${data.reportsCount}`);
    }
    if (data.primaryThreat && data.primaryThreat !== "N/A" && data.primaryThreat !== "undefined") {
      parts.push(`Threat: ${data.primaryThreat.toUpperCase()}`);
    }
    
    return parts.join("  |  ");
  };

  // Parse property data safely
  const getPropertyContext = () => {
    if (contextType !== "property") return null;
    const data = contextData as PropertyContextData;
    const parts = [];
    if (data.fullAddress) {
      parts.push(`Address: ${data.fullAddress}`);
    }
    if (data.confidence && data.confidence !== "unknown") {
      parts.push(`Confidence: ${data.confidence.toUpperCase()}`);
    }
    return parts.join("  |  ");
  };

  const stormContextStr = getStormAreaContext();
  const propertyContextStr = getPropertyContext();

  return (
    <div className="space-y-4 select-none">
      {/* Premium Decision Header */}
      <div className="space-y-1 pb-2 border-b border-[#145CFF]/15">
        <h3 className="font-extrabold text-[12px] md:text-[13px] text-[#F8FAFC] uppercase tracking-wide leading-tight">
          {contextType === "storm-area" 
            ? "Turn This Storm Area Into Roofing Opportunities"
            : "Access Homeowner & Property Intelligence"
          }
        </h3>
        <p className="text-[9.5px] text-slate-400 leading-snug">
          {contextType === "storm-area"
            ? "Choose how you want to convert this storm activity into property lists, homeowner contacts, or booked inspection appointments."
            : "Choose how you want to convert this property address into homeowner contacts, data reports, or booked inspection appointments."
          }
        </p>
      </div>

      {/* Dynamic Context Header Row */}
      {contextType === "storm-area" && stormContextStr && (
        <div className="text-[8.5px] text-slate-500 font-mono tracking-tight bg-[#0B1220]/40 p-1.5 rounded border border-slate-900/60 leading-none">
          {stormContextStr}
        </div>
      )}
      {contextType === "property" && propertyContextStr && (
        <div className="text-[8.5px] text-slate-500 font-mono tracking-tight bg-[#0B1220]/40 p-1.5 rounded border border-slate-900/60 truncate leading-none" title={propertyContextStr}>
          {propertyContextStr}
        </div>
      )}

      {/* Three Decision Cards */}
      <div className="space-y-3.5 pb-5">
        
        {/* CARD 1: ENTRY PRODUCT */}
        <div className="p-3 rounded-lg border bg-[#0B1220]/80 border-[#145CFF]/15 hover:border-[#145CFF]/45 transition-all flex flex-col gap-2 relative group shadow-[0_4px_20px_rgba(0,0,0,0.15)]">
          <div className="flex justify-between items-start">
            <span className="px-1.5 py-0.5 rounded bg-[#145CFF]/10 text-[#145CFF] text-[8px] font-black uppercase tracking-wider border border-[#145CFF]/20 leading-none">
              Property Targeting
            </span>
            <span className="text-[8px] text-[#145CFF] font-bold">Entry Level</span>
          </div>

          <div className="flex items-start gap-2">
            <FileText size={14} className="text-[#145CFF] shrink-0 mt-0.5" />
            <div className="min-w-0">
              <h4 className="font-extrabold text-[11px] text-[#F8FAFC]">
                Storm Report + Address List
              </h4>
              <p className="text-[9.5px] text-slate-400 leading-snug mt-1">
                Generate a storm-area report and collect available property addresses inside the selected radius.
              </p>
              <div className="text-[9px] text-slate-500 mt-1.5 leading-snug">
                <span className="font-bold text-slate-400">Best for: </span>
                Contractors who want to review affected streets and build their own outreach list.
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-x-2 gap-y-0.5 border-t border-slate-900 pt-2 text-[8.5px] text-slate-500">
            <div className="flex items-center gap-1"><Check size={8} className="text-[#0E8F6E]" /> Storm area summary</div>
            <div className="flex items-center gap-1"><Check size={8} className="text-[#0E8F6E]" /> Hail/wind metrics</div>
            <div className="flex items-center gap-1"><Check size={8} className="text-[#0E8F6E]" /> Property addresses</div>
            <div className="flex items-center gap-1"><Check size={8} className="text-[#0E8F6E]" /> CSV export-ready list</div>
          </div>

          <button
            type="button"
            onClick={() => onSelectProduct("STORM_REPORT_ADDRESSES")}
            className="w-full text-center py-2 px-3 rounded bg-[#145CFF] hover:bg-[#2570FF] text-white text-[9.5px] font-black uppercase tracking-wider transition-all active:scale-[0.98] cursor-pointer shadow-md shadow-[#145CFF]/10 mt-1"
          >
            Generate Address List
          </button>
        </div>

        {/* CARD 2: CORE RECOMMENDED PRODUCT */}
        <div className="p-3.5 rounded-lg border bg-[#0B1220]/90 border-[#145CFF]/30 hover:border-[#145CFF]/60 transition-all flex flex-col gap-2 relative group shadow-[0_4px_24px_rgba(20,92,255,0.08)]">
          <div className="flex justify-between items-start">
            <span className="px-2 py-0.5 rounded bg-[#145CFF] text-[#F8FAFC] text-[8px] font-black uppercase tracking-widest leading-none">
              Most Popular
            </span>
            <span className="text-[8.5px] text-[#0E8F6E] font-black uppercase tracking-wider animate-pulse flex items-center gap-1">
              <span className="h-1 w-1 bg-[#0E8F6E] rounded-full"></span>
              Core Data
            </span>
          </div>

          <div className="flex items-start gap-2">
            <PhoneCall size={14} className="text-[#145CFF] shrink-0 mt-0.5 animate-pulse" />
            <div className="min-w-0">
              <h4 className="font-extrabold text-[11.5px] text-[#F8FAFC]">
                Homeowner Contact Data
              </h4>
              <p className="text-[9.5px] text-slate-400 leading-snug mt-1">
                Start with a selected property address and request homeowner contact information where provider data is available.
              </p>
              <div className="text-[9px] text-slate-500 mt-1.5 leading-snug">
                <span className="font-bold text-slate-400">Best for: </span>
                Contractors who want names, phone, and email data for targeted storm outreach.
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-x-2 gap-y-0.5 border-t border-slate-900 pt-2 text-[8.5px] text-slate-500">
            <div className="flex items-center gap-1"><Check size={8} className="text-[#0E8F6E]" /> Homeowner names</div>
            <div className="flex items-center gap-1"><Check size={8} className="text-[#0E8F6E]" /> Phone numbers</div>
            <div className="flex items-center gap-1"><Check size={8} className="text-[#0E8F6E]" /> Email addresses</div>
            <div className="flex items-center gap-1"><Check size={8} className="text-[#0E8F6E]" /> Property details</div>
          </div>

          <button
            type="button"
            onClick={() => onSelectProduct("STORM_REPORT_CONTACT")}
            className="w-full text-center py-2 px-3 rounded bg-[#145CFF] hover:bg-[#2570FF] text-white text-[9.5px] font-black uppercase tracking-wider transition-all active:scale-[0.98] cursor-pointer shadow-md shadow-[#145CFF]/15 mt-1"
          >
            Get Homeowner Contact Info
          </button>
        </div>

        {/* CARD 3: PREMIUM PRODUCT */}
        <div className="p-3.5 rounded-lg border bg-gradient-to-br from-[#0B1220]/90 to-[#0E8F6E]/5 border-[#0E8F6E]/20 hover:border-[#0E8F6E]/40 transition-all flex flex-col gap-2 relative group shadow-[0_4px_24px_rgba(14,143,110,0.06)]">
          <div className="flex justify-between items-start">
            <span className="px-2 py-0.5 rounded bg-[#0E8F6E] text-[#F8FAFC] text-[8px] font-black uppercase tracking-widest leading-none">
              Highest Value
            </span>
            <span className="text-[8.5px] text-[#0E8F6E] font-extrabold italic uppercase tracking-wider"> FULFILLMENT </span>
          </div>

          <div className="flex items-start gap-2">
            <CalendarDays size={14} className="text-[#0E8F6E] shrink-0 mt-0.5" />
            <div className="min-w-0">
              <h4 className="font-extrabold text-[11.5px] text-[#F8FAFC] uppercase tracking-wide">
                Inspection Appointments
              </h4>
              <p className="text-[9.5px] text-slate-400 leading-snug mt-1">
                Request confirmed roof inspection appointments from the selected storm opportunity area.
              </p>
              <div className="text-[9px] text-[#0E8F6E] font-black uppercase tracking-wider mt-1.5 leading-snug italic">
                Booked inspections are the outcome.
              </div>
              <div className="text-[9px] text-slate-550 mt-1 leading-snug">
                <span className="font-bold text-slate-500">Best for: </span>
                Contractors who want booked inspection opportunities instead of raw data.
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-x-2 gap-y-0.5 border-t border-slate-900/60 pt-2 text-[8.5px] text-slate-500">
            <div className="flex items-center gap-1"><Check size={8} className="text-[#0E8F6E]" /> Damage pre-screen</div>
            <div className="flex items-center gap-1"><Check size={8} className="text-[#0E8F6E]" /> Calendar scheduled</div>
            <div className="flex items-center gap-1"><Check size={8} className="text-[#0E8F6E]" /> Route-ready details</div>
            <div className="flex items-center gap-1"><Check size={8} className="text-[#0E8F6E]" /> 100% Exclusive</div>
          </div>

          <button
            type="button"
            onClick={() => onSelectProduct("ROOF_INSPECTION_APPOINTMENTS")}
            className="w-full text-center py-2 px-3 rounded bg-[#0E8F6E] hover:bg-[#00A86B] text-white text-[9.5px] font-black uppercase tracking-wider transition-all active:scale-[0.98] cursor-pointer shadow-md shadow-[#0E8F6E]/15 mt-1 border-none"
          >
            Request Inspection Appointments
          </button>
        </div>

      </div>
    </div>
  );
}

export default StormProductActionPanel;
