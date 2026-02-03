# Design System: Premium Spiritual

A comprehensive design system for Shree Kundli Astro optimized for 82% mobile users on budget Android devices.

---

## Design Philosophy

**"Calm, Sacred, Tech-Forward"**

| Principle | Implementation |
|-----------|----------------|
| **Calm** | Soft colors, ample whitespace, no visual clutter |
| **Sacred** | Traditional serif headings, saffron accents, spiritual imagery |
| **Tech-Forward** | Modern sans-serif body, clean data tables, fast performance |

---

## Mobile-First Fundamentals

### Device Targets

| Device Class | Screen | Priority |
|--------------|--------|----------|
| **Budget Android** | 375px (iPhone SE) / 360px (Android) | Primary |
| Tablet | 768px | Secondary |
| Desktop | 1024px+ | Tertiary |

### Touch Targets (Critical)

```css
/* Minimum 48px touch targets - Google recommendation */
.touch-target {
  min-height: 48px;  /* 12 in Tailwind */
  min-width: 48px;
  padding: 12px;     /* Comfortable tap area */
}

/* Spacing between targets */
.touch-spacing {
  gap: 8px;          /* Minimum 8px between tappable elements */
}
```

### Thumb Zone Layout

```
┌─────────────────────────────────────┐
│         HEADER (Minimal)            │  ← Easy reach
├─────────────────────────────────────┤
│                                     │
│                                     │
│        CONTENT AREA                 │  ← Natural reach
│        (Scrollable)                 │
│                                     │
│                                     │
├─────────────────────────────────────┤
│       BOTTOM NAV (Fixed)            │  ← Easy reach (thumb)
└─────────────────────────────────────┘
```

---

## Color System

### Theme Palette

| Token | Hex | RGB | Usage |
|-------|-----|-----|-------|
| `primary` | `#1E1B4B` | 30, 27, 75 | Deep Royal Indigo - Headers, nav, trust |
| `primary-content` | `#FFFFFF` | 255, 255, 255 | Text on primary |
| `secondary` | `#FFB703` | 255, 183, 3 | Saffron Gold - CTAs, highlights, auspicious |
| `secondary-content` | `#1E1B4B` | 30, 27, 75 | Text on secondary |
| `accent` | `#D97706` | 217, 119, 6 | Burnt Orange - Warnings, urgent |
| `base-100` | `#FDFCF6` | 253, 252, 246 | Warm Cream - Page background |
| `base-200` | `#F5F4EF` | 245, 244, 239 | Off-white - Card backgrounds |
| `base-300` | `#E8E7E2` | 232, 231, 226 | Light gray - Borders |
| `neutral` | `#3D4451` | 61, 68, 81 | Soft black - Body text |
| `neutral-content` | `#FFFFFF` | 255, 255, 255 | Text on neutral |

### Semantic Colors

| Purpose | Color | Token |
|---------|-------|-------|
| Auspicious/Good | Green | `success` |
| Caution/Warning | Orange | `warning` |
| Inauspicious/Avoid | Red | `error` |
| Information | Blue | `info` |

### Color Usage Rules

```astro
<!-- DO: Use semantic tokens -->
<div class="bg-base-100 text-neutral">
  <h1 class="text-primary">Title</h1>
  <button class="btn btn-secondary">CTA</button>
</div>

<!-- DON'T: Use raw hex values -->
<div style="background: #FDFCF6; color: #3D4451;">
```

---

## Typography

### Font Stack

| Purpose | Font | Fallback | Usage |
|---------|------|----------|-------|
| **Headings** | Cinzel Decorative | Playfair Display, serif | Page titles, section headers |
| **Body** | Outfit | Inter, system-ui, sans-serif | Paragraphs, data, navigation |
| **Hindi** | Tiro Devanagari Hindi | Noto Sans Devanagari | All Hindi text |
| **Monospace** | JetBrains Mono | monospace | Times, codes |

### Type Scale (Mobile-First)

