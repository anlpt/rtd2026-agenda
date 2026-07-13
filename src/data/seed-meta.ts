import type { Day, Settings } from '../types';

// Day ids must match DAY1–DAY6 in the per-day seed files.
// (No import: the Node type-stripping loader used by the seed-SQL
// generator cannot resolve extensionless module paths.)
export const seedMeta: { days: Day[]; settings: Settings } = {
  days: [
    { id: 'day-1', date: '2026-07-15', label: 'Day 1', title: 'Opening, Keynotes, FutureScape Sessions & Tracks A–C', sort: 1 },
    { id: 'day-2', date: '2026-07-16', label: 'Day 2', title: 'Keynotes, FutureScape Sessions, CTD Summit & Tracks D–E', sort: 2 },
    { id: 'day-3', date: '2026-07-17', label: 'Day 3', title: 'UEH Mekong Campus: Delta FutureScape Sessions & Tracks M1–M4', sort: 3 },
    { id: 'day-4', date: '2026-07-18', label: 'Day 4', title: 'Can Tho Smart City Session & Mekong Delta Technical Tour', sort: 4 },
    { id: 'day-5', date: '2026-07-19', label: 'Day 5', title: 'UEH Nexus Nha Trang: Blue FutureScape Sessions & Tracks NX1–NX3', sort: 5 },
    { id: 'day-6', date: '2026-07-20', label: 'Day 6', title: 'Technical Nha Trang Tour & Return to Ho Chi Minh City', sort: 6 },
  ],
  settings: {
    hero_tagline: 'The 3rd International Conference on Resilience by Technology and Design',
    announcement: '',
    support_note:
      'Technical & logistical support: rtd@ueh.edu.vn · On-site (Jul 15–16): Rooms B1.305 & B1.306, UEH Campus B, 279 Nguyen Tri Phuong, Ho Chi Minh City — Ms. Mi Trang, WhatsApp +84 978 840 897',
    post_conference_note:
      'The full programme runs July 15–20 across UEH Campus B, UEH Mekong Campus and UEH Nexus Nha Trang Campus, with FutureScape sessions, technical tours and the RTD 2026 Best Paper Award farewell dinner.',
  },
};
