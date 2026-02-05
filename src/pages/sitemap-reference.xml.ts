import { generateSitemap } from '../lib/sitemap-utils';
import type { APIRoute } from 'astro';
import type { SitemapEntry } from '../lib/sitemap-utils';
import tithis from '../data/tithis.json';
import nakshatras from '../data/nakshatras.json';
import yogas from '../data/yogas.json';
import karanas from '../data/karanas.json';
import varas from '../data/varas.json';

export const GET: APIRoute = () => {
  const today = new Date().toISOString().split('T')[0];

  const entries: SitemapEntry[] = [
    ...tithis.map((item) => ({
      url: `/tithi/${item.slug}`,
      lastmod: today,
      changefreq: 'weekly' as const,
      priority: 0.7,
    })),
    ...nakshatras.map((item) => ({
      url: `/nakshatra/${item.slug}`,
      lastmod: today,
      changefreq: 'weekly' as const,
      priority: 0.7,
    })),
    ...yogas.map((item) => ({
      url: `/yoga/${item.slug}`,
      lastmod: today,
      changefreq: 'weekly' as const,
      priority: 0.7,
    })),
    ...karanas.map((item) => ({
      url: `/karana/${item.slug}`,
      lastmod: today,
      changefreq: 'weekly' as const,
      priority: 0.7,
    })),
    ...varas.map((item) => ({
      url: `/vara/${item.slug}`,
      lastmod: today,
      changefreq: 'weekly' as const,
      priority: 0.7,
    })),
  ];

  return new Response(generateSitemap(entries), {
    headers: { 'Content-Type': 'application/xml' },
  });
};
