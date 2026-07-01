"use client";

import { useState } from "react";
import { QuizQuestion } from "@/lib/types";

export default function Quiz({ questions }: { questions: QuizQuestion[] }) {
  const [picked, setPicked] = useState<Record<number, number>>({});

  return (
    <div className="space-y-5">
      {questions.map((q, qi) => {
        const choice = picked[qi];
        const answered = choice !== undefined;
        return (
          <div key={qi} className="rounded-xl border border-slate-100 p-4">
            <p className="font-semibold text-ink">
              {qi + 1}. {q.question}
            </p>
            <div className="mt-3 grid gap-2">
              {q.options.map((opt, oi) => {
                const isPicked = choice === oi;
                const isCorrect = oi === q.answerIndex;
                let cls =
                  "flex items-center justify-between rounded-lg border px-3.5 py-2.5 text-sm text-left transition";
                if (!answered) {
                  cls +=
                    " border-slate-200 hover:border-brand-200 hover:bg-brand-50";
                } else if (isCorrect) {
                  cls += " border-green-300 bg-green-50 text-green-800";
                } else if (isPicked) {
                  cls += " border-red-300 bg-red-50 text-red-700";
                } else {
                  cls += " border-slate-100 text-ink-soft";
                }
                return (
                  <button
                    key={oi}
                    type="button"
                    disabled={answered}
                    onClick={() => setPicked((p) => ({ ...p, [qi]: oi }))}
                    className={cls}
                  >
                    <span>{opt}</span>
                    {answered && isCorrect && <span aria-hidden>✓</span>}
                    {answered && isPicked && !isCorrect && <span aria-hidden>✕</span>}
                  </button>
                );
              })}
            </div>
            {answered && (
              <p className="mt-2 text-sm font-medium text-ink-muted">
                {choice === q.answerIndex
                  ? "Correct! Nicely done."
                  : "Not quite — the highlighted answer is correct."}
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
}
