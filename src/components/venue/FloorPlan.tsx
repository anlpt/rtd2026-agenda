import type { VenueFloor, VenueRoom } from '../../data/venue';

interface Props {
  floor: VenueFloor;
  selectedRoomId?: string | null;
  onSelect: (room: VenueRoom, floorLabel: string) => void;
}

const HIT_PAD = 3; // invisible padding around each room for easier clicking

/** One floor of Building B1 as an interactive SVG plan (used flat and in 3D). */
export function FloorPlan({ floor, selectedRoomId, onSelect }: Props) {
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
          {/* larger transparent hit target — makes the 3D view easy to click */}
          {r.interactive && (
            <rect
              className="room-hit"
              x={r.rect.x - HIT_PAD}
              y={r.rect.y - HIT_PAD}
              width={r.rect.w + HIT_PAD * 2}
              height={r.rect.h + HIT_PAD * 2}
            />
          )}
          <rect className="room-fill" x={r.rect.x} y={r.rect.y} width={r.rect.w} height={r.rect.h} rx="1.5" />
          {r.interactive &&
            (() => {
              const label = r.label.replace('Hall ', '').replace(' & B1.306', '');
              // size the label so it always sits inside the room box
              const fontSize = Math.max(4.2, Math.min(8.5, (r.rect.w - 5) / (label.length * 0.6)));
              return (
                <text
                  x={r.rect.x + r.rect.w / 2}
                  y={r.rect.y + r.rect.h / 2 + fontSize * 0.34}
                  style={{ fontSize: `${fontSize}px` }}
                >
                  {label}
                </text>
              );
            })()}
        </g>
      ))}
    </svg>
  );
}
