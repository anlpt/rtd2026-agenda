// Supabase project credentials.
// The anon key is safe to publish: row-level security only allows reads
// for anonymous visitors; writes require the authenticated CMS user.
// Fill these in (or set VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY) to go live.
export const SUPABASE_URL: string = import.meta.env.VITE_SUPABASE_URL ?? '';
export const SUPABASE_ANON_KEY: string = import.meta.env.VITE_SUPABASE_ANON_KEY ?? '';

// Login form maps the short CMS credentials to the Supabase Auth user.
export const CMS_EMAIL_DOMAIN = 'rtd2026.cms';
export const CMS_PASSWORD_SUFFIX = '-rtd2026';

export const CONFERENCE_TIMEZONE = 'Asia/Ho_Chi_Minh';
export const CONFERENCE_OPENING_ISO = '2026-07-15T08:00:00+07:00';
export const CONFERENCE_WEBSITE =
  'https://conference.ueh.edu.vn/conference/the-3rd-international-conference-resilience-by-technology-and-design-rtd-2026-futurescape';
