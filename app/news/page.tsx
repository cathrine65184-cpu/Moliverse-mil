"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { fetchRealNews, RealArticle } from "@/lib/newsApi";
import JourneyNav from "@/components/JourneyNav";

const exampleTopics = ["AI", "climate", "election", "football", "economy", "space", "health"];

export default function RealNewsPage() {
  const [topic, setTopic] = useState("climate");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [sources, setSources] = useState<RealArticle[]>([]);
  const [active, setActive] = useState<RealArticle | null>(null);
  const [count, setCount] = useState(0);

  const handleSearch = useCallback(async (value?: string) => {
    const q = (value ?? topic).trim();
    if (value !== undefined) setTopic(value);
    setLoading(true);
    setError("");
    setSources([]);
    setActive(null);
    try {
      const data = await fetchRealNews(q);
      if (data.error === "feeds_unavailable") {
        setError("News services are temporarily unavailable. Please try again shortly.");
      } else if (data.sources.length === 0) {
        setError(`No recent articles found for "${q}". Try another topic.`);
      } else {
        setSources(data.sources);
        setActive(data.sources[0]);
        setCount(data.count);
      }
    } catch {
      setError("Failed to fetch news. Please try again.");
    } finally {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [topic]);

  useEffect(() => {
    handleSearch("climate");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="container-page py-10">
      <JourneyNav current={2} />

      <div className="mb-8">
        <span className="section-eyebrow">Real news · live from publishers</span>
        <h1 className="mt-1 text-3xl font-bold tracking-tight text-ink">
          Compare authentic global coverage
        </h1>
        <p className="mt-2 max-w-2xl text-ink-muted">
          Live articles from BBC, The Guardian, The New York Times, France 24,
          China Daily, Channel NewsAsia and Al Jazeera. See how real publishers
          in different countries frame the same topic.
        </p>
      </div>

      {/* Search bar */}
      <div className="flex flex-col gap-2 sm:flex-row">
        <input
          className="input flex-1"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          placeholder="Enter a topic — e.g. climate, AI, election…"
        />
        <button
          type="button"
          onClick={() => handleSearch()}
          disabled={loading}
          className="btn-primary disabled:opacity-60"
        >
          {loading ? "Searching…" : "🔍 Search real news"}
        </button>
      </div>
      <div className="mt-3 flex flex-wrap gap-1.5">
        {exampleTopics.map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => handleSearch(t)}
            className="rounded-full border border-slate-200 px-3 py-1 text-xs font-medium text-ink-muted transition hover:border-brand-200 hover:text-brand-700"
          >
            {t}
          </button>
        ))}
      </div>

      {/* Error */}
      {error && (
        <div className="mt-6 rounded-xl border border-amber-200 bg-amber-50 p-4">
          <p className="text-sm font-medium text-amber-800">{error}</p>
        </div>
      )}

      {/* Loading */}
      {loading && (
        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="card h-52 animate-pulse space-y-3 p-4">
              <div className="h-6 w-6 rounded-full bg-slate-100" />
              <div className="h-4 w-2/3 rounded bg-slate-100" />
              <div className="h-3 w-full rounded bg-slate-100" />
              <div className="h-3 w-4/5 rounded bg-slate-100" />
            </div>
          ))}
        </div>
      )}

      {/* Results */}
      {!loading && sources.length > 0 && (
        <div className="mt-8">
          <p className="mb-4 text-sm text-ink-soft">
            Showing coverage of{" "}
            <span className="font-semibold text-ink">“{topic}”</span> · {count}{" "}
            matching articles across regions
          </p>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {sources.map((a) => {
              const selected = active?.id === a.id;
              return (
                <button
                  key={a.id}
                  onClick={() => setActive(a)}
                  className={`card flex flex-col p-4 text-left transition hover:shadow-lift ${
                    selected ? "border-brand-600 ring-2 ring-brand-200" : ""
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-2xl">{a.flag}</span>
                    <span className="text-[11px] font-semibold text-ink-soft">
                      {new Date(a.publishedAt).toLocaleDateString()}
                    </span>
                  </div>
                  <h3 className="mt-2 text-sm font-bold text-ink">{a.country}</h3>
                  <p className="text-xs text-ink-soft">{a.outlet}</p>
                  <p className="mt-2 flex-1 text-sm font-medium leading-snug text-ink">
                    {a.title}
                  </p>
                  <span className="mt-3 text-xs font-semibold text-brand-700">
                    {selected ? "● Selected" : "View details →"}
                  </span>
                </button>
              );
            })}
          </div>

          {active && <ArticleDetail article={active} topic={topic} />}
        </div>
      )}

      {/* Initial empty */}
      {!loading && sources.length === 0 && !error && (
        <div className="mt-8 card flex min-h-[280px] flex-col items-center justify-center p-10 text-center">
          <span className="text-4xl">📰</span>
          <h3 className="mt-4 text-lg font-bold text-ink">Search live news</h3>
          <p className="mt-2 max-w-sm text-sm text-ink-muted">
            Enter a topic to pull real articles from publishers around the world.
          </p>
        </div>
      )}
    </div>
  );
}

function ArticleDetail({ article, topic }: { article: RealArticle; topic: string }) {
  return (
    <div className="card mt-6 space-y-4 p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <p className="text-xs font-semibold uppercase tracking-wide text-brand-600">
            {article.flag} {article.outlet} · {article.country}
          </p>
          <h2 className="mt-1 text-xl font-bold leading-snug text-ink">
            {article.title}
          </h2>
        </div>
        {article.image && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={article.image}
            alt=""
            className="h-28 w-full shrink-0 rounded-lg object-cover shadow-sm sm:w-44"
            onError={(e) => (e.currentTarget.style.display = "none")}
          />
        )}
      </div>

      {/* AI summary */}
      <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
        <p className="text-[11px] font-semibold uppercase tracking-wide text-brand-600">
          🤖 AI summary
        </p>
        <p className="mt-1 text-sm leading-relaxed text-ink-muted">
          {article.summary}
        </p>
      </div>

      {/* Source transparency — reinforces MIL */}
      <div className="grid gap-3 sm:grid-cols-2">
        <Meta label="Publisher" value={`${article.flag} ${article.outlet}`} />
        <Meta label="Country" value={article.country} />
        <Meta
          label="Published"
          value={new Date(article.publishedAt).toLocaleString()}
        />
        <Meta label="Media framing" value={article.framing || "—"} />
      </div>

      <div className="flex flex-col gap-2 border-t border-slate-100 pt-4 sm:flex-row">
        <a
          href={article.url}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-secondary flex-1 text-center text-sm"
        >
          Read original article ↗
        </a>
        <Link
          href={`/lesson?topic=${encodeURIComponent(topic)}&source=${encodeURIComponent(article.outlet)}`}
          className="btn-primary flex-1 text-center text-sm"
        >
          ✨ Generate a lesson from this →
        </Link>
      </div>

      <p className="text-center text-xs text-ink-soft">
        ℹ️ Authentic reporting from{" "}
        <span className="font-semibold">{article.outlet}</span> — always check
        the source and compare perspectives.
      </p>
    </div>
  );
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg bg-slate-50 p-3">
      <p className="text-[11px] font-semibold uppercase tracking-wide text-brand-600">
        {label}
      </p>
      <p className="mt-0.5 text-sm font-medium text-ink">{value}</p>
    </div>
  );
}
