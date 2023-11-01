import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import LoginIcon from ".";

describe("<LoginIcon />", () => {
  it("Displays the correct header", () => {
    const mockClick = jest.fn();
    render(<LoginIcon handleClick={mockClick} />);
    userEvent.click(screen.getByRole("button"));
    expect(mockClick).toHaveBeenCalled();
  });
});
