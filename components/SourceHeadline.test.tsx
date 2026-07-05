import "@testing-library/jest-dom/vitest";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import SourceHeadline from "@/components/SourceHeadline";
import type { Source } from "@/lib/types";

const source: Source = {
  outlet: "Example Times",
  country: "United States",
  flag: "US",
  orientation: "Centrist",
  accent: "#336699",
  headline: "Example headline",
  contestedWords: ["Example"],
  framingWord: "Example",
  tone: "Measured",
  focus: "Policy",
  url: "https://example.com/original",
  archiveUrl: "https://archive.ph/example",
  publishDate: "2026-07-05",
  insight: "Example insight",
};

describe("SourceHeadline", () => {
  it("renders the source publish date", () => {
    render(<SourceHeadline source={source} />);

    expect(screen.getByText("2026-07-05")).toBeInTheDocument();
  });

  it("links Verify original to the archived source in a new tab", () => {
    render(<SourceHeadline source={source} />);

    const link = screen.getByRole("link", { name: /verify original/i });

    expect(link).toHaveAttribute("href", "https://archive.ph/example");
    expect(link).toHaveAttribute("target", "_blank");
  });
});
