"use client";

import React from "react";
import { Check, Shield, Layers, Calendar, ChevronRight } from "lucide-react";

interface ProductCard {
  id: string;
  title: string;
  badge: string;
  desc: string;
  bestFor: string;
  ctaText: string;
  icon: React.ReactNode;
}

interface DemoProductCardsProps {
  selectedProductId: string;
  onSelectProduct: (id: string) => void;
}

export default function DemoProductCards({ selectedProductId, onSelectProduct }: DemoProductCardsProps) {
  const cards: ProductCard[] = [
    {
      id: "platform",
      title: "StormTarget Live",
      badge: "Full Platform Access",
      desc: "Use the complete StormTarget system to track storms, analyze impact areas, identify high-opportunity properties, and access homeowner contact intelligence in near real time.",
      bestFor: "Contractors who want to find, analyze, and work storm opportunities themselves.",
      ctaText: "Start Using StormTarget Live",
      icon: <Layers className="text-[#145CFF]" size={22} />,
    },
    {
      id: "report",
      title: "Hail Strike Report",
      badge: "Leads Only",
      desc: "Get a targeted lead report built around a specific storm-hit market, ZIP code, county, or neighborhood. No platform subscription required.",
      bestFor: "Contractors who want storm leads without using the full platform.",
      ctaText: "Request Hail Strike Report",
      icon: <Shield className="text-[#0E8F6E]" size={22} />,
    },
    {
      id: "appointments",
      title: "Homeowner Appointments",
      badge: "Done For You",
      desc: "We use StormTarget data to identify affected homeowners, contact them, confirm interest, and schedule roof inspection appointments for your team.",
      bestFor: "Contractors who want booked appointments instead of raw leads.",
      ctaText: "Request Appointments",
      icon: <Calendar className="text-[#FBBF24]" size={22} />,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6 w-full max-w-5xl mx-auto">
      {cards.map((card) => {
        const isSelected = card.id === selectedProductId;
        return (
          <div
            key={card.id}
            onClick={() => onSelectProduct(card.id)}
            className={`flex flex-col h-full bg-[#0B1930]/40 rounded-2xl p-5 border transition-all duration-300 hover:-translate-y-1 cursor-pointer select-none group relative ${
              isSelected
                ? "border-[#145CFF] bg-[#145CFF]/5 shadow-xl shadow-[#145CFF]/5"
                : "border-[#145CFF]/15 hover:border-[#145CFF]/30 hover:bg-[#0B1930]/80"
            }`}
          >
            {/* Top Row with Icon & Selection indicator */}
            <div className="flex items-center justify-between pb-3.5 border-b border-[#145CFF]/10 mb-3.5">
              <div className="p-2 rounded-xl bg-[#050B16] border border-[#145CFF]/10">
                {card.icon}
              </div>
              <div
                className={`w-5 h-5 rounded-full border flex items-center justify-center transition-all ${
                  isSelected
                    ? "bg-[#145CFF] border-[#145CFF] text-[#F8FAFC]"
                    : "border-slate-700 group-hover:border-slate-500"
                }`}
              >
                {isSelected && <Check size={11} strokeWidth={3} />}
              </div>
            </div>

            {/* Badge & Title */}
            <span
              className={`text-[8.5px] font-extrabold uppercase tracking-widest leading-none mb-1 text-slate-500`}
            >
              {card.badge}
            </span>
            <h4 className="text-sm font-black text-[#F8FAFC] tracking-tight leading-tight mb-2 flex items-center gap-1.5">
              {card.title}
            </h4>

            {/* Description */}
            <p className="text-[10px] text-slate-400 leading-relaxed font-semibold mb-4 flex-1">
              {card.desc}
            </p>

            {/* Best For Section */}
            <div className="bg-[#050B16]/60 border border-[#145CFF]/10 rounded-lg p-3 text-[9.5px] leading-snug text-slate-400 font-semibold mb-4">
              <span className="text-[8px] font-black text-[#145CFF] uppercase block tracking-wider mb-0.5">
                Best For:
              </span>
              {card.bestFor}
            </div>

            {/* CTA button */}
            <div
              className={`w-full py-2 px-3 rounded-lg text-[10px] font-black uppercase tracking-wider text-center transition-all flex items-center justify-center gap-1 border ${
                isSelected
                  ? "bg-[#145CFF] text-[#F8FAFC] border-[#145CFF]"
                  : "bg-transparent text-slate-400 border-slate-700 group-hover:border-[#145CFF]/50 group-hover:text-[#F8FAFC]"
              }`}
            >
              <span>{card.ctaText}</span>
              <ChevronRight size={10} strokeWidth={2} />
            </div>

            {/* Absolute selected indicator bar at top */}
            {isSelected && (
              <div className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl bg-[#145CFF]" />
            )}
          </div>
        );
      })}
    </div>
  );
}
