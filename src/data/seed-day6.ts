import type { Session } from '../types';

// Day 6 — July 20 2026, Khanh Hoa.
// Transcribed from "RTD2026_AGENDA_13.07_onepage.pdf".

export const DAY6 = 'day-6';

let n = 600;
const s = (row: Omit<Session, 'id' | 'sort' | 'paper_count'>): Session => ({
  ...row,
  id: `seed-${++n}`,
  sort: n,
  paper_count: row.papers ? row.papers.length : null,
});

export const day6Sessions: Session[] = [
  s({ day_id: DAY6, type: 'showcase', code: null, title: 'Technical Nha Trang Tour', speaker: null, chair: null, panelists: null, room: 'Khanh Hoa', start_time: '08:00', end_time: '13:45', description: 'For invited guests and paid registered participants only.', papers: null }),
  s({ day_id: DAY6, type: 'break', code: null, title: 'Transportation to Ho Chi Minh', speaker: null, chair: null, panelists: null, room: null, start_time: '14:00', end_time: '14:30', description: 'Departure from Khanh Hoa. For invited guests and paid registered participants only.', papers: null }),
];
