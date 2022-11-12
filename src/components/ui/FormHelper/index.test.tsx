import { act, render, screen } from "@testing-library/react";
import FormHelper from ".";

describe("<FormHelper />", () => {
  beforeEach(() => {
		jest.useFakeTimers();
	});

  it("Displays success message", () => {
    render(<FormHelper id='1' success="Success!"/>);
    expect(screen.getByText("Success!")).toBeVisible();
  });

  it("Displays error message", () => {
    render(<FormHelper id='1' error="Error!"/>);
    expect(screen.getByText("Error!")).toBeVisible();
  });

  it("Clears message after delay", () => {
    render(<FormHelper id='1' success="Success!" delay={3}/>);
    expect(screen.getByText("Success!")).toBeVisible();
    act(() => jest.advanceTimersByTime(3000));
    expect(screen.queryByText("Success!")).not.toBeInTheDocument();
  });
});
