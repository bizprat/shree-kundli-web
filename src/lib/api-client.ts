/**
 * API Client for Shreeng Engine
 *
 * Handles all communication with the backend API.
 * NEVER call this from client-side JavaScript - only server-side (SSR/build time).
 *
 * Environment Variables:
 * - SHREENG_API_URL: Base URL for API (default: http://localhost:3333/v2)
 * - SHREENG_API_KEY: Optional API key for authenticated requests
 */

const API_BASE = import.meta.env.SHREENG_API_URL || 'http://localhost:3333/v2';
// Geocode endpoints live at root, not under /v2
const API_ROOT = API_BASE.replace(/\/v2\/?$/, '');
const API_KEY = import.meta.env.SHREENG_API_KEY;

// Types for API responses
export interface PanchangResponse {
  tithi: {
    name: string;
    nameHindi: string;
    paksha: string;
    pakshaHindi: string;
    number: number;
    endTime: string;
    endTimeIso: string;
  };
  nakshatra: {
    name: string;
    nameHindi: string;
    number: number;
    lord: string;
    lordHindi: string;
    endTime: string;
    endTimeIso: string;
  };
  yoga: {
    name: string;
    nameHindi: string;
    number: number;
    endTime: string;
    endTimeIso: string;
  };
  karana: {
    name: string;
    nameHindi: string;
    number: number;
    endTime: string;
    endTimeIso: string;
  };
  vara: {
    name: string;
    nameHindi: string;
    number: number;
    lord: string;
    lordHindi: string;
  };
  masa: {
    name: string;
    nameHindi: string;
    isAdhika: boolean;
  };
}

export interface AstronomicalResponse {
  sun: {
    sunrise: string;
    sunriseIso: string;
    sunset: string;
    sunsetIso: string;
    longitude: number;
  };
  moon: {
    moonrise: string;
    moonriseIso: string;
    moonset: string;
    moonsetIso: string;
    longitude: number;
    phase: number;
  };
}

export interface MuhurtaResponse {
  rahuKaal: {
    start: string;
    startIso: string;
    end: string;
    endIso: string;
    isActive: boolean;
  };
  yamaganda: {
    start: string;
    startIso: string;
    end: string;
    endIso: string;
    isActive: boolean;
  };
  gulikaKaal: {
    start: string;
    startIso: string;
    end: string;
    endIso: string;
    isActive: boolean;
  };
  abhijit?: {
    start: string;
    startIso: string;
    end: string;
    endIso: string;
    isActive: boolean;
  };
  brahma?: {
    start: string;
    startIso: string;
    end: string;
    endIso: string;
    isActive: boolean;
  };
}

export interface ChoghadiyaResponse {
  day: ChoghadiyaPeriod[];
  night: ChoghadiyaPeriod[];
}

export interface ChoghadiyaPeriod {
  name: string;
  nameHindi: string;
  type: 'shubh' | 'ashubh' | 'neutral';
  start: string;
  startIso: string;
  end: string;
  endIso: string;
  isActive: boolean;
}

export interface FestivalResponse {
  id: string;
  name: string;
  nameHindi: string;
  date: string;
  dateIso: string;
  type: 'major' | 'regional' | 'vrat' | 'ekadashi';
  description?: string;
  descriptionHindi?: string;
}

export interface GeoSearchResult {
  id: number;
  name: string;
  nameHindi?: string;
  state: string;
  stateHindi?: string;
  country: string;
  latitude: number;
  longitude: number;
  timezone: string;
  population?: number;
}

/** Raw geocode result from Shreeng Engine */
export interface GeoRawResult {
  locationId: number;
  name: string;
  state: string;
  country: string;
  latitude: number;
  longitude: number;
  timezone: string;
  elevation?: number;
  matchedName?: string;
  similarity?: number;
  distanceMeters?: number;
}

/** Wrapped API response from Shreeng Engine */
export interface ApiWrappedResponse<T> {
  success: boolean;
  data: T;
  meta: {
    timestamp: string;
    responseTimeMs: number;
    cache?: {
      ttl: number;
      profile: string;
      key: string;
    };
  };
}

export interface ApiError {
  message: string;
  code?: string;
  status: number;
}

interface ApiOptions {
  timeout?: number;
  cache?: boolean;
}

/**
 * Make a GET request to the API
 */
async function apiGet<T>(
  path: string,
  params: Record<string, string | number | boolean> = {},
  options: ApiOptions & { root?: boolean } = {}
): Promise<T> {
  const base = options.root ? API_ROOT : API_BASE;
  const url = new URL(`${base}${path}`);

  // Add query parameters
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      url.searchParams.append(key, String(value));
    }
  });

  // Set up abort controller for timeout
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), options.timeout || 10000);

  try {
    const headers: Record<string, string> = {
      'Accept': 'application/json',
    };

    if (API_KEY) {
      headers['Authorization'] = `Bearer ${API_KEY}`;
    }

    const response = await fetch(url.toString(), {
      signal: controller.signal,
      headers,
    });

    if (!response.ok) {
      const error: ApiError = {
        message: `API error: ${response.statusText}`,
        status: response.status,
      };

      try {
        const errorBody = await response.json();
        error.message = errorBody.message || error.message;
        error.code = errorBody.code;
      } catch {
        // Ignore JSON parse error
      }

      throw error;
    }

    return response.json();
  } catch (err) {
    if (err instanceof Error && err.name === 'AbortError') {
      throw { message: 'Request timeout', status: 408 } as ApiError;
    }
    throw err;
  } finally {
    clearTimeout(timeoutId);
  }
}

