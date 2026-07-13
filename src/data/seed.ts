import type { AgendaData } from '../types';
import { day1Sessions } from './seed-day1';
import { day2Sessions } from './seed-day2';
import { seedMeta } from './seed-meta';

// Bundled fallback agenda (HCMC days). Source of truth once live: Supabase.
// July 17–20 continue at UEH Mekong & Nexus Nha Trang — covered by the
// post-conference note, not the schedule board.

export const seedData: AgendaData = {
  ...seedMeta,
  sessions: [...day1Sessions, ...day2Sessions],
};
