"use client";

import { useState } from "react";
import SourceHeadline from "@/components/SourceHeadline";
import { tokenizeHeadline } from "@/lib/challenge";
import { Orientation, Source } from "@/lib/types";

export default function HeadlineGuess({
  source,
  orientationOptions,
  revealed,
  onReveal,
}: {
  source: Source;
  orientationOptions: Orientation[];
  revealed: boolean;
  onReveal: () => void;
}) {
  const [tapped, setTapped] = useState<number | null>(null);
  const [picked, setPicked] = useState<Orientation | null>(null);
  const tokens = tokenizeHeadline(source.headline, source.contestedWords);

  if (revealed) {
    return (
      <div>
        <SourceHeadline source={source} />
        <p className="mt-2 font-serif text-[13px] italic text-ink-soft">
          {source.insight}
        </p>
      </div>
    );
  }

  const wordCorrect = tapped !== null && tokens[tapped]?.contested;
  const orientationCorrect = picked !== null && picked === source.orientation;

  return (
    <div
      className="rounded-sm border border-rule bg-paper-card p-4"
      style={{ borderTopWidth: 3, borderTopColor: "#999" }}
    >
      <div className="font-sans text-[11px] uppercase tracking-wide text-ink-muted">
        Mystery outlet · guess before you reveal
      </div>
      <p className="mt-2 font-serif text-[15px] leading-snug text-ink">
        {tokens.map((token, index) => (
          <button
            key={`${token.text}-${index}`}
            type="button"
            onClick={() => setTapped(index)}
            className={`mr-1 rounded-[2px] px-0.5 last:mr-0 ${
              tapped === index
                ? token.contested
                  ? "bg-verified-bg text-verified"
                  : "bg-paper line-through"
                : "hover:bg-paper"
            }`}
          >
            {token.text}
          </button>
        ))}
      </p>
      {tapped !== null && (
        <p className="mt-1 font-sans text-[11px] text-ink-muted">
          {wordCorrect
            ? "That's a framing word — it does persuading work."
            : "Look again — which word carries the judgment?"}
        </p>
      )}

      <div className="mt-3 font-sans text-[11px] text-ink-muted">Who wrote this?</div>
      <div className="mt-1 flex flex-wrap gap-1.5">
        {orientationOptions.map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => setPicked(option)}
            className={`rounded-full border px-2 py-0.5 font-sans text-[11px] ${
              picked === option
                ? option === source.orientation
                  ? "border-verified text-verified"
                  : "border-accent text-accent"
                : "border-rule text-ink-soft hover:border-ink"
            }`}
          >
            {option}
          </button>
        ))}
      </div>
      {picked !== null && (
        <p className="mt-1 font-sans text-[11px] text-ink-muted">
          {orientationCorrect
            ? "Good read."
            : "A common guess — reveal to see who it really was."}
        </p>
      )}

      <button
        type="button"
        onClick={onReveal}
        className="mt-3 font-sans text-[12px] text-accent hover:underline"
      >
        Reveal outlet →
      </button>
    </div>
  );
}
