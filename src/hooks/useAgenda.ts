import { useCallback, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { seedData } from '../data/seed';
import type { AgendaData } from '../types';

export interface AgendaState extends AgendaData {
  source: 'seed' | 'live';
  refresh: () => Promise<void>;
}

/**
 * Agenda content. Renders instantly from the bundled seed, then (when
 * Supabase is connected) swaps to live rows and subscribes to realtime
 * changes so CMS edits appear without a refresh.
 */
export function useAgenda(): AgendaState {
  const [data, setData] = useState<AgendaData>(seedData);
  const [source, setSource] = useState<'seed' | 'live'>('seed');

  const refresh = useCallback(async () => {
    if (!supabase) return;
    const [days, sessions, settings] = await Promise.all([
      supabase.from('days').select('*').order('sort'),
      supabase.from('sessions').select('*').order('sort'),
      supabase.from('settings').select('*'),
    ]);
    if (days.error || sessions.error || settings.error) {
      console.error('Agenda fetch failed', days.error ?? sessions.error ?? settings.error);
      return;
    }
    const liveDays = days.data ?? [];
    const liveSessions = sessions.data ?? [];
    // Empty or stale live projects should not hide the bundled PDF agenda.
    // Once Supabase has been reseeded with the full programme, live CMS rows
    // take over again.
    if (liveDays.length < seedData.days.length || liveSessions.length < seedData.sessions.length) {
      setData(seedData);
      setSource('seed');
      return;
    }
    setData({
      days: liveDays,
      sessions: liveSessions,
      settings: Object.fromEntries((settings.data ?? []).map((r) => [r.key, r.value])),
    });
    setSource('live');
  }, []);

  useEffect(() => {
    if (!supabase) return;
    void refresh();
    const channel = supabase
      .channel('agenda-realtime')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'days' }, () => void refresh())
      .on('postgres_changes', { event: '*', schema: 'public', table: 'sessions' }, () => void refresh())
      .on('postgres_changes', { event: '*', schema: 'public', table: 'settings' }, () => void refresh())
      .subscribe();
    return () => {
      void supabase?.removeChannel(channel);
    };
  }, [refresh]);

  return { ...data, source, refresh };
}
