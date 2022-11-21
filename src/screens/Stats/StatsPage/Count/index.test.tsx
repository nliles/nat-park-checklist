import { render, screen } from "@testing-library/react";
import Count from ".";

describe("<Count />", () => {
  it("Displays the correct count", () => {
    render(<Count header="Total" count={5} total={20} />);
    expect(screen.getByText("Total")).toBeVisible();
    expect(screen.getByText("5")).toBeVisible();
    expect(screen.getByText("20")).toBeVisible();
  });
});
