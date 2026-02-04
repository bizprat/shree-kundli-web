# CLAUDE.md — Shreeng Web (Frontend)

## Project Identity

**Shreeng** (shreeng.com) is a mobile-first, dark-themed Vedic astrology pSEO website built with Astro, TailwindCSS, and DaisyUI. It competes with DrikPanchang, AstroSage, and mPanchang through superior UI/UX and massive programmatic SEO (100K+ unique pages).

**Live Goal:** Generate organic traffic → AdSense revenue → financial automation.

---

## Tech Stack

| Layer | Technology | Version |
|---|---|---|
| Framework | Astro | 5.x (hybrid mode: SSG default + SSR opt-in) |
| Styling | TailwindCSS | 4.x |
| Components | DaisyUI | 5.x |
| Language | TypeScript | 5.x (strict mode) |
| Package Manager | pnpm | 9.x |
| Hosting (Frontend) | Cloudflare Pages + Workers | — |
| Hosting (API) | VPS (6vCPU, 12GB RAM) | Ubuntu LTS |
| API Backend | Shreeng Engine (NestJS) | — |
| CDN/DNS | Cloudflare | Free tier |

---

## Critical Design System — NEVER DEVIATE

### Theme: "Cosmic Modern Dark"

This is a **dark-first** design. Every component, page, and layout MUST use these tokens. NEVER use raw hex colors — always use DaisyUI theme tokens or CSS custom properties.

```
Backgrounds:
  base-100:         #0F0E1A    (page background)
  base-200:         #1A1830    (card/surface background)
  base-300:         #252342    (elevated surface, hover, borders)
  base-content:     #F1F0F5    (primary text)

Primary (Gold — auspicious, CTAs, headings):
  primary:          #F5A623
  primary-content:  #0F0E1A

Secondary (Violet — links, accents, interactive):
  secondary:        #7C5CFC
  secondary-content: #FFFFFF

Neutral (Muted text):
  neutral:          #9390A3
  neutral-content:  #F1F0F5

Semantic:
  success:          #34D399    (shubh/auspicious indicators)
  warning:          #FBBF24    (caution)
  error:            #F87171    (ashubh/inauspicious indicators)
  info:             #60A5FA    (informational)
```

### Glassmorphism System

Use these CSS classes (defined in `src/styles/glass.css`):

| Class | Usage |
|---|---|
| `glass-card` | Default glass container. `rgba(255,255,255,0.04)` bg, `blur(12px)`, subtle border |
| `glass-elevated` | More prominent cards. `rgba(255,255,255,0.06)` bg, `blur(16px)`, stronger shadow |
| `glass-shubh` | Auspicious content. Golden-tinted glass with golden glow |
| `glass-ashubh` | Inauspicious content. Red-tinted glass |
| `gradient-border` | Golden gradient border effect (for featured/highlighted cards) |
| `grain-overlay` | Applied to `<body>` — adds subtle noise texture overlay |

**CRITICAL:** Always provide a solid-color fallback for `backdrop-filter` for budget Android devices:
```css
@supports not (backdrop-filter: blur(12px)) {
  .glass-card { background: rgba(26, 24, 48, 0.95); }
}
```

### Typography

| Purpose | Font | Weights |
|---|---|---|
| All English text | Inter (static, self-hosted) | 400, 600, 700 |
| Hindi/Devanagari | Noto Sans Devanagari (self-hosted) | 400, 600 |

- Fonts are in `public/fonts/` as `.woff2` files (static weights, NOT variable — keeps under budget)
- Load Devanagari ONLY on Hindi (`/hi/`) pages
- Always set `font-display: swap`
- NEVER use Google Fonts CDN — self-host everything
- Inter static weights (400+600+700) ≈ 45KB total. Variable font is ~90KB and exceeds budget.

### Border Radius

```
--rounded-box:   0.75rem    (cards, containers)
--rounded-btn:   0.5rem     (buttons)
--rounded-badge: 9999px     (badges, pills only)
```

---

## Architecture Rules

### Rendering Strategy

```
SSG (default):    Hub pages, reference pages, homepage
                  → These use `export const prerender = true` (or just omit — it's the default)

SSR (opt-in):     City-specific daily pages (panchang, rahu-kaal, choghadiya)
                  → These use `export const prerender = false`
                  → Served via Cloudflare Workers
                  → Cached at CF edge for 24 hours

Client JS:        ONLY via Astro Islands for interactive features
                  → CitySearch, GeoDetector, ThemeToggle
                  → Total island JS budget: <25KB
```

### Astro Configuration (astro.config.mjs)

