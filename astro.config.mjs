// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://shreekundli.com',
  integrations: [
    sitemap({
      changefreq: 'daily',
      priority: 0.7,
      lastmod: new Date(),
      // Custom priority for different page types
      serialize(item) {
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
        // Medium-high priority for element pages
        if (item.url.includes('/tithi/') ||
            item.url.includes('/nakshatra/') ||
            item.url.includes('/yoga/') ||
            item.url.includes('/karana/')) {
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
    defaultLocale: "en",
    locales: ["en", "hi"],
    routing: {
      prefixDefaultLocale: false
    }
  },
  vite: {
    plugins: [tailwindcss()]
  }
});