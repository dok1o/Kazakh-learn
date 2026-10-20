/* Audio, validation, SRS — small, honest, testable modules. */
"use client";

/** Speak Kazakh text via Web Speech API. Prefers a kk-KZ voice,
 *  falls back to a Cyrillic-capable voice. Returns false when
 *  no speech synthesis is available (UI shows an honest notice). */
export function speak(text: string, opts?: { rate?: number; lang?: string }): boolean {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return false;
  try {
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    const voices = window.speechSynthesis.getVoices();
    const lang = opts?.lang ?? "kk-KZ";
    const voice =
      voices.find((v) => v.lang.toLowerCase().startsWith(lang.slice(0, 2))) ||
      voices.find((v) => v.lang.toLowerCase().startsWith("kk")) ||
      voices.find((v) => v.lang.toLowerCase().startsWith("ru")) ||
      voices.find((v) => v.lang.toLowerCase().startsWith("tr"));
    if (voice) u.voice = voice;
    u.lang = voice?.lang ?? lang;
    u.rate = opts?.rate ?? 0.88;
    window.speechSynthesis.speak(u);
    return true;
  } catch {
    return false;
  }
}

export function speechAvailable(): boolean {
  return typeof window !== "undefined" && "speechSynthesis" in window;
}

/** Answer validation: Unicode-normalised, case-insensitive,
 *  punctuation-tolerant — but never strips Kazakh letters/suffixes. */
export function normalizeAnswer(s: string): string {
  return s
    .normalize("NFC")
    .toLocaleLowerCase("kk-KZ")
    .replace(/[.!?,;:«»"“”'’…—-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}
export function checkTyped(input: string, accepted: string[]): boolean {
  const n = normalizeAnswer(input);
  if (!n) return false;
  return accepted.some((a) => normalizeAnswer(a) === n);
}
export function checkTokens(placed: string[], answer: string[]): boolean {
  return placed.length === answer.length && placed.every((t, i) => normalizeAnswer(t) === normalizeAnswer(answer[i]));
}

/* ---- Spaced repetition (documented deterministic scheduler, Leitner-style) ----
   Boxes 0..5 → intervals: 10min, 1d, 3d, 7d, 21d, 60d.
   Correct → box+1; wrong → box 0. New words start at box 0, due now. */
export const SRS_INTERVALS_MS = [10 * 60e3, 24 * 3600e3, 3 * 24 * 3600e3, 7 * 24 * 3600e3, 21 * 24 * 3600e3, 60 * 24 * 3600e3];

export interface VocabState {
  box: number;
  due: number; // epoch ms
  seen: number;
  correct: number;
  wrong: number;
  saved?: boolean;
  firstSeen: number;
}
export function newVocabState(now = Date.now()): VocabState {
  return { box: 0, due: now, seen: 0, correct: 0, wrong: 0, firstSeen: now };
}
export function gradeVocab(state: VocabState, correct: boolean, now = Date.now()): VocabState {
  const box = correct ? Math.min(state.box + 1, SRS_INTERVALS_MS.length - 1) : 0;
  return {
    ...state,
    box,
    due: now + SRS_INTERVALS_MS[box],
    seen: state.seen + 1,
    correct: state.correct + (correct ? 1 : 0),
    wrong: state.wrong + (correct ? 0 : 1),
  };
}
export function masteryLabel(box: number): "new" | "learning" | "familiar" | "mastered" {
  if (box <= 0) return "new";
  if (box <= 2) return "learning";
  if (box <= 4) return "familiar";
  return "mastered";
}

export function shuffle<T>(arr: T[], seed?: number): T[] {
  const a = [...arr];
  let s = seed ?? Math.floor(Math.random() * 1e9);
  const rand = () => ((s = (s * 1664525 + 1013904223) % 4294967296) / 4294967296);
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
export function todayKey(d = new Date()): string {
  return d.toISOString().slice(0, 10);
}
export function computeStreak(activity: Record<string, number>): number {
  let streak = 0;
  const d = new Date();
  if (!activity[todayKey(d)]) d.setDate(d.getDate() - 1);
  while (activity[todayKey(d)]) {
    streak++;
    d.setDate(d.getDate() - 1);
  }
  return streak;
}
