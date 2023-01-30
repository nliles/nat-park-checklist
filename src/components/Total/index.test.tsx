import { render, screen } from "@testing-library/react";
import Total from ".";

describe("<Total />", () => {
  it("Displays the correct count", () => {
    render(<Total count={10} total={20} tooltipText="Total"/>);
    expect(screen.getByText("10")).toBeVisible();
    expect(screen.getByText("20")).toBeVisible();
  });
});
