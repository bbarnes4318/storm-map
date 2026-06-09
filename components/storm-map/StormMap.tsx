"use client";

import React from "react";
import { MapContainer, TileLayer, Circle, useMap } from "react-leaflet";
import L from "leaflet";
import * as Esri from "esri-leaflet";
import { StormFilterState, StormReport, NwsAlert } from "@/lib/weather/types";
import { StormReportMarker } from "./StormReportMarker";
import { AlertPolygonLayer } from "./AlertPolygonLayer";
import { StormLegend } from "./StormLegend";
import { getDistanceMiles, clusterStormReports } from "@/lib/weather/geo";
import { Compass, Maximize2, RefreshCw, Layers, EyeOff, Eye } from "lucide-react";

// Swap coordinates of default marker icons to avoid leaflet resolving bugs in production
// (though we use custom divIcons, standard popups/markers sometimes need this)
if (typeof window !== "undefined") {
  delete (L.Icon.Default.prototype as any)._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
    iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
    shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  });
}

interface StormMapProps {
  filters: StormFilterState;
  onFiltersChange: (newFilters: Partial<StormFilterState>) => void;
  reports: StormReport[];
  alerts: NwsAlert[];
  onRefresh: () => void;
  isRefreshing: boolean;
}

// NOAA Base Reflectivity MapServer Layer Handler using Esri Leaflet
function RadarRadarLayer({ opacity, visible }: { opacity: number; visible: boolean }) {
  const map = useMap();
  const layerRef = React.useRef<any>(null);

  React.useEffect(() => {
    if (!map) return;

    // Remove existing layer if any
    if (layerRef.current) {
      map.removeLayer(layerRef.current);
      layerRef.current = null;
    }

    if (visible) {
      // Use Esri Leaflet dynamicMapLayer for NOAA radar base reflectivity MapServer
      const radar = Esri.dynamicMapLayer({
        url: "https://mapservices.weather.noaa.gov/eventdriven/rest/services/radar/radar_base_reflectivity/MapServer",
        opacity: opacity,
        useCors: true,
        f: "image",
      });

      radar.addTo(map);
      layerRef.current = radar;
    }

    return () => {
      if (layerRef.current && map) {
        map.removeLayer(layerRef.current);
        layerRef.current = null;
      }
    };
  }, [map, visible]);

  React.useEffect(() => {
    if (layerRef.current) {
      layerRef.current.setOpacity(opacity);
    }
  }, [opacity]);

  return null;
}

// Map Event handlers & Controller to handle centering and zooming dynamically
function MapController({
  center,
  zoom,
  onZoomChange,
}: {
  center: [number, number] | null;
  zoom: number;
  onZoomChange: (z: number) => void;
}) {
  const map = useMap();

  React.useEffect(() => {
    if (!map) return;
    if (center) {
      map.setView(center, zoom);
    }
  }, [map, center, zoom]);

  React.useEffect(() => {
    if (!map) return;
    const onZoom = () => {
      onZoomChange(map.getZoom());
    };
    map.on("zoomend", onZoom);
    return () => {
      map.off("zoomend", onZoom);
    };
  }, [map, onZoomChange]);

  return null;
}