| Class | Mobile | Tablet (md) | Desktop (lg) | Usage |
|-------|--------|-------------|--------------|-------|
| `text-xs` | 12px | 12px | 12px | Captions, meta |
| `text-sm` | 14px | 14px | 14px | Secondary text |
| `text-base` | 16px | 16px | 16px | Body text (default) |
| `text-lg` | 18px | 18px | 20px | Lead paragraphs |
| `text-xl` | 20px | 22px | 24px | Card titles |
| `text-2xl` | 24px | 28px | 32px | Section headers |
| `text-3xl` | 30px | 36px | 42px | Page titles |
| `text-4xl` | 36px | 48px | 56px | Hero titles |

### Typography Examples

```astro
<!-- Page Title -->
<h1 class="font-heading text-3xl md:text-4xl text-primary font-bold">
  आज का पंचांग
</h1>

<!-- Section Header -->
<h2 class="font-heading text-2xl text-primary">
  Today's Tithi
</h2>

<!-- Body Text -->
<p class="font-body text-base text-neutral leading-relaxed">
  शुक्ल पक्ष षष्ठी (Shukla Shashthi)
</p>

<!-- Data/Numbers -->
<span class="font-body text-lg tabular-nums">
  07:05 AM
</span>

<!-- Hindi with English -->
<p class="font-body">
  <span class="font-hindi">तिथि</span> (Tithi): षष्ठी
</p>
```

### Line Height

| Content Type | Line Height | Class |
|--------------|-------------|-------|
| Headings | 1.2 | `leading-tight` |
| Body text | 1.6 | `leading-relaxed` |
| Data tables | 1.4 | `leading-normal` |

---

## Spacing System

### Base Unit: 4px

| Token | Value | Usage |
|-------|-------|-------|
| `1` | 4px | Tight spacing |
| `2` | 8px | Default gap |
| `3` | 12px | Component padding |
| `4` | 16px | Card padding |
| `6` | 24px | Section spacing |
| `8` | 32px | Large sections |
| `12` | 48px | Page margins |

### Mobile Spacing Pattern

```astro
<!-- Page Container -->
<main class="px-4 py-6 max-w-4xl mx-auto">

  <!-- Section Spacing -->
  <section class="mb-8">

    <!-- Card Padding -->
    <div class="card p-4">

      <!-- Content Gap -->
      <div class="space-y-3">
        <!-- Items -->
      </div>
    </div>
  </section>
</main>
```

---

## Component Library

### Cards

#### Standard Card
```astro
<div class="card bg-base-100 shadow-sm">
  <div class="card-body p-4">
    <h2 class="card-title text-xl text-primary">Card Title</h2>
    <p class="text-neutral">Card content here...</p>
  </div>
</div>
```

#### Glassmorphism Card (Premium)
```astro
<div class="card bg-base-100/80 backdrop-blur-sm border border-secondary/20 shadow-sm">
  <div class="card-body p-4">
    <!-- Content -->
  </div>
</div>
```

#### Panchang Data Card
```astro
<article class="card bg-base-100 shadow-sm" itemscope itemtype="https://schema.org/Dataset">
  <div class="card-body p-4">
    <!-- Quick Answer -->
    <div class="quick-answer mb-4">
      <h2 class="text-2xl font-heading text-primary mb-2">
        आज की तिथि
      </h2>
      <p class="text-3xl font-bold text-secondary">
        शुक्ल षष्ठी
      </p>
      <p class="text-sm text-neutral/70">
        (Shukla Shashthi)
      </p>
    </div>

    <!-- Data Table -->
    <table class="table table-sm">
      <tbody>
        <tr>
          <td class="font-medium">Nakshatra</td>
          <td>रोहिणी (Rohini)</td>
        </tr>
        <tr>
          <td class="font-medium">Yoga</td>
          <td>शूल (Shool)</td>
        </tr>
      </tbody>
    </table>
  </div>
</article>
```

### Buttons

#### Size Variants
```astro
<!-- Standard (48px height for touch) -->
<button class="btn btn-primary min-h-12">Primary</button>
<button class="btn btn-secondary min-h-12">Secondary</button>
<button class="btn btn-ghost min-h-12">Ghost</button>

<!-- Small (for dense UIs) -->
<button class="btn btn-primary btn-sm">Small</button>
```

#### Button States
```astro
<!-- Active -->
<button class="btn btn-primary">Normal</button>

<!-- Loading -->
<button class="btn btn-primary">
  <span class="loading loading-spinner loading-sm"></span>
  Loading
</button>

<!-- Disabled -->
<button class="btn btn-primary" disabled>Disabled</button>
```

