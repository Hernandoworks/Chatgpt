import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Card } from "./Card";

describe("Card", () => {
  it("renders children", () => {
    render(<Card>Hello</Card>);
    expect(screen.getByText("Hello")).toBeTruthy();
  });

  it("applies base classes", () => {
    render(<Card>Styled</Card>);
    const card = screen.getByText("Styled");
    expect(card.className).toContain("rounded-xl");
  });

  it("applies additional className", () => {
    render(<Card className="extra">Extra</Card>);
    const card = screen.getByText("Extra");
    expect(card.className).toContain("extra");
  });
});
