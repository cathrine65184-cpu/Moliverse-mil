import { describe, it, expect } from "vitest";
import { events, getEvent } from "@/lib/events";
import { validateEvent } from "@/lib/events/validate";

describe("curated events", () => {
  it("ships exactly 3 events", () => {
    expect(events).toHaveLength(3);
  });

  it("each event passes structural validation", () => {
    for (const e of events) {
      expect(validateEvent(e), `event ${e.slug}`).toEqual([]);
    }
  });

  it("every contestedWords entry is a substring of its headline", () => {
    for (const e of events) {
      for (const s of e.sources) {
        for (const w of s.contestedWords) {
          expect(s.headline.includes(w), `${e.slug}/${s.outlet}: "${w}"`).toBe(true);
        }
      }
    }
  });

  it("has unique slugs and getEvent resolves them", () => {
    const slugs = new Set(events.map((e) => e.slug));
    expect(slugs.size).toBe(events.length);
    for (const e of events) {
      expect(getEvent(e.slug)?.slug).toBe(e.slug);
    }
    expect(getEvent("does-not-exist")).toBeUndefined();
  });
});
