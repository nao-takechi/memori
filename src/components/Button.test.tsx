import { test, expect, describe } from "vitest";
import { render, screen } from "@testing-library/react";
import { Button } from "./Button";

describe("Button", () => {
  test("renders with correct text", () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText("Click me")).toBeInTheDocument();
  });

  test("has correct styles", () => {
    render(<Button>Click me</Button>);
    const button = screen.getByText("Click me");
    expect(button).toHaveClass("bg-blue-500", "text-white");
  });
});
