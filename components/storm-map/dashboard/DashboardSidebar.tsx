"use client";

import React from "react";
import { 
  LayoutDashboard, 
  Zap, 
  Search, 
  Users, 
  FileText, 
  Database, 
  Bell, 
  Settings, 
  HelpCircle, 
  ChevronLeft, 
  ChevronRight,
  RefreshCw
} from "lucide-react";

export type NavItemType = 
  | "Dashboard" 
  | "Live Storms" 
  | "Property Lookup" 
  | "Leads" 
  | "Reports" 
  | "CRM" 
  | "Alerts" 
  | "Settings";

interface DashboardSidebarProps {
  activeNav: NavItemType;
  setActiveNav: (nav: NavItemType) => void;
  isCollapsed: boolean;
  setIsCollapsed: (collapsed: boolean) => void;
  lastUpdated: Date | null;
  onRefresh: () => void;
  isRefreshing: boolean;
}

export function DashboardSidebar({
  activeNav,
  setActiveNav,
  isCollapsed,
  setIsCollapsed,
  lastUpdated,
  onRefresh,
  isRefreshing
}: DashboardSidebarProps) {
  const menuItems = [
    { name: "Dashboard" as NavItemType, icon: LayoutDashboard },
    { name: "Live Storms" as NavItemType, icon: Zap },
    { name: "Property Lookup" as NavItemType, icon: Search },
    { name: "Leads" as NavItemType, icon: Users },
    { name: "Reports" as NavItemType, icon: FileText },
    { name: "CRM" as NavItemType, icon: Database },
    { name: "Alerts" as NavItemType, icon: Bell },
    { name: "Settings" as NavItemType, icon: Settings },
  ];

  const formatLastUpdated = () => {
    if (!lastUpdated) return "Never updated";
    return lastUpdated.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  };

  return (
    <aside 
      className={`h-full flex flex-col justify-between bg-[#061A2F] border-r border-[#145CFF]/15 text-[#F8FAFC] transition-all duration-300 ${
        isCollapsed ? "w-16" : "w-64"
      } shrink-0 select-none`}
    >
      {/* Top Section */}
      <div className="flex flex-col flex-1 min-h-0">
        {/* Brand Logo & Header */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-[#145CFF]/15">
          {!isCollapsed ? (
            <div className="flex items-center gap-2 overflow-hidden">
              <img 
                src="/storm-map/brand/stormtarget-live-logo-transparent.png" 
                alt="STORMTARGET Live" 
                className="h-8 w-auto object-contain shrink-0" 
              />
            </div>
          ) : (
            <div className="mx-auto flex items-center justify-center">
              <span className="text-xl font-black text-[#145CFF] tracking-tighter">ST</span>
            </div>
          )}
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 py-4 px-2 space-y-1 overflow-y-auto custom-scrollbar">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeNav === item.name;
            return (
              <button
                key={item.name}
                onClick={() => setActiveNav(item.name)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-bold transition-all ${
                  isActive 
                    ? "bg-[#145CFF] text-[#F8FAFC] shadow-md shadow-[#145CFF]/15" 
                    : "text-slate-400 hover:text-slate-200 hover:bg-[#001B46]/45"
                } ${isCollapsed ? "justify-center" : ""}`}
                title={item.name}
              >
                <Icon size={16} className={`shrink-0 ${isActive ? "text-white" : "text-slate-400"}`} />
                {!isCollapsed && <span className="truncate">{item.name}</span>}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-[#145CFF]/15 p-3 space-y-3 bg-[#001B46]/30">
        {/* Data Refresh Status */}
        <div className={`flex flex-col gap-1.5 ${isCollapsed ? "items-center" : ""}`}>
          {!isCollapsed ? (
            <div className="flex items-center justify-between text-[10px] text-slate-400">
              <span className="font-semibold uppercase tracking-wider">Sync Status</span>
              <button 
                onClick={onRefresh} 
                disabled={isRefreshing}
                className="p-1 rounded hover:bg-[#061A2F] text-[#145CFF] hover:text-[#2570FF] transition-all disabled:opacity-50"
                title="Refresh Weather Data"
              >
                <RefreshCw size={12} className={isRefreshing ? "animate-spin" : ""} />
              </button>
            </div>
          ) : (
            <button 
              onClick={onRefresh} 
              disabled={isRefreshing}
              className="p-1.5 rounded bg-[#061A2F] text-[#145CFF] transition-all disabled:opacity-50"
              title="Refresh Weather Data"
            >
              <RefreshCw size={14} className={isRefreshing ? "animate-spin" : ""} />
            </button>
          )}
          
          {!isCollapsed && (
            <div className="flex flex-col">
              <span className="text-[10px] text-slate-300 font-extrabold flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-[#0E8F6E] animate-pulse"></span>
                Live Storm Feeds Connected
              </span>
              <span className="text-[8.5px] text-slate-500 font-mono mt-0.5">
                Updated: {formatLastUpdated()}
              </span>
            </div>
          )}
        </div>

        {/* Support & Collapse Buttons */}
        <div className="space-y-1">
          <button 
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-slate-400 hover:text-slate-200 hover:bg-[#061A2F] text-xs font-bold transition-all ${
              isCollapsed ? "justify-center" : ""
            }`}
            onClick={() => alert("StormTarget Support Center: Please email support@stormtarget.live for immediate assistance.")}
            title="Support"
          >
            <HelpCircle size={16} className="shrink-0" />
            {!isCollapsed && <span>Support</span>}
          </button>

          <button 
            onClick={() => setIsCollapsed(!isCollapsed)}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-slate-400 hover:text-slate-200 hover:bg-[#061A2F] text-xs font-bold transition-all ${
              isCollapsed ? "justify-center" : ""
            }`}
            title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
          >
            {isCollapsed ? (
              <ChevronRight size={16} className="shrink-0" />
            ) : (
              <ChevronLeft size={16} className="shrink-0" />
            )}
            {!isCollapsed && <span>Collapse</span>}
          </button>
        </div>
      </div>
    </aside>
  );
}
