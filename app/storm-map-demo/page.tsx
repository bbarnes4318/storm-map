"use client";

import React from "react";
import dynamic from "next/dynamic";

// Dynamically import the demo component to avoid any SSR issue with animations or window references
const StormMapDemo = dynamic(() => import("@/components/demo/StormMapDemo"), {
  ssr: false,
  loading: () => (
    <div className="w-screen h-screen bg-[#061A2F] flex flex-col items-center justify-center gap-3.5 text-slate-400">
      <div className="w-12 h-12 border-4 border-[#145CFF]/20 border-t-[#145CFF] rounded-full animate-spin"></div>
      <div className="flex flex-col items-center gap-1 text-center">
        <span className="text-xs uppercase font-extrabold tracking-wider text-slate-300">
          Loading Demo Experience
        </span>
        <span className="text-[10px] text-slate-500 font-medium">
          Setting up StormTarget Interactive Walkthrough...
        </span>
      </div>
    </div>
  ),
});

export default function StormMapDemoPage() {
  return <StormMapDemo />;
}
