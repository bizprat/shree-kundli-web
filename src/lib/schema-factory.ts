/**
 * Schema Factory
 *
 * Generates JSON-LD structured data for SEO.
 * All schemas follow schema.org specifications.
 */

import type { City } from './types';

const SITE_NAME = 'Shreeng';
const SITE_URL = 'https://shreeng.com';

// ============================================================================
// Website Schema (Homepage)
// ============================================================================

export interface WebsiteSchemaOptions {
  name?: string;
  url?: string;
  description?: string;
  searchUrl?: string;
}

export function createWebsiteSchema(options: WebsiteSchemaOptions = {}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: options.name || SITE_NAME,
    alternateName: ['श्रीएंग', 'Shreeng Astrology'],
    url: options.url || SITE_URL,
    description: options.description || 'Comprehensive Vedic Astrology platform for Panchang, Kundli, Rashifal, Muhurat and Hindu Festival information.',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${options.searchUrl || SITE_URL}/search?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
    inLanguage: ['en-IN', 'hi-IN'],
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_URL,
    },
  };
}

// ============================================================================
// Breadcrumb Schema
// ============================================================================

export interface BreadcrumbItem {
  name: string;
  url?: string;
}

export function createBreadcrumbSchema(items: BreadcrumbItem[], baseUrl: string = SITE_URL) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url ? `${baseUrl}${item.url}` : undefined,
    })),
  };
}

// ============================================================================
// FAQ Schema
// ============================================================================

export interface FAQItem {
  question: string;
  answer: string;
}

export function createFAQSchema(faqs: FAQItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

// ============================================================================
// Dataset Schema (Panchang Data)
// ============================================================================

export interface PanchangDatasetOptions {
  city: City;
  date: string; // ISO date
  dateFormatted: string;
  dateHindi: string;
  panchang: {
    tithi: string;
    nakshatra: string;
    yoga: string;
    karana: string;
    sunrise: string;
    sunset: string;
    rahuKaal: string;
  };
  url: string;
}

export function createPanchangDatasetSchema(options: PanchangDatasetOptions) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Dataset',
    name: `Panchang for ${options.city.name} - ${options.dateFormatted}`,
    alternateName: `${options.city.nameHindi} पंचांग - ${options.dateHindi}`,
    description: `Vedic panchang data including tithi, nakshatra, yoga, karana, sunrise, sunset, and muhurat timings for ${options.city.name}.`,
    url: options.url,
    datePublished: options.date,
    dateModified: options.date,
    temporalCoverage: options.date,
    spatialCoverage: {
      '@type': 'Place',
      name: `${options.city.name}, ${options.city.state}, India`,
      geo: {
        '@type': 'GeoCoordinates',
        latitude: options.city.latitude,
        longitude: options.city.longitude,
      },
    },
    variableMeasured: [
      { '@type': 'PropertyValue', name: 'Tithi', value: options.panchang.tithi },
      { '@type': 'PropertyValue', name: 'Nakshatra', value: options.panchang.nakshatra },
      { '@type': 'PropertyValue', name: 'Yoga', value: options.panchang.yoga },
      { '@type': 'PropertyValue', name: 'Karana', value: options.panchang.karana },
      { '@type': 'PropertyValue', name: 'Sunrise', value: options.panchang.sunrise },
      { '@type': 'PropertyValue', name: 'Sunset', value: options.panchang.sunset },
      { '@type': 'PropertyValue', name: 'Rahu Kaal', value: options.panchang.rahuKaal },
    ],
    creator: {
      '@type': 'Organization',
      name: SITE_NAME,
    },
    license: 'https://creativecommons.org/licenses/by/4.0/',
  };
}

// ============================================================================
// Event Schema (Festivals)
// ============================================================================

export interface FestivalEventOptions {
  name: string;
  nameHindi: string;
  description: string;
  date: string; // ISO date
  url: string;
  image?: string;
}

export function createFestivalEventSchema(options: FestivalEventOptions) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: `${options.name} (${options.nameHindi})`,
    description: options.description,
    startDate: options.date,
    endDate: options.date,
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    eventStatus: 'https://schema.org/EventScheduled',
    location: {
      '@type': 'Place',
      name: 'India',
      address: {
        '@type': 'PostalAddress',
        addressCountry: 'IN',
      },
    },
    organizer: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_URL,
    },
    url: options.url,
    image: options.image,
  };
}

// ============================================================================
// Article Schema (Reference Pages - Tithi, Nakshatra, etc.)
// ============================================================================

export interface ArticleSchemaOptions {
  title: string;
  titleHindi?: string;
  description: string;
  url: string;
  datePublished: string;
  dateModified?: string;
  image?: string;
  author?: string;
}

export function createArticleSchema(options: ArticleSchemaOptions) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: options.titleHindi
      ? `${options.title} (${options.titleHindi})`
      : options.title,
    description: options.description,
    url: options.url,
    datePublished: options.datePublished,
    dateModified: options.dateModified || options.datePublished,
    image: options.image,
    author: {
      '@type': 'Organization',
      name: options.author || SITE_NAME,
      url: SITE_URL,
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_URL,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/logo.png`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': options.url,
    },
  };
}

// ============================================================================
// Software Application Schema (Kundli Tool)
// ============================================================================

export interface SoftwareAppOptions {
  name: string;
  description: string;
  url: string;
  category?: string;
}

export function createSoftwareAppSchema(options: SoftwareAppOptions) {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: options.name,
    description: options.description,
    url: options.url,
    applicationCategory: options.category || 'LifestyleApplication',
    operatingSystem: 'Web Browser',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'INR',
    },
    provider: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_URL,
    },
  };
}

// ============================================================================
// Local Business Schema (Optional - for contact page)
// ============================================================================

export function createOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_NAME,
    alternateName: 'श्रीएंग',
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
    sameAs: [
      // Add social media URLs when available
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      availableLanguage: ['English', 'Hindi'],
    },
  };
}

// ============================================================================
// Helper: Combine Multiple Schemas
// ============================================================================

export function combineSchemas(...schemas: object[]): string {
  if (schemas.length === 1) {
    return JSON.stringify(schemas[0]);
  }
  return JSON.stringify(schemas);
}
