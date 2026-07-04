import { useEffect, useState } from 'react';
import { conferenceClock, getSimulatedNow, type ConferenceClock } from '../lib/time';

const TICK_MS = 1000;

/** Ticking clock in conference time; honours the `?now=` preview override. */
export function useNow(): { now: Date; clock: ConferenceClock } {
  const [now, setNow] = useState<Date>(() => getSimulatedNow() ?? new Date());

  useEffect(() => {
    const simulated = getSimulatedNow();
    const startedAt = Date.now();
    const id = window.setInterval(() => {
      setNow(simulated ? new Date(simulated.getTime() + (Date.now() - startedAt)) : new Date());
    }, TICK_MS);
    return () => window.clearInterval(id);
  }, []);

  return { now, clock: conferenceClock(now) };
}
