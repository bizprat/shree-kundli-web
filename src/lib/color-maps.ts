/**
 * Shared color maps for Panchang entity pages.
 *
 * Centralizes Tailwind class mappings used across index + detail pages
 * for each entity type (rashifal, tithi, yoga, karana, vara, nakshatra).
 */

// =============================================================================
// ELEMENT (TATVA) — used in rashifal pages
// =============================================================================

/** Text color by element (lowercase keys matching rashis.json) */
export const elementColors: Record<string, string> = {
  fire: 'text-orange-500',
  earth: 'text-green-600',
  air: 'text-info',
  water: 'text-secondary',
};

/** Background + border by element (lowercase keys) */
export const elementBg: Record<string, string> = {
  fire: 'bg-orange-500/10 border-orange-500/20',
  earth: 'bg-green-600/10 border-green-600/20',
  air: 'bg-info/10 border-info/20',
  water: 'bg-secondary/10 border-secondary/20',
};

// =============================================================================
// ELEMENT ICONS — used across tithi, karana, nakshatra pages
// =============================================================================

export const elementIcons: Record<string, string> = {
  Fire: '🔥',
  Earth: '🌍',
  Air: '💨',
  Water: '💧',
};

// =============================================================================
// TITHI NATURE — keys match tithis.json "nature" field
// =============================================================================

export const tithiNatureColors: Record<string, string> = {
  'Nanda (Joy)': 'bg-green-500/10 text-green-600 border-green-500/20',
  'Bhadra (Auspicious)': 'bg-info/10 text-info border-info/20',
  'Jaya (Victory)': 'bg-purple-500/10 text-purple-600 border-purple-500/20',
  'Rikta (Empty)': 'bg-red-500/10 text-red-600 border-red-500/20',
  'Purna (Full)': 'bg-amber-500/10 text-amber-600 border-amber-500/20',
  'Purna (Full/Complete)': 'bg-amber-500/10 text-amber-600 border-amber-500/20',
  'Nanda (Joy for ancestors)': 'bg-slate-500/10 text-slate-600 border-slate-500/20',
};

// =============================================================================
// YOGA NATURE — keys match yogas.json "nature" field
// =============================================================================

export const yogaNatureColors: Record<string, string> = {
  'Highly Auspicious': 'bg-green-500/20 text-green-700 border-green-500/30',
  'Auspicious': 'bg-green-500/10 text-green-600 border-green-500/20',
  'Mixed': 'bg-amber-500/10 text-amber-600 border-amber-500/20',
  'Inauspicious': 'bg-red-500/10 text-red-600 border-red-500/20',
  'Highly Inauspicious': 'bg-red-500/20 text-red-700 border-red-500/30',
};

// =============================================================================
// KARANA NATURE — keys match karanas.json "nature" field
// =============================================================================

export const karanaNatureColors: Record<string, string> = {
  'Auspicious': 'bg-green-500/10 text-green-600 border-green-500/20',
  'Mixed': 'bg-amber-500/10 text-amber-600 border-amber-500/20',
  'Inauspicious': 'bg-red-500/10 text-red-600 border-red-500/20',
};

// =============================================================================
// CATEGORY / TYPE — used in yoga + karana pages (Sthira/Chara/Ugra)
// =============================================================================

export const categoryColors: Record<string, string> = {
  'Sthira': 'bg-info/10 text-info border-info/20',
  'Chara': 'bg-purple-500/10 text-purple-600 border-purple-500/20',
  'Ugra': 'bg-red-500/10 text-red-600 border-red-500/20',
};

// =============================================================================
// PLANET (GRAHA) — used in vara + nakshatra pages (all 9 grahas)
// =============================================================================

export const planetColors: Record<string, string> = {
  Sun: 'bg-orange-500/10 text-orange-600 border-orange-500/20',
  Moon: 'bg-slate-500/10 text-slate-600 border-slate-500/20',
  Mars: 'bg-red-500/10 text-red-600 border-red-500/20',
  Mercury: 'bg-green-500/10 text-green-600 border-green-500/20',
  Jupiter: 'bg-yellow-500/10 text-yellow-600 border-yellow-500/20',
  Venus: 'bg-pink-500/10 text-pink-600 border-pink-500/20',
  Saturn: 'bg-info/10 text-info border-info/20',
  Rahu: 'bg-purple-500/10 text-purple-600 border-purple-500/20',
  Ketu: 'bg-amber-500/10 text-amber-600 border-amber-500/20',
};

export const planetSymbols: Record<string, string> = {
  Sun: '☀️',
  Moon: '🌙',
  Mars: '♂️',
  Mercury: '☿️',
  Jupiter: '♃',
  Venus: '♀️',
  Saturn: '♄',
};
