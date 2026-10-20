"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Menu, X, Globe, Plane, Briefcase, GraduationCap, Heart, Languages, Sparkles, Play } from "lucide-react";
import { useStore } from "@/lib/store";
import { t, type Locale } from "@/lib/i18n";
import { vocabById, CHAPTERS, LESSONS } from "@/data/curriculum";
import { AudioButton, Barys, Logo, OrnamentDivider } from "./ui";
import LessonPlayer from "./LessonPlayer";
import { speak } from "@/lib/core";

const HERO_WORDS = ["salem", "raqmet", "qalinqalai", "atym"];
const LIVING = ["salem", "raqmet", "qalinqalai", "atym", "saubol", "bulne"];

export default function Landing({ onStart, onLogin }: { onStart: () => void; onLogin: () => void }) {
  const { state, patch } = useStore();
  const locale = state.locale;
  const tr = (k: Parameters<typeof t>[1]) => t(locale, k);
  const [menu, setMenu] = useState(false);
  const [heroIdx, setHeroIdx] = useState(0);
  const [preview, setPreview] = useState(false);
  const [previewDone, setPreviewDone] = useState(false);
  const [livingActive, setLivingActive] = useState<string | null>("salem");
  const heroWord = vocabById[HERO_WORDS[heroIdx]];

  if (preview) {
    const first = LESSONS[0];
    return (
      <LessonPlayer
        exercises={first.exercises.slice(0, 5)}
        title={locale === "ru" ? first.titleRu : first.titleEn}
        onExit={() => setPreview(false)}
        onFinish={() => {
          setPreviewDone(true);
          return (
            <div className="flex flex-col gap-3">
              <p className="font-bold text-ink2">{tr("previewDoneSub")}</p>
              <button onClick={onStart} className="btn-3d btn-Forest w-full py-4 text-base">{tr("continueCourse")} <ArrowRight className="inline w-5 h-5 -mt-0.5" /></button>
              <button onClick={() => setPreview(false)} className="btn-3d btn-ghost3d w-full py-3">{locale === "ru" ? "На главную" : "Back to home"}</button>
            </div>
          );
        }}
      />
    );
  }

  return (
    <div className="min-h-dvh paper-ruled">
      {/* nav */}
      <header className="sticky top-0 z-40 bg-paper/90 backdrop-blur border-b-2 border-line">
        <div className="max-w-6xl mx-auto px-5 h-[68px] flex items-center gap-6">
          <Logo />
          <nav className="hidden md:flex items-center gap-7 ml-4 text-[15px] font-bold text-ink2" aria-label="Main">
            <a href="#how" className="hover:text-Forest">{tr("howItWorks")}</a>
            <a href="#course" className="hover:text-Forest">{tr("course")}</a>
            <a href="#why" className="hover:text-Forest">{tr("whyKz")}</a>
          </nav>
          <div className="ml-auto flex items-center gap-2 sm:gap-3">
            <label className="hidden sm:flex items-center gap-1.5 text-sm font-bold text-ink2">
              <Globe className="w-4 h-4" />
              <select value={locale} onChange={(e) => patch({ locale: e.target.value as Locale })} className="bg-transparent font-bold cursor-pointer" aria-label="Interface language">
                <option value="en">EN</option><option value="ru">RU</option>
              </select>
            </label>
            <button onClick={onLogin} className="hidden sm:block font-extrabold text-Forest uppercase text-sm tracking-wide px-3 py-2 hover:underline">{tr("login")}</button>
            <button onClick={onStart} className="btn-3d btn-Forest px-5 py-2.5 text-sm">{tr("startFree")}</button>
            <button className="md:hidden p-2" onClick={() => setMenu(!menu)} aria-label="Menu">{menu ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}</button>
          </div>
        </div>
        {menu && (
          <nav className="md:hidden border-t-2 border-line px-5 py-4 flex flex-col gap-3 font-bold" aria-label="Mobile">
            <a href="#how" onClick={() => setMenu(false)}>{tr("howItWorks")}</a>
            <a href="#course" onClick={() => setMenu(false)}>{tr("course")}</a>
            <a href="#why" onClick={() => setMenu(false)}>{tr("whyKz")}</a>
            <button onClick={onLogin} className="text-left text-Forest font-extrabold uppercase text-sm">{tr("login")}</button>
          </nav>
        )}
      </header>

      {/* HERO */}
      <section className="max-w-6xl mx-auto px-5 pt-12 sm:pt-20 pb-16 grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <p className="text-xs font-black tracking-[0.22em] text-jade uppercase">{tr("heroKicker")}</p>
          <h1 className="kz text-[44px] leading-[1.04] sm:text-6xl lg:text-[68px] font-black tracking-tight mt-4">
            {tr("hero1")}<br />
            <span className="text-Forest">{tr("hero2")}</span>
          </h1>
          <p className="text-lg sm:text-xl text-ink2 leading-relaxed mt-5 max-w-md">{tr("heroSub")}</p>
          <div className="flex flex-col sm:flex-row gap-3 mt-8">
            <button onClick={onStart} className="btn-3d btn-Forest px-8 py-4 text-base">{tr("startFree")}</button>
            <button onClick={() => setPreview(true)} className="btn-3d btn-ghost3d px-8 py-4 text-base flex items-center justify-center gap-2">
              <Play className="w-5 h-5 text-Forest" fill="currentColor" /> {tr("tryLesson")}
            </button>
          </div>
          <p className="kz mt-6 text-ink3 font-semibold">«{tr("heroLine")}»</p>
          <div className="mt-8 flex items-center gap-3">
            <Barys className="w-14 h-14" />
            <p className="text-sm text-ink2 max-w-[280px] leading-snug">
              {locale === "ru"
                ? <>Это <b>Barys</b>, снежный барс Тянь-Шаня. Он будет рядом на каждом уроке.</>
                : <>This is <b>Barys</b>, a Tian Shan snow leopard. He'll keep you company in every lesson.</>}
            </p>
          </div>
        </div>

        {/* interactive hero composition */}
        <div className="relative mx-auto w-full max-w-[460px]" aria-label="Interactive Kazakh word card">
          <div className="absolute -top-6 -right-2 sm:-right-6 rotate-6 bg-saffron text-[#2b2110] rounded-2xl px-4 py-3 shadow-lg z-20 float-y" style={{ ["--r" as string]: "6deg" }}>
            <p className="text-xs font-black uppercase tracking-widest">{locale === "ru" ? "Культурная заметка" : "Field note"}</p>
            <p className="text-sm font-bold leading-snug mt-0.5 max-w-[180px]">{locale === "ru" ? "Старшим всегда говорят «Сіз», а не «Сен»." : "Elders always get Сіз — never Сен."}</p>
          </div>
          <motion.div key={heroWord.id} initial={state.reduceMotion ? false : { opacity: 0, y: 14, rotate: -1 }} animate={{ opacity: 1, y: 0, rotate: -1 }}
            className="card relative z-10 p-8 sm:p-10 pt-12">
            <span className="absolute top-4 left-5 text-[11px] font-black tracking-[0.2em] text-ink3 uppercase">{locale === "ru" ? "Слово №" : "Word №"}{heroIdx + 1} · {tr("chapter")} 1</span>
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="kz text-6xl sm:text-7xl font-black tracking-tight leading-none">{heroWord.kz}</p>
                {state.showTranslit && <p className="text-ink3 font-bold mt-2">[{heroWord.tr}]</p>}
              </div>
              <AudioButton text={heroWord.kz} size="md" />
            </div>
            <p className="text-2xl font-extrabold text-Forest mt-4">{locale === "ru" ? heroWord.ru : heroWord.en}</p>
            <div className="border-t-2 border-dashed border-line mt-5 pt-4">
              <p className="kz text-lg font-bold">{heroWord.exKz}</p>
              <p className="text-ink3 font-medium">{locale === "ru" ? heroWord.exRu : heroWord.exEn}</p>
            </div>
            <div className="flex gap-2 mt-6">
              {HERO_WORDS.map((id, i) => (
                <button key={id} onClick={() => { setHeroIdx(i); speak(vocabById[id].kz); }} aria-label={vocabById[id].kz}
                  className={`kz word-tile !py-1.5 ${i === heroIdx ? "!border-Forest bg-jadesoft" : ""}`}>{vocabById[id].kz}</button>
              ))}
            </div>
          </motion.div>
          <div className="card relative z-0 -mt-4 ml-6 sm:ml-12 rotate-2 p-5 max-w-[340px] bg-surface2">
            <div className="flex items-end gap-3">
              <Barys className="w-12 h-12 shrink-0" />
              <div className="bg-surface border-2 border-line rounded-2xl rounded-bl-md px-4 py-2.5">
                <p className="kz font-extrabold">Сәлем! Қалың қалай?</p>
                <p className="text-xs text-ink3 font-semibold">{locale === "ru" ? "Привет! Как дела?" : "Hi! How are you?"}</p>
              </div>
            </div>
            <div className="flex justify-end mt-3">
              <button onClick={() => speak("Жақсы, рақмет!")} className="bg-Forest text-white rounded-2xl rounded-br-md px-4 py-2.5 text-left">
                <span className="kz block font-extrabold">Жақсы, рақмет!</span>
                <span className="block text-xs opacity-80 font-semibold">{locale === "ru" ? "Хорошо, спасибо! · нажмите, чтобы услышать" : "Good, thanks! · tap to hear"}</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-5"><OrnamentDivider /></div>

      {/* LIVING LANGUAGE */}
      <section className="max-w-6xl mx-auto px-5 py-14" id="why">
        <h2 className="kz text-3xl sm:text-4xl font-black">{tr("livingTitle")}</h2>
        <p className="text-ink2 mt-2 max-w-xl">{tr("livingSub")}</p>
        <div className="mt-8 divide-y-2 divide-line border-y-2 border-line">
          {LIVING.map((id) => {
            const v = vocabById[id]; const open = livingActive === id;
            return (
              <button key={id} onClick={() => { setLivingActive(open ? null : id); speak(v.kz); }} aria-expanded={open}
                className={`w-full text-left py-4 sm:py-5 flex items-center gap-4 transition-colors ${open ? "bg-jadesoft/50 -mx-3 px-3 rounded-xl" : "hover:bg-surface2"}`}>
                <span className={`kz text-2xl sm:text-4xl font-black ${open ? "text-Forest" : ""}`}>{v.kz}</span>
                {open ? (
                  <span className="ml-auto text-right">
                    <span className="block font-extrabold">{locale === "ru" ? v.ru : v.en}</span>
                    <span className="kz block text-sm text-ink3 font-semibold">{v.exKz}</span>
                  </span>
                ) : <span className="ml-auto text-ink3 font-bold text-sm hidden sm:block">{locale === "ru" ? "нажмите →" : "tap →"}</span>}
              </button>
            );
          })}
        </div>
      </section>

      {/* METHOD */}
      <section className="max-w-6xl mx-auto px-5 py-10" id="how">
        <h2 className="kz text-3xl sm:text-4xl font-black">{tr("methodTitle")}</h2>
        <p className="text-ink2 mt-2 max-w-xl">{tr("methodSub")}</p>
        <div className="grid md:grid-cols-3 gap-5 mt-9">
          <article className="card p-6 rotate-[-0.5deg]">
            <p className="kz text-saffron-dark dark:text-saffron font-black text-sm tracking-widest">01</p>
            <h3 className="text-xl font-extrabold mt-1">{tr("m1t")}</h3>
            <p className="text-ink2 mt-2 leading-relaxed">{tr("m1d")}</p>
            <div className="mt-5 bg-surface2 border-2 border-line rounded-2xl p-4">
              <p className="kz text-2xl font-black">Рақмет!</p>
              <p className="text-sm text-ink3 font-semibold">{locale === "ru" ? "Спасибо! — сказано у прилавка базара" : "Thank you! — said at a market stall"}</p>
            </div>
          </article>
          <article className="card p-6 md:translate-y-4">
            <p className="kz text-saffron-dark dark:text-saffron font-black text-sm tracking-widest">02</p>
            <h3 className="text-xl font-extrabold mt-1">{tr("m2t")}</h3>
            <p className="text-ink2 mt-2 leading-relaxed">{tr("m2d")}</p>
            <div className="mt-5 flex flex-wrap gap-2" aria-hidden="true">
              {["Менің", "атым", "Timur"].map((w) => <span key={w} className="word-tile kz">{w}</span>)}
            </div>
          </article>
          <article className="card p-6 rotate-[0.5deg]">
            <p className="kz text-saffron-dark dark:text-saffron font-black text-sm tracking-widest">03</p>
            <h3 className="text-xl font-extrabold mt-1">{tr("m3t")}</h3>
            <p className="text-ink2 mt-2 leading-relaxed">{tr("m3d")}</p>
            <div className="mt-5">
              <div className="progress-chunky progress-saffron"><div style={{ width: "68%" }} /></div>
              <p className="text-sm text-ink3 font-semibold mt-2">{locale === "ru" ? "«Дүкен» вернётся завтра — как раз вовремя" : "“Дүкен” returns tomorrow — right on time"}</p>
            </div>
          </article>
        </div>
      </section>

      {/* COURSE / CULTURE */}
      <section className="max-w-6xl mx-auto px-5 py-14" id="course">
        <div className="grid lg:grid-cols-5 gap-10">
          <div className="lg:col-span-3">
            <h2 className="kz text-3xl sm:text-4xl font-black">{tr("cultureTitle")}</h2>
            <p className="text-ink2 mt-3 leading-relaxed">{tr("cultureSub")}</p>
            <div className="card mt-7 overflow-hidden">
              <div className="bg-Forest text-white p-6 sm:p-8">
                <p className="kz text-3xl sm:text-4xl font-black leading-snug">«Қонақ келсе — құт келеді»</p>
                <p className="opacity-85 mt-2 font-medium">{locale === "ru" ? "«С гостем приходит благодать» — пословица о гостеприимстве." : "“When a guest arrives, fortune arrives with them” — a proverb of hospitality."}</p>
              </div>
              <div className="p-6 grid sm:grid-cols-3 gap-4 text-sm">
                {[
                  { kz: "Шай ішесіз бе?", en: "Tea first — always.", ru: "Сначала чай — всегда." },
                  { kz: "Базар анда.", en: "Markets are living rooms.", ru: "Базар — это гостиная города." },
                  { kz: "Тау қайда?", en: "Mountains point south in Almaty.", ru: "В Алматы горы указывают на юг." },
                ].map((c) => (
                  <button key={c.kz} onClick={() => speak(c.kz)} className="text-left bg-surface2 border-2 border-line rounded-2xl p-4 hover:border-jade transition-colors">
                    <span className="kz block font-extrabold">{c.kz}</span>
                    <span className="block text-ink3 font-semibold mt-1">{locale === "ru" ? c.ru : c.en}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="lg:col-span-2">
            <h3 className="text-sm font-black tracking-[0.2em] uppercase text-ink3">{tr("course")}</h3>
            <ol className="mt-4 space-y-3">
              {CHAPTERS.map((c) => (
                <li key={c.id} className="flex gap-3 items-start">
                  <span className="kz w-9 h-9 rounded-xl bg-jadesoft text-Forest grid place-items-center font-black shrink-0">{c.id}</span>
                  <div>
                    <p className="font-extrabold">{locale === "ru" ? c.titleRu : c.titleEn}
                      {c.status === "soon" && <span className="ml-2 text-[11px] font-black uppercase tracking-wider text-ink3 border-2 border-line rounded-full px-2 py-0.5">{tr("upcoming")}</span>}
                    </p>
                    <p className="text-sm text-ink2">{locale === "ru" ? c.objectiveRu : c.objectiveEn}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* PREVIEW CTA */}
      <section className="max-w-6xl mx-auto px-5 pb-20">
        <div className="rounded-[28px] bg-[var(--Forest-deep)] text-white p-8 sm:p-12 relative overflow-hidden">
          <div className="absolute -right-8 -bottom-10 opacity-90 hidden sm:block"><Barys mood="cheer" className="w-52 h-52" /></div>
          <h2 className="kz text-3xl sm:text-4xl font-black max-w-lg">{previewDone ? tr("previewDone") : tr("previewTitle")}</h2>
          <p className="text-white/80 mt-3 max-w-md">{tr("previewSub")}</p>
          <button onClick={() => setPreview(true)} className="btn-3d btn-saffron px-8 py-4 mt-7 text-base">{tr("startPreview")}</button>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t-2 border-line">
        <div className="max-w-6xl mx-auto px-5 py-12 grid sm:grid-cols-4 gap-8">
          <div>
            <Logo />
            <p className="text-sm text-ink2 mt-3">{tr("footerTag")}</p>
            <p className="kz text-sm font-bold text-ink3 mt-2">Тіл — язык · language · tongue</p>
          </div>
          {[
            { h: tr("product"), items: [tr("howItWorks"), tr("course"), tr("tryLesson")] },
            { h: tr("learning"), items: [tr("words"), tr("grammar"), tr("sounds"), tr("stories")] },
            { h: tr("about"), items: [locale === "ru" ? "Доступность" : "Accessibility", locale === "ru" ? "Конфиденциальность" : "Privacy", locale === "ru" ? "Условия" : "Terms"] },
          ].map((col) => (
            <div key={col.h}>
              <h3 className="text-xs font-black tracking-[0.18em] uppercase text-ink3">{col.h}</h3>
              <ul className="mt-3 space-y-2 font-bold text-ink2">
                {col.items.map((i) => <li key={i}><button onClick={onStart} className="hover:text-Forest">{i}</button></li>)}
              </ul>
            </div>
          ))}
        </div>
        <div className="max-w-6xl mx-auto px-5 pb-8 text-xs text-ink3 font-medium">
          {locale === "ru"
            ? "TIL — учебный прототип. Материалы по казахскому языку подготовлены для рецензии носителем перед публикацией."
            : "TIL is a learning prototype. Kazakh course content is prepared for review by a qualified speaker before production release."}
        </div>
      </footer>
    </div>
  );
}

/* ---------------- Onboarding ---------------- */
const GOALS = [
  { id: "visit", icon: Plane }, { id: "move", icon: Briefcase }, { id: "study", icon: GraduationCap },
  { id: "family", icon: Heart }, { id: "love", icon: Languages }, { id: "other", icon: Sparkles },
] as const;

export function Onboarding({ onDone }: { onDone: () => void }) {
  const { state, patch } = useStore();
  const locale = state.locale;
  const tr = (k: Parameters<typeof t>[1]) => t(locale, k);
  const [step, setStep] = useState(0);
  const [goal, setGoal] = useState("");
  const [level, setLevel] = useState("new");
  const [mins, setMins] = useState(10);

  const finish = () => { patch({ onboarded: true, goal, level, dailyGoalMin: mins }); onDone(); };

  return (
    <div className="min-h-dvh paper-ruled flex flex-col">
      <header className="max-w-2xl w-full mx-auto px-5 pt-6 flex items-center gap-4">
        <Logo size="sm" />
        <div className="progress-chunky flex-1"><div style={{ width: `${((step + 1) / 3) * 100}%` }} /></div>
        <label className="flex items-center gap-1.5 text-sm font-bold text-ink2 shrink-0">
          <Globe className="w-4 h-4" />
          <select value={locale} onChange={(e) => patch({ locale: e.target.value as Locale })} className="bg-transparent font-bold cursor-pointer" aria-label="Interface language">
            <option value="en">EN</option><option value="ru">RU</option>
          </select>
        </label>
      </header>
      <main className="flex-1 max-w-2xl w-full mx-auto px-5 pt-10 pb-16">
        <div className="flex items-end gap-4">
          <Barys className="w-20 h-20 shrink-0" />
          <div className="card px-5 py-4 rounded-bl-md">
            <p className="font-extrabold text-lg">{step === 0 ? tr("obWelcome") : step === 1 ? tr("obLevel") : tr("obGoal")}</p>
            {step === 0 && <p className="text-ink2">{tr("obSub")}</p>}
          </div>
        </div>

        {step === 0 && (
          <>
            <h2 className="text-2xl font-black mt-10">{tr("obWhy")}</h2>
            <div className="flex flex-col gap-3 mt-5" role="radiogroup" aria-label={tr("obWhy")}>
              {GOALS.map((g) => (
                <button key={g.id} role="radio" aria-checked={goal === g.id} onClick={() => setGoal(g.id)}
                  className={`answer-card p-4 flex items-center gap-4 font-bold text-left ${goal === g.id ? "selected" : ""}`}>
                  <span className="w-11 h-11 rounded-xl bg-jadesoft grid place-items-center text-Forest shrink-0"><g.icon className="w-6 h-6" /></span>
                  {tr(`goal_${g.id}` as Parameters<typeof t>[1])}
                </button>
              ))}
            </div>
            <button disabled={!goal} onClick={() => setStep(1)} className="btn-3d btn-Forest w-full py-4 mt-8">{tr("continueX")}</button>
          </>
        )}
        {step === 1 && (
          <>
            <div className="flex flex-col gap-3 mt-10" role="radiogroup" aria-label={tr("obLevel")}>
              {(["new", "few", "basic"] as const).map((l) => (
                <button key={l} role="radio" aria-checked={level === l} onClick={() => setLevel(l)}
                  className={`answer-card p-5 font-bold text-left text-lg ${level === l ? "selected" : ""}`}>{tr(`lvl_${l}` as Parameters<typeof t>[1])}</button>
              ))}
            </div>
            <p className="text-sm text-ink3 font-medium mt-4">{locale === "ru" ? "Курс всегда начинается с первой главы — знакомые уроки проходятся быстро и всё равно дают XP." : "Everyone starts in Chapter 1 — familiar lessons fly by and still earn XP."}</p>
            <div className="flex gap-3 mt-8">
              <button onClick={() => setStep(0)} className="btn-3d btn-ghost3d px-6 py-4">{tr("obBack")}</button>
              <button onClick={() => setStep(2)} className="btn-3d btn-Forest flex-1 py-4">{tr("continueX")}</button>
            </div>
          </>
        )}
        {step === 2 && (
          <>
            <div className="grid grid-cols-3 gap-3 mt-10" role="radiogroup" aria-label={tr("obGoal")}>
              {[5, 10, 15].map((m) => (
                <button key={m} role="radio" aria-checked={mins === m} onClick={() => setMins(m)}
                  className={`answer-card p-5 text-center ${mins === m ? "selected" : ""}`}>
                  <span className="kz block text-3xl font-black">{m}</span>
                  <span className="block text-sm font-bold opacity-70 mt-1">{tr("perDay")}</span>
                </button>
              ))}
            </div>
            <p className="text-sm text-ink3 font-medium mt-4">{locale === "ru" ? "Это ориентир, а не обязательство. Меняется в настройках в любой момент." : "A gentle target, not an obligation. Change it anytime in Settings."}</p>
            <div className="flex gap-3 mt-8">
              <button onClick={() => setStep(1)} className="btn-3d btn-ghost3d px-6 py-4">{tr("obBack")}</button>
              <button onClick={finish} className="btn-3d btn-Forest flex-1 py-4">{tr("obStart")}</button>
            </div>
          </>
        )}
      </main>
    </div>
  );
}
