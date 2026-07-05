import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import Highlight from "@/components/Highlight";

describe("Highlight", () => {
  it("wraps present marks in mark tags and preserves the full text", () => {
    const text = "Russia calls it a special military operation, not an invasion.";

    const { container } = render(
      <Highlight
        text={text}
        marks={["special military operation", "invasion", "absent phrase"]}
      />,
    );

    expect(container.textContent).toBe(text);

    const marks = screen.getAllByText(/special military operation|invasion/);
    expect(marks).toHaveLength(2);
    expect(marks[0].tagName).toBe("MARK");
    expect(marks[1].tagName).toBe("MARK");
    expect((marks[0] as HTMLElement).style.backgroundColor).toBe("rgb(192, 57, 43)");
    expect(screen.queryByText("absent phrase")).toBeNull();
  });

  it("treats regex special characters in marks as literal text", () => {
    render(
      <Highlight
        text="Coverage asked whether C++ could outlast A/B testing in 2026?"
        marks={["C++", "A/B testing", "(missing)"]}
        accent="#123456"
      />,
    );

    const cplusplus = screen.getByText("C++");
    const abTesting = screen.getByText("A/B testing");

    expect(cplusplus.tagName).toBe("MARK");
    expect(abTesting.tagName).toBe("MARK");
    expect((cplusplus as HTMLElement).style.backgroundColor).toBe("rgb(18, 52, 86)");
    expect((abTesting as HTMLElement).style.backgroundColor).toBe("rgb(18, 52, 86)");
  });
});
