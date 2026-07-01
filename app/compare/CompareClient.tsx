"use client";

import { useState } from "react";
import Link from "next/link";
import { generateComparison, exampleTopics, framingTagStyles } from "@/lib/mockAI";
import { ComparisonResult, MediaPerspective } from "@/lib/types";
import JourneyNav from "@/components/JourneyNav";

const toneStyles: Record<MediaPerspective["tone"], string> = {
  Neutral: "bg-slate-100 text-slate-700",
  Optimistic: "bg-green-100 text-green-700",
  Critical: "bg-red-100 text-red-700",
  Emotional: "bg-orange-100 text-orange-700",
  Cautious: "bg-amber-100 text-amber-700",
};

export default function CompareClient({ initialTopic }: { initialTopic: string }) {
  const [topic, setTopic] = useState(initialTopic);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ComparisonResult | null>(
    initialTopic ? generateComparison(initialTopic) : null
  );

  function handleCompare(value?: string) {
    const t = value ?? topic;
    if (value) setTopic(value);
    setLoading(true);
    setResult(null);
    setTimeout(() => {
      setResult(generateComparison(t));
      setLoading(false);
    }, 650);
  }

  return (
    <div className="container-page py-10">
      <JourneyNav current={2} />

      <div className="mb-8">
        <span className="section-eyebrow">Step 02 · Compare narratives</span>
        <h1 className="mt-1 text-3xl font-bold tracking-tight text-ink">
          Media Literacy Engine
        </h1>
        <p className="mt-2 max-w-2xl text-ink-muted">
          Enter a topic and see how four regions report the same event. Each card
          is tagged so you can see <em>how</em> the stories differ — not just what
          they say.
        </p>
      </div>

      {/* Search bar */}
      <div className="card flex flex-col gap-3 p-4 sm:flex-row sm:items-center">
        <input
          className="input flex-1"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleCompare()}
          placeholder="Enter a topic — e.g. AI regulation, World Cup final…"
        />
        <button
          type="button"
          onClick={() => handleCompare()}
          disabled={loading}
          className="btn-primary disabled:opacity-60"
        >
          {loading ? "Comparing…" : "🌍 Compare coverage"}
        </button>
      </div>
      <div className="mt-3 flex flex-wrap gap-1.5">
        {exampleTopics.map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => handleCompare(t)}
            className="rounded-full border border-slate-200 px-3 py-1 text-xs font-medium text-ink-muted transition hover:border-brand-200 hover:text-brand-700"
          >
            {t}
          </button>
        ))}
      </div>

      {/* Results */}
      <div className="mt-8">
        {!result && !loading && (
          <div className="card flex min-h-[300px] flex-col items-center justify-center p-10 text-center">
            <span className="text-4xl">🌍</span>
            <h3 className="mt-4 text-lg font-bold text-ink">
              Compare coverage across regions
            </h3>
            <p className="mt-2 max-w-sm text-sm text-ink-muted">
              Enter a topic above to see US, French, Chinese, and Southeast Asian
              perspectives side by side.
            </p>
          </div>
        )}

        {loading && (
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className="card h-56 animate-pulse p-5">
                <div className="h-5 w-1/2 rounded bg-slate-100" />
                <div className="mt-3 h-16 rounded bg-slate-100" />
                <div className="mt-3 h-10 rounded bg-slate-100" />
              </div>
            ))}
          </div>
        )}

        {result && (
          <>
            <p className="mb-4 text-sm text-ink-soft">
              Showing coverage of{" "}
              <span className="font-semibold text-ink">“{result.topic}”</span>
            </p>
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {result.perspectives.map((p) => (
                <article
                  key={p.region}
                  className="card flex flex-col p-5 transition hover:shadow-lift"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-2xl">{p.flag}</span>
                    <span
                      className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${
                        toneStyles[p.tone]
                      }`}
                    >
                      {p.tone}
                    </span>
                  </div>
                  <h3 className="mt-3 text-sm font-bold text-ink">{p.region}</h3>
                  <p className="text-xs text-ink-soft">{p.outlet}</p>
                  <p className="mt-3 text-sm font-semibold leading-snug text-ink">
                    {p.headline}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                    {p.summary}
                  </p>
                  <div className="mt-3 flex flex-1 flex-wrap content-start gap-1.5">
                    {p.tags.map((tag) => (
                      <span
                        key={tag}
                        className={`rounded-full px-2 py-0.5 text-[11px] font-medium ${framingTagStyles[tag]}`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="mt-3 rounded-lg bg-slate-50 p-3">
                    <p className="text-[11px] font-semibold uppercase tracking-wide text-brand-600">
                      Key framing
                    </p>
                    <p className="mt-1 text-xs text-ink-muted">{p.framing}</p>
                  </div>
                </article>
              ))}
            </div>

            {/* AI analysis — synthesizes the framing differences */}
            <div className="mt-6 card p-6">
              <div className="flex items-center gap-2.5">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-50 text-lg">
                  🤖
                </span>
                <div>
                  <p className="section-eyebrow">AI analysis</p>
                  <h3 className="text-base font-bold text-ink">
                    Same facts, different priorities
                  </h3>
                </div>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-ink-muted">
                {result.aiAnalysis}
              </p>
            </div>

            {/* MIL reflection */}
            <div className="mt-8 rounded-2xl border border-brand-100 bg-brand-50 p-6 sm:p-8">
              <div className="flex items-center gap-2.5">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-white text-lg shadow-sm">
                  🧠
                </span>
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-brand-700">
                    Media & information literacy
                  </p>
                  <h3 className="text-lg font-bold text-ink">
                    Reflection
                  </h3>
                </div>
              </div>
              <div className="mt-5 grid gap-4 md:grid-cols-3">
                <Reflection
                  q="What differences do you notice?"
                  a={result.reflection.differences}
                />
                <Reflection
                  q="Which is more emotional?"
                  a={result.reflection.emotional}
                />
                <Reflection
                  q="What information is missing?"
                  a={result.reflection.missing}
                />
              </div>
              <div className="mt-6">
                <Link href="/mentor" className="btn-primary px-4 py-2 text-sm">
                  Step 03 · Discuss this with a mentor →
                </Link>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function Reflection({ q, a }: { q: string; a: string }) {
  return (
    <div className="rounded-xl border border-brand-100 bg-white p-4">
      <p className="font-semibold text-ink">{q}</p>
      <p className="mt-2 text-sm leading-relaxed text-ink-muted">{a}</p>
    </div>
  );
}
