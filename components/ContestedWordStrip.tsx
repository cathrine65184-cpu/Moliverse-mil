import { ContestedTerm } from "@/lib/types";

export default function ContestedWordStrip({
  terms,
}: {
  terms: ContestedTerm[];
}) {
  return (
    <div className="rounded-sm bg-ink p-5 text-paper">
      <div className="font-sans text-[11px] uppercase tracking-[0.15em] text-accent-soft">
        One act. {terms.length} names.
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        {terms.map((t) => (
          <span
            key={t.term}
            className="tag text-sm"
            style={{ backgroundColor: t.accent }}
          >
            {t.term}
          </span>
        ))}
      </div>
    </div>
  );
}
