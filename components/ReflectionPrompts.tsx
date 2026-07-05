"use client";

import { useEffect, useState } from "react";

function keyFor(slug: string, index: number) {
  return `moliverse:reflection:${slug}:${index}`;
}

function readStored(slug: string, index: number): string {
  try {
    return localStorage.getItem(keyFor(slug, index)) ?? "";
  } catch {
    return "";
  }
}

export default function ReflectionPrompts({
  slug,
  questions,
}: {
  slug: string;
  questions: string[];
}) {
  const [answers, setAnswers] = useState<string[]>(() => questions.map(() => ""));

  useEffect(() => {
    setAnswers(questions.map((_, index) => readStored(slug, index)));
  }, [slug, questions]);

  function update(index: number, value: string) {
    setAnswers((previous) => {
      const next = [...previous];
      next[index] = value;
      return next;
    });

    try {
      localStorage.setItem(keyFor(slug, index), value);
    } catch {
      /* storage unavailable; keep the UI responsive without persistence */
    }
  }

  return (
    <div className="space-y-5">
      {questions.map((question, index) => (
        <div key={index} className="border-l-[3px] border-ink pl-4">
          <label
            htmlFor={`reflection-${slug}-${index}`}
            className="block font-serif text-base italic text-ink"
          >
            {question}
          </label>
          <textarea
            id={`reflection-${slug}-${index}`}
            value={answers[index] ?? ""}
            onChange={(event) => update(index, event.target.value)}
            placeholder="Your answer…"
            aria-label={question}
            rows={2}
            className="mt-2 w-full rounded-sm border border-rule bg-paper-card px-3 py-2 font-serif text-sm text-ink focus:border-accent focus:outline-none"
          />
        </div>
      ))}
    </div>
  );
}
