"use client";
import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import type { Locale } from "./i18n";
import { gradeVocab, newVocabState, todayKey, computeStreak, type VocabState } from "./core";
import { LESSONS } from "@/data/curriculum";

export interface AppState {
  onboarded: boolean;
  name: string;
  goal: string;
  level: string;
  dailyGoalMin: number;
  locale: Locale;
  theme: "light" | "dark";
  showTranslit: boolean;
  reduceMotion: boolean;
  xp: number;
  hearts: number; // refills daily; never blocks learning — purely informational in TIL
  completedLessons: Record<string, { xp: number; accuracy: number; at: number }>;
  vocab: Record<string, VocabState>;
  activity: Record<string, number>; // date -> xp earned
  storiesDone: string[];
  totalCorrect: number;
  totalAnswered: number;
  listeningCorrect: number;
}

const DEFAULT_STATE: AppState = {
  onboarded: false, name: "", goal: "", level: "new", dailyGoalMin: 10,
  locale: "en", theme: "light", showTranslit: true, reduceMotion: false,
  xp: 0, hearts: 5, completedLessons: {}, vocab: {}, activity: {},
  storiesDone: [], totalCorrect: 0, totalAnswered: 0, listeningCorrect: 0,
};

const KEY = "til-state-v1";

interface Store {
  state: AppState;
  ready: boolean;
  patch: (p: Partial<AppState>) => void;
  recordAnswer: (vocabIds: string[], correct: boolean, skill?: string) => void;
  introduceVocab: (ids: string[]) => void;
  completeLesson: (lessonId: string, xpEarned: number, accuracy: number) => void;
  toggleSaved: (id: string) => void;
  completeStory: (id: string, xp: number) => void;
  earnXp: (xp: number) => void;
  resetAll: () => void;
  dueVocabIds: string[];
  streak: number;
  nextLessonId: string | null;
  isLessonUnlocked: (lessonId: string) => boolean;
}

const Ctx = createContext<Store | null>(null);

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AppState>(DEFAULT_STATE);
  const [ready, setReady] = useState(false);
  const loaded = useRef(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) {
        const parsed = { ...DEFAULT_STATE, ...JSON.parse(raw) };
        // hearts quietly refill each new day — informational only, never a gate
        if (!parsed.activity[todayKey()]) parsed.hearts = 5;
        setState(parsed);
      }
    } catch { /* fresh start */ }
    loaded.current = true;
    setReady(true);
  }, []);

  useEffect(() => {
    if (!loaded.current) return;
    try { localStorage.setItem(KEY, JSON.stringify(state)); } catch { /* storage full */ }
    document.documentElement.dataset.theme = state.theme;
    document.documentElement.lang = state.locale;
  }, [state]);

  const patch = useCallback((p: Partial<AppState>) => setState((s) => ({ ...s, ...p })), []);

  const recordAnswer = useCallback((vocabIds: string[], correct: boolean, skill?: string) => {
    setState((s) => {
      const vocab = { ...s.vocab };
      const now = Date.now();
      for (const id of vocabIds) {
        vocab[id] = gradeVocab(vocab[id] ?? newVocabState(now), correct, now);
      }
      return {
        ...s, vocab,
        totalAnswered: s.totalAnswered + 1,
        totalCorrect: s.totalCorrect + (correct ? 1 : 0),
        listeningCorrect: s.listeningCorrect + (correct && skill === "listen" ? 1 : 0),
        hearts: correct ? s.hearts : Math.max(0, s.hearts - 1),
      };
    });
  }, []);

  const introduceVocab = useCallback((ids: string[]) => {
    setState((s) => {
      const vocab = { ...s.vocab };
      const now = Date.now();
      for (const id of ids) if (!vocab[id]) vocab[id] = newVocabState(now);
      return { ...s, vocab };
    });
  }, []);

  const earnXp = useCallback((xp: number) => {
    setState((s) => {
      const day = todayKey();
      return { ...s, xp: s.xp + xp, activity: { ...s.activity, [day]: (s.activity[day] ?? 0) + xp } };
    });
  }, []);

  const completeLesson = useCallback((lessonId: string, xpEarned: number, accuracy: number) => {
    setState((s) => {
      const already = s.completedLessons[lessonId];
      const gained = already ? Math.min(5, xpEarned) : xpEarned; // replays earn a little, never farmable
      const day = todayKey();
      return {
        ...s,
        xp: s.xp + gained,
        activity: { ...s.activity, [day]: (s.activity[day] ?? 0) + gained },
        completedLessons: { ...s.completedLessons, [lessonId]: { xp: xpEarned, accuracy, at: Date.now() } },
        hearts: Math.min(5, s.hearts + 1),
      };
    });
  }, []);

  const toggleSaved = useCallback((id: string) => {
    setState((s) => {
      const cur = s.vocab[id] ?? newVocabState();
      return { ...s, vocab: { ...s.vocab, [id]: { ...cur, saved: !cur.saved } } };
    });
  }, []);

  const completeStory = useCallback((id: string, xp: number) => {
    setState((s) => {
      if (s.storiesDone.includes(id)) return s;
      const day = todayKey();
      return { ...s, storiesDone: [...s.storiesDone, id], xp: s.xp + xp, activity: { ...s.activity, [day]: (s.activity[day] ?? 0) + xp } };
    });
  }, []);

  const resetAll = useCallback(() => setState((s) => ({ ...DEFAULT_STATE, locale: s.locale, theme: s.theme, onboarded: s.onboarded })), []);

  const dueVocabIds = useMemo(() => {
    const now = Date.now();
    return Object.entries(state.vocab).filter(([, v]) => v.seen > 0 && v.due <= now).map(([id]) => id);
  }, [state.vocab]);

  const streak = useMemo(() => computeStreak(state.activity), [state.activity]);

  const nextLessonId = useMemo(() => {
    return LESSONS.find((l) => !state.completedLessons[l.id])?.id ?? null;
  }, [state.completedLessons]);

  const isLessonUnlocked = useCallback((lessonId: string) => {
    const idx = LESSONS.findIndex((l) => l.id === lessonId);
    if (idx <= 0) return true;
    return !!state.completedLessons[LESSONS[idx - 1].id];
  }, [state.completedLessons]);

  const value: Store = { state, ready, patch, recordAnswer, introduceVocab, completeLesson, toggleSaved, completeStory, earnXp, resetAll, dueVocabIds, streak, nextLessonId, isLessonUnlocked };
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useStore(): Store {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useStore outside provider");
  return ctx;
}
