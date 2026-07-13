// Building B1, UEH Campus B — simplified from the architectural set
// "10.2025 BV KHU B1.pdf". Geometry lives on a 200×170 grid per floor.

export interface VenueRoom {
  id: string;
  label: string; // matches roomKey() output from the agenda
  name: string;
  capacity: string | null;
  rect: { x: number; y: number; w: number; h: number };
  directions: string[];
  interactive: boolean;
}

export interface VenueFloor {
  id: string;
  level: number; // stacking order, 0 = ground
  short: string; // 'GF', '2', '3'…
  label: string;
  note: string;
  rooms: VenueRoom[];
}

const room = (
  id: string,
  label: string,
  name: string,
  capacity: string | null,
  rect: VenueRoom['rect'],
  directions: string[],
  interactive = true,
): VenueRoom => ({ id, label, name, capacity, rect, directions, interactive });

const LIFTS = 'From Lobby B1, take the central lifts (3 cars) or Stair 1 beside them';

export const VENUE_FLOORS: VenueFloor[] = [
  {
    id: 'gf',
    level: 0,
    short: 'GF',
    label: 'Ground Floor',
    note: 'Main lobby · registration · showcase',
    rooms: [
      room('lobby', 'Lobby B1', 'Main Lobby — Registration & FutureScape Showcase', '706 m²', { x: 46, y: 44, w: 138, h: 108 }, [
        'Enter Building B1 from 279 Nguyen Tri Phuong Street (main gate).',
        'The registration desks and partner exhibition booths are straight ahead in the main lobby.',
      ]),
    ],
  },
  {
    id: 'f2',
    level: 1,
    short: '2',
    label: 'Floor 2',
    note: 'FutureScape session rooms',
    rooms: [
      room('b1205', 'B1.205', 'Science Activity Room B1.205', '92 seats · 162 m²', { x: 14, y: 14, w: 52, h: 44 }, [
        `${LIFTS} to Floor 2.`,
        'Turn left from the lift lobby into the west wing — B1.205 is the large corner room at the far north end.',
      ]),
      room('b1204', 'B1.204', 'Meeting Room B1.204', '50–60 seats · 118 m²', { x: 30, y: 66, w: 42, h: 34 }, [
        `${LIFTS} to Floor 2.`,
        'Turn left from the lift lobby — B1.204 is midway along the west wing.',
      ]),
      room('b1203', 'B1.203', 'Meeting Room B1.203', '30 seats · 51 m²', { x: 14, y: 106, w: 28, h: 26 }, [
        `${LIFTS} to Floor 2.`,
        'Turn left from the lift lobby and continue to the end — B1.203 is the corner room in the south-west.',
      ]),
      room('hall-lower', 'Hall B1.302', 'Hall B1.302 — stalls level', null, { x: 108, y: 48, w: 76, h: 104 }, [
        'The main hall is double-height; its stalls entrance is on Floor 2, straight across from the lifts.',
      ], false),
    ],
  },
  {
    id: 'f3',
    level: 2,
    short: '3',
    label: 'Floor 3',
    note: 'Hall B1.302 · parallel rooms · support office',
    rooms: [
      room('hall', 'Hall B1.302', 'Hall B1.302 — Main Conference Hall', '274 seats · 398 m²', { x: 104, y: 44, w: 80, h: 108 }, [
        `${LIFTS} to Floor 3.`,
        'The Hall doors are directly ahead of the lift lobby, east side. Keynotes, the opening ceremony and plenary special sessions happen here.',
      ]),
      room('b1308', 'B1.308', 'Meeting Room B1.308', '16 seats · 40 m²', { x: 14, y: 14, w: 26, h: 30 }, [
        `${LIFTS} to Floor 3.`,
        'Turn left from the lift lobby — B1.308 is in the north-west corner, first of the twin rooms.',
      ]),
      room('b1309', 'B1.309', 'Meeting Room B1.309', '16 seats · 47 m²', { x: 42, y: 14, w: 26, h: 30 }, [
        `${LIFTS} to Floor 3.`,
        'Turn left from the lift lobby — B1.309 is in the north-west corner, next to B1.308.',
      ]),
      room('b1307', 'B1.307', 'Meeting Room B1.307', '15–18 seats · 40 m²', { x: 38, y: 52, w: 30, h: 20 }, [
        `${LIFTS} to Floor 3.`,
        'Turn left, then follow the west corridor — B1.307 is the first of the three stacked meeting rooms.',
      ]),
      room('support', 'B1.305 & B1.306', 'On-site Support Office', 'RTD 2026 staff', { x: 38, y: 74, w: 30, h: 42 }, [
        `${LIFTS} to Floor 3.`,
        'Rooms B1.305 & B1.306, west corridor — technical & logistical support (Ms. Mi Trang, WhatsApp +84 978 840 897).',
      ]),
    ],
  },
  {
    id: 'f4',
    level: 3,
    short: '4',
    label: 'Floor 4',
    note: 'Parallel session classrooms',
    rooms: [
      room('b1409', 'B1.409', 'Classroom B1.409', '50–52 seats · 70 m²', { x: 14, y: 14, w: 34, h: 36 }, [
        `${LIFTS} to Floor 4.`,
        'Turn left from the lift lobby — B1.409 is the corner classroom in the north-west.',
      ]),
      room('b1408', 'B1.408', 'Classroom B1.408', '40–50 seats · 59 m²', { x: 52, y: 62, w: 30, h: 30 }, [
        `${LIFTS} to Floor 4.`,
        'Cross the study lounge — B1.408 is the left one of the twin classrooms at the centre of the floor.',
      ]),
      room('b1407', 'B1.407', 'Classroom B1.407', '40–50 seats · 59 m²', { x: 84, y: 62, w: 30, h: 30 }, [
        `${LIFTS} to Floor 4.`,
        'Cross the study lounge — B1.407 is the right one of the twin classrooms at the centre of the floor.',
      ]),
      room('b1403', 'B1.403', 'Classroom B1.403', '80–85 seats · 110 m²', { x: 140, y: 82, w: 44, h: 34 }, [
        `${LIFTS} to Floor 4.`,
        'Turn right from the lift lobby along the east side — B1.403 is the middle of the three large classrooms.',
      ]),
    ],
  },
  {
    id: 'f5',
    level: 4,
    short: '5',
    label: 'Floor 5',
    note: 'Parallel session classroom',
    rooms: [
      room('b1507', 'B1.507', 'Classroom B1.507', '40–50 seats · 59 m²', { x: 84, y: 62, w: 30, h: 30 }, [
        `${LIFTS} to Floor 5.`,
        'Cross the study lounge — B1.507 is the right one of the twin classrooms at the centre of the floor (same position as B1.407, one floor up).',
      ]),
    ],
  },
];

