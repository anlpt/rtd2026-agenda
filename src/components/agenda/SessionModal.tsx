import { useEffect, useRef } from 'react';
import type { Session } from '../../types';
import { SESSION_TYPE_LABEL } from '../../types';
import { findVenue } from '../../data/venue';

interface Props {
  session: Session;
  onClose: () => void;
  /** Jump to the 3D venue map with this room selected. */
  onLocate?: (room: string) => void;
}

export function SessionModal({ session, onClose, onLocate }: Props) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (!dialog.open) dialog.showModal();
    const onCancel = (e: Event) => {
      e.preventDefault();
      onClose();
    };
    dialog.addEventListener('cancel', onCancel);
    return () => dialog.removeEventListener('cancel', onCancel);
  }, [onClose]);

  const panelists = session.panelists
    ?.split(';')
    .map((p) => p.trim())
    .filter(Boolean);

  const venue = findVenue(session.room);

  return (
    <dialog
      ref={ref}
      className="session-modal"
      aria-label={session.title}
      onClick={(e) => {
        if (e.target === ref.current) onClose();
      }}
    >
      <article className="modal-body">
        <header className="modal-head">
          <div className="card-head">
            {session.code && <span className="mono chip chip-code">{session.code}</span>}
            <span className="mono card-type">{SESSION_TYPE_LABEL[session.type]}</span>
          </div>
          <button type="button" className="modal-close mono" onClick={onClose}>
            Close ✕
          </button>
        </header>
        <h3 className="display modal-title">{session.title}</h3>
        <div className="modal-facts mono">
          <span>
            {session.start_time}–{session.end_time}
          </span>
          {session.room && <span>{session.room}</span>}
          {session.paper_count != null && <span>{session.paper_count} papers</span>}
        </div>
        {session.speaker && (
          <section className="modal-section">
            <h4 className="mono modal-section-label">Speaker</h4>
            <p>{session.speaker}</p>
          </section>
        )}
        {session.chair && (
          <section className="modal-section">
            <h4 className="mono modal-section-label">Chair</h4>
            <p>{session.chair}</p>
          </section>
        )}
        {panelists && panelists.length > 0 && (
          <section className="modal-section">
            <h4 className="mono modal-section-label">Panelists</h4>
            <ul className="modal-panelists">
              {panelists.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
          </section>
        )}
        {session.description && (
          <section className="modal-section">
            <h4 className="mono modal-section-label">About</h4>
            <p>{session.description}</p>
          </section>
        )}
        {venue && (
          <section className="modal-section modal-wayfinding">
            <h4 className="mono modal-section-label">Getting there — {venue.where}</h4>
            <ol className="modal-directions">
              {venue.directions.map((step, i) => (
                <li key={i}>{step}</li>
              ))}
            </ol>
            {onLocate && session.room && (
              <button
                type="button"
                className="modal-locate mono"
                onClick={() => {
                  onClose();
                  onLocate(session.room!);
                }}
              >
                View in the 3D building map ↓
              </button>
            )}
          </section>
        )}
        {session.papers && session.papers.length > 0 && (
          <section className="modal-section">
            <h4 className="mono modal-section-label">Presentations</h4>
            <ol className="modal-papers">
              {session.papers.map((paper) => (
                <li key={paper.code} className="modal-paper">
                  <span className="mono modal-paper-meta">
                    {paper.time} · {paper.code}
                  </span>
                  <span className="modal-paper-title">{paper.title}</span>
                  <span className="modal-paper-authors">{paper.authors}</span>
                </li>
              ))}
            </ol>
          </section>
        )}
      </article>
    </dialog>
  );
}
