"use client";
import React, { useMemo, useState } from "react";
import { Search, Bookmark, X, RotateCcw, Dumbbell, Ear, BookOpen, ChevronDown, Check, Flame, Zap, Trophy, Moon, Trash2, Play, Volume2, LibraryBig } from "lucide-react";
import { VOCAB, vocabById, LETTERS, GRAMMAR, STORIES, HARMONY_WORDS, LESSONS, type Exercise, type Story } from "@/data/curriculum";
import { useStore } from "@/lib/store";
import { t, type Locale } from "@/lib/i18n";
import { shuffle, speak, masteryLabel } from "@/lib/core";
import { AudioButton, Barys, LessonIcon } from "./ui";

function useTr() {
  const { state } = useStore();
  return { locale: state.locale, tr: (k: Parameters<typeof t>[1]) => t(state.locale, k) };
}

/* ================= Review exercise generator ================= */
export function buildReview(ids: string[]): Exercise[] {
  const pool = VOCAB.map((v) => v.id);
  return ids.slice(0, 8).map((id, i) => {
    const v = vocabById[id];
    const distract = shuffle(pool.filter((p) => p !== id && vocabById[p].kz.length < 14)).slice(0, 3);
    const kind = i % 4;
    if (kind === 0) return { id: `rev-${id}-${i}`, type: "mc", vocab: [id], kz: v.kz, options: [id, ...distract], answerId: id, explainEn: `${v.kz} = ${v.en}. ${v.exKz}`, explainRu: `${v.kz} = ${v.ru}. ${v.exKz}` };
    if (kind === 1) return { id: `rev-${id}-${i}`, type: "listen", vocab: [id], kz: v.kz, options: [id, ...distract.slice(0, 2)], answerId: id, explainEn: `You heard: ${v.kz} — ${v.en}.`, explainRu: `Вы услышали: ${v.kz} — ${v.ru}.` };
    if (kind === 2 && v.kz.length <= 12 && !v.kz.includes(" ")) return { id: `rev-${id}-${i}`, type: "type", vocab: [id], en: v.en, ru: v.ru, accepted: [v.kz.toLowerCase()], explainEn: `${v.kz} [${v.tr}] — ${v.en}.`, explainRu: `${v.kz} [${v.tr}] — ${v.ru}.` };
    return { id: `rev-${id}-${i}`, type: "mc", vocab: [id], en: v.en, ru: v.ru, options: [id, ...distract], answerId: id, explainEn: `${v.en} = ${v.kz}.`, explainRu: `${v.ru} = ${v.kz}.` };
  });
}

/* ================= Practice hub ================= */
export function PracticeScreen({ onReview, goSounds, goStories }: { onReview: () => void; goSounds: () => void; goStories: () => void }) {
  const { locale, tr } = useTr();
  const { dueVocabIds, state } = useStore();
  const weak = Object.entries(state.vocab).filter(([, v]) => v.wrong > v.correct).length;
  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-5 pb-28 pt-6">
      <h1 className="kz text-3xl font-black">{tr("practiceTitle")}</h1>
      <p className="text-ink2 mt-1">{tr("practiceSub")}</p>
      <div className="flex flex-col gap-4 mt-7">
        <button onClick={onReview} className="card p-6 text-left flex items-start gap-4 hover:border-jade transition-colors">
          <span className="w-14 h-14 rounded-2xl bg-saffron grid place-items-center text-[#2b2110] shrink-0 shadow-[0_4px_0_var(--saffron-dark)]"><RotateCcw className="w-7 h-7" strokeWidth={2.4} /></span>
          <span>
            <span className="block text-xl font-extrabold">{tr("reviewTitle")}</span>
            <span className="block text-ink2 mt-1">{dueVocabIds.length > 0 ? `${dueVocabIds.length} ${tr("wordsReady")}.` : tr("nothingDueSub")}</span>
            <span className="btn-3d btn-Forest inline-block px-5 py-2 mt-3 text-xs">{tr("startReview")}</span>
          </span>
          <Barys className="w-16 h-16 ml-auto shrink-0 hidden sm:block" />
        </button>
        <div className="grid sm:grid-cols-2 gap-4">
          <button onClick={goSounds} className="card p-5 text-left hover:border-jade transition-colors">
            <Ear className="w-8 h-8 text-[var(--sky)]" strokeWidth={2.2} />
            <span className="block font-extrabold text-lg mt-2">{tr("sounds")}</span>
            <span className="block text-sm text-ink2">{locale === "ru" ? "Қ против К, Ө против О — тренируйте ухо." : "Қ vs К, Ө vs О — train your ear."}</span>
          </button>
          <button onClick={goStories} className="card p-5 text-left hover:border-jade transition-colors">
            <BookOpen className="w-8 h-8 text-plum" strokeWidth={2.2} />
            <span className="block font-extrabold text-lg mt-2">{tr("stories")}</span>
            <span className="block text-sm text-ink2">{locale === "ru" ? "Живые сцены: кампус, гости, базар." : "Real-life scenes: campus, guests, bazaar."}</span>
          </button>
        </div>
        {weak > 0 && (
          <p className="text-sm font-bold text-ink3 flex items-center gap-2"><Dumbbell className="w-4 h-4" />{locale === "ru" ? `${weak} слов пока даются трудно — повторение поднимет именно их первыми.` : `${weak} words are still tricky — review lifts those first.`}</p>
        )}
      </div>
    </div>
  );
}

