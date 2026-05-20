export interface TechnicalSpecs {
  rangeWltp: number; // KM
  batteryCapacity: number; // kWh
  fastChargingTime: number; // minutes
  maxPowerKw: number; // kW
  maxPowerPs: number; // PS
  maxTorque: number; // Nm
  acceleration: number; // 0-100 km/h in seconds
  maxSpeed: number; // km/h
  energyConsumption: number; // kWh/100km
}

export interface TaxDetails {
  otvRate: number; // % (e.g. 10 or 40)
  otvAmount: number; // TRY ₺
  mtvAmount: number; // TRY ₺ (yearly)
  registrationFee: number; // TRY ₺
}

export interface VehicleColorTheme {
  id: string; // e.g. "anadolu"
  name: string; // e.g. "Anadolu"
  localName: string; // e.g. "Anadolu Kırmızısı"
  hex: string; // Hex code for dot
  // CSS gradients and classes
  bgGradient: string; // e.g. "from-[#110000] via-[#2a080c] to-[#000000]"
  glowColor: string; // e.g. "rgba(197, 17, 24, 0.45)"
  borderGlow: string; // e.g. "border-red-500/30"
  shadowGlow: string; // e.g. "shadow-red-500/20"
  textHighlight: string; // e.g. "text-red-500"
  accentHex: string; // hex color for glowing effects
}

export interface VehicleAngles {
  front?: string;
  frontLeft?: string;
  frontRight?: string;
  side?: string;
  rear?: string;
  rearLeft?: string;
  rearRight?: string;
}

export interface VehicleColor {
  id: string;
  name: string;
  localName: string;
  hex: string;
  imageUrl: string; // Path to image (e.g. /images/t10x/anadolu.png)
  angles?: VehicleAngles;
  theme: VehicleColorTheme;
}

export interface VehicleTrim {
  id: string;
  name: string;
  priceTry: number;
  deliveryDate: string;
  specs: TechnicalSpecs;
  taxDetails: TaxDetails;
  colors: VehicleColor[];
}

export interface VehicleModel {
  id: string; // "t10x" | "t10f"
  name: string; // "T10X" | "T10F"
  type: string; // "SUV" | "Sedan"
  tagline: string;
  description: string;
  year: string;
  trims: VehicleTrim[];
}
