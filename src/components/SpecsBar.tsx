"use client";

import React from "react";
import { VehicleTrim, VehicleColor } from "@/types";

interface SpecsBarProps {
  trims: VehicleTrim[];
  activeTrim: VehicleTrim;
  onTrimChange: (trim: VehicleTrim) => void;
  activeColor: VehicleColor;
  accentColor: string;
}

export default function SpecsBar({
  trims,
  activeTrim,
  onTrimChange,
  activeColor,
  accentColor,
}: SpecsBarProps) {
  return (
    <div className="w-full relative z-20 px-6 max-w-7xl mx-auto -translate-y-8">
      
      {/* 1. Sleek Trim Selector Tab Bar */}
      <div className="flex justify-center mb-6">
        <div className="flex items-center gap-1.5 p-1 bg-black/[0.02] border border-black/[0.05] rounded-full backdrop-blur-2xl">
          {trims.map((trim) => {
            const isActive = trim.id === activeTrim.id;
            return (
              <button
                key={trim.id}
                onClick={() => onTrimChange(trim)}
                className={`relative px-4 py-2 rounded-full text-[10px] sm:text-xs font-bold tracking-widest uppercase transition-all duration-500 ${
                  isActive
                    ? "text-white bg-black shadow-md"
                    : "text-zinc-500 hover:text-black hover:bg-black/[0.02]"
                }`}
              >
                {trim.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Specs Stats Grid */}
      <div className="glass-panel border-black/[0.05] rounded-3xl p-6 sm:p-8 relative overflow-hidden shadow-xl shadow-zinc-200/50">
        
        {/* Glow corner line */}
        <div 
          className="absolute top-0 left-0 right-0 h-[2px] transition-all duration-1000"
          style={{ 
            background: `linear-gradient(to right, transparent 15%, ${accentColor} 50%, transparent 85%)` 
          }}
        />

        <div className="grid grid-cols-2 md:grid-cols-6 gap-6 sm:gap-8 divide-y md:divide-y-0 md:divide-x divide-black/[0.06]">
          
          {/* Stat 1: Driving Range */}
          <div className="flex flex-col items-center justify-center text-center p-2 pt-6 md:pt-2">
            <span className="text-[10px] font-bold font-mono tracking-widest text-zinc-500 uppercase mb-2">
              MENZİL (WLTP)
            </span>
            <div className="flex items-baseline gap-1">
              <span className="text-3xl sm:text-4xl font-black tracking-tight text-zinc-900 font-sans animate-fade-in">
                {activeTrim.specs.rangeWltp}
              </span>
              <span 
                className="text-xs font-bold transition-colors duration-1000"
                style={{ color: accentColor }}
              >
                KM
              </span>
            </div>
            <span className="text-[9px] text-zinc-400 mt-1 font-mono">Standart Sürüş</span>
          </div>

          {/* Stat 2: Battery Capacity */}
          <div className="flex flex-col items-center justify-center text-center p-2 pt-6 md:pt-2 md:pl-4">
            <span className="text-[10px] font-bold font-mono tracking-widest text-zinc-500 uppercase mb-2">
              BATARYA KAPASİTESİ
            </span>
            <div className="flex items-baseline gap-1">
              <span className="text-3xl sm:text-4xl font-black tracking-tight text-zinc-900 font-sans">
                {activeTrim.specs.batteryCapacity}
              </span>
              <span 
                className="text-xs font-bold transition-colors duration-1000"
                style={{ color: accentColor }}
              >
                kWh
              </span>
            </div>
            <span className="text-[9px] text-zinc-400 mt-1 font-mono">Lityum İyon</span>
          </div>

          {/* Stat 3: Fast Charging */}
          <div className="flex flex-col items-center justify-center text-center p-2 pt-6 md:pt-2 md:pl-4">
            <span className="text-[10px] font-bold font-mono tracking-widest text-zinc-500 uppercase mb-2">
              HIZLI ŞARJ
            </span>
            <div className="flex items-baseline gap-1">
              <span className="text-3xl sm:text-4xl font-black tracking-tight text-zinc-900 font-sans">
                {activeTrim.specs.fastChargingTime}
              </span>
              <span 
                className="text-xs font-bold transition-colors duration-1000"
                style={{ color: accentColor }}
              >
                DK
              </span>
            </div>
            <span className="text-[9px] text-zinc-400 mt-1 font-mono">%20 - %80 Şarj (Trugo)</span>
          </div>

          {/* Stat 4: Max Power */}
          <div className="flex flex-col items-center justify-center text-center p-2 pt-6 md:pt-2 md:pl-4">
            <span className="text-[10px] font-bold font-mono tracking-widest text-zinc-500 uppercase mb-2">
              MAKSİMUM GÜÇ
            </span>
            <div className="flex items-baseline gap-1">
              <span className="text-3xl sm:text-4xl font-black tracking-tight text-zinc-900 font-sans">
                {activeTrim.specs.maxPowerPs}
              </span>
              <span 
                className="text-xs font-bold transition-colors duration-1000"
                style={{ color: accentColor }}
              >
                HP
              </span>
            </div>
            <span className="text-[9px] text-zinc-400 mt-1 font-mono">({activeTrim.specs.maxPowerKw} kW) Motor</span>
          </div>

          {/* Stat 5: Max Torque */}
          <div className="flex flex-col items-center justify-center text-center p-2 pt-6 md:pt-2 md:pl-4">
            <span className="text-[10px] font-bold font-mono tracking-widest text-zinc-500 uppercase mb-2">
              MAKSİMUM TORK
            </span>
            <div className="flex items-baseline gap-1">
              <span className="text-3xl sm:text-4xl font-black tracking-tight text-zinc-900 font-sans">
                {activeTrim.specs.maxTorque}
              </span>
              <span 
                className="text-xs font-bold transition-colors duration-1000"
                style={{ color: accentColor }}
              >
                NM
              </span>
            </div>
            <span className="text-[9px] text-zinc-400 mt-1 font-mono">Anlık Tork İletimi</span>
          </div>

          {/* Stat 6: Acceleration */}
          <div className="flex flex-col items-center justify-center text-center p-2 pt-6 md:pt-2 md:pl-4">
            <span className="text-[10px] font-bold font-mono tracking-widest text-zinc-500 uppercase mb-2">
              0 - 100 KM/H
            </span>
            <div className="flex items-baseline gap-1">
              <span className="text-3xl sm:text-4xl font-black tracking-tight text-zinc-900 font-sans">
                {activeTrim.specs.acceleration}
              </span>
              <span 
                className="text-xs font-bold transition-colors duration-1000"
                style={{ color: accentColor }}
              >
                SN
              </span>
            </div>
            <span className="text-[9px] text-zinc-400 mt-1 font-mono">Seri Hızlanma</span>
          </div>

        </div>

      </div>

    </div>
  );
}
