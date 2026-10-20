# TIL — Learn Kazakh

**Learn the language. Live the culture.**

TIL is a working Kazakh-language learning platform for international learners: editorial
"modern field guide" art direction, a Duolingo-grade tactile lesson engine, a real
spaced-repetition notebook, and an honest guest-first experience. Interface in English
and Russian; Kazakh taught in Cyrillic with an optional Latin pronunciation aid.

**Live on GitHub Pages:** https://dok1o.github.io/Kazakh-learn/

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
npm test         # unit tests: answer validation + SRS scheduler
npm run build    # static export -> out/
npm run preview  # serve the static export locally
```

## Deploy (GitHub Pages)

Deployment is automatic: `.github/workflows/deploy-pages.yml` builds the static
export and publishes it on every push to `main` (or run it manually from the
**Actions** tab → *Deploy to GitHub Pages* → *Run workflow*).

- `next.config.ts` uses `output: "export"` and reads a `BASE_PATH` env var;
  the workflow sets it to `/<repo-name>` so asset URLs work under the
  project-pages sub-path. Locally it stays empty.
- In the repo's **Settings → Pages**, the source must be **GitHub Actions**
  (the workflow's `configure-pages` step enables this automatically).
- `out/.nojekyll` keeps the `_next/` asset folder servable.

No environment variables are required for the current (local-first) build.
Progress is stored in the browser (`localStorage`, key `til-state-v1`) for guest learners.
See `.env.example` and `supabase/schema.sql` for the planned cloud phase.

## What's inside

| Area | Implementation |
| --- | --- |
| Landing | Editorial hero with a live interactive word card, "living language" phrase explorer, methodology, cultural section, full mini-lesson preview (same engine) |
| Onboarding | Motivation → starting level → daily pace; first value before any account friction |
| Learning home | Continue module, daily-goal progress, winding "field trail" of lesson stamps per chapter, review-due banner |
| Curriculum | 3 chapters · 12 playable lessons · ~100 exercises · 60+ words with examples (EN/RU). Chapters 4–6 labelled *coming soon* |
| Lesson engine | teach cards, multiple choice (both directions), listening, word-tile sentence building, typing with Kazakh-letter helper, fill-in-the-blank, matching pairs, dialogue replies, listen-and-repeat. Keyboard: 1–4 + Enter |
| Feedback | Full-width correct/incorrect banners with the correct answer + a teaching explanation; never colour-only |
| Vocabulary | Searchable notebook, mastery pips, word detail with example audio, save/bookmark |
| Review (SRS) | Deterministic Leitner-style scheduler (boxes 0–5: 10m → 60d). Correct advances, wrong resets. Review sessions mix recognition, listening and recall |
| Grammar | Interactive vowel-harmony bench + pattern-first topics (pronouns/politeness, yes/no particles, first look at cases) with inline practice |
| Pronunciation lab | The 9 special letters (Ә Ғ Қ Ң Ө Ұ Ү Һ І) with articulation hints + listening-contrast quiz (Қ/К, Ө/О, Ү/Ұ, Ң/Н) |
| Stories | 3 interactive dialogues with in-story replies and comprehension checks |
| Progress | XP, gentle streak, weekly activity, achievements tied to real milestones. Hearts are informational and never block learning |
| Audio | Real speech via Web Speech API (kk-KZ voice preferred, Cyrillic voice fallback, honest unavailable state). No silent buttons, no fake pronunciation scores |

## Architecture

```
src/
  app/            Next.js App Router shell (layout, page, design tokens in globals.css)
  data/
    curriculum.ts Typed content engine — vocab, chapters, 12 lessons, letters, stories, grammar
  lib/
    core.ts       Audio, answer validation (Unicode-safe, Қ≠К), SRS scheduler, streaks (+ tests)
    i18n.ts       EN/RU interface dictionary (all UI strings externalised)
    store.tsx     App state + guest persistence (context; server-ready shape)
  components/
    App.tsx           Shell: sidebar / top stats / bottom nav, view routing
    Landing.tsx       Landing page + onboarding
    LearnHome.tsx     Course journey
    LessonPlayer.tsx  The exercise engine + completion experience
    Screens.tsx       Practice, Vocabulary, Grammar, Sounds, Stories, Progress, Settings
    ui.tsx            Logo, Barys (original snow-leopard companion), audio controls, shared bits
supabase/schema.sql   Production Postgres schema (RLS) for the cloud phase
```

Design tokens live in `src/app/globals.css` (Paper / Ink / Forest / Jade / Saffron /
Clay + semantic correct/wrong + a dedicated deep-forest dark theme). Type: Manrope +
Golos Text (full Kazakh Cyrillic coverage).

## Content status

Course content is marked **draft — pending review by a qualified Kazakh speaker/teacher**
before production publication. Transliteration is a pronunciation *aid*, not presented
as an official standard.

## Roadmap (next most valuable)

1. Professional native-speaker audio recordings behind the existing audio interface.
2. Supabase Auth + sync (schema included) with guest-progress migration.
3. FSRS upgrade for the scheduler; lesson analytics for content difficulty.
4. Chapters 4–8, placement assessment, speaking practice with a real ASR provider.
