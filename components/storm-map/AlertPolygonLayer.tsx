"use client";

import React from "react";
import { Source, Layer } from "react-map-gl";
import { NwsAlert } from "@/lib/weather/types";

interface AlertPolygonLayerProps {
  alerts: NwsAlert[];
}

export function AlertPolygonLayer({ alerts }: AlertPolygonLayerProps) {
  // Translate [lat, lon] polygon warning arrays to standard GeoJSON [lon, lat] format at render boundary
  const alertsGeoJson = React.useMemo(() => {
    const features = alerts
      .filter((alert) => alert.polygon && alert.polygon.length > 0)
      .map((alert) => {
        const swappedCoordinates = alert.polygon!.map(([lat, lon]) => [lon, lat]);
        
        // Ensure polygon coordinates close properly in GeoJSON
        if (swappedCoordinates.length > 0) {
          const first = swappedCoordinates[0];
          const last = swappedCoordinates[swappedCoordinates.length - 1];
          if (first[0] !== last[0] || first[1] !== last[1]) {
            swappedCoordinates.push([...first]);
          }
        }

        return {
          type: "Feature",
          properties: {
            id: alert.id,
            event: alert.event,
            headline: alert.headline,
            effective: alert.effective,
            expires: alert.expires,
            severity: alert.severity,
            certainty: alert.certainty,
            areaDesc: alert.areaDesc,
            instruction: alert.instruction,
            source: alert.source,
          },
          geometry: {
            type: "Polygon",
            coordinates: [swappedCoordinates],
          },
        };
      });

    return {
      type: "FeatureCollection",
      features,
    };
  }, [alerts]);

  return (
    <Source id="nws-warnings" type="geojson" data={alertsGeoJson}>
      {/* Warning Fill Layer */}
      <Layer
        id="warnings-fill"
        type="fill"
        paint={{
          "fill-color": [
            "case",
            ["like", ["get", "event"], "Tornado Warning"], "#ef4444",
            ["like", ["get", "event"], "Severe Thunderstorm Warning"], "#f97316",
            ["like", ["get", "event"], "Flood"], "#3b82f6",
            "#eab308" // Default/neutral amber fallback
          ],
          "fill-opacity": [
            "case",
            ["like", ["get", "event"], "Tornado Warning"], 0.3,
            ["like", ["get", "event"], "Severe Thunderstorm Warning"], 0.25,
            ["like", ["get", "event"], "Flood"], 0.2,
            0.12 // Watches/other alerts
          ]
        }}
      />
      {/* Warning Border Outline Layer */}
      <Layer
        id="warnings-outline"
        type="line"
        paint={{
          "line-color": [
            "case",
            ["like", ["get", "event"], "Tornado Warning"], "#ef4444",
            ["like", ["get", "event"], "Severe Thunderstorm Warning"], "#f97316",
            ["like", ["get", "event"], "Flood"], "#3b82f6",
            "#eab308"
          ],
          "line-width": [
            "case",
            ["like", ["get", "event"], "Tornado Warning"], 2.5,
            ["like", ["get", "event"], "Severe Thunderstorm Warning"], 1.5,
            1.5
          ],
          "line-dasharray": [
            "case",
            ["like", ["get", "event"], "Warning"], ["literal", [1, 0]], // solid line
            ["literal", [4, 4]] // dashed for watches
          ]
        }}
      />
    </Source>
  );
}

export default AlertPolygonLayer;
