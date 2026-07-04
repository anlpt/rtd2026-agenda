export type SessionType = 'keynote' | 'special' | 'parallel' | 'break' | 'ceremony';

export interface Day {
  id: string;
  date: string; // ISO date, e.g. '2026-07-15'
  label: string; // 'Day 1'
  title: string; // 'Keynotes & FutureScape Sessions'
  sort: number;
}

export interface Session {
  id: string;
  day_id: string;
  type: SessionType;
  code: string | null; // K1, SS3, A1…
  title: string;
  speaker: string | null; // keynote speaker line
  chair: string | null;
  panelists: string | null;
  room: string | null;
  start_time: string; // 'HH:MM'
  end_time: string; // 'HH:MM'
  description: string | null;
  paper_count: number | null;
  sort: number;
}

export type Settings = Record<string, string>;

export interface AgendaData {
  days: Day[];
  sessions: Session[];
  settings: Settings;
}

export const SESSION_TYPE_LABEL: Record<SessionType, string> = {
  keynote: 'Keynote',
  special: 'Special Session',
  parallel: 'Parallel Session',
  break: 'Break',
  ceremony: 'Ceremony',
};
