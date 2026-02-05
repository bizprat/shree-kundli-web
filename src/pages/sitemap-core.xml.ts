import { generateSitemap } from '../lib/sitemap-utils';
import type { APIRoute } from 'astro';
import type { SitemapEntry } from '../lib/sitemap-utils';

export const GET: APIRoute = () => {
  const today = new Date().toISOString().split('T')[0];

  const entries: SitemapEntry[] = [
    // Homepage
    { url: '/', lastmod: today, changefreq: 'daily', priority: 1.0 },

    // Hub pages
    { url: '/panchang', lastmod: today, changefreq: 'daily', priority: 0.9 },
    { url: '/rashifal', lastmod: today, changefreq: 'daily', priority: 0.9 },
    { url: '/festivals', lastmod: today, changefreq: 'daily', priority: 0.9 },
    { url: '/rahu-kaal', lastmod: today, changefreq: 'daily', priority: 0.9 },
    { url: '/choghadiya', lastmod: today, changefreq: 'daily', priority: 0.9 },
    { url: '/muhurat', lastmod: today, changefreq: 'daily', priority: 0.9 },
    { url: '/kundli', lastmod: today, changefreq: 'daily', priority: 0.9 },
    { url: '/kundli-milan', lastmod: today, changefreq: 'daily', priority: 0.9 },

    // Reference index pages
    { url: '/tithi', lastmod: today, changefreq: 'weekly', priority: 0.7 },
    { url: '/nakshatra', lastmod: today, changefreq: 'weekly', priority: 0.7 },
    { url: '/yoga', lastmod: today, changefreq: 'weekly', priority: 0.7 },
    { url: '/karana', lastmod: today, changefreq: 'weekly', priority: 0.7 },
    { url: '/vara', lastmod: today, changefreq: 'weekly', priority: 0.7 },
  ];

  return new Response(generateSitemap(entries), {
    headers: { 'Content-Type': 'application/xml' },
  });
};
