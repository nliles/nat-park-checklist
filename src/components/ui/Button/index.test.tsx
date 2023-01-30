import { render, screen } from "@testing-library/react";
import Button from ".";

describe("<Button />", () => {
  it("Displays the correct button text", () => {
    render(<Button txt="Submit" />);
    expect(screen.getByText("Submit")).toBeVisible();
  });

  it("Disables button when disabled prop is true", () => {
    render(<Button txt="Submit" disabled={true} />);
    expect(screen.getByText("Submit").closest("button")).toBeDisabled();
  });
});
