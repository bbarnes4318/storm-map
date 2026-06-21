/**
 * Shared storm type color definitions and Mapbox GL expression helpers.
 *
 * Every layer, legend, and popup that needs storm-type-aware coloring
 * should import from this module to stay in sync with the Map Legend.
 */

import type { ExpressionSpecification } from "mapbox-gl";

export const STORM_TYPE_COLORS = {
  hail: {
    fill: "#2F7DFF",
    stroke: "rgba(248, 250, 252, 0.78)",
    label: "Hail Reports",
  },
  wind: {
    fill: "#8B5CF6",
    stroke: "rgba(248, 250, 252, 0.72)",
    label: "Damaging Wind",
  },
  tornado: {
    fill: "#F43F5E",
    stroke: "rgba(248, 250, 252, 0.82)",
    label: "Tornado Reports",
  },
} as const;

/** Default/fallback fill color for unknown storm types. */
const FALLBACK_FILL = "#64748B";

/** Default/fallback stroke color for unknown storm types. */
const FALLBACK_STROKE = "#E2E8F0";

/**
 * Mapbox data expression that resolves a feature's `type` property
 * to the correct fill color. Works with both `circle-color` and
 * `fill-color` paint properties.
 *
 * Expects the GeoJSON feature to have a `type` string property
 * whose lowercase value is one of "hail", "wind", or "tornado".
 */
export const stormFillColorExpression: ExpressionSpecification = [
  "case",
  ["==", ["downcase", ["get", "type"]], "hail"],
  [
    "case",
    ["<", ["coalesce", ["get", "magnitudeNum"], 0], 1.0],
    "#38BDF8", // sky blue (< 1.00")
    ["<", ["coalesce", ["get", "magnitudeNum"], 0], 1.5],
    "#2563EB", // strong blue (1.00" - 1.49")
    ["<", ["coalesce", ["get", "magnitudeNum"], 0], 2.0],
    "#F59E0B", // amber / orange (1.50" - 1.99")
    "#EF4444"  // red (>= 2.00")
  ],
  ["==", ["downcase", ["get", "type"]], "wind"],
  STORM_TYPE_COLORS.wind.fill,
  ["==", ["downcase", ["get", "type"]], "tornado"],
  STORM_TYPE_COLORS.tornado.fill,
  FALLBACK_FILL,
];

/**
 * Mapbox data expression that resolves a feature's `type` property
 * to the correct stroke color. Works with `circle-stroke-color` and
 * `line-color` paint properties.
 */
export const stormStrokeColorExpression: ExpressionSpecification = [
  "case",
  ["==", ["downcase", ["get", "type"]], "hail"],
  STORM_TYPE_COLORS.hail.stroke,
  ["==", ["downcase", ["get", "type"]], "wind"],
  STORM_TYPE_COLORS.wind.stroke,
  ["==", ["downcase", ["get", "type"]], "tornado"],
  STORM_TYPE_COLORS.tornado.stroke,
  FALLBACK_STROKE,
];
