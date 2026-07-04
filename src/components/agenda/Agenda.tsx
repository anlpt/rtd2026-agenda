import { useMemo, useState } from 'react';
import type { Day, Session, SessionType } from '../../types';
import { dateParts, liveStatus, toMinutes, type ConferenceClock } from '../../lib/time';
import { useReveal } from '../../hooks/useReveal';
import { SessionCard } from './SessionCard';
import { SessionModal } from './SessionModal';
import './agenda.css';

const TYPE_FILTERS: { value: SessionType | 'all'; label: string }[] = [
  { value: 'all', label: 'Everything' },
  { value: 'keynote', label: 'Keynotes' },
  { value: 'special', label: 'Special sessions' },
  { value: 'parallel', label: 'Parallel sessions' },
];

interface Props {
  days: Day[];
  sessions: Session[];
  clock: ConferenceClock;
}

export function Agenda({ days, sessions, clock }: Props) {
  const [activeDayId, setActiveDayId] = useState<string | null>(null);
  const [typeFilter, setTypeFilter] = useState<SessionType | 'all'>('all');
  const [roomFilter, setRoomFilter] = useState('all');
  const [query, setQuery] = useState('');
  const [openSession, setOpenSession] = useState<Session | null>(null);

  // Default to today when the conference is running, else the first day.
  const activeDay =
    days.find((d) => d.id === activeDayId) ?? days.find((d) => d.date === clock.date) ?? days[0];

  const live = liveStatus(activeDay, sessions, clock);

  const daySessions = useMemo(
    () => sessions.filter((s) => s.day_id === activeDay?.id),
    [sessions, activeDay?.id],
  );

  const rooms = useMemo(
    () =>
      [...new Set(daySessions.map((s) => s.room).filter((r): r is string => !!r))].sort((a, b) =>
        a.localeCompare(b),
      ),
    [daySessions],
  );

  const filtering = typeFilter !== 'all' || roomFilter !== 'all' || query.trim() !== '';

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return daySessions.filter((s) => {
      if (typeFilter !== 'all' && s.type !== typeFilter) return false;
      if (roomFilter !== 'all' && s.room !== roomFilter) return false;
      if (filtering && (s.type === 'break' || s.type === 'ceremony') && (typeFilter !== 'all' || q)) {
        if (typeFilter !== 'all') return false;
      }
      if (q) {
        const haystack = [s.title, s.code, s.speaker, s.chair, s.panelists, s.room]
          .filter(Boolean)
          .join(' ')
          .toLowerCase();
        if (!haystack.includes(q)) return false;
      }
      return true;
    });
  }, [daySessions, typeFilter, roomFilter, query, filtering]);

  const slots = useMemo(() => {
    const byStart = new Map<string, Session[]>();
    for (const s of visible) {
      const list = byStart.get(s.start_time) ?? [];
      list.push(s);
      byStart.set(s.start_time, list);
    }
    return [...byStart.entries()]
      .sort(([a], [b]) => toMinutes(a) - toMinutes(b))
      .map(([time, list]) => ({ time, list: list.sort((a, b) => a.sort - b.sort) }));
  }, [visible]);

  useReveal([activeDay?.id, typeFilter, roomFilter, query]);

  if (!activeDay) return null;

  return (
    <section className="agenda" id="agenda" aria-label="Conference agenda">
      <div className="agenda-header">
        <p className="mono agenda-eyebrow" data-reveal>
          Programme · Asia/Ho_Chi_Minh (GMT+7)
        </p>
        <h2 className="display agenda-heading" data-reveal>
          The Agenda
        </h2>
      </div>

      <nav className="day-tabs" aria-label="Conference days">
        {days.map((d) => {
          const parts = dateParts(d.date);
          const isActive = d.id === activeDay.id;
          const isToday = d.date === clock.date;
          return (
            <button
              key={d.id}
              type="button"
              className={`day-tab${isActive ? ' is-active' : ''}`}
              aria-pressed={isActive}
              onClick={() => setActiveDayId(d.id)}
            >
              <span className="display day-tab-num">{parts.dayNum}</span>
              <span className="mono day-tab-label">
                {parts.weekday} {parts.month} · {d.label}
                {isToday && <em className="day-tab-today"> · today</em>}
              </span>
            </button>
          );
        })}
      </nav>

      {live.isConferenceDay && live.liveIds.size > 0 && (
        <div className="now-banner" role="status">
          <span className="live-dot" aria-hidden="true" />
          <span className="mono">
            Happening now · {clock.hhmm} — {live.liveIds.size} session{live.liveIds.size > 1 ? 's' : ''} in
            progress
          </span>
        </div>
      )}

      <div className="agenda-filters">
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
        <div className="filter-inputs">
          <select
            className="filter-select mono"
            value={roomFilter}
            onChange={(e) => setRoomFilter(e.target.value)}
            aria-label="Filter by room"
          >
            <option value="all">All rooms</option>
            {rooms.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
          <input
            type="search"
            className="filter-search"
            placeholder="Search titles, chairs, speakers…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Search the agenda"
          />
        </div>
      </div>

      <div className="day-content" key={activeDay.id}>
        <span className="day-wipe" aria-hidden="true" />
        <h3 className="day-title" data-reveal>
          <span className="mono">
            {activeDay.label} — {activeDay.date}
          </span>
          {activeDay.title}
        </h3>

        {slots.length === 0 && (
          <p className="agenda-empty">
            Nothing matches these filters. Clear the search or pick another session type.
          </p>
        )}

        <ol className="slot-list">
          {slots.map((slot) => {
            const hasLive = slot.list.some((s) => live.liveIds.has(s.id));
            const hasNext = slot.list.some((s) => live.nextIds.has(s.id));
            return (
              <li className={`slot${hasLive ? ' slot-live' : ''}`} key={slot.time}>
                <div className="slot-rail">
                  <span className={`slot-node${hasLive ? ' is-live' : hasNext ? ' is-next' : ''}`} aria-hidden="true" />
                  <span className="mono slot-time">{slot.time}</span>
                </div>
                <div className="slot-cards" data-reveal>
                  {slot.list.map((session) => (
                    <SessionCard
                      key={session.id}
                      session={session}
                      isLive={live.liveIds.has(session.id)}
                      isNext={live.nextIds.has(session.id)}
                      onOpen={setOpenSession}
                    />
                  ))}
                </div>
              </li>
            );
          })}
        </ol>
      </div>

      {openSession && <SessionModal session={openSession} onClose={() => setOpenSession(null)} />}
    </section>
  );
}
