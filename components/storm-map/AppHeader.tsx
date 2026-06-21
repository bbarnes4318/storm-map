"use client";

import React from "react";

interface AppHeaderProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

export function AppHeader({ sidebarOpen, setSidebarOpen }: AppHeaderProps) {
  return (
    <header className="w-full h-14 md:h-16 flex items-center justify-between px-4 bg-gradient-to-r from-[#071426] via-[#050B16] to-[#071426] border-b border-[#145CFF]/15 shadow-md shadow-black/10 z-[1002] shrink-0">
      {/* Left section: Logo & App Title */}
      <div className="flex items-center gap-3">
        {/* Mobile Hamburger Menu Toggle */}
        <button
          type="button"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-1.5 rounded bg-slate-950/40 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-slate-100 md:hidden focus:outline-none transition-colors"
          aria-label="Toggle Sidebar"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            {sidebarOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>

        {/* Brand Logo & Lockup */}
        <div className="flex items-center gap-3">
          {/* Custom High-Tech SVG Logo */}
          <div className="relative w-9 h-9 md:w-10 md:h-10 flex items-center justify-center bg-[#071426]/80 border border-[#145CFF]/30 rounded-xl shadow-inner select-none shrink-0">
            <svg
              className="w-6 h-6 text-[#145CFF]"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {/* Radar rings */}
              <circle cx="12" cy="12" r="10" className="stroke-[#145CFF]/20" />
              <circle cx="12" cy="12" r="6" className="stroke-[#145CFF]/40" strokeDasharray="2 2" />
              {/* Target crosshair */}
              <path d="M12 2v4M12 18v4M2 12h4M18 12h4" className="stroke-[#145CFF]/30" />
              {/* Lightning Bolt */}
              <path
                d="M13 2.5L5 13h7l-1 8.5L19 11h-7l1-8.5z"
                className="stroke-[#2F7DFF] fill-[#2F7DFF]/20"
              />
            </svg>
            <span className="absolute -top-0.5 -right-0.5 flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#145CFF] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#2F7DFF]"></span>
            </span>
          </div>

          {/* Typography Lockup */}
          <div className="flex flex-col justify-center leading-none">
            <div className="flex items-center gap-2">
              <h1 className="text-[15px] md:text-[18px] font-black tracking-wider text-[#F8FAFC] uppercase font-sans">
                STORMTARGET
              </h1>
              <span className="px-2.5 py-0.5 rounded bg-[#0E8F6E]/15 border border-[#0E8F6E]/35 text-[#00E676] text-[10.5px] md:text-[11.5px] font-black tracking-widest select-none flex items-center gap-1.5 shadow-sm">
                <span className="relative flex h-1.5 w-1.5 shrink-0">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00E676] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#00E676]"></span>
                </span>
                LIVE
              </span>
            </div>
            <span className="text-[9px] md:text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-widest leading-none">
              Storm Intelligence Console
            </span>
          </div>
        </div>
      </div>

      {/* Right section: LIVE DATA Pill */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 px-2.5 py-1 rounded-full bg-[#0E8F6E]/10 border border-[#0E8F6E]/20 text-[#0E8F6E] text-[10px] font-extrabold uppercase tracking-wider shadow-sm select-none">
          <span className="relative flex h-1.5 w-1.5 shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#0E8F6E] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#0E8F6E]"></span>
          </span>
          <span>LIVE DATA</span>
        </div>
      </div>
    </header>
  );
}

export default AppHeader;
