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
      'Technical & logistical support: rtd@ueh.edu.vn · Jul 15–16 Ho Chi Minh City: Rooms B1.305 & B1.306, UEH Campus B, 279 Nguyen Tri Phuong Street, Dien Hong Ward — Ms. Mi Trang, WhatsApp +84 978 840 897 · Jul 17–18 Vinh Long/Mekong: Room C1.2, UEH Mekong, 1B Nguyen Trung Truc Street, Tan Hanh Ward — Mr. Duy Thanh, WhatsApp +84 918 017 473; Ms. Thanh Quyen, WhatsApp +84 917 477 699 · Jul 19–20 Nha Trang/Khanh Hoa: Tran Vien Dong Nha Trang Hotel, 15 Tran Hung Dao Street, Nha Trang Ward — Ms. Thanh Thanh, WhatsApp +84 888 480 976',
    post_conference_note:
      'The full programme runs July 15–20 across UEH Campus B, UEH Mekong Campus and UEH Nexus Nha Trang Campus, with FutureScape sessions, technical tours and the RTD 2026 Best Paper Award farewell dinner.',
  },
};
