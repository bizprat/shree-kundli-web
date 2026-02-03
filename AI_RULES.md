# AI Agent Rules & Coding Standards

This document defines mandatory rules for AI coding agents working on the Shree Kundli Astro project.

---

## Core Philosophy

1. **Mobile First**: Design for ₹10,000 Android phones on Jio 4G. 82% of users are mobile.
2. **Zero JavaScript**: All content rendered server-side. Client JS only for interactions (menus, modals).
3. **AI-Optimized**: Every page structured for AI chatbot extraction (ChatGPT, Perplexity, Gemini).
4. **Performance**: <200KB page weight, <1.5s LCP, 95+ Lighthouse mobile score.
5. **KISS**: No unnecessary abstractions. Simple, readable code.

---

## Tech Stack (Mandatory Versions)

| Technology | Version | Notes |
|------------|---------|-------|
| Astro | 5.17.x | SSG mode, zero JS default |
| TailwindCSS | 4.1.x | Mobile-first utilities |
| DaisyUI | 5.5.x | Zero-JS components only |
| TypeScript | 5.x | Strict mode enabled |
| pnpm | 9.x | Package manager |

---

## File Naming Conventions

```
# Components: PascalCase
src/components/PanchangCard.astro
src/components/CitySelector.astro
src/components/SEO.astro

# Pages: kebab-case with dynamic routes
src/pages/panchang/[city]/today.astro
src/pages/rashifal/[rashi]/index.astro

# Utilities: camelCase
src/lib/api.ts
src/lib/formatDate.ts

# Data files: kebab-case
src/data/rashis.json
src/data/festivals.json
src/data/cities-sample.json
```

---

## Component Architecture

### Standard Component Template

```astro
---
// 1. Imports (alphabetical)
import Breadcrumb from '@/components/Breadcrumb.astro';
import SEO from '@/components/SEO.astro';

// 2. Props interface (ALWAYS typed)
interface Props {
  title: string;
  city: string;
  date: Date;
}

// 3. Destructure props
const { title, city, date } = Astro.props;

// 4. Data fetching (if needed)
const data = await fetchPanchang(city, date);
---

<!-- 5. Semantic HTML structure -->
<article class="panchang-card" itemscope itemtype="https://schema.org/Dataset">
  <header>
    <h1 itemprop="name">{title}</h1>
  </header>
  <section>
    <!-- Content -->
  </section>
</article>

<!-- 6. Scoped styles (if needed) -->
<style>
  .panchang-card {
    /* Component-specific styles only */
  }
</style>
```

### Component Props Rules
- ALL props must be typed with TypeScript interfaces
- Use optional (`?`) for non-required props
- Provide sensible defaults where appropriate
- Document complex props with JSDoc comments

---

## AI-Optimized Content Structure (CRITICAL)

### Answer-First Pattern

Every content page MUST follow this structure:

```astro
<article itemscope itemtype="https://schema.org/Dataset">
  <!-- QUICK ANSWER BLOCK (First 120 words) -->
  <!-- AI chatbots extract this section for citations -->
  <div class="quick-answer" role="contentinfo">
    <p><strong>Today's Tithi:</strong> <span itemprop="about">शुक्ल षष्ठी (Shukla Shashthi)</span></p>
    <p><strong>Nakshatra:</strong> रोहिणी (Rohini)</p>
    <p><strong>Sunrise:</strong> <time datetime="2026-02-03T07:05:00+05:30">07:05 AM IST</time></p>
    <p><strong>Rahu Kaal:</strong> 07:30 AM - 09:00 AM</p>
  </div>

  <!-- DETAILED CONTENT (Below the fold) -->
  <section>
    <!-- Expandable details, tables, explanations -->
  </section>
</article>
```

### Bilingual Content (Hindi + English)
ALWAYS include both languages:
```astro
<p>
  <strong>Tithi:</strong> {data.tithi.nameHindi} ({data.tithi.nameEnglish})
</p>
<!-- Output: Tithi: शुक्ल षष्ठी (Shukla Shashthi) -->
```

