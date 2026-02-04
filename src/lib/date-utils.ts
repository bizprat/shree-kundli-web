/**
 * Date Utilities
 *
 * Helper functions for date formatting and manipulation.
 * Supports both English and Hindi locales.
 */

/**
 * Default timezone for India
 */
export const DEFAULT_TIMEZONE = 'Asia/Kolkata';

/**
 * Get today's date in ISO format (YYYY-MM-DD)
 */
export function getTodayISO(timezone: string = DEFAULT_TIMEZONE): string {
  return new Date().toLocaleDateString('en-CA', { timeZone: timezone });
}

/**
 * Get current datetime in ISO format for a timezone
 */
export function getNowISO(timezone: string = DEFAULT_TIMEZONE): string {
  const now = new Date();
  const offset = getTimezoneOffset(timezone);
  const localTime = new Date(now.getTime() + offset * 60 * 60 * 1000);
  return localTime.toISOString().slice(0, 19);
}

/**
 * Get timezone offset in hours
 */
function getTimezoneOffset(timezone: string): number {
  // For IST (Asia/Kolkata), offset is +5:30
  if (timezone === 'Asia/Kolkata') return 5.5;

  // For other timezones, try to calculate
  const now = new Date();
  const utc = now.toLocaleString('en-US', { timeZone: 'UTC' });
  const local = now.toLocaleString('en-US', { timeZone: timezone });
  return (new Date(local).getTime() - new Date(utc).getTime()) / (1000 * 60 * 60);
}

/**
 * Format date for display (locale-aware)
 */
export function formatDateDisplay(
  date: Date | string,
  locale: 'en' | 'hi' = 'en',
  options?: Intl.DateTimeFormatOptions
): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  const defaultOptions: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  };

  return d.toLocaleDateString(
    locale === 'hi' ? 'hi-IN' : 'en-IN',
    options || defaultOptions
  );
}

/**
 * Format date short (e.g., "4 Feb 2026")
 */
export function formatDateShort(
  date: Date | string,
  locale: 'en' | 'hi' = 'en'
): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleDateString(locale === 'hi' ? 'hi-IN' : 'en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

/**
 * Format date compact (e.g., "Feb 4")
 */
export function formatDateCompact(
  date: Date | string,
  locale: 'en' | 'hi' = 'en'
): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleDateString(locale === 'hi' ? 'hi-IN' : 'en-IN', {
    day: 'numeric',
    month: 'short',
  });
}

/**
 * Format time for display (12-hour format with AM/PM)
 */
export function formatTime(
  time: string | Date,
  locale: 'en' | 'hi' = 'en'
): string {
  if (typeof time === 'string') {
    // If already formatted (e.g., "07:05 AM"), return as-is
    if (time.includes('AM') || time.includes('PM')) return time;

    // Parse ISO time
    const [hours, minutes] = time.split(':').map(Number);
    const period = hours >= 12 ? 'PM' : 'AM';
    const displayHours = hours % 12 || 12;
    return `${displayHours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')} ${period}`;
  }

  return time.toLocaleTimeString(locale === 'hi' ? 'hi-IN' : 'en-IN', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });
}

/**
 * Format time range (e.g., "07:30 AM - 09:00 AM")
 */
export function formatTimeRange(
  start: string,
  end: string
): string {
  return `${formatTime(start)} - ${formatTime(end)}`;
}

/**
 * Get relative time description
 */
export function getRelativeTime(targetDate: Date | string): string {
  const target = typeof targetDate === 'string' ? new Date(targetDate) : targetDate;
  const now = new Date();

  // Reset to start of day for comparison
  const targetDay = new Date(target.getFullYear(), target.getMonth(), target.getDate());
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  const diffTime = targetDay.getTime() - today.getTime();
  const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Tomorrow';
  if (diffDays === -1) return 'Yesterday';
  if (diffDays > 0 && diffDays <= 7) return `In ${diffDays} days`;
  if (diffDays < 0 && diffDays >= -7) return `${Math.abs(diffDays)} days ago`;
  if (diffDays > 0) return formatDateShort(target);
  return formatDateShort(target);
}

/**
 * Get Hindi relative time description
 */
