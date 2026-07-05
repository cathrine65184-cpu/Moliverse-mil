import Link from "next/link";
import { Event } from "@/lib/types";

export default function EventCard({ event }: { event: Event }) {
  return (
    <Link
      href={`/event/${event.slug}`}
      className="group block rounded-md border border-rule bg-paper-card p-5 shadow-dossier transition-transform hover:-translate-y-0.5"
    >
      <div className="kicker">
        {event.category} · {event.date}
      </div>
      <h3 className="mt-2 font-serif text-xl font-bold leading-tight text-ink group-hover:text-accent">
        {event.title}
      </h3>
      <p className="mt-1 font-serif text-sm italic text-ink-soft">{event.summary}</p>

      <div className="mt-3 flex flex-wrap gap-1.5">
        {event.contestedTerms.map((t) => (
          <span
            key={t.term}
            className="tag text-[11px]"
            style={{ backgroundColor: t.accent }}
          >
            {t.term}
          </span>
        ))}
      </div>

      <div className="mt-3 flex gap-1 text-lg" aria-hidden>
        {event.sources.map((s) => (
          <span key={s.outlet} title={`${s.outlet} · ${s.country}`}>
            {s.flag}
          </span>
        ))}
      </div>
    </Link>
  );
}
