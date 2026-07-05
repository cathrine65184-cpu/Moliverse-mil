import { Event } from "@/lib/types";

function normalize(value: string): string {
  return value.trim().toLowerCase();
}

export function searchEvents(events: Event[], query: string): Event[] {
  const normalizedQuery = normalize(query);

  if (!normalizedQuery) {
    return events;
  }

  return events.filter((event) => {
    const searchableValues = [
      event.title,
      event.category,
      ...event.aliases,
      ...event.sources.map((source) => source.outlet),
    ];

    return searchableValues.some((value) =>
      normalize(value).includes(normalizedQuery),
    );
  });
}
