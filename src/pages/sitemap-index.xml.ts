import { generateSitemapIndex } from '../lib/sitemap-utils';
import type { APIRoute } from 'astro';

const sitemaps = [
  'sitemap-core.xml',
  'sitemap-panchang.xml',
  'sitemap-rahu-kaal.xml',
  'sitemap-choghadiya.xml',
  'sitemap-rashifal.xml',
  'sitemap-reference.xml',
  'sitemap-festivals.xml',
  'sitemap-muhurat.xml',
];

export const GET: APIRoute = () => {
  return new Response(generateSitemapIndex(sitemaps), {
    headers: { 'Content-Type': 'application/xml' },
  });
};
