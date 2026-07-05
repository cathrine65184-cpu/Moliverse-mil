import FactTimeline from "@/components/FactTimeline";
import { TimelineEntry } from "@/lib/types";

export default function BackgroundFacts({
  facts,
  timeline,
}: {
  facts: string[];
  timeline: TimelineEntry[];
}) {
  return (
    <div className="rounded-sm border border-verified-border bg-verified-bg p-5">
      <ul className="space-y-1.5 prose-news">
        {facts.map((f, i) => (
          <li key={i} className="flex gap-2">
            <span className="text-verified" aria-hidden>
              ✓
            </span>
            <span>{f}</span>
          </li>
        ))}
      </ul>
      {timeline.length > 0 && <FactTimeline entries={timeline} />}
      <p className="mt-3 font-serif text-[11px] italic text-ink-muted">
        Verified background — the shared floor beneath every framing.
      </p>
    </div>
  );
}
