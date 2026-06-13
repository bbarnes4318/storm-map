"use client";

import React from "react";
import { FileText, PhoneCall, CalendarDays, Check, Sparkles } from "lucide-react";

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
  compact?: boolean;
}

export function StormProductActionPanel({
  contextType,
  contextData,
  onSelectProduct,
  compact = false,
}: StormProductActionPanelProps) {
  
  if (compact) {
    // Compact footer layout for map detail popups
    return (
      <div className="flex flex-col gap-2 pt-2 border-t border-slate-900/50 w-full">
        <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest block text-center mb-0.5">
          Choose Outreach Product
        </span>
        <div className="grid grid-cols-3 gap-1.5 w-full">
          <button
            onClick={() => onSelectProduct("STORM_REPORT_ADDRESSES")}
            className="py-1.5 px-1 rounded bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-200 hover:text-white text-[8px] font-black uppercase tracking-wider transition-all active:scale-[0.98] text-center truncate cursor-pointer"
            title="Generate Address List"
          >
            1. Generate Addresses
          </button>
          <button
            onClick={() => onSelectProduct("STORM_REPORT_CONTACT")}
            className="py-1.5 px-1 rounded bg-slate-900 border border-slate-850 hover:border-slate-750 text-slate-200 hover:text-white text-[8px] font-black uppercase tracking-wider transition-all active:scale-[0.98] text-center truncate cursor-pointer"
            title="Get Homeowner Contact Info"
          >
            2. Get Contact Info
          </button>
          <button
            onClick={() => onSelectProduct("ROOF_INSPECTION_APPOINTMENTS")}
            className="py-1.5 px-1 rounded bg-red-650 hover:bg-red-600 text-white text-[8px] font-black uppercase tracking-widest transition-all active:scale-[0.98] text-center truncate cursor-pointer flex items-center justify-center gap-0.5 shadow-md shadow-red-950/20"
            title="Request Confirmed Roof Inspection Appointments"
          >
            <Sparkles size={8} className="animate-pulse" />
            3. Request Appts
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between px-0.5">
        <span className="text-[9.5px] font-black text-slate-500 uppercase tracking-wider">
          Choose Outreach Product
        </span>
      </div>
      <p className="text-[9px] text-slate-500 leading-snug px-0.5 -mt-1">
        Select how you want to turn this storm opportunity into roofing leads or appointments.
      </p>

      <div className="space-y-3">
        {/* CARD 1: Detailed Storm Report + Addresses */}
        <div className="p-3 rounded-lg border bg-slate-900/40 border-slate-900 hover:border-slate-800 transition-all flex flex-col gap-2">
          <div className="flex items-start gap-1.5">
            <FileText size={13} className="text-blue-400 mt-0.5 shrink-0" />
            <div>
              <h4 className="font-extrabold text-[11px] text-slate-200">
                Detailed Storm Report + Addresses
              </h4>
              <p className="text-[9.5px] text-slate-400 leading-snug mt-0.5">
                Get the storm event report, affected area summary, and available property addresses inside the selected storm target area.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-x-2 gap-y-0.5 border-t border-slate-950/40 pt-1.5 text-[8.5px] text-slate-500">
            <div className="flex items-center gap-1"><Check size={8} className="text-emerald-500" /> Storm event summary</div>
            <div className="flex items-center gap-1"><Check size={8} className="text-emerald-500" /> Hail/wind report details</div>
            <div className="flex items-center gap-1"><Check size={8} className="text-emerald-500" /> Affected area context</div>
            <div className="flex items-center gap-1"><Check size={8} className="text-emerald-500" /> Property addresses</div>
            <div className="flex items-center gap-1 col-span-2"><Check size={8} className="text-emerald-500" /> Export-ready lead spreadsheet</div>
          </div>

          <button
            onClick={() => onSelectProduct("STORM_REPORT_ADDRESSES")}
            className="w-full text-center py-1.5 px-2.5 rounded bg-slate-950 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-slate-100 text-[9.5px] font-black uppercase tracking-wider transition-all active:scale-[0.98] cursor-pointer"
          >
            Generate Address List
          </button>
        </div>

        {/* CARD 2: Storm Report + Homeowner Contact Information */}
        <div className="p-3 rounded-lg border bg-slate-900/40 border-slate-900 hover:border-slate-800 transition-all flex flex-col gap-2">
          <div className="flex items-start gap-1.5">
            <PhoneCall size={13} className="text-violet-400 mt-0.5 shrink-0" />
            <div>
              <h4 className="font-extrabold text-[11px] text-slate-200">
                Detailed Storm Report + Addresses + Full Homeowner Contact Information
              </h4>
              <p className="text-[9.5px] text-slate-400 leading-snug mt-0.5">
                Get the detailed storm report, property addresses, and homeowner contact information where available.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-x-2 gap-y-0.5 border-t border-slate-950/40 pt-1.5 text-[8.5px] text-slate-500">
            <div className="flex items-center gap-1"><Check size={8} className="text-emerald-500" /> Address list included</div>
            <div className="flex items-center gap-1"><Check size={8} className="text-emerald-500" /> Homeowner names</div>
            <div className="flex items-center gap-1"><Check size={8} className="text-emerald-500" /> Verified mobile numbers</div>
            <div className="flex items-center gap-1"><Check size={8} className="text-emerald-500" /> Email addresses</div>
            <div className="flex items-center gap-1"><Check size={8} className="text-emerald-500" /> Mailing addresses</div>
            <div className="flex items-center gap-1"><Check size={8} className="text-emerald-500" /> Property/roof previews</div>
          </div>

          <button
            onClick={() => onSelectProduct("STORM_REPORT_CONTACT")}
            className="w-full text-center py-1.5 px-2.5 rounded bg-slate-950 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-slate-100 text-[9.5px] font-black uppercase tracking-wider transition-all active:scale-[0.98] cursor-pointer"
          >
            Get Homeowner Contact Info
          </button>
        </div>

        {/* CARD 3: Visually Emphasized - Exclusive Roof Inspection Appointments */}
        <div className="p-3.5 rounded-lg border bg-gradient-to-br from-red-950/10 to-red-950/5 border-red-500/30 hover:border-red-500/50 shadow-lg shadow-red-950/10 transition-all flex flex-col gap-2 relative overflow-hidden group">
          <span className="absolute top-2 right-2 px-1.5 py-0.2 rounded bg-red-500/15 border border-red-500/25 text-red-400 text-[7.5px] font-black uppercase tracking-widest leading-none">
            Highest Value
          </span>

          <div className="flex items-start gap-1.5">
            <CalendarDays size={14} className="text-red-500 mt-0.5 shrink-0" />
            <div className="min-w-0">
              <h4 className="font-black text-[11.5px] text-slate-100 uppercase tracking-wide">
                Exclusive Roof Inspection Appointments
              </h4>
              <p className="text-[8.5px] text-red-400 font-extrabold uppercase mt-0.5 tracking-wider italic">
                Raw data is optional. Booked inspections are the outcome.
              </p>
              <p className="text-[9.5px] text-slate-350 leading-snug mt-1">
                Have us turn storm-hit property opportunities into confirmed in-person roof inspection appointments.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-x-2 gap-y-0.5 border-t border-red-900/10 pt-1.5 text-[8.5px] text-slate-400">
            <div className="flex items-center gap-1"><Check size={8} className="text-red-500" /> Target opportunities</div>
            <div className="flex items-center gap-1"><Check size={8} className="text-red-500" /> Homeowner outreach</div>
            <div className="flex items-center gap-1"><Check size={8} className="text-red-500" /> Interest qualification</div>
            <div className="flex items-center gap-1"><Check size={8} className="text-red-500" /> Confirmed scheduling</div>
            <div className="flex items-center gap-1"><Check size={8} className="text-red-500" /> Route-ready appointment</div>
            <div className="flex items-center gap-1"><Check size={8} className="text-red-500" /> No-show replacements</div>
          </div>

          <button
            onClick={() => onSelectProduct("ROOF_INSPECTION_APPOINTMENTS")}
            className="w-full text-center py-2 px-3 rounded-lg bg-red-650 hover:bg-red-600 text-white text-[10px] font-black uppercase tracking-widest transition-all active:scale-[0.98] cursor-pointer flex items-center justify-center gap-1 shadow-md hover:shadow-red-950/40"
          >
            <Sparkles size={11} className="animate-pulse text-red-200" />
            Request Inspection Appointments
          </button>
        </div>
      </div>
    </div>
  );
}
