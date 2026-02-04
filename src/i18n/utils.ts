/**
 * i18n Utilities
 *
 * Helper functions for internationalization.
 * Supports English (en) and Hindi (hi).
 */

import en from './en.json';
import hi from './hi.json';

export type Locale = 'en' | 'hi';
export type TranslationKey = string;

// Translation dictionaries
const translations: Record<Locale, typeof en> = {
  en,
  hi,
};

/**
 * Get a translation string by key path
 *
 * @example
 * t('en', 'nav.home') // "Home"
 * t('hi', 'nav.home') // "होम"
 * t('en', 'panchang.titleFor', { city: 'Delhi' }) // "Today's Panchang for Delhi"
 */
export function t(
  locale: Locale,
  key: TranslationKey,
  params?: Record<string, string | number>
): string {
  const dict = translations[locale] || translations.en;

  // Navigate the nested object using dot notation
  const keys = key.split('.');
  let value: any = dict;

  for (const k of keys) {
    if (value && typeof value === 'object' && k in value) {
      value = value[k];
    } else {
      // Key not found, return the key itself
      console.warn(`Translation key not found: ${key} for locale: ${locale}`);
      return key;
    }
  }

  // If the value is not a string, return the key
  if (typeof value !== 'string') {
    return key;
  }

  // Replace parameters like {city} with actual values
  if (params) {
    return value.replace(/\{(\w+)\}/g, (match, paramKey) => {
      return params[paramKey]?.toString() || match;
    });
  }

  return value;
}

/**
 * Create a translator function bound to a specific locale
 *
 * @example
 * const translate = useTranslations('hi');
 * translate('nav.home') // "होम"
 */
export function useTranslations(locale: Locale) {
  return (key: TranslationKey, params?: Record<string, string | number>) =>
    t(locale, key, params);
}

/**
 * Get locale from URL path
 *
 * @example
 * getLocaleFromPath('/panchang/delhi') // 'en'
 * getLocaleFromPath('/hi/panchang/delhi') // 'hi'
 */
export function getLocaleFromPath(path: string): Locale {
  const segments = path.split('/').filter(Boolean);

  if (segments[0] === 'hi') {
    return 'hi';
  }

  return 'en';
}

/**
 * Get URL path for a different locale
 *
 * @example
 * getPathForLocale('/panchang/delhi', 'hi') // '/hi/panchang/delhi'
 * getPathForLocale('/hi/panchang/delhi', 'en') // '/panchang/delhi'
 */
export function getPathForLocale(path: string, targetLocale: Locale): string {
  const currentLocale = getLocaleFromPath(path);

  if (currentLocale === targetLocale) {
    return path;
  }

  if (targetLocale === 'hi') {
    // Add /hi/ prefix
    return `/hi${path}`;
  } else {
    // Remove /hi/ prefix
    return path.replace(/^\/hi/, '') || '/';
  }
}

/**
 * Get all available locales
 */
export function getAvailableLocales(): Locale[] {
  return ['en', 'hi'];
}

/**
 * Get locale display name
 */
export function getLocaleDisplayName(locale: Locale): string {
  const names: Record<Locale, string> = {
    en: 'English',
    hi: 'हिंदी',
  };
  return names[locale];
}

/**
 * Get hreflang attributes for a page
 *
 * @example
 * getHreflangLinks('/panchang/delhi', 'https://shreeng.com')
 * // Returns array of { locale, url } for hreflang tags
 */
export function getHreflangLinks(
  path: string,
  baseUrl: string = 'https://shreeng.com'
): Array<{ locale: Locale; hreflang: string; url: string }> {
  const cleanPath = path.replace(/^\/hi/, '');

  return [
    {
      locale: 'en',
      hreflang: 'en-IN',
      url: `${baseUrl}${cleanPath}`,
    },
    {
      locale: 'hi',
      hreflang: 'hi-IN',
      url: `${baseUrl}/hi${cleanPath}`,
    },
    {
      locale: 'en',
      hreflang: 'x-default',
      url: `${baseUrl}${cleanPath}`,
    },
  ];
}

/**
 * Format number for locale (uses Indian numbering system)
 *
 * @example
 * formatNumber(1234567, 'en') // "12,34,567"
 * formatNumber(1234567, 'hi') // "१२,३४,५६७"
 */
export function formatNumber(num: number, locale: Locale): string {
  return num.toLocaleString(locale === 'hi' ? 'hi-IN' : 'en-IN');
}

/**
 * Check if text is in Devanagari script
 */
export function isDevanagari(text: string): boolean {
  // Devanagari Unicode range: \u0900-\u097F
  return /[\u0900-\u097F]/.test(text);
}

/**
 * Get font class for text based on script
 */
export function getFontClass(text: string): string {
  return isDevanagari(text) ? 'font-hindi' : '';
}
