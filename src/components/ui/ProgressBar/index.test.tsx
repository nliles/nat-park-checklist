import React from "react";
import { render, screen } from "@testing-library/react";
import { ProgressBarProps } from "./types";
import ProgressBar from ".";

describe("<ProgressBar />", () => {
  const renderProgressBar = (args: ProgressBarProps) =>
    render(<ProgressBar completed={args.completed} total={args.total} />);

  it("has the correct percentage value when completed is 0", () => {
    renderProgressBar({ completed: 0, total: 10 });
    expect(screen.getByRole("progressbar")).toHaveAttribute("value", "0");
  });

  it("has the correct percentage value", () => {
    renderProgressBar({ completed: 5, total: 10 });
    expect(screen.getByRole("progressbar")).toHaveAttribute("value", "50");
  });

  it("has the correct percentage value when completed is equal to toal", () => {
    renderProgressBar({ completed: 10, total: 10 });
    expect(screen.getByRole("progressbar")).toHaveAttribute("value", "100");
  });
});
