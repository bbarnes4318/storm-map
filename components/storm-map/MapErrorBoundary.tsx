"use client";

import React, { ErrorInfo, ReactNode } from "react";
import { AlertTriangle } from "lucide-react";

interface Props {
  children: ReactNode;
  fallbackText?: string;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class MapErrorBoundary extends React.Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Map component caught error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="absolute inset-0 z-[1050] bg-slate-950/90 flex flex-col items-center justify-center p-6 text-center select-none backdrop-blur-sm">
          <div className="bg-[#0B1930]/90 border border-red-500/30 p-6 rounded-2xl max-w-sm shadow-2xl flex flex-col items-center gap-3">
            <AlertTriangle className="w-8 h-8 text-red-500 animate-bounce" />
            <h4 className="font-extrabold text-[#F8FAFC] text-xs uppercase tracking-widest text-red-400">
              System Error
            </h4>
            <p className="text-[10px] text-slate-350 font-semibold leading-relaxed">
              {this.props.fallbackText || "Something went wrong displaying the scan result. Please try again."}
            </p>
            {this.state.error && (
              <span className="block text-[8px] font-mono text-slate-500 bg-black/40 px-2 py-1 rounded max-w-full truncate">
                {this.state.error.message}
              </span>
            )}
            <button
              onClick={() => this.setState({ hasError: false, error: null })}
              className="mt-2 px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-[10px] font-extrabold text-[#F8FAFC] uppercase transition-all cursor-pointer border border-slate-700"
            >
              Reset Display
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default MapErrorBoundary;
