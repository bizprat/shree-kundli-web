# ADR-001: Technology Stack Selection

**Status**: Accepted
**Date**: 2026-02-03

## Context

We need to build a programmatic SEO website for astrology/panchang data that:
- Generates thousands of pages (city x date x content-type)
- Loads fast on mid-range Android phones on 4G
- Is optimized for AI chatbot citation (GEO)
- Competes with legacy sites (DrikPanchang, AstroSage)

## Decision

### Framework: Astro 5.x
**Chosen over**: Next.js, Nuxt, SvelteKit

**Reasons**:
- Zero JavaScript by default (critical for performance)
- Native SSG support for thousands of pages
- Built-in i18n support
- Islands architecture for optional interactivity
- Excellent build performance

### Styling: TailwindCSS 4.x + DaisyUI 5.x
**Chosen over**: Chakra UI, Material UI, custom CSS

**Reasons**:
- DaisyUI provides zero-JS components
- Tailwind enables mobile-first responsive design
- Small CSS bundle with purging
- Consistent design tokens
- Spiritual theme customization

### Language: TypeScript (Strict Mode)
**Chosen over**: JavaScript

**Reasons**:
- Type safety for API responses
- Better IDE support
- Self-documenting code
- Catch errors at build time

### Package Manager: pnpm
**Chosen over**: npm, yarn

**Reasons**:
- Faster installation
- Disk space efficient (symlinks)
- Strict dependency resolution
- Better monorepo support (future)

### Hosting: VPS + Cloudflare CDN
**Chosen over**: Vercel, Cloudflare Pages, Netlify

**Reasons**:
- Cloudflare Pages has limited build minutes for large sites
- VPS provides unlimited builds with fixed cost
- Cloudflare CDN is free and handles traffic spikes
- Full control over caching and deployment

## Consequences

### Positive
- Fastest possible load times (zero JS)
- Excellent SEO and AI optimization
- Low hosting costs ($5-20/month)
- Scales to 100,000+ pages

### Negative
- No client-side interactivity without islands
- Requires VPS management
- Manual deployment pipeline setup

### Risks
- Astro is younger than Next.js (smaller ecosystem)
- Need to maintain VPS and cron jobs

## Alternatives Considered

### Next.js
- Pros: Large ecosystem, App Router, server components
- Cons: JavaScript overhead, complex for static sites

### SvelteKit
- Pros: Excellent DX, small bundles
- Cons: Smaller ecosystem, less SSG-focused

### Cloudflare Pages
- Pros: Zero-config, global CDN
- Cons: 20,000 files limit, build minute limits
