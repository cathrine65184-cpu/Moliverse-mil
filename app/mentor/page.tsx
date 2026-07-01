"use client";

import { useState } from "react";
import { generateLessonPlan, exampleTopics } from "@/lib/mockAI";
import { LessonPlan, Level, PlanActivity } from "@/lib/types";
import JourneyNav from "@/components/JourneyNav";
import MentorCard from "@/components/MentorCard";
import { mentors } from "@/lib/profiles";

const levels: Level[] = ["A1", "A2", "B1", "B2"];

export default function MentorPage() {
  const [topic, setTopic] = useState("AI regulation");
  const [level, setLevel] = useState<Level>("B1");
  const [duration, setDuration] = useState(40);
  const [loading, setLoading] = useState(false);
  const [plan, setPlan] = useState<LessonPlan | null>(null);
  const [teaching, setTeaching] = useState(false);

  function handleGenerate() {
    setLoading(true);
    setPlan(null);
    setTeaching(false);
    setTimeout(() => {
      setPlan(generateLessonPlan({ topic, level, durationMin: duration }));
      setLoading(false);
    }, 650);
  }

  return (
    <div className="container-page py-10">
      <JourneyNav current={3} />

      <div className="mb-6">
        <span className="section-eyebrow">Step 03 · Discuss with a mentor</span>
        <h1 className="mt-1 text-3xl font-bold tracking-tight text-ink">
          Mentor Mode
        </h1>
        <p className="mt-2 max-w-2xl text-ink-muted">
          Language learning happens between real people. AI prepares the
          material; university mentors lead the discussion and critical thinking.
        </p>
      </div>

      {/* Human-centered philosophy */}
      <div className="mb-8 flex flex-col gap-3 rounded-2xl border border-brand-100 bg-brand-50 p-5 sm:flex-row sm:items-center">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-xl shadow-sm">
          🤝
        </span>
        <p className="text-sm font-medium text-ink">
          <span className="font-bold text-brand-700">AI prepares the lesson.</span>{" "}
          Mentors guide discussion, reflection, and critical thinking — so
          learners build real understanding, not just complete exercises.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[360px_1fr]">
        {/* Generator */}
        <div className="card h-fit p-6 lg:sticky lg:top-24">
          <h2 className="text-lg font-bold text-ink">AI lesson planner</h2>
          <p className="mt-1 text-sm text-ink-soft">
            A structured template for mentors.
          </p>

          <div className="mt-5 space-y-4">
            <div>
              <label className="label" htmlFor="mtopic">
                Lesson topic
              </label>
              <input
                id="mtopic"
                className="input"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
              />
              <div className="mt-2 flex flex-wrap gap-1.5">
                {exampleTopics.slice(0, 4).map((t) => (
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

            <div>
              <span className="label">Learner level</span>
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
              <label className="label" htmlFor="dur">
                Session length:{" "}
                <span className="font-semibold text-ink">{duration} min</span>
              </label>
              <input
                id="dur"
                type="range"
                min={20}
                max={60}
                step={5}
                value={duration}
                onChange={(e) => setDuration(Number(e.target.value))}
                className="w-full accent-brand"
              />
            </div>

            <button
              type="button"
              onClick={handleGenerate}
              disabled={loading}
              className="btn-primary w-full disabled:opacity-60"
            >
              {loading ? "Preparing template…" : "✨ Prepare lesson template"}
            </button>
            <p className="text-center text-xs text-ink-soft">
              AI assists — the mentor leads.
            </p>
          </div>

          {/* Learner-side mock */}
          <div className="mt-6 rounded-xl border border-dashed border-slate-200 p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-ink-soft">
              Learner view (mock)
            </p>
            <p className="mt-1 text-sm text-ink-muted">
              3 learners are waiting to join this session.
            </p>
            <div className="mt-3 flex -space-x-2">
              {["A", "K", "S"].map((n) => (
                <span
                  key={n}
                  className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-brand-100 text-xs font-bold text-brand-700"
                >
                  {n}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Plan output */}
        <div>
          {!plan && !loading && (
            <div className="card flex min-h-[420px] flex-col items-center justify-center p-10 text-center">
              <span className="text-4xl">🎓</span>
              <h3 className="mt-4 text-lg font-bold text-ink">
                Your lesson template will appear here
              </h3>
              <p className="mt-2 max-w-sm text-sm text-ink-muted">
                Choose a topic and level to get a structured,
                media-literacy-focused template — with a human-led discussion
                stage.
              </p>
            </div>
          )}

          {loading && (
            <div className="card min-h-[420px] animate-pulse space-y-4 p-8">
              <div className="h-6 w-1/2 rounded bg-slate-100" />
              <div className="h-20 rounded-xl bg-slate-100" />
              <div className="h-32 rounded-xl bg-slate-100" />
              <div className="h-20 rounded-xl bg-slate-100" />
            </div>
          )}

          {plan && (
            <PlanOutput
              plan={plan}
              teaching={teaching}
              onTeach={() => setTeaching(true)}
            />
          )}
        </div>
      </div>

      {/* Meet your mentor — human connection */}
      <section className="mt-14">
        <div className="mb-6 text-center">
          <span className="section-eyebrow">Meet your mentor</span>
          <h2 className="mt-2 text-2xl font-bold tracking-tight text-ink">
            Learn with a real university student
          </h2>
          <p className="mt-2 text-ink-muted">
            Not an anonymous AI — a person who shares your interests and guides
            your thinking.
          </p>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {mentors.map((m) => (
            <MentorCard key={m.id} mentor={m} />
          ))}
        </div>
      </section>
    </div>
  );
}

function PlanOutput({
  plan,
  teaching,
  onTeach,
}: {
  plan: LessonPlan;
  teaching: boolean;
  onTeach: () => void;
}) {
  return (
    <div className="space-y-5">
      {teaching && (
        <div className="rounded-2xl border border-green-200 bg-green-50 p-4">
          <p className="flex items-center gap-2 font-semibold text-green-800">
            <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-green-500" />
            Session live · 3 learners connected
          </p>
          <p className="mt-1 text-sm text-green-700">
            Follow the lesson flow below. AI suggestions update as you teach.
          </p>
        </div>
      )}

      <div className="card p-6">
        <div className="flex flex-wrap items-center gap-2">
          <span className="chip">Level {plan.level}</span>
          <span className="chip">{plan.durationMin} min</span>
          <span className="chip">Topic · {plan.topic}</span>
        </div>
        <h2 className="mt-4 text-xl font-bold text-ink">Lesson objective</h2>
        <p className="mt-1 text-sm leading-relaxed text-ink-muted">
          {plan.objective}
        </p>
      </div>

      <div className="card p-6">
        <h3 className="text-base font-bold text-ink">Warm-up</h3>
        <p className="mt-2 text-sm text-ink-muted">{plan.warmUp}</p>
      </div>

      <div className="card p-6">
        <h3 className="text-base font-bold text-ink">Lesson flow</h3>
        <div className="mt-4 space-y-3">
          {plan.activities.map((a, i) => (
            <ActivityRow key={i} index={i} activity={a} />
          ))}
        </div>
      </div>

      <div className="rounded-2xl border border-brand-100 bg-brand-50 p-6">
        <div className="flex items-center gap-2">
          <span className="text-lg">🧠</span>
          <h3 className="text-base font-bold text-ink">Media literacy focus</h3>
        </div>
        <p className="mt-2 text-sm text-ink-muted">{plan.milFocus}</p>
      </div>

      <div className="card p-6">
        <h3 className="text-base font-bold text-ink">
          🤖 AI suggestions while you teach
        </h3>
        <p className="mt-1 text-xs text-ink-soft">
          Optional prompts — you decide what to use.
        </p>
        <ul className="mt-3 space-y-2">
          {plan.aiSuggestions.map((s, i) => (
            <li
              key={i}
              className="flex items-start gap-2 rounded-lg bg-slate-50 px-3 py-2 text-sm text-ink-muted"
            >
              <span className="mt-0.5 text-brand-600">✦</span>
              {s}
            </li>
          ))}
        </ul>
      </div>

      <div className="card p-6">
        <h3 className="text-base font-bold text-ink">Homework</h3>
        <p className="mt-2 text-sm text-ink-muted">{plan.homework}</p>
      </div>

      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          onClick={onTeach}
          disabled={teaching}
          className="btn-primary disabled:opacity-60"
        >
          {teaching ? "Session in progress…" : "▶ Start teaching"}
        </button>
        <button
          type="button"
          className="btn-secondary"
          onClick={() => window.print()}
        >
          Export plan
        </button>
      </div>
    </div>
  );
}

function ActivityRow({ index, activity }: { index: number; activity: PlanActivity }) {
  const highlight = activity.discussion;
  return (
    <div
      className={`flex gap-4 rounded-xl border p-4 ${
        highlight ? "border-brand-200 bg-brand-50" : "border-slate-100"
      }`}
    >
      <span
        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white ${
          highlight ? "bg-brand-700" : "bg-brand"
        }`}
      >
        {highlight ? "💬" : index + 1}
      </span>
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <p className="font-semibold text-ink">{activity.title}</p>
          <span className="text-xs font-semibold text-brand-700">
            {activity.minutes} min
          </span>
        </div>
        <p className="mt-1 text-sm text-ink-muted">{activity.detail}</p>
        {activity.points && (
          <ul className="mt-2 space-y-1">
            {activity.points.map((p, pi) => (
              <li key={pi} className="flex items-start gap-2 text-sm text-ink">
                <span className="mt-0.5 text-brand-600">→</span>
                {p}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
