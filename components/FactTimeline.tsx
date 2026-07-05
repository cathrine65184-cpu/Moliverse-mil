import { TimelineEntry } from "@/lib/types";

export default function FactTimeline({
  entries,
}: {
  entries: TimelineEntry[];
}) {
  return (
    <ol className="mt-3 border-l-2 border-verified-border pl-4">
      {entries.map((e, i) => (
        <li key={i} className="relative mb-3 last:mb-0">
          <span className="absolute -left-[21px] top-1 h-2.5 w-2.5 rounded-full bg-verified" />
          <div className="font-sans text-[11px] font-semibold uppercase tracking-wide text-verified">
            {e.date}
          </div>
          <div className="font-serif text-sm text-ink">{e.label}</div>
        </li>
      ))}
    </ol>
  );
}
