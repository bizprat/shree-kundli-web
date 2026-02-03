# User Personas

This document defines the primary user personas for Shree Kundli Astro based on market research and competitor traffic analysis (DrikPanchang: 12.6M monthly users).

---

## Traffic Demographics

| Metric | Value | Source |
|--------|-------|--------|
| **Mobile Users** | **82%** | SimilarWeb Dec 2025 |
| Desktop Users | 18% | SimilarWeb Dec 2025 |
| India Traffic | 83% | Geographic distribution |
| USA (NRI) | 8% | Secondary market |
| Avg Session | 2:37 | Engagement data |
| Pages/Visit | 2.96 | Internal linking works |

---

## Primary Persona: The Daily Devotee (60% of Traffic)

### Profile

| Attribute | Detail |
|-----------|--------|
| **Name** | Ravi Kumar / Sunita Sharma |
| **Age** | 28-45 years |
| **Location** | Tier 2/3 cities (Indore, Lucknow, Jaipur, Patna) |
| **Device** | Xiaomi/Samsung/Realme (₹10,000-15,000 range) |
| **Screen** | 6.0-6.5" HD+ (720x1600) |
| **Connection** | Jio/Airtel 4G (5-20 Mbps variable) |
| **Language** | Hindi preferred, comfortable with Hindi-English mix |

### Behavior Pattern

```
05:30 AM - Wake up, morning routine
06:00 AM - Check panchang before puja
06:30 AM - Quick rashifal glance
07:00 AM - Leave for work
```

**Session Duration**: 30-90 seconds
**Frequency**: Daily (habitual user)
**Entry Point**: Direct URL or "aaj ka panchang [city]" search

### Goals

1. Check today's tithi before morning puja
2. Know if today is auspicious (shubh/ashubh)
3. Rahu Kaal timing to avoid starting new work
4. Quick rashifal reading

### Search Keywords
- "aaj ka panchang"
- "today panchang delhi"
- "aaj ki tithi"
- "rahu kaal today"
- "आज का पंचांग"

### Pain Points with Competitors

| Pain Point | Impact | Our Solution |
|------------|--------|--------------|
| 10+ second load times | Abandonment | <2s LCP |
| Popup ads blocking content | Frustration | Minimal, non-intrusive ads |
| Tiny text on mobile | Can't read | 16px+ base font |
| Complex navigation | Lost users | Answer-first design |
| Desktop-first layouts | Broken UX | Mobile-first responsive |

### User Journey Map

```
1. AWARENESS
   └─ Google Search: "aaj ka panchang lucknow"

2. DISCOVERY
   └─ Sees search result with today's tithi in snippet

3. ARRIVAL
   └─ Lands on /panchang/lucknow/today
   └─ Sees quick answer: "आज की तिथि: शुक्ल षष्ठी"

4. ENGAGEMENT
   └─ Scrolls to see sunrise/sunset times
   └─ Checks Rahu Kaal timing

5. RETENTION
   └─ Bookmarks site for tomorrow
   └─ Visits rashifal section
```

### Design Implications

- **Answer in <3 seconds**: Tithi visible without scrolling
- **Large touch targets**: 48px minimum for all interactive elements
- **Hindi-first**: Primary content in Hindi, English in parentheses
- **Bottom navigation**: Thumb-accessible on large phones
- **Offline capable**: PWA caches last visited city

---

## Secondary Persona: The Event Planner (25% of Traffic)

### Profile

| Attribute | Detail |
|-----------|--------|
| **Name** | Sharma Family / Mehta Parivaar |
| **Age** | 35-55 years (parents planning events) |
| **Location** | Mix of metros and Tier 2 cities |
| **Device** | Mix of mobile and desktop |
| **Context** | Planning wedding, griha pravesh, mundan |
| **Language** | Bilingual (Hindi + English) |

### Behavior Pattern

```
2-4 weeks before event:
- Research muhurat dates
- Compare multiple sources
- Consult with pandit

1 week before:
- Confirm final timing
- Check for any conflicts
- Share with family
```

