import type { AgendaData } from '../types';
import { day1Sessions } from './seed-day1';
import { day2Sessions } from './seed-day2';
import { day3Sessions } from './seed-day3';
import { day4Sessions } from './seed-day4';
import { day5Sessions } from './seed-day5';
import { day6Sessions } from './seed-day6';
import { seedMeta } from './seed-meta';

// Bundled fallback agenda. Source of truth once live: Supabase.

export const seedData: AgendaData = {
  ...seedMeta,
  sessions: [...day1Sessions, ...day2Sessions, ...day3Sessions, ...day4Sessions, ...day5Sessions, ...day6Sessions],
};
