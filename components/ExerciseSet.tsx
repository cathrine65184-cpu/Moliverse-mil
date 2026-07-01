"use client";

import { useMemo, useState } from "react";
import {
  Exercise,
  FillExercise,
  MatchExercise,
  McqExercise,
  OrderExercise,
  SpeakExercise,
  TranslateExercise,
} from "@/lib/types";

const TYPE_LABEL: Record<Exercise["type"], string> = {
  match: "🔗 Match",
  mcq: "◎ Choose",
  fill: "✍️ Fill the gap",
  order: "🔀 Word order",
  translate: "🖊 Produce",
  speak: "🎤 Speak",
};

function shuffleOnce<T>(arr: T[]): T[] {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function ExerciseSet({ exercises }: { exercises: Exercise[] }) {
  return (
    <div className="space-y-4">
      {exercises.map((ex, i) => (
        <div key={i} className="rounded-xl border border-slate-100 p-4">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-[11px] font-semibold uppercase tracking-wide text-brand-600">
              {TYPE_LABEL[ex.type]}
            </span>
            <span className="text-[11px] font-medium text-ink-soft">
              {i + 1} / {exercises.length}
            </span>
          </div>
          <p className="mb-3 text-sm font-medium text-ink">{ex.instruction}</p>
          <ExerciseBody ex={ex} />
        </div>
      ))}
    </div>
  );
}

function ExerciseBody({ ex }: { ex: Exercise }) {
  switch (ex.type) {
    case "match":
      return <MatchEx ex={ex} />;
    case "mcq":
      return <McqEx ex={ex} />;
    case "fill":
      return <FillEx ex={ex} />;
    case "order":
      return <OrderEx ex={ex} />;
    case "translate":
      return <TranslateEx ex={ex} />;
    case "speak":
      return <SpeakEx ex={ex} />;
  }
}

function optionClasses(state: "idle" | "correct" | "wrong" | "muted") {
  const base =
    "rounded-lg border px-3.5 py-2.5 text-sm text-left transition w-full flex items-center justify-between";
  if (state === "correct") return `${base} border-green-300 bg-green-50 text-green-800`;
  if (state === "wrong") return `${base} border-red-300 bg-red-50 text-red-700`;
  if (state === "muted") return `${base} border-slate-100 text-ink-soft`;
  return `${base} border-slate-200 hover:border-brand-200 hover:bg-brand-50`;
}

function McqEx({ ex }: { ex: McqExercise }) {
  const [choice, setChoice] = useState<number | null>(null);
  const answered = choice !== null;
  return (
    <div>
      <p className="mb-3 rounded-lg bg-slate-50 px-3 py-2 text-base font-bold text-ink">
        {ex.prompt}
      </p>
      <div className="grid gap-2">
        {ex.options.map((opt, i) => {
          const state = !answered
            ? "idle"
            : i === ex.answer
            ? "correct"
            : i === choice
            ? "wrong"
            : "muted";
          return (
            <button
              key={i}
              disabled={answered}
              onClick={() => setChoice(i)}
              className={optionClasses(state)}
            >
              <span>{opt}</span>
              {answered && i === ex.answer && <span>✓</span>}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function FillEx({ ex }: { ex: FillExercise }) {
  const [choice, setChoice] = useState<number | null>(null);
  const answered = choice !== null;
  const chosenWord =
    choice !== null ? ex.options[choice] : "_____";
  const correct = answered && choice === ex.answer;
  return (
    <div>
      <p className="mb-3 text-base leading-relaxed text-ink">
        {ex.before}
        <span
          className={`mx-1 rounded px-1.5 font-bold ${
            !answered
              ? "bg-brand-50 text-brand-700"
              : correct
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-700"
          }`}
        >
          {chosenWord}
        </span>
        {ex.after}
      </p>
      <div className="grid gap-2 sm:grid-cols-2">
        {ex.options.map((opt, i) => {
          const state = !answered
            ? "idle"
            : i === ex.answer
            ? "correct"
            : i === choice
            ? "wrong"
            : "muted";
          return (
            <button
              key={i}
              disabled={answered}
              onClick={() => setChoice(i)}
              className={optionClasses(state)}
            >
              <span>{opt}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function MatchEx({ ex }: { ex: MatchExercise }) {
  const defs = useMemo(() => shuffleOnce(ex.pairs.map((p) => p.def)), [ex]);
  const [ans, setAns] = useState<Record<number, string>>({});
  const [checked, setChecked] = useState(false);

  return (
    <div>
      <div className="space-y-2">
        {ex.pairs.map((p, i) => {
          const value = ans[i] ?? "";
          const isCorrect = checked && value === p.def;
          return (
            <div key={i} className="flex flex-wrap items-center gap-2">
              <span className="w-32 shrink-0 font-semibold text-ink">{p.term}</span>
              <span className="text-ink-soft">→</span>
              <select
                value={value}
                disabled={checked}
                onChange={(e) => setAns((a) => ({ ...a, [i]: e.target.value }))}
                className={`select flex-1 ${
                  checked
                    ? isCorrect
                      ? "border-green-300 bg-green-50"
                      : "border-red-300 bg-red-50"
                    : ""
                }`}
              >
                <option value="">Choose meaning…</option>
                {defs.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
              {checked && (isCorrect ? <span className="text-green-600">✓</span> : <span className="text-red-500">✕</span>)}
            </div>
          );
        })}
      </div>
      {!checked && (
        <button
          onClick={() => setChecked(true)}
          disabled={Object.keys(ans).length < ex.pairs.length}
          className="btn-primary mt-3 px-4 py-2 text-sm disabled:opacity-50"
        >
          Check
        </button>
      )}
    </div>
  );
}

function OrderEx({ ex }: { ex: OrderExercise }) {
  const initial = useMemo(() => ex.tokens.map((t, i) => ({ t, id: i })), [ex]);
  const [pool, setPool] = useState(initial);
  const [seq, setSeq] = useState<{ t: string; id: number }[]>([]);
  const [checked, setChecked] = useState(false);

  const built = seq.map((s) => s.t).join(" ");
  const correct = built === ex.answer.replace(/[.?!]$/, "");

  return (
    <div>
      <div className="mb-3 min-h-[44px] rounded-lg border border-dashed border-slate-200 p-2">
        <div className="flex flex-wrap gap-2">
          {seq.length === 0 && (
            <span className="px-1 text-sm text-ink-soft">Tap the words in order…</span>
          )}
          {seq.map((s) => (
            <button
              key={s.id}
              disabled={checked}
              onClick={() => {
                setSeq((q) => q.filter((x) => x.id !== s.id));
                setPool((p) => [...p, s]);
              }}
              className="rounded-lg bg-brand-50 px-3 py-1.5 text-sm font-medium text-brand-700"
            >
              {s.t}
            </button>
          ))}
        </div>
      </div>
      <div className="flex flex-wrap gap-2">
        {pool.map((s) => (
          <button
            key={s.id}
            disabled={checked}
            onClick={() => {
              setPool((p) => p.filter((x) => x.id !== s.id));
              setSeq((q) => [...q, s]);
            }}
            className="rounded-lg border border-slate-200 px-3 py-1.5 text-sm text-ink hover:border-brand-200 hover:bg-brand-50"
          >
            {s.t}
          </button>
        ))}
      </div>
      <div className="mt-3 flex items-center gap-3">
        <button
          onClick={() => setChecked(true)}
          disabled={pool.length > 0}
          className="btn-primary px-4 py-2 text-sm disabled:opacity-50"
        >
          Check
        </button>
        {checked && (
          <span className={`text-sm font-medium ${correct ? "text-green-700" : "text-red-600"}`}>
            {correct ? "Correct!" : `Answer: ${ex.answer}`}
          </span>
        )}
      </div>
    </div>
  );
}

function TranslateEx({ ex }: { ex: TranslateExercise }) {
  const [text, setText] = useState("");
  const [show, setShow] = useState(false);
  return (
    <div>
      <p className="mb-2 rounded-lg bg-slate-50 px-3 py-2 text-sm text-ink">{ex.prompt}</p>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={2}
        className="input w-full"
        placeholder="Write your sentence…"
      />
      <button
        onClick={() => setShow((s) => !s)}
        className="btn-secondary mt-2 px-4 py-2 text-sm"
      >
        {show ? "Hide sample answer" : "Show a sample answer"}
      </button>
      {show && (
        <p className="mt-2 rounded-lg border border-brand-100 bg-brand-50 px-3 py-2 text-sm text-ink">
          💡 {ex.sample}
        </p>
      )}
    </div>
  );
}

function SpeakEx({ ex }: { ex: SpeakExercise }) {
  const [done, setDone] = useState(false);
  return (
    <div>
      <p className="mb-3 rounded-lg bg-slate-50 px-3 py-2 text-sm text-ink">{ex.prompt}</p>
      <button
        onClick={() => setDone((d) => !d)}
        className={`${done ? "btn-secondary" : "btn-primary"} px-4 py-2 text-sm`}
      >
        {done ? "✓ Said aloud" : "🎤 I said it aloud"}
      </button>
    </div>
  );
}
