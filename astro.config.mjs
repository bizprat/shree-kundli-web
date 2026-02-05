// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import cloudflare from '@astrojs/cloudflare';

// https://astro.build/config
export default defineConfig({
  site: 'https://shreeng.com',

  // SSG default with per-page SSR opt-in (Astro 5 merged hybrid into static)
  // Pages that need SSR should add: export const prerender = false;
  output: 'static',

  // Cloudflare Pages + Workers adapter for SSR
  adapter: cloudflare({
    platformProxy: {
      enabled: true,
    },
  }),

  // Custom per-category sitemaps in src/pages/sitemap-*.xml.ts
  // (replaced @astrojs/sitemap with manual endpoints for crawl budget control)
  integrations: [],

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
