import { useCallback, useEffect, useMemo, useRef, useState, type PointerEvent } from 'react';
import type { Day, Session } from '../../types';
import { toMinutes, type ConferenceClock, type LiveStatus } from '../../lib/time';
import './board.css';

const LABEL_W = 132;
const SNAP_MIN = 5;
const MIN_PPM = 2.3; // readability floor — below this, blocks get too narrow
const MAX_PPM = 4.2;
const HALF_HOUR = 30;

export function roomKey(room: string): string {
  return room.replace(/\s*\(\d+\)\s*$/, '').trim();
}

/** Day span derived from the content, rounded to half hours. */
export function boardRange(sessions: Session[]): { start: number; end: number } {
  const starts = sessions.map((s) => toMinutes(s.start_time));
  const ends = sessions.map((s) => toMinutes(s.end_time));
  if (starts.length === 0) return { start: 8 * 60, end: 18 * 60 };
  const start = Math.floor(Math.min(...starts) / HALF_HOUR) * HALF_HOUR;
  const end = Math.ceil(Math.max(...ends) / HALF_HOUR) * HALF_HOUR;
  return { start, end };
}

const fmt = (min: number) => `${String(Math.floor(min / 60)).padStart(2, '0')}:${String(min % 60).padStart(2, '0')}`;

interface Props {
  day: Day;
  sessions: Session[]; // all sessions of the day, time-sorted
  dimmedIds: Set<string>;
  live: LiveStatus;
  clock: ConferenceClock;
  scrubMin: number | null;
  onScrub: (min: number | null) => void;
  onOpen: (s: Session) => void;
}

