/**
 * Type Definitions for Shree Kundli Astro
 *
 * All interfaces for data structures used across the application.
 */

// =============================================================================
// LOCATION TYPES
// =============================================================================

export interface City {
  id: number;
  name: string;
  nameHindi: string;
  slug: string;
  state: string;
  stateHindi: string;
  country: string;
  latitude: number;
  longitude: number;
  timezone: string;
  population: number;
  tier: 1 | 2 | 3;
}

export interface GeoLocation {
  latitude: number;
  longitude: number;
  timezone: string;
}

// =============================================================================
// PANCHANG TYPES
// =============================================================================

export interface Tithi {
  number: number;
  name: string;
  nameHindi: string;
  paksha: 'shukla' | 'krishna';
  startTime: string; // ISO 8601
  endTime: string;   // ISO 8601
}

export interface Nakshatra {
  number: number;
  name: string;
  nameHindi: string;
  lord: string;
  lordHindi: string;
  startTime: string;
  endTime: string;
}

export interface Yoga {
  number: number;
  name: string;
  nameHindi: string;
  meaning?: string;
  startTime: string;
  endTime: string;
}

export interface Karana {
  number: number;
  name: string;
  nameHindi: string;
  startTime: string;
  endTime: string;
}

export interface Vara {
  number: number;
  name: string;
  nameHindi: string;
  lord: string;
  lordHindi: string;
}

export interface SunTiming {
  sunrise: string;
  sunset: string;
  sunriseIso: string;
  sunsetIso: string;
}

export interface MoonTiming {
  moonrise: string;
  moonset: string;
  moonriseIso: string;
  moonsetIso: string;
}

export interface Muhurta {
  name: string;
  nameHindi: string;
  start: string;
  end: string;
  startIso: string;
  endIso: string;
  isAuspicious: boolean;
}

export interface PanchangData {
  date: string;         // YYYY-MM-DD
  dateHindi: string;    // Hindi date format
  location: {
    city: string;
    cityHindi: string;
    state: string;
    country: string;
    coordinates: GeoLocation;
  };
  tithi: Tithi;
  nakshatra: Nakshatra;
  yoga: Yoga;
  karana: Karana;
  vara: Vara;
  sun: SunTiming;
  moon: MoonTiming;
  rahuKaal: Muhurta;
  yamaganda: Muhurta;
  gulikaKaal: Muhurta;
  abhijitMuhurta: Muhurta;
  choghadiya: Muhurta[];
  ayanamsa: {
    name: string;
    value: number;
  };
}

// =============================================================================
// RASHI (ZODIAC) TYPES
// =============================================================================

export interface Rashi {
  id: number;
  name: string;
  nameHindi: string;
  slug: string;
  symbol: string;
  element: 'fire' | 'earth' | 'air' | 'water';
  elementHindi: string;
  rulingPlanet: string;
  rulingPlanetHindi: string;
  luckyNumbers: number[];
  luckyColors: string[];
  luckyColorsHindi: string[];
  compatibleSigns: string[];
  dateRange: {
    start: string;  // e.g., "March 21"
    end: string;    // e.g., "April 19"
  };
}

export interface Rashifal {
  rashi: Rashi;
  date: string;
  period: 'daily' | 'weekly' | 'monthly' | 'yearly';
  overall: {
    rating: number;  // 1-5
    summary: string;
    summaryHindi: string;
  };
  love?: {
    rating: number;
    prediction: string;
    predictionHindi: string;
  };
  career?: {
    rating: number;
    prediction: string;
    predictionHindi: string;
  };
  health?: {
    rating: number;
    prediction: string;
    predictionHindi: string;
  };
  finance?: {
    rating: number;
    prediction: string;
    predictionHindi: string;
  };
  luckyTime?: string;
  luckyColor?: string;
  luckyNumber?: number;
}

// =============================================================================
// FESTIVAL TYPES
// =============================================================================

export interface Festival {
  id: string;
  name: string;
  nameHindi: string;
  slug: string;
  description: string;
  descriptionHindi: string;
  date2026: string;           // YYYY-MM-DD
  hinduMonth: string;
  hinduMonthHindi: string;
  tithi: string;
  tithiHindi: string;
  type: 'major' | 'regional' | 'observance';
  regions: string[];
  rituals: string[];
  ritualsHindi: string[];
  significance: string;
  significanceHindi: string;
  relatedFestivals?: string[];
}

// =============================================================================
// MUHURAT TYPES
// =============================================================================

export interface MuhuratType {
  id: string;
  name: string;
  nameHindi: string;
  slug: string;
  description: string;
  descriptionHindi: string;
  priority: number;           // 1-5
  considerations: string[];
  goodNakshatras: string[];
  avoidTithis: number[];
  idealMonths?: string[];
  idealDays?: string[];
}

export interface MuhuratWindow {
  date: string;
  startTime: string;
  endTime: string;
  startIso: string;
  endIso: string;
  tithi: string;
  nakshatra: string;
  quality: 'excellent' | 'good' | 'average';
  notes?: string[];
}

// =============================================================================
// KUNDLI (BIRTH CHART) TYPES
// =============================================================================

export interface Planet {
  id: string;
  name: string;
  nameHindi: string;
  symbol: string;
  longitude: number;
  latitude: number;
  rashi: number;        // 1-12
  rashiName: string;
  house: number;        // 1-12
  nakshatra: string;
  nakshatraPada: number;
  isRetrograde: boolean;
  isCombust?: boolean;
  isExalted?: boolean;
  isDebilitated?: boolean;
}

export interface House {
  number: number;
  sign: number;         // 1-12
  signName: string;
  signNameHindi: string;
  degree: number;
  planets: string[];    // Planet IDs
}

export interface KundliChart {
  type: 'D1' | 'D9' | 'D10' | string;  // Divisional chart type
  name: string;
  nameHindi: string;
  ascendant: {
    sign: number;
    signName: string;
    degree: number;
  };
  houses: House[];
  planets: Planet[];
}

export interface KundliData {
  birthDetails: {
    name?: string;
    dateTime: string;   // ISO 8601
    place: string;
    placeHindi?: string;
    coordinates: GeoLocation;
  };
  charts: {
    d1: KundliChart;    // Rasi chart
    d9?: KundliChart;   // Navamsa
    d10?: KundliChart;  // Dasamsa
  };
  ayanamsa: {
    name: string;
    value: number;
  };
}

// =============================================================================
// NAVIGATION & UI TYPES
// =============================================================================

export interface BreadcrumbItem {
  name: string;
  nameHindi?: string;
  url?: string;
}

export interface NavItem {
  name: string;
  nameHindi: string;
  url: string;
  icon?: string;
  children?: NavItem[];
}

// =============================================================================
// API RESPONSE TYPES
// =============================================================================

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
  };
  meta?: {
    cached: boolean;
    generatedAt: string;
  };
}

// =============================================================================
// SEO TYPES
// =============================================================================

export interface SchemaOrg {
  '@context': 'https://schema.org';
  '@type': string;
  [key: string]: unknown;
}

export interface PageMeta {
  title: string;
  description: string;
  image?: string;
  type?: 'website' | 'article';
  datePublished?: string;
  dateModified?: string;
  schema?: SchemaOrg | SchemaOrg[];
  breadcrumbs?: BreadcrumbItem[];
  faq?: Array<{ question: string; answer: string }>;
}
