import { generateSitemap } from '../lib/sitemap-utils';
import type { APIRoute } from 'astro';
import type { SitemapEntry } from '../lib/sitemap-utils';
import festivals from '../data/festivals.json';

export const GET: APIRoute = () => {
  const today = new Date().toISOString().split('T')[0];

  const entries: SitemapEntry[] = festivals.map((festival) => ({
    url: `/festivals/${festival.slug}`,
    lastmod: today,
    changefreq: 'weekly' as const,
    priority: 0.75,
  }));

  return new Response(generateSitemap(entries), {
    headers: { 'Content-Type': 'application/xml' },
  });
};
