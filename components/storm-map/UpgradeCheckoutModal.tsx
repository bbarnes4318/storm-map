"use client";

import React from "react";
import { X, Check, Lock, Send, Sparkles, Building, Landmark, Mail, Phone, User } from "lucide-react";

interface UpgradeCheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  county: string;
  state: string;
}

export function UpgradeCheckoutModal({
  isOpen,
  onClose,
  county,
  state,
}: UpgradeCheckoutModalProps) {
  const [formSubmitted, setFormSubmitted] = React.useState(false);
  const [name, setName] = React.useState("");
  const [company, setCompany] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [tier, setTier] = React.useState<"county" | "nationwide">("county");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) {
      alert("Please fill in your Name and Email address.");
      return;
    }
    setFormSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-[4000] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm select-none animate-in fade-in duration-300">
      
      {/* Modal Card Container */}
      <div className="w-full max-w-2xl bg-[#071426] border border-[rgba(20,92,255,0.25)] rounded-2xl shadow-2xl flex flex-col overflow-hidden select-text animate-in scale-in duration-300">
        
        {/* Glow Top Line */}
        <div className="h-1 bg-gradient-to-r from-[#145CFF] via-[#8B5CF6] to-[#F43F5E]" />

        {/* Modal Header */}
        <div className="p-4 border-b border-[rgba(20,92,255,0.15)] flex items-center justify-between shrink-0 bg-[#0B1930]/40">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#FBBF24]" />
            <div>
              <h2 className="text-sm font-black text-[#F8FAFC] uppercase tracking-wider leading-tight">
                Unlock StormTarget Intelligence
              </h2>
              <p className="text-[10px] text-slate-400 font-medium">
                Subscribe to get instant access to verified homeowner leads and roofing targets.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1 rounded-full border border-slate-800 hover:border-slate-700 text-slate-400 hover:text-[#F8FAFC] transition-colors cursor-pointer shrink-0"
            title="Close Checkout"
          >
            <X size={14} />
          </button>
        </div>

        {formSubmitted ? (
          /* Success State View */
          <div className="p-8 text-center space-y-4 flex flex-col items-center justify-center">
            <div className="w-14 h-14 bg-[#0E8F6E]/12 border border-[#00A86B]/35 rounded-full flex items-center justify-center animate-bounce shadow-glow-hail">
              <Check className="w-8 h-8 text-[#00A86B]" />
            </div>
            <div className="space-y-1.5 max-w-sm">
              <h3 className="text-base font-black text-[#F8FAFC] uppercase tracking-wider">
                Subscription Request Received
              </h3>
              <p className="text-[10.5px] text-slate-400 leading-relaxed font-semibold">
                Thank you! Our territory manager has locked in your request. We will reach out to you at <span className="text-[#F8FAFC] font-extrabold">{email}</span> within 2 hours to unlock your market!
              </p>
            </div>
            <button
              onClick={onClose}
              className="px-6 py-2 bg-[#145CFF] hover:bg-[#2570FF] rounded-lg text-xs font-bold text-[#F8FAFC] transition-colors cursor-pointer shadow-md shadow-[#145CFF]/15"
            >
              Back to Map
            </button>
          </div>
        ) : (
          /* Form / Details View */
          <div className="p-5 grid grid-cols-1 md:grid-cols-2 gap-5 overflow-y-auto max-h-[70vh]">
            
            {/* Left Column: Tiers Selection */}
            <div className="space-y-4">
              <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest block pl-0.5">
                Choose Subscription Plan
              </span>
              
              <div className="space-y-3">
                {/* County Plan Card */}
                <div
                  onClick={() => setTier("county")}
                  className={`p-3.5 rounded-xl border transition-all cursor-pointer text-left select-none relative ${
                    tier === "county"
                      ? "bg-[#0B1930]/60 border-[#145CFF] shadow-[0_0_15px_rgba(20,92,255,0.15)]"
                      : "bg-[#050B16]/40 border-slate-900 hover:border-slate-800"
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <span className="text-xs font-black text-[#F8FAFC] uppercase">County License</span>
                    <span className="text-xs font-black text-[#145CFF]">$149<span className="text-[8.5px] text-slate-500 font-bold uppercase">/mo</span></span>
                  </div>
                  <p className="text-[9.5px] text-[#94A3B8] font-medium mt-1 leading-snug">
                    Unlock all active storm reports, homeowner opportunities, and lead downloads in <span className="text-slate-200 font-extrabold">{county} County, {state}</span>.
                  </p>
                  <ul className="mt-2.5 space-y-1 text-[8.5px] font-extrabold text-[#94A3B8] uppercase tracking-wide">
                    <li className="flex items-center gap-1.5"><Check size={10} className="text-[#00A86B]" /> Address Verification</li>
                    <li className="flex items-center gap-1.5"><Check size={10} className="text-[#00A86B]" /> Roof Age & Property Details</li>
                    <li className="flex items-center gap-1.5"><Check size={10} className="text-[#00A86B]" /> 1-Click CSV File Download</li>
                  </ul>
                </div>

                {/* Enterprise/Nationwide Plan Card */}
                <div
                  onClick={() => setTier("nationwide")}
                  className={`p-3.5 rounded-xl border transition-all cursor-pointer text-left select-none relative ${
                    tier === "nationwide"
                      ? "bg-[#0B1930]/60 border-[#8B5CF6] shadow-[0_0_15px_rgba(139,92,246,0.15)]"
                      : "bg-[#050B16]/40 border-slate-900 hover:border-slate-800"
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <span className="text-xs font-black text-[#F8FAFC] uppercase">Nationwide Access</span>
                    <span className="text-xs font-black text-[#8B5CF6]">$499<span className="text-[8.5px] text-slate-500 font-bold uppercase">/mo</span></span>
                  </div>
                  <p className="text-[9.5px] text-[#94A3B8] font-medium mt-1 leading-snug">
                    Complete nationwide radar tracking and unlimited lead file unlocking across all 3,000+ US counties.
                  </p>
                  <ul className="mt-2.5 space-y-1 text-[8.5px] font-extrabold text-[#94A3B8] uppercase tracking-wide">
                    <li className="flex items-center gap-1.5"><Check size={10} className="text-[#8B5CF6]" /> Unlimited County Unlocks</li>
                    <li className="flex items-center gap-1.5"><Check size={10} className="text-[#8B5CF6]" /> Historical Storm Query Engine</li>
                    <li className="flex items-center gap-1.5"><Check size={10} className="text-[#8B5CF6]" /> API Integrations & CRM Sync</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Right Column: Contact Details Form */}
            <form onSubmit={handleSubmit} className="flex flex-col gap-3 justify-between">
              <div className="space-y-2.5">
                <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest block pl-0.5">
                  Your Contact Information
                </span>

                {/* Name */}
                <div className="relative">
                  <span className="absolute inset-y-0 left-3 flex items-center text-slate-500"><User size={12} /></span>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Full Name"
                    className="w-full bg-[#050B16] border border-slate-900 hover:border-slate-800 focus:border-[#145CFF] rounded-lg pl-9 pr-3.5 py-2 text-xs text-[#F8FAFC] placeholder:text-slate-500 focus:outline-none transition-colors"
                  />
                </div>

                {/* Company */}
                <div className="relative">
                  <span className="absolute inset-y-0 left-3 flex items-center text-slate-500"><Building size={12} /></span>
                  <input
                    type="text"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="Roofing Company Name"
                    className="w-full bg-[#050B16] border border-slate-900 hover:border-slate-800 focus:border-[#145CFF] rounded-lg pl-9 pr-3.5 py-2 text-xs text-[#F8FAFC] placeholder:text-slate-500 focus:outline-none transition-colors"
                  />
                </div>

                {/* Email */}
                <div className="relative">
                  <span className="absolute inset-y-0 left-3 flex items-center text-slate-500"><Mail size={12} /></span>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Business Email"
                    className="w-full bg-[#050B16] border border-slate-900 hover:border-slate-800 focus:border-[#145CFF] rounded-lg pl-9 pr-3.5 py-2 text-xs text-[#F8FAFC] placeholder:text-slate-500 focus:outline-none transition-colors"
                  />
                </div>

                {/* Phone */}
                <div className="relative">
                  <span className="absolute inset-y-0 left-3 flex items-center text-slate-500"><Phone size={12} /></span>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Direct Phone Number"
                    className="w-full bg-[#050B16] border border-slate-900 hover:border-slate-800 focus:border-[#145CFF] rounded-lg pl-9 pr-3.5 py-2 text-xs text-[#F8FAFC] placeholder:text-slate-500 focus:outline-none transition-colors"
                  />
                </div>

                {/* Selection helper */}
                <div className="bg-[#050B16]/50 border border-slate-900/60 p-2 rounded-lg text-[9px] font-semibold text-slate-400 select-none">
                  Selected Area: <span className="text-slate-200 font-extrabold uppercase">{county} County, {state}</span>
                </div>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                className="w-full bg-[#145CFF] hover:bg-[#2570FF] border-none py-2.5 rounded-lg text-xs font-black text-[#F8FAFC] uppercase tracking-wider flex items-center justify-center gap-1.5 cursor-pointer shadow-md shadow-[#145CFF]/15 transition-all mt-4"
              >
                <Send size={12} />
                <span>Submit Subscription Request</span>
              </button>
            </form>

          </div>
        )}

      </div>
    </div>
  );
}
