# MoliVerse 🌍

**Learn Languages Through Real-World Media** — an AI-powered educational platform that turns real news into personalized, CEFR-graded language lessons while building Media & Information Literacy (MIL).

Built for the **UNESCO Youth Hackathon 2026**.

> Real media → lessons → compare → reflect → discuss.

## Features

1. **Media Lesson Generator** — a CEFR-graded content engine turns a topic + learner profile into a full lesson: learning-path progression, can-do objectives, level-tagged vocabulary, a grammar focus, a natural roleplay dialogue, interactive exercises (match / choose / fill / word-order / produce / speak), a media-literacy reflection, and a spaced-repetition review. Supports **7 languages** (English, French, Spanish, Chinese, Japanese, Korean, Arabic).
2. **Real News** — live articles pulled from real publishers (BBC, The Guardian, NYT, France 24, China Daily, Channel NewsAsia, Al Jazeera) via server-side RSS. Compare coverage across regions, read the original, and generate a lesson from any story.
3. **Global Media Comparison** — a media-literacy engine showing how the US, France, China and Southeast Asia frame the same event, tagged by framing type with an AI analysis.
4. **Mentor Mode** — real university-mentor profiles lead discussion; AI only prepares the material.

## Content engine

The lesson content is produced by a deterministic-but-varied engine in [`lib/engine/`](lib/engine):

- **`lexicon.ts`** — CEFR-tagged (A1–B2), themed vocabulary with parts of speech and example sentences; level-aware, theme-aware selection.
- **`dialogue.ts`** — multiple dialogue scenarios with randomized phrasings, so lessons don't feel templated.
- **`exercises.ts`** — Duolingo/Memrise-style exercise generators, scaled by CEFR level.
- **`rng.ts`** — a seeded PRNG; each generation reseeds (`variant`) so repeated lessons stay fresh.
- **`index.ts`** — assembles the lesson: objectives, grammar, progression path, spaced review.

## Tech stack

- **Next.js 14** (App Router) + **React 18** + **TypeScript**
- **Tailwind CSS 3**
- **rss-parser** for real news (server route `app/api/news`)
- No paid API keys required.

## Run it

```bash
npm install
npm run dev     # → http://localhost:3000
```

## Project structure

```
app/
  page.tsx              # Home
  lesson/               # Lesson generator (content engine UI)
  news/                 # Real news (RSS)
  compare/              # Media comparison
  mentor/               # Mentor mode
  api/news/route.ts     # Server-side RSS fetcher
components/             # Navbar, Footer, Logo, ExerciseSet, MentorCard, …
lib/
  engine/               # CEFR content engine
  mockAI.ts             # Comparison + mentor-plan generators
  newsApi.ts            # Client helper for /api/news
  profiles.ts           # Mentor & learner profiles
```

Built with [Claude Code](https://claude.com/claude-code).
