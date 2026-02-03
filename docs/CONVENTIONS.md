# Coding Conventions for AI Agents

This document defines the coding standards and patterns for the Shree Kundli Astro project. **AI coding agents must follow these conventions.**

## Core Principles

1. **Mobile-First**: Design for 375px width first, then scale up
2. **Zero Client JS**: No JavaScript for content rendering
3. **AI-Optimized**: Every page must be structured for AI extraction
4. **Performance**: <200KB total page weight

---

## File Naming

```
# Components: PascalCase
src/components/PanchangCard.astro
src/components/CitySelector.astro

# Pages: kebab-case
src/pages/panchang/[city]/today.astro
src/pages/rahu-kaal/[city]/today.astro

# Utilities: camelCase
src/lib/api.ts
src/lib/formatDate.ts

# Data files: kebab-case
src/data/rashis.json
src/data/festivals.json
```

---

## Component Structure

### Astro Component Template
```astro
---
// 1. Imports
import SEO from '@/components/SEO.astro';
import Breadcrumb from '@/components/Breadcrumb.astro';

// 2. Props interface (always typed)
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

<!-- 5. HTML with semantic structure -->
<article class="panchang-card">
  <header>
    <h1>{title}</h1>
  </header>
  <section>
    <!-- Content -->
  </section>
</article>

<!-- 6. Scoped styles (if needed) -->
<style>
  .panchang-card {
    /* Component-specific styles */
  }
</style>
```

---

## AI-Optimized Content Patterns

### Answer-First Structure
Every content page MUST follow this pattern:

```astro
<article itemscope itemtype="https://schema.org/Article">
  <!-- QUICK ANSWER (First 120 words - crucial for AI) -->
  <div class="quick-answer" role="contentinfo">
    <p><strong>Today's Tithi:</strong> {data.tithi.name}</p>
    <p><strong>Nakshatra:</strong> {data.nakshatra.name}</p>
    <p><strong>Sunrise:</strong> <time datetime={data.sunrise.iso}>{data.sunrise.formatted}</time></p>
  </div>

  <!-- DETAILED CONTENT (Below the fold) -->
  <section>
    <!-- Expandable details -->
  </section>
</article>
```

### Bilingual Content (Hindi + English)
Always include both:
```astro
<p>
  <strong>Tithi:</strong> {data.tithi.nameHindi} ({data.tithi.nameEnglish})
</p>
<!-- Output: Tithi: शुक्ल षष्ठी (Shukla Shashthi) -->
```

### Time Elements
Always use semantic `<time>` with ISO datetime:
```astro
<time datetime="2026-02-03T07:05:00+05:30">07:05 AM IST</time>
```

### Technical Terms with Definitions
Use `<dfn>` for glossary terms:
```astro
<p>
  <dfn data-term="tithi">Tithi</dfn> (तिथि) is a lunar day in the Hindu calendar.
</p>
```

---

## JSON-LD Schema Requirements

### Every Page Must Include
```astro
---
import SEO from '@/components/SEO.astro';
---

<SEO
  title="Today's Panchang for Mumbai"
  description="Shukla Shashthi tithi, Rohini nakshatra..."
  schema={{
    "@type": "Dataset",  // or "Event", "Article", "FAQPage"
    "name": "Panchang for Mumbai - 3 February 2026",
    // ... full schema
  }}
  breadcrumbs={[
    { name: "Home", url: "/" },
    { name: "Panchang", url: "/panchang" },
    { name: "Mumbai", url: "/panchang/mumbai" },
  ]}
/>
```

### Schema Types by Page
| Page Type | Primary Schema | Required Properties |
|-----------|---------------|---------------------|
| Panchang | `Dataset` | name, datePublished, spatialCoverage |
| Festival | `Event` | name, startDate, location |
| Rashifal | `Article` | headline, datePublished, author |
| Muhurat | `Dataset` | name, temporalCoverage |
| Hub Pages | `WebPage` | name, description |

---

## CSS/Styling Conventions

### Use DaisyUI Components
```astro
<!-- Card -->
<div class="card bg-base-100 shadow-sm">
  <div class="card-body">
    <!-- Content -->
  </div>
</div>

<!-- Button -->
<button class="btn btn-primary">View Details</button>

<!-- Bottom Nav (Mobile) -->
<div class="btm-nav btm-nav-sm">
  <button class="active">
    <svg>...</svg>
    <span class="btm-nav-label">Home</span>
  </button>
</div>
```