### Navigation

#### Bottom Navigation (Mobile)
```astro
<nav class="btm-nav btm-nav-sm md:hidden bg-base-100 border-t border-base-300">
  <a href="/" class="active text-primary">
    <svg class="w-5 h-5"><!-- Home icon --></svg>
    <span class="btm-nav-label text-xs">Home</span>
  </a>
  <a href="/panchang" class="text-neutral">
    <svg class="w-5 h-5"><!-- Calendar icon --></svg>
    <span class="btm-nav-label text-xs">Panchang</span>
  </a>
  <a href="/rashifal" class="text-neutral">
    <svg class="w-5 h-5"><!-- Star icon --></svg>
    <span class="btm-nav-label text-xs">Rashifal</span>
  </a>
  <a href="/more" class="text-neutral">
    <svg class="w-5 h-5"><!-- Menu icon --></svg>
    <span class="btm-nav-label text-xs">More</span>
  </a>
</nav>
```

#### Header (Desktop)
```astro
<header class="navbar bg-primary text-primary-content sticky top-0 z-50">
  <div class="navbar-start">
    <a href="/" class="btn btn-ghost text-xl font-heading">
      श्री कुंडली
    </a>
  </div>
  <div class="navbar-center hidden md:flex">
    <ul class="menu menu-horizontal px-1">
      <li><a href="/panchang">Panchang</a></li>
      <li><a href="/rashifal">Rashifal</a></li>
      <li><a href="/muhurat">Muhurat</a></li>
      <li><a href="/festivals">Festivals</a></li>
    </ul>
  </div>
  <div class="navbar-end">
    <!-- City selector, language toggle -->
  </div>
</header>
```

### Breadcrumbs
```astro
<nav class="breadcrumbs text-sm mb-4" aria-label="Breadcrumb">
  <ul itemscope itemtype="https://schema.org/BreadcrumbList">
    <li itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem">
      <a href="/" itemprop="item">
        <span itemprop="name">Home</span>
      </a>
      <meta itemprop="position" content="1" />
    </li>
    <li itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem">
      <a href="/panchang" itemprop="item">
        <span itemprop="name">Panchang</span>
      </a>
      <meta itemprop="position" content="2" />
    </li>
    <li itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem">
      <span itemprop="name">Mumbai</span>
      <meta itemprop="position" content="3" />
    </li>
  </ul>
</nav>
```

### Data Tables
```astro
<div class="overflow-x-auto">
  <table class="table table-sm">
    <thead>
      <tr class="bg-base-200">
        <th class="text-primary">Element</th>
        <th class="text-primary">Value</th>
        <th class="text-primary">Time</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td class="font-medium">Sunrise</td>
        <td>07:05 AM</td>
        <td><time datetime="2026-02-03T07:05:00+05:30">IST</time></td>
      </tr>
      <tr>
        <td class="font-medium">Sunset</td>
        <td>18:32 PM</td>
        <td><time datetime="2026-02-03T18:32:00+05:30">IST</time></td>
      </tr>
    </tbody>
  </table>
</div>
```

---

## Layout Patterns

### Page Layout
```astro
<Layout>
  <!-- Sticky Header -->
  <Header />

  <!-- Main Content -->
  <main class="min-h-screen pb-20 md:pb-8">
    <!-- Breadcrumbs -->
    <Breadcrumb items={breadcrumbs} />

    <!-- Page Content -->
    <div class="container mx-auto px-4 py-6 max-w-4xl">
      <slot />
    </div>
  </main>

  <!-- Mobile Bottom Nav (padding accounted in main) -->
  <BottomNav class="md:hidden" />

  <!-- Desktop Footer -->
  <Footer class="hidden md:block" />
</Layout>
```

### Responsive Grid
```astro
<!-- 1 col mobile → 2 col tablet → 3 col desktop -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  <Card />
  <Card />
  <Card />
</div>

<!-- 1 col mobile → 2 col tablet (max) -->
<div class="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl">
  <Card />
  <Card />
</div>
```

