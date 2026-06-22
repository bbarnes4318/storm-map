"use client";

import React from "react";
import { X, Download, Lock, CheckCircle, Database } from "lucide-react";

interface SampleLeadFileModalProps {
  isOpen: boolean;
  onClose: () => void;
  county: string;
  state: string;
  onUpgrade: () => void;
  onContinueExploring?: () => void;
  isDemo?: boolean;
}

export function SampleLeadFileModal({
  isOpen,
  onClose,
  county,
  state,
  onUpgrade,
  onContinueExploring,
  isDemo = false,
}: SampleLeadFileModalProps) {
  if (!isOpen) return null;

  // Generate 10 realistic mock rows based on selected state/county
  const mockRows = React.useMemo(() => {
    const firstNames = ["Michael", "Angela", "David", "Sarah", "Robert", "Jennifer", "James", "Emily", "William", "Jessica"];
    const lastNames = ["Turner", "Brooks", "Carter", "Davis", "Evans", "Fisher", "Green", "Harris", "Jackson", "King"];
    
    // TN/Knox customized values, otherwise fallback
    const isKnox = county.toLowerCase().includes("knox") && state.toUpperCase() === "TN";
    
    const streetNames = isKnox 
      ? ["Ridge Valley Dr", "Meadow Creek Ln", "Oak Ridge Hwy", "Kingston Pike", "Broadway St", "Northshore Dr", "Cedar Bluff Rd", "Lakeside Dr", "Amherst Rd", "Middlebrook Pike"]
      : ["Oak Avenue", "Maple Lane", "Pine Street", "Cedar Boulevard", "Hickory Road", "Elm Court", "Walnut Way", "Birch Crossing", "Willow Avenue", "Cherry Drive"];
      
    const zips = isKnox 
      ? ["37922", "37931", "37919", "37920", "37909", "37934", "37921", "37918", "37923", "37932"]
      : ["90210", "90211", "90212", "90213", "90214", "90215", "90216", "90217", "90218", "90219"];
      
    const city = isKnox ? "Knoxville" : (county.toLowerCase().includes("cleveland") && state.toUpperCase() === "OK" ? "Norman" : `${county} City`);
    const areaCode = isKnox ? "865" : (state.toUpperCase() === "OK" && county.toLowerCase().includes("cleveland") ? "405" : "555");

    return Array.from({ length: 10 }).map((_, i) => {
      const isHail = i % 3 === 0;
      const isWind = i % 3 === 1;
      const isTornado = i % 3 === 2;

      return {
        name: `${firstNames[i]} ${lastNames[i]}`,
        address: `${100 + i * 147} ${streetNames[i]}`,
        city,
        state: state.toUpperCase(),
        zip: zips[i],
        county: county,
        phone: `(${areaCode}) 555-01${10 + i}`,
        email: `${firstNames[i].toLowerCase()}.${lastNames[i].toLowerCase()}@example.com`,
        roofAge: `${5 + (i * 3) % 15} yrs`,
        propertyType: i % 4 === 0 ? "Commercial" : "Single Family",
        stormDate: isDemo ? "2025-06-15" : "2026-06-18",
        stormType: isHail ? "Hail" : (isWind ? "Wind" : "Tornado"),
        hailSize: isHail ? `${1.0 + (i * 0.25).toFixed(2)}"` : "-",
        windSpeed: isWind ? `${60 + i * 2} mph` : "-",
        confidence: isHail || isTornado ? "High" : "Medium",
      };
    });
  }, [county, state, isDemo]);

  // Export mock rows to CSV string and download
  const handleDownloadCsv = () => {
    const headers = [
      "Homeowner Name", "Property Address", "City", "State", "ZIP", "County",
      "Phone", "Email", "Roof Age", "Property Type", "Storm Date", "Storm Type",
      "Hail Size", "Wind Speed", "Confidence Score"
    ];
    
    const rowsCsv = mockRows.map(row => [
      `"${row.name}"`,
      `"${row.address}"`,
      `"${row.city}"`,
      `"${row.state}"`,
      `"${row.zip}"`,
      `"${row.county}"`,
      `"${row.phone}"`,
      `"${row.email}"`,
      `"${row.roofAge}"`,
      `"${row.propertyType}"`,
      `"${row.stormDate}"`,
      `"${row.stormType}"`,
      `"${row.hailSize}"`,
      `"${row.windSpeed}"`,
      `"${row.confidence}"`
    ].join(","));

    const csvContent = [headers.join(","), ...rowsCsv].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `sample_leads_${county.toLowerCase().replace(/\s+/g, '_')}_${state.toLowerCase()}.csv`);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleSendToSMS = () => {
    try {
      const jsonString = JSON.stringify(mockRows);
      const base64String = btoa(unescape(encodeURIComponent(jsonString)));
      const targetHost = typeof window !== "undefined" && window.location.hostname.includes("localhost")
        ? "http://localhost:3000"
        : "https://sms.leadzer.io";
      const url = `${targetHost}/?import=storm-map-demo&data=${base64String}&county=${encodeURIComponent(county)}&state=${encodeURIComponent(state)}`;
      window.open(url, "_blank", "noopener,noreferrer");
    } catch (err) {
      console.error("Failed to send leads to SMS app:", err);
      alert("Failed to package and send leads.");
    }
  };

  return (
    <div className="fixed inset-0 z-[3000] flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm select-none animate-in fade-in duration-300">
      
      {/* Modal Card Box */}
      <div 
        data-tour="sample-modal"
        className="w-full max-w-6xl bg-[#071426] border border-[rgba(20,92,255,0.25)] rounded-2xl shadow-2xl flex flex-col max-h-[85vh] overflow-hidden select-text"
      >
        
        {/* Modal Header */}
        <div className="p-4 border-b border-[rgba(20,92,255,0.15)] flex items-center justify-between shrink-0 bg-[#0B1930]/40">
          <div className="flex items-center gap-2">
            <Database className="w-5 h-5 text-[#145CFF]" />
            <div>
              <h2 className="text-sm font-black text-[#F8FAFC] uppercase tracking-wider leading-tight">
                Sample Lead File Preview {isDemo && "· DEMO MODE"}
              </h2>
              <p className="text-[10px] text-slate-400 font-medium">
                Example fields included with a StormTarget subscription. Showing mock data for {county} County, {state}.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onUpgrade}
              className="px-3.5 py-1.5 bg-[#F59E0B] hover:bg-[#F59E0B]/90 text-[#071426] text-[10px] font-black uppercase tracking-wider rounded-lg flex items-center gap-1 transition-all cursor-pointer shadow-md shadow-[#F59E0B]/10 shrink-0 hover:scale-[1.02]"
            >
              <Lock size={10} className="text-[#071426]" />
              <span>Check Pricing</span>
            </button>
            
            <button
              onClick={onClose}
              className="p-1 rounded-full border border-slate-800 hover:border-slate-700 text-slate-400 hover:text-[#F8FAFC] transition-colors cursor-pointer shrink-0"
              title="Close Preview"
            >
              <X size={14} />
            </button>
          </div>
        </div>

        {/* Warning Badge / Notice */}
        <div className="mx-4 mt-3 bg-amber-500/10 border border-amber-500/25 p-2 rounded-lg text-[9.5px] text-amber-300 font-semibold flex items-center gap-2 shrink-0 select-none">
          <CheckCircle size={12} className="text-amber-400 shrink-0" />
          <span>
            {isDemo 
              ? "Demo mode lets you preview sample property leads. Columns contain realistic but fake homeowner data for safety and privacy."
              : "This sheet shows sample preview rows for marketing purposes. To unlock live, verified homeowner contact details for this county, upgrade to a subscription."}
          </span>
        </div>

        {/* Excel style grid view */}
        <div className="flex-1 overflow-auto p-4 custom-scrollbar">
          <div className="border border-slate-900 rounded-xl overflow-x-auto excel-scrollbar shadow-lg">
            <table className="min-w-[1500px] w-full text-left border-collapse text-[10px] bg-[#050B16]/70 whitespace-nowrap">
              
              {/* Sticky Header Row */}
              <thead className="bg-[#0B1930] text-[#94A3B8] uppercase font-black tracking-wider text-[8.5px] border-b border-slate-900 sticky top-0 z-10 select-none">
                <tr>
                  <th className="px-3.5 py-2.5 border-r border-slate-900/60">Name</th>
                  <th className="px-3.5 py-2.5 border-r border-slate-900/60">Address</th>
                  <th className="px-3.5 py-2.5 border-r border-slate-900/60">City</th>
                  <th className="px-3.5 py-2.5 border-r border-slate-900/60">State</th>
                  <th className="px-3.5 py-2.5 border-r border-slate-900/60">ZIP</th>
                  <th className="px-3.5 py-2.5 border-r border-slate-900/60">County</th>
                  <th className="px-3.5 py-2.5 border-r border-slate-900/60">Phone</th>
                  <th className="px-3.5 py-2.5 border-r border-slate-900/60">Email</th>
                  <th className="px-3.5 py-2.5 border-r border-slate-900/60 text-center">Roof Age</th>
                  <th className="px-3.5 py-2.5 border-r border-slate-900/60">Type</th>
                  <th className="px-3.5 py-2.5 border-r border-slate-900/60">Storm Date</th>
                  <th className="px-3.5 py-2.5 border-r border-slate-900/60 text-center">Storm Type</th>
                  <th className="px-3.5 py-2.5 border-r border-slate-900/60 text-center">Hail Size</th>
                  <th className="px-3.5 py-2.5 border-r border-slate-900/60 text-center">Wind Speed</th>
                  <th className="px-3.5 py-2.5 text-center">Confidence</th>
                </tr>
              </thead>

              {/* Data Rows */}
              <tbody className="divide-y divide-slate-900/50 font-medium text-slate-300">
                {mockRows.map((row, idx) => (
                  <tr key={idx} className="hover:bg-[rgba(20,92,255,0.04)] transition-colors">
                    <td className="px-3.5 py-2 border-r border-slate-900/40 font-black text-slate-100 flex items-center gap-2">
                      <span>{row.name}</span>
                      {isDemo && (
                        <span className="px-1.5 py-0.5 rounded bg-red-500/10 border border-red-500/20 text-[7px] text-red-400 font-extrabold uppercase select-none tracking-wider shrink-0">
                          SAMPLE DATA
                        </span>
                      )}
                    </td>
                    <td className="px-3.5 py-2 border-r border-slate-900/40 text-slate-400">{row.address}</td>
                    <td className="px-3.5 py-2 border-r border-slate-900/40">{row.city}</td>
                    <td className="px-3.5 py-2 border-r border-slate-900/40 text-center font-bold text-[#145CFF]">{row.state}</td>
                    <td className="px-3.5 py-2 border-r border-slate-900/40 font-mono text-slate-400">{row.zip}</td>
                    <td className="px-3.5 py-2 border-r border-slate-900/40 text-slate-450">{row.county}</td>
                    <td className="px-3.5 py-2 border-r border-slate-900/40 font-mono text-slate-400">{row.phone}</td>
                    <td className="px-3.5 py-2 border-r border-slate-900/40 text-slate-400">{row.email}</td>
                    <td className="px-3.5 py-2 border-r border-slate-900/40 text-center text-amber-500 font-bold">{row.roofAge}</td>
                    <td className="px-3.5 py-2 border-r border-slate-900/40 text-[9px] font-black uppercase text-slate-400">{row.propertyType}</td>
                    <td className="px-3.5 py-2 border-r border-slate-900/40 font-mono text-slate-500">{row.stormDate}</td>
                    <td className="px-3.5 py-2 border-r border-slate-900/40 text-center">
                      <span className={`px-1.5 py-0.5 rounded text-[8px] font-extrabold uppercase ${
                        row.stormType === "Hail" ? "bg-[#2F7DFF]/10 text-[#60A5FA]" : row.stormType === "Wind" ? "bg-[#8B5CF6]/10 text-[#C084FC]" : "bg-[#F43F5E]/10 text-[#FB7185]"
                      }`}>
                        {row.stormType}
                      </span>
                    </td>
                    <td className="px-3.5 py-2 border-r border-slate-900/40 text-center font-mono text-[#60A5FA] font-bold">{row.hailSize}</td>
                    <td className="px-3.5 py-2 border-r border-slate-900/40 text-center font-mono text-[#C084FC] font-bold">{row.windSpeed}</td>
                    <td className="px-3.5 py-2 text-center">
                      <span className={`px-1.5 py-0.5 rounded text-[8px] font-extrabold ${
                        row.confidence === "High" ? "bg-[#0E8F6E]/12 text-[#00A86B]" : "bg-amber-500/10 text-amber-400"
                      }`}>
                        {row.confidence}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modal Footer Controls */}
        <div className="p-4 border-t border-[rgba(20,92,255,0.15)] flex items-center justify-between bg-[#0B1930]/40 shrink-0 select-none">
          <div className="flex items-center gap-2">
            <button
              onClick={handleDownloadCsv}
              data-tour="sample-csv-button"
              className="px-4 py-2 bg-[#145CFF]/15 hover:bg-[#145CFF]/25 border border-[#145CFF]/30 hover:border-[#145CFF]/50 rounded-lg text-xs font-black text-[#F8FAFC] uppercase tracking-wider flex items-center gap-1.5 transition-all cursor-pointer shadow-sm animate-pulse"
            >
              <Download size={13} className="text-[#145CFF]" />
              <span>Download Sample CSV</span>
            </button>

            {isDemo && (
              <button
                onClick={handleSendToSMS}
                className="px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-500/90 hover:to-teal-600/90 border border-emerald-500/30 hover:border-emerald-500/50 rounded-lg text-xs font-black text-[#F8FAFC] uppercase tracking-wider flex items-center gap-1.5 transition-all cursor-pointer shadow-md shadow-emerald-500/10 hover:scale-[1.02]"
              >
                <Database size={13} className="text-[#F8FAFC]" />
                <span>Send Leads to SMS App</span>
              </button>
            )}
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onContinueExploring || onClose}
              className="px-4 py-2 border border-slate-800 hover:border-slate-705 rounded-lg text-xs font-bold text-slate-300 hover:text-[#F8FAFC] transition-all cursor-pointer hover:bg-slate-900/30"
            >
              Continue Exploring Map
            </button>
            <div className="flex flex-col items-end">
              <button
                onClick={onUpgrade}
                className="px-5 py-2 bg-gradient-to-r from-[#F59E0B] to-[#F97316] hover:from-[#F59E0B]/90 hover:to-[#F97316]/90 border-none rounded-lg text-xs font-black text-[#071426] uppercase tracking-wider flex items-center gap-1.5 transition-all cursor-pointer shadow-md shadow-[#F59E0B]/20 hover:scale-[1.02]"
              >
                <Lock size={12} className="text-[#071426]" />
                <span>Check Pricing</span>
              </button>
              <span className="text-[8.5px] text-slate-400 font-semibold mt-1 mr-1">
                Unlock this market or request guaranteed appointments.
              </span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
