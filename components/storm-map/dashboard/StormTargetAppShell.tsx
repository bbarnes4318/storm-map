"use client";

import React from "react";
import { DashboardSidebar, NavItemType } from "./DashboardSidebar";
import { DashboardTopbar } from "./DashboardTopbar";
import { StormTargetDashboard } from "./StormTargetDashboard";
import { GuidedMarketAnalysis } from "./GuidedMarketAnalysis";
import { SelectedPropertyTarget, StormReport, NwsAlert } from "@/lib/weather/types";
import { USCounty } from "@/lib/geo/us-counties";
import { reverseGeocodeMapbox } from "@/lib/weather/geocoding";
import { collectRadiusLeads } from "../enrichment/enrichment-client";
import { AlertTriangle, Database, FileText, Settings, UserCheck, Bell, MapPin } from "lucide-react";

interface StormTargetAppShellProps {
  reports: StormReport[];
  alerts: NwsAlert[];
  isLoadingReports: boolean;
  isRefreshingReports: boolean;
  lastUpdatedReports: Date | null;
  onRefreshReports: () => void;
  // Render the existing Map component as a child
  children: React.ReactNode;
  
  // Property and Lead states
  selectedProperty: SelectedPropertyTarget | null;
  setSelectedProperty: (prop: SelectedPropertyTarget | null) => void;
  leads: SelectedPropertyTarget[];
  onAddLeads: (newLeads: SelectedPropertyTarget[]) => void;
  onRemoveLead: (leadId: string) => void;
  onUpdateLead: (updatedLead: SelectedPropertyTarget) => void;
}

