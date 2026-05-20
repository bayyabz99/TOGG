"use client";

import React, { useState, useEffect } from "react";
import { TOGG_VEHICLE_DATA } from "@/app/api/specifications/route";
import { VehicleModel, VehicleColor, VehicleTrim } from "@/types";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import SpecsBar from "@/components/SpecsBar";

export default function Home() {
  // 1. Core State
  const [activeModel, setActiveModel] = useState<VehicleModel>(TOGG_VEHICLE_DATA[0]);
  const [activeTrim, setActiveTrim] = useState<VehicleTrim>(TOGG_VEHICLE_DATA[0].trims[0]);

  // Available colors based on active model and active trim
  const availableColors = React.useMemo(() => {
    return activeTrim.colors;
  }, [activeTrim]);

  const [activeColor, setActiveColor] = useState<VehicleColor>(
    TOGG_VEHICLE_DATA[0].trims[0].colors[0]
  );

  // 2. Syncing model selection swaps
  const handleModelChange = (modelId: string) => {
    const selectedModel = TOGG_VEHICLE_DATA.find((m) => m.id === modelId);
    if (selectedModel) {
      setActiveModel(selectedModel);
      const firstTrim = selectedModel.trims[0];
      setActiveTrim(firstTrim);
      setActiveColor(firstTrim.colors[0]);
    }
  };

  // 3. Syncing trim selection swaps
  const handleTrimChange = (trim: VehicleTrim) => {
    setActiveTrim(trim);

    // Find the matching color ID in the new trim to preserve user selection if available
    const matchingColor = trim.colors.find(c => c.id === activeColor.id);
    if (matchingColor) {
      setActiveColor(matchingColor);
    } else if (trim.colors.length > 0) {
      setActiveColor(trim.colors[0]);
    }
  };

  // 4. Inject CSS Variables for glowing effects on color change
  useEffect(() => {
    if (typeof window !== "undefined") {
      const root = document.documentElement;
      root.style.setProperty("--accent-glow", activeColor.theme.glowColor);
      root.style.setProperty("--primary", activeColor.theme.accentHex);
    }
  }, [activeColor]);

  const accentColor = activeColor.theme.accentHex;

  return (
    <div 
      className={`theme-bg-transition min-h-screen bg-gradient-to-b ${activeColor.theme.bgGradient} text-zinc-900 flex flex-col font-sans relative overflow-x-hidden`}
    >
      {/* Absolute Ambient Background Gradients */}
      <div className="absolute top-0 inset-x-0 h-[80vh] bg-gradient-to-b from-transparent via-[#ffffff]/40 to-[#fdfdfd] pointer-events-none z-0" />
      
      {/* 1. Header Component */}
      <Header
        models={TOGG_VEHICLE_DATA}
        activeModelId={activeModel.id}
        onModelChange={handleModelChange}
        accentColor={accentColor}
      />

      {/* Main Content Area */}
      <main className="flex-1 relative z-10">
        
        {/* 2. Hero Section */}
        <HeroSection
          model={activeModel}
          activeColor={activeColor}
          accentColor={accentColor}
          colors={availableColors}
          onColorChange={setActiveColor}
        />

        {/* 3. Specs Bar (Anchored bottom-center of Hero) */}
        <SpecsBar
          trims={activeModel.trims}
          activeTrim={activeTrim}
          onTrimChange={handleTrimChange}
          activeColor={activeColor}
          accentColor={accentColor}
        />

        {/* Space Divider */}
        <div className="h-12" />

      </main>

      {/* Modern Luxury Minimalist Footer */}
      <footer className="border-t border-black/[0.05] bg-[#f8f9fa] py-12 relative z-20 text-center text-zinc-500 px-6">
        <div className="mx-auto max-w-7xl flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Logo / Copyright */}
          <div className="flex items-center gap-2">
            <div className="relative flex h-6 w-6 items-center justify-center">
              <div 
                className="absolute h-4 w-4 rotate-45 border border-zinc-300 transition-colors duration-1000"
                style={{ borderColor: accentColor }}
              />
              <div className="absolute h-1.5 w-1.5 rotate-45 bg-zinc-400" />
            </div>
            <span className="font-sans text-sm font-bold tracking-[0.25em] text-zinc-800 opacity-80">
              TOGG
            </span>
          </div>

          {/* Editorial links */}
          <div className="flex flex-wrap justify-center gap-8 text-[10px] font-bold tracking-widest uppercase font-mono">
            <a href="#overview" className="text-zinc-400 hover:text-zinc-800 transition-colors duration-300">Gizlilik & Yasal</a>
            <a href="#specs" className="text-zinc-400 hover:text-zinc-800 transition-colors duration-300">Çerez Tercihleri</a>
            <a href="#configure" className="text-zinc-400 hover:text-zinc-800 transition-colors duration-300">İletişim</a>
          </div>

          <span className="text-[10px] font-mono tracking-wider text-zinc-400">
            © {new Date().getFullYear()} TOGG. Tüm hakları saklıdır.
          </span>
        </div>
      </footer>
    </div>
  );
}