```typescript
// Key configuration shape — adapt as needed
{
  output: 'hybrid',                          // SSG default, SSR opt-in per page
  adapter: cloudflare({ platformProxy: { enabled: true } }),
  integrations: [tailwind()],
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'hi'],
    routing: { prefixDefaultLocale: false },  // /panchang/delhi (NOT /en/panchang/delhi)
  },
}

// Pages needing SSR: add `export const prerender = false;` to:
//   panchang/[city].astro, rahu-kaal/[city].astro, choghadiya/[city].astro,
//   rashifal/[rashi].astro (if daily), api/cities.ts
```

### Zero Client JS Rule (Modified)

The project follows a **near-zero client JS** philosophy:
- ALL content rendering is server-side (Astro components)
- Client JS is ONLY allowed inside `src/components/islands/` as Astro Islands
- NEVER add `<script>` tags directly in page templates for content logic
- Ad loading scripts are the only exception (external async scripts)
- If you think you need client JS for something, ask yourself: "Can this be done server-side?" — if yes, do it server-side

### i18n / Language Routing

```
/panchang/delhi           → English (default, no prefix)
/hi/panchang/delhi        → Hindi
/ta/panchang/delhi        → Tamil (future)
```

- Default locale (English) has NO prefix in URL
- All other languages use ISO 639-1 code as prefix
- Use Astro's built-in i18n routing (`prefixDefaultLocale: false`)
- UI strings live in `src/i18n/{lang}.json`
- Content is bilingual on English pages (Hindi terms like "Tithi", "Nakshatra" appear naturally)
- Hindi pages are fully Hindi with Devanagari script

### API Communication

- All astrology data comes from **Shreeng Engine API** running on the VPS
- API client is in `src/lib/api-client.ts`
- NEVER hardcode API URLs — use environment variables
- NEVER call the API from client-side JS — always from Astro server-side (SSR pages or build-time for SSG)
- Cache API responses aggressively (CF KV for SSR, build-time for SSG)

### Location Detection (Priority Chain)

The `GeoDetector` island implements this fallback chain:

1. **Browser Geolocation API** → user grants permission → lat/long sent to backend reverse geocode API → exact city matched from cities500 DB
2. **Cloudflare IP headers** (free on all plans) → `CF-IPCity`, `CF-IPCountry`, `cf-iplatitude`, `cf-iplongitude` available in Workers/SSR request headers → match against cities500 DB (~80% city-level accuracy)
3. **Default fallback** → New Delhi → show prominent "📍 Showing for New Delhi — Change City 🔍" prompt
4. **Persist** → save detected/selected city to `localStorage` → skip detection on return visits → "Change City" always accessible in header

### City URL Slugs

City slugs power the pSEO URL structure. Source: cities500 geonames DB with population + admin division filters.

```
Format: /panchang/{city-slug}

Rules:
- Unique city name in India     → city only:      /panchang/delhi
- Ambiguous within India        → city-state:      /panchang/patna-bihar
- International                 → city-state-cc:   /panchang/portland-oregon-us
- Slugs are lowercase, hyphenated, ASCII-only (no diacritics)
- Use population filter to prioritize larger cities for shorter slugs
- Example: "Springfield" exists in many US states → /panchang/springfield-illinois-us
```

---

## Component Architecture

### Layout Hierarchy

```
Base.astro
  → <html>, <head>, fonts, theme, grain overlay
  → Page.astro
      → Header.astro (sticky, glass)
      → ContextBar.astro (city + date + tabs — on daily pages only)
      → <main> with slot
      → Footer.astro (popular cities, links, SEO)
      → BottomNav.astro (mobile only, fixed bottom)
      → AdAnchor.astro (sticky bottom ad, mobile)
```

### Component Rules

1. **Every component is an `.astro` file** unless it needs client interactivity (then it goes in `islands/`)
2. **Props interface required** for every component with TypeScript
3. **Use `class:list`** for conditional classes, not string concatenation
4. **Use DaisyUI component classes** where they exist (btn, card, badge, etc.)
5. **Use Tailwind utilities** for spacing, sizing, layout
6. **Use glass-* classes** for card backgrounds — NEVER use raw `bg-base-200` for cards
7. **Every clickable element: minimum 48x48px touch target**
8. **Spacing between touch targets: minimum 8px**

### Ad Slots

- Use `<AdSlot>` component for all ad placements
- Reserve height with `min-height` to prevent CLS (Cumulative Layout Shift)
- Maximum 3 ad units per mobile page view
- First ad MUST be below the fold (after primary content)
- NEVER place ad between page title and content
- Label all ads with tiny "Advertisement" text

### Ad Strategy Phases

- **Phase 1 (Launch → 3 months):** Auto Ads only. Let Google optimize placements and learn user behavior.
- **Phase 2 (3+ months, steady traffic):** Hybrid — keep Auto Ads ON + add 2-3 manual ad units in high-CTR positions (in-content after primary data, between content sections, before footer).
- **Ezoic migration** when traffic exceeds 10K monthly pageviews for 50-250% higher RPM.

