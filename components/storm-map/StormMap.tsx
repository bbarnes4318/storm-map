"use client";

import React from "react";
// Import Mapbox GL JS and React Map GL wrapper
import Map, { Source, Layer, Marker, Popup, MapRef, ViewStateChangeEvent, MapLayerMouseEvent } from "react-map-gl";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

// Import types and custom components
import { StormFilterState, StormReport, NwsAlert, SelectedPropertyTarget } from "@/lib/weather/types";
import { AlertPolygonLayer } from "./AlertPolygonLayer";
import { getDistanceMiles, clusterStormReports, calculateReportScore } from "@/lib/weather/geo";
import { reverseGeocodeAddress } from "@/lib/weather/geocoding";
import { Compass, Maximize2, RefreshCw, EyeOff, Eye, AlertCircle, MapPin, Target } from "lucide-react";

const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;

// Custom GeoJSON circle geometry generator (radius in miles, outputs [lon, lat])
function createGeoJsonCircle(
  center: [number, number], // [lat, lon]
  radiusMiles: number,
  points: number = 64
) {
  const [lat, lon] = center;
  const coordinates: [number, number][] = [];
  const distanceRadians = radiusMiles / 3958.8; // Earth's radius in miles
  const latRadians = (lat * Math.PI) / 180;
  const lonRadians = (lon * Math.PI) / 180;

  for (let i = 0; i < points; i++) {
    const angle = (i * 2 * Math.PI) / points;
    const drawLat = Math.asin(
      Math.sin(latRadians) * Math.cos(distanceRadians) +
        Math.cos(latRadians) * Math.sin(distanceRadians) * Math.cos(angle)
    );
    const drawLon =
      lonRadians +
      Math.atan2(
        Math.sin(angle) * Math.sin(distanceRadians) * Math.cos(latRadians),
        Math.cos(distanceRadians) - Math.sin(latRadians) * Math.sin(drawLat)
      );

    coordinates.push([(drawLon * 180) / Math.PI, (drawLat * 180) / Math.PI]);
  }

  // Close the polygon
  coordinates.push(coordinates[0]);

  return {
    type: "Feature" as const,
    geometry: {
      type: "Polygon" as const,
      coordinates: [coordinates],
    },
    properties: {},
  };
}

interface StormMapProps {
  filters: StormFilterState;
  onFiltersChange: (newFilters: Partial<StormFilterState>) => void;
  reports: StormReport[];
  alerts: NwsAlert[];
  onRefresh: () => void;
  isRefreshing: boolean;
  selectedProperty: SelectedPropertyTarget | null;
  onLockProperty: (property: SelectedPropertyTarget) => void;
  onUnlockProperty: () => void;
}

