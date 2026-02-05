import { generateSitemap } from '../lib/sitemap-utils';
import type { APIRoute } from 'astro';
import type { SitemapEntry } from '../lib/sitemap-utils';
import cities from '../data/cities-sample.json';

export const GET: APIRoute = () => {
  const today = new Date().toISOString().split('T')[0];

  const entries: SitemapEntry[] = cities.map((city) => ({
    url: `/rahu-kaal/${city.slug}`,
    lastmod: today,
    changefreq: 'daily' as const,
    priority: 0.8,
  }));

  return new Response(generateSitemap(entries), {
    headers: { 'Content-Type': 'application/xml' },
  });
};
