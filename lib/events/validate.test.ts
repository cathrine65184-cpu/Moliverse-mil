import { describe, it, expect } from "vitest";
import { events, getEvent } from "@/lib/events";
import { validateEvent } from "@/lib/events/validate";
import { BackgroundFact, Event, Source } from "@/lib/types";

const source: Source = {
  outlet: "BBC",
  country: "United Kingdom",
  flag: "🇬🇧",
  orientation: "Public broadcaster",
  accent: "#c0392b",
  headline: "Ukraine conflict: Russian forces attack from three sides",
  contestedWords: ["conflict", "attack"],
  framingWord: "conflict",
  tone: "Alarmed",
  focus: "Scale",
  url: "https://www.bbc.com/news/world-europe-60503037",
  archiveUrl: "https://web.archive.org/web/20220224034846/https://www.bbc.com/news/world-europe-60503037",
  publishDate: "24 Feb 2022",
  insight: "Notice how 'conflict' can sound broader and less accusatory than naming a single aggressor.",
};

const fact: BackgroundFact = {
  text: "Russian forces crossed into Ukraine on 24 February 2022.",
  sourceLabel: "UN News",
  url: "https://news.un.org/en/story/2022/02/1112952",
};

const valid: Event = {
  slug: "x",
  title: "X",
  aliases: [],
  category: "War & Conflict",
  date: "2022",
  standfirst: "s",
  summary: "s",
  sources: [source, source, source, source],
  contestedTerms: [
    { term: "conflict", accent: "#c0392b", why: "w" },
    { term: "crisis", accent: "#7d3c98", why: "w" },
  ],
  historicalContext: "h",
  methodology: "How we made this.",
  backgroundFacts: [fact],
  timeline: [],
  missingPerspectives: "m",
  reflectionQuestions: ["q"],
};

describe("curated events", () => {
  it("ships exactly 3 events", () => {
    expect(events).toHaveLength(3);
  });

  it("each event passes structural validation", () => {
    for (const e of events) {
      expect(validateEvent(e), `event ${e.slug}`).toEqual([]);
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

describe("validateEvent new rules", () => {
  it("passes a fully-populated event", () => {
    expect(validateEvent(valid)).toEqual([]);
  });

  it("flags a source missing archiveUrl", () => {
    const bad = {
      ...valid,
      sources: [{ ...source, archiveUrl: "" }, source, source, source],
    };
    expect(validateEvent(bad).some((p) => p.includes("archiveUrl"))).toBe(true);
  });

  it("flags a source missing publishDate", () => {
    const bad = {
      ...valid,
      sources: [{ ...source, publishDate: "" }, source, source, source],
    };
    expect(validateEvent(bad).some((p) => p.includes("publishDate"))).toBe(true);
  });

  it("flags a source missing insight", () => {
    const bad = {
      ...valid,
      sources: [{ ...source, insight: "" }, source, source, source],
    };
    expect(validateEvent(bad).some((p) => p.includes("insight"))).toBe(true);
  });

  it("flags a background fact missing its citation url", () => {
    const bad = { ...valid, backgroundFacts: [{ ...fact, url: "" }] };
    expect(validateEvent(bad).some((p) => p.includes("fact"))).toBe(true);
  });

  it("flags a missing methodology", () => {
    const bad = { ...valid, methodology: "" };
    expect(validateEvent(bad).some((p) => p.includes("methodology"))).toBe(true);
  });
});
