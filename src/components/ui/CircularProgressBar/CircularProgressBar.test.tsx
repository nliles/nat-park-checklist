import { render, screen } from "@testing-library/react";
import CircularProgressBar from ".";

describe("<CircularProgressBar />", () => {
  it("Displays the correct percentage", () => {
    render(<CircularProgressBar percentage={50} />);
    expect(screen.getByText("50%")).toBeVisible();
  });
});
