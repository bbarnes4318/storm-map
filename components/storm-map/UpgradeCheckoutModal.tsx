"use client";

import React from "react";
import { X, Check, Send, Sparkles, Building, Mail, Phone, User, MapPin } from "lucide-react";

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
  const [market, setMarket] = React.useState(`${county} County, ${state}`);
  const [preferredOption, setPreferredOption] = React.useState<"Month to Month Lead Plan" | "Seasonal Lead Plan" | "Appointment Program">("Seasonal Lead Plan");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !phone) {
      alert("Please fill in your Name, Email, and Phone number.");
      return;
    }

    try {
      const lead = {
        name: company ? `${name} (${company})` : name,
        address: `Requested Market: ${market}`,
        city: "",
        state: state.toUpperCase(),
        zip: "",
        county: county,
        phone: phone,
        email: email,
        roofAge: preferredOption, // Display selected plan in the Roof Age / Plan column
        stormType: "Demo Form",
        confidence: "High",
      };

      const jsonString = JSON.stringify([lead]);
      const base64String = btoa(unescape(encodeURIComponent(jsonString)));
      const targetHost = typeof window !== "undefined" && window.location.hostname.includes("localhost")
        ? "http://localhost:3000"
        : "https://sms.leadzer.io";
      
      const redirectUrl = `${targetHost}/?import=storm-map-demo&data=${base64String}&county=${encodeURIComponent(county)}&state=${encodeURIComponent(state)}`;
      
      // Load the redirectUrl in a hidden iframe to send/import the data in the background
      if (typeof document !== "undefined") {
        const iframe = document.createElement("iframe");
        iframe.style.display = "none";
        iframe.src = redirectUrl;
        document.body.appendChild(iframe);
        setTimeout(() => {
          try {
            document.body.removeChild(iframe);
          } catch (e) {
            console.error("Failed to clean up iframe:", e);
          }
        }, 10000);
      }
    } catch (err) {
      console.error("Failed to route form data to SMS app:", err);
    }

    setFormSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-[4000] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm select-none animate-in fade-in duration-305">
      
      {/* Modal Card Container */}
      <div className="w-full max-w-4xl bg-[#071426] border border-[rgba(20,92,255,0.25)] rounded-2xl shadow-2xl flex flex-col overflow-hidden select-text animate-in scale-in duration-300 max-h-[90vh]">
        
        {/* Glow Top Line */}
        <div className="h-1.5 bg-gradient-to-r from-[#145CFF] via-[#10B981] to-[#F59E0B]" />

        {/* Modal Header */}
        <div className="p-4 border-b border-[rgba(20,92,255,0.15)] flex items-center justify-between shrink-0 bg-[#0B1930]/40">
          <div className="flex items-center gap-2.5">
            <Sparkles className="w-5 h-5 text-[#F59E0B]" />
            <div>
              <h2 className="text-sm font-black text-[#F8FAFC] uppercase tracking-wider leading-tight">
                Unlock StormTarget Intelligence
              </h2>
              <p className="text-[10.5px] text-slate-350 font-semibold mt-0.5">
                Select the program tier tailored to your team's storm inspection and volume goals.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full border border-slate-800 hover:border-slate-700 text-slate-400 hover:text-[#F8FAFC] transition-colors cursor-pointer shrink-0"
            title="Close Checkout"
          >
            <X size={15} />
          </button>
        </div>

        {formSubmitted ? (
          /* Success State View */
          <div className="p-12 text-center space-y-5 flex flex-col items-center justify-center overflow-y-auto">
            <div className="w-16 h-16 bg-[#10B981]/12 border border-[#10B981]/35 rounded-full flex items-center justify-center animate-bounce shadow-[0_0_15px_rgba(16,185,129,0.2)]">
              <Check className="w-9 h-9 text-[#10B981]" />
            </div>
            <div className="space-y-2 max-w-md">
              <h3 className="text-lg font-black text-[#F8FAFC] uppercase tracking-wider">
                Subscription Request Received
              </h3>
              <p className="text-xs text-[#10B981] leading-relaxed font-bold">
                Thank you. We will be sending you an invoice to get started.
              </p>
            </div>
            <button
              onClick={onClose}
              className="px-6 py-2.5 bg-[#145CFF] hover:bg-[#2570FF] rounded-lg text-xs font-black text-[#F8FAFC] uppercase tracking-wider transition-colors cursor-pointer shadow-md shadow-[#145CFF]/15"
            >
              Back to Map
            </button>
          </div>
        ) : (
          /* Form / Details View */
          <form onSubmit={handleSubmit} className="flex flex-col flex-1 overflow-hidden">
            <div className="p-5 overflow-y-auto space-y-6 custom-scrollbar flex-1">
              
              {/* Pricing Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                
                {/* Monthly Lead Plan Card */}
                <div
                  onClick={() => setPreferredOption("Month to Month Lead Plan")}
                  className={`p-4 rounded-xl border transition-all cursor-pointer text-left select-none relative flex flex-col justify-between h-full ${
                    preferredOption === "Month to Month Lead Plan"
                      ? "bg-[#0B1930]/80 border-[#145CFF] shadow-[0_0_15px_rgba(20,92,255,0.15)] ring-1 ring-[#145CFF]"
                      : "bg-[#050B16]/50 border-slate-800 hover:border-slate-700"
                  }`}
                >
                  <div>
                    <div className="flex justify-between items-start mb-2.5">
                      <span className="text-xs font-black text-[#F8FAFC] uppercase tracking-wide">Month to Month Lead Plan</span>
                      <span className="text-xs font-black text-[#38BDF8]">$2.99<span className="text-[8.5px] text-slate-400 font-bold uppercase">/lead</span></span>
                    </div>
                    <p className="text-[10px] text-slate-300 font-medium leading-relaxed mb-3">
                      Best for contractors testing a new market.
                    </p>
                    <ul className="space-y-1.5 text-[9px] font-bold text-slate-400 uppercase tracking-wide mb-4">
                      <li className="flex items-center gap-1.5"><Check size={10} className="text-[#10B981] shrink-0" /> 100 leads minimum per order</li>
                      <li className="flex items-center gap-1.5"><Check size={10} className="text-[#10B981] shrink-0" /> Month to Month No Contract</li>
                    </ul>
                  </div>
                  <button
                    type="button"
                    className={`w-full py-1.5 rounded text-[9.5px] font-black uppercase tracking-wider transition-all border-0 cursor-pointer ${
                      preferredOption === "Month to Month Lead Plan"
                        ? "bg-[#145CFF] text-white"
                        : "bg-slate-800 text-slate-300 hover:bg-slate-755"
                    }`}
                  >
                    Request Month to Month Lead Plan
                  </button>
                </div>

                {/* Quarterly Lead Plan Card */}
                <div
                  onClick={() => setPreferredOption("Seasonal Lead Plan")}
                  className={`p-4 rounded-xl border transition-all cursor-pointer text-left select-none relative flex flex-col justify-between h-full ${
                    preferredOption === "Seasonal Lead Plan"
                      ? "bg-[#0B1930]/80 border-[#10B981] shadow-[0_0_15px_rgba(16,185,129,0.15)] ring-1 ring-[#10B981]"
                      : "bg-[#050B16]/50 border-slate-800 hover:border-slate-700"
                  }`}
                >
                  <span className="absolute -top-2.5 right-4 px-2 py-0.5 bg-[#10B981] text-white text-[8px] font-black uppercase tracking-widest rounded-full shadow-sm">
                    Recommended / Best Value
                  </span>
                  <div>
                    <div className="flex justify-between items-start mb-2.5 mt-1">
                      <span className="text-xs font-black text-[#F8FAFC] uppercase tracking-wide">Seasonal Lead Plan</span>
                      <span className="text-xs font-black text-[#10B981]">$1.99<span className="text-[8.5px] text-slate-400 font-bold uppercase">/lead</span></span>
                    </div>
                    <p className="text-[10px] text-slate-300 font-medium leading-relaxed mb-3">
                      Best value for contractors committed to consistent storm lead flow.
                    </p>
                    <ul className="space-y-1.5 text-[9px] font-bold text-slate-400 uppercase tracking-wide mb-4">
                      <li className="flex items-center gap-1.5"><Check size={10} className="text-[#10B981] shrink-0" /> 130 leads minimum per order</li>
                      <li className="flex items-center gap-1.5"><Check size={10} className="text-[#10B981] shrink-0" /> 3 month contract paid monthly</li>
                      <li className="flex items-center gap-1.5"><Check size={10} className="text-[#10B981] shrink-0" /> Automatically billed each month for 3 months</li>
                      <li className="flex items-center gap-1.5"><Check size={10} className="text-[#10B981] shrink-0" /> After 3 months, $.99 per lead</li>
                    </ul>
                  </div>
                  <button
                    type="button"
                    className={`w-full py-1.5 rounded text-[9.5px] font-black uppercase tracking-wider transition-all border-0 cursor-pointer ${
                      preferredOption === "Seasonal Lead Plan"
                        ? "bg-[#10B981] text-white"
                        : "bg-slate-800 text-slate-300 hover:bg-slate-755"
                    }`}
                  >
                    Request Seasonal Lead Plan
                  </button>
                </div>

                {/* Guaranteed Roof Inspection Appointments Card */}
                <div
                  onClick={() => setPreferredOption("Appointment Program")}
                  className={`p-4 rounded-xl border transition-all cursor-pointer text-left select-none relative flex flex-col justify-between h-full ${
                    preferredOption === "Appointment Program"
                      ? "bg-[#0B1930]/80 border-[#F59E0B] shadow-[0_0_15px_rgba(245,158,11,0.15)] ring-1 ring-[#F59E0B]"
                      : "bg-[#050B16]/50 border-slate-800 hover:border-slate-700"
                  }`}
                >
                  <div>
                    <div className="flex justify-between items-start mb-2.5">
                      <span className="text-xs font-black text-[#F8FAFC] uppercase tracking-wide">Guaranteed Inspections</span>
                      <span className="text-xs font-black text-[#F59E0B]">$250<span className="text-[8.5px] text-slate-400 font-bold uppercase">/appt</span></span>
                    </div>
                    <p className="text-[9.5px] text-slate-300 font-medium leading-relaxed mb-3">
                      We set exclusive roof inspection appointments. No charge for no-shows. Minimum 5 appointments.
                    </p>
                    <p className="text-[8.5px] text-slate-400 font-bold italic leading-normal mb-4">
                      Our process is built to drive high show rates, with a target of 9 out of 10 appointments showing.
                    </p>
                  </div>
                  <button
                    type="button"
                    className={`w-full py-1.5 rounded text-[9.5px] font-black uppercase tracking-wider transition-all border-0 cursor-pointer ${
                      preferredOption === "Appointment Program"
                        ? "bg-[#F59E0B] text-[#071426]"
                        : "bg-slate-800 text-slate-300 hover:bg-slate-755"
                    }`}
                  >
                    Request Appointment Program
                  </button>
                </div>

              </div>

              {/* Contact Form Section */}
              <div className="border-t border-[rgba(20,92,255,0.15)] pt-5">
                <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block mb-3.5 pl-0.5">
                  Complete Your Subscription Request
                </span>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Left Column Fields */}
                  <div className="space-y-3">
                    <div className="relative">
                      <span className="absolute inset-y-0 left-3 flex items-center text-slate-550"><User size={12} /></span>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Full Name"
                        className="w-full bg-[#050B16] border border-slate-800 hover:border-slate-700 focus:border-[#145CFF] rounded-lg pl-9 pr-3.5 py-2 text-xs text-[#F8FAFC] placeholder:text-slate-500 focus:outline-none transition-colors font-semibold"
                      />
                    </div>

                    <div className="relative">
                      <span className="absolute inset-y-0 left-3 flex items-center text-slate-555"><Building size={12} /></span>
                      <input
                        type="text"
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        placeholder="Roofing Company Name"
                        className="w-full bg-[#050B16] border border-slate-800 hover:border-slate-700 focus:border-[#145CFF] rounded-lg pl-9 pr-3.5 py-2 text-xs text-[#F8FAFC] placeholder:text-slate-500 focus:outline-none transition-colors font-semibold"
                      />
                    </div>
                  </div>

                  {/* Right Column Fields */}
                  <div className="space-y-3">
                    <div className="relative">
                      <span className="absolute inset-y-0 left-3 flex items-center text-slate-555"><Mail size={12} /></span>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Business Email Address"
                        className="w-full bg-[#050B16] border border-slate-800 hover:border-slate-700 focus:border-[#145CFF] rounded-lg pl-9 pr-3.5 py-2 text-xs text-[#F8FAFC] placeholder:text-slate-500 focus:outline-none transition-colors font-semibold"
                      />
                    </div>

                    <div className="relative">
                      <span className="absolute inset-y-0 left-3 flex items-center text-slate-555"><Phone size={12} /></span>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="Direct Phone Number"
                        className="w-full bg-[#050B16] border border-slate-800 hover:border-slate-700 focus:border-[#145CFF] rounded-lg pl-9 pr-3.5 py-2 text-xs text-[#F8FAFC] placeholder:text-slate-500 focus:outline-none transition-colors font-semibold"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3.5">
                  <div className="relative">
                    <span className="absolute inset-y-0 left-3 flex items-center text-slate-555"><MapPin size={12} /></span>
                    <input
                      type="text"
                      required
                      value={market}
                      onChange={(e) => setMarket(e.target.value)}
                      placeholder="Market / County of Interest"
                      className="w-full bg-[#050B16] border border-slate-800 hover:border-slate-700 focus:border-[#145CFF] rounded-lg pl-9 pr-3.5 py-2 text-xs text-[#F8FAFC] placeholder:text-slate-500 focus:outline-none transition-colors font-semibold"
                    />
                  </div>

                  <div className="bg-[#050B16]/50 border border-slate-850 p-2 rounded-lg text-[9.5px] font-bold text-[#CBD5E1] flex items-center justify-between">
                    <span>Selected Plan: <strong className="text-white uppercase font-black">{preferredOption}</strong></span>
                    <span>Area: <strong className="text-[#145CFF] uppercase font-black">{market || `${county} County, ${state}`}</strong></span>
                  </div>
                </div>

              </div>

            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-[rgba(20,92,255,0.15)] flex items-center justify-end bg-[#0B1930]/40 shrink-0 gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border border-slate-800 hover:border-slate-700 rounded-lg text-xs font-bold text-slate-400 hover:text-[#F8FAFC] transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 bg-[#145CFF] hover:bg-[#2570FF] border-none rounded-lg text-xs font-black text-white uppercase tracking-wider flex items-center gap-1.5 cursor-pointer shadow-md shadow-[#145CFF]/15 transition-all"
              >
                <Send size={12} />
                <span>Submit Request</span>
              </button>
            </div>
          </form>
        )}

      </div>
    </div>
  );
}