export function getRelativeTimeHindi(targetDate: Date | string): string {
  const target = typeof targetDate === 'string' ? new Date(targetDate) : targetDate;
  const now = new Date();

  const targetDay = new Date(target.getFullYear(), target.getMonth(), target.getDate());
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  const diffTime = targetDay.getTime() - today.getTime();
  const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return 'आज';
  if (diffDays === 1) return 'कल';
  if (diffDays === -1) return 'बीता कल';
  if (diffDays > 0 && diffDays <= 7) return `${diffDays} दिन बाद`;
  if (diffDays < 0 && diffDays >= -7) return `${Math.abs(diffDays)} दिन पहले`;
  return formatDateShort(target, 'hi');
}

/**
 * Parse ISO date string to Date object
 */
export function parseISODate(isoString: string): Date {
  return new Date(isoString);
}

/**
 * Get the start of today in a timezone
 */
export function getStartOfDay(timezone: string = DEFAULT_TIMEZONE): Date {
  const now = new Date();
  const dateStr = now.toLocaleDateString('en-CA', { timeZone: timezone });
  return new Date(`${dateStr}T00:00:00`);
}

/**
 * Get the end of today in a timezone
 */
export function getEndOfDay(timezone: string = DEFAULT_TIMEZONE): Date {
  const now = new Date();
  const dateStr = now.toLocaleDateString('en-CA', { timeZone: timezone });
  return new Date(`${dateStr}T23:59:59`);
}

/**
 * Check if a time falls within a range (handles overnight ranges)
 */
export function isTimeInRange(
  currentTime: string,
  startTime: string,
  endTime: string
): boolean {
  const parseMinutes = (time: string): number => {
    const [hourMin, period] = time.split(' ');
    let [hours, minutes] = hourMin.split(':').map(Number);
    if (period === 'PM' && hours !== 12) hours += 12;
    if (period === 'AM' && hours === 12) hours = 0;
    return hours * 60 + minutes;
  };

  const current = parseMinutes(currentTime);
  const start = parseMinutes(startTime);
  const end = parseMinutes(endTime);

  // Handle overnight ranges (e.g., 10:00 PM - 6:00 AM)
  if (start > end) {
    return current >= start || current <= end;
  }

  return current >= start && current <= end;
}

/**
 * Get weekday name
 */
export function getWeekdayName(
  date: Date | string,
  locale: 'en' | 'hi' = 'en'
): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleDateString(locale === 'hi' ? 'hi-IN' : 'en-IN', {
    weekday: 'long',
  });
}

/**
 * Get weekday index (0 = Sunday, 1 = Monday, etc.)
 */
export function getWeekdayIndex(date: Date | string): number {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.getDay();
}

/**
 * Add days to a date
 */
export function addDays(date: Date | string, days: number): Date {
  const d = typeof date === 'string' ? new Date(date) : new Date(date);
  d.setDate(d.getDate() + days);
  return d;
}

/**
 * Get array of dates for a month
 */
export function getMonthDates(year: number, month: number): Date[] {
  const dates: Date[] = [];
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);

  for (let day = firstDay; day <= lastDay; day = addDays(day, 1)) {
    dates.push(new Date(day));
  }

  return dates;
}

/**
 * Check if two dates are the same day
 */
export function isSameDay(date1: Date | string, date2: Date | string): boolean {
  const d1 = typeof date1 === 'string' ? new Date(date1) : date1;
  const d2 = typeof date2 === 'string' ? new Date(date2) : date2;

  return (
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate()
  );
}

/**
 * Check if a date is today
 */
export function isToday(date: Date | string, timezone: string = DEFAULT_TIMEZONE): boolean {
  const d = typeof date === 'string' ? new Date(date) : date;
  const todayStr = getTodayISO(timezone);
  const dateStr = d.toLocaleDateString('en-CA', { timeZone: timezone });
  return todayStr === dateStr;
}

/**
 * Check if a date is in the future
 */
export function isFuture(date: Date | string): boolean {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.getTime() > Date.now();
}

/**
 * Check if a date is in the past
 */
export function isPast(date: Date | string): boolean {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.getTime() < Date.now();
}
