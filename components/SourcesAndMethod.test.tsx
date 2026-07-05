import "@testing-library/jest-dom/vitest";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import SourcesAndMethod from "@/components/SourcesAndMethod";
import { Source } from "@/lib/types";

const sources: Source[] = [
  {
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
    insight: "i",
  },
];

describe("SourcesAndMethod", () => {
  it("lists each outlet with a link and shows the methodology", () => {
    render(<SourcesAndMethod sources={sources} methodology="How we made this." />);
    expect(screen.getByText(/How we made this\./)).toBeInTheDocument();
    const link = screen.getByRole("link", { name: /BBC/i });
    expect(link).toHaveAttribute("href", sources[0].archiveUrl);
  });
});
