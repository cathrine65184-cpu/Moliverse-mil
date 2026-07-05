import { describe, it, expect } from "vitest";
import { tokenizeHeadline, orientationOptions } from "@/lib/challenge";
import { Source } from "@/lib/types";

describe("tokenizeHeadline", () => {
  it("marks a contested phrase as a single contested token", () => {
    const tokens = tokenizeHeadline(
      "Putin announces special military operation to defend Donbass",
      ["special military operation", "defend"],
    );
    const phrase = tokens.find((t) => t.text === "special military operation");
    expect(phrase?.contested).toBe(true);
    expect(tokens.find((t) => t.text === "defend")?.contested).toBe(true);
    expect(tokens.find((t) => t.text === "Putin")?.contested).toBe(false);
  });

  it("reconstructs the original headline from token text", () => {
    const tokens = tokenizeHeadline("Russia invades Ukraine", ["invades"]);
    expect(tokens.map((t) => t.text).join(" ")).toBe("Russia invades Ukraine");
  });

  it("marks nothing contested when the substring is absent", () => {
    const tokens = tokenizeHeadline("plain headline here", ["missing"]);
    expect(tokens.every((t) => t.contested === false)).toBe(true);
  });
});

describe("orientationOptions", () => {
  const s = (orientation: Source["orientation"]): Source => ({
    outlet: "o",
    country: "c",
    flag: "f",
    orientation,
    accent: "#000",
    headline: "h",
    contestedWords: [],
    framingWord: "w",
    tone: "t",
    focus: "f",
    url: "u",
    archiveUrl: "a",
    publishDate: "d",
    insight: "i",
  });

  it("includes every distinct source orientation and returns at least 4", () => {
    const opts = orientationOptions([
      s("Public broadcaster"),
      s("State-owned"),
      s("State-owned"),
      s("Pan-Arab"),
    ]);
    expect(opts.length).toBeGreaterThanOrEqual(4);
    expect(opts).toContain("Public broadcaster");
    expect(opts).toContain("State-owned");
    expect(opts).toContain("Pan-Arab");
    expect(new Set(opts).size).toBe(opts.length);
  });
});
