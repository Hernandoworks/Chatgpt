import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Input } from "./Input";

describe("Input", () => {
  it("renders an input element", () => {
    render(<Input />);
    expect(screen.getByRole("textbox")).toBeTruthy();
  });

  it("renders a label when provided", () => {
    render(<Input label="Name" />);
    expect(screen.getByLabelText("Name")).toBeTruthy();
  });

  it("displays error message", () => {
    render(<Input error="Required" />);
    expect(screen.getByRole("alert")).toHaveTextContent("Required");
  });

  it("sets aria-invalid when error is present", () => {
    render(<Input error="Invalid" />);
    expect(screen.getByRole("textbox")).toHaveAttribute("aria-invalid", "true");
  });

  it("applies size classes", () => {
    render(<Input size="lg" />);
    const input = screen.getByRole("textbox");
    expect(input.className).toContain("h-12");
  });

  it("forwards ref", () => {
    const ref = { current: null };
    render(<Input ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
  });

  it("applies additional className", () => {
    render(<Input className="extra" />);
    const input = screen.getByRole("textbox");
    expect(input.className).toContain("extra");
  });
});
