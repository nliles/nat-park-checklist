import { act, render, screen } from "@testing-library/react";
import FormHelper from ".";

describe("<FormHelper />", () => {
  it("Displays success message", () => {
    render(<FormHelper id="1" success="Success!" />);
    expect(screen.getByText("Success!")).toBeVisible();
  });

  it("Displays error message", () => {
    render(<FormHelper id="1" error="Error!" />);
    expect(screen.getByText("Error!")).toBeVisible();
  });
});
