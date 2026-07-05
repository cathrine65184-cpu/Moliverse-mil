import "@testing-library/jest-dom/vitest";
import { describe, it, expect, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import ReflectionPrompts from "@/components/ReflectionPrompts";

describe("ReflectionPrompts", () => {
  beforeEach(() => localStorage.clear());

  it("renders one textarea per question", () => {
    render(<ReflectionPrompts slug="demo" questions={["Q1?", "Q2?"]} />);
    expect(screen.getAllByRole("textbox")).toHaveLength(2);
  });

  it("persists an answer to localStorage", () => {
    render(<ReflectionPrompts slug="demo" questions={["Q1?"]} />);
    fireEvent.change(screen.getByRole("textbox"), { target: { value: "my thought" } });
    expect(localStorage.getItem("moliverse:reflection:demo:0")).toBe("my thought");
  });

  it("hydrates an existing saved answer", () => {
    localStorage.setItem("moliverse:reflection:demo:0", "saved earlier");
    render(<ReflectionPrompts slug="demo" questions={["Q1?"]} />);
    expect(screen.getByRole("textbox")).toHaveValue("saved earlier");
  });
});
