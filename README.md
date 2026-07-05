# MoliVerse 🌍

**Perspective Literacy for Real News** — a static, editorial-style site that shows how different outlets frame the same global event, so readers can see bias, provenance, and missing context before they form an opinion.

Built for the **UNESCO Youth Hackathon 2026**.

> Search an event → compare how outlets headline it → see *why* the framing differs → check provenance → predict before you reveal → reflect.

## Features

1. **Event dossiers** — each event is a curated, editorial "dossier" page comparing how 4 outlets across different countries and orientations (public broadcaster, state-owned, private/commercial, pan-Arab, etc.) headline the same story, with contested-word highlighting and a framing explainer for each.
2. **Search gallery** — client-side search/filter across events by title, alias, and category on the landing page.
3. **Provenance** — every source headline links to its original URL and an archived copy (`archiveUrl`), with a publish date, so claims are traceable and checkable rather than taken on faith.
4. **Predict-before-reveal** — a headline-guessing challenge (`HeadlineGuess` / `PerspectiveChallenge`) that asks the reader to predict an outlet's framing before revealing it, turning bias-spotting into an active exercise instead of passive reading.
5. **Background facts & timeline** — a sourced, outlet-independent timeline and background-fact list per event, plus a "missing perspectives" note naming viewpoints the dossier doesn't cover.
6. **Reflection prompts** — end-of-dossier questions that persist answers to `localStorage`.

## Content model

All content is curated, typed TypeScript data — no backend, no LLM calls, no network requests at runtime. See [`lib/types.ts`](lib/types.ts) for the full shape (`Event`, `Source`, `ContestedTerm`, `BackgroundFact`, `TimelineEntry`).

- **`lib/events/`** — one file per event (currently `israel-gaza.ts`, `russia-ukraine-2022.ts`, `tiktok-ban.ts`), aggregated via `index.ts`. Each event ships exactly 4 sources; every `contestedWords` entry is validated (`validate.ts`) to be an exact substring of its source headline.
- **`lib/search.ts`** — client-side search/filter logic for the event gallery.
- **`lib/challenge.ts`** — scoring/logic for the predict-before-reveal headline-guessing challenge.

## Tech stack

- **Next.js 14** (App Router) + **React 18** + **TypeScript**
- **Tailwind CSS 3** — Editorial Newsprint visual identity (paper `#f5f1e8`, ink `#1a1a1a`, red accent `#c0392b`, verified-green `#1a7a4a`); serif for headings/body, Inter for small labels/chips
- **Vitest** + **Testing Library** for unit tests
- No paid API keys, no external network calls at runtime

## Run it

```bash
npm install
npm run dev     # → http://localhost:3000
npm test        # run the vitest suite
```

## Project structure

```
app/
  page.tsx              # Home / search gallery
  event/[slug]/page.tsx # Event dossier page
  layout.tsx, globals.css, icon.svg
components/
  SearchGallery.tsx      # Landing-page search/filter
  SourceHeadline.tsx      # Per-outlet headline card
  ContestedWordStrip.tsx  # Highlights contested terms across sources
  FramingExplainer.tsx    # Explains why framing differs
  HeadlineGuess.tsx,
  PerspectiveChallenge.tsx # Predict-before-reveal challenge
  BackgroundFacts.tsx, FactTimeline.tsx
  SourcesAndMethod.tsx    # Provenance: source links, archive links, methodology
  ReflectionPrompts.tsx   # Persists reflection answers to localStorage
  Masthead.tsx, Footer.tsx, Logo.tsx, Highlight.tsx
lib/
  types.ts               # Event / Source / ContestedTerm / TimelineEntry types
  events/                 # Curated per-event dossier data + validate.ts
  search.ts               # Event search/filter
  challenge.ts             # Headline-guessing challenge logic
```

Built with [Claude Code](https://claude.com/claude-code).
