/**
 * City Utilities
 *
 * Helper functions for working with city data.
 * Used for city lookups, formatting, and URL generation.
 */

import citiesData from '../data/cities-sample.json';
import type { City } from './types';

const cities = citiesData as City[];

/**
 * Get a city by its URL slug
 */
export function getCityBySlug(slug: string): City | undefined {
  return cities.find((c) => c.slug === slug);
}

/**
 * Get a city by its ID
 */
export function getCityById(id: number): City | undefined {
  return cities.find((c) => c.id === id);
}

/**
 * Get a city by its name (case-insensitive)
 */
export function getCityByName(name: string): City | undefined {
  const lowercaseName = name.toLowerCase();
  return cities.find(
    (c) => c.name.toLowerCase() === lowercaseName ||
           c.nameHindi === name
  );
}

/**
 * Get all cities
 */
export function getAllCities(): City[] {
  return cities;
}

/**
 * Get popular cities by tier
 * Tier 1: Metro cities (Delhi, Mumbai, etc.)
 * Tier 2: Major cities
 * Tier 3: Regional cities
 */
export function getPopularCities(tier: number = 1): City[] {
  return cities.filter((c) => c.tier <= tier);
}

/**
 * Get cities by tier exactly
 */
export function getCitiesByTier(tier: number): City[] {
  return cities.filter((c) => c.tier === tier);
}

/**
 * Get cities sorted by population (descending)
 */
export function getCitiesByPopulation(limit?: number): City[] {
  const sorted = [...cities].sort((a, b) => b.population - a.population);
  return limit ? sorted.slice(0, limit) : sorted;
}

/**
 * Get cities by state
 */
export function getCitiesByState(state: string): City[] {
  const lowercaseState = state.toLowerCase();
  return cities.filter((c) => c.state.toLowerCase() === lowercaseState);
}

/**
 * Format city display name (City, State)
 */
export function formatCityDisplay(city: City): string {
  return `${city.name}, ${city.state}`;
}

/**
 * Format city display name in Hindi
 */
export function formatCityDisplayHindi(city: City): string {
  return `${city.nameHindi}, ${city.stateHindi}`;
}

/**
 * Format city for bilingual display (Hindi + English)
 */
export function formatCityBilingual(city: City): string {
  return `${city.nameHindi} (${city.name})`;
}

/**
 * Generate URL for a city page
 */
export function getCityUrl(pageType: string, city: City): string {
  return `/${pageType}/${city.slug}`;
}

/**
 * Generate URL for a city page with language prefix
 */
export function getCityUrlWithLang(
  pageType: string,
  city: City,
  lang: 'en' | 'hi' = 'en'
): string {
  if (lang === 'en') {
    return `/${pageType}/${city.slug}`;
  }
  return `/${lang}/${pageType}/${city.slug}`;
}

/**
 * Get nearby cities (within a certain distance)
 * Uses Haversine formula for distance calculation
 */
export function getNearbyCities(
  city: City,
  maxDistance: number = 100, // km
  limit: number = 5
): City[] {
  const R = 6371; // Earth's radius in km

  const toRad = (deg: number) => (deg * Math.PI) / 180;

  const haversine = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  const citiesWithDistance = cities
    .filter((c) => c.id !== city.id)
    .map((c) => ({
      city: c,
      distance: haversine(city.latitude, city.longitude, c.latitude, c.longitude),
    }))
    .filter((c) => c.distance <= maxDistance)
    .sort((a, b) => a.distance - b.distance);

  return citiesWithDistance.slice(0, limit).map((c) => c.city);
}

/**
 * Search cities by name (supports partial matching)
 */
export function searchCities(
  query: string,
  limit: number = 10
): City[] {
  if (!query || query.length < 2) return [];

  const lowerQuery = query.toLowerCase();

  // Score cities based on match quality
  const scored = cities.map((city) => {
    let score = 0;

    // Exact match
    if (city.name.toLowerCase() === lowerQuery) score += 100;
    if (city.nameHindi === query) score += 100;

    // Starts with
    if (city.name.toLowerCase().startsWith(lowerQuery)) score += 50;
    if (city.nameHindi.startsWith(query)) score += 50;

    // Contains
    if (city.name.toLowerCase().includes(lowerQuery)) score += 25;
    if (city.nameHindi.includes(query)) score += 25;

    // Boost by tier (higher tier = more popular)
    if (city.tier === 1) score += 10;
    if (city.tier === 2) score += 5;

    return { city, score };
  });

  return scored
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((s) => s.city);
}

/**
 * Get the default city (used when no city is selected)
 */
export function getDefaultCity(): City {
  return getCityBySlug('delhi') || cities[0];
}

/**
 * Check if a city slug is valid
 */
export function isValidCitySlug(slug: string): boolean {
  return cities.some((c) => c.slug === slug);
}

/**
 * Get city coordinates for API calls
 */
export function getCityCoordinates(city: City): { lat: number; lng: number; tz: string } {
  return {
    lat: city.latitude,
    lng: city.longitude,
    tz: city.timezone,
  };
}
