import { generateSitemap } from '../lib/sitemap-utils';
import type { APIRoute } from 'astro';
import type { SitemapEntry } from '../lib/sitemap-utils';
import muhurats from '../data/muhurats.json';

export const GET: APIRoute = () => {
  const today = new Date().toISOString().split('T')[0];

  const entries: SitemapEntry[] = muhurats.map((muhurat) => ({
    url: `/muhurat/${muhurat.slug}`,
    lastmod: today,
    changefreq: 'weekly' as const,
    priority: 0.7,
  }));

  return new Response(generateSitemap(entries), {
    headers: { 'Content-Type': 'application/xml' },
  });
};
