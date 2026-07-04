import type { Session } from '../../types';
import { SESSION_TYPE_LABEL } from '../../types';

interface Props {
  session: Session;
  isLive: boolean;
  isNext: boolean;
  onOpen: (session: Session) => void;
}

function StatusChip({ isLive, isNext }: { isLive: boolean; isNext: boolean }) {
  if (isLive)
    return (
      <span className="mono chip chip-live">
        <span className="live-dot" aria-hidden="true" /> Live now
      </span>
    );
  if (isNext) return <span className="mono chip chip-next">Up next</span>;
  return null;
}

export function SessionCard({ session, isLive, isNext, onOpen }: Props) {
  const { type } = session;

  if (type === 'break') {
    return (
      <div className={`break-row${isLive ? ' is-live' : ''}`}>
        <span className="mono">{session.title}</span>
        {session.room && <span className="mono break-room">{session.room}</span>}
        <StatusChip isLive={isLive} isNext={isNext} />
      </div>
    );
  }

  const person = session.speaker ?? session.chair;
  const personLabel = session.speaker ? 'Speaker' : 'Chair';

  return (
    <button
      type="button"
      className={`card card-${type}${isLive ? ' is-live' : ''}`}
      onClick={() => onOpen(session)}
      aria-haspopup="dialog"
    >
      <div className="card-head">
        {session.code && <span className="mono chip chip-code">{session.code}</span>}
        <span className="mono card-type">{SESSION_TYPE_LABEL[type]}</span>
        <StatusChip isLive={isLive} isNext={isNext} />
      </div>
      <h4 className={type === 'keynote' ? 'display card-title-keynote' : 'card-title'}>{session.title}</h4>
      {person && (
        <p className="card-person">
          <span className="mono card-person-label">{personLabel}</span>
          {person}
        </p>
      )}
      <div className="card-foot mono">
        <span>
          {session.start_time}–{session.end_time}
        </span>
        {session.room && <span>{session.room}</span>}
        {session.paper_count != null && <span>{session.paper_count} papers</span>}
      </div>
    </button>
  );
}
