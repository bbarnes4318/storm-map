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

        {/* Brand Logo */}
        <div className="flex items-center">
          <img
            src="/storm-map/brand/stormtarget-live-logo-transparent.png"
            alt="STORMTARGET | Live"
            className="h-8 md:h-[38px] w-auto object-contain select-none"
            draggable={false}
          />
        </div>

        {/* Console Subtitle */}
        <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400/90 border-l border-slate-800/80 pl-3 ml-1 hidden sm:inline-block">
          Storm Intelligence Console
        </span>
      </div>

      {/* Right section: LIVE DATA Pill */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 px-2.5 py-1 rounded-full bg-[#0E8F6E]/10 border border-[#0E8F6E]/20 text-[#0E8F6E] text-[10px] font-extrabold uppercase tracking-wider shadow-sm">
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
