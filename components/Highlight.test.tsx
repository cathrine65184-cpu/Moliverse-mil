import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Highlight from "@/components/Highlight";

describe("Highlight", () => {
  it("wraps a matched substring in a mark", () => {
    render(<Highlight text="Russia invades Ukraine" marks={["invades"]} />);
    const mark = screen.getByText("invades");
    expect(mark.tagName).toBe("MARK");
  });

  it("renders full text even when a mark is absent", () => {
    const { container } = render(
      <Highlight text="plain headline" marks={["missing"]} />,
    );
    expect(container.textContent).toBe("plain headline");
    expect(container.querySelector("mark")).toBeNull();
  });

  it("preserves the full original text when marking", () => {
    const { container } = render(
      <Highlight text="a conflict escalates" marks={["conflict"]} />,
    );
    expect(container.textContent).toBe("a conflict escalates");
  });

  it("treats regex special characters as literal text", () => {
    render(
      <Highlight
        text="Coverage asked whether C++ could outlast A/B testing in 2026?"
        marks={["C++", "A/B testing"]}
        accent="#123456"
      />,
    );

    const cplusplus = screen.getByText("C++");
    const abTesting = screen.getByText("A/B testing");

    expect(cplusplus.tagName).toBe("MARK");
    expect(abTesting.tagName).toBe("MARK");
    expect((cplusplus as HTMLElement).style.backgroundColor).toBe(
      "rgba(18, 52, 86, 0.133)",
    );
  });

  it("prefers longer overlapping marks", () => {
    render(
      <Highlight text="Russia calls it an invasion" marks={["in", "invasion"]} />,
    );

    expect(screen.getByText("invasion").tagName).toBe("MARK");
  });
});
