import "@testing-library/jest-dom/vitest";
import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import HeadlineGuess from "@/components/HeadlineGuess";
import { Source } from "@/lib/types";

const source: Source = {
  outlet: "TASS",
  country: "Russia",
  flag: "🇷🇺",
  orientation: "State-owned",
  accent: "#2471a3",
  headline: "Putin announces special military operation to defend Donbass",
  contestedWords: ["special military operation", "defend"],
  framingWord: "special operation",
  tone: "Justifying",
  focus: "Defence",
  url: "https://tass.com/x",
  archiveUrl: "https://web.archive.org/web/2022/x",
  publishDate: "24 Feb 2022",
  insight: "The Kremlin's term avoids the word 'war'.",
};

describe("HeadlineGuess", () => {
  it("hides the outlet while guessing", () => {
    render(
      <HeadlineGuess
        source={source}
        orientationOptions={["State-owned", "Centrist"]}
        revealed={false}
        onReveal={() => {}}
      />,
    );
    expect(screen.queryByText(/TASS/)).not.toBeInTheDocument();
    expect(screen.getByText("Putin")).toBeInTheDocument();
  });

  it("calls onReveal when the reveal control is used", () => {
    const onReveal = vi.fn();
    render(
      <HeadlineGuess
        source={source}
        orientationOptions={["State-owned", "Centrist"]}
        revealed={false}
        onReveal={onReveal}
      />,
    );
    fireEvent.click(screen.getByRole("button", { name: /reveal/i }));
    expect(onReveal).toHaveBeenCalled();
  });

  it("shows the outlet and insight once revealed", () => {
    render(
      <HeadlineGuess
        source={source}
        orientationOptions={["State-owned", "Centrist"]}
        revealed={true}
        onReveal={() => {}}
      />,
    );
    expect(screen.getByText(/TASS/)).toBeInTheDocument();
    expect(screen.getByText(/avoids the word 'war'/)).toBeInTheDocument();
  });
});
