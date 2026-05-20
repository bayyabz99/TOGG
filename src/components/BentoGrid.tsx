"use client";

import React, { useState } from "react";
import { VehicleTrim, VehicleColor } from "@/types";

interface BentoGridProps {
  activeColor: VehicleColor;
  accentColor: string;
}

export default function BentoGrid({
  activeColor,
  accentColor,
}: BentoGridProps) {
  // Charging simulator state
  const [chargeProgress, setChargeProgress] = useState(20);
  const [isCharging, setIsCharging] = useState(false);
  const [chargingTimer, setChargingTimer] = useState<NodeJS.Timeout | null>(null);

  const startCharging = () => {
    if (isCharging) {
      if (chargingTimer) clearInterval(chargingTimer);
      setIsCharging(false);
      setChargeProgress(20);
      return;
    }

    setIsCharging(true);
    const interval = setInterval(() => {
      setChargeProgress((prev) => {
        if (prev >= 80) {
          clearInterval(interval);
          setIsCharging(false);
          return 80;
        }
        return prev + 1;
      });
    }, 80);
    setChargingTimer(interval);
  };

  return (
    <div className="mx-auto max-w-7xl px-6 pb-24 relative z-20">
      
      {/* Editorial Grid Title */}
      <div className="mb-12 text-center md:text-left">
        <span 
          className="text-[10px] font-bold tracking-[0.35em] uppercase block mb-1 font-mono transition-colors duration-1000"
          style={{ color: accentColor }}
        >
          Tasarım ve Teknoloji
        </span>
        <h3 className="text-3xl font-black text-zinc-900 tracking-tight">
          Bento Detay Evi
        </h3>
        <p className="text-xs text-zinc-500 mt-1">
          Her ayrıntısı titizlikle işlenmiş, üst düzey estetik ve konsept öğeleri.
        </p>
      </div>

      {/* Grid container */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[240px] md:auto-rows-[260px]">
        
        {/* Card 1: Futuristic Cockpit (Spans 2 cols on desktop) */}
        <div className="md:col-span-2 glass-panel rounded-3xl p-8 relative overflow-hidden group flex flex-col justify-end glass-panel-hover shadow-lg shadow-zinc-200/20">
          {/* Background image holder (User will upload, fallback is premium mesh gradient) */}
          <div className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat transition-all duration-1000 opacity-[0.25] group-hover:opacity-45 group-hover:scale-105" 
               style={{ 
                 backgroundImage: "url('/images/bento/interior.png')",
                 backgroundColor: "rgba(240, 240, 245, 0.9)"
               }} 
          />
          {/* Tech overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-white via-white/80 to-transparent z-0 pointer-events-none" />
          
          <div className="relative z-10">
            <span 
              className="text-[9px] font-bold tracking-[0.3em] uppercase block mb-2 font-mono transition-colors duration-1000"
              style={{ color: accentColor }}
            >
              YAŞAM ALANI
            </span>
            <h4 className="text-xl sm:text-2xl font-black text-zinc-900 tracking-tight mb-2">
              Panoramik Akıllı Kokpit
            </h4>
            <p className="text-xs text-zinc-650 max-w-lg leading-relaxed">
              Ön konsolu boydan boya kaplayan 29 inçlik benzersiz bilgi-eğlence ekranı ve akıllı yaşam asistanlarıyla, seyahatlerinizi dijital bir şölene dönüştürün.
            </p>
          </div>
        </div>

        {/* Card 2: Aero Rim Detail (1 col, 1 row) */}
        <div className="glass-panel rounded-3xl p-8 relative overflow-hidden group flex flex-col justify-end glass-panel-hover shadow-lg shadow-zinc-200/20">
          {/* Background image holder */}
          <div className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat transition-all duration-1000 opacity-[0.25] group-hover:opacity-40 group-hover:rotate-6 group-hover:scale-105" 
               style={{ 
                 backgroundImage: "url('/images/bento/wheel.png')",
                 backgroundColor: "rgba(240, 240, 245, 0.9)"
               }} 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-white via-white/70 to-transparent z-0 pointer-events-none" />

          <div className="relative z-10">
            <span 
              className="text-[9px] font-bold tracking-[0.3em] uppercase block mb-2 font-mono transition-colors duration-1000"
              style={{ color: accentColor }}
            >
              MÜHENDİSLİK
            </span>
            <h4 className="text-base sm:text-lg font-black text-zinc-900 tracking-tight mb-1">
              Aerodinamik Jant Tasarımı
            </h4>
            <p className="text-[11px] text-zinc-600 leading-normal">
              Hava türbülansını minimuma indiren özel alaşım 19" alaşımlı jantlar, sürtünmeyi düşürerek menzili maksimize eder.
            </p>
          </div>
        </div>

        {/* Card 3: Signature LED Headlights (1 col, 1 row) */}
        <div className="glass-panel rounded-3xl p-8 relative overflow-hidden group flex flex-col justify-end glass-panel-hover shadow-lg shadow-zinc-200/20">
          {/* Background image holder */}
          <div className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat transition-all duration-1000 opacity-[0.25] group-hover:opacity-40 group-hover:scale-105" 
               style={{ 
                 backgroundImage: "url('/images/bento/headlight.png')",
                 backgroundColor: "rgba(235, 235, 240, 0.9)"
               }} 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-white via-white/70 to-transparent z-0 pointer-events-none" />

          <div className="relative z-10">
            <span 
              className="text-[9px] font-bold tracking-[0.3em] uppercase block mb-2 font-mono transition-colors duration-1000"
              style={{ color: accentColor }}
            >
              GÖRÜŞ
            </span>
            <h4 className="text-base sm:text-lg font-black text-zinc-900 tracking-tight mb-1">
              İmza LED Farlar
            </h4>
            <p className="text-[11px] text-zinc-600 leading-normal">
              Göz alıcı yatay kristal LED teknolojisi, karanlık yolları kusursuz gün ışığıyla aydınlatarak üst seviye gece sürüş güvenliği sunar.
            </p>
          </div>
        </div>

        {/* Card 4: Interactive Trugo Charging Simulation (Spans 2 cols on desktop) */}
        <div className="md:col-span-2 glass-panel rounded-3xl p-8 relative overflow-hidden flex flex-col justify-between border-black/[0.05] shadow-lg shadow-zinc-200/20 group">
          
          {/* Top row */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span 
                className="text-[9px] font-bold tracking-[0.3em] uppercase block mb-1 font-mono transition-colors duration-1000"
                style={{ color: accentColor }}
              >
                ŞARJ & ALTYAPI
              </span>
              <h4 className="text-lg font-black text-zinc-900 tracking-tight">
                Trugo Yüksek Hızlı Şarj Simülasyonu
              </h4>
            </div>
            
            {/* Control Button */}
            <button
              onClick={startCharging}
              className="px-5 py-2 rounded-full text-[10px] font-bold tracking-widest uppercase transition-all duration-300 self-start sm:self-center border border-black/10 hover:bg-black hover:text-white text-zinc-900 bg-transparent active:scale-95 cursor-pointer font-sans"
            >
              {isCharging ? "SIFIRLA" : "ŞARJI BAŞLAT"}
            </button>
          </div>

          {/* Interactive charging progress visualizer */}
          <div className="my-6">
            
            {/* Metrics */}
            <div className="flex justify-between items-baseline mb-2 font-mono">
              <span className="text-[10px] text-zinc-500 uppercase tracking-widest">
                {isCharging ? "HIZLI ŞARJ OLUYOR (180 kW DC)..." : "TRUGO DC İSTASYONU BAĞLI"}
              </span>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-black text-zinc-900">
                  {chargeProgress}
                </span>
                <span className="text-xs text-zinc-500 font-bold">%</span>
              </div>
            </div>

            {/* Progress track */}
            <div className="w-full h-3 rounded-full bg-zinc-100 border border-black/[0.05] p-0.5 overflow-hidden">
              <div 
                className="h-full rounded-full transition-all duration-300 ease-out relative"
                style={{ 
                  width: `${chargeProgress}%`,
                  backgroundColor: accentColor,
                  boxShadow: `0 0 16px ${activeColor.theme.glowColor}`
                }}
              >
                {/* Glow pulse tail */}
                <div className="absolute right-0 top-0 bottom-0 w-4 bg-white/40 blur-[2px] animate-[pulse_1s_infinite]" />
              </div>
            </div>
          </div>

          {/* Small charging text description */}
          <p className="text-[11px] text-zinc-500 leading-relaxed font-light">
            Menzilinizi 28 dakikada %20'den %80'e ulaştıran DC yüksek hızlı şarj ağı Trugo, 81 ilin tamamında kesintisiz akıllı ulaşım imkanı sağlar.
          </p>

        </div>

      </div>
    </div>
  );
}
