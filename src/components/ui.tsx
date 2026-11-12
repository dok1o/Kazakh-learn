"use client";
import React, { useEffect, useRef, useState } from "react";
import { Volume2, Star, BookOpen, Headphones, MessageCircle, Trophy, Hand, Heart, Check, User, Map, Building, Compass, ShoppingBag, Waves, CircleHelp, Sparkles } from "lucide-react";
import { speak, speechAvailable } from "@/lib/core";
import { useStore } from "@/lib/store";
import { t } from "@/lib/i18n";
import type { Vocab } from "@/data/curriculum";

/* ---------- TIL wordmark ---------- */
export function Logo({ size = "md", dark = false }: { size?: "sm" | "md" | "lg"; dark?: boolean }) {
  const cls = size === "lg" ? "text-4xl" : size === "sm" ? "text-xl" : "text-2xl";
  return (
    <span className={`kz inline-flex items-baseline gap-1.5 font-black tracking-tight ${cls}`} aria-label="TIL — Learn Kazakh">
      <span className={dark ? "text-white" : "text-Forest"}>til</span>
      <span className="text-saffron -ml-1">.</span>
    </span>
  );
}

/* ---------- Barys — original snow-leopard companion (geometric field-guide style) ---------- */
export function Barys({ mood = "happy", className = "w-28 h-28" }: { mood?: "happy" | "cheer" | "think" | "sleep"; className?: string }) {
  return (
    <svg viewBox="0 0 140 140" className={className} role="img" aria-label="Barys, the snow-leopard learning companion">
      {/* tail */}
      <path d="M118 108 C 136 100, 136 72, 122 62" fill="none" stroke="#C8CDBF" strokeWidth="11" strokeLinecap="round" />
      <circle cx="122" cy="62" r="4" fill="#8b9784" /><circle cx="130" cy="82" r="3.5" fill="#8b9784" />
      {/* ears */}
      <circle cx="34" cy="34" r="15" fill="#D8DCC9" /><circle cx="34" cy="34" r="8" fill="#F2D9C6" />
      <circle cx="102" cy="30" r="15" fill="#D8DCC9" /><circle cx="102" cy="30" r="8" fill="#F2D9C6" />
      {/* head/body */}
      <ellipse cx="68" cy="78" rx="52" ry="48" fill="#E4E7D6" />
      <ellipse cx="68" cy="96" rx="30" ry="24" fill="#F5F6EC" />
      {/* rosettes */}
      {[[38,58],[96,52],[28,86],[106,84],[52,42],[84,110],[44,112]].map(([x,y],i)=>(
        <g key={i} fill="#93A184" opacity=".85"><circle cx={x} cy={y} r="4.6"/><circle cx={x+7} cy={y+5} r="3"/><circle cx={x-6} cy={y+6} r="2.6"/></g>
      ))}
      {/* muzzle */}
      <ellipse cx="68" cy="90" rx="17" ry="12" fill="#fff" />
      <path d="M61 82 Q68 77 75 82 Q74 89 68 89 Q62 89 61 82Z" fill="#C96F4A" />
      {mood === "cheer" ? (
        <path d="M58 96 Q68 108 78 96" fill="none" stroke="#41524b" strokeWidth="3.4" strokeLinecap="round" />
      ) : mood === "think" ? (
        <path d="M62 100 Q68 97 74 100" fill="none" stroke="#41524b" strokeWidth="3.4" strokeLinecap="round" />
      ) : (
        <path d="M68 90 L68 97 M68 97 Q62 103 57 99 M68 97 Q74 103 79 99" fill="none" stroke="#41524b" strokeWidth="3" strokeLinecap="round" />
      )}
      {/* whisker dots */}
      <circle cx="54" cy="92" r="1.6" fill="#9db09a"/><circle cx="82" cy="92" r="1.6" fill="#9db09a"/>
      {/* eyes */}
      {mood === "sleep" ? (
        <><path d="M40 66 Q48 71 56 66" stroke="#2e3d36" strokeWidth="3.4" fill="none" strokeLinecap="round"/>
        <path d="M80 66 Q88 71 96 66" stroke="#2e3d36" strokeWidth="3.4" fill="none" strokeLinecap="round"/></>
      ) : (
        <><ellipse cx="48" cy="64" rx="7" ry="8.5" fill="#22302a"/><circle cx="50.5" cy="60.5" r="2.6" fill="#fff"/>
        <ellipse cx="89" cy="64" rx="7" ry="8.5" fill="#22302a"/><circle cx="91.5" cy="60.5" r="2.6" fill="#fff"/></>
      )}
      {/* brows for cheer */}
      {mood === "cheer" && <><path d="M40 50 Q48 45 57 50" stroke="#2e3d36" strokeWidth="3" fill="none" strokeLinecap="round"/><path d="M80 50 Q89 45 97 50" stroke="#2e3d36" strokeWidth="3" fill="none" strokeLinecap="round"/></>}
      {/* saffron scarf — TIL accent */}
      <path d="M30 116 Q68 132 106 116 L103 104 Q68 118 33 104Z" fill="#E9B44C" />
      <rect x="88" y="112" width="12" height="18" rx="4" fill="#E9B44C" />
    </svg>
  );
}

