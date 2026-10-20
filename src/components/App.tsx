"use client";
import React, { useState } from "react";
import { Home, Dumbbell, NotebookText, BookOpen, Ear, MessagesSquare, ChartNoAxesColumn, Settings, Heart, Zap, Flame, ArrowRight } from "lucide-react";
import { StoreProvider, useStore } from "@/lib/store";
import { t } from "@/lib/i18n";
import { lessonById, type Story } from "@/data/curriculum";
import Landing, { Onboarding } from "./Landing";
import LearnHome from "./LearnHome";
import LessonPlayer from "./LessonPlayer";
import { PracticeScreen, VocabScreen, GrammarScreen, SoundsScreen, StoriesScreen, StoryPlayer, ProgressScreen, SettingsScreen, buildReview } from "./Screens";
import { Logo, StatPill, Barys } from "./ui";

type View = "learn" | "practice" | "words" | "grammar" | "sounds" | "stories" | "progress" | "settings";

function Shell() {
  const { state, ready, patch, completeLesson, dueVocabIds, streak, nextLessonId } = useStore();
  const locale = state.locale;
  const tr = (k: Parameters<typeof t>[1]) => t(locale, k);
  const [screen, setScreen] = useState<"landing" | "onboarding" | "app">("landing");
  const [view, setView] = useState<View>("learn");
  const [activeLesson, setActiveLesson] = useState<string | "review" | null>(null);
  const [activeStory, setActiveStory] = useState<Story | null>(null);
  const [showSave, setShowSave] = useState(false);
  const [saveName, setSaveName] = useState("");
  const [landedOnce, setLandedOnce] = useState(false);

  if (!ready) return <div className="min-h-dvh grid place-items-center"><Barys className="w-24 h-24 animate-pulse" /></div>;

  if (screen === "landing" && !activeLesson) {
    return <Landing onStart={() => (state.onboarded ? setScreen("app") : setScreen("onboarding"))} onLogin={() => (state.onboarded ? setScreen("app") : setScreen("onboarding"))} />;
  }
  if (screen === "onboarding") {
    return <Onboarding onDone={() => { setScreen("app"); setView("learn"); }} />;
  }

  // lesson overlays (full-screen focus mode)
  if (activeLesson === "review") {
    const fallback = Object.keys(state.vocab).slice(0, 8);
    const ids = dueVocabIds.length ? dueVocabIds : fallback;
    if (ids.length === 0) { setActiveLesson(null); }
    else return (
      <LessonPlayer key={`rev-${ids.join()}`} exercises={buildReview(ids)} title={tr("reviewTitle")}
        onExit={() => setActiveLesson(null)}
        onFinish={() => (
          <button onClick={() => setActiveLesson(null)} className="btn-3d btn-sky w-full py-4 text-base">{tr("backToLearn")}</button>
        )} />
    );
  }
  if (activeLesson) {
    const lesson = lessonById[activeLesson];
    return (
      <LessonPlayer key={activeLesson} exercises={lesson.exercises} title={locale === "ru" ? lesson.titleRu : lesson.titleEn}
        onExit={() => setActiveLesson(null)}
        onFinish={(r) => {
          completeLesson(lesson.id, r.xp, r.accuracy);
          const wasFirst = Object.keys(state.completedLessons).length === 0 && !state.name;
          return (
            <div className="flex flex-col gap-3">
              {nextLessonId && nextLessonId !== lesson.id && (
                <button onClick={() => setActiveLesson(nextLessonId)} className="btn-3d btn-Forest w-full py-4 text-base">{tr("nextLesson")} <ArrowRight className="inline w-5 h-5 -mt-0.5" /></button>
              )}
              <button onClick={() => { setActiveLesson(null); if (wasFirst) setShowSave(true); }} className="btn-3d btn-sky w-full py-4 text-base">{tr("backToLearn")}</button>
            </div>
          );
        }} />
    );
  }
  if (activeStory) return <StoryPlayer story={activeStory} onExit={() => setActiveStory(null)} />;

  const NAV: { id: View; label: string; icon: React.ComponentType<{ className?: string; strokeWidth?: number }>; badge?: number }[] = [
    { id: "learn", label: tr("learn"), icon: Home },
    { id: "practice", label: tr("practice"), icon: Dumbbell, badge: dueVocabIds.length },
    { id: "words", label: tr("words"), icon: NotebookText },
    { id: "grammar", label: tr("grammar"), icon: BookOpen },
    { id: "sounds", label: tr("sounds"), icon: Ear },
    { id: "stories", label: tr("stories"), icon: MessagesSquare },
    { id: "progress", label: tr("progress"), icon: ChartNoAxesColumn },
    { id: "settings", label: tr("settings"), icon: Settings },
  ];
  const MOBILE_NAV = NAV.filter((n) => ["learn", "practice", "words", "progress"].includes(n.id));

  return (
    <div className="min-h-dvh paper-ruled lg:flex">
      {/* sidebar (desktop) */}
      <aside className="hidden lg:flex flex-col w-[248px] shrink-0 border-r-2 border-line px-4 py-6 sticky top-0 h-dvh">
        <div className="px-3"><Logo size="lg" /></div>
        <nav className="flex flex-col gap-1.5 mt-8" aria-label="App">
          {NAV.map((n) => (
            <button key={n.id} onClick={() => setView(n.id)} aria-current={view === n.id ? "page" : undefined}
              className={`flex items-center gap-3.5 rounded-2xl border-2 px-4 py-3 font-extrabold text-[15px] uppercase tracking-wide transition-all ${view === n.id ? "bg-jadesoft border-jade/60 text-Forest" : "border-transparent text-ink2 hover:bg-surface2"}`}>
              <n.icon className="w-6 h-6" strokeWidth={2.3} /> {n.label}
              {!!n.badge && <span className="ml-auto bg-saffron text-[#2b2110] text-xs font-black rounded-full px-2 py-0.5">{n.badge}</span>}
            </button>
          ))}
        </nav>
        <div className="mt-auto card !rounded-3xl p-4">
          <div className="flex items-center gap-3">
            <Barys className="w-12 h-12" />
            <div>
              <p className="font-extrabold leading-tight">{state.name || (locale === "ru" ? "Гость" : "Guest learner")}</p>
              <p className="text-xs font-bold text-ink3">{state.xp} XP · {Object.keys(state.vocab).length} {tr("wordsKnown")}</p>
            </div>
          </div>
        </div>
      </aside>

      {/* main column */}
      <div className="flex-1 min-w-0">
        {/* mobile/tablet top bar */}
        <header className="lg:hidden sticky top-0 z-40 bg-paper/92 backdrop-blur border-b-2 border-line">
          <div className="max-w-2xl mx-auto px-4 h-14 flex items-center gap-2">
            <Logo size="sm" />
            <span className="ml-auto flex items-center gap-2">
              <StatPill tone="saffron" icon={<Flame className="w-4 h-4" fill="currentColor" />} value={streak} />
              <StatPill tone="Forest" icon={<Zap className="w-4 h-4" fill="currentColor" />} value={state.xp} />
              <StatPill tone="heart" icon={<Heart className="w-4 h-4" fill="currentColor" />} value={state.hearts} />
              <button onClick={() => setView("settings")} aria-label={tr("settings")} className="p-2 text-ink2"><Settings className="w-6 h-6" /></button>
            </span>
          </div>
          {/* tablet secondary nav */}
          <nav className="hidden sm:flex lg:hidden gap-1 px-3 pb-2 overflow-x-auto no-scrollbar" aria-label="App">
            {NAV.map((n) => (
              <button key={n.id} onClick={() => setView(n.id)} className={`flex items-center gap-2 rounded-xl border-2 px-3 py-1.5 font-extrabold text-sm whitespace-nowrap ${view === n.id ? "bg-jadesoft border-jade/60 text-Forest" : "border-transparent text-ink2"}`}>
                <n.icon className="w-4.5 h-4.5" />{n.label}
              </button>
            ))}
          </nav>
        </header>

        {/* desktop stats bar */}
        <div className="hidden lg:flex justify-end gap-2 max-w-2xl mx-auto px-5 pt-5">
          <StatPill tone="saffron" icon={<Flame className="w-4 h-4" fill="currentColor" />} value={<>{streak} <span className="hidden xl:inline">{tr("streak")}</span></>} />
          <StatPill tone="Forest" icon={<Zap className="w-4 h-4" fill="currentColor" />} value={`${state.xp} XP`} />
          <StatPill tone="heart" icon={<Heart className="w-4 h-4" fill="currentColor" />} value={state.hearts} />
        </div>

        <main key={view}>
          {view === "learn" && <LearnHome onStartLesson={(id) => setActiveLesson(id)} onReview={() => setActiveLesson("review")} />}
          {view === "practice" && <PracticeScreen onReview={() => setActiveLesson("review")} goSounds={() => setView("sounds")} goStories={() => setView("stories")} />}
          {view === "words" && <VocabScreen />}
          {view === "grammar" && <GrammarScreen />}
          {view === "sounds" && <SoundsScreen />}
          {view === "stories" && <StoriesScreen onOpen={(s) => setActiveStory(s)} />}
          {view === "progress" && <ProgressScreen />}
          {view === "settings" && <SettingsScreen onBackToLanding={() => { setScreen("landing"); setLandedOnce(true); }} />}
        </main>
      </div>

      {/* mobile bottom nav */}
      <nav className="sm:hidden fixed bottom-0 inset-x-0 z-40 bg-surface border-t-2 border-line" aria-label="App" style={{ paddingBottom: "env(safe-area-inset-bottom)" }}>
        <div className="grid grid-cols-4">
          {MOBILE_NAV.map((n) => (
            <button key={n.id} onClick={() => setView(n.id)} aria-current={view === n.id ? "page" : undefined}
              className={`flex flex-col items-center gap-0.5 py-2.5 text-[11px] font-extrabold uppercase tracking-wide relative ${view === n.id ? "text-Forest" : "text-ink3"}`}>
              <span className={`grid place-items-center w-12 h-8 rounded-xl ${view === n.id ? "bg-jadesoft border-2 border-jade/50" : ""}`}>
                <n.icon className="w-6 h-6" strokeWidth={2.3} />
              </span>
              {n.label}
              {!!n.badge && <span className="absolute top-1 right-1/2 translate-x-6 bg-saffron text-[#2b2110] text-[10px] font-black rounded-full px-1.5">{n.badge}</span>}
            </button>
          ))}
        </div>
      </nav>
      {/* mobile: extra destinations shortcut row above bottom nav on learn only */}
      {view === "learn" && (
        <div className="sm:hidden fixed bottom-[76px] inset-x-0 z-30 flex justify-center gap-2 px-4">
          {NAV.filter((n) => ["grammar", "sounds", "stories"].includes(n.id)).map((n) => (
            <button key={n.id} onClick={() => setView(n.id)} className="bg-surface border-2 border-line rounded-full px-3.5 py-1.5 text-xs font-extrabold shadow flex items-center gap-1.5">
              <n.icon className="w-4 h-4" />{n.label}
            </button>
          ))}
        </div>
      )}

      {/* save-progress invitation */}
      {showSave && (
        <div className="fixed inset-0 z-50 bg-black/45 grid place-items-center p-5" role="dialog" aria-modal="true" aria-label={tr("saveCtaTitle")}>
          <div className="card max-w-md w-full p-7 text-center pop-in">
            <Barys mood="cheer" className="w-24 h-24 mx-auto" />
            <h2 className="text-2xl font-black mt-2">{tr("saveCtaTitle")}</h2>
            <p className="text-ink2 mt-2">{tr("saveCtaSub")}</p>
            <input value={saveName} onChange={(e) => setSaveName(e.target.value)} placeholder={tr("namePh")} aria-label={tr("namePh")}
              className="w-full bg-surface2 border-2 border-line rounded-xl px-4 py-3 font-bold outline-none focus:border-[var(--sky)] mt-5 text-center" />
            <button onClick={() => { patch({ name: saveName.trim() }); setShowSave(false); }} className="btn-3d btn-Forest w-full py-3.5 mt-3">{tr("saveBtn")}</button>
            <button onClick={() => setShowSave(false)} className="btn-3d btn-ghost3d w-full py-3 mt-2.5">{tr("laterBtn")}</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function App() {
  return (
    <StoreProvider>
      <Shell />
    </StoreProvider>
  );
}