### Time Elements
ALWAYS use semantic `<time>` with ISO datetime:
```astro
<time datetime="2026-02-03T07:05:00+05:30">07:05 AM IST</time>
```

### Technical Terms
Use `<dfn>` for glossary terms:
```astro
<p>
  <dfn data-term="tithi">Tithi</dfn> (तिथि) is a lunar day in the Hindu calendar.
</p>
```

---

## JSON-LD Schema Requirements

### Schema Types by Page

| Page Type | Primary Schema | Required Properties |
|-----------|---------------|---------------------|
| Homepage | `WebSite` | name, url, potentialAction |
| Panchang | `Dataset` | name, datePublished, spatialCoverage |
| Festival | `Event` | name, startDate, location |
| Rashifal | `Article` | headline, datePublished, author |
| Muhurat | `Dataset` | name, temporalCoverage |
| Hub Pages | `WebPage` | name, description, breadcrumb |

### Mandatory Schema on Every Page
```astro
<SEO
  title="Today's Panchang for Mumbai - 3 Feb 2026"
  description="Shukla Shashthi tithi, Rohini nakshatra..."
  schema={{
    "@type": "Dataset",
    "name": "Panchang for Mumbai - 3 February 2026",
    "datePublished": "2026-02-03",
    "spatialCoverage": {
      "@type": "Place",
      "name": "Mumbai, Maharashtra, India"
    }
  }}
  breadcrumbs={[
    { name: "Home", url: "/" },
    { name: "Panchang", url: "/panchang" },
    { name: "Mumbai", url: "/panchang/mumbai" }
  ]}
/>
```

### FAQPage Schema (For AI Extraction)
Include on pages with common questions:
```json
{
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is today's tithi in Mumbai?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Today (3 February 2026) is Shukla Shashthi..."
      }
    }
  ]
}
```

---

## Mobile-First Design Rules

### Touch Targets
```astro
<!-- Minimum 48px touch targets -->
<button class="btn min-h-12 min-w-12">
  <!-- Content -->
</button>

<!-- Comfortable spacing between targets -->
<nav class="flex gap-2">
  <!-- Nav items -->
</nav>
```

### Bottom Navigation
```astro
<!-- Mobile bottom nav - max 4 items -->
<div class="btm-nav btm-nav-sm md:hidden">
  <button class="active">
    <svg><!-- icon --></svg>
    <span class="btm-nav-label">Home</span>
  </button>
  <button>
    <svg><!-- icon --></svg>
    <span class="btm-nav-label">Panchang</span>
  </button>
  <!-- Max 4 items -->
</div>
```

### Responsive Grid Pattern
```astro
<!-- Mobile first: 1 col → 2 col → 3 col -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  <!-- Cards -->
</div>
```

### Typography Scale
```astro
<!-- Mobile first typography -->
<h1 class="text-2xl md:text-3xl lg:text-4xl">Title</h1>
<p class="text-sm md:text-base">Body text</p>
```

---

## CSS/Styling Rules

### Use DaisyUI Theme Tokens
```css
/* DO: Use semantic tokens */
text-primary      /* Deep Indigo #1E1B4B */
text-secondary    /* Saffron Gold #FFB703 */
bg-base-100       /* Warm Cream #FDFCF6 */
bg-base-200       /* Off-white #F5F4EF */

/* DON'T: Use raw colors */
text-[#1E1B4B]    /* Avoid */
```

### DaisyUI Component Usage
```astro
<!-- Card -->
<div class="card bg-base-100 shadow-sm">
  <div class="card-body">
    <!-- Content -->
  </div>
</div>

<!-- Button variants -->
<button class="btn btn-primary">Primary</button>
<button class="btn btn-secondary">Secondary</button>
<button class="btn btn-ghost">Ghost</button>
```

