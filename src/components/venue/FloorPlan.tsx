import type { VenueFloor, VenueRoom } from '../../data/venue';

interface Props {
  floor: VenueFloor;
  selectedRoomId?: string | null;
  onSelect: (room: VenueRoom, floorLabel: string) => void;
  /** Draw the pulsing route beam for the selected room. */
  showBeacon?: boolean;
}

/** One floor of Building B1 as an interactive SVG plan (used flat and in 3D). */
export function FloorPlan({ floor, selectedRoomId, onSelect, showBeacon = true }: Props) {
  const selected = selectedRoomId ? floor.rooms.find((r) => r.id === selectedRoomId) : undefined;
  return (
    <svg className="floor-svg" viewBox="0 0 200 170" aria-label={`${floor.label} — ${floor.note}`}>
      <path className="floor-slab" d="M8 8 H192 V162 H8 Z" />
      <rect className="floor-core" x="78" y="12" width="44" height="26" />
      {floor.rooms.map((r) => (
        <g
          key={r.id}
          className={`floor-room${r.interactive ? ' is-clickable' : ''}${
            selectedRoomId === r.id ? ' is-selected' : ''
          }`}
          onClick={(e) => {
            e.stopPropagation();
            if (r.interactive) onSelect(r, floor.label);
          }}
          role={r.interactive ? 'button' : undefined}
          tabIndex={r.interactive ? 0 : undefined}
          onKeyDown={(e) => {
            if (r.interactive && (e.key === 'Enter' || e.key === ' ')) {
              e.preventDefault();
              onSelect(r, floor.label);
            }
          }}
          aria-label={r.interactive ? `${r.label} — ${r.name}` : undefined}
        >
          <rect x={r.rect.x} y={r.rect.y} width={r.rect.w} height={r.rect.h} rx="1.5" />
          {r.interactive && (
            <text x={r.rect.x + r.rect.w / 2} y={r.rect.y + r.rect.h / 2 + 2.5}>
              {r.label.replace('Hall ', '').replace(' & B1.306', '')}
            </text>
          )}
        </g>
      ))}
      {showBeacon && selected && (
        <rect
          className="room-beacon"
          x={selected.rect.x + selected.rect.w / 2 - 2}
          y={0}
          width="4"
          height={selected.rect.y + selected.rect.h / 2}
        />
      )}
    </svg>
  );
}
