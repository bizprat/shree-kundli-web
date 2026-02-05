/**
 * Type definitions for static JSON data files in src/data/.
 *
 * These represent the shape of data as stored in JSON files.
 * For API response types, see src/lib/types.ts.
 */

// =============================================================================
// RASHI (ZODIAC) JSON DATA
// =============================================================================

export interface RashiData {
  id: number;
  name: string;
  nameHindi: string;
  slug: string;
  symbol: string;
  element: string;
  quality: string;
  rulingPlanet: string;
  rulingPlanetHindi: string;
  luckyNumbers: number[];
  luckyColors: string[];
  luckyDay: string;
  bodyPart: string;
  traits: string[];
  dateRange: string;
}

// =============================================================================
// TITHI JSON DATA
// =============================================================================

export interface TithiData {
  id: number;
  name: string;
  nameHindi: string;
  slug: string;
  meaning: string;
  meaningHindi: string;
  number: number;
  paksha?: string;
  deity: string;
  deityHindi: string;
  nature: string;
  natureHindi: string;
  element: string;
  auspicious: boolean;
  goodFor: string[];
  avoid: string[];
  festivals: string[];
  description: string;
}

// =============================================================================
// YOGA JSON DATA
// =============================================================================

export interface YogaData {
  id: number;
  name: string;
  nameHindi: string;
  slug: string;
  meaning: string;
  meaningHindi: string;
  nature: string;
  natureHindi: string;
  deity: string;
  deityHindi: string;
  goodFor: string[];
  notGoodFor: string[];
  description: string;
  category: string;
}

// =============================================================================
// KARANA JSON DATA
// =============================================================================

export interface KaranaData {
  id: number;
  name: string;
  nameHindi: string;
  slug: string;
  meaning: string;
  meaningHindi: string;
  type: string;
  typeHindi: string;
  nature: string;
  natureHindi: string;
  deity: string;
  deityHindi: string;
  element: string;
  goodFor: string[];
  notGoodFor: string[];
  description: string;
  occurrence: string;
  alternativeName?: string;
}

// =============================================================================
// VARA (WEEKDAY) JSON DATA
// =============================================================================

export interface VaraData {
  id: number;
  name: string;
  nameHindi: string;
  nameEnglish: string;
  slug: string;
  planet: string;
  planetHindi: string;
  planetSanskrit: string;
  deity: string;
  deityHindi: string;
  color: string;
  colorHindi: string;
  element: string;
  direction: string;
  metal: string;
  gemstone: string;
  nature: string;
  goodFor: string[];
  notGoodFor: string[];
  fasting: string;
  mantra: string;
  description: string;
}

// =============================================================================
// NAKSHATRA JSON DATA
// =============================================================================

export interface NakshatraData {
  id: number;
  name: string;
  nameHindi: string;
  slug: string;
  symbol: string;
  symbolHindi: string;
  deity: string;
  deityHindi: string;
  rulingPlanet: string;
  rulingPlanetHindi: string;
  nature: string;
  gana: string;
  animal: string;
  element: string;
  qualities: string[];
  degree: string;
}

// =============================================================================
// FESTIVAL JSON DATA
// =============================================================================

export interface FestivalPanchang {
  tithi?: string;
  paksha?: string;
  masa?: string;
  note?: string;
}

export interface FestivalData {
  id: string;
  name: string;
  nameHindi: string;
  slug: string;
  description: string;
  descriptionHindi: string;
  type: 'major' | 'regional' | 'observance';
  category: string;
  rituals: string[];
  panchang: FestivalPanchang;
  trafficPriority: number;
  regions: string[];
}
