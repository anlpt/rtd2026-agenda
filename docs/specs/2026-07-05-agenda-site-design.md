# RTD 2026 FutureScape — Interactive Agenda Website (Design Spec)

Approved by owner on 2026-07-05.

## Goal

A public, real-time agenda website for the 3rd International Conference
"Resilience by Technology and Design (RTD 2026): FutureScape",
July 15–20 2026, UEH Campus B, Ho Chi Minh City — plus a CMS so
non-technical staff can edit every piece of content.

## Architecture

- **Frontend**: Vite + React + TypeScript, custom CSS design tokens.
- **Hosting**: GitHub Pages (public repo `rtd2026-agenda`), deployed by GitHub Actions.
- **Content**: Supabase (free tier) — tables `days`, `sessions`, `settings`.
  - Public site reads with the anon key (RLS: read-only for anon).
  - Realtime subscription pushes CMS edits to every open browser instantly.
  - Bundled seed data renders the full agenda even before Supabase is configured.
- **CMS**: `#/admin` route. Login `admin / 123` mapped internally to a Supabase
  Auth user (`admin@rtd2026.cms` / `123-rtd2026`). Writes require the
  authenticated role. Explicitly documented as lightweight protection.

## Live behaviour

- "Happening now / up next" computed against Asia/Ho_Chi_Minh time,
  refreshed every 30 s; `?now=2026-07-15T09:30` override for testing/demo.
- Countdown to opening in the hero.

## Content model

- `days`: id, date, label ("Day 1"), title, sort.
- `sessions`: id, day_id, type (keynote|special|parallel|break|ceremony),
  code (K1/SS3/A1…), title, speaker, chair, panelists, room, start_time,
  end_time, description, paper_count, sort.
- `settings`: key/value (hero tagline, announcement banner).
- Seeded from the organiser's spreadsheets: 5 keynotes, 11 special sessions,
  20 parallel sessions across Jul 15–16. Time slots are proposals, editable in CMS.

## Visual direction — "Signal on Red"

- Palette locked: #cc2027 (signal red), #262626 (ink), #ffffff, #fcf2f2 (blush).
- Type: Anton (condensed display, echoes the FUTURESCAPE poster),
  Instrument Sans (body), IBM Plex Mono (times, rooms, codes).
- Signature element: the poster's rising light-beams become the **timeline
  beam spine** of the agenda; the live indicator is a glowing node on it.
- Hero recreates the red planet-horizon + luminous skyline in CSS (beams,
  dotted "data towers", grain), with parallax and a day-switch beam-wipe
  transition. `prefers-reduced-motion` disables all motion.
