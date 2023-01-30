import { render, screen } from "@testing-library/react";
import Tooltip from ".";

describe("<Tooltip />", () => {
  it("Displays the correct content", () => {
    render(<Tooltip hoverText="Hover over me" tooltipText="Tooltip"/>);
    expect(screen.getByText("Hover over me")).toBeVisible();
  });
});
