import { useEffect, useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { useAgenda } from '../hooks/useAgenda';
import { CMS_EMAIL_DOMAIN, CMS_PASSWORD_SUFFIX } from '../config';
import type { Day, Session, SessionType } from '../types';
import { SESSION_TYPE_LABEL } from '../types';
import { toMinutes } from '../lib/time';
import './admin.css';

const EMPTY_SESSION = (dayId: string): Session => ({
  id: crypto.randomUUID(),
  day_id: dayId,
  type: 'parallel',
  code: '',
  title: '',
  speaker: '',
  chair: '',
  panelists: '',
  room: '',
  start_time: '09:00',
  end_time: '10:00',
  description: '',
  paper_count: null,
  sort: 999,
});

function nullify(s: Session): Session {
  const trim = (v: string | null) => (v && v.trim() !== '' ? v.trim() : null);
  return {
    ...s,
    code: trim(s.code),
    speaker: trim(s.speaker),
    chair: trim(s.chair),
    panelists: trim(s.panelists),
    room: trim(s.room),
    description: trim(s.description),
  };
}

function LoginGate({ onError, error }: { onError: (msg: string) => void; error: string }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [busy, setBusy] = useState(false);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (!supabase) return;
    setBusy(true);
    const { error: authError } = await supabase.auth.signInWithPassword({
      email: `${username.trim().toLowerCase()}@${CMS_EMAIL_DOMAIN}`,
      password: `${password}${CMS_PASSWORD_SUFFIX}`,
    });
    setBusy(false);
    if (authError) onError('Wrong username or password. Check with the site owner.');
  };

  return (
    <form className="admin-card admin-login" onSubmit={submit}>
      <h2 className="display">Organiser sign-in</h2>
      <label>
        <span className="mono">Username</span>
        <input value={username} onChange={(e) => setUsername(e.target.value)} autoComplete="username" required />
      </label>
      <label>
        <span className="mono">Password</span>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
          required
        />
      </label>
      {error && <p className="admin-error">{error}</p>}
      <button type="submit" className="admin-primary" disabled={busy}>
        {busy ? 'Signing in…' : 'Sign in'}
      </button>
    </form>
  );
}