// ============================================================================
// API Endpoint Functions
// ============================================================================

/**
 * Get panchang data for a location and datetime
 */
export async function getPanchang(
  locationId: number,
  datetime: string
): Promise<PanchangResponse> {
  return apiGet('/panchang', { locationId, datetime });
}

/**
 * Get muhurta (auspicious/inauspicious times) for a location
 */
export async function getMuhurta(
  locationId: number,
  datetime: string
): Promise<MuhurtaResponse> {
  return apiGet('/panchang/muhurta', { locationId, datetime });
}

/**
 * Get choghadiya periods for a location
 */
export async function getChoghadiya(
  locationId: number,
  datetime: string
): Promise<ChoghadiyaResponse> {
  return apiGet('/panchang/choghadiya', { locationId, datetime });
}

/**
 * Get astronomical data (sun/moon times, positions)
 */
export async function getAstronomical(
  locationId: number,
  datetime: string
): Promise<AstronomicalResponse> {
  return apiGet('/astronomical', { locationId, datetime });
}

/**
 * Get sun times only
 */
export async function getSunTimes(
  locationId: number,
  datetime: string
): Promise<AstronomicalResponse['sun']> {
  return apiGet('/astronomical/sun', { locationId, datetime });
}

/**
 * Get moon times only
 */
export async function getMoonTimes(
  locationId: number,
  datetime: string
): Promise<AstronomicalResponse['moon']> {
  return apiGet('/astronomical/moon', { locationId, datetime });
}

/**
 * Get festivals for a year
 */
export async function getFestivals(
  year: number,
  locationId?: number
): Promise<FestivalResponse[]> {
  const params: Record<string, string | number> = {};
  if (locationId) params.locationId = locationId;
  return apiGet(`/festivals/${year}`, params);
}

/**
 * Get upcoming festivals
 */
export async function getUpcomingFestivals(
  limit: number = 10,
  locationId?: number
): Promise<FestivalResponse[]> {
  const params: Record<string, string | number> = { limit };
  if (locationId) params.locationId = locationId;
  return apiGet('/festivals/upcoming', params);
}

/**
 * Search for cities
 * API returns { success, data: [...], meta } — unwrap and map fields
 */
export async function searchCities(
  query: string,
  options: { country?: string; priorityCountry?: string; limit?: number } = {}
): Promise<GeoSearchResult[]> {
  const { country, priorityCountry, limit = 8 } = options;
  const params: Record<string, string | number> = { city: query, limit };
  if (country) params.country = country;
  if (priorityCountry) params.priorityCountry = priorityCountry;
  console.log('[searchCities] params:', JSON.stringify(params));
  const raw = await apiGet<ApiWrappedResponse<GeoRawResult[]>>(
    '/geocode/search', params, { root: true }
  );
  console.log('[searchCities] raw response keys:', Object.keys(raw), 'data length:', raw.data?.length);

  return (raw.data || []).map((r) => ({
    id: r.locationId,
    name: r.name,
    state: r.state,
    country: r.country,
    latitude: r.latitude,
    longitude: r.longitude,
    timezone: r.timezone,
  }));
}

/**
 * Reverse geocode (lat/lng to city)
 * API returns { success, data: [...], meta } — unwrap and map fields
 */
export async function reverseGeocode(
  lat: number,
  lng: number
): Promise<GeoSearchResult | null> {
  const raw = await apiGet<ApiWrappedResponse<GeoRawResult[]>>(
    '/geocode/reverse', { lat, lng, limit: 1 }, { root: true }
  );
  const r = raw.data?.[0];
  if (!r) return null;
  return {
    id: r.locationId,
    name: r.name,
    state: r.state,
    country: r.country,
    latitude: r.latitude,
    longitude: r.longitude,
    timezone: r.timezone,
  };
}

/** Generate a URL slug from a city name */
function toSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '');
}

/**
 * Resolve a city from a URL slug by querying the backend geocode API.
 * Converts slug back to a city name and searches the API.
 * Returns null if no matching city found.
 */
export async function resolveCityFromSlug(
  slug: string,
  priorityCountry?: string
): Promise<GeoSearchResult | null> {
  if (!slug) return null;

  // Convert slug to search query: "new-delhi" → "new delhi"
  const query = slug.replace(/-/g, ' ');

  try {
    const results = await searchCities(query, { priorityCountry, limit: 5 });
    if (!results.length) return null;

    // Prefer exact slug match
    const exact = results.find((r) => toSlug(r.name) === slug);
    return exact || results[0];
  } catch {
    return null;
  }
}

/**
 * Get a complete daily data package for a city (panchang + astronomical + muhurta)
 */
export async function getDailyData(
  locationId: number,
  datetime: string
): Promise<{
  panchang: PanchangResponse;
  astronomical: AstronomicalResponse;
  muhurta: MuhurtaResponse;
}> {
  // Fetch all data in parallel
  const [panchang, astronomical, muhurta] = await Promise.all([
    getPanchang(locationId, datetime),
    getAstronomical(locationId, datetime),
    getMuhurta(locationId, datetime),
  ]);

  return { panchang, astronomical, muhurta };
}
