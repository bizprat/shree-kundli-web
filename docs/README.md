# Shree Kundli Astro - Knowledge Base

## Project Overview

Shree Kundli Astro is a modern, programmatic SEO astrology website built to compete with legacy sites like DrikPanchang, AstroSage, and mPanchang. The project prioritizes:

1. **AI/GEO Optimization** - Content structured for AI chatbot citation (ChatGPT, Perplexity, Gemini)
2. **Mobile-First Design** - 82% of users are on mobile devices
3. **Performance** - Zero-JS philosophy, <200KB page weight, <1.5s load time
4. **Programmatic SEO** - Thousands of location x date x content-type pages

## Quick Start

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build

# Preview production build
pnpm preview
```

## Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| Astro | 5.17.x | SSG Framework |
| TailwindCSS | 4.1.x | Styling |
| DaisyUI | 5.5.x | UI Components |
| TypeScript | 5.x | Type Safety |
| pnpm | 9.x | Package Manager |

## Architecture

```
┌─────────────────────────────────────────┐
│           CLOUDFLARE CDN                 │
│  (Free: Caching, DDoS, SSL)             │
├─────────────────────────────────────────┤
│               VPS                        │
│  ┌─────────┐  ┌─────────┐  ┌─────────┐ │
│  │ Astro   │  │ Nginx   │  │  Cron   │ │
│  │ (Build) │  │ (Serve) │  │(Rebuild)│ │
│  └─────────┘  └─────────┘  └─────────┘ │
└─────────────────────────────────────────┘
                    │
                    ▼
┌─────────────────────────────────────────┐
│         Shree Kundli API                 │
│   (Panchang, Kundli, Muhurat data)      │
└─────────────────────────────────────────┘
```

## Documentation Index

| Document | Description |
|----------|-------------|
| [ARCHITECTURE.md](./ARCHITECTURE.md) | System design and decisions |
| [CONVENTIONS.md](./CONVENTIONS.md) | Coding standards for AI agents |
| [CONTENT_STRATEGY.md](./CONTENT_STRATEGY.md) | SEO and content guidelines |
| [COMPONENT_GUIDE.md](./COMPONENT_GUIDE.md) | Component usage documentation |
| [decisions/](./decisions/) | Architecture Decision Records |
| [research/](./research/) | Market and competitor research |

## Key Principles

### 1. AI-First Content Architecture
Every page is structured for AI extraction:
- Answer-first pattern (key data in first 120 words)
- JSON-LD Schema (Dataset, Event, FAQPage)
- Semantic HTML (`<article>`, `<time>`, `<dfn>`)

### 2. Mobile-First Design
- 48px minimum touch targets
- Bottom navigation for thumb access
- Progressive disclosure (quick answer → details)
- <200KB total page weight

### 3. Zero-JS Philosophy
- Server-side rendering only
- CSS-only interactions (DaisyUI)
- No client-side JavaScript for content

### 4. Programmatic SEO
- URL pattern: `/panchang/{city}/today`
- 500+ city pages generated at build
- Daily rebuild via cron job

## Target Metrics

| Metric | Target |
|--------|--------|
| Page Weight | <200KB |
| LCP | <1.5s |
| Mobile Score | 95+ |
| Indexed Pages (Year 1) | 100,000+ |

## API Integration

The frontend consumes the Shree Kundli API:
- Base URL: Configured via environment variable
- Key endpoints: `/v2/panchang`, `/v2/chart`, `/v2/dasha`
- `falit=true` parameter returns LLM-ready interpretation data

## For AI Coding Agents

When working on this codebase:
1. Read [CONVENTIONS.md](./CONVENTIONS.md) first
2. Follow the AI-optimized content patterns
3. Always include JSON-LD schema in new pages
4. Test mobile viewport (375px width) as primary
5. Ensure zero client-side JavaScript for content
