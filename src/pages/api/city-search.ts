/**
 * City Search API Proxy
 *
 * SSR endpoint that proxies city search requests to the Shreeng Engine
 * geocode API. Client-side JS calls this instead of the external API directly
 * (per CLAUDE.md: never call external API from client-side JavaScript).
 *
 * GET /api/city-search?q=patna&limit=8
 *
 * Response: Array of { id, name, nameHindi, state, slug, latitude, longitude, tier?, hasPage }
 */
export const prerender = false;

import { searchCities } from '../../lib/api-client';
import citiesData from '../../data/cities-sample.json';
import type { City } from '../../lib/types';
import type { APIRoute } from 'astro';

const localCities = citiesData as City[];

/** Generate a URL slug from a city name */
function toSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '');
}

export const GET: APIRoute = async ({ request }) => {
  const url = new URL(request.url);
  const q = url.searchParams.get('q')?.trim();
  const limit = Math.min(parseInt(url.searchParams.get('limit') || '10', 10), 20);

  if (!q || q.length < 2) {
    return new Response(JSON.stringify([]), {
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const results = await searchCities(q, 'IN', limit);

    const enriched = results.map((r) => {
      const local = localCities.find((c) => c.id === r.id);
      return {
        id: r.id,
        name: r.name,
        nameHindi: r.nameHindi || '',
        state: local?.state || r.state,
        slug: local?.slug || toSlug(r.name),
        latitude: r.latitude,
        longitude: r.longitude,
        tier: local?.tier,
        hasPage: !!local,
      };
    });

    return new Response(JSON.stringify(enriched), {
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=3600',
      },
    });
  } catch (err: unknown) {
    const errMsg = err instanceof Error ? err.message : JSON.stringify(err);
    console.error('[city-search] ERROR:', errMsg);
    return new Response(JSON.stringify([]), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
