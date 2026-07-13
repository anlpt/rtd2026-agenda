import type { Session } from '../types';

// Day 4 — July 18 2026, UEH Mekong Campus (Can Tho).
// Transcribed from "RTD2026_AGENDA_13.07_onepage.pdf".

export const DAY4 = 'day-4';

let n = 400;
const s = (row: Omit<Session, 'id' | 'sort' | 'paper_count'>): Session => ({
  ...row,
  id: `seed-${++n}`,
  sort: n,
  paper_count: row.papers ? row.papers.length : null,
});

export const day4Sessions: Session[] = [
  s({ day_id: DAY4, type: 'break', code: null, title: 'Transportation to Can Tho', speaker: null, chair: null, panelists: null, room: null, start_time: '06:00', end_time: '08:30', description: 'Departure from Vinh Long. For invited guests and paid registered participants only.', papers: null }),
  s({ day_id: DAY4, type: 'showcase', code: null, title: 'Technical Mekong Delta Tour', speaker: null, chair: null, panelists: null, room: null, start_time: '07:00', end_time: '12:30', description: 'For invited guests and paid registered participants only.', papers: null }),
  s({ day_id: DAY4, type: 'special', code: null, title: 'Conference on Smart City Development in Can Tho', speaker: null, chair: 'Assoc. Prof. Tu Anh Trinh — Director, Institute of Smart City and Management, CTD-UEH', panelists: 'Mr. Jose Sanchez-Barroso; Mr. Donghwan Moon; Dr. Christopher Han', room: 'Can Tho', start_time: '09:00', end_time: '11:00', description: 'Delta FutureScape - Defining the smart city strategy for Can Tho as the innovation hub of the Mekong Delta.', papers: null }),
  s({ day_id: DAY4, type: 'break', code: null, title: 'Lunch', speaker: null, chair: null, panelists: null, room: null, start_time: '11:00', end_time: '12:00', description: 'For invited guests and paid registered participants only.', papers: null }),
  s({ day_id: DAY4, type: 'showcase', code: null, title: 'Technical Mekong Delta Tour and Transportation to Nha Trang', speaker: null, chair: null, panelists: null, room: 'Khanh Hoa', start_time: '12:30', end_time: '18:00', description: 'Departure from Can Tho. Three sightseeing stops. For invited guests and paid registered participants only.', papers: null }),
  s({ day_id: DAY4, type: 'break', code: null, title: 'Dinner', speaker: null, chair: null, panelists: null, room: null, start_time: '18:00', end_time: '20:00', description: 'For invited guests only.', papers: null }),
];
