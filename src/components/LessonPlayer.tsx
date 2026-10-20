"use client";
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Heart, CheckCircle2, XCircle, Flame, Zap, Timer, Target, Volume2, Bookmark } from "lucide-react";
import type { Exercise } from "@/data/curriculum";
import { vocabById } from "@/data/curriculum";
import { useStore } from "@/lib/store";
import { t } from "@/lib/i18n";
import { checkTokens, checkTyped, shuffle, speak } from "@/lib/core";
import { AudioButton, Barys, KzWord } from "./ui";

export interface LessonResult { xp: number; accuracy: number; correct: number; total: number; mistakes: string[]; seconds: number; }

const KZ_KEYS = ["Ә", "Ғ", "Қ", "Ң", "Ө", "Ұ", "Ү", "Һ", "І"];

export default function LessonPlayer({ exercises, title, onExit, onFinish, finishLabel }: {
  exercises: Exercise[]; title: string;
  onExit: () => void;
  onFinish: (r: LessonResult) => React.ReactNode;
  finishLabel?: string;
}) {
  const { state, recordAnswer, introduceVocab, toggleSaved } = useStore();
  const locale = state.locale;
  const tr = (k: Parameters<typeof t>[1]) => t(locale, k);
  const [idx, setIdx] = useState(0);
  const [phase, setPhase] = useState<"answer" | "feedback" | "done">("answer");
  const [wasCorrect, setWasCorrect] = useState<boolean | null>(null);
  const [selected, setSelected] = useState<string | number | null>(null);
  const [placed, setPlaced] = useState<string[]>([]);
  const [typed, setTyped] = useState("");
  const [matchSel, setMatchSel] = useState<string | null>(null);
  const [matched, setMatched] = useState<Set<string>>(new Set());
  const [missed, setMissed] = useState<Set<string>>(new Set());
  const [shakeId, setShakeId] = useState<string | null>(null);
  const [results, setResults] = useState<{ correct: boolean; vocab: string[] }[]>([]);
  const [streakRow, setStreakRow] = useState(0);
  const [showExit, setShowExit] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const startedAt = useRef(Date.now());
  const finalNode = useRef<React.ReactNode>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const ex = exercises[idx];
  const total = exercises.length;
  const progress = phase === "done" ? 100 : (idx / total) * 100 + (phase === "feedback" ? 100 / total : 0);

  const shuffledOptions = useMemo(() => (ex?.options ? shuffle(ex.options, idx * 7919 + 13) : []), [ex, idx]);
  const shuffledTokens = useMemo(() => (ex?.tokens ? shuffle(ex.tokens, idx * 104729 + 7) : []), [ex, idx]);
  const matchRight = useMemo(() => (ex?.pairs ? shuffle(ex.pairs, idx * 31 + 5) : []), [ex, idx]);

  // autoplay listen/teach audio once per exercise (best-effort; browsers may require a tap)
  useEffect(() => {
    if (phase !== "answer" || !ex) return;
    if (ex.type === "teach") introduceVocab(ex.vocab);
    if ((ex.type === "listen" || ex.type === "repeat") && ex.kz) {
      const id = setTimeout(() => speak(ex.kz!), 350);
      return () => clearTimeout(id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idx]);

  const meaning = (id: string) => (locale === "ru" ? vocabById[id]?.ru : vocabById[id]?.en) ?? id;
  const kzOf = (id: string) => vocabById[id]?.kz ?? id;

  const canCheck = useCallback(() => {
    if (!ex) return false;
    switch (ex.type) {
      case "teach": case "repeat": return true;
      case "mc": case "listen": case "fill": return selected !== null;
      case "dialogue": return selected !== null;
      case "tiles": return placed.length > 0;
      case "type": return typed.trim().length > 0;
      case "match": return ex.pairs ? matched.size === ex.pairs.length : false;
      default: return false;
    }
  }, [ex, selected, placed, typed, matched]);

  const grade = useCallback((): boolean => {
    if (!ex) return false;
    switch (ex.type) {
      case "teach": case "repeat": return true;
      case "mc": case "listen": case "fill": return selected === ex.answerId;
      case "dialogue": return selected === ex.replyAnswer;
      case "tiles": return checkTokens(placed, ex.answerTokens ?? []);
      case "type": return checkTyped(typed, ex.accepted ?? []);
      case "match": return missed.size === 0;
      default: return false;
    }
  }, [ex, selected, placed, typed, missed]);

  const handleCheck = useCallback(() => {
    if (!ex || !canCheck()) return;
    if (ex.type === "teach" || ex.type === "repeat") {
      // exposure step — go straight on, no grading theatre
      const nr = [...results, { correct: true, vocab: ex.vocab }];
      setResults(nr);
      advance(nr);
      return;
    }
    const ok = grade();
    setWasCorrect(ok);
    setPhase("feedback");
    setStreakRow((s) => (ok ? s + 1 : 0));
    if (ex.type === "match" && ex.pairs) {
      for (const id of ex.pairs) recordAnswer([id], !missed.has(id), "match");
    } else {
      recordAnswer(ex.vocab, ok, ex.type === "listen" ? "listen" : ex.type);
    }
    setResults((r) => [...r, { correct: ok, vocab: ex.vocab }]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ex, canCheck, grade]);

  const advance = useCallback((override?: { correct: boolean; vocab: string[] }[]) => {
    if (idx + 1 >= total) {
      const secs = Math.round((Date.now() - startedAt.current) / 1000);
      setSeconds(secs);
      const graded = override ?? [...results];
      const correctCount = graded.filter((r) => r.correct).length;
      const xp = graded.reduce((acc) => acc + 2, 0) + (correctCount === graded.length ? 5 : 0);
      const mistakes = Array.from(new Set(graded.filter((r) => !r.correct).flatMap((r) => r.vocab)));
      finalNode.current = onFinish({ xp, accuracy: graded.length ? Math.round((correctCount / graded.length) * 100) : 100, correct: correctCount, total: graded.length, mistakes, seconds: secs });
      setPhase("done");
    } else {
      setIdx(idx + 1);
      setPhase("answer"); setWasCorrect(null); setSelected(null); setPlaced([]); setTyped("");
      setMatchSel(null); setMatched(new Set()); setMissed(new Set());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idx, total, results]);

  // keyboard: 1-4 select, Enter check/continue, Esc exit dialog
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (showExit) { if (e.key === "Escape") setShowExit(false); return; }
      if (phase === "done") return;
      const target = e.target as HTMLElement;
      const typing = target.tagName === "INPUT" || target.tagName === "TEXTAREA";
      if (e.key === "Enter") {
        e.preventDefault();
        if (phase === "feedback") advance(); else handleCheck();
        return;
      }
      if (typing || phase !== "answer" || !ex) return;
      const n = parseInt(e.key, 10);
      if (n >= 1 && n <= 4) {
        if ((ex.type === "mc" || ex.type === "listen" || ex.type === "fill") && shuffledOptions[n - 1]) setSelected(shuffledOptions[n - 1]);
        if (ex.type === "dialogue" && ex.replyOptions?.[n - 1]) setSelected(n - 1);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [phase, ex, shuffledOptions, handleCheck, advance, showExit]);

  if (phase === "done") {
    const graded = results;
    const correctCount = graded.filter((r) => r.correct).length;
    const accuracy = graded.length ? Math.round((correctCount / graded.length) * 100) : 100;
    const xp = graded.length * 2 + (correctCount === graded.length ? 5 : 0);
    const mistakes = Array.from(new Set(graded.filter((r) => !r.correct).flatMap((r) => r.vocab)));
    const allVocab = Array.from(new Set(exercises.flatMap((e) => e.vocab))).filter((id) => vocabById[id]);
    const mm = Math.floor(seconds / 60), ss = String(seconds % 60).padStart(2, "0");
    return (
      <div className="min-h-dvh paper-ruled flex flex-col">
        <div className="max-w-2xl w-full mx-auto px-5 pt-14 pb-10 flex-1 flex flex-col items-center text-center">
          <motion.div initial={state.reduceMotion ? false : { scale: 0.6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: "spring", stiffness: 200, damping: 16 }}>
            <Barys mood="cheer" className="w-36 h-36" />
          </motion.div>
          <h1 className="kz text-4xl font-black mt-2 text-Forest">{accuracy === 100 ? tr("perfectLesson") : tr("lessonDone")}</h1>
          <p className="text-ink2 mt-2 font-medium">{accuracy === 100 ? tr("noMistakes") : tr("goodWork")}</p>

          <div className="grid grid-cols-3 gap-3 w-full mt-8">
            {[
              { label: tr("totalXp"), icon: <Zap className="w-5 h-5" fill="currentColor" />, value: `+${xp}`, cls: "border-saffron text-[#8a6420] dark:text-saffron bg-saffronsoft/50" },
              { label: tr("time"), icon: <Timer className="w-5 h-5" />, value: `${mm}:${ss}`, cls: "border-[var(--sky)] text-[var(--sky-dark)] dark:text-[var(--sky)] bg-skysoft/60" },
              { label: tr("accuracy"), icon: <Target className="w-5 h-5" />, value: `${accuracy}%`, cls: "border-[var(--correct-border)] text-correct bg-correctbg/60" },
            ].map((s, i) => (
              <motion.div key={s.label} initial={state.reduceMotion ? false : { y: 16, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.15 + i * 0.12 }}
                className={`rounded-2xl border-[3px] py-3 px-2 ${s.cls}`}>
                <div className="text-[11px] font-black tracking-widest uppercase opacity-80">{s.label}</div>
                <div className="flex items-center justify-center gap-1.5 text-2xl font-black mt-1">{s.icon}{s.value}</div>
              </motion.div>
            ))}
          </div>

          <div className="w-full text-left mt-8">
            <h2 className="font-extrabold text-sm uppercase tracking-widest text-ink3">{tr("wordsLearned")}</h2>
            <div className="flex flex-wrap gap-2 mt-3">
              {allVocab.map((id) => (
                <button key={id} onClick={() => speak(kzOf(id))} className="word-tile kz !py-2 flex items-center gap-2">
                  {kzOf(id)} <span className="text-ink3 text-sm font-semibold">{meaning(id)}</span>
                </button>
              ))}
            </div>
            {mistakes.length > 0 && (
              <>
                <h2 className="font-extrabold text-sm uppercase tracking-widest text-ink3 mt-6">{tr("toRevisit")}</h2>
                <div className="flex flex-wrap gap-2 mt-3">
                  {mistakes.filter((id) => vocabById[id]).map((id) => (
                    <span key={id} className="kz rounded-xl border-2 border-[var(--wrong-border)] bg-wrongbg text-wrong font-bold px-3 py-1.5">{kzOf(id)}</span>
                  ))}
                </div>
              </>
            )}
          </div>
          <div className="w-full mt-10">{finalNode.current}</div>
        </div>
      </div>
    );
  }

  if (!ex) return null;
  const isExposure = ex.type === "teach" || ex.type === "repeat";
  const promptFor = () => {
    switch (ex.type) {
      case "listen": return tr("listenChoose");
      case "tiles": return locale === "ru" ? "Переведите это предложение" : "Translate this sentence";
      case "type": return tr("typeKz");
      case "fill": return tr("fillBlank");
      case "match": return tr("matchPairs");
      case "dialogue": return tr("chooseReply");
      case "repeat": return tr("listenRepeat");
      case "mc": return ex.kz ? tr("whatMeans") : tr("howSay");
      default: return "";
    }
  };
  const correctAnswerText = () => {
    if (ex.type === "mc" || ex.type === "fill") return ex.answerId ? `${kzOf(ex.answerId)} — ${meaning(ex.answerId)}` : "";
    if (ex.type === "listen") return ex.kz ?? "";
    if (ex.type === "tiles") return (ex.answerTokens ?? []).join(" ");
    if (ex.type === "type") return ex.accepted?.[0] ?? "";
    if (ex.type === "dialogue") return ex.replyOptions?.[ex.replyAnswer ?? 0]?.kz ?? "";
    return "";
  };

  const optionState = (id: string) => {
    if (phase !== "feedback") return selected === id ? "selected" : "";
    if (id === ex.answerId) return "is-correct";
    if (id === selected) return "is-wrong";
    return "";
  };

  return (
    <div className="min-h-dvh flex flex-col bg-paper">
      {/* top bar */}
      <header className="max-w-3xl w-full mx-auto px-4 sm:px-6 pt-5 flex items-center gap-3">
        <button onClick={() => setShowExit(true)} aria-label="Exit lesson" className="text-ink3 hover:text-ink p-1 shrink-0"><X className="w-7 h-7" strokeWidth={2.6} /></button>
        <div className="flex-1">
          {streakRow >= 3 && phase === "feedback" && (
            <div className="text-center text-[11px] font-black tracking-widest text-saffron-dark dark:text-saffron uppercase flex items-center justify-center gap-1">
              <Flame className="w-3.5 h-3.5" fill="currentColor" /> {streakRow} {tr("inARow")}
            </div>
          )}
          <div className="progress-chunky" role="progressbar" aria-valuenow={Math.round(progress)} aria-valuemin={0} aria-valuemax={100}>
            <div style={{ width: `${Math.max(4, progress)}%` }} />
          </div>
        </div>
        <span className="flex items-center gap-1 font-black text-heart shrink-0" aria-label={`${state.hearts} hearts`}>
          <Heart className="w-6 h-6" fill="currentColor" /> {state.hearts}
        </span>
      </header>

      {/* body */}
      <main className="flex-1 max-w-2xl w-full mx-auto px-5 sm:px-6 pt-8 pb-56">
        <AnimatePresence mode="wait">
          <motion.div key={idx}
            initial={state.reduceMotion ? false : { opacity: 0, x: 28 }}
            animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -28 }}
            transition={{ duration: 0.22 }}>
            {ex.isNew && (
              <span className="inline-flex items-center gap-1.5 text-plum font-black text-xs tracking-widest uppercase">
                <span className="w-5 h-5 rounded-full bg-plum text-white grid place-items-center text-[11px]">✦</span> {tr("newWord")}
              </span>
            )}
            {!isExposure && <h1 className="text-2xl sm:text-[28px] font-extrabold mt-2 leading-tight">{promptFor()}</h1>}

            {/* TEACH */}
            {ex.type === "teach" && ex.vocab[0] && vocabById[ex.vocab[0]] && (
              <div className="mt-6 card p-8 sm:p-10 relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-2 bg-saffron" />
                <KzWord vocab={vocabById[ex.vocab[0]]} size="xl" />
                <p className="text-center text-2xl font-bold text-Forest mt-4">{meaning(ex.vocab[0])}</p>
                <p className="text-center text-ink2 mt-4 leading-relaxed max-w-md mx-auto">{locale === "ru" ? ex.explainRu : ex.explainEn}</p>
                <div className="mt-6 bg-surface2 border-2 border-line rounded-2xl p-4 flex items-start gap-3">
                  <Barys className="w-14 h-14 shrink-0" />
                  <div>
                    <p className="kz font-bold text-lg">{vocabById[ex.vocab[0]].exKz}</p>
                    <p className="text-ink3 font-medium">{locale === "ru" ? vocabById[ex.vocab[0]].exRu : vocabById[ex.vocab[0]].exEn}</p>
                  </div>
                  <AudioButton text={vocabById[ex.vocab[0]].exKz} size="sm" variant="plain" />
                </div>
                <button onClick={() => toggleSaved(ex.vocab[0])} className="mx-auto mt-5 flex items-center gap-2 text-sm font-bold text-ink3 hover:text-Forest">
                  <Bookmark className="w-4 h-4" fill={state.vocab[ex.vocab[0]]?.saved ? "currentColor" : "none"} />
                  {state.vocab[ex.vocab[0]]?.saved ? (locale === "ru" ? "В блокноте ★" : "Saved to notebook ★") : (locale === "ru" ? "Сохранить в блокнот" : "Save to notebook")}
                </button>
              </div>
            )}

            {/* REPEAT */}
            {ex.type === "repeat" && (
              <div className="mt-4 flex flex-col items-center">
                <Barys mood="think" className="w-24 h-24" />
                <div className="card px-8 py-6 mt-4 text-center">
                  <p className="kz text-3xl sm:text-4xl font-black">{ex.kz}</p>
                  {state.showTranslit && ex.vocab[0] && vocabById[ex.vocab[0]] && <p className="text-ink3 font-semibold mt-1">[{vocabById[ex.vocab[0]].tr}]</p>}
                </div>
                <div className="mt-6"><AudioButton text={ex.kz ?? ""} size="lg" variant="Forest" /></div>
                <p className="text-ink2 mt-5 text-center max-w-sm">{locale === "ru" ? ex.explainRu : ex.explainEn}</p>
                <p className="text-xs text-ink3 mt-2">{tr("audioNote")}</p>
              </div>
            )}

            {/* MC / FILL prompt */}
            {(ex.type === "mc" && ex.kz) && (
              <div className="flex items-center gap-4 mt-6">
                <AudioButton text={ex.kz} />
                <div>
                  <span className="kz text-3xl sm:text-4xl font-black border-b-[3px] border-dotted border-jade pb-1">{ex.kz}</span>
                  {state.showTranslit && ex.vocab[0] && vocabById[ex.vocab[0]] && <p className="text-ink3 font-semibold mt-2">[{vocabById[ex.vocab[0]].tr}]</p>}
                </div>
              </div>
            )}
            {(ex.type === "mc" && !ex.kz && (ex.en || ex.ru)) && (
              <p className="text-3xl font-black mt-6">“{locale === "ru" ? ex.ru : ex.en}”</p>
            )}

            {/* LISTEN */}
            {ex.type === "listen" && (
              <div className="flex flex-col items-center mt-6">
                <AudioButton text={ex.kz ?? ""} size="lg" />
                <button onClick={() => speak(ex.kz ?? "", { rate: 0.65 })} className="mt-3 text-sm font-bold text-ink3 hover:text-Forest underline underline-offset-4">
                  {locale === "ru" ? "Медленнее" : "Slower"}
                </button>
              </div>
            )}

            {/* FILL sentence */}
            {ex.type === "fill" && ex.sentenceParts && (
              <div className="card p-6 mt-6 flex items-start gap-4">
                <Barys className="w-16 h-16 shrink-0 hidden sm:block" />
                <p className="kz text-2xl font-bold leading-relaxed">
                  {ex.sentenceParts[0]}
                  <span className={`inline-block min-w-24 text-center border-b-4 mx-1 px-2 rounded-t-lg ${selected ? "border-sky bg-skysoft" : "border-linestrong"}`}>
                    {selected ? kzOf(String(selected)) : "····"}
                  </span>
                  {ex.sentenceParts[1]}
                </p>
              </div>
            )}

            {/* Options grid: mc / listen / fill */}
            {(ex.type === "mc" || ex.type === "listen" || ex.type === "fill") && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-8" role="radiogroup">
                {shuffledOptions.map((id, i) => {
                  const showKz = ex.type === "listen" || ex.type === "fill" || !ex.kz;
                  return (
                    <button key={id} role="radio" aria-checked={selected === id} disabled={phase === "feedback"}
                      onClick={() => setSelected(id)}
                      className={`answer-card p-4 sm:p-5 text-left flex items-center gap-3 min-h-[68px] ${optionState(id)}`}>
                      <span className="hidden sm:grid w-7 h-7 rounded-lg border-2 border-current opacity-40 place-items-center text-xs font-black shrink-0">{i + 1}</span>
                      <span className={`${showKz ? "kz font-extrabold text-xl" : "font-bold text-lg"}`}>{showKz ? kzOf(id) : meaning(id)}</span>
                      {showKz && <span className="ml-auto" onClick={(e) => { e.stopPropagation(); speak(kzOf(id)); }}><Volume2 className="w-5 h-5 opacity-50" /></span>}
                    </button>
                  );
                })}
              </div>
            )}

            {/* TILES */}
            {ex.type === "tiles" && (
              <div className="mt-6">
                <div className="flex items-start gap-4">
                  <Barys className="w-20 h-20 shrink-0 hidden sm:block" />
                  <div className="card px-5 py-4 relative">
                    <p className="text-xl font-bold">{locale === "ru" ? ex.ru : ex.en}</p>
                  </div>
                </div>
                <p className="text-sm text-ink3 font-semibold mt-6">{tr("tapTiles")}</p>
                <div className={`min-h-[64px] border-b-[3px] mt-2 pb-3 flex flex-wrap gap-2 items-center ${phase === "feedback" ? (wasCorrect ? "border-[var(--correct-border)]" : "border-[var(--wrong-border)]") : "border-line"}`} aria-live="polite">
                  {placed.length === 0 && <span className="text-ink3/60 font-semibold">— — —</span>}
                  {placed.map((tok, i) => (
                    <button key={`${tok}-${i}`} disabled={phase === "feedback"} onClick={() => setPlaced(placed.filter((_, j) => j !== i))} className="word-tile placed kz text-lg pop-in">{tok}</button>
                  ))}
                </div>
                <div className="flex flex-wrap gap-2 mt-6 justify-center">
                  {shuffledTokens.map((tok) => {
                    const usedCount = placed.filter((p) => p === tok).length;
                    const totalTok = shuffledTokens.filter((p) => p === tok).length;
                    const used = usedCount >= totalTok && placed.includes(tok) && shuffledTokens.indexOf(tok) === shuffledTokens.lastIndexOf(tok) ? placed.includes(tok) : false;
                    const isUsed = usedCount > 0 && totalTok === 1;
                    return (
                      <button key={tok} disabled={phase === "feedback"} onClick={() => setPlaced([...placed, tok])}
                        className={`word-tile kz text-lg ${isUsed || used ? "used" : ""}`}>{tok}</button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* TYPE */}
            {ex.type === "type" && (
              <div className="mt-6">
                <p className="text-3xl font-black">“{locale === "ru" ? ex.ru : ex.en}”</p>
                <input ref={inputRef} value={typed} onChange={(e) => setTyped(e.target.value)} disabled={phase === "feedback"}
                  placeholder={locale === "ru" ? "Пишите по-казахски…" : "Type in Kazakh…"} lang="kk" autoFocus
                  className={`kz w-full mt-6 text-2xl font-bold bg-surface border-[3px] rounded-2xl px-5 py-4 outline-none focus:border-[var(--sky)] ${phase === "feedback" ? (wasCorrect ? "border-[var(--correct-border)] bg-correctbg" : "border-[var(--wrong-border)] bg-wrongbg") : "border-line"}`}
                  aria-label="Your answer in Kazakh" />
                <div className="flex flex-wrap gap-1.5 mt-3" aria-label="Kazakh letters">
                  {KZ_KEYS.map((k) => (
                    <button key={k} type="button" disabled={phase === "feedback"}
                      onClick={() => { setTyped(typed + k.toLowerCase()); inputRef.current?.focus(); }}
                      className="word-tile kz !px-3 !py-1.5 text-lg">{k.toLowerCase()}</button>
                  ))}
                </div>
              </div>
            )}

            {/* MATCH */}
            {ex.type === "match" && ex.pairs && (
              <div className="grid grid-cols-2 gap-3 sm:gap-4 mt-8">
                <div className="flex flex-col gap-3">
                  {ex.pairs.map((id) => (
                    <button key={`l-${id}`} disabled={matched.has(id)}
                      onClick={() => { setMatchSel(id); speak(kzOf(id)); }}
                      className={`answer-card kz p-4 font-extrabold text-lg flex items-center gap-2 ${matched.has(id) ? "is-correct opacity-70" : matchSel === id ? "selected" : ""} ${shakeId === id ? "shake-x" : ""}`}>
                      <Volume2 className="w-4 h-4 opacity-50 shrink-0" />{kzOf(id)}
                    </button>
                  ))}
                </div>
                <div className="flex flex-col gap-3">
                  {matchRight.map((id) => (
                    <button key={`r-${id}`} disabled={matched.has(id)}
                      onClick={() => {
                        if (!matchSel) return;
                        if (matchSel === id) { setMatched(new Set(matched).add(id)); setMatchSel(null); }
                        else { setMissed(new Set(missed).add(matchSel)); setShakeId(matchSel); setTimeout(() => setShakeId(null), 450); setMatchSel(null); }
                      }}
                      className={`answer-card p-4 font-bold ${matched.has(id) ? "is-correct opacity-70" : ""}`}>{meaning(id)}</button>
                  ))}
                </div>
              </div>
            )}

            {/* DIALOGUE */}
            {ex.type === "dialogue" && (
              <div className="mt-6">
                <div className="flex items-end gap-3">
                  <div className="shrink-0">
                    <div className="w-14 h-14 rounded-2xl bg-plumsoft border-2 border-line grid place-items-center font-black text-plum text-xl">{(ex.speaker ?? "?")[0]}</div>
                    <p className="text-xs font-bold text-ink3 text-center mt-1">{ex.speaker}</p>
                  </div>
                  <div className="card px-5 py-4 rounded-bl-md max-w-md">
                    <div className="flex items-start gap-3">
                      <AudioButton text={ex.lineKz ?? ""} size="sm" />
                      <div>
                        <p className="kz text-xl font-extrabold leading-snug">{ex.lineKz}</p>
                        <p className="text-ink3 font-medium mt-1">{locale === "ru" ? ex.lineRu : ex.lineEn}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-3 mt-8">
                  {ex.replyOptions?.map((opt, i) => {
                    const st = phase === "feedback" ? (i === ex.replyAnswer ? "is-correct" : i === selected ? "is-wrong" : "") : selected === i ? "selected" : "";
                    return (
                      <button key={i} disabled={phase === "feedback"} onClick={() => setSelected(i)} className={`answer-card p-4 text-left flex items-center gap-3 ${st}`}>
                        <span className="hidden sm:grid w-7 h-7 rounded-lg border-2 border-current opacity-40 place-items-center text-xs font-black shrink-0">{i + 1}</span>
                        <span>
                          <span className="kz block font-extrabold text-lg">{opt.kz}</span>
                          <span className="block text-sm opacity-70 font-semibold">{locale === "ru" ? opt.ru : opt.en}</span>
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* bottom action / feedback banner */}
      <div className={`fixed bottom-0 inset-x-0 z-30 border-t-2 ${phase === "feedback" ? (wasCorrect ? "bg-correctbg border-[var(--correct-border)]" : "bg-wrongbg border-[var(--wrong-border)]") : "bg-paper/95 backdrop-blur border-line"}`}>
        <div className="max-w-3xl mx-auto px-5 py-4 sm:py-5 flex items-center gap-4">
          {phase === "feedback" ? (
            <>
              <span className={`hidden sm:grid w-14 h-14 rounded-full bg-surface place-items-center shrink-0 ${wasCorrect ? "text-correct" : "text-wrong"}`}>
                {wasCorrect ? <CheckCircle2 className="w-9 h-9" /> : <XCircle className="w-9 h-9" />}
              </span>
              <div className="flex-1 min-w-0">
                <p className={`font-black text-xl ${wasCorrect ? "text-correct" : "text-wrong"}`}>{wasCorrect ? tr("correctTitle") : tr("almostTitle")}</p>
                {!wasCorrect && <p className="kz font-extrabold mt-0.5">{correctAnswerText()}</p>}
                <p className="text-sm font-medium opacity-90 leading-snug mt-0.5">{locale === "ru" ? ex.explainRu : ex.explainEn}</p>
              </div>
              <button onClick={() => advance()} autoFocus className={`btn-3d px-7 sm:px-10 py-3.5 text-base shrink-0 ${wasCorrect ? "btn-Forest" : "btn-clay"}`}>{tr("continueX")}</button>
            </>
          ) : (
            <>
              <span className="hidden sm:block text-sm font-bold text-ink3 flex-1">{title} · {idx + 1} / {total}</span>
              <span className="sm:hidden flex-1" />
              <button onClick={handleCheck} disabled={!canCheck()} className="btn-3d btn-Forest px-10 py-3.5 text-base">
                {isExposure ? (ex.type === "repeat" ? tr("iSaidIt") : tr("gotIt")) : tr("check")}
              </button>
            </>
          )}
        </div>
        <div className="h-[env(safe-area-inset-bottom)]" />
      </div>

      {/* exit dialog */}
      {showExit && (
        <div className="fixed inset-0 z-50 bg-black/45 grid place-items-center p-5" role="dialog" aria-modal="true" aria-label={tr("exitLesson")}>
          <div className="card max-w-sm w-full p-6 text-center pop-in">
            <Barys mood="think" className="w-20 h-20 mx-auto" />
            <h2 className="text-2xl font-black mt-2">{tr("exitLesson")}</h2>
            <p className="text-ink2 mt-2">{tr("exitLessonSub")}</p>
            <button onClick={() => setShowExit(false)} className="btn-3d btn-Forest w-full py-3.5 mt-6">{tr("stay")}</button>
            <button onClick={onExit} className="btn-3d btn-ghost3d w-full py-3 mt-3">{tr("leave")}</button>
          </div>
        </div>
      )}
    </div>
  );
}
