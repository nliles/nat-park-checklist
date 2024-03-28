import { render, screen } from "@testing-library/react";
import Count from ".";

describe("<Count />", () => {
  it("Displays the correct count", () => {
    render(<Count percentage={25} />);
    expect(screen.getByText("Total")).toBeVisible();
    expect(screen.getByText("25%")).toBeVisible();
  });
});
