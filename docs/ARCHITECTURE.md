# System Architecture

## Overview

Shree Kundli Astro is a statically generated website (SSG) that fetches data from the Shree Kundli API at build time. The site is deployed on a VPS behind Cloudflare CDN.

## System Components

### 1. Frontend (This Repository)
- **Framework**: Astro 5.x with static output
- **Styling**: TailwindCSS 4.x + DaisyUI 5.x
- **Output**: Static HTML/CSS files in `dist/`

### 2. Shree Kundli API (Separate Service)
- Provides panchang, kundli, muhurat calculations
- Swiss Ephemeris (NASA JPL) for accuracy
- Endpoints documented in [API_REFERENCE.md](./API_REFERENCE.md)

### 3. Cloudflare CDN
- Free tier: Unlimited bandwidth, DDoS protection
- Caches HTML for 1 hour, assets for 1 year
- Handles SSL termination

### 4. VPS (Origin Server)
- Nginx serves static files
- Cron job rebuilds daily pages at 00:05 IST
- Estimated cost: $5-20/month

## Data Flow

```
┌──────────────┐     Build Time      ┌──────────────────┐
│   Astro      │ ──────────────────▶ │  Shree Kundli    │
│   Build      │                     │      API         │
└──────────────┘                     └──────────────────┘
       │
       │ Generates
       ▼
┌──────────────┐     Deploy          ┌──────────────────┐
│  Static      │ ──────────────────▶ │      VPS         │
│  Files       │                     │    (Nginx)       │
└──────────────┘                     └──────────────────┘
                                            │
                                            │ Origin
                                            ▼
                                     ┌──────────────────┐
                                     │   Cloudflare     │
                                     │      CDN         │
                                     └──────────────────┘
                                            │
                                            │ Cached Response
                                            ▼
                                     ┌──────────────────┐
                                     │      User        │
                                     │   (Browser)      │
                                     └──────────────────┘
```

## Directory Structure

```
shree-kundli-astro/
├── docs/                    # Project documentation
│   ├── README.md
│   ├── ARCHITECTURE.md      # This file
│   ├── CONVENTIONS.md
│   ├── decisions/           # ADRs
│   └── research/            # Market research
├── public/                  # Static assets
│   ├── llms.txt            # AI crawler instructions
│   ├── robots.txt          # Crawler rules
│   └── favicon.svg
├── src/
│   ├── components/          # Astro components
│   ├── data/               # Static JSON data
│   ├── layouts/            # Page layouts
│   ├── lib/                # TypeScript utilities
│   ├── pages/              # Route pages
│   └── styles/             # Global CSS
├── astro.config.mjs
├── package.json
└── tsconfig.json
```

## Page Generation Strategy

### Static Generation (SSG)
All pages are pre-rendered at build time:
- City panchang pages (500+ cities)
- Festival pages (50+ festivals)
- Rashifal pages (12 rashis)
- Muhurat pages

### Daily Rebuild
A cron job triggers rebuild at 00:05 IST:
1. Fetch fresh data from API
2. Regenerate daily pages (`/*/today`)
3. Deploy to VPS
4. Purge Cloudflare cache

### URL Structure

| Pattern | Example | Generated Count |
|---------|---------|-----------------|
| `/panchang/[city]/today` | `/panchang/mumbai/today` | 500+ daily |
| `/panchang/[city]` | `/panchang/delhi` | 500+ |
| `/rashifal/[rashi]/today` | `/rashifal/mesh/today` | 12 daily |
| `/festivals/[festival]` | `/festivals/diwali-2026` | 50+ |
| `/muhurat/[type]/[city]` | `/muhurat/griha-pravesh/pune` | 10,000+ |

## Caching Strategy

| Content Type | Browser Cache | CDN Cache |
|--------------|---------------|-----------|
| HTML (daily pages) | 1 hour | 1 hour |
| HTML (static pages) | 1 hour | 24 hours |
| CSS/JS | 1 year | 1 year |
| Fonts | 1 year | 1 year |
| Images | 1 year | 1 year |

## Environment Variables

```bash
# .env (not committed)
SHREE_KUNDLI_API_URL=http://localhost:3333
SITE_URL=https://shreekundli.com
```

## Build Process

```bash
# Development
pnpm dev          # Start dev server at localhost:4321

# Production
pnpm build        # Generate static files to dist/
pnpm preview      # Preview production build locally
```

## Performance Budget

| Asset | Budget |
|-------|--------|
| HTML | <50KB |
| Critical CSS | <15KB |
| Fonts | <50KB |
| **Total Page** | **<200KB** |

## Security Considerations

1. **No secrets in frontend**: API is public, no auth required
2. **CSP headers**: Restrict script sources
3. **HTTPS only**: Cloudflare SSL
4. **Rate limiting**: Cloudflare protection

## Monitoring

- **Uptime**: UptimeRobot (free tier)
- **Analytics**: Umami (self-hosted on VPS)
- **Search Console**: Google, Bing
- **Performance**: Lighthouse CI

## Scaling Considerations

Current architecture supports:
- 100,000+ static pages
- Millions of requests/month (Cloudflare handles)
- Global CDN distribution

For future scaling:
- Consider ISR (Incremental Static Regeneration)
- Edge functions for real-time calculations
- Database for user preferences