export function StormMap({
  filters,
  onFiltersChange,
  reports,
  alerts,
  onRefresh,
  isRefreshing,
}: StormMapProps) {
  const defaultCenter: [number, number] = [38.5, -96.5]; // Central US
  const defaultZoom = 4.5;

  const [mapZoom, setMapZoom] = React.useState(defaultZoom);
  const [showLegend, setShowLegend] = React.useState(true);

  // Filter reports
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

      // Report types
      if (r.type === "hail" && !filters.showHail) return false;
      if (r.type === "wind" && !filters.showWind) return false;
      if (r.type === "tornado" && !filters.showTornado) return false;

      // Time filter
      if (filters.timeWindow === "today" && r.eventDate !== "today") return false;
      if (filters.timeWindow === "yesterday" && r.eventDate !== "yesterday") return false;

      return true;
    });
  }, [reports, filters]);

  // Cluster reports when zoomed out
  const mapClusters = React.useMemo(() => {
    return clusterStormReports(filteredReports, alerts);
  }, [filteredReports, alerts]);

  // Geolocation trigger
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
    setMapZoom(defaultZoom);
  };

  // Custom SVG cluster marker builder
  const createClusterIcon = (cluster: any) => {
    let bgClass = "bg-blue-600/90";
    let borderClass = "border-blue-300";
    let shadowClass = "shadow-glow-hail";

    if (cluster.tornadoCount > 0) {
      bgClass = "bg-red-600/90 animate-target-pulse";
      borderClass = "border-red-200";
      shadowClass = "shadow-glow-tornado";
    } else if (cluster.windCount > 0) {
      bgClass = "bg-orange-500/90";
      borderClass = "border-orange-200";
      shadowClass = "shadow-glow-wind";
    }

    const html = `
      <div class="w-10 h-10 rounded-full ${bgClass} border-2 ${borderClass} ${shadowClass} flex flex-col items-center justify-center text-white relative transition-transform hover:scale-105 cursor-pointer">
        <span class="text-[11px] font-black leading-none">${cluster.reportsCount}</span>
        <span class="text-[6.5px] font-black uppercase tracking-tighter leading-none mt-0.5">${cluster.mainStormType.slice(0, 4)}</span>
      </div>
    `;

    return L.divIcon({
      html,
      className: "custom-cluster-marker",
      iconSize: [40, 40],
      iconAnchor: [20, 20],
    });
  };

  // Dynamic zoom centering when a user clicks a cluster
  const handleClusterClick = (clusterCenter: [number, number]) => {
    onFiltersChange({ center: clusterCenter });
    setMapZoom(9); // Zoom in past clustering threshold
  };

  const shouldCluster = mapZoom <= 7;

  return (
    <div className="relative w-full h-full bg-[#030712] overflow-hidden">
      {/* Leaflet MapContainer */}
      <MapContainer
        center={filters.center || defaultCenter}
        zoom={mapZoom}
        zoomControl={false} // Disable default controls to position them customly
        className="w-full h-full"
        maxZoom={18}
        minZoom={3}
      >
        {/* Sleek, Dark Base Map Tiles */}
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        />

        {/* Live NOAA Base Reflectivity Radar Overlay */}
        <RadarRadarLayer opacity={filters.radarOpacity} visible={filters.showRadar} />

        {/* Active NWS Alert Warning Polygons */}
        {filters.showAlerts && <AlertPolygonLayer alerts={alerts} />}

        {/* Storm Report Markers (Individual or Clustered depending on zoom level) */}
        {shouldCluster
          ? mapClusters.map((cluster) => (
              <React.Fragment key={cluster.id}>
                <Circle
                  center={cluster.center}
                  radius={12000} // ~7.5 miles circle
                  pathOptions={{
                    color: cluster.mainStormType === "tornado" ? "#ef4444" : cluster.mainStormType === "wind" ? "#f97316" : "#3b82f6",
                    fillColor: cluster.mainStormType === "tornado" ? "#ef4444" : cluster.mainStormType === "wind" ? "#f97316" : "#3b82f6",
                    fillOpacity: 0.1,
                    weight: 1,
                    dashArray: "3, 6",
                  }}
                  eventHandlers={{
                    click: () => handleClusterClick(cluster.center),
                  }}
                />
                <StormReportMarker
                  key={cluster.id}
                  report={{
                    id: cluster.id,
                    type: cluster.mainStormType,
                    timeRaw: "",
                    eventDate: "today",
                    location: `${cluster.name} (Cluster Center)`,
                    county: cluster.county,
                    state: cluster.state,
                    lat: cluster.center[0],
                    lon: cluster.center[1],
                    magnitude: cluster.highestMagnitude.split(" ")[0],
                    comments: `Opportunity cluster: ${cluster.reportsCount} severe storm reports nearby. Suggested radius: ${cluster.suggestedRadius} miles. Max report score: ${cluster.maxScore} pts.`,
                    source: "SPC",
                  }}
                  activeAlerts={alerts}
                  allReports={filteredReports}
                />
              </React.Fragment>
            ))
          : filteredReports.map((report) => (
              <StormReportMarker
                key={report.id}
                report={report}
                activeAlerts={alerts}
                allReports={filteredReports}
              />
            ))}

        {/* Search Target Radius Circle */}
        {filters.center && filters.radius > 0 && (
          <Circle
            center={filters.center}
            radius={filters.radius * 1609.34} // Convert miles to meters
            pathOptions={{
              color: "#ef4444",
              fillColor: "#ef4444",
              fillOpacity: 0.04,
              weight: 1.5,
              dashArray: "6, 6",
            }}
          />
        )}

        {/* Geocoding Target Pin marker */}
        {filters.center && (
          <Circle
            center={filters.center}
            radius={250} // 250m point marker
            pathOptions={{
              color: "#ef4444",
              fillColor: "#ef4444",
              fillOpacity: 0.8,
              weight: 3,
            }}
          />
        )}

        {/* Component to trigger camera adjustments */}
        <MapController
          center={filters.center}
          zoom={mapZoom}
          onZoomChange={setMapZoom}
        />
      </MapContainer>

      {/* Floating Control Toolbar */}
      <div className="absolute top-4 right-4 z-[1000] flex flex-col gap-2 pointer-events-none">
        {/* Map Actions */}
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

        {/* Floating Legend */}
        {showLegend && <StormLegend />}
      </div>
    </div>
  );
}
export default StormMap;
