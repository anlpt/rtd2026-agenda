import { useEffect, useMemo, useState } from 'react';
import type { Day, Session, SessionType } from '../../types';
import { dateParts, liveStatus, toMinutes, type ConferenceClock } from '../../lib/time';
import { CONFERENCE_TIMEZONE } from '../../config';
import { useReveal } from '../../hooks/useReveal';
import { ScheduleBoard } from './ScheduleBoard';
import { SessionModal } from './SessionModal';
import './agenda.css';

const TYPE_FILTERS: { value: SessionType | 'all'; label: string }[] = [
  { value: 'all', label: 'Everything' },
  { value: 'keynote', label: 'Keynotes' },
  { value: 'special', label: 'Special' },
  { value: 'parallel', label: 'Parallel' },
];

const CLOCK_FMT = new Intl.DateTimeFormat('en-GB', {
  timeZone: CONFERENCE_TIMEZONE,
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
  hour12: false,
});

interface Props {
  days: Day[];
  sessions: Session[];
  clock: ConferenceClock;
  now: Date;
  /** Set by the venue map — focuses the board's search on a room. */
  roomFocus?: { q: string; n: number } | null;
  /** Jump to the 3D venue map with a room selected. */
  onLocateRoom?: (room: string) => void;
}

export function Agenda({ days, sessions, clock, now, roomFocus, onLocateRoom }: Props) {
  const [activeDayId, setActiveDayId] = useState<string | null>(null);
  const [typeFilter, setTypeFilter] = useState<SessionType | 'all'>('all');
  const [query, setQuery] = useState('');
  const [openSession, setOpenSession] = useState<Session | null>(null);
  const [scrubMin, setScrubMin] = useState<number | null>(null);

  // The venue map can push a room name into the search box.
  useEffect(() => {
    if (roomFocus) setQuery(roomFocus.q);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roomFocus?.n]);

  // Default to today while the conference runs, else the first day.
  const activeDay =
    days.find((d) => d.id === activeDayId) ?? days.find((d) => d.date === clock.date) ?? days[0];

  const live = liveStatus(activeDay, sessions, clock);

  const daySessions = useMemo(
    () =>
      sessions
        .filter((s) => s.day_id === activeDay?.id)
        .sort((a, b) => toMinutes(a.start_time) - toMinutes(b.start_time) || a.sort - b.sort),
    [sessions, activeDay?.id],
  );

  // Filters dim blocks instead of removing them, so the time geometry
  // stays put and matches light up in place.
  const dimmedIds = useMemo(() => {
    const q = query.trim().toLowerCase();
    const dimmed = new Set<string>();
    if (typeFilter === 'all' && !q) return dimmed;
    for (const s of daySessions) {
      if (s.type === 'break') continue;
      const typeMiss = typeFilter !== 'all' && s.type !== typeFilter;
      const text = [s.title, s.code, s.speaker, s.chair, s.panelists, s.room]
        .filter(Boolean)
        .join(' ')
        .toLowerCase();
      const queryMiss = q !== '' && !text.includes(q);
      if (typeMiss || queryMiss) dimmed.add(s.id);
    }
    return dimmed;
  }, [daySessions, typeFilter, query]);

  const scrubCount = useMemo(() => {
    if (scrubMin === null) return null;
    return daySessions.filter(
      (s) =>
        s.type !== 'break' &&
        !dimmedIds.has(s.id) &&
        toMinutes(s.start_time) <= scrubMin &&
        scrubMin < toMinutes(s.end_time),
    ).length;
  }, [scrubMin, daySessions, dimmedIds]);

  useReveal([activeDay?.id]);

  if (!activeDay) return null;

  const isToday = activeDay.date === clock.date;

  return (
    <section className="agenda" id="agenda" aria-label="Conference agenda">
      <div className="agenda-header">
        <p className="mono agenda-eyebrow" data-reveal>
          Programme · Ho Chi Minh City · Vinh Long · Khanh Hoa · GMT+7
        </p>
        <h2 className="display agenda-heading" data-reveal>
          Six days,
          <br />
          minute by minute
        </h2>
      </div>

      {/* chronograph: the dates and the clock ARE the interface */}
      <div className="chronograph" data-reveal>
        <nav className="chrono-days" aria-label="Conference days">
          {days.map((d) => {
            const parts = dateParts(d.date);
            const isActive = d.id === activeDay.id;
            return (
              <button
                key={d.id}
                type="button"
                className={`chrono-day${isActive ? ' is-active' : ''}`}
                aria-pressed={isActive}
                onClick={() => {
                  setActiveDayId(d.id);
                  setScrubMin(null);
                }}
              >
                <span className="display chrono-num">{parts.dayNum}</span>
                <span className="mono chrono-meta">
                  {parts.weekday} · {parts.month}
                  <br />
                  {d.label}
                  {d.date === clock.date && <em className="chrono-today"> · today</em>}
                </span>
              </button>
            );
          })}
        </nav>

        <div className="chrono-clock" role="status">
          {scrubMin !== null ? (
            <>
              <span className="mono chrono-clock-label">At this time</span>
              <span className="chrono-clock-time">
                {`${String(Math.floor(scrubMin / 60)).padStart(2, '0')}:${String(scrubMin % 60).padStart(2, '0')}`}
              </span>
              <span className="mono chrono-clock-sub">
                {scrubCount} session{scrubCount === 1 ? '' : 's'} on
              </span>
            </>
          ) : (
            <>
              <span className="mono chrono-clock-label">
                {isToday && live.liveIds.size > 0 ? (
                  <>
                    <span className="live-dot" aria-hidden="true" /> Live · Vietnam
                  </>
                ) : (
                  'Vietnam'
                )}
              </span>
              <span className="chrono-clock-time">{CLOCK_FMT.format(now)}</span>
              <span className="mono chrono-clock-sub">
                {isToday && live.liveIds.size > 0
                  ? `${live.liveIds.size} session${live.liveIds.size > 1 ? 's' : ''} in progress`
                  : 'glide across the board to time-travel'}
              </span>
            </>
          )}
        </div>
      </div>

      <div className="agenda-filters" data-reveal>
        <div className="filter-chips" role="group" aria-label="Filter by session type">
          {TYPE_FILTERS.map((f) => (
            <button
              key={f.value}
              type="button"
              className={`filter-chip mono${typeFilter === f.value ? ' is-active' : ''}`}
              aria-pressed={typeFilter === f.value}
              onClick={() => setTypeFilter(f.value)}
            >
              {f.label}
            </button>
          ))}
        </div>
        <input
          type="search"
          className="filter-search"
          placeholder="Search titles, chairs, speakers, rooms…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label="Search the agenda"
        />
      </div>

      <div className="day-content" key={activeDay.id}>
        <span className="day-wipe" aria-hidden="true" />
        <ScheduleBoard
          day={activeDay}
          sessions={daySessions}
          dimmedIds={dimmedIds}
          live={live}
          clock={clock}
          scrubMin={scrubMin}
          onScrub={setScrubMin}
          onOpen={setOpenSession}
        />
      </div>

      {openSession && (
        <SessionModal session={openSession} onClose={() => setOpenSession(null)} onLocate={onLocateRoom} />
      )}
    </section>
  );
}