/* ================= Vocabulary ================= */
export function VocabScreen() {
  const { locale, tr } = useTr();
  const { state, toggleSaved, dueVocabIds } = useStore();
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<"all" | "saved" | "due">("all");
  const [openId, setOpenId] = useState<string | null>(null);
  const knownIds = Object.keys(state.vocab);
  const list = useMemo(() => {
    let ids = knownIds.filter((id) => vocabById[id]);
    if (filter === "saved") ids = ids.filter((id) => state.vocab[id]?.saved);
    if (filter === "due") ids = ids.filter((id) => dueVocabIds.includes(id));
    const q = query.trim().toLowerCase();
    if (q) ids = ids.filter((id) => { const v = vocabById[id]; return v.kz.toLowerCase().includes(q) || v.en.toLowerCase().includes(q) || v.ru.toLowerCase().includes(q); });
    return ids.map((id) => vocabById[id]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, filter, state.vocab, dueVocabIds.join(",")]);
  const open = openId ? vocabById[openId] : null;
  const openState = openId ? state.vocab[openId] : null;

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-5 pb-28 pt-6">
      <h1 className="kz text-3xl font-black">{tr("vocabTitle")}</h1>
      <p className="text-ink2 mt-1">{tr("vocabSub")} · {knownIds.length} {tr("wordsKnown")}</p>
      <label className="flex items-center gap-3 bg-surface border-2 border-line rounded-2xl px-4 py-3 mt-6 focus-within:border-[var(--sky)]">
        <Search className="w-5 h-5 text-ink3 shrink-0" />
        <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder={tr("searchWords")} className="flex-1 bg-transparent outline-none font-semibold" aria-label={tr("searchWords")} />
      </label>
      <div className="flex gap-2 mt-4" role="tablist" aria-label="Filter">
        {([["all", tr("allWords")], ["saved", tr("savedOnly")], ["due", tr("dueOnly")]] as const).map(([id, label]) => (
          <button key={id} role="tab" aria-selected={filter === id} onClick={() => setFilter(id)}
            className={`rounded-full border-2 px-4 py-1.5 font-extrabold text-sm ${filter === id ? "bg-Forest text-white border-Forest dark:text-[#08130d]" : "border-line text-ink2 bg-surface"}`}>{label}</button>
        ))}
      </div>

      {list.length === 0 ? (
        <div className="text-center py-16">
          <Barys mood="sleep" className="w-24 h-24 mx-auto" />
          <h2 className="text-xl font-black mt-3">{tr("noWordsYet")}</h2>
          <p className="text-ink2 mt-1 max-w-sm mx-auto">{tr("noWordsSub")}</p>
        </div>
      ) : (
        <ul className="mt-5 flex flex-col gap-2.5">
          {list.map((v) => {
            const st = state.vocab[v.id];
            return (
              <li key={v.id}>
                <button onClick={() => setOpenId(v.id)} className="w-full card !rounded-2xl px-4 py-3.5 flex items-center gap-3 text-left hover:border-jade transition-colors">
                  <span className="flex-1 min-w-0">
                    <span className="kz block text-xl font-black truncate">{v.kz}</span>
                    <span className="block text-sm text-ink3 font-semibold truncate">{locale === "ru" ? v.ru : v.en}{state.showTranslit ? ` · [${v.tr}]` : ""}</span>
                  </span>
                  <span className="flex gap-1 shrink-0" aria-label={masteryLabel(st?.box ?? 0)}>
                    {[0, 1, 2, 3, 4].map((i) => <span key={i} className={`w-2.5 h-2.5 rounded-full ${i < (st?.box ?? 0) ? "bg-Forest" : "bg-track"}`} />)}
                  </span>
                  {st?.saved && <Bookmark className="w-5 h-5 text-saffron-dark dark:text-saffron shrink-0" fill="currentColor" />}
                </button>
              </li>
            );
          })}
        </ul>
      )}

      {open && (
        <div className="fixed inset-0 z-50 bg-black/45 grid place-items-end sm:place-items-center p-0 sm:p-5" role="dialog" aria-modal="true" aria-label={open.kz} onClick={() => setOpenId(null)}>
          <div className="card w-full max-w-md p-7 !rounded-b-none sm:!rounded-b-[20px] pop-in" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-start justify-between">
              <span className="text-[11px] font-black tracking-[0.18em] uppercase text-ink3">{open.pos} · {tr("chapter")} {open.chapter}</span>
              <button onClick={() => setOpenId(null)} aria-label="Close"><X className="w-6 h-6 text-ink3" /></button>
            </div>
            <div className="flex items-center gap-3 mt-3">
              <AudioButton text={open.kz} />
              <div>
                <p className="kz text-4xl font-black leading-none">{open.kz}</p>
                {state.showTranslit && <p className="text-ink3 font-bold mt-1">[{open.tr}]</p>}
              </div>
            </div>
            <p className="text-xl font-extrabold text-Forest mt-3">{locale === "ru" ? open.ru : open.en}</p>
            <div className="bg-surface2 border-2 border-line rounded-2xl p-4 mt-4 flex gap-3 items-start">
              <div className="flex-1">
                <p className="kz font-bold">{open.exKz}</p>
                <p className="text-sm text-ink3 font-medium">{locale === "ru" ? open.exRu : open.exEn}</p>
              </div>
              <AudioButton text={open.exKz} size="sm" variant="plain" />
            </div>
            {openState && (
              <p className="text-sm text-ink2 font-medium mt-4">
                {locale === "ru" ? `Видели ${openState.seen} раз · верно ${openState.correct} · уровень памяти ${openState.box}/5 · повторение ${new Date(openState.due).toLocaleDateString("ru-RU")}`
                  : `Seen ${openState.seen}× · correct ${openState.correct}× · memory level ${openState.box}/5 · next review ${new Date(openState.due).toLocaleDateString("en-GB")}`}
              </p>
            )}
            <button onClick={() => toggleSaved(open.id)} className={`btn-3d w-full py-3 mt-5 ${openState?.saved ? "btn-saffron" : "btn-ghost3d"}`}>
              {openState?.saved ? (locale === "ru" ? "Сохранено ★" : "Saved ★") : (locale === "ru" ? "Сохранить слово" : "Save this word")}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

/* ================= Grammar ================= */
export function GrammarScreen() {
  const { locale, tr } = useTr();
  const { earnXp } = useStore();
  const [wordIdx, setWordIdx] = useState(0);
  const [guess, setGuess] = useState<string | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [openTopic, setOpenTopic] = useState<string | null>("vowel-harmony");
  const [quizState, setQuizState] = useState<Record<string, number>>({});
  const w = HARMONY_WORDS[wordIdx];
  const suffixOpts = ["лар", "лер", "дар", "дер", "тар", "тер"].filter((s) => s !== w.suffix).slice(0, 2).concat(w.suffix);
  const opts = useMemo(() => shuffle(suffixOpts, wordIdx * 17 + 3), [wordIdx]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-5 pb-28 pt-6">
      <h1 className="kz text-3xl font-black">{tr("grammarTitle")}</h1>
      <p className="text-ink2 mt-1">{tr("grammarSub")}</p>

      {/* harmony bench */}
      <section className="card mt-7 p-6 relative overflow-hidden" aria-label={tr("harmonyTitle")}>
        <div className="absolute top-0 left-0 right-0 h-2 bg-[var(--sky)]" />
        <h2 className="text-xl font-extrabold">{tr("harmonyTitle")}</h2>
        <p className="text-ink2 text-[15px] mt-1">{tr("harmonySub")}</p>
        <div className="flex flex-wrap gap-2 mt-5">
          {HARMONY_WORDS.map((hw, i) => (
            <button key={hw.root} onClick={() => { setWordIdx(i); setGuess(null); setRevealed(false); }}
              className={`kz word-tile ${i === wordIdx ? "!border-[var(--sky)] bg-skysoft" : ""}`}>{hw.root}</button>
          ))}
        </div>
        <div className="mt-6 text-center">
          <p className="kz text-4xl sm:text-5xl font-black">
            <span className="text-ink">{w.root}</span>
            <span className={revealed ? "text-correct" : "text-ink3/50"}>{revealed ? w.suffix : " + ?"}</span>
          </p>
          <p className="text-ink3 font-semibold mt-1">{locale === "ru" ? w.ru : w.en} · {w.vowelType === "back" ? (locale === "ru" ? "твёрдые гласные" : "back vowels") : (locale === "ru" ? "мягкие гласные" : "front vowels")}</p>
        </div>
        <div className="flex justify-center gap-2 mt-5 flex-wrap">
          {opts.map((s) => (
            <button key={s} disabled={revealed} onClick={() => setGuess(s)} className={`kz word-tile text-lg ${guess === s ? "!border-[var(--sky)] bg-skysoft" : ""}`}>-{s}</button>
          ))}
        </div>
        {!revealed ? (
          <button disabled={!guess} onClick={() => { setRevealed(true); speak(w.plural); if (guess === w.suffix) earnXp(2); }} className="btn-3d btn-sky w-full py-3 mt-5">{locale === "ru" ? "Открыть ответ" : "Reveal"}</button>
        ) : (
          <p className={`mt-5 font-bold rounded-2xl border-2 p-4 ${guess === w.suffix ? "bg-correctbg border-[var(--correct-border)] text-correct" : "bg-wrongbg border-[var(--wrong-border)] text-wrong"}`}>
            {guess === w.suffix ? "✓ " : "✕ "}
            <span className="kz">{w.plural}</span> — {locale === "ru"
              ? `корень «${w.root}» ${w.vowelType === "back" ? "твёрдый" : "мягкий"}, поэтому окончание -${w.suffix}.`
              : `“${w.root}” has ${w.vowelType} vowels, so the plural ending is -${w.suffix}.`}
          </p>
        )}
      </section>

      {/* topics */}
      <div className="flex flex-col gap-3 mt-6">
        {GRAMMAR.map((g) => {
          const open = openTopic === g.id;
          const picked = quizState[g.id];
          return (
            <article key={g.id} className="card overflow-hidden">
              <button onClick={() => setOpenTopic(open ? null : g.id)} aria-expanded={open} className="w-full p-5 flex items-center gap-4 text-left">
                <span className="w-12 h-12 rounded-2xl bg-jadesoft text-Forest grid place-items-center shrink-0"><LessonIcon name={g.icon} className="w-6 h-6" /></span>
                <span className="flex-1">
                  <span className="block font-extrabold">{locale === "ru" ? g.titleRu : g.titleEn}</span>
                  <span className="block text-sm text-ink2">{locale === "ru" ? g.blurbRu : g.blurbEn}</span>
                </span>
                <ChevronDown className={`w-5 h-5 text-ink3 transition-transform ${open ? "rotate-180" : ""}`} />
              </button>
              {open && (
                <div className="px-5 pb-6">
                  {(locale === "ru" ? g.bodyRu : g.bodyEn).map((p, i) => <p key={i} className="text-ink2 leading-relaxed mt-2">{p}</p>)}
                  <div className="mt-4 flex flex-col gap-2">
                    {g.examples.map((ex) => (
                      <button key={ex.kz} onClick={() => speak(ex.kz.replace(" → ", ", "))} className="flex items-center gap-3 bg-surface2 border-2 border-line rounded-2xl px-4 py-3 text-left hover:border-jade transition-colors">
                        <Volume2 className="w-5 h-5 text-Forest shrink-0" />
                        <span className="kz font-extrabold">{ex.kz}</span>
                        <span className="text-sm text-ink3 font-semibold ml-auto text-right">{locale === "ru" ? ex.ru : ex.en}</span>
                      </button>
                    ))}
                  </div>
                  {g.tryExercise && (
                    <div className="mt-5">
                      <p className="font-extrabold">{locale === "ru" ? g.tryExercise.promptRu : g.tryExercise.promptEn}</p>
                      <div className="flex flex-wrap gap-2 mt-3">
                        {g.tryExercise.options.map((opt, i) => {
                          const done = picked !== undefined;
                          const cls = done ? (i === g.tryExercise!.answer ? "is-correct" : i === picked ? "is-wrong" : "") : "";
                          return (
                            <button key={opt} disabled={done} onClick={() => { setQuizState({ ...quizState, [g.id]: i }); if (i === g.tryExercise!.answer) earnXp(2); }}
                              className={`answer-card kz px-4 py-2.5 font-extrabold ${cls}`}>{opt}</button>
                          );
                        })}
                      </div>
                      {picked !== undefined && <p className="mt-3 font-semibold text-ink2">{locale === "ru" ? g.tryExercise.explainRu : g.tryExercise.explainEn}</p>}
                    </div>
                  )}
                </div>
              )}
            </article>
          );
        })}
      </div>
    </div>
  );
}

/* ================= Sounds ================= */
const CONTRASTS = [
  { a: "Қ қ", b: "К к", wordA: "Қала", wordB: "Күн", noteEn: "Қ is deep in the throat; К is at the soft palate.", noteRu: "Қ глубоко в горле; К — у мягкого нёба." },
  { a: "Ө ө", b: "О о", wordA: "Сөз", wordB: "Ол", noteEn: "Ө rounds the lips on an “e”; О is a plain round “o”.", noteRu: "Ө — «э» с округлёнными губами; О — обычное «о»." },
  { a: "Ү ү", b: "Ұ ұ", wordA: "Үй", wordB: "Ұл", noteEn: "Ү is front and bright; Ұ is back and deep.", noteRu: "Ү — переднее и яркое; Ұ — заднее и глубокое." },
  { a: "Ң ң", b: "Н н", wordA: "Жаңа", wordB: "Нан", noteEn: "Ң sends air through the nose, like “ng” in sing.", noteRu: "При Ң воздух идёт через нос, как ng в sing." },
];
export function SoundsScreen() {
  const { locale, tr } = useTr();
  const { earnXp } = useStore();
  const [qIdx, setQIdx] = useState(0);
  const [picked, setPicked] = useState<string | null>(null);
  const [round, setRound] = useState(0);
  const c = CONTRASTS[qIdx % CONTRASTS.length];
  const targetIsA = (round + qIdx) % 2 === 0;
  const targetWord = targetIsA ? c.wordA : c.wordB;
  const targetLetter = targetIsA ? c.a : c.b;

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-5 pb-28 pt-6">
      <h1 className="kz text-3xl font-black">{tr("soundsTitle")}</h1>
      <p className="text-ink2 mt-1">{tr("soundsSub")}</p>
      <p className="text-xs text-ink3 font-medium mt-2">{tr("audioNote")}</p>

      {/* contrast quiz */}
      <section className="card mt-6 p-6 text-center relative overflow-hidden" aria-label="Listening contrast">
        <div className="absolute top-0 left-0 right-0 h-2 bg-plum" />
        <p className="font-extrabold">{locale === "ru" ? "Что вы слышите?" : "What do you hear?"}</p>
        <div className="my-5 flex justify-center"><AudioButton text={targetWord} size="lg" variant="Forest" /></div>
        <div className="grid grid-cols-2 gap-3 max-w-sm mx-auto">
          {[c.a, c.b].map((letter) => {
            const st = picked === null ? "" : letter === targetLetter ? "is-correct" : letter === picked ? "is-wrong" : "";
            return (
              <button key={letter} disabled={picked !== null}
                onClick={() => { setPicked(letter); if (letter === targetLetter) earnXp(2); }}
                className={`answer-card kz py-5 text-3xl font-black ${st}`}>{letter}</button>
            );
          })}
        </div>
        {picked !== null && (
          <div className="mt-4 pop-in">
            <p className="font-bold"><span className="kz">{targetWord}</span> — {locale === "ru" ? c.noteRu : c.noteEn}</p>
            <button onClick={() => { setPicked(null); setQIdx(qIdx + 1); setRound(round + 1); }} className="btn-3d btn-Forest px-8 py-2.5 mt-3 text-sm">{locale === "ru" ? "Следующая пара" : "Next pair"}</button>
          </div>
        )}
      </section>

      {/* letters grid */}
      <h2 className="text-sm font-black tracking-[0.18em] uppercase text-ink3 mt-8">{locale === "ru" ? "Алфавит: особые буквы и друзья" : "Alphabet: the special letters & friends"} · 42</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-4">
        {LETTERS.map((l) => (
          <button key={l.letter} onClick={() => speak(l.exampleKz)} className="card !rounded-2xl p-4 text-left hover:border-jade transition-colors group">
            <span className="kz block text-[34px] leading-none font-black group-hover:text-Forest">{l.letter}</span>
            <span className="block text-xs font-black uppercase tracking-wide text-ink3 mt-2">{l.name}{l.group === "special" ? " · ★" : ""}</span>
            <span className="block text-sm text-ink2 font-medium leading-snug mt-1">{locale === "ru" ? l.hintRu : l.hintEn}</span>
            <span className="kz block font-extrabold mt-2 text-Forest">{l.exampleKz} <span className="text-ink3 text-sm font-semibold">· {locale === "ru" ? l.exampleRu : l.exampleEn}</span></span>
          </button>
        ))}
      </div>
    </div>
  );
}

/* ================= Stories ================= */
export function StoriesScreen({ onOpen }: { onOpen: (s: Story) => void }) {
  const { locale, tr } = useTr();
  const { state } = useStore();
  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-5 pb-28 pt-6">
      <h1 className="kz text-3xl font-black">{tr("storiesTitle")}</h1>
      <p className="text-ink2 mt-1">{tr("storiesSub")}</p>
      <div className="flex flex-col gap-4 mt-7">
        {STORIES.map((s, i) => (
          <button key={s.id} onClick={() => onOpen(s)} className="card p-5 text-left flex items-start gap-4 hover:border-jade transition-colors" style={{ transform: `rotate(${i % 2 ? 0.4 : -0.4}deg)` }}>
            <span className="w-14 h-14 rounded-2xl bg-plumsoft text-plum grid place-items-center shrink-0"><LessonIcon name={s.emojiFreeIcon} className="w-7 h-7" /></span>
            <span className="flex-1">
              <span className="block text-[11px] font-black tracking-[0.18em] uppercase text-ink3">{s.scene} {state.storiesDone.includes(s.id) ? "· ✓" : "· +10 XP"}</span>
              <span className="block text-xl font-extrabold mt-0.5">{locale === "ru" ? s.titleRu : s.titleEn}</span>
              <span className="block text-ink2 mt-0.5">{locale === "ru" ? s.introRu : s.introEn}</span>
            </span>
            <Play className="w-6 h-6 text-Forest shrink-0 mt-1" fill="currentColor" />
          </button>
        ))}
      </div>
    </div>
  );
}

export function StoryPlayer({ story, onExit }: { story: Story; onExit: () => void }) {
  const { locale, tr } = useTr();
  const { completeStory, introduceVocab } = useStore();
  const [shown, setShown] = useState(1);
  const [choice, setChoice] = useState<number | null>(null);
  const [answer, setAnswer] = useState<number | null>(null);
  const choicePending = shown - 1 === story.choiceAt && choice === null;
  const allShown = shown >= story.lines.length && !choicePending;
  const finished = allShown && answer !== null;

  const next = () => { if (shown < story.lines.length) { setShown(shown + 1); speak(story.lines[shown].kz); } };
  React.useEffect(() => { introduceVocab(story.newVocab); speak(story.lines[0].kz); /* eslint-disable-line */ }, []);

  return (
    <div className="min-h-dvh bg-paper paper-ruled">
      <header className="max-w-2xl mx-auto px-5 pt-5 flex items-center gap-3">
        <button onClick={onExit} aria-label="Exit story" className="text-ink3 hover:text-ink p-1"><X className="w-7 h-7" strokeWidth={2.6} /></button>
        <div className="progress-chunky flex-1"><div style={{ width: `${(shown / story.lines.length) * 100}%` }} /></div>
      </header>
      <main className="max-w-2xl mx-auto px-5 pt-6 pb-20">
        <p className="text-[11px] font-black tracking-[0.2em] uppercase text-ink3">{story.scene}</p>
        <h1 className="kz text-3xl font-black mt-1">{locale === "ru" ? story.titleRu : story.titleEn}</h1>
        <p className="text-ink2 mt-1">{locale === "ru" ? story.introRu : story.introEn}</p>

        <div className="flex flex-col gap-4 mt-8">
          {story.lines.slice(0, shown).map((line, i) => {
            const mine = line.speaker === "You" || line.speaker === "Guest";
            return (
              <React.Fragment key={i}>
                <div className={`flex items-end gap-3 pop-in ${mine ? "flex-row-reverse" : ""}`}>
                  <div className="shrink-0 text-center">
                    <div className={`w-12 h-12 rounded-2xl grid place-items-center font-black text-lg border-2 border-line ${mine ? "bg-jadesoft text-Forest" : "bg-plumsoft text-plum"}`}>{line.speaker[0]}</div>
                    <p className="text-[11px] font-bold text-ink3 mt-1">{line.speaker}</p>
                  </div>
                  <div className={`card px-4 py-3 max-w-[78%] ${mine ? "rounded-br-md" : "rounded-bl-md"}`}>
                    <div className="flex gap-2.5 items-start">
                      <AudioButton text={line.kz} size="sm" variant="plain" />
                      <div>
                        <p className="kz text-lg font-extrabold leading-snug">{line.kz}</p>
                        <p className="text-sm text-ink3 font-medium">{locale === "ru" ? line.ru : line.en}</p>
                      </div>
                    </div>
                  </div>
                </div>
                {i === story.choiceAt && choicePending && (
                  <div className="flex flex-col gap-2.5 mt-1 pop-in" role="group" aria-label={tr("chooseReply")}>
                    <p className="font-extrabold text-sm uppercase tracking-wide text-ink3">{tr("chooseReply")}</p>
                    {story.choices.map((ch, ci) => (
                      <button key={ci} onClick={() => { setChoice(ci); speak(ch.kz); if (ci === story.choiceAnswer) setTimeout(() => setShown((s) => Math.min(s + 1, story.lines.length)), 400); }}
                        className="answer-card p-4 text-left">
                        <span className="kz block font-extrabold">{ch.kz}</span>
                        <span className="block text-sm text-ink3 font-semibold">{locale === "ru" ? ch.ru : ch.en}</span>
                      </button>
                    ))}
                  </div>
                )}
                {i === story.choiceAt && choice !== null && (
                  <p className={`font-bold rounded-2xl border-2 px-4 py-3 ${choice === story.choiceAnswer ? "bg-correctbg border-[var(--correct-border)] text-correct" : "bg-wrongbg border-[var(--wrong-border)] text-wrong"}`}>
                    {choice === story.choiceAnswer ? "✓" : "✕"} <span className="kz">{story.choices[story.choiceAnswer].kz}</span>
                  </p>
                )}
              </React.Fragment>
            );
          })}
        </div>

        {!allShown && !choicePending && (
          <button onClick={next} className="btn-3d btn-Forest w-full py-3.5 mt-8">{locale === "ru" ? "Следующая реплика" : "Next line"}</button>
        )}
        {allShown && !finished && (
          <div className="card p-5 mt-8 pop-in">
            <p className="font-extrabold text-lg">{locale === "ru" ? story.questionRu : story.questionEn}</p>
            <div className="flex flex-col gap-2.5 mt-4">
              {story.qOptions.map((o, i) => (
                <button key={i} onClick={() => { setAnswer(i); completeStory(story.id, 10); }} className="answer-card p-3.5 text-left font-bold">{locale === "ru" ? o.ru : o.en}</button>
              ))}
            </div>
          </div>
        )}
        {finished && (
          <div className="text-center mt-10 pop-in">
            <Barys mood="cheer" className="w-24 h-24 mx-auto" />
            <p className="font-black text-2xl mt-2">{answer === story.qAnswer ? (locale === "ru" ? "История понята! +10 XP" : "Story understood! +10 XP") : (locale === "ru" ? "История прочитана! +10 XP" : "Story complete! +10 XP")}</p>
            {answer !== story.qAnswer && <p className="text-ink2 mt-1">{locale === "ru" ? "Правильный ответ:" : "The answer was:"} <b>{locale === "ru" ? story.qOptions[story.qAnswer].ru : story.qOptions[story.qAnswer].en}</b></p>}
            <button onClick={onExit} className="btn-3d btn-Forest px-10 py-3.5 mt-5">{tr("backToLearn")}</button>
          </div>
        )}
      </main>
    </div>
  );
}

/* ================= Progress ================= */
export function ProgressScreen() {
  const { locale, tr } = useTr();
  const { state, streak } = useStore();
  const lessonsDone = Object.keys(state.completedLessons).length;
  const wordsKnown = Object.keys(state.vocab).length;
  const days = useMemo(() => {
    const out: { label: string; xp: number; isToday: boolean }[] = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date(); d.setDate(d.getDate() - i);
      const key = d.toISOString().slice(0, 10);
      out.push({ label: d.toLocaleDateString(locale === "ru" ? "ru-RU" : "en-GB", { weekday: "short" }).slice(0, 2), xp: state.activity[key] ?? 0, isToday: i === 0 });
    }
    return out;
  }, [state.activity, locale]);
  const maxXp = Math.max(10, ...days.map((d) => d.xp));
  const chaptersDone = [1, 2, 3].filter((c) => LESSONS.filter((l) => l.chapterId === c).every((l) => state.completedLessons[l.id])).length;
  const achievements = [
    { icon: "hand", en: "First Conversation", ru: "Первый разговор", got: lessonsDone >= 1 },
    { icon: "book", en: "Ten Useful Words", ru: "Десять полезных слов", got: wordsKnown >= 10 },
    { icon: "headphones", en: "Listening Explorer", ru: "Исследователь на слух", got: state.listeningCorrect >= 5 },
    { icon: "waves", en: "Grammar Discovery", ru: "Открытие грамматики", got: state.xp >= 60 },
    { icon: "trophy", en: "First Chapter Complete", ru: "Первая глава пройдена", got: chaptersDone >= 1 },
    { icon: "star", en: "Three Chapters Complete", ru: "Три главы пройдены", got: chaptersDone >= 3 },
  ];
  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-5 pb-28 pt-6">
      <h1 className="kz text-3xl font-black">{tr("progressTitle")}</h1>
      <div className="grid grid-cols-3 gap-3 mt-6">
        {[
          { icon: <Flame className="w-6 h-6" fill="currentColor" />, value: streak, label: tr("streak"), cls: "text-clay bg-claysoft border-clay/40" },
          { icon: <Zap className="w-6 h-6" fill="currentColor" />, value: state.xp, label: "XP", cls: "text-[#8a6420] dark:text-saffron bg-saffronsoft border-saffron/50" },
          { icon: <LibraryBig className="w-6 h-6" />, value: wordsKnown, label: tr("wordsKnown"), cls: "text-Forest bg-jadesoft border-jade/40" },
        ].map((s) => (
          <div key={s.label} className={`rounded-3xl border-[3px] p-4 text-center ${s.cls}`}>
            <div className="flex justify-center">{s.icon}</div>
            <p className="kz text-3xl font-black mt-1">{s.value}</p>
            <p className="text-xs font-extrabold uppercase tracking-wide opacity-80 leading-tight">{s.label}</p>
          </div>
        ))}
      </div>

      <section className="card mt-5 p-6" aria-label="Week activity">
        <h2 className="font-extrabold">{locale === "ru" ? "Эта неделя" : "This week"} · {lessonsDone} {tr("lessonsDone")}</h2>
        <div className="flex items-end gap-2 sm:gap-3 h-32 mt-5">
          {days.map((d, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-2">
              <span className="text-xs font-extrabold text-ink3">{d.xp || ""}</span>
              <div className="w-full rounded-t-xl rounded-b-md" style={{ height: `${Math.max(8, (d.xp / maxXp) * 84)}px`, background: d.xp ? "var(--Forest)" : "var(--track)", boxShadow: d.xp ? "inset 0 6px 0 rgba(255,255,255,.25)" : undefined }} />
              <span className={`text-xs font-extrabold uppercase ${d.isToday ? "text-Forest" : "text-ink3"}`}>{d.label}</span>
            </div>
          ))}
        </div>
        <p className="text-sm text-ink2 mt-3">{state.totalAnswered > 0 ? (locale === "ru" ? `Точность ответов: ${Math.round((state.totalCorrect / state.totalAnswered) * 100)}% (${state.totalAnswered} упражнений).` : `Answer accuracy: ${Math.round((state.totalCorrect / state.totalAnswered) * 100)}% across ${state.totalAnswered} exercises.`) : tr("noWordsSub")}</p>
      </section>

      <h2 className="text-sm font-black tracking-[0.18em] uppercase text-ink3 mt-8 flex items-center gap-2"><Trophy className="w-4 h-4" />{tr("achievements")}</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-4">
        {achievements.map((a) => (
          <div key={a.en} className={`card !rounded-3xl p-4 text-center ${a.got ? "" : "opacity-50 grayscale"}`}>
            <span className={`mx-auto w-14 h-14 rounded-full grid place-items-center ${a.got ? "bg-saffron text-[#2b2110] shadow-[0_4px_0_var(--saffron-dark)]" : "bg-track text-ink3"}`}><LessonIcon name={a.icon} /></span>
            <p className="font-extrabold text-sm mt-2 leading-tight">{locale === "ru" ? a.ru : a.en}</p>
            <p className="text-[11px] font-bold text-ink3 mt-0.5">{a.got ? (locale === "ru" ? "Получено" : "Earned") : (locale === "ru" ? "Впереди" : "Ahead of you")}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ================= Settings ================= */
export function SettingsScreen({ onBackToLanding }: { onBackToLanding: () => void }) {
  const { locale, tr } = useTr();
  const { state, patch, resetAll } = useStore();
  const [name, setName] = useState(state.name);
  const [confirmReset, setConfirmReset] = useState(false);
  const Toggle = ({ label, value, onChange, icon }: { label: string; value: boolean; onChange: (v: boolean) => void; icon?: React.ReactNode }) => (
    <button onClick={() => onChange(!value)} aria-pressed={value} className="w-full flex items-center gap-3 py-3.5 border-b-2 border-line last:border-0 text-left">
      {icon}<span className="flex-1 font-bold">{label}</span>
      <span className={`w-12 h-7 rounded-full p-1 transition-colors ${value ? "bg-Forest" : "bg-track"}`} aria-hidden="true">
        <span className={`block w-5 h-5 rounded-full bg-white shadow transition-transform ${value ? "translate-x-5" : ""}`} />
      </span>
    </button>
  );
  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-5 pb-28 pt-6">
      <h1 className="kz text-3xl font-black">{tr("settingsTitle")}</h1>
      <p className="text-ink2 mt-1 flex items-center gap-2">{tr("guestNote")}</p>

      <section className="card mt-6 p-6">
        <h2 className="font-extrabold">{tr("yourName")}</h2>
        <div className="flex gap-2 mt-3">
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder={tr("namePh")} className="flex-1 bg-surface2 border-2 border-line rounded-xl px-4 py-2.5 font-bold outline-none focus:border-[var(--sky)]" aria-label={tr("yourName")} />
          <button onClick={() => patch({ name: name.trim() })} className="btn-3d btn-Forest px-5 py-2.5 text-sm">{locale === "ru" ? "Сохранить" : "Save"}</button>
        </div>
        <h2 className="font-extrabold mt-6">{tr("interfaceLang")}</h2>
        <div className="flex gap-2 mt-3">
          {(["en", "ru"] as Locale[]).map((l) => (
            <button key={l} onClick={() => patch({ locale: l })} className={`rounded-xl border-2 px-5 py-2.5 font-extrabold ${locale === l ? "bg-Forest text-white border-Forest dark:text-[#08130d]" : "border-line bg-surface"}`}>{l === "en" ? "English" : "Русский"}</button>
          ))}
        </div>
        <h2 className="font-extrabold mt-6">{tr("dailyGoal")}</h2>
        <div className="grid grid-cols-3 gap-2 mt-3">
          {[5, 10, 15].map((m) => (
            <button key={m} onClick={() => patch({ dailyGoalMin: m })} className={`answer-card py-3 text-center font-extrabold ${state.dailyGoalMin === m ? "selected" : ""}`}>{m} {tr("perDay")}</button>
          ))}
        </div>
      </section>

      <section className="card mt-4 px-6 py-2">
        <Toggle label={tr("showTr")} value={state.showTranslit} onChange={(v) => patch({ showTranslit: v })} />
        <Toggle label={tr("darkTheme")} value={state.theme === "dark"} onChange={(v) => patch({ theme: v ? "dark" : "light" })} icon={<Moon className="w-5 h-5 text-ink3" />} />
        <Toggle label={tr("reduceMotion")} value={state.reduceMotion} onChange={(v) => patch({ reduceMotion: v })} />
      </section>

      <section className="card mt-4 p-6">
        <h2 className="font-extrabold text-wrong flex items-center gap-2"><Trash2 className="w-5 h-5" />{tr("resetProgress")}</h2>
        <p className="text-sm text-ink2 mt-1">{tr("resetConfirm")}</p>
        {!confirmReset ? (
          <button onClick={() => setConfirmReset(true)} className="btn-3d btn-ghost3d px-5 py-2.5 mt-3 text-sm">{tr("resetProgress")}</button>
        ) : (
          <div className="flex gap-2 mt-3">
            <button onClick={() => { resetAll(); setConfirmReset(false); }} className="btn-3d btn-clay px-5 py-2.5 text-sm">{locale === "ru" ? "Да, сбросить" : "Yes, reset"}</button>
            <button onClick={() => setConfirmReset(false)} className="btn-3d btn-ghost3d px-5 py-2.5 text-sm">{locale === "ru" ? "Отмена" : "Cancel"}</button>
          </div>
        )}
        <button onClick={onBackToLanding} className="block mt-6 text-sm font-bold text-ink3 hover:text-Forest underline underline-offset-4">{locale === "ru" ? "Посмотреть главную страницу" : "View the landing page"}</button>
      </section>
    </div>
  );
}
