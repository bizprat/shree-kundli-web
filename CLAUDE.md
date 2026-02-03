# CLAUDE.md - Project Instructions for Claude Code

This file provides context and instructions for Claude Code when working on the Shree Kundli Astro project.

## Project Overview

Shree Kundli Astro is a programmatic SEO astrology website competing with DrikPanchang (12M monthly users), AstroSage, and mPanchang. The project generates thousands of location × date × content-type pages for organic traffic from Google Search, Google Discover, and AI chatbots (ChatGPT, Perplexity, Gemini).

## Tech Stack

- **Framework**: Astro 5.17.x (SSG mode, zero client JS)
- **Styling**: TailwindCSS 4.1.x + DaisyUI 5.5.x
- **Language**: TypeScript 5.x (strict mode)
- **Package Manager**: pnpm 9.x
- **Data Source**: Shree Kundli API (separate service)
- **Hosting**: VPS + Cloudflare CDN

## Critical Design Principles

1. **Mobile-First**: 82% of users are on budget Android phones (₹10k-15k). Design for 375px first.
2. **Zero Client JS**: All content rendered server-side. Client JS only for interactions.
3. **AI-Optimized**: Every page structured for AI chatbot extraction (answer-first pattern).
4. **Performance**: <200KB page weight, <1.5s LCP, 95+ Lighthouse mobile score.

## Common Commands

```bash
pnpm dev        # Start dev server at localhost:4321
pnpm build      # Production build to dist/
pnpm preview    # Preview production build
```

## Key Files to Read First

1. `AI_RULES.md` - Coding standards and component patterns
2. `DESIGN_SYSTEM.md` - Colors, typography, mobile-first specs
3. `USER_PERSONA.md` - Target users and their needs
4. `docs/CONVENTIONS.md` - Detailed coding conventions
5. `docs/ARCHITECTURE.md` - System architecture

## File Structure

```
src/
├── components/     # Astro components (PascalCase.astro)
├── data/          # Static JSON data (rashis, festivals, cities, muhurats)
├── layouts/       # Page layouts
├── lib/           # TypeScript utilities
├── pages/         # Route pages (generates URLs)
└── styles/        # Global CSS

docs/              # Technical documentation
public/            # Static assets, llms.txt, robots.txt
```

## Code Patterns

### Component Structure
```astro
---
// 1. Imports
// 2. Props interface (ALWAYS typed)
// 3. Props destructuring
// 4. Data fetching
---
<!-- 5. Semantic HTML with schema markup -->
<!-- 6. Scoped styles if needed -->
```

### AI-Optimized Content (CRITICAL)
Every content page must have answer-first structure:
```astro
<article itemscope itemtype="https://schema.org/Dataset">
  <!-- Quick answer in first 120 words -->
  <div class="quick-answer" role="contentinfo">
    <p><strong>Today's Tithi:</strong> शुक्ल षष्ठी (Shukla Shashthi)</p>
  </div>
  <!-- Detailed content below -->
</article>
```

### Bilingual Content
Always include Hindi + English:
```astro
<p>{data.nameHindi} ({data.nameEnglish})</p>
<!-- Output: शुक्ल षष्ठी (Shukla Shashthi) -->
```

## Don'ts

- DON'T use client-side JavaScript for content rendering
- DON'T use inline styles (use Tailwind classes)
- DON'T use raw hex colors (use DaisyUI theme tokens)
- DON'T skip JSON-LD schema markup
- DON'T create desktop-first layouts
- DON'T forget breadcrumbs
- DON'T use touch targets smaller than 48px

## URL Patterns

```
/panchang/{city}/today      # Daily panchang
/rashifal/{rashi}/today     # Daily horoscope
/muhurat/{type}/{city}      # Muhurat by city
/festivals/{slug}           # Festival pages
```

## Data Files

- `src/data/cities-sample.json` - 50 Indian cities for MVP
- `src/data/rashis.json` - 12 zodiac signs
- `src/data/festivals.json` - Major Hindu festivals
- `src/data/muhurats.json` - Muhurat types

## Testing Checklist

Before completing any page:
- [ ] Mobile viewport (375px) looks correct
- [ ] Touch targets are 48px minimum
- [ ] JSON-LD schema is valid
- [ ] Page weight under 200KB
- [ ] Hindi text displays correctly
- [ ] Quick answer in first 120 words
- [ ] Breadcrumbs are present
