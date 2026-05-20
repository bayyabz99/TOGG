"use client";

import React from "react";
import { VehicleColor } from "@/types";

interface ColorConfiguratorProps {
  colors: VehicleColor[];
  activeColor: VehicleColor;
  onColorChange: (color: VehicleColor) => void;
  accentColor: string;
}

export default function ColorConfigurator({
  colors,
  activeColor,
  onColorChange,
  accentColor,
}: ColorConfiguratorProps) {
  return (
    <div className="absolute right-6 sm:right-8 top-1/2 -translate-y-1/2 flex flex-col items-center gap-5 p-4 bg-white/30 backdrop-blur-2xl border border-white/20 rounded-3xl shadow-2xl shadow-zinc-350/50 z-30 transition-all duration-1000">
      
      {/* Title */}
      <span 
        className="text-[9px] font-bold tracking-[0.25em] uppercase text-center select-none font-mono block pb-2 border-b border-black/5 w-full text-zinc-500"
      >
        RENK
      </span>

      {/* Vertical Palette Picker */}
      <div className="flex flex-col items-center gap-4">
        {colors.map((color) => {
          const isActive = color.id === activeColor.id;
          return (
            <button
              key={color.id}
              onClick={() => onColorChange(color)}
              className="relative group focus:outline-none"
              aria-label={color.name}
            >
              {/* Outer Glowing Border Ring */}
              <div
                className={`absolute -inset-2.5 rounded-full blur-[6px] opacity-0 group-hover:opacity-40 transition-all duration-500 scale-90 group-hover:scale-100 ${
                  isActive ? "opacity-100 scale-100" : ""
                }`}
                style={{
                  background: `radial-gradient(circle, ${color.theme.glowColor} 0%, transparent 70%)`,
                }}
              />
              
              {/* Selected Indicator Ring */}
              <div
                className={`absolute -inset-1 rounded-full border transition-all duration-500 ${
                  isActive
                    ? "scale-105 border-zinc-800 opacity-100"
                    : "scale-90 border-transparent opacity-0 group-hover:opacity-30 group-hover:border-zinc-800/50"
                }`}
              />

              {/* The Metallic Circle Button */}
              <div
                className="relative w-8 h-8 rounded-full border border-black/40 shadow-inner flex items-center justify-center cursor-pointer transition-all duration-300"
                style={{
                  background: `radial-gradient(circle at 35% 35%, #ffffff 0%, ${color.hex} 40%, #000000 100%)`,
                  boxShadow: "inset 0 2px 4px rgba(255,255,255,0.15), 0 4px 6px rgba(0,0,0,0.4)",
                }}
              >
                {/* Metallic sheen overlay */}
                <div className="absolute inset-0 rounded-full bg-[linear-gradient(135deg,rgba(255,255,255,0.25)_0%,transparent_50%,rgba(0,0,0,0.45)_100%)] pointer-events-none" />
              </div>

              {/* Tooltip (Sliding to the Left) */}
              <span className="absolute right-12 top-1/2 -translate-y-1/2 whitespace-nowrap bg-zinc-950/90 border border-white/10 text-[10px] font-bold tracking-widest text-white px-2.5 py-1.5 rounded-md opacity-0 pointer-events-none group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0 shadow-lg shadow-black/80">
                {color.name}
              </span>
            </button>
          );
        })}
      </div>

      {/* Active color detail subtitle */}
      <div className="flex flex-col items-center text-center pt-2 border-t border-black/5 w-full">
        <span className="text-[8px] font-extrabold font-mono tracking-wider text-zinc-700 uppercase block">
          {activeColor.theme.localName}
        </span>
      </div>

    </div>
  );
}
