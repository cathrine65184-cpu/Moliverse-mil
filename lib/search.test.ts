import { describe, expect, it } from "vitest";

import { events } from "@/lib/events";
import { searchEvents } from "@/lib/search";

describe("searchEvents", () => {
  it("returns all events unchanged for an empty or whitespace-only query", () => {
    expect(searchEvents(events, "")).toBe(events);
    expect(searchEvents(events, "   ")).toBe(events);
  });

  it.each([
    ["title", "tikTOK", ["tiktok-ban"]],
    ["alias", "SpEcIaL MiLiTaRy OpErAtIoN", ["russia-ukraine-2022"]],
    ["category", "war & conflict", ["russia-ukraine-2022", "israel-gaza"]],
    ["source outlet", "associated press", ["israel-gaza"]],
  ])(
    "matches %s case-insensitively",
    (_field, query, expectedSlugs) => {
      expect(searchEvents(events, query).map((event) => event.slug)).toEqual(
        expectedSlugs,
      );
    },
  );

  it("returns an empty array when nothing matches", () => {
    expect(searchEvents(events, "nonexistent outlet")).toEqual([]);
  });
});
