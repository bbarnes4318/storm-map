"use client";

import React from "react";
// Import Mapbox GL JS and React Map GL wrapper
import Map, { Source, Layer, Marker, MapRef, ViewStateChangeEvent, MapLayerMouseEvent } from "react-map-gl";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

// Import types and custom components
import { StormFilterState, StormReport, NwsAlert, SelectedPropertyTarget, TargetCluster } from "@/lib/weather/types";
import { STORM_TYPE_COLORS, stormFillColorExpression, stormStrokeColorExpression } from "@/lib/weather/stormStyles";
import { AlertPolygonLayer } from "./AlertPolygonLayer";
import { MapDetailOverlay } from "./MapDetailOverlay";

interface ActivePopupDetail {
  type: "storm-report" | "cluster" | "warning" | "address";
  coordinates: [number, number]; // [lat, lon]
  data: any;
}
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

function getReportRadiusMiles(type: string, magnitude?: string): number {
  const cleanType = type.toLowerCase();
  if (cleanType === "hail") {
    let size = parseFloat(magnitude || "0");
    if (size > 10) size = size / 100;
    if (isNaN(size) || size <= 0) return 1.5;
    if (size >= 2.0) return 2.0;
    if (size >= 1.0) return 1.5;
    return 1.0;
  } else if (cleanType === "wind") {
    const speed = parseFloat(magnitude || "0");
    if (isNaN(speed) || speed <= 0) return 1.5;
    if (speed >= 70) return 2.0;
    if (speed >= 58) return 1.5;
    return 1.0;
  } else if (cleanType === "tornado") {
    if (!magnitude) return 2.0;
    const efVal = magnitude.toUpperCase();
    if (
      efVal.includes("EF2") ||
      efVal.includes("EF3") ||
      efVal.includes("EF4") ||
      efVal.includes("EF5") ||
      efVal.includes("F2") ||
      efVal.includes("F3") ||
      efVal.includes("F4") ||
      efVal.includes("F5")
    ) {
      return 2.5;
    }
    if (efVal.includes("EF1") || efVal.includes("F1")) {
      return 2.0;
    }
    return 1.5;
  }
  return 1.5;
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
  leads: SelectedPropertyTarget[];
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
  leads = [],
}: StormMapProps) {
  const defaultCenter = { latitude: 38.5, longitude: -96.5 }; // Central US
  const defaultZoom = 3.8;

  const [mapZoom, setMapZoom] = React.useState(defaultZoom);
  const [activeDetail, setActiveDetail] = React.useState<ActivePopupDetail | null>(null);
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
    const targetZoom = 9.5;
    onFiltersChange({ center: clusterCenter, targetZoom });
    if (mapRef.current) {
      mapRef.current.flyTo({
        center: [clusterCenter[1], clusterCenter[0]], // [lon, lat]
        zoom: targetZoom,
        duration: 1200,
      });
    }
  };

  // Canvas map click geocoding interceptor for warnings/reports clicks
  const handleMapClick = (event: MapLayerMouseEvent) => {
    const map = event.target;
    const zoom = map.getZoom();

    // Build the list of clickable layers that actually exist on the map right now
    const clickableLayers = [
      "storm-reports-glow",
      "storm-reports-layer",
      "storm-reports-labels",
      "report-circles-fill",
      "cluster-circles-layer",
      "cluster-circles-outline",
      "storm-clusters-layer",
      "storm-clusters-count",
      "warnings-fill",
    ].filter((layerId) => map.getLayer(layerId));

    // Use event.features when available; fall back to direct query at click point
    const features =
      event.features && event.features.length > 0
        ? event.features
        : map.queryRenderedFeatures(event.point, { layers: clickableLayers });

    if (features && features.length > 0) {
      // A. Individual storm report click (glow, circle, label, or geographic circle)
      const reportLayerIds = ["storm-reports-glow", "storm-reports-layer", "storm-reports-labels", "report-circles-fill"];
      const clickedReportFeature = features.find(
        (f) => reportLayerIds.includes(f.layer.id)
      );
      if (clickedReportFeature) {
        const reportId = clickedReportFeature.properties?.id;
        let report = reports.find((r) => String(r.id) === String(reportId));
        if (!report) {
          report = filteredReports.find((r) => String(r.id) === String(reportId));
        }
        if (!report) {
          // Reconstruct as fallback from feature properties
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
              lat: Number(props.lat),
              lon: Number(props.lon),
              magnitude: props.magnitude,
              comments: props.comments,
              source: props.source || "SPC",
            };
          }
        }
        if (report) {
          setActiveDetail({
            type: "storm-report",
            coordinates: [report.lat, report.lon],
            data: report,
          });
          return;
        }
      }

      // B. Cluster/area circle click (ring, outline, bubble, or count label)
      const clusterLayerIds = [
        "cluster-circles-layer",
        "cluster-circles-outline",
        "storm-clusters-layer",
        "storm-clusters-count",
      ];
      const clickedClusterFeature = features.find(
        (f) => clusterLayerIds.includes(f.layer.id)
      );
      if (clickedClusterFeature) {
        const props = clickedClusterFeature.properties;
        if (props?.id) {
          // Look up the full cluster from mapClusters to get the reports array
          const cluster = mapClusters.find((c) => c.id === props.id);
          if (cluster) {
            setActiveDetail({
              type: "cluster",
              coordinates: [cluster.center[0], cluster.center[1]],
              data: cluster,
            });
            return;
          }
        }
      }

      // C. Warning polygon click
      const clickedWarning = features.find((f) => f.layer.id === "warnings-fill");
      if (clickedWarning) {
        const props = clickedWarning.properties;
        if (props) {
          setActiveDetail({
            type: "warning",
            coordinates: [event.lngLat.lat, event.lngLat.lng],
            data: {
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
            },
          });
          return;
        }
      }
    }

    // D. Street-level geocode click (zoom >= 15, no storm layer hit)
    if (zoom >= 15) {
      // Clear active detail
      setActiveDetail(null);

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
            setActiveDetail({
              type: "address",
              coordinates: [clickLat, clickLon],
              data: target,
            });
          } else {
            setActiveDetail({
              type: "address",
              coordinates: [clickLat, clickLon],
              data: {
                id: `fallback-${Date.now()}`,
                latitude: clickLat,
                longitude: clickLon,
                fullAddress: `Coordinates: ${clickLat.toFixed(5)}, ${clickLon.toFixed(5)}`,
                source: "fallback",
                confidence: "unknown",
                locked: false,
              },
            });
          }
        })
        .catch((err) => {
          if (signal.aborted) return;
          console.error("Geocoding lookup error:", err);
          setActiveDetail({
            type: "address",
            coordinates: [clickLat, clickLon],
            data: {
              id: `fallback-err-${Date.now()}`,
              latitude: clickLat,
              longitude: clickLon,
              fullAddress: `Coordinates: ${clickLat.toFixed(5)}, ${clickLon.toFixed(5)}`,
              source: "fallback",
              confidence: "unknown",
              locked: false,
            },
          });
        });

      return;
    }

    // E. Clicking elsewhere closes active detail
    setActiveDetail(null);
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
          name: cluster.name,
          county: cluster.county,
          state: cluster.state,
          reportsCount: cluster.reportsCount,
          hailCount: cluster.hailCount,
          windCount: cluster.windCount,
          tornadoCount: cluster.tornadoCount,
          highestMagnitude: cluster.highestMagnitude,
          suggestedRadius: cluster.suggestedRadius,
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
          name: cluster.name,
          county: cluster.county,
          state: cluster.state,
          highestMagnitude: cluster.highestMagnitude,
          suggestedRadius: cluster.suggestedRadius,
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

  // Generate GeoJSON FeatureCollection for individual storm report affected area circle polygons
  const reportCirclesGeoJson = React.useMemo(() => {
    const features = filteredReports.map((report) => {
      const radius = getReportRadiusMiles(report.type, report.magnitude);
      const circlePolygon = createGeoJsonCircle([report.lat, report.lon], radius);
      return {
        ...circlePolygon,
        properties: {
          id: report.id,
          type: report.type,
          lat: report.lat,
          lon: report.lon,
          magnitude: report.magnitude || "",
          comments: report.comments || "",
          location: report.location || "",
          county: report.county || "",
          state: report.state || "",
        },
      };
    });
    return {
      type: "FeatureCollection" as const,
      features,
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

  const activeReport = activeDetail?.type === "storm-report" ? activeDetail.data : null;

  // Calculations for report popup details
  const reportOpportunityScore = React.useMemo(() => {
    if (!activeReport) return 0;
    return calculateReportScore(activeReport, alerts, reports);
  }, [activeReport, alerts, reports]);

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
    if (!activeReport) return "";
    const report = activeReport;
    if (report.timeRaw && report.timeRaw.length === 4) {
      const hh = report.timeRaw.slice(0, 2);
      const mm = report.timeRaw.slice(2, 4);
      let hourInt = parseInt(hh, 10);
      const ampm = hourInt >= 12 ? "PM" : "AM";
      hourInt = hourInt % 12 || 12;
      return `${hourInt}:${mm} ${ampm} UTC`;
    }
    return report.timeRaw;
  }, [activeReport]);

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

  // Calculate active detail pixel coordinates on every render if activeDetail is set
  const pixelPos = React.useMemo(() => {
    if (!activeDetail || !mapRef.current) return null;
    const map = mapRef.current.getMap();
    if (!map) return null;
    try {
      const [lat, lon] = activeDetail.coordinates;
      const bounds = map.getBounds();
      if (bounds && !bounds.contains([lon, lat])) {
        return null;
      }
      return map.project([lon, lat]);
    } catch (e) {
      return null;
    }
  }, [activeDetail, viewState]);

  const renderOverlayHeader = () => {
    if (!activeDetail) return null;

    switch (activeDetail.type) {
      case "storm-report": {
        const report = activeDetail.data;
        return (
          <span className="flex items-center gap-1.5">
            <span
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: STORM_TYPE_COLORS[report.type]?.fill ?? "#64748B" }}
            ></span>
            <span className="font-extrabold uppercase tracking-wider text-xs text-slate-100">
              {report.type} REPORT
            </span>
          </span>
        );
      }
      case "cluster": {
        const cluster = activeDetail.data;
        return (
          <span className="flex items-center gap-1.5">
            <span
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: STORM_TYPE_COLORS[cluster.mainStormType]?.fill ?? "#64748B" }}
            ></span>
            <span className="font-extrabold uppercase tracking-wider text-xs text-slate-100">
              {cluster.mainStormType} AREA
            </span>
          </span>
        );
      }
      case "warning": {
        const alert = activeDetail.data;
        return (
          <div className="flex items-center gap-1.5">
            <AlertCircle
              size={16}
              className={
                alert.event.includes("Tornado")
                  ? "text-red-500"
                  : alert.event.includes("Severe")
                  ? "text-orange-500"
                  : "text-blue-500"
              }
            />
            <span className="font-extrabold uppercase text-xs tracking-wider text-slate-100 truncate block">
              {alert.event}
            </span>
          </div>
        );
      }
      case "address": {
        const target = activeDetail.data;
        return (
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-1.5">
              <div className="p-1 rounded bg-slate-900 border border-slate-800">
                <MapPin size={12} className="text-red-500" />
              </div>
              <span className="font-extrabold uppercase text-[10px] tracking-wider text-slate-300">
                Lead Target Info
              </span>
            </div>
            {target.confidence === "exact" ? (
              <span className="px-1.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[8px] font-extrabold uppercase tracking-wider ml-2">
                Verified
              </span>
            ) : (
              <span className="px-1.5 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 text-[8px] font-extrabold uppercase tracking-wider ml-2">
                Approximate
              </span>
            )}
          </div>
        );
      }
      default:
        return null;
    }
  };

  const renderOverlayBody = () => {
    if (!activeDetail) return null;

    switch (activeDetail.type) {
      case "storm-report": {
        const report = activeDetail.data;
        return (
          <div className="space-y-3.5 select-none">
            {/* Target Priority Score Badge */}
            <div className={`flex items-center justify-between px-2 py-1 rounded border text-[10px] ${scoreBadgeColor()}`}>
              <span className="font-semibold">TARGET VALUE: {reportOpportunityScore} pts</span>
              <span className="font-extrabold text-[9px] tracking-wide uppercase">{scoreText()}</span>
            </div>

            {/* Details */}
            <div className="space-y-2.5 text-xs text-slate-300">
              <div>
                <span className="text-slate-500 font-bold block text-[8px] uppercase tracking-wider mb-0.5">Magnitude</span>
                <p className="font-semibold text-slate-200">
                  {report.type === "hail" && report.magnitude
                    ? `${(parseFloat(report.magnitude) > 10 ? parseFloat(report.magnitude) / 100 : parseFloat(report.magnitude)).toFixed(2)} in Hail`
                    : report.type === "wind" && report.magnitude
                    ? `${report.magnitude} mph Wind`
                    : report.type === "tornado"
                    ? `${report.magnitude || "Reported"} Tornado`
                    : "N/A"}
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <span className="text-slate-500 font-bold block text-[8px] uppercase tracking-wider mb-0.5">Time (UTC)</span>
                  <p className="font-medium text-slate-200">{formattedReportTime}</p>
                </div>
                <div>
                  <span className="text-slate-500 font-bold block text-[8px] uppercase tracking-wider mb-0.5">State / County</span>
                  <p className="font-medium text-slate-200">{report.county}, {report.state}</p>
                </div>
              </div>

              <div>
                <span className="text-slate-500 font-bold block text-[8px] uppercase tracking-wider mb-0.5">Location Details</span>
                <p className="font-medium text-slate-200 leading-normal">{report.location}</p>
              </div>

              {report.comments && (
                <div>
                  <span className="text-slate-550 font-bold block text-[8px] uppercase tracking-wider mb-0.5">SPC Comments</span>
                  <p className="font-light italic text-slate-300 text-[11px] bg-slate-900/40 p-2.5 rounded border border-slate-800/40 leading-relaxed">
                    "{report.comments}"
                  </p>
                </div>
              )}
            </div>

            {/* Footer source info */}
            <div className="pt-2 border-t border-slate-900 text-[8.5px] text-slate-550 flex flex-col gap-0.5 leading-normal">
              <div>Source: NOAA SPC preliminary storm report</div>
              <div className="italic text-slate-500/80">
                * Storm reports are preliminary and may be updated by NOAA/SPC.
              </div>
            </div>
          </div>
        );
      }
      case "cluster": {
        const cluster = activeDetail.data;
        return (
          <div className="space-y-3.5 select-none">
            {/* Area Name */}
            <div>
              <span className="text-slate-500 font-bold block text-[8px] uppercase tracking-wider mb-0.5">Area / Location</span>
              <p className="font-bold text-slate-200 text-sm">{cluster.name || "Unknown Area"}</p>
              <p className="text-[10px] text-slate-400 mt-0.5">
                {cluster.county ? `${cluster.county} County, ` : ""}{cluster.state}
              </p>
            </div>

            {/* Report Counts */}
            <div className="grid grid-cols-4 gap-1 bg-slate-900/30 border border-slate-800/40 p-2 rounded text-[10px] text-center">
              <div>
                <span className="text-slate-600 block text-[8px] font-medium uppercase">Total</span>
                <span className="font-bold text-slate-250">{cluster.reportsCount}</span>
              </div>
              <div>
                <span className="text-slate-600 block text-[8px] font-medium uppercase">Hail</span>
                <span className="font-bold" style={{ color: STORM_TYPE_COLORS.hail.fill }}>{cluster.hailCount}</span>
              </div>
              <div>
                <span className="text-slate-600 block text-[8px] font-medium uppercase">Wind</span>
                <span className="font-bold" style={{ color: STORM_TYPE_COLORS.wind.fill }}>{cluster.windCount}</span>
              </div>
              <div>
                <span className="text-slate-600 block text-[8px] font-medium uppercase">Tornado</span>
                <span className="font-bold" style={{ color: STORM_TYPE_COLORS.tornado.fill }}>{cluster.tornadoCount}</span>
              </div>
            </div>

            {/* Magnitude & Radius */}
            <div className="grid grid-cols-2 gap-2.5 text-xs">
              <div>
                <span className="text-slate-500 font-bold block text-[8px] uppercase tracking-wider mb-0.5">Highest Magnitude</span>
                <p className="font-semibold text-slate-200">{cluster.highestMagnitude}</p>
              </div>
              <div>
                <span className="text-slate-500 font-bold block text-[8px] uppercase tracking-wider mb-0.5">Target Radius</span>
                <p className="font-semibold text-slate-200">{cluster.suggestedRadius} mi</p>
              </div>
            </div>

            {/* Top 3 Report Summaries */}
            {cluster.reports.length > 0 && (
              <div>
                <span className="text-slate-500 font-bold block text-[8px] uppercase tracking-wider mb-1.5">Top Reports</span>
                <div className="space-y-1.5 max-h-32 overflow-y-auto pr-1 custom-scrollbar">
                  {cluster.reports.slice(0, 3).map((r: any, i: number) => (
                    <div key={r.id || i} className="bg-slate-900/40 p-2 rounded border border-slate-800/40 text-[10px] flex items-start gap-2">
                      <span
                        className="w-1.5 h-1.5 rounded-full mt-1 shrink-0"
                        style={{ backgroundColor: STORM_TYPE_COLORS[r.type]?.fill ?? "#64748B" }}
                      ></span>
                      <div className="min-w-0 flex-1">
                        <span className="font-bold text-slate-200 uppercase">{r.type}</span>
                        {r.magnitude && <span className="text-slate-400"> — {r.magnitude}</span>}
                        {r.location && <span className="text-slate-500 block truncate">{r.location}, {r.county} {r.state}</span>}
                        {r.comments && <span className="text-slate-550 italic block truncate">"{r.comments}"</span>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        );
      }
      case "warning": {
        const alert = activeDetail.data;
        return (
          <div className="space-y-3.5 select-none">
            <p className="text-xs font-semibold text-slate-250 leading-relaxed">
              {alert.headline}
            </p>

            <div className="grid grid-cols-2 gap-2 bg-slate-900/30 p-2 rounded border border-slate-800/40 text-[10px]">
              <div className="flex flex-col gap-0.5">
                <span className="text-slate-500 font-bold text-[8px] uppercase tracking-wider">Effective</span>
                <span className="text-slate-300 font-semibold">{formatAlertTime(alert.effective)}</span>
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="text-slate-500 font-bold text-[8px] uppercase tracking-wider">Expires</span>
                <span className="text-red-400 font-semibold">{formatAlertTime(alert.expires)}</span>
              </div>
            </div>

            <div className="space-y-2.5 text-xs text-slate-300">
              <div>
                <span className="text-slate-500 font-bold block text-[8px] uppercase tracking-wider mb-1">Severity & Certainty</span>
                <div className="flex gap-1.5">
                  <span className="px-1.5 py-0.5 rounded bg-slate-900 border border-slate-800 text-[10px] text-slate-300 font-medium">
                    {alert.severity} Severity
                  </span>
                  <span className="px-1.5 py-0.5 rounded bg-slate-900 border border-slate-800 text-[10px] text-slate-300 font-medium">
                    {alert.certainty} Certainty
                  </span>
                </div>
              </div>

              <div>
                <span className="text-slate-500 font-bold block text-[8px] uppercase tracking-wider mb-0.5">Target Counties</span>
                <p className="text-slate-300 text-[11px] leading-relaxed max-h-20 overflow-y-auto pr-1 custom-scrollbar">
                  {alert.areaDesc}
                </p>
              </div>

              {alert.instruction && (
                <div className="border-t border-slate-900/80 pt-2.5">
                  <span className="text-red-400/90 font-bold block text-[8px] uppercase tracking-wider mb-1">NWS Instructions</span>
                  <p className="text-slate-300 font-light text-[11px] leading-relaxed bg-red-950/10 border border-red-500/10 p-2.5 rounded italic">
                    {alert.instruction}
                  </p>
                </div>
              )}
            </div>
          </div>
        );
      }
      case "address": {
        const target = activeDetail.data;
        return (
          <div className="space-y-3 text-xs select-none">
            <div className="bg-slate-900/30 p-2.5 rounded border border-slate-800/40">
              <span className="text-slate-450 font-bold block text-[8px] uppercase tracking-wider mb-0.5">Street Address</span>
              <p className="font-black text-slate-100 text-sm leading-snug">
                {target.fullAddress}
              </p>
            </div>

            {/* Subdetails Grid */}
            <div className="grid grid-cols-2 gap-2 text-[10px]">
              {target.neighborhood && (
                <div className="col-span-2 bg-slate-900/20 px-2 py-1.5 rounded border border-slate-800/40">
                  <span className="text-slate-400 font-bold block text-[8px] uppercase tracking-wider">Neighborhood</span>
                  <p className="font-semibold text-slate-200 mt-0.5">
                    {target.neighborhood}
                  </p>
                </div>
              )}

              <div className="bg-slate-900/20 px-2 py-1.5 rounded border border-slate-800/40">
                <span className="text-slate-400 font-bold block text-[8px] uppercase tracking-wider">City / State</span>
                <p className="font-semibold text-slate-200 mt-0.5">
                  {[target.city, target.state].filter(Boolean).join(", ") || "N/A"}
                </p>
              </div>
              <div className="bg-slate-900/20 px-2 py-1.5 rounded border border-slate-800/40">
                <span className="text-slate-400 font-bold block text-[8px] uppercase tracking-wider">Postal Code</span>
                <p className="font-semibold text-slate-200 mt-0.5">
                  {target.postcode || "N/A"}
                </p>
              </div>
            </div>

            {/* Footer Metadata */}
            <div className="text-[8.5px] text-slate-500 font-mono flex items-center justify-between pt-2 border-t border-slate-900">
              <span>GPS Coordinates</span>
              <span>{target.latitude.toFixed(5)}, {target.longitude.toFixed(5)}</span>
            </div>
          </div>
        );
      }
      default:
        return null;
    }
  };

  const renderOverlayFooter = () => {
    if (!activeDetail) return undefined;

    switch (activeDetail.type) {
      case "cluster": {
        const cluster = activeDetail.data;
        return (
          <div className="flex flex-col gap-2">
            <button
              onClick={() => {
                handleClusterClick(cluster.center);
                setActiveDetail(null);
              }}
              className="w-full text-center py-2.5 px-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-[10px] font-extrabold uppercase tracking-widest border border-slate-700 transition-all active:scale-[0.98] cursor-pointer"
            >
              Zoom to Area
            </button>
            <div className="text-[8px] text-slate-500 italic text-center">
              Click individual storm circles for detailed reports.
            </div>
          </div>
        );
      }
      case "warning": {
        const alert = activeDetail.data;
        return (
          <div className="text-[8.5px] text-slate-500 flex justify-between">
            <span>Source: {alert.source}</span>
            <span className="text-slate-550/80">Active Alert Area</span>
          </div>
        );
      }
      case "address": {
        const target = activeDetail.data;
        const isLocked = selectedProperty?.latitude === target.latitude && 
                         selectedProperty?.longitude === target.longitude;
        return (
          <div className="flex flex-col gap-1.5">
            {isLocked ? (
              <div className="w-full text-center py-2.5 px-3 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-[9px] font-black uppercase tracking-wider flex items-center justify-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Locked for Lead Route
              </div>
            ) : (
              <button
                onClick={() => {
                  onLockProperty(target);
                  setActiveDetail(null);
                }}
                className="w-full text-center py-2.5 px-3 rounded-lg bg-red-600 hover:bg-red-500 text-white text-[10px] font-extrabold uppercase tracking-widest shadow-lg hover:shadow-red-900/30 transition-all active:scale-[0.98] cursor-pointer"
              >
                Lock Address for Lead Route
              </button>
            )}
          </div>
        );
      }
      default:
        return undefined;
    }
  };

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
            "storm-reports-glow",
            "storm-reports-layer",
            "storm-reports-labels",
            "report-circles-fill",
            "cluster-circles-layer",
            "cluster-circles-outline",
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

        {/* Layer 0.1: Live NOAA Base Reflectivity Radar Raster Layer (below storm circles) */}
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

        {/* Layer 0.2: Active NWS Alert Warning Polygons */}
        {filters.showAlerts && <AlertPolygonLayer alerts={alerts} />}

        {/* Layer 0.3: Cluster boundary Concentric rings circles */}
        {clusterCirclesGeoJson && (
          <Source id="cluster-circles" type="geojson" data={clusterCirclesGeoJson}>
            <Layer
              id="cluster-circles-layer"
              type="fill"
              maxzoom={9}
              paint={{
                "fill-color": stormFillColorExpression,
                "fill-opacity": 0.03,
              }}
            />
            <Layer
              id="cluster-circles-outline"
              type="line"
              maxzoom={9}
              paint={{
                "line-color": stormFillColorExpression,
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
                "circle-color": stormFillColorExpression,
                "circle-opacity": 0.7,
                "circle-stroke-color": stormStrokeColorExpression,
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

        {/* Layer 0.45: Individual Storm Report Geographic Circles */}
        {reportCirclesGeoJson && (
          <Source id="report-circles" type="geojson" data={reportCirclesGeoJson}>
            <Layer
              id="report-circles-fill"
              type="fill"
              minzoom={9}
              paint={{
                "fill-color": stormFillColorExpression,
                "fill-opacity": 0.12,
              }}
            />
            <Layer
              id="report-circles-outline"
              type="line"
              minzoom={9}
              paint={{
                "line-color": stormFillColorExpression,
                "line-width": 1.2,
                "line-opacity": 0.4,
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
              "circle-color": stormFillColorExpression,
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
              "circle-color": stormFillColorExpression,
              "circle-opacity": [
                "interpolate",
                ["linear"],
                ["zoom"],
                9, 0.35,
                12, 0.5,
                15, 0.62
              ],
              "circle-stroke-color": stormStrokeColorExpression,
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

        {/* Layer 6.6: Persistent locked lead markers */}
        {leads && leads.map((lead) => {
          const isActive = selectedProperty?.latitude === lead.latitude && selectedProperty?.longitude === lead.longitude;
          return (
            <Marker
              key={lead.id}
              latitude={lead.latitude}
              longitude={lead.longitude}
              anchor="center"
            >
              <div
                className="relative flex items-center justify-center cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveDetail({
                    type: "address",
                    coordinates: [lead.latitude, lead.longitude],
                    data: { ...lead, locked: true },
                  });
                }}
              >
                <div className={`rounded-full bg-emerald-500/25 border-2 border-emerald-500/50 absolute transition-all ${
                  isActive ? "w-8 h-8 animate-target-pulse" : "w-6 h-6 animate-ping duration-1000"
                }`} />
                <div className={`rounded-full bg-emerald-500 border-2 border-white shadow-glow-hail relative flex items-center justify-center transition-all ${
                  isActive ? "w-5 h-5 scale-110 bg-emerald-600" : "w-4 h-4 hover:scale-110"
                }`}>
                  <MapPin size={isActive ? 10 : 8} className="text-white" />
                </div>
              </div>
            </Marker>
          );
        })}

      </Map>

      {/* Viewport-Safe Map Detail Overlay */}
      {activeDetail && pixelPos && (
        <MapDetailOverlay
          x={pixelPos.x}
          y={pixelPos.y}
          onClose={() => setActiveDetail(null)}
          header={renderOverlayHeader()}
          footer={renderOverlayFooter()}
        >
          {renderOverlayBody()}
        </MapDetailOverlay>
      )}

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
