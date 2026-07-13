import { CONFERENCE_TIMEZONE } from '../config';
import type { Day, Session } from '../types';

/** Current wall-clock in the conference timezone as { date: 'YYYY-MM-DD', minutes } */
export interface ConferenceClock {
  date: string;
  minutes: number; // minutes since midnight
  hhmm: string;
}

const dtf = new Intl.DateTimeFormat('en-CA', {
  timeZone: CONFERENCE_TIMEZONE,
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
  hour12: false,
});

/** `?now=2026-07-15T09:30` lets organisers preview live behaviour. */
export function getSimulatedNow(): Date | null {
  // URLSearchParams decodes '+' as a space; the ISO format never contains
  // spaces, so restoring them keeps offsets like +07:00 working.
  const raw = new URLSearchParams(window.location.search).get('now')?.replaceAll(' ', '+');
  if (!raw) return null;
  // Interpret the override as conference-local time (+07:00).
  const parsed = new Date(raw.includes('+') || raw.endsWith('Z') ? raw : `${raw}:00+07:00`);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
}

export function conferenceClock(now: Date): ConferenceClock {
  const parts = Object.fromEntries(dtf.formatToParts(now).map((p) => [p.type, p.value]));
  const hhmm = `${parts.hour === '24' ? '00' : parts.hour}:${parts.minute}`;
  return {
    date: `${parts.year}-${parts.month}-${parts.day}`,
    minutes: toMinutes(hhmm),
    hhmm,
  };
}

export function toMinutes(hhmm: string): number {
  const [h, m] = hhmm.split(':').map(Number);
  return h * 60 + (m || 0);
}

export interface LiveStatus {
  liveIds: Set<string>;
  nextIds: Set<string>;
  nextStart: string | null;
  isConferenceDay: boolean;
}

/** Which sessions of `day` are live right now, and which start next. */
export function liveStatus(day: Day | undefined, sessions: Session[], clock: ConferenceClock): LiveStatus {
  const none: LiveStatus = { liveIds: new Set(), nextIds: new Set(), nextStart: null, isConferenceDay: false };
  if (!day || day.date !== clock.date) return none;

  const todays = sessions.filter((s) => s.day_id === day.id);
  const liveIds = new Set(
    todays
      .filter((s) => toMinutes(s.start_time) <= clock.minutes && clock.minutes < toMinutes(s.end_time))
      .map((s) => s.id),
  );
  const upcoming = todays
    .filter((s) => toMinutes(s.start_time) > clock.minutes)
    .sort((a, b) => toMinutes(a.start_time) - toMinutes(b.start_time));
  const nextStart = upcoming.length > 0 ? upcoming[0].start_time : null;
  const nextIds = new Set(upcoming.filter((s) => s.start_time === nextStart).map((s) => s.id));
  return { liveIds, nextIds, nextStart, isConferenceDay: true };
}

export function formatCountdown(msLeft: number): { days: string; hours: string; minutes: string; seconds: string } {
  const clamp = Math.max(0, msLeft);
  const pad = (n: number) => String(n).padStart(2, '0');
  return {
    days: pad(Math.floor(clamp / 86_400_000)),
    hours: pad(Math.floor(clamp / 3_600_000) % 24),
    minutes: pad(Math.floor(clamp / 60_000) % 60),
    seconds: pad(Math.floor(clamp / 1000) % 60),
  };
}

const WEEKDAY_FMT = new Intl.DateTimeFormat('en-US', { timeZone: 'UTC', weekday: 'short' });
const MONTH_FMT = new Intl.DateTimeFormat('en-US', { timeZone: 'UTC', month: 'short' });

/** '2026-07-15' → { dayNum: '15', weekday: 'WED', month: 'JUL' } */
export function dateParts(isoDate: string) {
  const d = new Date(`${isoDate}T00:00:00Z`);
  return {
    dayNum: isoDate.slice(8, 10),
    weekday: WEEKDAY_FMT.format(d).toUpperCase(),
    month: MONTH_FMT.format(d).toUpperCase(),
  };
}