/* ---------- subtle қошқармүйіз-inspired divider ---------- */
export function OrnamentDivider({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 320 18" className={`w-full h-[18px] text-Forest/25 ${className}`} aria-hidden="true" preserveAspectRatio="none">
      <pattern id="orn" width="40" height="18" patternUnits="userSpaceOnUse">
        <path d="M4 14 Q10 4 16 12 Q20 17 20 10 Q20 17 24 12 Q30 4 36 14" fill="none" stroke="currentColor" strokeWidth="2" />
      </pattern>
      <rect width="320" height="18" fill="url(#orn)" />
    </svg>
  );
}

/* ---------- Audio button (real speech, honest fallback) ---------- */
export function AudioButton({ text, size = "md", variant = "sky", label }: {
  text: string; size?: "sm" | "md" | "lg"; variant?: "sky" | "Forest" | "plain"; label?: string;
}) {
  const { state } = useStore();
  const [playing, setPlaying] = useState(false);
  const [unavailable, setUnavailable] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);
  const play = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (!speechAvailable()) { setUnavailable(true); return; }
    const ok = speak(text);
    if (!ok) { setUnavailable(true); return; }
    setPlaying(true);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setPlaying(false), Math.min(2600, 500 + text.length * 90));
  };
  const dims = size === "lg" ? "w-24 h-24 rounded-[26px]" : size === "sm" ? "w-10 h-10 rounded-xl" : "w-14 h-14 rounded-2xl";
  const skin = variant === "plain"
    ? "bg-jadesoft text-Forest border-2 border-line"
    : `btn-3d ${variant === "Forest" ? "btn-Forest" : "btn-sky"} !rounded-[inherit]`;
  return (
    <span className="inline-flex flex-col items-center gap-1">
      <button type="button" onClick={play} aria-label={label ?? `Listen: ${text}`}
        className={`${dims} ${skin} grid place-items-center shrink-0`}>
        {playing ? (
          <span className="flex items-end gap-[3px] h-6" aria-hidden="true">
            {[0, 1, 2, 3].map((i) => (
              <span key={i} className="w-[4px] rounded bg-current" style={{ height: "100%", transformOrigin: "bottom", animation: `waveBar .7s ease-in-out ${i * 0.12}s infinite` }} />
            ))}
          </span>
        ) : (
          <Volume2 className={size === "lg" ? "w-11 h-11" : size === "sm" ? "w-5 h-5" : "w-7 h-7"} strokeWidth={2.4} />
        )}
      </button>
      {unavailable && <span className="text-[11px] text-wrong max-w-44 text-center">{t(state.locale, "audioUnavailable")}</span>}
    </span>
  );
}

/* ---------- Kazakh word with audio + optional transliteration ---------- */
export function KzWord({ vocab, size = "lg", center = true }: { vocab: Vocab; size?: "md" | "lg" | "xl"; center?: boolean }) {
  const { state } = useStore();
  const textCls = size === "xl" ? "text-5xl sm:text-6xl" : size === "lg" ? "text-4xl sm:text-5xl" : "text-3xl";
  return (
    <div className={`flex flex-col ${center ? "items-center text-center" : "items-start"} gap-2`}>
      <div className="flex items-center gap-3 flex-wrap justify-center">
        <AudioButton text={vocab.kz} size="sm" />
        <span className={`kz font-black tracking-tight ${textCls}`}>{vocab.kz}</span>
      </div>
      {state.showTranslit && <span className="text-sm text-ink3 font-semibold tracking-wide">[{vocab.tr}]</span>}
    </div>
  );
}

/* ---------- lesson node icon ---------- */
const ICONS: Record<string, React.ComponentType<{ className?: string; strokeWidth?: number }>> = {
  hand: Hand, heart: Heart, check: Check, trophy: Trophy, user: User, map: Map,
  message: MessageCircle, building: Building, compass: Compass, shopping: ShoppingBag,
  star: Star, book: BookOpen, headphones: Headphones, waves: Waves, help: CircleHelp, sparkles: Sparkles,
};
export function LessonIcon({ name, className = "w-7 h-7" }: { name: string; className?: string }) {
  const C = ICONS[name] ?? Star;
  return <C className={className} strokeWidth={2.2} />;
}

/* ---------- stat pill (XP / streak / hearts like reference apps, TIL skin) ---------- */
export function StatPill({ icon, value, tone }: { icon: React.ReactNode; value: React.ReactNode; tone: "saffron" | "heart" | "Forest" }) {
  const tones = {
    saffron: "bg-saffronsoft text-[#8a6420] dark:text-saffron border-saffron/50",
    heart: "bg-wrongbg text-heart border-heart/30",
    Forest: "bg-jadesoft text-Forest border-jade/40",
  };
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border-2 px-3 py-1 text-sm font-extrabold ${tones[tone]}`}>
      {icon}{value}
    </span>
  );
}