**Session Duration**: 5-15 minutes
**Frequency**: Occasional (event-driven)
**Entry Point**: "vivah muhurat 2026" or "griha pravesh shubh din"

### Goals

1. Find auspicious dates for specific ceremonies
2. Kundli matching for marriage
3. Understand muhurat timing in detail
4. Share dates with family members

### Search Keywords
- "vivah muhurat 2026"
- "griha pravesh shubh din february"
- "kundli milan online free"
- "mundan muhurat 2026"
- "shubh vivah dates"

### Pain Points

| Pain Point | Impact | Our Solution |
|------------|--------|--------------|
| Scattered information | Multiple site visits | Comprehensive muhurat pages |
| No explanation of timings | Confusion | Tooltip explanations |
| Can't share easily | Friction | Shareable URLs with date info |
| Too technical | Intimidating | Beginner-friendly language |

### User Journey Map

```
1. TRIGGER
   └─ Family decides on griha pravesh

2. RESEARCH
   └─ Google: "griha pravesh muhurat march 2026 delhi"

3. COMPARISON
   └─ Visits 2-3 sites to verify dates

4. DECISION
   └─ Selects date based on family availability + muhurat

5. SHARING
   └─ Shares link/screenshot with family WhatsApp group

6. RETURN
   └─ Comes back to check Rahu Kaal on event day
```

### Design Implications

- **Calendar view**: Visual date picker for muhurat
- **Detailed explanations**: Why this date is auspicious
- **Comparison feature**: Multiple dates side-by-side
- **Share functionality**: WhatsApp/copy link buttons
- **Print-friendly**: Clean print stylesheet for pandit

---

## Tertiary Persona: The Curious Millennial (10% of Traffic)

### Profile

| Attribute | Detail |
|-----------|--------|
| **Name** | Priya / Arjun |
| **Age** | 18-28 years |
| **Location** | Metro cities (Mumbai, Bangalore, Delhi NCR) |
| **Device** | iPhone / Flagship Android |
| **Context** | Casual interest, social sharing |
| **Language** | English preferred |

### Behavior Pattern

```
Random times:
- Bored scrolling, checks horoscope
- Friend mentions Mercury retrograde
- Sees astrology meme, wants to learn more
```

**Session Duration**: 2-5 minutes
**Frequency**: Weekly/Monthly (casual)
**Entry Point**: "leo horoscope today" or social media link

### Goals

1. Quick, entertaining horoscope reading
2. Share interesting content on social media
3. Learn basics of astrology (casually)
4. Check compatibility with crush/partner

### Search Keywords
- "aries horoscope today"
- "leo love horoscope"
- "mercury retrograde 2026"
- "zodiac compatibility"
- "what is my moon sign"

### Pain Points

| Pain Point | Impact | Our Solution |
|------------|--------|--------------|
| Ugly, dated designs | Won't share | Modern, aesthetic UI |
| Too serious/religious | Off-putting | Light, accessible tone |
| No English content | Language barrier | Full English support |
| No social sharing | Missed viral potential | Instagram-ready cards |

### Design Implications

- **Modern aesthetic**: Clean, Instagram-worthy design
- **English-first**: For this segment
- **Shareable cards**: Visual content for social media
- **Gamification**: Compatibility scores, personality traits
- **Educational tooltips**: "What is a nakshatra?" explanations

---

## Quarterly Persona: The Festival Seeker (Seasonal Spikes)

### Profile

| Attribute | Detail |
|-----------|--------|
| **Name** | Everyone (all demographics) |
| **Trigger** | Major Hindu festivals |
| **Timing** | 2-4 weeks before festival |

### Traffic Spikes by Festival

| Festival | Month | Traffic Spike |
|----------|-------|---------------|
| Diwali | Oct-Nov | **500-600%** |
| Holi | Mar | 300-400% |
| Navratri | Sep-Oct | 300-400% |
| Makar Sankranti | Jan | 200-300% |
| Raksha Bandhan | Aug | 200-300% |
| **Solar/Lunar Eclipse** | Variable | **1000-2000%** |

