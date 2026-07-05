import "@testing-library/jest-dom/vitest";
import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import PerspectiveChallenge from "@/components/PerspectiveChallenge";
import { Source } from "@/lib/types";

const mk = (outlet: string, orientation: Source["orientation"]): Source => ({
  outlet,
  country: "c",
  flag: "🏳️",
  orientation,
  accent: "#123456",
  headline: "forces enter amid the crisis",
  contestedWords: ["crisis"],
  framingWord: "crisis",
  tone: "t",
  focus: "f",
  url: "https://x/y",
  archiveUrl: "https://web.archive.org/web/x",
  publishDate: "2022",
  insight: "revealed insight",
});

const sources = [mk("BBC", "Public broadcaster"), mk("TASS", "State-owned")];

describe("PerspectiveChallenge", () => {
  it("hides outlets until revealed", () => {
    render(<PerspectiveChallenge sources={sources} />);
    expect(screen.queryByText(/BBC/)).not.toBeInTheDocument();
  });

  it("reveals every outlet when 'Just let me read' is used", () => {
    render(<PerspectiveChallenge sources={sources} />);
    fireEvent.click(screen.getByRole("button", { name: /just let me read/i }));
    expect(screen.getByText(/BBC/)).toBeInTheDocument();
    expect(screen.getByText(/TASS/)).toBeInTheDocument();
  });
});
