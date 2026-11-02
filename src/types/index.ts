/**
 * Type definitions for Remontada — ASTRA HEALTH
 */

export type Language = 'en' | 'ar';

export type SpaceTheme = 'deep-cyan' | 'night-vision' | 'bio-emerald' | 'amber-hud';

export interface AstronautProfile {
  id: string;
  name: string;
  nameAr: string;
  rank: string;
  rankAr: string;
  role: string;
  roleAr: string;
  avatarUrl: string;
  avatarType: 'commander' | 'doctor' | 'specialist' | 'pilot';
  allergies: string[];
  restingHeartRate: number;
  bloodPressureBaseline: string;
  missionDurationDays: number;
  radiationCumulativeMsv: number;
  email: string;
}

export interface HealthMetric {
  id: string;
  key: string;
  nameEn: string;
  nameAr: string;
  value: string | number;
  unit: string;
  status: 'optimal' | 'warning' | 'critical' | 'nominal';
  category: 'cardiovascular' | 'environmental' | 'musculoskeletal' | 'neuropsych' | 'metabolic';
  descriptionEn: string;
  descriptionAr: string;
  detailProtocolEn: string;
  detailProtocolAr: string;
  trend: 'stable' | 'rising' | 'falling';
}

export type NatureCategory = 'river' | 'sea' | 'beach' | 'forest' | 'animal' | 'space';

export interface NatureScene {
  id: string;
  category: NatureCategory;
  titleEn: string;
  titleAr: string;
  locationEn: string;
  locationAr: string;
  descriptionEn: string;
  descriptionAr: string;
  imageUrl: string;
  audioSoundscape: 'river' | 'ocean' | 'beach' | 'forest' | 'wildlife' | 'cosmic';
  frequencyHz: number;
  stressReductionDelta: string;
}

export interface NasaProjectItem {
  id: string;
  name: string;
  era: 'early' | 'shuttle' | 'deepspace';
  years: string;
  keyMission: string;
  breakthroughEn: string;
  breakthroughAr: string;
  flightSurgeonNoteEn: string;
  flightSurgeonNoteAr: string;
  hardwareEn: string;
  hardwareAr: string;
  astraEvolutionEn: string;
  astraEvolutionAr: string;
  isCustom?: boolean;
}

export interface CommsMessage {
  id: string;
  sender: 'ai-doctor' | 'astronaut';
  textEn: string;
  textAr: string;
  timestamp: string;
  vitalAlert?: boolean;
}
