"use client";

import React from "react";
import { X, CheckCircle, FileText, CalendarDays, Zap, HelpCircle } from "lucide-react";

export type PurchaseProductType = 
  | "STORMTARGET_LIVE"
  | "HAIL_STRIKE_REPORT"
  | "HOMEOWNER_APPOINTMENTS";

interface StormTargetPurchaseDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  productType: PurchaseProductType;
  contextLabel: string;
  recordQuantity?: string; // e.g. "500 records"
}

export function StormTargetPurchaseDrawer({
  isOpen,
  onClose,
  productType,
  contextLabel,
  recordQuantity: initialRecordQuantity = "1,000 records"
}: StormTargetPurchaseDrawerProps) {
  const [buyerName, setBuyerName] = React.useState("");
  const [companyName, setCompanyName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [notes, setNotes] = React.useState("");
  const [recordQuantity, setRecordQuantity] = React.useState(initialRecordQuantity);
  
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [success, setSuccess] = React.useState(false);

  React.useEffect(() => {
    if (isOpen) {
      setBuyerName("");
      setCompanyName("");
      setEmail("");
      setPhone("");
      setNotes("");
      setRecordQuantity(initialRecordQuantity);
      setSuccess(false);
      setIsSubmitting(false);
    }
  }, [isOpen, productType, initialRecordQuantity]);

  if (!isOpen) return null;

  const getProductTitle = () => {
    switch (productType) {
      case "STORMTARGET_LIVE":
        return "StormTarget Live Subscription";
      case "HAIL_STRIKE_REPORT":
        return "Hail Strike Lead Report";
      case "HOMEOWNER_APPOINTMENTS":
        return "Inspection Appointment Package";
    }
  };

  const getProductIcon = () => {
    switch (productType) {
      case "STORMTARGET_LIVE":
        return <Zap className="text-[#145CFF]" size={18} />;
      case "HAIL_STRIKE_REPORT":
        return <FileText className="text-[#145CFF]" size={18} />;
      case "HOMEOWNER_APPOINTMENTS":
        return <CalendarDays className="text-[#0E8F6E]" size={18} />;
    }
  };

  const getPricingInfo = () => {
    switch (productType) {
      case "STORMTARGET_LIVE":
        return "$249/month + custom volume credits";
      case "HAIL_STRIKE_REPORT":
        return "Custom proposal based on record size";
      case "HOMEOWNER_APPOINTMENTS":
        return "Pay-per-inspection (exclusive territory pricing)";
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!buyerName || !companyName || !email || !phone) {
      alert("Please fill in all required fields.");
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API request submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSuccess(true);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-[1100] flex justify-end">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm transition-opacity" 
        onClick={onClose} 
      />

      {/* Drawer */}
      <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col z-[1200] animate-in slide-in-from-right duration-300 select-text text-[#0F172A]">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#E5E7EB] px-6 py-4 bg-[#F8FAFC]">
          <div className="flex items-center gap-2">
            {getProductIcon()}
            <h3 className="font-extrabold text-sm uppercase tracking-wider text-[#0F172A]">
              {getProductTitle()}
            </h3>
          </div>
          <button
            onClick={onClose}
            type="button"
            className="p-1.5 rounded-lg text-[#64748B] hover:text-[#0F172A] hover:bg-slate-100 transition-colors"
          >
            <X size={16} />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
          {success ? (
            <div className="space-y-4 text-center py-10 animate-in fade-in duration-300">
              <div className="mx-auto w-12 h-12 rounded-full bg-[#0E8F6E]/10 flex items-center justify-center text-[#0E8F6E]">
                <CheckCircle size={28} />
              </div>
              <h4 className="font-extrabold text-base text-[#0F172A] uppercase tracking-wide">
                Request Submitted
              </h4>
              <p className="text-xs text-[#475569] leading-relaxed max-w-sm mx-auto">
                Request received. Our team will follow up with fulfillment and purchase details.
              </p>
              <button
                onClick={onClose}
                className="mt-4 px-6 py-2 bg-[#145CFF] hover:bg-[#2570FF] text-white text-xs font-black uppercase tracking-wider rounded-lg shadow-md transition-all cursor-pointer border-none"
              >
                Done
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              {/* Product Info Summary */}
              <div className="bg-[#F8FAFC] border border-[#E5E7EB] rounded-xl p-4 space-y-2.5">
                <div>
                  <span className="text-[8px] font-black uppercase tracking-widest text-[#64748B] block">Selected Market Context</span>
                  <span className="font-bold text-[#0F172A]">{contextLabel}</span>
                </div>
                
                <div className="flex items-center justify-between pt-2 border-t border-slate-200">
                  <div>
                    <span className="text-[8px] font-black uppercase tracking-widest text-[#64748B] block">Estimated Cost</span>
                    <span className="font-bold text-[#145CFF]">{getPricingInfo()}</span>
                  </div>
                </div>
              </div>

              {/* Quantity Selector for Hail Strike Report */}
              {productType === "HAIL_STRIKE_REPORT" && (
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-[#475569] uppercase tracking-wider block">
                    Record Quantity Selector
                  </label>
                  <select
                    value={recordQuantity}
                    onChange={(e) => setRecordQuantity(e.target.value)}
                    className="w-full bg-[#F8FAFC] border border-[#E5E7EB] rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-[#145CFF] font-bold"
                  >
                    <option value="500 records">500 records</option>
                    <option value="1,000 records">1,000 records</option>
                    <option value="2,500 records">2,500 records</option>
                    <option value="5,000 records">5,000 records</option>
                    <option value="All available records">All available records</option>
                  </select>
                </div>
              )}

              {/* Form Input Fields */}
              <div className="space-y-3 pt-2">
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-[#475569] uppercase tracking-wider block">
                    Buyer Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={buyerName}
                    onChange={(e) => setBuyerName(e.target.value)}
                    placeholder="Enter your full name"
                    className="w-full bg-white border border-[#E5E7EB] rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-[#145CFF]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-black text-[#475569] uppercase tracking-wider block">
                    Company Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder="Enter roofing company name"
                    className="w-full bg-white border border-[#E5E7EB] rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-[#145CFF]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-black text-[#475569] uppercase tracking-wider block">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@company.com"
                    className="w-full bg-white border border-[#E5E7EB] rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-[#145CFF]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-black text-[#475569] uppercase tracking-wider block">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="(555) 555-5555"
                    className="w-full bg-white border border-[#E5E7EB] rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-[#145CFF]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-black text-[#475569] uppercase tracking-wider block">
                    Notes / Target Requirements
                  </label>
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Enter any specific target ZIP codes, minimum roof size, or neighborhood requirements..."
                    rows={3}
                    className="w-full bg-white border border-[#E5E7EB] rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-[#145CFF] resize-none"
                  />
                </div>
              </div>

              {/* Checkout Not Connected Notice */}
              <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg text-[10px] text-amber-800 leading-relaxed flex items-start gap-2">
                <HelpCircle size={16} className="shrink-0 mt-0.5 text-amber-600" />
                <span>
                  Online checkout is not connected yet. Submit this request and our team will follow up with purchase details.
                </span>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-2 py-2.5 bg-[#145CFF] hover:bg-[#2570FF] disabled:bg-slate-200 disabled:text-slate-400 disabled:cursor-not-allowed text-white text-xs font-black uppercase tracking-wider rounded-lg shadow-md transition-all cursor-pointer border-none"
              >
                {isSubmitting && (
                  <span className="w-3.5 h-3.5 border-2 border-white/20 border-t-white rounded-full animate-spin"></span>
                )}
                <span>Submit Request</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
export default StormTargetPurchaseDrawer;