---

## SEO Requirements — EVERY PAGE

### Must-Have Elements

1. **`<title>`** — Unique, descriptive, includes city/topic + "Shreeng" brand
2. **`<meta description>`** — Unique, 150-160 chars, includes primary keyword
3. **`<link rel="canonical">`** — Self-referencing canonical
4. **hreflang tags** — For all available language versions
5. **JSON-LD structured data** — Appropriate schema type per page
6. **Breadcrumb** — Visual + BreadcrumbList schema
7. **QuickAnswer box** — First 120 words answer the search query directly
8. **Internal links** — Related content section + popular cities footer
9. **H1 tag** — Exactly ONE per page, includes primary keyword
10. **OG tags** — title, description, image, type, locale

### QuickAnswer Pattern (AI/AIO Optimization)

EVERY content page MUST start with a `<div class="quick-answer">` that:
- Answers the search query in the first 120 words
- Uses bilingual format: Hindi term (English translation)
- Is wrapped in semantic HTML with `role="contentinfo"`
- Contains the most critical data point FIRST

```html
<div class="quick-answer" role="contentinfo">
  <p><strong>Today's Panchang for Patna</strong> —
  Tithi: शुक्ल षष्ठी (Shukla Shashthi),
  Nakshatra: रेवती (Revati),
  Sunrise: 6:42 AM, Sunset: 5:48 PM.
  Rahu Kaal: 12:00 PM - 1:30 PM (avoid new ventures).</p>
</div>
```

This format is optimized for:
- Google Featured Snippets
- AI chatbot citations (ChatGPT, Gemini, Claude web search)
- Google Discover cards
- Voice assistant answers

### Sitemaps

```
/sitemap-index.xml        → links to all sub-sitemaps
/sitemap-core.xml         → homepage, hub pages, about, contact
/sitemap-panchang.xml     → top 1000 city panchang pages (by population)
/sitemap-rahu-kaal.xml    → top 1000 city rahu kaal pages
/sitemap-choghadiya.xml   → top 1000 city choghadiya pages
/sitemap-rashifal.xml     → 12 rashi pages
/sitemap-festivals.xml   → all festival pages (current + next year)
/sitemap-muhurat.xml      → all muhurat type pages
/sitemap-reference.xml    → tithi, nakshatra, yoga, karana, vara pages
/sitemap-blog.xml         → blog posts (Phase 2)
```

- Generated dynamically at build time (SSG) and on-demand (SSR pages)
- Only list top cities by population — Google discovers long-tail cities via internal links organically
- Include `<lastmod>` with accurate dates

### Internal Linking Rules

Every page MUST have:
1. **Breadcrumb** (top of content)
2. **Contextual related links** (after main content) — same city different content type, same content different city
3. **Popular cities footer** (bottom) — top 30-50 Indian cities linking to the current page type for each city
4. **hreflang alternates** (in `<head>`)

Cross-linking patterns:
- Panchang page → links to Rahu Kaal, Choghadiya (same city)
- Panchang page → links to this month's festivals, today's rashifal
- Festival page → links to panchang of that festival date
- Rashifal page → links to related nakshatras
- Everything → links to Kundli tool

---

## Mobile-First Requirements

**82% of target users are on budget Android phones (₹10k-15k range).**

### Layout Pattern (Mobile)

```
Sticky Header (56px)
Scrollable Content
Fixed Bottom Nav (64px + safe-area-inset)
```

### Performance Budget (STRICT)

| Asset | Budget |
|---|---|
| HTML | <40KB |
| Critical CSS | <20KB |
| Fonts (English pages) | <45KB (Inter static 400+600+700) |
| Fonts (Hindi pages) | <70KB (Inter + Noto Sans Devanagari) |
| Images per page | <80KB (SVG preferred) |
| Island JS (total) | <25KB |
| **Total (no ads)** | **<225KB** |

### Performance Targets

| Metric | Target |
|---|---|
| LCP | <1.5s on 4G |
| CLS | <0.05 |
| INP | <100ms |
| Lighthouse Mobile | 90+ (95+ without ads) |

### Touch Targets

- Minimum size: 48px × 48px
- Minimum spacing between tappable elements: 8px
- Bottom nav items: full width ÷ 5, minimum 64px height
- All links in content: line-height ≥ 1.6 for tap accuracy

---

## File Organization

