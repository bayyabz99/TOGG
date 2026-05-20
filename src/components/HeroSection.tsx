"use client";

import React, { useState, useEffect } from "react";
import { VehicleColor, VehicleModel } from "@/types";
import ColorConfigurator from "@/components/ColorConfigurator";

interface HeroSectionProps {
  model: VehicleModel;
  activeColor: VehicleColor;
  accentColor: string;
  colors: VehicleColor[];
  onColorChange: (color: VehicleColor) => void;
}

const ANGLE_NAMES: { [key: string]: string } = {
  front: "Ön",
  frontLeft: "Ön Sol",
  frontRight: "Ön Sağ",
  side: "Profil",
  rear: "Arka",
  rearLeft: "Arka Sol",
  rearRight: "Arka Sağ"
};

export default function HeroSection({
  model,
  activeColor,
  accentColor,
  colors,
  onColorChange,
}: HeroSectionProps) {
  const [imageError, setImageError] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [activeAngle, setActiveAngle] = useState<string>("default");
  const [spinPlatform, setSpinPlatform] = useState(false);

  // Sync active angle selection on color or model change
  useEffect(() => {
    setImageError(false);
    setIsAnimating(true);

    if (activeColor.angles) {
      if (activeColor.angles.frontRight) {
        setActiveAngle("frontRight");
      } else {
        const keys = Object.keys(activeColor.angles);
        if (keys.length > 0) setActiveAngle(keys[0]);
      }
    } else {
      setActiveAngle("default");
    }

    const timer = setTimeout(() => setIsAnimating(false), 800);
    return () => clearTimeout(timer);
  }, [model.id, activeColor.id]);

  // Determine current image URL
  const currentImageUrl = 
    activeColor.angles && activeColor.angles[activeAngle as keyof typeof activeColor.angles]
      ? activeColor.angles[activeAngle as keyof typeof activeColor.angles]
      : activeColor.imageUrl;

  const handleAngleChange = (angleKey: string) => {
    setIsAnimating(true);
    setActiveAngle(angleKey);
    setTimeout(() => setIsAnimating(false), 300);
  };

  return (
    <section className="relative w-full min-h-[92vh] flex flex-col items-center justify-between overflow-hidden bg-[#f4f5f6] py-8 px-6 theme-bg-transition">
      
      {/* 1. Showroom Spotlight Beams - Calibrated for Light Backgrounds */}
      <div className="absolute top-0 inset-x-0 h-full w-full pointer-events-none z-0">
        {/* Left Spotlight */}
        <div 
          className="absolute top-[-10%] left-[10%] w-[45vw] h-[90vh] origin-top rotate-[25deg] opacity-[0.14] blur-[50px] mix-blend-normal transition-all duration-1000"
          style={{
            background: `linear-gradient(180deg, ${activeColor.theme.glowColor} 0%, transparent 80%)`,
            clipPath: "polygon(0 0, 100% 0, 80% 100%, 20% 100%)",
          }}
        />
        {/* Right Spotlight */}
        <div 
          className="absolute top-[-10%] right-[10%] w-[45vw] h-[90vh] origin-top -rotate-[25deg] opacity-[0.14] blur-[50px] mix-blend-normal transition-all duration-1000"
          style={{
            background: `linear-gradient(180deg, ${activeColor.theme.glowColor} 0%, transparent 80%)`,
            clipPath: "polygon(0 0, 100% 0, 80% 100%, 20% 100%)",
          }}
        />
        {/* Top Direct Cone Light */}
        <div 
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[40vw] h-[80vh] opacity-[0.18] blur-[40px] mix-blend-normal transition-all duration-1000"
          style={{
            background: `linear-gradient(180deg, ${activeColor.theme.glowColor} 0%, transparent 70%)`,
            clipPath: "polygon(30% 0, 70% 0, 100% 100%, 0 100%)",
          }}
        />
      </div>

      {/* 2. Showroom Technical Grid Background - Ultra subtle on Light Theme */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.015)_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_60%,transparent_100%)] pointer-events-none z-0" />

      {/* 3. Floating Light Particles (Glimmering sparkles in showroom spotlights) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 opacity-60">
        <div className="absolute top-[20%] left-[30%] w-1.5 h-1.5 rounded-full bg-white blur-[0.5px] shadow-sm animate-[pulse_3s_infinite_1s]" />
        <div className="absolute top-[40%] right-[25%] w-1 h-1 rounded-full bg-white blur-[0.5px] shadow-sm animate-[pulse_4s_infinite]" />
        <div className="absolute top-[15%] right-[40%] w-2 h-2 rounded-full bg-white blur-[0.5px] shadow-sm animate-[pulse_5s_infinite_2s]" />
        <div className="absolute bottom-[30%] left-[20%] w-1.5 h-1.5 rounded-full bg-white blur-[0.5px] shadow-sm animate-[pulse_3.5s_infinite]" />
      </div>

      {/* 4. Giant Minimal Backdrop Typography - Deep Elegance on White */}
      <div className="absolute top-12 select-none pointer-events-none z-0 text-center w-full">
        <span className="text-[12px] font-mono tracking-[0.5em] text-zinc-400 uppercase block mb-2">
          TOGG VIRTUAL SHOWROOM
        </span>
        <h1 
          className="font-sans text-[15vw] font-black tracking-tighter text-black/[0.035] uppercase leading-none transition-all duration-1000"
          style={{ 
            textShadow: `0 0 100px ${activeColor.theme.glowColor}`,
          }}
        >
          {model.name}
        </h1>
      </div>

      {/* Main Showroom GUI Container */}
      <div className="relative z-10 flex flex-col flex-1 w-full max-w-7xl justify-between gap-8 pt-8">
        
        {/* HUD Top Info Panel - Adjusted for light background */}
        <div className="flex justify-between items-start w-full px-2">
          {/* Left HUD Panel */}
          <div className="flex flex-col text-left border-l border-zinc-300 pl-4 py-1">
            <span className="text-[10px] font-mono tracking-widest text-zinc-500 uppercase">MODEL SPEC</span>
            <span className="text-xl font-bold tracking-wider text-zinc-900 uppercase">{model.name}</span>
            <span 
              className="text-[10px] font-bold tracking-widest uppercase mt-0.5"
              style={{ color: accentColor }}
            >
              {model.type} / 2026 EDITION
            </span>
          </div>

          {/* Right HUD Panel */}
          <div className="flex flex-col text-right border-r border-zinc-300 pr-4 py-1">
            <span className="text-[10px] font-mono tracking-widest text-zinc-500 uppercase">VEHICLE STATE</span>
            <span className="text-xs font-bold text-zinc-900 tracking-widest flex items-center gap-1.5 justify-end">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              ONLINE SHOWROOM
            </span>
            <span className="text-[10px] text-zinc-500 font-mono tracking-wider mt-0.5">READY TO CONFIGURE</span>
          </div>
        </div>

        {/* Dynamic Car Stage (The Showroom Platform) */}
        <div className="flex flex-col flex-1 items-center justify-center relative w-full min-h-[450px] sm:min-h-[600px] md:min-h-[680px]">
          
          {/* Virtual Showcase Platform Construction */}
          <div className="absolute bottom-12 w-[92%] max-w-[1050px] aspect-[16/5] z-0 flex items-center justify-center">
            
            {/* 1. Ground Glow Shadow - Dynamic color reflection */}
            <div 
              className="absolute w-[95%] h-[90%] rounded-full blur-3xl opacity-75 pointer-events-none transition-all duration-1000"
              style={{ 
                background: `radial-gradient(ellipse, ${activeColor.theme.glowColor} 0%, transparent 75%)`,
                transform: "translateY(5%)",
              }}
            />

            {/* 2. Rotating Showcase Ring 1 (Polished Perspective Outer Ring) */}
            <div 
              className="absolute inset-0 rounded-full border border-black/[0.04] shadow-[inset_0_0_45px_rgba(0,0,0,0.02)] scale-100"
              style={{
                transform: "rotateX(75deg)",
                boxShadow: `0 0 40px ${activeColor.theme.glowColor}10`,
              }}
            />

            {/* 3. Glowing Neon Circle Ring (Color Dynamic) */}
            <div 
              className="absolute inset-4 rounded-full border transition-all duration-1000 scale-[0.96]"
              style={{
                transform: "rotateX(75deg)",
                borderColor: `${accentColor}35`,
                boxShadow: `0 0 35px ${accentColor}25, inset 0 0 35px ${accentColor}15`,
              }}
            />

            {/* 4. Rotating Tech Dash Ring (Dotted Outer Grid + Angle Markings) */}
            <div 
              className="absolute inset-10 rounded-full border border-dashed border-zinc-400/25 scale-[0.92]"
              style={{
                transform: "rotateX(75deg)",
                animation: "spin 35s linear infinite",
              }}
            />

            {/* 5. Solid Luxury Turntable Floor - Polished White Concrete / Stainless Steel Dial */}
            <div 
              className="absolute inset-12 rounded-full border border-black/[0.06] scale-[0.88] overflow-hidden"
              style={{
                transform: "rotateX(75deg)",
                background: "radial-gradient(circle, #ffffff 0%, #eceef1 100%)",
                boxShadow: "0 20px 45px rgba(0,0,0,0.06), inset 0 -5px 15px rgba(255,255,255,0.8)",
              }}
            >
              {/* Radial reflection sheen */}
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.7),transparent_50%)]" />
              
              {/* Detailed turntable grid lines */}
              <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[size:1rem_1rem]" />

              {/* Technical crosshairs & layout markings */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
                <div className="w-full h-[1px] bg-zinc-600" />
                <div className="h-full w-[1px] bg-zinc-600 absolute" />
                <div className="absolute w-[90%] h-[90%] rounded-full border border-zinc-400" />
                <div className="absolute w-[60%] h-[60%] rounded-full border border-dashed border-zinc-400" />
              </div>

              {/* Laser Engraved Specs on Turntable Floor */}
              <div className="absolute inset-0 flex items-center justify-center select-none pointer-events-none opacity-[0.15]">
                <div className="absolute top-[15%] text-[7px] font-mono font-bold tracking-widest text-zinc-900 uppercase">
                  TOGG INTELLIGENT DEVICE PLATFORM
                </div>
                <div className="absolute bottom-[15%] text-[7px] font-mono font-bold tracking-widest text-zinc-900 uppercase">
                  WHEELBASE 2890MM // TRACK 1620MM
                </div>
              </div>
            </div>

            {/* 6. Compass Degree Notches around the turntable */}
            <div 
              className="absolute inset-2 pointer-events-none select-none text-[8px] font-mono font-bold text-zinc-400/80 transition-all duration-1000"
              style={{ transform: "rotateX(75deg)" }}
            >
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-4">000° N</div>
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-4">180° S</div>
              <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4">270° W</div>
              <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4">090° E</div>
            </div>

            {/* 7. Spotlight platform center glow point */}
            <div 
              className="absolute w-48 h-12 rounded-full blur-[8px] opacity-80 pointer-events-none transition-all duration-1000 scale-[0.7]"
              style={{
                transform: "rotateX(75deg)",
                background: `radial-gradient(circle, ${accentColor}60 0%, transparent 70%)`,
              }}
            />

          </div>

          {/* Vehicle Display Wrapper */}
          <div className={`relative transition-all duration-1000 ease-out w-full flex flex-col items-center justify-center z-10 ${
            isAnimating ? "scale-[0.94] opacity-60 translate-y-3" : "scale-100 opacity-100 translate-y-0"
          }`}>
            
            {/* If the vehicle image fails to load, render an amazing SVG technical blueprint that glows */}
            {imageError ? (
              <div className="w-full max-w-[760px] aspect-[16/10] relative flex flex-col items-center justify-center p-8 border border-black/[0.04] rounded-3xl bg-white/70 backdrop-blur-3xl overflow-hidden group shadow-lg">
                <div 
                  className="absolute inset-0 opacity-[0.03] transition-colors duration-1000"
                  style={{ backgroundColor: accentColor }}
                />
                
                {/* Custom Dynamic Vector Blueprint */}
                <svg
                  className="w-full h-full text-zinc-900/15 transition-all duration-1000"
                  viewBox="0 0 600 350"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g style={{ stroke: accentColor, strokeWidth: "1.5" }}>
                    {/* Silhouette outline */}
                    <path
                      d={
                        model.id === "t10x"
                          ? "M50 250 C100 250 120 220 160 210 C200 200 240 130 320 130 C400 130 430 145 470 160 C510 175 530 205 550 230 C560 245 560 260 540 260 C510 260 500 260 480 260 C465 230 425 230 410 260 C380 260 220 260 190 260 C175 230 135 230 120 260 L50 260 Z"
                          : "M50 255 C100 255 130 235 160 220 C200 200 260 150 340 150 C420 150 460 170 490 190 C520 210 540 230 555 245 C565 255 555 260 535 260 L480 260 C465 230 425 230 410 260 C380 260 220 260 190 260 C175 230 135 230 120 260 L50 260 Z"
                      }
                      className="opacity-75 stroke-dasharray-[1200] stroke-dashoffset-[1200]"
                      style={{ strokeDasharray: 1000, strokeDashoffset: 0 }}
                    />
                    {/* Front Wheel */}
                    <circle cx="147.5" cy="255" r="28" className="opacity-60" />
                    <circle cx="147.5" cy="255" r="20" className="opacity-40" strokeDasharray="4 2" />
                    <circle cx="147.5" cy="255" r="5" />
                    {/* Rear Wheel */}
                    <circle cx="437.5" cy="255" r="28" className="opacity-60" />
                    <circle cx="437.5" cy="255" r="20" className="opacity-40" strokeDasharray="4 2" />
                    <circle cx="437.5" cy="255" r="5" />
                    {/* Futuristic accents */}
                    <line x1="200" y1="180" x2="380" y2="180" className="opacity-30" />
                    <line x1="240" y1="210" x2="360" y2="210" className="opacity-30" />
                    <line x1="320" y1="130" x2="320" y2="260" className="opacity-25" strokeDasharray="6 6" />
                  </g>
                </svg>

                <div className="absolute bottom-4 text-center">
                  <span className="text-[10px] font-mono tracking-widest text-zinc-400 uppercase block mb-1">
                    GÖRSEL ŞABLON MODU
                  </span>
                  <span 
                    className="text-xs font-bold tracking-widest uppercase"
                    style={{ color: accentColor }}
                  >
                    3D SHOWROOM PLATFORMU AKTİF
                  </span>
                </div>
              </div>
            ) : (
              // Main Vehicle Image Showcase
              // Placed with a custom perspective translate so it looks sitting on top of the stage!
              <div className="relative flex justify-center items-center select-none w-full max-w-[850px] filter drop-shadow-[0_30px_35px_rgba(0,0,0,0.14)] group">
                <img
                  src={currentImageUrl}
                  alt={`${model.name} - ${activeColor.name}`}
                  className="w-full h-auto object-contain z-10 transition-transform duration-500 transform group-hover:scale-[1.02] group-hover:-translate-y-2 cursor-grab active:cursor-grabbing"
                  onError={() => setImageError(true)}
                  draggable="false"
                  style={{
                    transform: "translateY(-20px)", // Sit precisely on platform center
                  }}
                />
                
                {/* Dynamic light reflection glow under the car tyres */}
                <div 
                  className="absolute bottom-4 left-1/2 -translate-x-1/2 w-[75%] h-[12px] rounded-full blur-sm opacity-40 mix-blend-multiply pointer-events-none transition-all duration-1000 z-0"
                  style={{
                    background: `radial-gradient(ellipse, ${accentColor} 0%, transparent 70%)`
                  }}
                />
              </div>
            )}
          </div>
        </div>

        {/* HUD Bottom Controls */}
        <div className="flex flex-col items-center justify-center gap-4 w-full px-2 pb-2">
          
          {/* Sleek Interactive Camera Selector (Joystick HUD view) */}
          {activeColor.angles && !imageError && (
            <div className="flex flex-col items-center gap-2">
              <span className="text-[9px] font-mono tracking-[0.4em] text-zinc-500 uppercase">
                SHOWROOM CAMERA (ROTATION ACTIVE)
              </span>
              
              <div className="flex items-center gap-1.5 p-1 bg-black/[0.02] border border-black/[0.05] rounded-full backdrop-blur-3xl relative z-20">
                {Object.keys(activeColor.angles).map((angleKey) => {
                  const isActive = angleKey === activeAngle;
                  return (
                    <button
                      key={angleKey}
                      onClick={() => handleAngleChange(angleKey)}
                      className={`relative px-4 py-1.5 rounded-full text-[9px] font-extrabold tracking-widest uppercase transition-all duration-500 ${
                        isActive
                          ? "text-white bg-black shadow-md"
                          : "text-zinc-500 hover:text-black hover:bg-black/[0.02]"
                      }`}
                    >
                      {ANGLE_NAMES[angleKey] || angleKey}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Model Description overlay HUD */}
          <div className="max-w-lg text-center mt-2">
            <p className="text-[11px] font-light text-zinc-500 tracking-wide leading-relaxed">
              {model.description}
            </p>
          </div>
        </div>

      </div>

      {/* Floating Vertical Color Configurator */}
      <ColorConfigurator
        colors={colors}
        activeColor={activeColor}
        onColorChange={onColorChange}
        accentColor={accentColor}
      />

      {/* Styled vector keyframe styles */}
      <style jsx global>{`
        @keyframes spin {
          from {
            transform: rotateX(75deg) rotate(0deg);
          }
          to {
            transform: rotateX(75deg) rotate(360deg);
          }
        }
      `}</style>
    </section>
  );
}
