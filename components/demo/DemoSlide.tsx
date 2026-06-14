"use client";

import React from "react";

interface DemoSlideProps {
  children: React.ReactNode;
  isActive: boolean;
  className?: string;
}

export default function DemoSlide({ children, isActive, className = "" }: DemoSlideProps) {
  if (!isActive) return null;

  return (
    <div
      className={`w-full h-full flex flex-col justify-between overflow-hidden animate-in fade-in slide-in-from-bottom-2 duration-300 ${className}`}
    >
      {children}
    </div>
  );
}
