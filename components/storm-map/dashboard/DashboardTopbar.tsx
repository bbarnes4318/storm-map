"use client";

import React from "react";
import { Search, Bell, MapPin, Loader2, Sparkles } from "lucide-react";
import { UserButton, SignedIn, SignedOut } from "@clerk/nextjs";

interface DashboardTopbarProps {
  selectedMarketLabel: string | null;
  onSearchAddress: (address: string) => Promise<boolean>;
  onClearMarket: () => void;
}

export function DashboardTopbar({
  selectedMarketLabel,
  onSearchAddress,
  onClearMarket
}: DashboardTopbarProps) {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [isSearching, setIsSearching] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState<string | null>(null);

  const handleSearchSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setIsSearching(true);
    setErrorMsg(null);
    try {
      const success = await onSearchAddress(searchQuery.trim());
      if (!success) {
        setErrorMsg("Location not found. Please try a more specific address, city, or ZIP code.");
      } else {
        setSearchQuery("");
      }
    } catch (err) {
      console.error(err);
      setErrorMsg("Geocoding service unavailable.");
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <header className="h-16 w-full bg-white border-b border-[#E5E7EB] px-6 flex items-center justify-between shrink-0 shadow-sm z-30">
      {/* Left: Search Bar */}
      <form onSubmit={handleSearchSubmit} className="relative w-full max-w-lg">
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              if (errorMsg) setErrorMsg(null);
            }}
            placeholder="Search address, city, ZIP, parcel, or owner..."
            className="w-full bg-[#F8FAFC] border border-[#E5E7EB] rounded-lg pl-10 pr-10 py-2 text-xs text-[#0F172A] focus:outline-none focus:border-[#145CFF] focus:bg-white placeholder:text-[#64748B] transition-all"
            disabled={isSearching}
          />
          <Search className="absolute left-3.5 top-2.5 text-[#64748B]" size={14} />
          
          {isSearching && (
            <Loader2 className="absolute right-3.5 top-2.5 animate-spin text-[#145CFF]" size={14} />
          )}
        </div>
        
        {errorMsg && (
          <div className="absolute top-11 left-0 right-0 bg-red-50 border border-red-200 text-red-700 text-[10px] px-3 py-1.5 rounded-md shadow-md z-50 flex items-center gap-1.5">
            <span>{errorMsg}</span>
          </div>
        )}
      </form>

      {/* Right: Market selection, alerts, and Clerk auth */}
      <div className="flex items-center gap-4">
        {/* Selected Market Box */}
        {selectedMarketLabel && (
          <div className="hidden md:flex items-center gap-2 bg-[#145CFF]/5 border border-[#145CFF]/15 px-3 py-1.5 rounded-full text-xs font-bold text-[#145CFF]">
            <MapPin size={13} className="text-[#145CFF]" />
            <span className="truncate max-w-[200px]">Service Area: {selectedMarketLabel}</span>
            <button 
              onClick={onClearMarket}
              className="ml-1 text-[#64748B] hover:text-[#0F172A] text-[10px] font-black"
              title="Clear Active Target"
            >
              ×
            </button>
          </div>
        )}

        {/* Live Weather Warning Status */}
        <div className="hidden lg:flex items-center gap-2 bg-[#0E8F6E]/5 border border-[#0E8F6E]/15 px-3 py-1.5 rounded-full text-xs font-bold text-[#0E8F6E]">
          <span className="relative flex h-1.5 w-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#0E8F6E] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#0E8F6E]"></span>
          </span>
          <span>NOAA Live feed</span>
        </div>

        {/* Notification Bell */}
        <button 
          className="p-2 text-[#475569] hover:text-[#0F172A] rounded-lg hover:bg-slate-100 relative transition-all"
          title="Notifications"
          onClick={() => alert("Notification Center: You are caught up with all live storm warnings.")}
        >
          <Bell size={16} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#EF4444] rounded-full border border-white"></span>
        </button>

        {/* Clerk Auth Block */}
        <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
          <SignedIn>
            <UserButton 
              afterSignOutUrl="/storm-map"
              appearance={{
                elements: {
                  avatarBox: "w-8 h-8 rounded-full border border-slate-200 hover:scale-105 transition-all"
                }
              }}
            />
          </SignedIn>
          <SignedOut>
            <a
              href="/storm-map/sign-in"
              className="text-xs font-bold text-[#145CFF] hover:text-[#2570FF] px-3 py-1.5 rounded-md hover:bg-slate-50 transition-all border border-slate-200"
            >
              Sign In
            </a>
          </SignedOut>
        </div>
      </div>
    </header>
  );
}
export default DashboardTopbar;
