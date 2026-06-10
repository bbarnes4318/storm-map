"use client";

import React from "react";
// Import Mapbox GL JS and React Map GL wrapper
import Map, { MapRef } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";

// Import types and helper utilities
import { StormFilterState, StormReport, NwsAlert } from "@/lib/weather/types";
import { StormLegend } from "./StormLegend";
import { Compass, Maximize2, RefreshCw, EyeOff, Eye, AlertCircle } from "lucide-react";
import { getDistanceMiles, clusterStormReports } from "@/lib/weather/geo";

// TODO: Phase 3 - Re-enable and adapt these overlay imports for Mapbox once migrated
// import { StormReportMarker } from "./StormReportMarker";
// import { AlertPolygonLayer } from "./AlertPolygonLayer";

interface StormMapProps {
  filters: StormFilterState;
  onFiltersChange: (newFilters: Partial<StormFilterState>) => void;
  reports: StormReport[];
  alerts: NwsAlert[];
  onRefresh: () => void;
  isRefreshing: boolean;
}

export function StormMap({
  filters,
  onFiltersChange,
  reports,
  alerts,
  onRefresh,
  isRefreshing,
}: StormMapProps) {
  const defaultCenter = { latitude: 38.5, longitude: -96.5 }; // Central US
  const defaultZoom = 3.8;

  const [mapZoom, setMapZoom] = React.useState(defaultZoom);
  const [showLegend, setShowLegend] = React.useState(true);

  // Initialize Mapbox camera state
  const [viewState, setViewState] = React.useState({
    latitude: filters.center ? filters.center[0] : defaultCenter.latitude,
    longitude: filters.center ? filters.center[1] : defaultCenter.longitude,
    zoom: filters.center ? 8.5 : defaultZoom,
  });

  const mapRef = React.useRef<MapRef>(null);
  const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;

  // Synchronize filters.center changes with Mapbox camera
  React.useEffect(() => {
    if (filters.center) {
      const targetZoom = viewState.zoom < 7 ? 8.5 : viewState.zoom;
      setViewState((prev) => ({
        ...prev,
        latitude: filters.center![0],
        longitude: filters.center![1],
        zoom: targetZoom,
      }));

      if (mapRef.current) {
        mapRef.current.flyTo({
          center: [filters.center[1], filters.center[0]], // [longitude, latitude]
          zoom: targetZoom,
          duration: 1200,
        });
      }
    }
  }, [filters.center]);

  const handleMove = (evt: any) => {
    setViewState(evt.viewState);
    setMapZoom(evt.viewState.zoom);
  };

  // Filter reports (preserve data flow calculations)
  const filteredReports = React.useMemo(() => {
    return reports.filter((r) => {
      // State boundary filter
      if (filters.state && r.state.toUpperCase() !== filters.state.toUpperCase()) {
        return false;
      }
      
      // Radius filter around geocoded center
      if (filters.center && filters.radius > 0) {
        const dist = getDistanceMiles(filters.center[0], filters.center[1], r.lat, r.lon);
        if (dist > filters.radius) return false;
      }

      // Report types toggles
      if (r.type === "hail" && !filters.showHail) return false;
      if (r.type === "wind" && !filters.showWind) return false;
      if (r.type === "tornado" && !filters.showTornado) return false;

      // Time timeframe filters
      if (filters.timeWindow === "today" && r.eventDate !== "today") return false;
      if (filters.timeWindow === "yesterday" && r.eventDate !== "yesterday") return false;

      return true;
    });
  }, [reports, filters]);

  // Cluster reports (preserve data flow calculations)
  const mapClusters = React.useMemo(() => {
    return clusterStormReports(filteredReports, alerts);
  }, [filteredReports, alerts]);

  const handleGeolocate = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        onFiltersChange({
          center: [lat, lon],
          searchQuery: "My Current Location",
        });
      },
      (error) => {
        console.error("Geolocation error:", error);
        alert("Unable to retrieve your location. Please check your browser permissions.");
      }
    );
  };

  const handleResetMap = () => {
    onFiltersChange({ center: null, searchQuery: "", radius: 0, state: "" });
    setViewState({
      latitude: defaultCenter.latitude,
      longitude: defaultCenter.longitude,
      zoom: defaultZoom,
    });
    if (mapRef.current) {
      mapRef.current.flyTo({
        center: [defaultCenter.longitude, defaultCenter.latitude],
        zoom: defaultZoom,
        duration: 1000,
      });
    }
  };

  // MapStyle URL mapper
  const getMapStyleUrl = (style: string) => {
    switch (style) {
      case "dark":
        return "mapbox://styles/mapbox/dark-v11";
      case "satellite":
        return "mapbox://styles/mapbox/satellite-streets-v12";
      case "streets":
      default:
        return "mapbox://styles/mapbox/streets-v12";
    }
  };

  // If token is missing, render clean professional map-panel error state
  if (!mapboxToken) {
    return (
      <div className="w-full h-full bg-slate-950 flex flex-col items-center justify-center p-6 text-slate-400 border border-slate-900 rounded-lg">
        <AlertCircle size={32} className="text-red-500 mb-3" />
        <h3 className="font-extrabold text-sm text-slate-200 uppercase tracking-wide mb-1.5">Map configuration is missing</h3>
        <p className="text-[11px] leading-relaxed text-center max-w-sm">
          Please add NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN to your environment variables to load the weather map.
        </p>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full bg-[#030712] overflow-hidden">
      {/* Mapbox GL Map Canvas */}
      <Map
        {...viewState}
        ref={mapRef}
        onMove={handleMove}
        style={{ width: "100%", height: "100%" }}
        mapStyle={getMapStyleUrl(filters.mapStyle)}
        mapboxAccessToken={mapboxToken}
        maxZoom={18}
        minZoom={2.5}
      >
        {/* TODO: Phase 3 - Port NOAA MapServer radar tiles raster source & layer */}
        {/* TODO: Phase 3 - Port active NWS warnings GeoJSON overlay */}
        {/* TODO: Phase 3 - Port storm reports and clusters markers */}
        {/* TODO: Phase 3 - Port geocoding radius circle & target marker layers */}
      </Map>

      {/* Floating Control Toolbar */}
      <div className="absolute top-4 right-4 z-[1000] flex flex-col gap-2 pointer-events-none">
        <div className="bg-slate-950/95 border border-slate-800 rounded-lg p-1.5 shadow-glass flex flex-col gap-1 pointer-events-auto">
          <button
            onClick={handleGeolocate}
            className="p-2 rounded-md text-slate-400 hover:text-slate-200 hover:bg-slate-900 transition-colors"
            title="Locate Me"
          >
            <Compass size={16} />
          </button>
          <button
            onClick={handleResetMap}
            className="p-2 rounded-md text-slate-400 hover:text-slate-200 hover:bg-slate-900 transition-colors"
            title="Reset Map Bounds"
          >
            <Maximize2 size={16} />
          </button>
          <button
            onClick={onRefresh}
            disabled={isRefreshing}
            className="p-2 rounded-md text-slate-400 hover:text-slate-200 hover:bg-slate-900 transition-colors"
            title="Manual Refresh Data"
          >
            <RefreshCw size={16} className={isRefreshing ? "animate-spin" : ""} />
          </button>
          <button
            onClick={() => setShowLegend(!showLegend)}
            className={`p-2 rounded-md transition-colors ${
              showLegend ? "text-red-500 hover:bg-slate-900" : "text-slate-500 hover:text-slate-300 hover:bg-slate-900"
            }`}
            title="Toggle Legend Panel"
          >
            {showLegend ? <Eye size={16} /> : <EyeOff size={16} />}
          </button>
        </div>

        {showLegend && <StormLegend />}
      </div>
    </div>
  );
}

export default StormMap;
