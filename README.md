# RTD 2026 FutureScape — Interactive Agenda

Live agenda website for the **3rd International Conference on Resilience by
Technology and Design (RTD 2026): FutureScape** — 15–20 July 2026,
UEH Campus B, Ho Chi Minh City, Vietnam.

- **Public site** — animated hero, day-by-day timeline, filters, live
  "happening now / up next" tracking in Vietnam time.
- **CMS** at `#/admin` — organisers edit every session, day, and site text;
  changes appear on all open browsers instantly (Supabase realtime).
- Ships with the full seeded agenda, so the site works even before the
  database is connected.

## Local development

```bash
npm install
npm run dev
```

Preview live behaviour at any moment with `?now=`, e.g.
`http://localhost:5173/?now=2026-07-15T09:30`.

## Connect the CMS (one-time, ~5 minutes)

1. Create a free project at [supabase.com](https://supabase.com).
2. In **SQL Editor**, paste and run `supabase/schema.sql`, then `supabase/seed.sql`.
3. In **Authentication → Users → Add user**, create:
   - Email: `admin@rtd2026.cms`
   - Password: `123-rtd2026`
   - Check "Auto confirm user".
   (The CMS login form maps username `admin` / password `123` to this user.)
4. In **Project Settings → API**, copy the *Project URL* and *anon public key*
   into `src/config.ts` — or set them as GitHub repository **variables**
   `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` so the deploy workflow
   injects them.
5. Push to `main` (or re-run the deploy workflow). Done — sign in at
   `…/#/admin` with `admin` / `123`.

> The anon key is public by design; row-level security only allows reads.
> The admin credentials are lightweight protection for a public agenda —
> change the password before reusing this setup for anything sensitive.

## Deployment

GitHub Actions (`.github/workflows/deploy.yml`) builds and publishes to
GitHub Pages on every push to `main`.

## Editing the seeded content in code

The bundled fallback agenda lives in `src/data/seed.ts`. After changing it,
regenerate the database seed:

```bash
node --experimental-strip-types scripts/generate-seed-sql.mjs
```