### Responsive Classes (Mobile-First)
```astro
<!-- Mobile first, then larger screens -->
<div class="text-sm md:text-base lg:text-lg">
  <!-- Small on mobile, larger on desktop -->
</div>

<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
  <!-- 1 column on mobile, 2 on tablet, 3 on desktop -->
</div>
```

### Touch-Friendly Targets
```astro
<!-- Minimum 48px touch targets -->
<button class="btn min-h-12 min-w-12">
  <!-- Content -->
</button>
```

### Theme Colors
```css
/* Use theme tokens, not raw colors */
text-primary      /* #1E1B4B - Deep Indigo */
text-secondary    /* #FFB703 - Saffron Gold */
bg-base-100       /* #FDFCF6 - Warm Cream */
bg-base-200       /* #F5F4EF - Off-white */
```

---

## TypeScript Conventions

### Type Everything
```typescript
// src/lib/types.ts
export interface City {
  id: number;
  name: string;
  nameHindi: string;
  state: string;
  country: string;
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
  // ...
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

## Data Files Structure

### City Data
```json
// src/data/cities.json
[
  {
    "id": 1275339,
    "name": "Mumbai",
    "nameHindi": "मुंबई",
    "slug": "mumbai",
    "state": "Maharashtra",
    "country": "IN",
    "latitude": 19.0760,
    "longitude": 72.8777,
    "timezone": "Asia/Kolkata",
    "population": 12442373
  }
]
```

### Rashi Data
```json
// src/data/rashis.json
[
  {
    "id": 1,
    "name": "Aries",
    "nameHindi": "मेष",
    "slug": "mesh",
    "symbol": "♈",
    "element": "fire",
    "rulingPlanet": "Mars"
  }
]
```

---

## URL Conventions

### Patterns
```
/panchang                     # Hub page
/panchang/{city}              # City hub (e.g., /panchang/mumbai)
/panchang/{city}/today        # Today's panchang
/panchang/{city}/{month}-{year}  # Monthly archive

/rashifal                     # Hub page
/rashifal/{rashi}             # Rashi detail (e.g., /rashifal/mesh)
/rashifal/{rashi}/today       # Daily horoscope

/festivals                    # Calendar hub
/festivals/{slug}             # Festival detail (e.g., /festivals/diwali-2026)

/muhurat                      # Hub page
/muhurat/{type}               # Type hub (e.g., /muhurat/griha-pravesh)
/muhurat/{type}/{city}        # City-specific muhurat
```

### Slug Format
- Lowercase
- Hyphens for spaces
- No special characters
- Example: `griha-pravesh`, `ram-navami-2026`

---

## Internationalization (i18n)

### Language Structure
```
src/pages/
├── index.astro           # English (default)
├── panchang/
│   └── [city]/today.astro
└── hi/                   # Hindi
    ├── index.astro
    └── panchang/
        └── [city]/today.astro
```

### Translation Pattern
```astro
---
const lang = Astro.url.pathname.startsWith('/hi') ? 'hi' : 'en';

const t = {
  en: { title: "Today's Panchang" },
  hi: { title: "आज का पंचांग" }
}[lang];
---

<h1>{t.title}</h1>
```

---

## Do's and Don'ts

### DO
- Use semantic HTML (`<article>`, `<section>`, `<time>`)
- Include JSON-LD schema on every page
- Test on 375px mobile viewport
- Include both Hindi and English text
- Use DaisyUI components
- Keep page weight under 200KB

### DON'T
- Use client-side JavaScript for content
- Use inline styles (use Tailwind classes)
- Create desktop-first layouts
- Skip schema markup
- Use raw hex colors (use theme tokens)
- Forget breadcrumbs

---

## Testing Checklist

Before submitting any page:

- [ ] Mobile viewport (375px) looks correct
- [ ] Touch targets are 48px minimum
- [ ] JSON-LD schema is valid (use validator)
- [ ] Page weight is under 200KB
- [ ] Lighthouse mobile score is 90+
- [ ] Hindi text displays correctly
- [ ] Quick answer is in first 120 words
- [ ] All times use `<time>` element
- [ ] Breadcrumbs are present
