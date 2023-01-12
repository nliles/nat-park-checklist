import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Avatar from ".";

describe("<Avatar />", () => {
  it("Displays the correct header", () => {
    const mockClick = jest.fn();
    render(<Avatar active handleClose={mockClick} />);
    userEvent.click(screen.getByRole("button"));
    expect(mockClick).toHaveBeenCalled();
  });
});
