/**
 * Sitemap utilities for generating per-category XML sitemaps.
 *
 * Used by src/pages/sitemap-*.xml.ts endpoints.
 */

const SITE_URL = 'https://shreeng.com';

interface SitemapEntry {
  url: string;
  lastmod?: string;
  changefreq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority?: number;
}

/**
 * Generate XML sitemap from entries.
 */
export function generateSitemap(entries: SitemapEntry[]): string {
  const urls = entries
    .map(
      (e) =>
        `  <url>
    <loc>${SITE_URL}${e.url}</loc>${e.lastmod ? `\n    <lastmod>${e.lastmod}</lastmod>` : ''}${e.changefreq ? `\n    <changefreq>${e.changefreq}</changefreq>` : ''}${e.priority !== undefined ? `\n    <priority>${e.priority}</priority>` : ''}
  </url>`
    )
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;
}

/**
 * Generate sitemap index XML.
 */
export function generateSitemapIndex(sitemaps: string[]): string {
  const today = new Date().toISOString().split('T')[0];
  const entries = sitemaps
    .map(
      (name) =>
        `  <sitemap>
    <loc>${SITE_URL}/${name}</loc>
    <lastmod>${today}</lastmod>
  </sitemap>`
    )
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries}
</sitemapindex>`;
}

export { SITE_URL };
export type { SitemapEntry };
