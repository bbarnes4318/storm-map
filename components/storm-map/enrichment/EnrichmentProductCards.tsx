import React from "react";
import { DataProductType } from "@/lib/enrichment/schemas";
import { Home, Phone, Shield, Zap, Check } from "lucide-react";

interface ProductOption {
  type: DataProductType;
  title: string;
  credits: number;
  badge?: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  description: string;
  includes: string[];
}

const PRODUCTS: ProductOption[] = [
  {
    type: "PROPERTY_PROFILE",
    title: "Property Profile",
    credits: 5,
    icon: Home,
    description: "Public record property metrics & valuation.",
    includes: [
      "Year built & square footage",
      "AVM home valuation estimate",
      "Bedrooms & bathrooms",
      "Parcel ID & county tax info",
    ],
  },
  {
    type: "OWNER_CONTACT",
    title: "Homeowner Contact Information",
    credits: 10,
    icon: Phone,
    description: "Direct homeowner contact details.",
    includes: [
      "owner name when available",
      "phone numbers when available",
      "emails when available",
      "mailing address when available",
      "contact confidence/source indicators",
    ],
  },
  {
    type: "ROOF_INTELLIGENCE",
    title: "Roof Intelligence",
    credits: 10,
    icon: Shield,
    description: "Historical roof data and storm impact details.",
    includes: [
      "Roof type & shingle material",
      "Estimated roof age",
      "Historic roofing permit dates",
      "Imagery provider details",
    ],
  },
  {
    type: "FULL_STORM_LEAD",
    title: "Full Storm Lead",
    credits: 20,
    badge: "Best Value",
    icon: Zap,
    description: "Complete dossier for maximum outreach efficiency.",
    includes: [
      "Property facts & square footage",
      "Owner contact name",
      "Phones & Emails (DNC flagged)",
      "Roof type, age & permits",
      "Storm proximity context",
    ],
  },
];

interface EnrichmentProductCardsProps {
  onSelectProduct: (type: DataProductType) => void;
  disabled?: boolean;
}

export function EnrichmentProductCards({
  onSelectProduct,
  disabled = false,
}: EnrichmentProductCardsProps) {
  return (
    <div className="space-y-2.5">
      <div className="flex items-center justify-between px-0.5">
        <span className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider">
          Select Enrichment Tier
        </span>
        <span className="text-[9px] text-slate-400 italic">
          Data availability varies by area
        </span>
      </div>

      <div className="space-y-2">
        {PRODUCTS.map((prod) => {
          const Icon = prod.icon;
          const isRecommended = prod.type === "FULL_STORM_LEAD";
          
          return (
            <div
              key={prod.type}
              onClick={() => !disabled && onSelectProduct(prod.type)}
              className={`p-3 rounded-lg border transition-all flex flex-col gap-2 relative cursor-pointer select-none group ${
                disabled
                  ? "bg-slate-900/10 border-slate-900/40 opacity-60 cursor-not-allowed"
                  : isRecommended
                  ? "bg-red-950/5 border-red-500/30 hover:border-red-500/50 shadow-md shadow-red-950/10 hover:bg-red-950/10"
                  : "bg-slate-900/40 hover:bg-slate-900 border-slate-900 hover:border-slate-800"
              }`}
            >
              {prod.badge && (
                <span className="absolute top-2 right-2 px-1.5 py-0.2 rounded bg-red-500/15 border border-red-500/25 text-red-400 text-[8px] font-extrabold uppercase tracking-wide">
                  {prod.badge}
                </span>
              )}

              {/* Title & Cost */}
              <div className="flex justify-between items-start pr-16">
                <div className="flex items-center gap-1.5">
                  <Icon size={12} className={isRecommended ? "text-red-500" : "text-slate-400 group-hover:text-slate-300"} />
                  <h4 className="font-extrabold text-xs text-slate-200">
                    {prod.title}
                  </h4>
                </div>
                <div className="flex items-center gap-1 bg-slate-950/60 px-1.5 py-0.5 rounded border border-slate-800 shrink-0">
                  <span className="font-black text-slate-200 text-[10px]">
                    {prod.credits}
                  </span>
                  <span className="text-slate-500 text-[8px] font-bold uppercase">
                    Credits
                  </span>
                </div>
              </div>

              {/* Description */}
              <p className="text-[9.5px] text-slate-400 leading-tight">
                {prod.description}
              </p>

              {/* Bullet Features */}
              <div className="grid grid-cols-1 gap-0.5 border-t border-slate-900/60 pt-1.5 mt-0.5">
                {prod.includes.map((inc, i) => (
                  <div key={i} className="flex items-center gap-1.5 text-[8.5px] text-slate-500">
                    <Check size={8} className="text-emerald-500 shrink-0" />
                    <span className="truncate">{inc}</span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
export default EnrichmentProductCards;
