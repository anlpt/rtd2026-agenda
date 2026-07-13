import type { Day, Settings } from '../types';

// Day ids must match DAY1/DAY2 in seed-day1.ts / seed-day2.ts.
// (No import: the Node type-stripping loader used by the seed-SQL
// generator cannot resolve extensionless module paths.)
export const seedMeta: { days: Day[]; settings: Settings } = {
  days: [
    { id: 'day-1', date: '2026-07-15', label: 'Day 1', title: 'Opening, Keynotes, FutureScape Sessions & Tracks A–C', sort: 1 },
    { id: 'day-2', date: '2026-07-16', label: 'Day 2', title: 'Keynotes, FutureScape Sessions, CTD Summit & Tracks D–E', sort: 2 },
  ],
  settings: {
    hero_tagline: 'The 3rd International Conference on Resilience by Technology and Design',
    announcement: '',
    support_note:
      'Technical & logistical support: rtd@ueh.edu.vn · On-site (Jul 15–16): Rooms B1.305 & B1.306, UEH Campus B, 279 Nguyen Tri Phuong, Ho Chi Minh City — Ms. Mi Trang, WhatsApp +84 978 840 897',
    post_conference_note:
      'The programme continues beyond Ho Chi Minh City: July 17–18 at UEH Mekong Campus (Vinh Long & Can Tho) and July 19–20 at UEH Nexus Nha Trang Campus (Khanh Hoa), with keynotes, Delta & Blue FutureScape sessions, technical tours and the Best Paper Award farewell dinner.',
  },
};
