// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import cloudflare from '@astrojs/cloudflare';

// https://astro.build/config
export default defineConfig({
  site: 'https://shreeng.com',

  // Static mode with per-page SSR opt-in
  // Pages that need SSR should add: export const prerender = false;
  // In Astro 5, output: 'static' is the default and supports SSR opt-in
  output: 'static',

  // Cloudflare Pages + Workers adapter for SSR
  adapter: cloudflare({
    platformProxy: {
      enabled: true,
    },
  }),

  integrations: [
    sitemap({
      changefreq: 'daily',
      priority: 0.7,
      lastmod: new Date(),
      // Filter out API routes
      filter: (page) => !page.includes('/api/'),
      // Custom priority for different page types
      serialize(item) {
        // Highest priority for homepage
        if (item.url === 'https://shreeng.com/') {
          item.priority = 1.0;
          item.changefreq = 'daily';
        }
        // High priority for main hubs
        if (item.url.endsWith('/panchang/') ||
            item.url.endsWith('/rashifal/') ||
            item.url.endsWith('/festivals/')) {
          item.priority = 0.9;
          item.changefreq = 'daily';
        }
        // High priority for city panchang pages
        if (item.url.includes('/panchang/') && !item.url.endsWith('/panchang/')) {
          item.priority = 0.8;
          item.changefreq = 'daily';
        }
        // City-specific rahu-kaal and choghadiya
        if (item.url.includes('/rahu-kaal/') || item.url.includes('/choghadiya/')) {
          item.priority = 0.8;
          item.changefreq = 'daily';
        }
        // Medium-high priority for element pages
        if (item.url.includes('/tithi/') ||
            item.url.includes('/nakshatra/') ||
            item.url.includes('/yoga/') ||
            item.url.includes('/karana/') ||
            item.url.includes('/vara/')) {
          item.priority = 0.7;
          item.changefreq = 'weekly';
        }
        // Festival pages
        if (item.url.includes('/festivals/') && !item.url.endsWith('/festivals/')) {
          item.priority = 0.75;
          item.changefreq = 'weekly';
        }
        // Muhurat pages
        if (item.url.includes('/muhurat/')) {
          item.priority = 0.7;
          item.changefreq = 'weekly';
        }
        // Tools get high priority
        if (item.url.includes('/kundli')) {
          item.priority = 0.8;
          item.changefreq = 'monthly';
        }
        return item;
      },
    }),
  ],

  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'hi'],
    routing: {
      prefixDefaultLocale: false, // /panchang/delhi (NOT /en/panchang/delhi)
    },
  },

  vite: {
    plugins: [tailwindcss()],
  },
});