```
src/
├── components/
│   ├── layout/         # Header, Footer, BottomNav, BaseLayout, PageLayout
│   ├── navigation/     # Breadcrumb, ContextBar, TabNav
│   ├── cards/          # GlassCard, PanchangCard, FestivalCard, RashiCard, etc.
│   ├── data-display/   # QuickAnswer, TimeDisplay, DataRow, StatusBadge, Countdown
│   ├── seo/            # SEO, SchemaFactory, HreflangTags
│   ├── ads/            # AdSlot, AdAnchor, ads-loader
│   ├── islands/        # CitySearch, GeoDetector, ThemeToggle (CLIENT JS here only)
│   └── sections/       # HeroSection, TodayPanchang, UpcomingFestivals, RashiGrid
│
├── layouts/            # Base.astro, Page.astro, PanchangPage.astro
├── pages/              # Route files (see architecture doc for full structure)
├── content/            # Astro Content Collections (blog — Phase 2 ONLY)
├── data/               # Static JSON data files
├── i18n/               # en.json, hi.json, utils.ts
├── lib/                # Shared utilities (api-client, city-utils, schema-factory, etc.)
├── styles/             # global.css, theme.css, glass.css, animations.css, fonts.css
└── public/             # Static assets (fonts, icons, textures, OG images)
```

---

## Future Phases — DO NOT BUILD YET

### Blog (Phase 2)

- Uses **Astro Content Collections** — NOT WordPress, NOT a CMS
- AI generates markdown files with frontmatter → git push → CF Pages auto-deploys (~30 seconds)
- Pipeline: n8n/cron → AI generates `.md` → push to repo → live
- Blog posts auto-link to pSEO pages via frontmatter `cities` and `relatedFestivals` fields
- URL: `/blog/{slug}` (English), `/hi/blog/{slug}` (Hindi)
- **DO NOT build blog infrastructure yet** — focus on pSEO pages first

### Light Theme (Phase 3)

- `cosmic-light` DaisyUI theme with inverted colors
- Toggled via ThemeToggle island
- Token mapping only — no separate component styles needed
- **DO NOT build yet** — dark theme is the primary identity

---

## Don'ts — HARD RULES

- ❌ **NEVER** use client-side JavaScript for content rendering
- ❌ **NEVER** use inline styles — always use Tailwind classes or CSS custom properties
- ❌ **NEVER** use raw hex colors — always use DaisyUI theme tokens
- ❌ **NEVER** use desktop-first layouts — always start mobile, scale up with `md:` / `lg:`
- ❌ **NEVER** create touch targets smaller than 48px
- ❌ **NEVER** skip breadcrumbs on any content page
- ❌ **NEVER** skip JSON-LD schema on any content page
- ❌ **NEVER** skip the QuickAnswer box on content pages
- ❌ **NEVER** place ads above primary content / before the fold
- ❌ **NEVER** use Google Fonts CDN — self-host all fonts
- ❌ **NEVER** hardcode API URLs — use env variables
- ❌ **NEVER** call the API from client-side JavaScript
- ❌ **NEVER** use images where SVG icons would suffice
- ❌ **NEVER** skip hreflang tags on pages with language variants
- ❌ **NEVER** use light/white backgrounds — this is a dark theme site
- ❌ **NEVER** use `!important` in CSS
- ❌ **NEVER** import full font families — only import needed weights as subsets

---

## Do's — ALWAYS

- ✅ **ALWAYS** test on 375px width first (budget Android)
- ✅ **ALWAYS** use `glass-card` or variants for card backgrounds
- ✅ **ALWAYS** include bilingual content (Hindi terms + English translation)
- ✅ **ALWAYS** reserve height for ad slots to prevent CLS
- ✅ **ALWAYS** use semantic HTML (`<article>`, `<section>`, `<nav>`, `<time>`)
- ✅ **ALWAYS** add `loading="lazy"` to images below the fold
- ✅ **ALWAYS** use `<time datetime="...">` for dates and times
- ✅ **ALWAYS** cross-link to related pages (same city different content, same content different city)
- ✅ **ALWAYS** include Popular Cities section in footer for internal linking
- ✅ **ALWAYS** provide `@supports` fallback for glassmorphism on older devices
- ✅ **ALWAYS** use Inter for English text, Noto Sans Devanagari for Hindi
- ✅ **ALWAYS** put the most important information first (answer-first pattern)

---

## Commands

```bash
pnpm dev          # Dev server at localhost:4321
pnpm build        # Production build
pnpm preview      # Preview production build
pnpm lint         # Lint check
pnpm format       # Format code
```

---

## Context for AI Agents

This project is built by a solo founder targeting the Indian astrology market. The website needs to:
1. **Look premium** — dark cosmic theme with glassmorphism, NOT like legacy astrology sites
2. **Be fast** — budget Android phones on 4G are the primary target
3. **Generate money** — AdSense revenue through organic traffic, so pSEO and CTR optimization matter
4. **Scale massively** — 100K+ unique pages via programmatic SEO (city × content type × date × language)
5. **Be automated** — minimal manual maintenance, content generated by API + AI

When making any decision, optimize for: Mobile UX → SEO → Performance → Desktop UX (in that order).