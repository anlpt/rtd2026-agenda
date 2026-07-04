import { Link } from 'react-router-dom';
import { Hero } from '../components/hero/Hero';
import { Agenda } from '../components/agenda/Agenda';
import { useAgenda } from '../hooks/useAgenda';
import { useNow } from '../hooks/useNow';
import { CONFERENCE_WEBSITE } from '../config';

export function PublicPage() {
  const { days, sessions, settings } = useAgenda();
  const { now, clock } = useNow();

  return (
    <>
      <Hero tagline={settings.hero_tagline ?? ''} now={now} />
      {settings.announcement && (
        <div className="announcement" role="status">
          <span className="mono">Notice</span>
          <p>{settings.announcement}</p>
        </div>
      )}
      <main>
        <Agenda days={days} sessions={sessions} clock={clock} />
      </main>
      <footer className="site-footer">
        <div className="footer-inner">
          <h2 className="display footer-title">
            RTD 2026 <span>Futurescape</span>
          </h2>
          <div className="footer-meta">
            <span>The 3rd International Conference on Resilience by Technology and Design</span>
            <span>15–20 July 2026 · UEH Campus B · Ho Chi Minh City, Vietnam</span>
            <span>
              <a href={CONFERENCE_WEBSITE} target="_blank" rel="noreferrer">
                Conference website
              </a>
              {' · '}
              <Link to="/admin">Organisers</Link>
            </span>
          </div>
        </div>
      </footer>
    </>
  );
}
