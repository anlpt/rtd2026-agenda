// Regenerates supabase/seed.sql from src/data/seed.ts so the database
// starts with exactly the content the site ships with.
// Usage: node --experimental-strip-types scripts/generate-seed-sql.mjs
import { writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
// Compose from the per-day modules (Node's type-stripping loader needs
// explicit file paths, unlike Vite's extensionless resolution).
const { day1Sessions } = await import(join(root, 'src/data/seed-day1.ts'));
const { day2Sessions } = await import(join(root, 'src/data/seed-day2.ts'));
const { day3Sessions } = await import(join(root, 'src/data/seed-day3.ts'));
const { day4Sessions } = await import(join(root, 'src/data/seed-day4.ts'));
const { day5Sessions } = await import(join(root, 'src/data/seed-day5.ts'));
const { day6Sessions } = await import(join(root, 'src/data/seed-day6.ts'));
const { seedMeta } = await import(join(root, 'src/data/seed-meta.ts'));
const seedData = {
  ...seedMeta,
  sessions: [...day1Sessions, ...day2Sessions, ...day3Sessions, ...day4Sessions, ...day5Sessions, ...day6Sessions],
};

const q = (v) => (v === null || v === undefined ? 'null' : `'${String(v).replaceAll("'", "''")}'`);

const lines = [
  '-- Generated from src/data/seed.ts — do not edit by hand.',
  '',
  '-- Replace previously seeded rows (CMS-created rows are untouched).',
  "delete from public.sessions where id like 'seed-%';",
  '',
];

for (const d of seedData.days) {
  lines.push(
    `insert into public.days (id, date, label, title, sort) values (${q(d.id)}, ${q(d.date)}, ${q(d.label)}, ${q(d.title)}, ${d.sort}) on conflict (id) do update set date = excluded.date, label = excluded.label, title = excluded.title, sort = excluded.sort;`,
  );
}
lines.push('');
const qJson = (v) => (v == null ? 'null' : `'${JSON.stringify(v).replaceAll("'", "''")}'::jsonb`);

for (const s of seedData.sessions) {
  lines.push(
    `insert into public.sessions (id, day_id, type, code, title, speaker, chair, panelists, room, start_time, end_time, description, paper_count, papers, sort) values (${q(s.id)}, ${q(s.day_id)}, ${q(s.type)}, ${q(s.code)}, ${q(s.title)}, ${q(s.speaker)}, ${q(s.chair)}, ${q(s.panelists)}, ${q(s.room)}, ${q(s.start_time)}, ${q(s.end_time)}, ${q(s.description)}, ${s.paper_count ?? 'null'}, ${qJson(s.papers)}, ${s.sort}) on conflict (id) do nothing;`,
  );
}
lines.push('');
for (const [key, value] of Object.entries(seedData.settings)) {
  lines.push(`insert into public.settings (key, value) values (${q(key)}, ${q(value)}) on conflict (key) do nothing;`);
}
lines.push('');

writeFileSync(join(root, 'supabase/seed.sql'), lines.join('\n'));
console.log(`Wrote supabase/seed.sql (${seedData.sessions.length} sessions).`);