export function StormTargetAppShell({
  reports,
  alerts,
  isLoadingReports,
  isRefreshingReports,
  lastUpdatedReports,
  onRefreshReports,
  children,
  selectedProperty,
  setSelectedProperty,
  leads,
  onAddLeads,
  onRemoveLead,
  onUpdateLead
}: StormTargetAppShellProps) {
  const [activeNav, setActiveNav] = React.useState<NavItemType>("Dashboard");
  const [isSidebarCollapsed, setIsSidebarCollapsed] = React.useState(false);
  const [selectedMarket, setSelectedMarket] = React.useState<{
    stateCode: string;
    counties: USCounty[];
    radiusMiles: number;
  } | null>(null);

  const [isAnalyzing, setIsAnalyzing] = React.useState(false);
  
  // Geocode address query handler
  const handleSearchAddress = async (query: string): Promise<boolean> => {
    const token = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;
    if (!token) {
      console.error("Mapbox token is missing");
      return false;
    }

    try {
      const url = new URL("https://api.mapbox.com/search/geocode/v6/forward");
      url.searchParams.set("q", query);
      url.searchParams.set("limit", "1");
      url.searchParams.set("access_token", token);

      const response = await fetch(url.toString());
      if (!response.ok) return false;

      const data = await response.json();
      if (!data.features || data.features.length === 0) return false;

      const feature = data.features[0];
      const props = feature.properties;
      const ctx = props.context || {};
      const coords = feature.geometry.coordinates; // [lon, lat]

      const target: SelectedPropertyTarget = {
        id: props.mapbox_id || feature.id || `target-${Date.now()}`,
        latitude: coords[1],
        longitude: coords[0],
        fullAddress: props.full_address || props.name || props.place_name || query,
        streetNumber: props.address_number,
        streetName: props.street_name || ctx.street?.name,
        neighborhood: ctx.neighborhood?.name,
        city: ctx.place?.name,
        county: ctx.district?.name,
        state: ctx.region?.region_code || ctx.region?.name,
        postcode: ctx.postcode?.name,
        source: "mapbox-geocoding",
        confidence: props.feature_type === "address" ? "exact" : "approximate",
        locked: false
      };

      // Set property and navigate to Dashboard to view details
      setSelectedProperty(target);
      setSelectedMarket(null); // Clear active market selector
      setActiveNav("Dashboard");
      return true;
    } catch (err) {
      console.error("Failed to forward geocode query:", err);
      return false;
    }
  };

  const handleClearAll = () => {
    setSelectedProperty(null);
    setSelectedMarket(null);
  };

  const handleAnalyzeMarket = async (market: {
    stateCode: string;
    counties: USCounty[];
    radiusMiles: number;
  }) => {
    setSelectedMarket(market);
    setSelectedProperty(null); // Clear selected property context
    setIsAnalyzing(false);

    // Call Overpass radius leads fetch for county centroids
    if (market.counties.length > 0) {
      const firstCounty = market.counties[0];
      if (firstCounty.centroid) {
        try {
          const res = await collectRadiusLeads(
            firstCounty.centroid.lat,
            firstCounty.centroid.lon,
            market.radiusMiles,
            `market-opportunity-${Date.now()}`,
            { county: firstCounty.countyName, state: market.stateCode }
          );
          if (res.leads && res.leads.length > 0) {
            onAddLeads(res.leads);
          }
        } catch (err) {
          console.warn("Radius leads query for county failed:", err);
        }
      }
    }
  };

  const handleSelectLeadFromList = (lead: SelectedPropertyTarget) => {
    setSelectedProperty(lead);
    setSelectedMarket(null);
    setActiveNav("Dashboard");
  };

  // Render content based on navigation path
  const renderMainContent = () => {
    switch (activeNav) {
      case "Dashboard":
        if (selectedProperty || selectedMarket) {
          return (
            <StormTargetDashboard
              selectedProperty={selectedProperty}
              selectedMarket={selectedMarket}
              reports={reports}
              alerts={alerts}
              leads={leads}
              onTriggerGeocodeAddress={handleSearchAddress}
              onClearAll={handleClearAll}
              onOpenLiveStormMap={() => setActiveNav("Live Storms")}
            />
          );
        }
        return (
          <div className="flex-1 flex flex-col items-center justify-center p-6 bg-[#F8FAFC]">
            <div className="w-full max-w-xl text-center space-y-4 mb-6">
              <h2 className="text-xl md:text-2xl font-black text-[#0F172A] tracking-tight uppercase">
                Welcome to STORMTARGET Live
              </h2>
              <p className="text-xs text-[#64748B] max-w-sm mx-auto leading-relaxed">
                Roofing storm intelligence console. Search a specific property address in the top bar, or use the guided market selector below to run local county analysis.
              </p>
            </div>
            <GuidedMarketAnalysis
              onAnalyze={handleAnalyzeMarket}
              isAnalyzing={isAnalyzing}
              setIsAnalyzing={setIsAnalyzing}
            />
          </div>
        );

      case "Live Storms":
        // Render the children (existing StormMap)
        return (
          <div className="flex-1 h-full relative">
            {children}
          </div>
        );

      case "Property Lookup":
        return (
          <div className="flex-1 flex flex-col items-center justify-center p-6 bg-[#F8FAFC] space-y-6">
            <div className="w-full max-w-md bg-white border border-[#E5E7EB] rounded-2xl p-6 shadow-md space-y-4">
              <div className="flex items-center gap-2 text-[#145CFF]">
                <MapPin size={18} />
                <h3 className="font-extrabold text-sm uppercase tracking-wider text-[#0F172A]">Property Address Lookup</h3>
              </div>
              <p className="text-xs text-[#64748B] leading-relaxed">
                Directly geocode a target building or roof coordinate to extract storm parameters and request contact intelligence.
              </p>
              
              <form 
                onSubmit={async (e) => {
                  e.preventDefault();
                  const val = (e.currentTarget.elements.namedItem("search") as HTMLInputElement).value;
                  if (val) {
                    const ok = await handleSearchAddress(val);
                    if (!ok) alert("Address search failed. Try entering a full street number and zip code.");
                  }
                }}
                className="space-y-3"
              >
                <input
                  name="search"
                  type="text"
                  placeholder="Enter full address or coordinate point..."
                  className="w-full bg-[#F8FAFC] border border-[#E5E7EB] rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-[#145CFF]"
                />
                <button
                  type="submit"
                  className="w-full py-2 bg-[#145CFF] hover:bg-[#2570FF] text-white text-xs font-black uppercase tracking-wider rounded-lg shadow-sm border-none transition-all cursor-pointer"
                >
                  Locate Property
                </button>
              </form>
            </div>
          </div>
        );

      case "Leads":
        return (
          <div className="flex-1 p-6 bg-[#F8FAFC] overflow-y-auto custom-scrollbar space-y-6">
            <div className="flex items-center justify-between border-b border-[#E5E7EB] pb-3">
              <div>
                <h2 className="text-lg font-black uppercase text-[#0F172A] tracking-wider">Property Leads</h2>
                <p className="text-xs text-[#64748B]">Review, manage, and unlock geocoded lead targets inside storm areas.</p>
              </div>
              <span className="bg-[#145CFF]/10 text-[#145CFF] px-3 py-1 rounded-full text-xs font-bold">
                {leads.length} Leads Stored
              </span>
            </div>

            {leads.length === 0 ? (
              <div className="flex flex-col items-center justify-center text-center py-20 bg-white border border-[#E5E7EB] rounded-2xl p-6 shadow-sm space-y-3">
                <Database size={32} className="text-[#64748B] animate-pulse" />
                <h4 className="font-extrabold text-xs text-[#0F172A] uppercase">Lead Repository Empty</h4>
                <p className="text-xs text-[#64748B] max-w-xs leading-normal">
                  Run a county search or geocode a property address to add candidate buildings to this active outreach database.
                </p>
              </div>
            ) : (
              <div className="bg-white border border-[#E5E7EB] rounded-xl overflow-hidden shadow-sm">
                <table className="w-full border-collapse text-left text-xs">
                  <thead>
                    <tr className="bg-[#F8FAFC] border-b border-[#E5E7EB] text-[#64748B] font-bold">
                      <th className="p-3">Target Address</th>
                      <th className="p-3">County / State</th>
                      <th className="p-3">Coordinates</th>
                      <th className="p-3">Status</th>
                      <th className="p-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E5E7EB] font-medium text-[#475569]">
                    {leads.map((lead) => (
                      <tr key={lead.id} className="hover:bg-slate-50 transition-colors">
                        <td className="p-3 text-[#0F172A] font-bold">{lead.fullAddress}</td>
                        <td className="p-3">{lead.county || "N/A"}, {lead.state || "N/A"}</td>
                        <td className="p-3 font-mono text-slate-500">{lead.latitude.toFixed(4)}, {lead.longitude.toFixed(4)}</td>
                        <td className="p-3">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            lead.unlockId 
                              ? "bg-emerald-50 text-emerald-700 border border-emerald-100" 
                              : "bg-slate-100 text-slate-600"
                          }`}>
                            {lead.unlockId ? "Contact Unlocked" : "Locked"}
                          </span>
                        </td>
                        <td className="p-3 text-right">
                          <div className="flex justify-end gap-2">
                            <button
                              onClick={() => handleSelectLeadFromList(lead)}
                              className="px-2.5 py-1 bg-[#145CFF] hover:bg-[#2570FF] text-white text-[10px] font-black uppercase tracking-wider rounded shadow-sm border-none cursor-pointer"
                            >
                              Analyze
                            </button>
                            <button
                              onClick={() => onRemoveLead(lead.id)}
                              className="px-2.5 py-1 bg-white hover:bg-red-50 border border-red-200 text-red-650 hover:text-red-750 text-[10px] font-black uppercase tracking-wider rounded cursor-pointer"
                            >
                              Remove
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        );

      case "Reports":
        return (
          <div className="flex-1 p-6 bg-[#F8FAFC] overflow-y-auto custom-scrollbar space-y-6 flex flex-col items-center justify-center">
            <div className="w-full max-w-md bg-white border border-[#E5E7EB] rounded-2xl p-8 shadow-md text-center space-y-4">
              <FileText size={36} className="mx-auto text-[#145CFF]" />
              <h3 className="font-extrabold text-sm uppercase tracking-wider text-[#0F172A]">Opportunity Reports</h3>
              <p className="text-xs text-[#64748B] leading-relaxed">
                No PDF reports compiled yet. Click **Create Report** in the Opportunity Dashboard header to generate a detailed storm impact and address list breakdown.
              </p>
            </div>
          </div>
        );

      case "CRM":
        return (
          <div className="flex-1 p-6 bg-[#F8FAFC] overflow-y-auto custom-scrollbar flex flex-col items-center justify-center">
            <div className="w-full max-w-md bg-white border border-[#E5E7EB] rounded-2xl p-8 shadow-md text-center space-y-4">
              <Database size={36} className="mx-auto text-[#145CFF]" />
              <h3 className="font-extrabold text-sm uppercase tracking-wider text-[#0F172A]">CRM Integration</h3>
              <p className="text-xs text-[#64748B] leading-relaxed">
                CRM integration is not active yet. Connect Salesforce, HubSpot, or JobNimbus to sync lead cards automatically.
              </p>
            </div>
          </div>
        );

      case "Alerts":
        return (
          <div className="flex-1 p-6 bg-[#F8FAFC] overflow-y-auto custom-scrollbar flex flex-col items-center justify-center">
            <div className="w-full max-w-md bg-white border border-[#E5E7EB] rounded-2xl p-8 shadow-md text-center space-y-4">
              <Bell size={36} className="mx-auto text-[#145CFF]" />
              <h3 className="font-extrabold text-sm uppercase tracking-wider text-[#0F172A]">Live Weather Alerts</h3>
              <p className="text-xs text-[#64748B] leading-relaxed">
                You are currently caught up. No severe storm alerts or tornado warning vectors intersecting your selected markets.
              </p>
            </div>
          </div>
        );

      case "Settings":
        return (
          <div className="flex-1 p-6 bg-[#F8FAFC] overflow-y-auto custom-scrollbar flex flex-col items-center justify-center">
            <div className="w-full max-w-md bg-white border border-[#E5E7EB] rounded-2xl p-8 shadow-md text-center space-y-4">
              <Settings size={36} className="mx-auto text-[#145CFF]" />
              <h3 className="font-extrabold text-sm uppercase tracking-wider text-[#0F172A]">App & Account Settings</h3>
              <p className="text-xs text-[#64748B] leading-relaxed">
                Standard profile, credit management, api integrations, and team subscription options.
              </p>
            </div>
          </div>
        );

      default:
        return (
          <div className="flex-1 flex items-center justify-center text-xs text-slate-400 italic">
            Select a menu item in the left sidebar.
          </div>
        );
    }
  };

  const getActiveMarketLabel = () => {
    if (selectedProperty) {
      return selectedProperty.city || selectedProperty.county || selectedProperty.state || "Active Property";
    }
    if (selectedMarket) {
      return `${selectedMarket.counties.map(c => c.countyName).join(", ")}, ${selectedMarket.stateCode}`;
    }
    return null;
  };

  return (
    <div className="h-screen w-full flex overflow-hidden bg-slate-900 font-sans select-none">
      {/* Left Sidebar */}
      <DashboardSidebar
        activeNav={activeNav}
        setActiveNav={setActiveNav}
        isCollapsed={isSidebarCollapsed}
        setIsCollapsed={setIsSidebarCollapsed}
        lastUpdated={lastUpdatedReports}
        onRefresh={onRefreshReports}
        isRefreshing={isRefreshingReports}
      />

      {/* Main Workspace Frame */}
      <div className="flex-1 h-full flex flex-col overflow-hidden">
        {/* Topbar */}
        <DashboardTopbar
          selectedMarketLabel={getActiveMarketLabel()}
          onSearchAddress={handleSearchAddress}
          onClearMarket={handleClearAll}
        />

        {/* Content Container */}
        <div className="flex-1 w-full overflow-hidden flex relative">
          {renderMainContent()}
        </div>
      </div>
    </div>
  );
}
export default StormTargetAppShell;
