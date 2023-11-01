import { render, screen } from "@testing-library/react";
import CircularProgressBar from ".";

describe("<CircularProgressBar />", () => {
  it("Displays the correct percentage", () => {
    render(<CircularProgressBar count={10} total={20} />);
    expect(screen.getByText("50%")).toBeVisible();
  });
});