export interface SideVenue {
  id: string;
  label: string;
  name: string;
  note: string;
  directions: string[];
}

export const SIDE_VENUES: SideVenue[] = [
  {
    id: 'b2110',
    label: 'B2.110',
    name: 'Living Symbiosis — ArtTech Experience',
    note: 'Building B2 · Creative Space & Immersive Room',
    directions: [
      'Exit the B1 main lobby and cross the campus courtyard to Building B2.',
      'Room B2.110 is on the ground floor — follow the "Living Symbiosis" signage. Guided tours run from 16:30 (20 people per session).',
    ],
  },
  {
    id: 'b112a',
    label: 'Hall B1.12A',
    name: 'Banquet Hall B1.12A',
    note: 'Lunch & Welcome Dinner venue',
    directions: [
      'From Lobby B1 follow the RTD 2026 signage to the B1.12A hall.',
      'Meals are for invited guests and paid registered participants — bring your badge. Staff at B1.305/306 can guide you.',
    ],
  },
];

/** Floors 6–9 exist (library & faculty offices) but host no conference events. */
export const UPPER_FLOORS_NOTE = 'Floors 6–9 · Library & faculty offices';

export interface VenueLookup {
  name: string;
  where: string; // 'Building B1 · Floor 3'
  directions: string[];
}

export interface RoomLocation {
  floor: VenueFloor;
  room: VenueRoom;
}

/** Locate the floor + room for an agenda room string (for the modal mini-map). */
export function findRoomLocation(room: string | null): RoomLocation | null {
  if (!room) return null;
  const key = normalize(room);
  let fallback: RoomLocation | null = null;
  for (const floor of VENUE_FLOORS) {
    const match = floor.rooms.find((r) => normalize(r.label) === key);
    if (!match) continue;
    if (match.interactive) return { floor, room: match };
    fallback = fallback ?? { floor, room: match };
  }
  return fallback;
}

const normalize = (room: string): string => room.replace(/\s*\(\d+\)\s*$/, '').trim().toLowerCase();

/** Find wayfinding info for an agenda room string (capacity suffix tolerated). */
export function findVenue(room: string | null): VenueLookup | null {
  if (!room) return null;
  const key = normalize(room);
  let fallback: VenueLookup | null = null;
  for (const floor of VENUE_FLOORS) {
    const match = floor.rooms.find((r) => normalize(r.label) === key);
    if (!match) continue;
    const hit = { name: match.name, where: `Building B1 · ${floor.label}`, directions: match.directions };
    // Prefer the room's primary entry (e.g. the Hall on Floor 3, not its
    // Floor-2 stalls level).
    if (match.interactive) return hit;
    fallback = fallback ?? hit;
  }
  if (fallback) return fallback;
  const side = SIDE_VENUES.find((sv) => normalize(sv.label) === key);
  if (side) return { name: side.name, where: side.note, directions: side.directions };
  return null;
}