### Content Stack
```astro
<!-- Vertical stack with consistent spacing -->
<div class="space-y-6">
  <section><!-- Section 1 --></section>
  <section><!-- Section 2 --></section>
  <section><!-- Section 3 --></section>
</div>
```

---

## Responsive Breakpoints

| Breakpoint | Width | Usage |
|------------|-------|-------|
| Default | 0-639px | Mobile phones (primary) |
| `sm:` | 640px+ | Large phones |
| `md:` | 768px+ | Tablets |
| `lg:` | 1024px+ | Laptops |
| `xl:` | 1280px+ | Desktops |

### Example Usage
```astro
<div class="
  text-sm md:text-base lg:text-lg
  px-4 md:px-6 lg:px-8
  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3
">
```

---

## Accessibility

### Color Contrast

| Combination | Ratio | WCAG |
|-------------|-------|------|
| `neutral` on `base-100` | 7.2:1 | AAA |
| `primary` on `base-100` | 12.8:1 | AAA |
| `primary-content` on `primary` | 12.8:1 | AAA |
| `secondary-content` on `secondary` | 8.5:1 | AAA |

### Focus States
```astro
<!-- All interactive elements need visible focus -->
<button class="btn btn-primary focus:ring-2 focus:ring-secondary focus:ring-offset-2">
  Click me
</button>
```

### Screen Reader Support
```astro
<!-- Use aria-labels for icon buttons -->
<button aria-label="Open menu" class="btn btn-ghost">
  <svg><!-- Menu icon --></svg>
</button>

<!-- Use semantic landmarks -->
<main role="main">
<nav aria-label="Main navigation">
<aside aria-label="Related content">
```

---

## Performance Guidelines

### Image Optimization
```astro
---
import { Image } from 'astro:assets';
import heroImage from '../assets/hero.webp';
---

<!-- Always use astro:assets -->
<Image
  src={heroImage}
  alt="Panchang calendar"
  width={400}
  height={300}
  loading="lazy"
  decoding="async"
/>
```

### Font Loading
```html
<!-- Preload critical fonts -->
<link rel="preload" href="/fonts/outfit-variable.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="/fonts/tiro-devanagari.woff2" as="font" type="font/woff2" crossorigin>
```

### Critical CSS
- Inline above-the-fold styles
- Defer non-critical CSS
- Use `@layer` for organization

---

## Icon System

### SVG Icons (Inline)
```astro
<!-- Use inline SVG for icons -->
<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
</svg>
```

### Icon Sizes
| Size | Class | Usage |
|------|-------|-------|
| 16px | `w-4 h-4` | Inline with text |
| 20px | `w-5 h-5` | Navigation, buttons |
| 24px | `w-6 h-6` | Standalone icons |
| 32px | `w-8 h-8` | Feature icons |

---

## Animation Guidelines

### Allowed Animations
```css
/* Subtle, purposeful animations only */
.transition-smooth {
  transition: all 0.2s ease-in-out;
}

/* Card hover lift */
.card-hover:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}
```

### Reduce Motion
```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation: none !important;
    transition: none !important;
  }
}
```

---

## Dark Mode (Future)

Reserve these tokens for dark mode implementation:

| Light Token | Dark Value |
|-------------|------------|
| `base-100` (#FDFCF6) | #1F2937 |
| `base-200` (#F5F4EF) | #111827 |
| `neutral` (#3D4451) | #F9FAFB |
| `primary` (#1E1B4B) | #818CF8 |

---

## Quick Reference

### Common Class Combinations

```astro
<!-- Page title -->
class="font-heading text-3xl md:text-4xl text-primary font-bold mb-6"

<!-- Section header -->
class="font-heading text-2xl text-primary mb-4"

<!-- Card -->
class="card bg-base-100 shadow-sm"

<!-- Card body -->
class="card-body p-4"

<!-- Touch-friendly button -->
class="btn btn-primary min-h-12"

<!-- Responsive grid -->
class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"

<!-- Container -->
class="container mx-auto px-4 max-w-4xl"

<!-- Text with Hindi -->
class="font-body text-base text-neutral"
```

### File Locations
```
src/styles/global.css    # Global styles, theme config
src/layouts/Layout.astro  # Base HTML, font loading
tailwind.config.mjs       # DaisyUI theme definition
```
