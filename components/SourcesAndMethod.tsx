import { Source } from "@/lib/types";

export default function SourcesAndMethod({
  sources,
  methodology,
}: {
  sources: Source[];
  methodology: string;
}) {
  return (
    <div className="rounded-sm border border-rule bg-paper-card p-5">
      <ol className="space-y-2 font-sans text-[12px] text-ink-soft">
        {sources.map((s, i) => (
          <li key={i}>
            <a
              href={s.archiveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:underline"
            >
              {s.outlet}
            </a>{" "}
            — “{s.headline}” — {s.publishDate}
          </li>
        ))}
      </ol>
      <p className="mt-4 border-t border-rule pt-3 font-serif text-[13px] italic text-ink-muted">
        {methodology}
      </p>
    </div>
  );
}
