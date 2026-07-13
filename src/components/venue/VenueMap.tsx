import { useEffect, useMemo, useRef, useState } from 'react';
import type { Session } from '../../types';
import { SIDE_VENUES, UPPER_FLOORS_NOTE, VENUE_FLOORS, type SideVenue, type VenueRoom } from '../../data/venue';
import { roomKey } from '../agenda/ScheduleBoard';
import { useReveal } from '../../hooks/useReveal';
import { FloorPlan } from './FloorPlan';
import './venue.css';

export type VenueVariant = 'blueprint' | 'hologram' | 'solid';
type VenueView = 'stack' | 'floors';

interface Selection {
  kind: 'room' | 'side';
  room?: VenueRoom;
  side?: SideVenue;
  floorLabel?: string;
}

interface Props {
  sessions: Session[];
  onShowOnSchedule: (roomLabel: string) => void;
  variant?: VenueVariant;
  /** Set by the session modal — selects a room in the building. */
  focus?: { label: string; n: number } | null;
}

const normalize = (label: string) => label.replace(/\s*\(\d+\)\s*$/, '').trim().toLowerCase();

const dayTag = (dayId: string) => (dayId === 'day-1' ? 'Jul 15' : 'Jul 16');

export function VenueMap({ sessions, onShowOnSchedule, variant = 'hologram', focus }: Props) {
  const [view, setView] = useState<VenueView>('stack');
  const [selected, setSelected] = useState<Selection | null>(null);
  const [hoverFloor, setHoverFloor] = useState<string | null>(null);
  const stackRef = useRef<HTMLDivElement>(null);
  const pointer = useRef({ x: 0, y: 0 });

  useReveal([view]);

  // Living hologram: gentle idle drift + pointer parallax on the 3D stack.
  useEffect(() => {
    if (view !== 'stack') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let raf = 0;
    const start = performance.now();
    const tick = (t: number) => {
      const el = stackRef.current;
      if (el) {
        const e = (t - start) / 1000;
        const tilt = Math.sin(e * 0.5) * 2.2 + pointer.current.y * 2;
        const spin = Math.cos(e * 0.35) * 2.6 + pointer.current.x * 3;
        el.style.setProperty('--tilt', `${tilt.toFixed(2)}deg`);
        el.style.setProperty('--spin', `${spin.toFixed(2)}deg`);
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [view]);

  const onScenePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    pointer.current = {
      x: (e.clientX - r.left) / r.width - 0.5,
      y: (e.clientY - r.top) / r.height - 0.5,
    };
  };

  // External focus (from a session's "view in the 3D map" button):
  // select the room and, in floor view, bring its floor on screen.
  useEffect(() => {
    if (!focus) return;
    const key = normalize(focus.label);
    for (const floor of VENUE_FLOORS) {
      const room = floor.rooms.find((r) => normalize(r.label) === key && r.interactive);
      if (room) {
        setSelected({ kind: 'room', room, floorLabel: floor.label });
        if (view === 'floors') {
          window.setTimeout(() => {
            document.getElementById(`floor-${floor.id}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }, 150);
        }
        return;
      }
    }
    const side = SIDE_VENUES.find((sv) => normalize(sv.label) === key);
    if (side) setSelected({ kind: 'side', side });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [focus?.n]);

  const selectedLabel = selected?.room?.label ?? selected?.side?.label ?? null;

  const roomSessions = useMemo(() => {
    if (!selectedLabel) return [];
    return sessions
      .filter((s) => s.room && roomKey(s.room) === roomKey(selectedLabel))
      .sort((a, b) => a.day_id.localeCompare(b.day_id) || a.start_time.localeCompare(b.start_time));
  }, [sessions, selectedLabel]);

  const selectRoom = (room: VenueRoom, floorLabel: string) => {
    setSelected({ kind: 'room', room, floorLabel });
  };

  const floorEvents = useMemo(() => {
    const byFloor = new Map<string, { room: VenueRoom; session: Session }[]>();
    for (const floor of VENUE_FLOORS) {
      const rows: { room: VenueRoom; session: Session }[] = [];
      for (const room of floor.rooms.filter((r) => r.interactive)) {
        for (const s of sessions) {
          if (s.room && roomKey(s.room) === roomKey(room.label)) rows.push({ room, session: s });
        }
      }
      rows.sort(
        (a, b) =>
          a.session.day_id.localeCompare(b.session.day_id) ||
          a.session.start_time.localeCompare(b.session.start_time),
      );
      byFloor.set(floor.id, rows);
    }
    return byFloor;
  }, [sessions]);

  return (
    <section className={`venue venue-${variant}`} id="venue" aria-label="Venue map — Building B1">
      <div className="venue-header" data-reveal>
        <p className="mono venue-eyebrow">The Venue · UEH Campus B · 279 Nguyen Tri Phuong</p>
        <h2 className="display venue-heading">Inside Building B1</h2>
        <p className="venue-sub">
          Tap a floor or a highlighted room to see what happens there and how to reach it.
        </p>
        <div className="venue-views" role="group" aria-label="Choose a building view">
          <button
            type="button"
            className={`filter-chip mono${view === 'stack' ? ' is-active' : ''}`}
            aria-pressed={view === 'stack'}
            onClick={() => setView('stack')}
          >
            3D Building
          </button>
          <button
            type="button"
            className={`filter-chip mono${view === 'floors' ? ' is-active' : ''}`}
            aria-pressed={view === 'floors'}
            onClick={() => setView('floors')}
          >
            Floor by floor
          </button>
        </div>
      </div>

      <div className="venue-body">
        {view === 'stack' ? (
          <div className="venue-scene" data-reveal onPointerMove={onScenePointerMove}>
            <div className="venue-stack" role="list" ref={stackRef}>
              {[...VENUE_FLOORS].reverse().map((floor) => {
                const isActive =
                  hoverFloor === floor.id || (selected?.kind === 'room' && selected.floorLabel === floor.label);
                return (
                  <div
                    key={floor.id}
                    role="listitem"
                    className={`venue-floor${isActive ? ' is-active' : ''}${
                      selected && !isActive ? ' is-muted' : ''
                    }`}
                    style={{ ['--i' as string]: floor.level }}
                    onPointerEnter={() => setHoverFloor(floor.id)}
                    onPointerLeave={() => setHoverFloor(null)}
                  >
                    <FloorPlan
                      floor={floor}
                      selectedRoomId={selected?.room?.id ?? null}
                      onSelect={selectRoom}
                    />
                  </div>
                );
              })}
              <span className="venue-scan" aria-hidden="true" />
            </div>

            <ul className="venue-legend">
              <li className="legend-upper mono">{UPPER_FLOORS_NOTE}</li>
              {[...VENUE_FLOORS].reverse().map((floor) => {
                const isActive =
                  hoverFloor === floor.id || (selected?.kind === 'room' && selected.floorLabel === floor.label);
                return (
                  <li
                    key={floor.id}
                    className={isActive ? 'is-active' : ''}
                    onPointerEnter={() => setHoverFloor(floor.id)}
                    onPointerLeave={() => setHoverFloor(null)}
                  >
                    <em className="display legend-num">{floor.short}</em>
                    <span className="mono legend-note">{floor.note}</span>
                  </li>
                );
              })}
            </ul>
          </div>
        ) : (
          <div className="venue-floors" data-reveal>
            {VENUE_FLOORS.map((floor) => {
              const rows = floorEvents.get(floor.id) ?? [];
              const isActive = selected?.kind === 'room' && selected.floorLabel === floor.label;
              return (
                <article
                  key={floor.id}
                  id={`floor-${floor.id}`}
                  className={`floor-block${isActive ? ' is-active' : ''}`}
                >
                  <header className="floor-block-head">
                    <em className="display floor-block-num">{floor.short}</em>
                    <div>
                      <h3 className="floor-block-title">{floor.label}</h3>
                      <p className="mono floor-block-note">{floor.note}</p>
                    </div>
                  </header>
                  <div className="floor-block-plan">
                    <FloorPlan
                      floor={floor}
                      selectedRoomId={selected?.room?.id ?? null}
                      onSelect={selectRoom}
                    />
                  </div>
                  <ul className="floor-block-events">
                    {rows.length === 0 && <li className="floor-no-events mono">No scheduled events</li>}
                    {rows.map(({ room, session }) => (
                      <li key={session.id}>
                        <button
                          type="button"
                          className={`floor-event${selected?.room?.id === room.id ? ' is-hot' : ''}`}
                          onClick={() => selectRoom(room, floor.label)}
                        >
                          <span className="mono floor-event-time">
                            {dayTag(session.day_id)} · {session.start_time}
                          </span>
                          <span className="mono floor-event-room">{roomKey(room.label)}</span>
                          <span className="floor-event-title">
                            {session.code ? `${session.code} — ` : ''}
                            {session.title}
                          </span>
                        </button>
                      </li>
                    ))}
                  </ul>
                </article>
              );
            })}
          </div>
        )}

        <aside className="venue-panel" data-reveal aria-live="polite">
          {!selected && (
            <div className="venue-panel-empty">
              <span className="mono">No room selected</span>
              <p>
                The conference lives on five floors of Building B1 — keynotes in Hall B1.302, FutureScape
                sessions on Floor 2, parallel tracks on Floors 3–5, and everything starts at the Lobby B1
                registration desk.
              </p>
            </div>
          )}
          {selected && (
            <div className="venue-panel-body" key={`${selectedLabel}-${view}`}>
              <p className="mono venue-panel-floor">
                {selected.kind === 'room' ? `Building B1 · ${selected.floorLabel}` : selected.side!.note}
              </p>
              <h3 className="display venue-panel-title">{selected.room?.name ?? selected.side!.name}</h3>
              {selected.room?.capacity && <p className="mono venue-panel-cap">{selected.room.capacity}</p>}
              <ol className="venue-directions">
                {(selected.room?.directions ?? selected.side!.directions).map((step, i) => (
                  <li key={i}>{step}</li>
                ))}
              </ol>
              {roomSessions.length > 0 && (
                <div className="venue-panel-sessions">
                  <h4 className="mono venue-panel-label">Scheduled here</h4>
                  <ul>
                    {roomSessions.slice(0, 5).map((s) => (
                      <li key={s.id}>
                        <span className="mono">
                          {dayTag(s.day_id)} · {s.start_time}
                        </span>
                        {s.code ? `${s.code} — ` : ''}
                        {s.title}
                      </li>
                    ))}
                    {roomSessions.length > 5 && (
                      <li className="venue-more mono">+ {roomSessions.length - 5} more…</li>
                    )}
                  </ul>
                  <button
                    type="button"
                    className="admin-primary venue-cta"
                    onClick={() => onShowOnSchedule(roomKey(selectedLabel!))}
                  >
                    Show on the schedule ↓
                  </button>
                </div>
              )}
            </div>
          )}
        </aside>
      </div>

      <div className="venue-sides">
        {SIDE_VENUES.map((sv) => (
          <button
            key={sv.id}
            type="button"
            className={`venue-side-chip${selected?.side?.id === sv.id ? ' is-selected' : ''}`}
            onClick={() => setSelected({ kind: 'side', side: sv })}
          >
            <span className="mono venue-side-label">{sv.label}</span>
            <span className="venue-side-note">{sv.note}</span>
          </button>
        ))}
      </div>
    </section>
  );
}
