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
});