### Goals

1. Exact puja timing (muhurat)
2. Festival date in their city
3. Puja vidhi (ritual steps)
4. Festival-specific mantras

### Search Keywords (Diwali Example)
- "diwali 2026 date"
- "lakshmi puja timing"
- "diwali muhurat 2026 mumbai"
- "diwali puja vidhi"
- "दीपावली 2026"

### Design Implications

- **Festival landing pages**: Created 30 days before
- **City-specific timing**: Exact muhurat for top 50 cities
- **Puja guides**: Step-by-step ritual instructions
- **YouTube embeds**: Video guides (46% outgoing traffic goes to YouTube)
- **Countdown timers**: Days/hours until festival

---

## NRI Persona: The Diaspora User (8% of Traffic)

### Profile

| Attribute | Detail |
|-----------|--------|
| **Name** | Raj / Meera (US/UK/Canada/Australia) |
| **Age** | 30-50 years |
| **Location** | Major cities in US, UK, Canada, Australia |
| **Device** | iPhone / Modern Android |
| **Context** | Maintaining cultural connection |
| **Language** | English primary, Hindi secondary |

### Unique Needs

1. **Timezone conversion**: IST to local time
2. **Different sunset times**: Puja timing varies
3. **Festival dates in local time**: When to celebrate
4. **Cultural connection**: Feeling close to India

### Search Keywords
- "panchang new york"
- "diwali time usa 2026"
- "hindu calendar toronto"
- "rahu kaal london today"

### Design Implications

- **Timezone selector**: Auto-detect or manual selection
- **City coverage**: Major international cities
- **Time conversion**: Show IST and local time
- **Language toggle**: Easy English/Hindi switch

---

## Device & Technical Constraints

### Primary Device: Budget Android

```
Brand: Xiaomi, Samsung M-series, Realme, Vivo
Price: ₹10,000-15,000
Screen: 6.0-6.5" HD+ (720x1600)
RAM: 3-4GB
Storage: 32-64GB
OS: Android 11-13
Browser: Chrome (default)
```

### Network Conditions

| Condition | Speed | Occurrence |
|-----------|-------|------------|
| Good 4G | 10-20 Mbps | 40% |
| Average 4G | 5-10 Mbps | 40% |
| Poor 4G/3G | 1-5 Mbps | 15% |
| 2G/Edge | <1 Mbps | 5% |

### Performance Targets

| Metric | Target | Reason |
|--------|--------|--------|
| LCP | <2.0s | Budget device on 4G |
| FID | <100ms | Smooth interactions |
| CLS | <0.1 | No layout shifts |
| Total Page Size | <200KB | Fast on slow networks |
| Time to Answer | <3s | User finds tithi |

---

## Content Preferences by Persona

| Persona | Content Priority | Format | Tone |
|---------|-----------------|--------|------|
| Daily Devotee | Panchang, Rahu Kaal | Quick facts, tables | Respectful, traditional |
| Event Planner | Muhurat, Matching | Detailed guides, calendars | Informative, trustworthy |
| Curious Millennial | Rashifal, Compatibility | Cards, visuals | Light, fun, modern |
| Festival Seeker | Timing, Vidhi | Step-by-step, videos | Devotional, helpful |
| NRI User | Timezone, Calendar | Converted times | Clear, practical |

---

## Summary: Design Priorities

### Must Have (All Personas)

1. **Fast loading** (<2s on 4G)
2. **Mobile-first layout**
3. **Answer-first content**
4. **Hindi + English bilingual**
5. **Large, readable typography**
6. **Minimal, non-intrusive ads**

### Nice to Have

1. PWA offline support
2. Push notifications for daily panchang
3. City remembrance (cookie/localStorage)
4. Dark mode support
5. Voice search optimization

### Persona Priority for MVP

1. **Daily Devotee** (60%) - Core experience
2. **Festival Seeker** (seasonal) - Traffic spikes
3. **Event Planner** (25%) - Engagement
4. **Curious Millennial** (10%) - Growth
5. **NRI User** (8%) - Secondary market
