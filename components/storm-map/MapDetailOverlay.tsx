"use client";

import React from "react";
import { X } from "lucide-react";

interface MapDetailOverlayProps {
  x: number;
  y: number;
  onClose: () => void;
  header: React.ReactNode;
  children: React.ReactNode; // Represents body content
  footer?: React.ReactNode;
  type?: string;
  detailData?: any;
}

export function MapDetailOverlay({
  x,
  y,
  onClose,
  header,
  children,
  footer,
  type,
  detailData,
}: MapDetailOverlayProps) {
  const cardRef = React.useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = React.useState(false);
  const [cardSize, setCardSize] = React.useState({ width: 360, height: 350 });
  const [position, setPosition] = React.useState({ left: 0, top: 0 });

  // Get accent color based on detail type/data
  const accentColor = React.useMemo(() => {
    if (!type) return "#475569"; // default slate-600
    if (type === "storm-report" || type === "cluster") {
      const stormType = detailData?.type || detailData?.mainStormType || "";
      if (stormType === "hail") return "#2563EB"; // Hail blue
      if (stormType === "wind") return "#7C3AED"; // Wind purple
      if (stormType === "tornado") return "#DC2626"; // Tornado red
    } else if (type === "warning") {
      const event = detailData?.event || "";
      if (event.includes("Tornado")) return "#DC2626";
      if (event.includes("Severe")) return "#F59E0B"; // Amber/Orange
      return "#3B82F6"; // Blue
    } else if (type === "address") {
      return "#10B981"; // Emerald
    }
    return "#475569";
  }, [type, detailData]);

  // Detect mobile viewports
  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Keyboard Escape handler
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  // Monitor size of the card dynamically
  React.useEffect(() => {
    const el = cardRef.current;
    if (!el) return;

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        // Fallbacks to handle browser variations
        const width = entry.borderBoxSize?.[0]?.inlineSize || entry.contentRect.width || 360;
        const height = entry.borderBoxSize?.[0]?.blockSize || entry.contentRect.height || 350;
        setCardSize({ width, height });
      }
    });

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Compute collision-aware position on desktop
  React.useEffect(() => {
    if (isMobile) return;
    const parent = cardRef.current?.parentElement;
    const containerWidth = parent?.clientWidth || window.innerWidth;
    const containerHeight = parent?.clientHeight || window.innerHeight;

    const margin = 16;

    // Horizontal centering
    let left = x - cardSize.width / 2;
    if (left < margin) {
      left = margin;
    } else if (left + cardSize.width > containerWidth - margin) {
      left = containerWidth - cardSize.width - margin;
    }

    // Vertical alignment (prefer placing above the click point)
    let top = y - cardSize.height - 12;
    if (top < margin) {
      // If it overflows the top edge, flip to below the click point
      top = y + 12;
    }

    // If it still overflows the bottom, clamp to bottom margin
    if (top + cardSize.height > containerHeight - margin) {
      top = containerHeight - cardSize.height - margin;
    }

    // Ultimate fallback clamp to top margin
    if (top < margin) {
      top = margin;
    }

    setPosition({ left, top });
  }, [x, y, cardSize, isMobile]);

  // Stop clicks from bubbling up and closing the overlay on map clicking
  const handleContainerClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  const borderStyle: React.CSSProperties = {
    border: "1px solid rgba(20, 92, 255, 0.28)",
    borderTop: `3px solid ${accentColor}`,
    boxShadow: `0 24px 70px rgba(0, 0, 0, 0.42), 0 0 20px -3px ${accentColor}1c, inset 0 1px 0 0 rgba(255, 255, 255, 0.05)`,
    background: "rgba(6, 26, 47, 0.96)",
    borderRadius: "18px",
  };

  const desktopStyle: React.CSSProperties = {
    left: `${position.left}px`,
    top: `${position.top}px`,
    ...borderStyle,
  };

  const mobileStyle: React.CSSProperties = {
    ...borderStyle,
  };

  return (
    <div
      ref={cardRef}
      onClick={handleContainerClick}
      style={isMobile ? mobileStyle : desktopStyle}
      className={`z-[1001] backdrop-blur-md flex flex-col transition-all duration-150 ease-out select-text ${
        isMobile
          ? "fixed bottom-3 left-3 right-3 w-[calc(100%-24px)] max-h-[75vh] rounded-[18px]"
          : "absolute w-[360px] max-h-[calc(100vh-80px)] pointer-events-auto"
      }`}
    >
      {/* Sticky Header */}
      <div className="flex-shrink-0 flex items-center justify-between border-b border-[#145CFF]/15 p-4 pb-3">
        <div className="flex-1 min-w-0 pr-2">
          {header}
        </div>
        <button
          onClick={onClose}
          type="button"
          className="p-1 rounded-md text-slate-400 hover:text-slate-200 hover:bg-slate-900 border border-transparent hover:border-slate-800 transition-colors"
          title="Close details"
        >
          <X size={16} />
        </button>
      </div>

      {/* Scrollable Body */}
      <div className="flex-1 overflow-y-auto p-4 pr-3.5 space-y-4 min-h-0 text-slate-350 custom-scrollbar">
        {children}
      </div>

      {/* Sticky Footer */}
      {footer && (
        <div className="flex-shrink-0 border-t border-[#145CFF]/15 p-4 pt-3.5 bg-slate-950/40 rounded-b-[18px]">
          {footer}
        </div>
      )}
    </div>
  );
}
