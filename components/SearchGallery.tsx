"use client";

import { useMemo, useState } from "react";
import EventCard from "@/components/EventCard";
import { searchEvents } from "@/lib/search";
import { Event } from "@/lib/types";

export default function SearchGallery({ events }: { events: Event[] }) {
  const [query, setQuery] = useState("");
  const results = useMemo(() => searchEvents(events, query), [events, query]);
  const noMatch = query.trim() !== "" && results.length === 0;
  const shown = noMatch ? events : results;

  return (
    <div>
      <input
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search any world event…"
        className="w-full rounded-md border-2 border-ink bg-paper-card px-4 py-3 font-serif text-lg text-ink placeholder:text-ink-muted focus:border-accent focus:outline-none"
      />

      <div className="mt-3 flex flex-wrap gap-2">
        {events.map((e) => (
          <button
            key={e.slug}
            onClick={() => setQuery(e.title)}
            className="rounded-full border border-rule bg-paper-card px-3 py-1 font-sans text-xs text-ink-soft hover:border-accent hover:text-accent"
          >
            {e.title}
          </button>
        ))}
      </div>

      {noMatch && (
        <p className="mt-6 font-serif text-sm italic text-ink-muted">
          We don't have a dossier for “{query}” yet — explore these instead.
        </p>
      )}

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {shown.map((e) => (
          <EventCard key={e.slug} event={e} />
        ))}
      </div>
    </div>
  );
}
