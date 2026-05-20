"use client";

import React from "react";
import { VehicleModel } from "@/types";

interface HeaderProps {
  models: VehicleModel[];
  activeModelId: string;
  onModelChange: (modelId: string) => void;
  accentColor: string; // for border/text highlights
}

export default function Header({
  models,
  activeModelId,
  onModelChange,
  accentColor,
}: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-black/[0.05] bg-white/70 backdrop-blur-md transition-all duration-300">
      <div className="mx-auto flex max-w-7xl h-20 items-center justify-between px-6 sm:px-8">
        
        {/* Logo / Branding */}
        <div className="flex items-center gap-2">
          {/* Diamond Logo Representing TOGG */}
          <div className="relative flex h-8 w-8 items-center justify-center">
            <div 
              className="absolute h-5 w-5 rotate-45 border-2 border-zinc-800 transition-colors duration-1000"
              style={{ borderColor: accentColor }}
            />
            <div className="absolute h-2 w-2 rotate-45 bg-zinc-800" />
          </div>
          <span className="font-sans text-xl font-bold tracking-[0.25em] text-zinc-900">
            TOGG
          </span>
        </div>

        {/* Model Switcher - Center */}
        <div className="hidden md:flex items-center gap-1 p-1 bg-black/[0.03] border border-black/[0.05] rounded-full">
          {models.map((model) => {
            const isActive = model.id === activeModelId;
            return (
              <button
                key={model.id}
                onClick={() => onModelChange(model.id)}
                className={`px-6 py-2 rounded-full text-xs font-semibold tracking-widest uppercase transition-all duration-500 ${
                  isActive
                    ? "bg-black text-white shadow-md"
                    : "text-zinc-500 hover:text-black"
                }`}
              >
                {model.name}
              </button>
            );
          })}
        </div>

        {/* Action button & Mobile Switcher */}
        <div className="flex items-center gap-4">
          {/* Small screen switcher */}
          <div className="flex md:hidden items-center gap-1 p-0.5 bg-black/[0.03] border border-black/[0.05] rounded-full">
            {models.map((model) => {
               const isActive = model.id === activeModelId;
               return (
                 <button
                   key={model.id}
                   onClick={() => onModelChange(model.id)}
                   className={`px-3 py-1.5 rounded-full text-[10px] font-bold tracking-wider uppercase transition-all duration-500 ${
                     isActive
                       ? "bg-black text-white"
                       : "text-zinc-500 hover:text-black"
                   }`}
                 >
                   {model.name}
                 </button>
               );
            })}
          </div>

          <a
            href="#configure"
            className="hidden sm:inline-flex items-center justify-center rounded-full px-5 py-2.5 text-xs font-bold tracking-widest uppercase transition-all duration-300 border border-black/10 bg-transparent hover:bg-black hover:text-white hover:border-black text-black"
          >
            Renkleri İncele
          </a>
        </div>
      </div>
    </header>
  );
}