export function StormMap({
  filters,
  onFiltersChange,
  reports,
  alerts,
  onRefresh,
  isRefreshing,
  selectedProperty,
  onLockProperty,
  onUnlockProperty,
}: StormMapProps) {
  const defaultCenter = { latitude: 38.5, longitude: -96.5 }; // Central US
  const defaultZoom = 3.8;

  const [mapZoom, setMapZoom] = React.useState(defaultZoom);
  const [selectedReport, setSelectedReport] = React.useState<StormReport | null>(null);
  const [selectedAlert, setSelectedAlert] = React.useState<NwsAlert | null>(null);
  const [clickedTarget, setClickedTarget] = React.useState<SelectedPropertyTarget | null>(null);
  const [cursor, setCursor] = React.useState<string>("auto");

  const mapRef = React.useRef<MapRef>(null);
  const geocodeAbortControllerRef = React.useRef<AbortController | null>(null);

  // Synchronize filters.center changes with Mapbox camera
  React.useEffect(() => {
    if (filters.center) {
      const targetZoom = filters.targetZoom ?? (viewState.zoom < 7 ? 8.5 : viewState.zoom);
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
  }, [filters.center, filters.targetZoom]);

  const handleMove = (evt: ViewStateChangeEvent) => {
    setViewState(evt.viewState);
    setMapZoom(evt.viewState.zoom);
  };

  // Filter reports according to active sidebar/filter states
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

  // Cluster reports when zoomed out
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
          targetZoom: 16.5,
        });
      },
      (error) => {
        console.error("Geolocation error:", error);
        alert("Unable to retrieve your location. Please check your browser permissions.");
      }
    );
  };

  const handleResetMap = () => {
    onFiltersChange({ center: null, searchQuery: "", radius: 0, state: "", targetZoom: undefined });
    if (mapRef.current) {
      mapRef.current.flyTo({
        center: [defaultCenter.longitude, defaultCenter.latitude],
        zoom: defaultZoom,
        duration: 1000,
      });
    } else {
      setViewState({
        latitude: defaultCenter.latitude,
        longitude: defaultCenter.longitude,
        zoom: defaultZoom,
      });
    }
  };

  const handleZoomToStreetLevel = () => {
    const map = mapRef.current;
    if (map) {
      let targetLat = map.getCenter().lat;
      let targetLon = map.getCenter().lng;

      const isDefaultCenter = Math.abs(targetLat - defaultCenter.latitude) < 0.1 && 
                              Math.abs(targetLon - defaultCenter.longitude) < 0.1;

      if (isDefaultCenter) {
        if (selectedProperty) {
          targetLat = selectedProperty.latitude;
          targetLon = selectedProperty.longitude;
        } else if (filteredReports.length > 0) {
          targetLat = filteredReports[0].lat;
          targetLon = filteredReports[0].lon;
        } else {
          targetLat = 35.2226; // Norman, OK
          targetLon = -97.4395;
        }
      }

      map.flyTo({
        center: [targetLon, targetLat],
        zoom: 16.5,
        duration: 1200,
      });
    }
  };

  const handleClusterClick = (clusterCenter: [number, number]) => {
    onFiltersChange({ center: clusterCenter, targetZoom: 9.5 });
  };

  // Canvas map click geocoding interceptor for warnings/reports clicks
  const handleMapClick = (event: MapLayerMouseEvent) => {
    const map = event.target;
    const zoom = map.getZoom();

    const features = event.features;
    if (features && features.length > 0) {
      // 1. Check if an individual storm report was clicked
      const clickedReportFeature = features.find(
        (f) => f.layer.id === "storm-reports-layer" || f.layer.id === "storm-reports-labels"
      );
      if (clickedReportFeature) {
        const reportId = clickedReportFeature.properties?.id;
        let report = reports.find((r) => String(r.id) === String(reportId));
        if (!report) {
          // Reconstruct as fallback
          const props = clickedReportFeature.properties;
          if (props) {
            report = {
              id: props.id,
              type: props.type,
              timeRaw: props.timeRaw,
              eventDate: props.eventDate,
              location: props.location || "",
              county: props.county || "",
              state: props.state || "",
              lat: props.lat,
              lon: props.lon,
              magnitude: props.magnitude,
              comments: props.comments,
              source: props.source || "SPC",
            };
          }
        }
        if (report) {
          setSelectedReport(report);
          setSelectedAlert(null);
          setClickedTarget(null);
          return;
        }
      }

      // Check if a cluster was clicked
      const clickedClusterFeature = features.find(
        (f) => f.layer.id === "storm-clusters-layer" || f.layer.id === "storm-clusters-count"
      );
      if (clickedClusterFeature) {
        const props = clickedClusterFeature.properties;
        if (props && props.lat !== undefined && props.lon !== undefined) {
          handleClusterClick([Number(props.lat), Number(props.lon)]);
          return;
        }
      }

      // 2. Check if a warning was clicked
      const clickedWarning = features.find((f) => f.layer.id === "warnings-fill");
      if (clickedWarning) {
        const props = clickedWarning.properties;
        if (props) {
          setSelectedAlert({
            id: props.id,
            event: props.event,
            headline: props.headline,
            severity: props.severity,
            certainty: props.certainty,
            urgency: props.urgency || "Unknown",
            effective: props.effective,
            expires: props.expires,
            areaDesc: props.areaDesc,
            instruction: props.instruction || "",
            source: props.source,
            // Store click location to position popup
            polygon: [[event.lngLat.lat, event.lngLat.lng]],
          });
          setSelectedReport(null);
          setClickedTarget(null);
          return;
        }
      }
    }

    if (zoom >= 15) {
      // Clear alert and report selections
      setSelectedAlert(null);
      setSelectedReport(null);

      // Abort previous geocoding request if active
      if (geocodeAbortControllerRef.current) {
        geocodeAbortControllerRef.current.abort();
      }
      geocodeAbortControllerRef.current = new AbortController();
      const signal = geocodeAbortControllerRef.current.signal;

      const clickLat = event.lngLat.lat;
      const clickLon = event.lngLat.lng;

      // Candidate layers to query at the clicked point
      const candidateLayers = [
        "aurum-house-number-labels",
        "building-footprints",
        "building",
        "road-label"
      ];
      const layersToQuery = candidateLayers.filter((layerId) => map.getLayer(layerId));

      let addressFeatureInfo: mapboxgl.MapboxGeoJSONFeature["properties"] | null = null;
      if (layersToQuery.length > 0) {
        const featuresAtPoint = map.queryRenderedFeatures(event.point, { layers: layersToQuery });
        if (featuresAtPoint && featuresAtPoint.length > 0) {
          const houseNumFeature = featuresAtPoint.find((f) => f.properties?.house_num || f.properties?.address_number);
          const buildingFeature = featuresAtPoint.find((f) => f.layer.id === "building" || f.layer.id === "building-footprints");
          if (houseNumFeature) {
            addressFeatureInfo = houseNumFeature.properties;
          } else if (buildingFeature) {
            addressFeatureInfo = buildingFeature.properties;
          }
        }
      }

      reverseGeocodeAddress(clickLat, clickLon, signal)
        .then((target) => {
          if (signal.aborted) return;
          if (target) {
            // Merge neighborhood or details if we queried them from features
            setClickedTarget(target);
          } else {
            setClickedTarget({
              id: `fallback-${Date.now()}`,
              latitude: clickLat,
              longitude: clickLon,
              fullAddress: `Coordinates: ${clickLat.toFixed(5)}, ${clickLon.toFixed(5)}`,
              source: "fallback",
              confidence: "unknown",
              locked: false,
            });
          }
        })
        .catch((err) => {
          if (signal.aborted) return;
          console.error("Geocoding lookup error:", err);
          setClickedTarget({
            id: `fallback-err-${Date.now()}`,
            latitude: clickLat,
            longitude: clickLon,
            fullAddress: `Coordinates: ${clickLat.toFixed(5)}, ${clickLon.toFixed(5)}`,
            source: "fallback",
            confidence: "unknown",
            locked: false,
          });
        });

      return;
    }

    // Clicking elsewhere closes popups
    setSelectedAlert(null);
    setSelectedReport(null);
    setClickedTarget(null);
  };

  // Viewport camera tracking state
  const [viewState, setViewState] = React.useState({
    latitude: filters.center ? filters.center[0] : defaultCenter.latitude,
    longitude: filters.center ? filters.center[1] : defaultCenter.longitude,
    zoom: filters.center ? 8.5 : defaultZoom,
  });

  // Dynamically toggle neighborhood label style layer visibility
  React.useEffect(() => {
    const map = mapRef.current?.getMap();
    if (!map) return;

    const toggleNeighborhoodLabels = () => {
      try {
        const layers = map.getStyle()?.layers || [];
        const neighborhoodLayers = layers.filter(
          (l) => l.id.includes("neighborhood") || l.id.includes("suburb")
        );

        const visibility = filters.showNeighborhoodLabels ? "visible" : "none";
        neighborhoodLayers.forEach((layer) => {
          if (map.getLayer(layer.id)) {
            map.setLayoutProperty(layer.id, "visibility", visibility);
          }
        });
      } catch (err) {
        console.warn("Could not toggle neighborhood label layers:", err);
      }
    };

    if (map.isStyleLoaded()) {
      toggleNeighborhoodLabels();
    } else {
      map.on("style.load", toggleNeighborhoodLabels);
      return () => {
        map.off("style.load", toggleNeighborhoodLabels);
      };
    }
  }, [filters.showNeighborhoodLabels, filters.mapStyle, mapZoom]);

  const handleMapLoad = (evt: mapboxgl.MapboxEvent) => {
    const map = evt.target;
    try {
      const layers = map.getStyle()?.layers || [];
      const neighborhoodLayers = layers.filter(
        (l) => l.id.includes("neighborhood") || l.id.includes("suburb")
      );
      const visibility = filters.showNeighborhoodLabels ? "visible" : "none";
      neighborhoodLayers.forEach((layer) => {
        if (map.getLayer(layer.id)) {
          map.setLayoutProperty(layer.id, "visibility", visibility);
        }
      });
    } catch (err) {
      console.warn("Could not initialize neighborhood label layers on load:", err);
    }
  };

  // Hover pointers over warnings
  const onMouseEnter = React.useCallback(() => setCursor("pointer"), []);
  const onMouseLeave = React.useCallback(() => setCursor("auto"), []);

  const shouldCluster = viewState.zoom < 9;

  // Generate target geocoded search radius GeoJSON polygon
  const radiusCircleGeoJson = React.useMemo(() => {
    if (!filters.center || filters.radius <= 0) return null;
    return createGeoJsonCircle(filters.center, filters.radius);
  }, [filters.center, filters.radius]);

  // Generate cluster boundary concentric rings GeoJSON polygon FeatureCollection
  const clusterCirclesGeoJson = React.useMemo(() => {
    if (!shouldCluster) return null;
    const features = mapClusters.map((cluster) => {
      const circlePolygon = createGeoJsonCircle(cluster.center, 7.5);
      return {
        ...circlePolygon,
        properties: {
          id: cluster.id,
          type: cluster.mainStormType,
        },
      };
    });
    return {
      type: "FeatureCollection" as const,
      features,
    };
  }, [mapClusters, shouldCluster]);

  // Generate cluster points GeoJSON FeatureCollection for cluster bubble centers
  const clusterPointsGeoJson = React.useMemo(() => {
    if (!shouldCluster) return null;
    const features = mapClusters.map((cluster) => {
      return {
        type: "Feature" as const,
        geometry: {
          type: "Point" as const,
          coordinates: [cluster.center[1], cluster.center[0]], // [lon, lat]
        },
        properties: {
          id: cluster.id,
          reportsCount: cluster.reportsCount,
          mainStormType: cluster.mainStormType,
          tornadoCount: cluster.tornadoCount,
          windCount: cluster.windCount,
          hailCount: cluster.hailCount,
          type: cluster.mainStormType,
          label: String(cluster.reportsCount),
          lat: cluster.center[0],
          lon: cluster.center[1],
        },
      };
    });
    return {
      type: "FeatureCollection" as const,
      features,
    };
  }, [mapClusters, shouldCluster]);

  // Generate GeoJSON FeatureCollection for individual storm reports
  const reportsGeoJson = React.useMemo(() => {
    return {
      type: "FeatureCollection" as const,
      features: filteredReports.map((report) => {
        let label = "";
        if (report.type === "hail") {
          let sizeText = report.magnitude || "";
          const sizeFloat = parseFloat(sizeText);
          if (!isNaN(sizeFloat)) {
            const displaySize = sizeFloat > 10 ? sizeFloat / 100 : sizeFloat;
            sizeText = displaySize.toFixed(2);
          }
          label = sizeText;
        } else if (report.type === "wind") {
          let speedText = report.magnitude || "";
          if (!speedText || speedText.toLowerCase() === "unk") {
            speedText = "W";
          }
          label = speedText;
        } else if (report.type === "tornado") {
          label = report.magnitude || "T";
        }

        return {
          type: "Feature" as const,
          geometry: {
            type: "Point" as const,
            coordinates: [report.lon, report.lat], // [longitude, latitude]
          },
          properties: {
            id: report.id,
            type: report.type,
            timeRaw: report.timeRaw,
            eventDate: report.eventDate,
            location: report.location || "",
            county: report.county || "",
            state: report.state || "",
            lat: report.lat,
            lon: report.lon,
            magnitude: report.magnitude || "",
            comments: report.comments || "",
            source: report.source || "SPC",
            label: label,
          },
        };
      }),
    };
  }, [filteredReports]);

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

  // Calculations for report popup details
  const reportOpportunityScore = React.useMemo(() => {
    if (!selectedReport) return 0;
    return calculateReportScore(selectedReport, alerts, reports);
  }, [selectedReport, alerts, reports]);

  const scoreBadgeColor = () => {
    if (reportOpportunityScore >= 100) return "bg-red-500/20 text-red-300 border-red-500/40";
    if (reportOpportunityScore >= 70) return "bg-orange-500/20 text-orange-300 border-orange-500/40";
    return "bg-slate-700/50 text-slate-300 border-slate-600";
  };

  const scoreText = () => {
    if (reportOpportunityScore >= 100) return "EXCELLENT TARGET";
    if (reportOpportunityScore >= 70) return "HIGH PRIORITY";
    return "STANDARD OPP";
  };

  const formattedReportTime = React.useMemo(() => {
    if (!selectedReport) return "";
    const report = selectedReport;
    if (report.timeRaw && report.timeRaw.length === 4) {
      const hh = report.timeRaw.slice(0, 2);
      const mm = report.timeRaw.slice(2, 4);
      let hourInt = parseInt(hh, 10);
      const ampm = hourInt >= 12 ? "PM" : "AM";
      hourInt = hourInt % 12 || 12;
      return `${hourInt}:${mm} ${ampm} UTC`;
    }
    return report.timeRaw;
  }, [selectedReport]);

  const formatAlertTime = (isoString?: string) => {
    if (!isoString) return "N/A";
    try {
      const date = new Date(isoString);
      return date.toLocaleTimeString([], { hour: "numeric", minute: "2-digit", timeZoneName: "short" });
    } catch (e) {
      return isoString;
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

  // ArcGIS / NOAA REST export tile URL
  const radarTileUrl =
    "https://mapservices.weather.noaa.gov/eventdriven/rest/services/radar/radar_base_reflectivity/MapServer/export?bbox={bbox-epsg-3857}&bboxSR=3857&size=256,256&imageSR=3857&format=png32&transparent=true&f=image";

  return (
    <div className="relative w-full h-full bg-[#030712] overflow-hidden">
      {/* Mapbox GL Map Canvas */}
      <Map
        {...viewState}
        ref={mapRef}
        onMove={handleMove}
        onClick={handleMapClick}
        onLoad={handleMapLoad}
        interactiveLayerIds={
          [
            filters.showAlerts && "warnings-fill",
            "storm-reports-layer",
            "storm-reports-labels",
            "storm-clusters-layer",
            "storm-clusters-count",
          ].filter(Boolean) as string[]
        }
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        cursor={cursor}
        style={{ width: "100%", height: "100%" }}
        mapStyle={getMapStyleUrl(filters.mapStyle)}
        mapboxAccessToken={mapboxToken}
        maxZoom={18}
        minZoom={2.5}
        attributionControl={false}
      >
        {/* Layer 0: Building Footprints vector layer */}
        {filters.showBuildings && (
          <Layer
            id="building-footprints"
            source="composite"
            source-layer="building"
            type="fill"
            minZoom={13}
            paint={{
              "fill-color": "#374151",
              "fill-opacity": 0.25,
              "fill-outline-color": "#4b5563",
            }}
          />
        )}

        {/* Layer 0.5: Individual Storm Reports Vector Layers */}
        {/* Layer 0.3: Cluster boundary Concentric rings circles */}
        {clusterCirclesGeoJson && (
          <Source id="cluster-circles" type="geojson" data={clusterCirclesGeoJson}>
            <Layer
              id="cluster-circles-layer"
              type="fill"
              maxzoom={9}
              paint={{
                "fill-color": [
                  "case",
                  ["==", ["downcase", ["get", "type"]], "tornado"], "#DC2626",
                  ["==", ["downcase", ["get", "type"]], "wind"], "#7C3AED",
                  ["==", ["downcase", ["get", "type"]], "hail"], "#2563EB",
                  "#64748B"
                ],
                "fill-opacity": 0.03,
              }}
            />
            <Layer
              id="cluster-circles-outline"
              type="line"
              maxzoom={9}
              paint={{
                "line-color": [
                  "case",
                  ["==", ["downcase", ["get", "type"]], "tornado"], "#DC2626",
                  ["==", ["downcase", ["get", "type"]], "wind"], "#7C3AED",
                  ["==", ["downcase", ["get", "type"]], "hail"], "#2563EB",
                  "#64748B"
                ],
                "line-width": 0.75,
                "line-dasharray": [3, 3],
              }}
            />
          </Source>
        )}

        {/* Layer 0.4: Storm Clusters WebGL Bubble Points */}
        {clusterPointsGeoJson && (
          <Source id="storm-clusters" type="geojson" data={clusterPointsGeoJson}>
            <Layer
              id="storm-clusters-layer"
              type="circle"
              maxzoom={9}
              paint={{
                "circle-radius": [
                  "interpolate",
                  ["linear"],
                  ["zoom"],
                  3.8, 6.5,
                  7, 9,
                  9, 11.5
                ],
                "circle-color": "#111827",
                "circle-opacity": 0.7,
                "circle-stroke-color": "#F8FAFC",
                "circle-stroke-width": 1,
              }}
            />
            <Layer
              id="storm-clusters-count"
              type="symbol"
              maxzoom={9}
              layout={{
                "text-field": ["get", "label"],
                "text-size": 7,
                "text-justify": "center",
                "text-allow-overlap": true,
                "text-ignore-placement": true,
              }}
              paint={{
                "text-color": "#ffffff",
              }}
            />
          </Source>
        )}

        {/* Layer 0.5: Individual Storm Reports Vector Layers */}
        <Source id="storm-reports" type="geojson" data={reportsGeoJson}>
          {/* Glow Layer */}
          <Layer
            id="storm-reports-glow"
            type="circle"
            minzoom={10}
            paint={{
              "circle-radius": 10,
              "circle-color": [
                "case",
                ["==", ["downcase", ["get", "type"]], "hail"], "#2563EB",
                ["==", ["downcase", ["get", "type"]], "wind"], "#7C3AED",
                ["==", ["downcase", ["get", "type"]], "tornado"], "#DC2626",
                "#64748B"
              ],
              "circle-opacity": [
                "case",
                ["==", ["downcase", ["get", "type"]], "hail"], 0.28,
                ["==", ["downcase", ["get", "type"]], "wind"], 0.28,
                ["==", ["downcase", ["get", "type"]], "tornado"], 0.30,
                0.18
              ],
              "circle-blur": 0.8,
            }}
          />
          {/* Main Circle Layer */}
          <Layer
            id="storm-reports-layer"
            type="circle"
            minzoom={9}
            paint={{
              "circle-radius": [
                "interpolate",
                ["linear"],
                ["zoom"],
                9, 3,
                12, 4.5,
                15, 6
              ],
              "circle-color": [
                "case",
                ["==", ["downcase", ["get", "type"]], "hail"], "#2563EB",
                ["==", ["downcase", ["get", "type"]], "wind"], "#7C3AED",
                ["==", ["downcase", ["get", "type"]], "tornado"], "#DC2626",
                "#64748B"
              ],
              "circle-opacity": [
                "interpolate",
                ["linear"],
                ["zoom"],
                9, 0.35,
                12, 0.5,
                15, 0.62
              ],
              "circle-stroke-color": [
                "case",
                ["==", ["downcase", ["get", "type"]], "hail"], "#DBEAFE",
                ["==", ["downcase", ["get", "type"]], "wind"], "#EDE9FE",
                ["==", ["downcase", ["get", "type"]], "tornado"], "#FEE2E2",
                "#E2E8F0"
              ],
              "circle-stroke-width": 1,
            }}
          />
          {/* Label Text Layer */}
          <Layer
            id="storm-reports-labels"
            type="symbol"
            minzoom={11}
            layout={{
              "text-field": ["get", "label"],
              "text-size": 7,
              "text-justify": "center",
              "text-allow-overlap": true,
              "text-ignore-placement": true,
            }}
            paint={{
              "text-color": "#ffffff",
            }}
          />
        </Source>

        {/* Layer 1: Live NOAA Base Reflectivity Radar Raster Layer */}
        {filters.showRadar && (
          <Source id="noaa-radar" type="raster" tiles={[radarTileUrl]} tileSize={256}>
            <Layer
              id="radar-layer"
              type="raster"
              paint={{
                "raster-opacity": filters.radarOpacity,
              }}
            />
          </Source>
        )}

        {/* Layer 2: Active NWS Alert Warning Polygons */}
        {filters.showAlerts && <AlertPolygonLayer alerts={alerts} />}

        {/* Layer 3: Target Search Radius Circle Layer */}
        {radiusCircleGeoJson && (
          <Source id="search-radius" type="geojson" data={radiusCircleGeoJson}>
            <Layer
              id="search-radius-fill"
              type="fill"
              paint={{
                "fill-color": "#ef4444",
                "fill-opacity": 0.04,
              }}
            />
            <Layer
              id="search-radius-outline"
              type="line"
              paint={{
                "line-color": "#ef4444",
                "line-width": 1.5,
                "line-dasharray": [4, 4],
              }}
            />
          </Source>
        )}

        {/* Layer 5: Geocoding Target Pin marker */}
        {filters.center && (
          <Marker latitude={filters.center[0]} longitude={filters.center[1]} anchor="center">
            <div className="relative flex items-center justify-center">
              <div className="w-5 h-5 rounded-full bg-red-500/20 border-2 border-red-500/50 animate-ping absolute" />
              <div className="w-3.5 h-3.5 rounded-full bg-red-500 border-2 border-white shadow-glow-tornado relative" />
            </div>
          </Marker>
        )}

        {/* Layer 6.5: House Number Labels */}
        {filters.showHouseNumbers && (
          <Layer
            id="aurum-house-number-labels"
            source="composite"
            source-layer="housenum_label"
            type="symbol"
            minZoom={16}
            layout={{
              "text-field": ["get", "house_num"],
              "text-size": [
                "interpolate",
                ["linear"],
                ["zoom"],
                16, 10,
                18, 12
              ],
              "text-justify": "center",
            }}
            paint={{
              "text-color": "#f3f4f6",
              "text-halo-color": "#030712",
              "text-halo-width": 1.5,
            }}
          />
        )}

        {/* Layer 6.6: Locked target marker */}
        {selectedProperty && (
          <Marker
            latitude={selectedProperty.latitude}
            longitude={selectedProperty.longitude}
            anchor="center"
          >
            <div className="relative flex items-center justify-center cursor-pointer" onClick={() => {
              setClickedTarget({ ...selectedProperty, locked: true });
            }}>
              <div className="w-6 h-6 rounded-full bg-emerald-500/20 border-2 border-emerald-500/50 animate-target-pulse absolute" />
              <div className="w-4 h-4 rounded-full bg-emerald-500 border-2 border-white shadow-glow-hail relative flex items-center justify-center">
                <MapPin size={8} className="text-white" />
              </div>
            </div>
          </Marker>
        )}

        {/* Layer 7.5: Clicked Property Target Popup */}
        {clickedTarget && (
          <Popup
            latitude={clickedTarget.latitude}
            longitude={clickedTarget.longitude}
            onClose={() => setClickedTarget(null)}
            closeButton={true}
            closeOnClick={false}
            anchor="bottom"
            offset={12}
            maxWidth="310px"
          >
            <div className="text-slate-100 flex flex-col gap-3 p-1 select-none">
              {/* Header with Title and Verification Status Badge */}
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <div className="flex items-center gap-1.5">
                  <div className="p-1 rounded bg-slate-900 border border-slate-800">
                    <MapPin size={12} className="text-red-500" />
                  </div>
                  <span className="font-extrabold uppercase text-[10px] tracking-wider text-slate-300">
                    Lead Target Info
                  </span>
                </div>
                {clickedTarget.confidence === "exact" ? (
                  <span className="px-1.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[8px] font-extrabold uppercase tracking-wider">
                    Verified
                  </span>
                ) : (
                  <span className="px-1.5 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 text-[8px] font-extrabold uppercase tracking-wider">
                    Approximate
                  </span>
                )}
              </div>

              {/* Main Address Display */}
              <div className="space-y-2.5 text-xs">
                <div className="bg-slate-900/30 p-2 rounded border border-slate-800/40">
                  <span className="text-slate-400 font-bold block text-[8px] uppercase tracking-wider mb-0.5">Street Address</span>
                  <p className="font-black text-slate-100 text-sm leading-snug">
                    {clickedTarget.fullAddress}
                  </p>
                </div>

                {/* Subdetails Grid */}
                <div className="grid grid-cols-2 gap-2 text-[10px]">
                  {clickedTarget.neighborhood && (
                    <div className="col-span-2 bg-slate-900/20 px-2 py-1 rounded border border-slate-800/40">
                      <span className="text-slate-400 font-bold block text-[8px] uppercase tracking-wider">Neighborhood</span>
                      <p className="font-semibold text-slate-200">
                        {clickedTarget.neighborhood}
                      </p>
                    </div>
                  )}

                  <div className="bg-slate-900/20 px-2 py-1 rounded border border-slate-800/40">
                    <span className="text-slate-400 font-bold block text-[8px] uppercase tracking-wider">City / State</span>
                    <p className="font-semibold text-slate-200">
                      {[clickedTarget.city, clickedTarget.state].filter(Boolean).join(", ") || "N/A"}
                    </p>
                  </div>
                  <div className="bg-slate-900/20 px-2 py-1 rounded border border-slate-800/40">
                    <span className="text-slate-400 font-bold block text-[8px] uppercase tracking-wider">Postal Code</span>
                    <p className="font-semibold text-slate-200">
                      {clickedTarget.postcode || "N/A"}
                    </p>
                  </div>
                </div>

                {/* Footer Metadata */}
                <div className="text-[8px] text-slate-500 font-mono flex items-center justify-between pt-1.5 border-t border-slate-900">
                  <span>GPS Coordinates</span>
                  <span>{clickedTarget.latitude.toFixed(5)}, {clickedTarget.longitude.toFixed(5)}</span>
                </div>
              </div>

              {/* Actions Section */}
              <div className="mt-1 flex flex-col gap-1.5">
                {selectedProperty?.latitude === clickedTarget.latitude && 
                 selectedProperty?.longitude === clickedTarget.longitude ? (
                  <div className="w-full text-center py-2 px-3 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-[9px] font-black uppercase tracking-wider flex items-center justify-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Locked for Lead Route
                  </div>
                ) : (
                  <button
                    onClick={() => {
                      onLockProperty(clickedTarget);
                      setClickedTarget(null);
                    }}
                    className="w-full text-center py-2.5 px-3 rounded-lg bg-red-600 hover:bg-red-500 text-white text-[10px] font-extrabold uppercase tracking-widest shadow-lg hover:shadow-red-900/30 transition-all active:scale-[0.98] cursor-pointer"
                  >
                    Lock Address for Lead Route
                  </button>
                )}
              </div>
            </div>
          </Popup>
        )}

        {/* Layer 7: Individual Storm Report Popup Details */}
        {selectedReport && (
          <Popup
            latitude={selectedReport.lat}
            longitude={selectedReport.lon}
            onClose={() => setSelectedReport(null)}
            closeButton={true}
            closeOnClick={false}
            anchor="bottom"
            offset={16}
            maxWidth="320px"
          >
            <div className="text-slate-100 flex flex-col gap-2">
              {/* Header */}
              <div className="flex items-center justify-between border-b border-slate-800 pb-1.5">
                <span className="flex items-center gap-1.5">
                  <span
                    className={`w-2 h-2 rounded-full ${
                      selectedReport.type === "hail"
                        ? "bg-[#2563EB]"
                        : selectedReport.type === "wind"
                        ? "bg-[#7C3AED]"
                        : "bg-[#DC2626]"
                    }`}
                  ></span>
                  <span className="font-extrabold uppercase tracking-wider text-xs">
                    {selectedReport.type} REPORT
                  </span>
                </span>
                <span className="text-[10px] text-slate-400 capitalize">{selectedReport.eventDate}</span>
              </div>

              {/* Target Priority Score Badge */}
              <div className={`flex items-center justify-between px-2 py-1 rounded border text-[10px] ${scoreBadgeColor()}`}>
                <span className="font-semibold">TARGET VALUE: {reportOpportunityScore} pts</span>
                <span className="font-extrabold text-[9px] tracking-wide uppercase">{scoreText()}</span>
              </div>

              {/* Details */}
              <div className="space-y-1.5 text-xs text-slate-300">
                <div>
                  <span className="text-slate-500 font-medium block text-[10px] uppercase">Magnitude</span>
                  <p className="font-semibold text-slate-200">
                    {selectedReport.type === "hail" && selectedReport.magnitude
                      ? `${(parseFloat(selectedReport.magnitude) > 10 ? parseFloat(selectedReport.magnitude) / 100 : parseFloat(selectedReport.magnitude)).toFixed(2)} in Hail`
                      : selectedReport.type === "wind" && selectedReport.magnitude
                      ? `${selectedReport.magnitude} mph Wind`
                      : selectedReport.type === "tornado"
                      ? `${selectedReport.magnitude || "Reported"} Tornado`
                      : "N/A"}
                  </p>
                </div>
                
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <span className="text-slate-500 font-medium block text-[10px] uppercase">Time (UTC)</span>
                    <p className="font-medium text-slate-200">{formattedReportTime}</p>
                  </div>
                  <div>
                    <span className="text-slate-500 font-medium block text-[10px] uppercase">State / County</span>
                    <p className="font-medium text-slate-200">{selectedReport.county}, {selectedReport.state}</p>
                  </div>
                </div>

                <div>
                  <span className="text-slate-500 font-medium block text-[10px] uppercase">Location Details</span>
                  <p className="font-medium text-slate-200">{selectedReport.location}</p>
                </div>

                {selectedReport.comments && (
                  <div>
                    <span className="text-slate-500 font-medium block text-[10px] uppercase">SPC Comments</span>
                    <p className="font-light italic text-slate-300 text-[11px] bg-slate-950/40 p-1.5 rounded border border-slate-900/60 leading-relaxed">
                      "{selectedReport.comments}"
                    </p>
                  </div>
                )}
              </div>

              {/* Footer source info */}
              <div className="mt-1 pt-1.5 border-t border-slate-800 text-[9px] text-slate-500 flex flex-col gap-0.5">
                <div>Source: NOAA SPC preliminary storm report</div>
                <div className="italic text-slate-500/80 leading-normal">
                  * Storm reports are preliminary and may be updated by NOAA/SPC.
                </div>
              </div>
            </div>
          </Popup>
        )}

        {/* Layer 8: NWS Warning Polygons Details Popup */}
        {selectedAlert && (
          <Popup
            latitude={selectedAlert.polygon![0][0]}
            longitude={selectedAlert.polygon![0][1]}
            onClose={() => setSelectedAlert(null)}
            closeButton={true}
            closeOnClick={false}
            anchor="top"
            offset={4}
            maxWidth="360px"
          >
            <div className="text-slate-100 flex flex-col gap-2 max-h-80 overflow-y-auto pr-1">
              <div className="flex items-center gap-1.5 border-b border-slate-800 pb-1.5">
                <AlertCircle
                  size={16}
                  className={
                    selectedAlert.event.includes("Tornado")
                      ? "text-red-500"
                      : selectedAlert.event.includes("Severe")
                      ? "text-orange-500"
                      : "text-blue-500"
                  }
                />
                <span className="font-extrabold uppercase text-xs tracking-wider">
                  {selectedAlert.event}
                </span>
              </div>

              <p className="text-xs font-semibold text-slate-200 leading-normal">
                {selectedAlert.headline}
              </p>

              <div className="grid grid-cols-2 gap-2 bg-slate-950/50 p-2 rounded border border-slate-900 text-[10px]">
                <div className="flex flex-col gap-0.5">
                  <span className="text-slate-500 font-medium uppercase">Effective</span>
                  <span className="text-slate-300 font-semibold">{formatAlertTime(selectedAlert.effective)}</span>
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="text-slate-500 font-medium uppercase">Expires</span>
                  <span className="text-red-400 font-semibold">{formatAlertTime(selectedAlert.expires)}</span>
                </div>
              </div>

              <div className="space-y-2 text-xs">
                <div>
                  <span className="text-slate-500 font-medium block text-[9px] uppercase tracking-wider">Severity & Certainty</span>
                  <div className="flex gap-1.5 mt-0.5">
                    <span className="px-1.5 py-0.5 rounded bg-slate-800 text-[10px] text-slate-300">
                      {selectedAlert.severity} Severity
                    </span>
                    <span className="px-1.5 py-0.5 rounded bg-slate-800 text-[10px] text-slate-300">
                      {selectedAlert.certainty} Certainty
                    </span>
                  </div>
                </div>

                <div>
                  <span className="text-slate-500 font-medium block text-[9px] uppercase tracking-wider">Target Counties</span>
                  <p className="text-slate-300 text-[11px] leading-relaxed">
                    {selectedAlert.areaDesc}
                  </p>
                </div>

                {selectedAlert.instruction && (
                  <div className="border-t border-slate-900/80 pt-2">
                    <span className="text-red-400/90 font-bold block text-[9px] uppercase tracking-wider">NWS Instructions</span>
                    <p className="text-slate-300 font-light text-[11px] leading-relaxed mt-0.5 bg-red-950/10 border border-red-500/10 p-2 rounded italic">
                      {selectedAlert.instruction}
                    </p>
                  </div>
                )}
              </div>

              <div className="mt-1 pt-1.5 border-t border-slate-800 text-[9px] text-slate-500 flex justify-between">
                <span>Source: {selectedAlert.source}</span>
                <span className="text-slate-500/80">Active Alert Area</span>
              </div>
            </div>
          </Popup>
        )}
      </Map>

      {/* Floating Control Toolbar */}
      <div className="absolute top-4 right-4 z-[1000] flex flex-col gap-2 pointer-events-none">
        <div className="bg-slate-950/95 border border-slate-800 rounded-lg p-1.5 shadow-glass flex flex-col gap-1 pointer-events-auto">
          <button
            onClick={handleGeolocate}
            className="p-2 rounded-md text-slate-400 hover:text-slate-200 hover:bg-slate-900 transition-colors"
            title="Locate Me"
            type="button"
          >
            <Compass size={16} />
          </button>
          <button
            onClick={handleResetMap}
            className="p-2 rounded-md text-slate-400 hover:text-slate-200 hover:bg-slate-900 transition-colors"
            title="Reset Map Bounds"
            type="button"
          >
            <Maximize2 size={16} />
          </button>
          <button
            onClick={handleZoomToStreetLevel}
            className="p-2 rounded-md text-slate-400 hover:text-slate-200 hover:bg-slate-900 transition-colors"
            title="Zoom to Street Level"
            type="button"
          >
            <Target size={16} />
          </button>
          <button
            onClick={onRefresh}
            disabled={isRefreshing}
            className="p-2 rounded-md text-slate-400 hover:text-slate-200 hover:bg-slate-900 transition-colors"
            title="Manual Refresh Data"
            type="button"
          >
            <RefreshCw size={16} className={isRefreshing ? "animate-spin" : ""} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default StormMap;
