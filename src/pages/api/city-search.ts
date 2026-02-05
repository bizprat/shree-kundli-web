/**
 * City Search API Proxy
 *
 * SSR endpoint that proxies city search requests to the Shreeng Engine
 * geocode API. Client-side JS calls this instead of the external API directly
 * (per CLAUDE.md: never call external API from client-side JavaScript).
 *
 * Reads CF-IPCountry header to prioritize results from the user's country.
 *
 * GET /api/city-search?q=patna&limit=8
 *
 * Response: Array of { id, name, state, country, slug, latitude, longitude }
 */
export const prerender = false;

import { searchCities } from '../../lib/api-client';
import type { APIRoute } from 'astro';

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

  // Read user's country from Cloudflare header for result prioritization
  const priorityCountry = request.headers.get('CF-IPCountry') || undefined;

  try {
    console.log('[city-search] query:', q, 'priorityCountry:', priorityCountry, 'limit:', limit);
    const results = await searchCities(q, { priorityCountry, limit });
    console.log('[city-search] results count:', results.length);

    const mapped = results.map((r) => ({
      id: r.id,
      name: r.name,
      state: r.state || '',
      country: r.country || '',
      slug: toSlug(r.name),
      latitude: r.latitude,
      longitude: r.longitude,
    }));

    return new Response(JSON.stringify(mapped), {
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=3600',
      },
    });
  } catch (err: unknown) {
    const errMsg = err instanceof Error ? err.message : JSON.stringify(err);
    const errStack = err instanceof Error ? err.stack : '';
    console.error('[city-search] ERROR:', errMsg);
    console.error('[city-search] STACK:', errStack);
    return new Response(JSON.stringify({ error: errMsg }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
