import { ContestedTerm } from "@/lib/types";

export default function FramingExplainer({
  terms,
  historicalContext,
}: {
  terms: ContestedTerm[];
  historicalContext: string;
}) {
  return (
    <div>
      <div className="gap-x-8 sm:columns-2">
        {terms.map((t) => (
          <p key={t.term} className="mb-3 break-inside-avoid prose-news">
            <span className="font-bold" style={{ color: t.accent }}>
              “{t.term}”
            </span>{" "}
            — {t.why}
          </p>
        ))}
      </div>
      <div className="mt-4 border-l-2 border-rule pl-4 font-serif text-sm italic text-ink-soft">
        <span className="font-sans text-[10px] uppercase tracking-wide not-italic text-ink-muted">
          Historical context ·{" "}
        </span>
        {historicalContext}
      </div>
    </div>
  );
}
