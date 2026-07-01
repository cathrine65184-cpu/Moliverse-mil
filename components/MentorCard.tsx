"use client";

import { useState } from "react";
import { MentorProfile } from "@/lib/types";
import { sharedInterests } from "@/lib/profiles";

export default function MentorCard({ mentor }: { mentor: MentorProfile }) {
  const [requested, setRequested] = useState(false);
  const shared = sharedInterests(mentor);

  return (
    <article className="card flex flex-col p-5 transition hover:shadow-lift">
      <div className="flex items-start gap-3">
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-50 text-2xl">
          {mentor.avatar}
        </span>
        <div className="min-w-0">
          <h3 className="font-bold text-ink">{mentor.name}</h3>
          <p className="text-xs text-ink-soft">
            {mentor.flag} {mentor.university}
          </p>
        </div>
      </div>

      <p className="mt-3 text-sm italic leading-relaxed text-ink-muted">
        “{mentor.intro}”
      </p>

      <div className="mt-4 space-y-2 text-xs">
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="font-semibold text-ink-soft">Speaks:</span>
          {mentor.speaks.map((l) => (
            <span key={l} className="rounded-full bg-slate-100 px-2 py-0.5 text-ink-muted">
              {l}
            </span>
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="font-semibold text-ink-soft">Teaches:</span>
          {mentor.teaches.map((l) => (
            <span key={l} className="chip">
              {l}
            </span>
          ))}
        </div>
      </div>

      {shared.length > 0 && (
        <div className="mt-4 rounded-xl border border-brand-100 bg-brand-50 p-3">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-brand-700">
            Shared interests
          </p>
          <div className="mt-1.5 flex flex-wrap gap-1.5">
            {shared.map((i) => (
              <span
                key={i}
                className="inline-flex items-center gap-1 text-xs font-medium text-ink"
              >
                <span className="text-green-600">✓</span> {i}
              </span>
            ))}
          </div>
        </div>
      )}

      <p className="mt-4 text-xs text-ink-soft">🗓 {mentor.availability}</p>

      <button
        type="button"
        onClick={() => setRequested(true)}
        disabled={requested}
        className={`mt-4 ${
          requested ? "btn-secondary" : "btn-primary"
        } w-full text-sm`}
      >
        {requested ? "✓ Request sent" : "Become my mentor"}
      </button>
    </article>
  );
}