export function ScheduleBoard({ day, sessions, dimmedIds, live, clock, scrubMin, onScrub, onOpen }: Props) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [ppm, setPpm] = useState(3);
  const [overflow, setOverflow] = useState({ left: false, right: false });

  const { start, end } = useMemo(() => boardRange(sessions), [sessions]);
  const duration = end - start;
  const minToX = useCallback((min: number) => (min - start) * ppm, [start, ppm]);
  const gridW = duration * ppm;

  const bands = useMemo(() => sessions.filter((s) => s.type === 'break'), [sessions]);
  const blocks = useMemo(() => sessions.filter((s) => s.type !== 'break' && s.room), [sessions]);

  const rooms = useMemo(() => {
    const keys = [...new Set(blocks.map((b) => roomKey(b.room!)))];
    return keys.sort((a, b) => {
      const aHall = a.toLowerCase().startsWith('hall') ? 0 : 1;
      const bHall = b.toLowerCase().startsWith('hall') ? 0 : 1;
      return aHall - bHall || a.localeCompare(b, undefined, { numeric: true });
    });
  }, [blocks]);

  const hours = useMemo(() => {
    const list: number[] = [];
    for (let m = Math.ceil(start / 60) * 60; m <= end; m += 60) list.push(m);
    return list;
  }, [start, end]);

  const isToday = day.date === clock.date;
  const nowX = isToday && clock.minutes >= start && clock.minutes <= end ? minToX(clock.minutes) : null;

  // Fit the whole day into the available width whenever possible;
  // never squeeze below the readability floor.
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const fit = () => {
      const available = el.clientWidth - LABEL_W;
      if (available > 0) setPpm(Math.min(MAX_PPM, Math.max(MIN_PPM, available / duration)));
    };
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(el);
    return () => ro.disconnect();
  }, [duration]);

  const updateOverflow = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setOverflow({ left: el.scrollLeft > 8, right: el.scrollLeft < max - 8 });
  }, []);

  useEffect(() => {
    updateOverflow();
  }, [updateOverflow, ppm, day.id]);

  // On day change, bring the playhead (or the first session) into view.
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const target = nowX ?? (blocks.length > 0 ? minToX(toMinutes(blocks[0].start_time)) : 0);
    el.scrollLeft = Math.max(0, target - 160);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [day.id, ppm]);

  const nudge = (dir: -1 | 1) => {
    scrollRef.current?.scrollBy({ left: dir * 120 * ppm, behavior: 'smooth' });
  };

  const scrubFromPointer = (e: PointerEvent<HTMLDivElement>) => {
    const el = scrollRef.current;
    if (!el) return;
    const x = e.clientX - el.getBoundingClientRect().left + el.scrollLeft - LABEL_W;
    if (x < 0) {
      onScrub(null);
      return;
    }
    const min = Math.round((start + x / ppm) / SNAP_MIN) * SNAP_MIN;
    onScrub(Math.max(start, Math.min(end, min)));
  };

  const isHot = (s: Session) =>
    scrubMin !== null && toMinutes(s.start_time) <= scrubMin && scrubMin < toMinutes(s.end_time);

  return (
    <div className="board-shell">
      <div
        className={`board${scrubMin !== null ? ' is-scrubbing' : ''}`}
        ref={scrollRef}
        onPointerMove={scrubFromPointer}
        onPointerLeave={() => onScrub(null)}
        onScroll={updateOverflow}
        role="region"
        aria-label={`${day.label} schedule board — rooms by time`}
        tabIndex={0}
      >
        <div className="board-canvas" style={{ width: LABEL_W + gridW }}>
          {/* time ruler */}
          <div className="board-ruler" style={{ paddingLeft: LABEL_W }}>
            {hours.map((m) => (
              <div key={m} className="ruler-hour" style={{ left: LABEL_W + minToX(m) }}>
                <span className="display ruler-num">{fmt(m)}</span>
              </div>
            ))}
          </div>

          {/* hour gridlines */}
          {hours.map((m) => (
            <span key={m} className="board-hourline" style={{ left: LABEL_W + minToX(m) }} aria-hidden="true" />
          ))}

          {/* break bands spanning every room */}
          {bands.map((b) => {
            const x = minToX(toMinutes(b.start_time));
            const w = minToX(toMinutes(b.end_time)) - x;
            return (
              <div
                key={b.id}
                className={`board-band${live.liveIds.has(b.id) ? ' is-live' : ''}${isHot(b) ? ' is-hot' : ''}`}
                style={{ left: LABEL_W + x, width: w }}
              >
                <span className="mono band-label">
                  {b.title} · {b.start_time}–{b.end_time}
                </span>
              </div>
            );
          })}

          {/* room rows */}
          <div className="board-rows">
            {rooms.map((room) => (
              <div className="board-row" key={room}>
                <div className="row-label">
                  <span className="mono">{room}</span>
                </div>
                <div className="row-track" style={{ width: gridW }}>
                  {blocks
                    .filter((s) => roomKey(s.room!) === room)
                    .map((s) => {
                      const x = minToX(toMinutes(s.start_time));
                      const w = minToX(toMinutes(s.end_time)) - x;
                      const liveNow = live.liveIds.has(s.id);
                      const next = live.nextIds.has(s.id);
                      const classes = [
                        'block',
                        `block-${s.type}`,
                        liveNow ? 'is-live' : '',
                        next ? 'is-next' : '',
                        isHot(s) ? 'is-hot' : '',
                        dimmedIds.has(s.id) ? 'is-dimmed' : '',
                      ]
                        .filter(Boolean)
                        .join(' ');
                      return (
                        <button
                          key={s.id}
                          type="button"
                          className={classes}
                          style={{ left: x, width: Math.max(w - 4, 40) }}
                          onClick={() => onOpen(s)}
                          aria-label={`${s.code ?? ''} ${s.title}, ${s.start_time} to ${s.end_time}, ${s.room}`}
                        >
                          <span className="block-head">
                            {s.code && <span className="mono block-code">{s.code}</span>}
                            {liveNow && (
                              <span className="mono block-live">
                                <span className="live-dot" aria-hidden="true" /> LIVE
                              </span>
                            )}
                            {!liveNow && next && <span className="mono block-next">NEXT</span>}
                          </span>
                          <span className="block-title">{s.title}</span>
                          <span className="mono block-time">
                            {s.start_time}–{s.end_time}
                          </span>
                        </button>
                      );
                    })}
                </div>
              </div>
            ))}
          </div>

          {/* live playhead */}
          {nowX !== null && (
            <div className="playhead" style={{ left: LABEL_W + nowX }} aria-hidden="true">
              <span className="mono playhead-tag">
                <span className="live-dot" /> NOW {clock.hhmm}
              </span>
            </div>
          )}

          {/* scrub cursor */}
          {scrubMin !== null && (
            <div className="scrub-cursor" style={{ left: LABEL_W + minToX(scrubMin) }} aria-hidden="true">
              <span className="mono scrub-tag">{fmt(scrubMin)}</span>
            </div>
          )}
        </div>
      </div>

      {/* off-screen timeline affordances */}
      <span className={`board-fade fade-left${overflow.left ? ' is-on' : ''}`} aria-hidden="true" />
      <span className={`board-fade fade-right${overflow.right ? ' is-on' : ''}`} aria-hidden="true" />
      {overflow.left && (
        <button type="button" className="board-nav nav-left" onClick={() => nudge(-1)} aria-label="Scroll to earlier sessions">
          <span aria-hidden="true">◀</span>
          <span className="mono board-nav-label">earlier</span>
        </button>
      )}
      {overflow.right && (
        <button type="button" className="board-nav nav-right" onClick={() => nudge(1)} aria-label="Scroll to later sessions">
          <span className="mono board-nav-label">later</span>
          <span aria-hidden="true">▶</span>
        </button>
      )}
    </div>
  );
}