function SessionForm({
  session,
  days,
  onSave,
  onCancel,
  onDelete,
}: {
  session: Session;
  days: Day[];
  onSave: (s: Session) => void;
  onCancel: () => void;
  onDelete?: (id: string) => void;
}) {
  const [draft, setDraft] = useState<Session>({ ...session });
  const set = <K extends keyof Session>(key: K, value: Session[K]) =>
    setDraft((d) => ({ ...d, [key]: value }));

  return (
    <form
      className="admin-card session-form"
      onSubmit={(e) => {
        e.preventDefault();
        onSave(nullify(draft));
      }}
    >
      <div className="form-grid">
        <label>
          <span className="mono">Day</span>
          <select value={draft.day_id} onChange={(e) => set('day_id', e.target.value)}>
            {days.map((d) => (
              <option key={d.id} value={d.id}>
                {d.label} — {d.date}
              </option>
            ))}
          </select>
        </label>
        <label>
          <span className="mono">Type</span>
          <select value={draft.type} onChange={(e) => set('type', e.target.value as SessionType)}>
            {Object.entries(SESSION_TYPE_LABEL).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </label>
        <label>
          <span className="mono">Code (K1, SS3, A1…)</span>
          <input value={draft.code ?? ''} onChange={(e) => set('code', e.target.value)} />
        </label>
        <label>
          <span className="mono">Room</span>
          <input value={draft.room ?? ''} onChange={(e) => set('room', e.target.value)} />
        </label>
        <label>
          <span className="mono">Starts</span>
          <input type="time" value={draft.start_time} onChange={(e) => set('start_time', e.target.value)} required />
        </label>
        <label>
          <span className="mono">Ends</span>
          <input type="time" value={draft.end_time} onChange={(e) => set('end_time', e.target.value)} required />
        </label>
      </div>
      <label>
        <span className="mono">Title</span>
        <input value={draft.title} onChange={(e) => set('title', e.target.value)} required />
      </label>
      <label>
        <span className="mono">Speaker (keynotes)</span>
        <input value={draft.speaker ?? ''} onChange={(e) => set('speaker', e.target.value)} />
      </label>
      <label>
        <span className="mono">Chair</span>
        <input value={draft.chair ?? ''} onChange={(e) => set('chair', e.target.value)} />
      </label>
      <label>
        <span className="mono">Panelists (separate with ;)</span>
        <input value={draft.panelists ?? ''} onChange={(e) => set('panelists', e.target.value)} />
      </label>
      <div className="form-grid">
        <label>
          <span className="mono">Number of papers</span>
          <input
            type="number"
            min={0}
            value={draft.paper_count ?? ''}
            onChange={(e) => set('paper_count', e.target.value === '' ? null : Number(e.target.value))}
          />
        </label>
      </div>
      <label>
        <span className="mono">Description</span>
        <textarea rows={3} value={draft.description ?? ''} onChange={(e) => set('description', e.target.value)} />
      </label>
      <div className="form-actions">
        <button type="submit" className="admin-primary">
          Save session
        </button>
        <button type="button" className="admin-ghost" onClick={onCancel}>
          Cancel
        </button>
        {onDelete && (
          <button
            type="button"
            className="admin-danger"
            onClick={() => {
              if (window.confirm(`Delete "${draft.title}"? This is immediate and public.`)) onDelete(draft.id);
            }}
          >
            Delete
          </button>
        )}
      </div>
    </form>
  );
}

export function AdminPage() {
  const agenda = useAgenda();
  const [authed, setAuthed] = useState(false);
  const [checked, setChecked] = useState(false);
  const [error, setError] = useState('');
  const [status, setStatus] = useState('');
  const [activeDayId, setActiveDayId] = useState<string | null>(null);
  const [editing, setEditing] = useState<Session | null>(null);
  const [adding, setAdding] = useState(false);
  const [tagline, setTagline] = useState<string | null>(null);
  const [announcement, setAnnouncement] = useState<string | null>(null);

  useEffect(() => {
    if (!supabase) {
      setChecked(true);
      return;
    }
    void supabase.auth.getSession().then(({ data }) => {
      setAuthed(!!data.session);
      setChecked(true);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_evt, session) => setAuthed(!!session));
    return () => sub.subscription.unsubscribe();
  }, []);

  const day = agenda.days.find((d) => d.id === activeDayId) ?? agenda.days[0];
  const daySessions = agenda.sessions
    .filter((s) => s.day_id === day?.id)
    .sort((a, b) => toMinutes(a.start_time) - toMinutes(b.start_time) || a.sort - b.sort);

  const flash = (msg: string) => {
    setStatus(msg);
    window.setTimeout(() => setStatus(''), 3500);
  };

  const saveSession = async (s: Session) => {
    if (!supabase) return;
    const { error: err } = await supabase.from('sessions').upsert(s);
    if (err) {
      flash(`Save failed: ${err.message}`);
      return;
    }
    setEditing(null);
    setAdding(false);
    await agenda.refresh();
    flash('Saved — live on the site now.');
  };

  const deleteSession = async (id: string) => {
    if (!supabase) return;
    const { error: err } = await supabase.from('sessions').delete().eq('id', id);
    if (err) {
      flash(`Delete failed: ${err.message}`);
      return;
    }
    setEditing(null);
    await agenda.refresh();
    flash('Session deleted.');
  };

  const saveSettings = async () => {
    if (!supabase) return;
    const rows = [
      { key: 'hero_tagline', value: tagline ?? agenda.settings.hero_tagline ?? '' },
      { key: 'announcement', value: announcement ?? agenda.settings.announcement ?? '' },
    ];
    const { error: err } = await supabase.from('settings').upsert(rows);
    if (err) {
      flash(`Save failed: ${err.message}`);
      return;
    }
    await agenda.refresh();
    flash('Site settings saved.');
  };

  if (!supabase) {
    return (
      <div className="admin">
        <AdminHeader authed={false} />
        <div className="admin-card">
          <h2 className="display">CMS not connected yet</h2>
          <p>
            The site is currently showing the built-in agenda. To enable live editing, the owner
            connects a free Supabase project (instructions in the repository README), fills in
            <code> src/config.ts</code>, and redeploys. After that, organisers can sign in here and
            every edit appears on the public site instantly.
          </p>
          <Link className="admin-ghost admin-backlink" to="/">
            ← Back to the agenda
          </Link>
        </div>
      </div>
    );
  }

  if (!checked) return null;

  if (!authed) {
    return (
      <div className="admin">
        <AdminHeader authed={false} />
        <LoginGate error={error} onError={setError} />
      </div>
    );
  }

  return (
    <div className="admin">
      <AdminHeader authed onSignOut={() => void supabase?.auth.signOut()} />
      {status && (
        <p className="admin-status" role="status">
          {status}
        </p>
      )}
      {agenda.source === 'seed' && (
        <p className="admin-error">
          Heads-up: the database looks empty, so the public site is showing the built-in agenda.
          Run the seed SQL from the README to load the content here.
        </p>
      )}

      <section className="admin-card">
        <h2 className="display">Site settings</h2>
        <label>
          <span className="mono">Hero tagline</span>
          <input
            value={tagline ?? agenda.settings.hero_tagline ?? ''}
            onChange={(e) => setTagline(e.target.value)}
          />
        </label>
        <label>
          <span className="mono">Announcement banner (empty = hidden)</span>
          <input
            value={announcement ?? agenda.settings.announcement ?? ''}
            onChange={(e) => setAnnouncement(e.target.value)}
            placeholder="e.g. Room change: SS4 moves to B1.206"
          />
        </label>
        <div className="form-actions">
          <button type="button" className="admin-primary" onClick={() => void saveSettings()}>
            Save settings
          </button>
        </div>
      </section>

      <section className="admin-card">
        <div className="admin-card-head">
          <h2 className="display">Sessions</h2>
          <div className="admin-day-picker">
            {agenda.days.map((d) => (
              <button
                key={d.id}
                type="button"
                className={`filter-chip mono${d.id === day?.id ? ' is-active' : ''}`}
                onClick={() => {
                  setActiveDayId(d.id);
                  setEditing(null);
                  setAdding(false);
                }}
              >
                {d.label} · {d.date.slice(5)}
              </button>
            ))}
          </div>
        </div>

        {!adding && !editing && (
          <button type="button" className="admin-primary" onClick={() => setAdding(true)}>
            + Add a session to {day?.label}
          </button>
        )}

        {adding && day && (
          <SessionForm
            session={EMPTY_SESSION(day.id)}
            days={agenda.days}
            onSave={(s) => void saveSession(s)}
            onCancel={() => setAdding(false)}
          />
        )}

        {editing && (
          <SessionForm
            session={editing}
            days={agenda.days}
            onSave={(s) => void saveSession(s)}
            onCancel={() => setEditing(null)}
            onDelete={(id) => void deleteSession(id)}
          />
        )}

        {!editing && !adding && (
          <ul className="admin-session-list">
            {daySessions.map((s) => (
              <li key={s.id}>
                <button type="button" className="admin-session-row" onClick={() => setEditing(s)}>
                  <span className="mono admin-session-time">
                    {s.start_time}–{s.end_time}
                  </span>
                  <span className="mono admin-session-code">{s.code ?? SESSION_TYPE_LABEL[s.type]}</span>
                  <span className="admin-session-title">{s.title}</span>
                  <span className="mono admin-session-room">{s.room ?? '—'}</span>
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}

function AdminHeader({ authed, onSignOut }: { authed: boolean; onSignOut?: () => void }) {
  return (
    <header className="admin-header">
      <div>
        <p className="mono">RTD 2026 Futurescape</p>
        <h1 className="display">Agenda CMS</h1>
      </div>
      <nav className="admin-header-nav">
        <Link className="admin-ghost" to="/">
          View site
        </Link>
        {authed && onSignOut && (
          <button type="button" className="admin-ghost" onClick={onSignOut}>
            Sign out
          </button>
        )}
      </nav>
    </header>
  );
}
