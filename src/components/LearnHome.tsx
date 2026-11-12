"use client";
import React, { useState } from "react";
import { Lock, Check, Play, RotateCcw, ChevronRight } from "lucide-react";
import { CHAPTERS, LESSONS, type Lesson } from "@/data/curriculum";
import { useStore } from "@/lib/store";
import { t } from "@/lib/i18n";
import { Barys, LessonIcon } from "./ui";

const CHAPTER_SKIN: Record<string, { bg: string; edge: string; banner: string }> = {
  Forest: { bg: "var(--Forest)", edge: "var(--Forest-dark)", banner: "bg-Forest" },
  sky: { bg: "var(--sky)", edge: "var(--sky-dark)", banner: "bg-[var(--sky)]" },
  clay: { bg: "var(--clay)", edge: "var(--clay-dark)", banner: "bg-clay" },
  saffron: { bg: "var(--saffron)", edge: "var(--saffron-dark)", banner: "bg-saffron" },
  plum: { bg: "var(--plum)", edge: "var(--plum-dark)", banner: "bg-plum" },
};
const OFFSETS = [0, 52, 78, 52, 0, -52, -78, -52];

export default function LearnHome({ onStartLesson, onReview }: { onStartLesson: (id: string) => void; onReview: () => void }) {
  const { state, nextLessonId, isLessonUnlocked, dueVocabIds } = useStore();
  const locale = state.locale;
  const tr = (k: Parameters<typeof t>[1]) => t(locale, k);
  const [openId, setOpenId] = useState<string | null>(nextLessonId);
  const next = nextLessonId ? LESSONS.find((l) => l.id === nextLessonId) : null;
  const doneCount = Object.keys(state.completedLessons).length;
  const todayXp = state.activity[new Date().toISOString().slice(0, 10)] ?? 0;
  const goalXp = state.dailyGoalMin * 2;

  const lessonState = (l: Lesson): "done" | "current" | "available" | "locked" => {
    if (state.completedLessons[l.id]) return "done";
    if (l.id === nextLessonId) return "current";
    if (isLessonUnlocked(l.id)) return "available";
    return "locked";
  };

  return (
    <div className="max-w-xl mx-auto px-4 sm:px-5 pb-28">
      {/* greeting + continue */}
      <div className="pt-6">
        <h1 className="kz text-[28px] leading-tight font-black">
          {state.name ? `${locale === "ru" ? "Сәлем" : "Сәлем"}, ${state.name}` : tr("readyQ")}
        </h1>
        <p className="text-ink2 font-medium mt-1">
          {doneCount === 0 ? tr("newHereSub") : locale === "ru" ? "Ваш блокнот ждёт. Один маленький урок — и день удался." : "Your notebook is waiting. One small lesson makes the day."}
        </p>
      </div>

      {next ? (
        <div className="card mt-6 p-5 sm:p-6 relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-2 bg-saffron" />
          <p className="text-[11px] font-black tracking-[0.2em] uppercase text-ink3">{tr("continueLearning")} · {tr("chapter")} {next.chapterId}</p>
          <div className="flex items-start gap-4 mt-2">
            <div className="flex-1 min-w-0">
              <h2 className="kz text-2xl font-black leading-tight">{locale === "ru" ? next.titleRu : next.titleEn}</h2>
              <p className="text-ink2 mt-1">{locale === "ru" ? next.objectiveRu : next.objectiveEn} · ~{next.minutes} {tr("min")}</p>
            </div>
            <Barys className="w-16 h-16 shrink-0 hidden sm:block" />
          </div>
          <button onClick={() => onStartLesson(next.id)} className="btn-3d btn-Forest w-full py-3.5 mt-4 flex items-center justify-center gap-2">
            <Play className="w-5 h-5" fill="currentColor" /> {doneCount === 0 ? tr("startFirst") : tr("continueBtn")}
          </button>
          <div className="mt-4">
            <div className="flex justify-between text-xs font-extrabold text-ink3 uppercase tracking-wide">
              <span>{tr("todaysGoal")}</span><span>{todayXp} / {goalXp} XP</span>
            </div>
            <div className="progress-chunky progress-saffron mt-1.5"><div style={{ width: `${Math.min(100, (todayXp / goalXp) * 100)}%` }} /></div>
          </div>
        </div>
      ) : (
        <div className="card mt-6 p-6 text-center">
          <Barys mood="cheer" className="w-24 h-24 mx-auto" />
          <h2 className="kz text-2xl font-black mt-2">{locale === "ru" ? "Все доступные главы пройдены!" : "You've finished every open chapter!"}</h2>
          <p className="text-ink2 mt-1">{locale === "ru" ? "Новые главы готовятся. А пока — повторение удержит слова живыми." : "New chapters are in preparation. Meanwhile, review keeps your words alive."}</p>
        </div>
      )}

      {dueVocabIds.length > 0 && (
        <button onClick={onReview} className="w-full card mt-4 p-4 flex items-center gap-3 text-left hover:border-jade transition-colors">
          <span className="w-11 h-11 rounded-2xl bg-saffronsoft grid place-items-center text-[#8a6420] dark:text-saffron shrink-0"><RotateCcw className="w-6 h-6" strokeWidth={2.4} /></span>
          <span className="flex-1">
            <span className="block font-extrabold">{dueVocabIds.length} {tr("wordsReady")}</span>
            <span className="block text-sm text-ink3 font-medium">{locale === "ru" ? "Две минуты сейчас сэкономят десять завтра." : "Two minutes now saves ten tomorrow."}</span>
          </span>
          <ChevronRight className="w-5 h-5 text-ink3" />
        </button>
      )}

      {/* chapters + trail */}
      {CHAPTERS.map((ch) => {
        const lessons = LESSONS.filter((l) => l.chapterId === ch.id);
        const skin = CHAPTER_SKIN[ch.color];
        const chDone = lessons.length > 0 && lessons.every((l) => state.completedLessons[l.id]);
        return (
          <section key={ch.id} className="mt-10" aria-label={`${tr("chapter")} ${ch.id}: ${locale === "ru" ? ch.titleRu : ch.titleEn}`}>
            <div className={`rounded-3xl ${ch.status === "soon" ? "bg-track text-ink2" : `${skin.banner} text-white`} p-5 sm:p-6 flex items-start gap-4 shadow-sm`}>
              <div className="flex-1">
                <p className="text-[11px] font-black tracking-[0.22em] uppercase opacity-80">{tr("chapter")} {ch.id}{chDone ? " · ✓" : ""}</p>
                <h2 className="kz text-2xl sm:text-[26px] font-black leading-tight mt-1">{locale === "ru" ? ch.titleRu : ch.titleEn}</h2>
                <p className={`mt-1 font-medium ${ch.status === "soon" ? "text-ink3" : "text-white/85"}`}>{locale === "ru" ? ch.objectiveRu : ch.objectiveEn}</p>
              </div>
              <span className="kz hidden sm:grid w-14 h-14 rounded-full border-[3px] border-dashed border-current opacity-70 place-items-center font-black text-lg rotate-[-8deg] shrink-0" aria-hidden="true">{ch.id}</span>
            </div>

            {ch.status === "soon" ? (
              <p className="text-center mt-5 text-ink3 font-bold flex items-center justify-center gap-2"><Lock className="w-4 h-4" /> {tr("upcoming")} — {locale === "ru" ? "глава в подготовке" : "chapter in preparation"}</p>
            ) : (
              <div className="flex flex-col items-center mt-8 gap-1">
                {lessons.map((l, i) => {
                  const st = lessonState(l);
                  const off = OFFSETS[i % OFFSETS.length];
                  const open = openId === l.id;
                  return (
                    <div key={l.id} className="flex flex-col items-center w-full">
                      <div className="relative" style={{ transform: `translateX(${off}px)` }}>
                        {st === "current" && (
                          <span className="absolute -top-11 left-1/2 -translate-x-1/2 z-10 bg-surface border-2 border-line rounded-xl px-3 py-1 text-[12px] font-black tracking-widest text-Forest uppercase bounce-soft whitespace-nowrap shadow">
                            {tr("startBtn")}
                            <span className="absolute left-1/2 -translate-x-1/2 -bottom-[7px] w-3 h-3 bg-surface border-r-2 border-b-2 border-line rotate-45" />
                          </span>
                        )}
                        <button
                          disabled={st === "locked"}
                          onClick={() => setOpenId(open ? null : l.id)}
                          aria-label={`${locale === "ru" ? l.titleRu : l.titleEn} — ${st}`}
                          aria-expanded={open}
                          className={`path-node ${st === "locked" ? "locked" : ""} ${st === "current" ? "current" : ""}`}
                          style={st === "locked" ? undefined : { background: st === "done" ? "var(--saffron)" : skin.bg, ["--node-edge" as string]: st === "done" ? "var(--saffron-dark)" : skin.edge, color: st === "done" ? "#2b2110" : "#fff" }}
                        >
                          {st === "done" ? <Check className="w-8 h-8" strokeWidth={3} /> : st === "locked" ? <Lock className="w-7 h-7" /> : <LessonIcon name={l.icon} className="w-8 h-8" />}
                        </button>
                      </div>

                      {open && st !== "locked" && (
                        <div className="card w-full max-w-sm mt-4 p-5 pop-in relative z-10" style={{ borderColor: skin.bg }}>
                          <p className="text-[11px] font-black tracking-[0.18em] uppercase text-ink3">{l.checkpoint ? tr("checkpoint") : tr("lesson")} · ~{l.minutes} {tr("min")}</p>
                          <h3 className="kz text-xl font-black mt-1">{locale === "ru" ? l.titleRu : l.titleEn}</h3>
                          <p className="text-ink2 mt-1 text-[15px]">{locale === "ru" ? l.objectiveRu : l.objectiveEn}</p>
                          {st === "done" && <p className="text-sm font-bold text-correct mt-2">✓ {state.completedLessons[l.id].accuracy}% · +{state.completedLessons[l.id].xp} XP</p>}
                          <button onClick={() => onStartLesson(l.id)} className="btn-3d btn-Forest w-full py-3 mt-4" style={{ ["--btn-edge" as string]: skin.edge }}>
                            {st === "done" ? (locale === "ru" ? "Практиковаться снова" : "Practice again") : tr("startBtn")}
                          </button>
                        </div>
                      )}
                      {i < lessons.length - 1 && <span className="block w-[3px] h-7 my-1 rounded bg-line" aria-hidden="true" style={{ transform: `translateX(${(off + OFFSETS[(i + 1) % OFFSETS.length]) / 2}px) rotate(${off > OFFSETS[(i + 1) % OFFSETS.length] ? 24 : off < OFFSETS[(i + 1) % OFFSETS.length] ? -24 : 0}deg)` }} />}
                    </div>
                  );
                })}
              </div>
            )}
          </section>
        );
      })}
    </div>
  );
}