### No Inline Styles
```astro
<!-- DO: Use Tailwind classes -->
<div class="p-4 rounded-lg bg-base-100">

<!-- DON'T: Use inline styles -->
<div style="padding: 16px; border-radius: 8px;">
```

---

## TypeScript Patterns

### Type Everything
```typescript
// src/lib/types.ts
export interface City {
  id: number;
  name: string;
  nameHindi: string;
  slug: string;
  state: string;
  latitude: number;
  longitude: number;
  timezone: string;
}

export interface PanchangData {
  tithi: {
    name: string;
    nameHindi: string;
    number: number;
    paksha: 'shukla' | 'krishna';
  };
  nakshatra: {
    name: string;
    nameHindi: string;
    lord: string;
  };
}
```

### API Client Pattern
```typescript
// src/lib/api.ts
const API_BASE = import.meta.env.SHREE_KUNDLI_API_URL;

export async function fetchPanchang(
  locationId: number,
  datetime: string
): Promise<PanchangData> {
  const url = `${API_BASE}/v2/panchang?locationId=${locationId}&datetime=${datetime}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }

  return response.json();
}
```

---

## URL Structure

### Patterns
```
/panchang                      # Hub page
/panchang/{city}               # City hub
/panchang/{city}/today         # Today's panchang
/panchang/{city}/{month}-{year} # Monthly archive

/rashifal                      # Hub page
/rashifal/{rashi}              # Rashi detail
/rashifal/{rashi}/today        # Daily horoscope

/festivals                     # Calendar hub
/festivals/{slug}              # Festival detail

/muhurat                       # Hub page
/muhurat/{type}                # Type hub
/muhurat/{type}/{city}         # City-specific muhurat
```

### Slug Rules
- Lowercase only
- Hyphens for spaces
- No special characters
- Examples: `griha-pravesh`, `ram-navami-2026`, `mesh`

---

## Performance Budget

| Asset | Budget |
|-------|--------|
| HTML | <50KB |
| Critical CSS | <15KB |
| Fonts (subset) | <50KB |
| Images (per) | <100KB |
| **Total Page** | **<200KB** |

---

## Testing Checklist

Before submitting any page:

- [ ] Mobile viewport (375px) displays correctly
- [ ] Touch targets are 48px minimum
- [ ] JSON-LD schema is valid (test with Google Rich Results)
- [ ] Page weight under 200KB
- [ ] Lighthouse mobile score 90+
- [ ] Hindi text displays correctly
- [ ] Quick answer in first 120 words
- [ ] All times use `<time>` element with datetime
- [ ] Breadcrumbs are present
- [ ] No client-side JavaScript for content rendering

---

## Do's and Don'ts

### DO
- Use semantic HTML (`<article>`, `<section>`, `<time>`, `<dfn>`)
- Include JSON-LD schema on every page
- Test on 375px mobile viewport first
- Include both Hindi and English text
- Use DaisyUI components
- Keep page weight under 200KB
- Use `astro:assets` for images
- Type all component props

### DON'T
- Use client-side JavaScript for content
- Use inline styles
- Create desktop-first layouts
- Skip schema markup
- Use raw hex colors (use theme tokens)
- Forget breadcrumbs
- Use heavy icon libraries
- Skip TypeScript types

---

## Quick Reference

### Common Imports
```astro
---
import Layout from '@/layouts/Layout.astro';
import SEO from '@/components/SEO.astro';
import Breadcrumb from '@/components/Breadcrumb.astro';
import type { City, PanchangData } from '@/lib/types';
---
```

### Data File Locations
```
src/data/cities-sample.json   # 50 cities for MVP
src/data/rashis.json          # 12 zodiac signs
src/data/festivals.json       # Major Hindu festivals
src/data/muhurats.json        # Muhurat types
```

### Documentation
```
docs/README.md                # Project overview
docs/ARCHITECTURE.md          # System design
docs/CONVENTIONS.md           # Detailed coding standards
docs/API_REFERENCE.md         # API documentation (when available)
```
