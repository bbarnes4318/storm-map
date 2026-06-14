"use client";

import React from "react";
import { Check } from "lucide-react";

interface DemoProgressProps {
  currentStep: number; // 1 to 6
  onStepClick: (step: number) => void;
}

const STEPS = [
  { label: "Intro", desc: "Hero Overview" },
  { label: "Market", desc: "Target Selector" },
  { label: "Scan", desc: "Storm Scan" },
  { label: "Opportunity", desc: "Scan Results" },
  { label: "Options", desc: "Action Paths" },
  { label: "Start", desc: "Final CTA" },
];

export default function DemoProgress({ currentStep, onStepClick }: DemoProgressProps) {
  return (
    <div className="w-full flex items-center justify-between px-6 py-3 bg-[#050B16] border-b border-[#145CFF]/15 select-none shrink-0 z-50">
      {/* Brand Logo & Indicator */}
      <div className="flex items-center gap-3">
        <img
          src="/storm-map/brand/stormtarget-live-logo-transparent.png"
          alt="STORMTARGET | Live"
          className="h-7 w-auto object-contain"
          draggable={false}
        />
        <span className="text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-[#145CFF]/10 text-[#145CFF] border border-[#145CFF]/25">
          Interactive Demo
        </span>
      </div>

      {/* Step Timeline */}
      <div className="hidden md:flex items-center gap-6 lg:gap-8">
        {STEPS.map((step, idx) => {
          const stepNum = idx + 1;
          const isActive = stepNum === currentStep;
          const isCompleted = stepNum < currentStep;

          return (
            <button
              key={step.label}
              onClick={() => onStepClick(stepNum)}
              className="flex items-center gap-2 group transition-all text-left focus:outline-none cursor-pointer"
            >
              {/* Step Circle */}
              <div
                className={`w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-bold border transition-all ${
                  isActive
                    ? "bg-[#145CFF] border-[#145CFF] text-[#F8FAFC] shadow-lg shadow-[#145CFF]/20"
                    : isCompleted
                    ? "bg-[#0E8F6E]/12 border-[#0E8F6E] text-[#00A86B]"
                    : "bg-[#050B16] border-slate-700 text-slate-500 group-hover:border-slate-500 group-hover:text-slate-400"
                }`}
              >
                {isCompleted ? <Check size={10} strokeWidth={3} /> : stepNum}
              </div>

              {/* Step Label */}
              <div className="flex flex-col">
                <span
                  className={`text-[9px] font-extrabold uppercase tracking-wider leading-none transition-colors ${
                    isActive
                      ? "text-[#F8FAFC]"
                      : isCompleted
                      ? "text-[#00A86B]"
                      : "text-slate-500 group-hover:text-slate-400"
                  }`}
                >
                  {step.label}
                </span>
                <span className="text-[7.5px] text-slate-600 font-semibold leading-none mt-0.5">
                  {step.desc}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Mobile Step summary */}
      <div className="flex md:hidden items-center gap-1.5 text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
        <span>Step {currentStep} of 6</span>
        <span className="text-slate-600">|</span>
        <span className="text-slate-200">{STEPS[currentStep - 1].label}</span>
      </div>

      {/* Top right escape / map button */}
      <div>
        <a
          href="/storm-map"
          className="text-[9px] font-extrabold uppercase tracking-wider px-3 py-1.5 rounded bg-[rgba(20,92,255,0.06)] hover:bg-[#145CFF]/12 border border-[rgba(20,92,255,0.15)] hover:border-[#145CFF]/40 text-[#F8FAFC] transition-all cursor-pointer"
        >
          Exit to Live Map
        </a>
      </div>
    </div>
  );
}
