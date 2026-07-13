import { useEffect, useState } from 'react';
import { CONFERENCE_OPENING_ISO } from '../../config';
import { formatCountdown } from '../../lib/time';
import './hero.css';

const BEAMS = [
  { left: '18%', width: 42, height: 34, opacity: 0.35, delay: '0s' },
  { left: '26%', width: 26, height: 48, opacity: 0.5, delay: '-3s' },
  { left: '33%', width: 64, height: 62, opacity: 0.75, delay: '-6s' },
  { left: '42%', width: 30, height: 44, opacity: 0.45, delay: '-1.5s' },
  { left: '47%', width: 88, height: 78, opacity: 0.9, delay: '-4.5s' },
  { left: '56%', width: 34, height: 52, opacity: 0.55, delay: '-8s' },
  { left: '62%', width: 58, height: 66, opacity: 0.7, delay: '-2.5s' },
  { left: '71%', width: 28, height: 40, opacity: 0.4, delay: '-7s' },
  { left: '77%', width: 40, height: 30, opacity: 0.3, delay: '-5s' },
];

function Countdown({ now }: { now: Date }) {
  const msLeft = new Date(CONFERENCE_OPENING_ISO).getTime() - now.getTime();
  const t = formatCountdown(msLeft);
  const cells = [
    { value: t.days, unit: 'days' },
    { value: t.hours, unit: 'hrs' },
    { value: t.minutes, unit: 'min' },
    { value: t.seconds, unit: 'sec' },
  ];
  if (msLeft <= 0) return <p className="mono hero-live-note">● The conference is underway — see what's happening below</p>;
  return (
    <div className="countdown" role="timer" aria-label="Countdown to conference opening">
      {cells.map((c) => (
        <div key={c.unit} className="countdown-cell">
          <span className="countdown-value">{c.value}</span>
          <span className="mono countdown-unit">{c.unit}</span>
        </div>
      ))}
    </div>
  );
}

export function Hero({ tagline, now }: { tagline: string; now: Date }) {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => setOffset(Math.min(window.scrollY, 900)));
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <header className="hero" aria-label="RTD 2026 FutureScape">
      <div className="hero-sky" style={{ transform: `translateY(${offset * 0.18}px)` }}>
        {BEAMS.map((b, i) => (
          <span
            key={i}
            className="beam"
            style={{
              left: b.left,
              width: b.width,
              height: `${b.height}%`,
              opacity: b.opacity,
              animationDelay: b.delay,
            }}
          />
        ))}
        <span className="tower" style={{ left: '30%', height: '38%' }} />
        <span className="tower" style={{ left: '52%', height: '55%' }} />
        <span className="tower" style={{ left: '66%', height: '42%' }} />
      </div>
      <div className="hero-planet" aria-hidden="true" />
      <div className="hero-grain" aria-hidden="true" />

      <div className="hero-top mono">
        <span>UEH University · College of Technology and Design</span>
        <a href="#agenda" className="hero-top-link">
          Agenda ↓
        </a>
      </div>

      <div className="hero-content">
        <p className="mono hero-kicker" data-reveal>
          {tagline}
        </p>
        <h1 className="display hero-title">
          <span className="hero-rtd" data-reveal>
            RTD·2026
          </span>
          <span className="hero-futurescape" data-reveal>
            Futurescape
          </span>
        </h1>
        <p className="mono hero-meta" data-reveal>
          15–20 July 2026 · Ho Chi Minh City · Vinh Long · Khanh Hoa
        </p>
        <div data-reveal>
          <Countdown now={now} />
        </div>
      </div>

      <a href="#agenda" className="scroll-cue mono" aria-label="Scroll to agenda">
        <span className="scroll-cue-beam" aria-hidden="true" />
        explore the agenda
      </a>
    </header>
  );
}
