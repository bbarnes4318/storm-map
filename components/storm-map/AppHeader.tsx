"use client";

import React from "react";

interface AppHeaderProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

export function AppHeader({ sidebarOpen, setSidebarOpen }: AppHeaderProps) {
  return (
    <header className="w-full h-[72px] flex items-center justify-between px-6 md:px-8 bg-[#0B1120] border-b border-[rgba(56,189,248,0.08)] shadow-[0_4px_24px_rgba(0,0,0,0.5)] z-[1002] shrink-0">
      {/* Left section: Logo & App Title */}
      <div className="flex items-center gap-4">
        {/* Mobile Hamburger Menu Toggle */}
        <button
          type="button"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 rounded-lg border border-slate-700 hover:border-slate-500 bg-slate-800/60 text-slate-300 hover:text-white md:hidden focus:outline-none transition-colors"
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

        {/* Brand Logo (Real Asset) */}
        <div className="flex items-center gap-4">
          <img
            src="/storm-map/brand/stormtarget-live-logo-transparent.png"
            alt="STORMTARGET | Live"
            className="h-[40px] md:h-[46px] w-auto object-contain select-none shrink-0"
          />

          {/* Subtitle Console */}
          <div className="hidden md:flex items-center gap-3">
            <div className="h-6 w-px bg-slate-700/60"></div>
            <span className="text-[10px] md:text-[11px] font-extrabold text-slate-400 uppercase tracking-widest select-none">
              Storm Intelligence Console
            </span>
          </div>
        </div>
      </div>

      {/* Right section: LIVE DATA Pill */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-[#34D399] text-[10px] font-black tracking-widest select-none">
          <span className="relative flex h-1.5 w-1.5 shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#34D399] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#34D399]"></span>
          </span>
          <span>LIVE DATA</span>
        </div>
      </div>
    </header>
  );
}

export default AppHeader;
