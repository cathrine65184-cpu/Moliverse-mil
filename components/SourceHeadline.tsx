import Highlight from "@/components/Highlight";
import { Source } from "@/lib/types";

export default function SourceHeadline({ source }: { source: Source }) {
  return (
    <div
      className="rounded-sm border border-rule bg-paper-card p-4"
      style={{ borderTopWidth: 3, borderTopColor: source.accent }}
    >
      <div className="flex items-center justify-between font-sans text-[11px] text-ink-muted">
        <span>
          {source.flag} {source.outlet} · {source.country}
        </span>
        <span className="rounded-full bg-paper px-2 py-0.5">
          {source.orientation}
        </span>
      </div>
      <p className="mt-2 font-serif text-[15px] leading-snug text-ink">
        <Highlight
          text={source.headline}
          marks={source.contestedWords}
          accent={source.accent}
        />
      </p>
      <div
        className="mt-2 font-sans text-[10px] uppercase tracking-wide"
        style={{ color: source.accent }}
      >
        {source.tone} · {source.focus}
      </div>
    </div>
  );
}
