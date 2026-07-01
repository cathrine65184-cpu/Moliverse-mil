"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  exampleTopics,
  exampleInterests,
  languages,
} from "@/lib/mockAI";
import { generateLesson } from "@/lib/engine";
import { Lesson, LanguageOption, Level } from "@/lib/types";
import ExerciseSet from "@/components/ExerciseSet";
import SectionCard from "@/components/SectionCard";
import JourneyNav from "@/components/JourneyNav";
import ConversationSpace from "@/components/ConversationSpace";

const LEVEL_BADGE: Record<Level, string> = {
  A1: "bg-green-100 text-green-700",
  A2: "bg-aqua-100 text-aqua-700",
  B1: "bg-brand-100 text-brand-700",
  B2: "bg-purple-100 text-purple-700",
};

const levels: Level[] = ["A1", "A2", "B1", "B2"];

export default function LessonPage() {
  return (
    <Suspense fallback={<div className="container-page py-10" />}>
      <LessonPageInner />
    </Suspense>
  );
}

function LessonPageInner() {
  const params = useSearchParams();
  // Real-news deep link: /lesson?topic=…&source=…
  const initialTopic = params.get("topic") || "AI regulation";
  const fromSource = params.get("source") || "";

  const [age, setAge] = useState(16);
  const [level, setLevel] = useState<Level>("B1");
  const [language, setLanguage] = useState<LanguageOption>(languages[1]); // French
  const [interest, setInterest] = useState("football");
  const [topic, setTopic] = useState(initialTopic);
  const [loading, setLoading] = useState(false);
  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [variant, setVariant] = useState(0);

  function handleGenerate() {
    setLoading(true);
    setLesson(null);
    const nextVariant = variant + 1;
    setVariant(nextVariant);
    // Assemble a fresh, CEFR-graded lesson. `variant` reseeds the engine so
    // repeated generations produce different words, dialogues and exercises.
    setTimeout(() => {
      setLesson(
        generateLesson({ age, level, interest, topic, language, variant: nextVariant })
      );
      setLoading(false);
    }, 550);
  }

  return (
    <div className="container-page py-10">
      <JourneyNav current={1} />

      {fromSource && (
        <div className="mb-6 flex items-center gap-3 rounded-2xl border border-brand-100 bg-brand-50 p-4">
          <span className="text-xl">🗞</span>
          <p className="text-sm text-ink">
            Building a lesson from real coverage of{" "}
            <span className="font-semibold">“{initialTopic}”</span> reported by{" "}
            <span className="font-semibold text-brand-700">{fromSource}</span>.
            Press generate to begin.
          </p>
        </div>
      )}

      <div className="mb-8">
        <span className="section-eyebrow">Step 01 · Learn from media</span>
        <h1 className="mt-1 text-3xl font-bold tracking-tight text-ink">
          Media Lesson Generator
        </h1>
        <p className="mt-2 max-w-2xl text-ink-muted">
          MoliVerse transforms real-world media into a structured learning
          experience — grounded in multiple sources, with media literacy built in.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[380px_1fr]">
        {/* Input panel */}
        <div className="card h-fit p-6 lg:sticky lg:top-24">
          <h2 className="text-lg font-bold text-ink">Learner profile</h2>
          <p className="mt-1 text-sm text-ink-soft">
            Adjust the inputs, then generate.
          </p>

          <div className="mt-5 space-y-4">
            <div>
              <span className="label">Learning language</span>
              <div className="grid grid-cols-4 gap-2">
                {languages.map((l) => (
                  <button
                    key={l.code}
                    type="button"
                    onClick={() => setLanguage(l)}
                    title={l.label}
                    className={`flex flex-col items-center gap-0.5 rounded-lg border px-1 py-2 text-[11px] font-semibold transition ${
                      language.code === l.code
                        ? "border-brand bg-brand-50 text-brand-700"
                        : "border-slate-200 text-ink-muted hover:border-brand-200"
                    }`}
                  >
                    <span className="text-lg">{l.flag}</span>
                    {l.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="label" htmlFor="age">
                Age: <span className="font-semibold text-ink">{age}</span>
              </label>
              <input
                id="age"
                type="range"
                min={8}
                max={60}
                value={age}
                onChange={(e) => setAge(Number(e.target.value))}
                className="w-full accent-brand"
              />
            </div>

            <div>
              <span className="label">Language level</span>
              <div className="grid grid-cols-4 gap-2">
                {levels.map((l) => (
                  <button
                    key={l}
                    type="button"
                    onClick={() => setLevel(l)}
                    className={`rounded-lg border px-2 py-2 text-sm font-semibold transition ${
                      level === l
                        ? "border-brand bg-brand text-white"
                        : "border-slate-200 text-ink-muted hover:border-brand-200"
                    }`}
                  >
                    {l}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="label" htmlFor="interest">
                Interest
              </label>
              <input
                id="interest"
                className="input"
                value={interest}
                onChange={(e) => setInterest(e.target.value)}
                placeholder="football, AI, music…"
              />
              <div className="mt-2 flex flex-wrap gap-1.5">
                {exampleInterests.map((i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setInterest(i)}
                    className="chip transition hover:bg-brand-100"
                  >
                    {i}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="label" htmlFor="topic">
                Topic
              </label>
              <input
                id="topic"
                className="input"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="What's in the news?"
              />
              <div className="mt-2 flex flex-wrap gap-1.5">
                {exampleTopics.map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setTopic(t)}
                    className="rounded-full border border-slate-200 px-3 py-1 text-xs font-medium text-ink-muted transition hover:border-brand-200 hover:text-brand-700"
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <button
              type="button"
              onClick={handleGenerate}
              disabled={loading}
              className="btn-primary w-full disabled:opacity-60"
            >
              {loading ? "Transforming media…" : "✨ Transform media into a lesson"}
            </button>
            <p className="text-center text-xs text-ink-soft">
              AI transforms real-world media into structured learning.
            </p>
          </div>
        </div>

        {/* Output panel */}
        <div>
          {!lesson && !loading && <EmptyState />}
          {loading && <LoadingState />}
          {lesson && <LessonOutput lesson={lesson} />}
        </div>
      </div>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="card flex min-h-[420px] flex-col items-center justify-center p-10 text-center">
      <span className="text-4xl">📰</span>
      <h3 className="mt-4 text-lg font-bold text-ink">
        Your media-based lesson will appear here
      </h3>
      <p className="mt-2 max-w-sm text-sm text-ink-muted">
        Pick a language and a topic in the news, then press{" "}
        <span className="font-semibold text-brand-700">
          Transform media into a lesson
        </span>
        .
      </p>
    </div>
  );
}

function LoadingState() {
  return (
    <div className="card flex min-h-[420px] animate-pulse flex-col gap-4 p-8">
      <div className="h-6 w-2/3 rounded bg-slate-100" />
      <div className="h-24 rounded-xl bg-slate-100" />
      <div className="grid grid-cols-2 gap-3">
        <div className="h-14 rounded-lg bg-slate-100" />
        <div className="h-14 rounded-lg bg-slate-100" />
        <div className="h-14 rounded-lg bg-slate-100" />
        <div className="h-14 rounded-lg bg-slate-100" />
      </div>
      <div className="h-20 rounded-xl bg-slate-100" />
    </div>
  );
}

function LessonOutput({ lesson }: { lesson: Lesson }) {
  const m = lesson.meta;
  const pct = Math.round((lesson.path.stepIndex / lesson.path.totalSteps) * 100);

  return (
    <div className="space-y-5">
      {/* Meta strip */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="chip">{m.language.flag} {m.language.label}</span>
        <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${LEVEL_BADGE[m.level]}`}>
          CEFR {m.level}
        </span>
        <span className="chip">🆕 {m.newWordCount} new words</span>
        <span className="chip">⏱ ~{m.estimatedMinutes} min</span>
        <span className="chip">Topic · {m.topic}</span>
      </div>

      {/* Learning path / progression */}
      <div className="card p-5">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-wide text-brand-600">
              Learning path
            </p>
            <p className="text-base font-bold text-ink">
              {lesson.path.unit} · <span className="font-medium text-ink-muted">{lesson.path.skill}</span>
            </p>
          </div>
          <span className="text-sm font-semibold text-ink-soft">
            Step {lesson.path.stepIndex} / {lesson.path.totalSteps}
          </span>
        </div>
        <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-slate-100">
          <div className="h-full rounded-full bg-brand" style={{ width: `${pct}%` }} />
        </div>
        <p className="mt-2 text-xs text-ink-soft">
          Up next: <span className="font-medium text-ink-muted">{lesson.path.nextSkill}</span>
        </p>

        {/* Roadmap */}
        <div className="mt-4 flex flex-wrap gap-1.5">
          {lesson.roadmap.map((s) => (
            <span key={s.key} className="inline-flex items-center gap-1 rounded-full bg-slate-50 px-2.5 py-1 text-xs font-medium text-ink-muted">
              {s.icon} {s.title}
            </span>
          ))}
        </div>
      </div>

      {/* Objectives — CEFR can-do */}
      <SectionCard icon="🎯" eyebrow="Learning objectives" title="By the end of this lesson">
        <ul className="space-y-2">
          {lesson.objectives.map((o, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-ink">
              <span className="mt-0.5 text-green-600">✓</span> {o}
            </li>
          ))}
        </ul>
      </SectionCard>

      {/* Source media */}
      <SectionCard icon="🗞" eyebrow="Source media" title="Grounded in real reporting">
        <p className="text-sm text-ink-muted">
          This lesson was built from how three outlets reported the same event:
        </p>
        <div className="mt-3 grid gap-3 sm:grid-cols-3">
          {lesson.sourceMedia.map((s) => (
            <div key={s.outlet} className="rounded-xl border border-slate-100 p-3">
              <p className="flex items-center gap-1.5 text-sm font-bold text-ink">
                <span>{s.flag}</span> {s.outlet}
              </p>
              <p className="mt-1 text-xs leading-snug text-ink-muted">{s.headline}</p>
              <span className="mt-2 inline-block rounded-full bg-brand-50 px-2 py-0.5 text-[11px] font-medium text-brand-700">
                {s.emphasis}
              </span>
            </div>
          ))}
        </div>
      </SectionCard>

      <SectionCard icon="📰" eyebrow="Media hook" title="One event, many stories">
        <p className="text-xs font-semibold uppercase tracking-wide text-ink-soft">
          {lesson.mediaHook.source}
        </p>
        <p className="mt-1 text-lg font-bold text-ink">{lesson.mediaHook.headline}</p>
        <p className="mt-2 text-sm leading-relaxed text-ink-muted">{lesson.mediaHook.summary}</p>
      </SectionCard>

      {/* Vocabulary — CEFR-tagged */}
      <SectionCard
        icon="📚"
        eyebrow="Vocabulary"
        title={`${lesson.vocabulary.length} words · graded A1–B2`}
      >
        <div className="grid gap-3 sm:grid-cols-2">
          {lesson.vocabulary.map((v) => (
            <div key={v.word} className="rounded-xl border border-slate-100 p-3">
              <div className="flex items-center justify-between gap-2">
                <p className="font-semibold text-brand-700">{v.word}</p>
                <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${LEVEL_BADGE[v.level]}`}>
                  {v.level}
                </span>
              </div>
              <p className="text-[11px] uppercase tracking-wide text-ink-soft">
                {v.pos}
                {v.ipa ? ` · ${v.ipa}` : ""}
              </p>
              <p className="mt-1 text-sm text-ink">{v.gloss}</p>
              <p className="mt-1 text-xs italic text-ink-soft">“{v.examples[0]}”</p>
            </div>
          ))}
        </div>
      </SectionCard>

      {/* Grammar */}
      <SectionCard icon="🧩" eyebrow="Grammar focus" title={lesson.grammar.point}>
        <p className="text-sm text-ink-muted">{lesson.grammar.explanation}</p>
        <ul className="mt-2 space-y-1">
          {lesson.grammar.examples.map((ex, i) => (
            <li key={i} className="rounded-lg bg-slate-50 px-3 py-1.5 text-sm text-ink">
              {ex}
            </li>
          ))}
        </ul>
      </SectionCard>

      {/* Dialogue */}
      <SectionCard icon="💬" eyebrow={`Dialogue · ${lesson.dialogue.register}`} title={lesson.dialogue.scenario}>
        <p className="mb-3 text-xs italic text-ink-soft">{lesson.dialogue.setting}</p>
        <div className="space-y-3">
          {lesson.dialogue.lines.map((d, i) => (
            <div key={i} className="flex gap-3">
              <span className="w-14 shrink-0">
                <span className="text-sm font-bold text-brand-700">{d.speaker}</span>
                <span className="block text-[10px] text-ink-soft">{d.role}</span>
              </span>
              <div>
                <p className="text-sm text-ink">{d.line}</p>
                {d.gloss && <p className="text-xs text-ink-soft">{d.gloss}</p>}
              </div>
            </div>
          ))}
        </div>
      </SectionCard>

      {/* Practice */}
      <SectionCard icon="✅" eyebrow="Practice" title="Active recall & production">
        <ExerciseSet exercises={lesson.exercises} />
      </SectionCard>

      <SectionCard icon="🌍" eyebrow="Cultural insight" title="Why context matters">
        <p className="text-sm leading-relaxed text-ink-muted">{lesson.culturalInsight}</p>
      </SectionCard>

      {/* Reflection — MIL */}
      <SectionCard
        icon="🧠"
        eyebrow="Reflection · media & information literacy"
        title="Think critically before you move on"
        accent
      >
        <ol className="space-y-3">
          {lesson.reflectionQuestions.map((q, i) => (
            <li key={i} className="flex gap-3 rounded-xl border border-brand-100 bg-white p-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand text-xs font-bold text-white">
                {i + 1}
              </span>
              <span className="text-sm font-medium text-ink">{q}</span>
            </li>
          ))}
        </ol>
        <Link
          href={`/compare?topic=${encodeURIComponent(m.topic)}`}
          className="btn-primary mt-4 px-4 py-2 text-sm"
        >
          Step 02 · Compare how the world reports this →
        </Link>
      </SectionCard>

      {/* Spaced-repetition review */}
      <SectionCard icon="🔁" eyebrow="Review" title="Revisit earlier words">
        <p className="text-sm text-ink-muted">{lesson.review.note}</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {lesson.review.words.map((w) => (
            <span key={w} className="rounded-lg border border-slate-200 px-3 py-1.5 text-sm font-medium text-ink">
              {w}
            </span>
          ))}
        </div>
      </SectionCard>

      {/* Conversation space */}
      <ConversationSpace />
    </div>
  );
}
