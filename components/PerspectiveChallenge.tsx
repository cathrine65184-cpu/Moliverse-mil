"use client";

import { useState } from "react";
import HeadlineGuess from "@/components/HeadlineGuess";
import { orientationOptions } from "@/lib/challenge";
import { Source } from "@/lib/types";

export default function PerspectiveChallenge({ sources }: { sources: Source[] }) {
  const [revealed, setRevealed] = useState<boolean[]>(() => sources.map(() => false));
  const options = orientationOptions(sources);
  const allRevealed = revealed.every(Boolean);

  function reveal(index: number) {
    setRevealed((prev) => prev.map((isRevealed, i) => (i === index ? true : isRevealed)));
  }

  function revealAll() {
    setRevealed(sources.map(() => true));
  }

  return (
    <div>
      <div className="grid gap-3 sm:grid-cols-2">
        {sources.map((source, index) => (
          <HeadlineGuess
            key={source.outlet}
            source={source}
            orientationOptions={options}
            revealed={revealed[index]}
            onReveal={() => reveal(index)}
          />
        ))}
      </div>
      {!allRevealed && (
        <button
          type="button"
          onClick={revealAll}
          className="mt-3 font-sans text-[12px] text-ink-muted hover:text-accent hover:underline"
        >
          Just let me read →
        </button>
      )}
    </div>
  );
}
