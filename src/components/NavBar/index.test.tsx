import { render, screen } from "@testing-library/react";
import NavBar from ".";

jest.mock("react-redux", () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

describe("<NavBar />", () => {
  it("Displays the correct content", () => {
    render(<NavBar count={10} />);
    expect(screen.getByText("National Park Unit Checklist")).toBeVisible();
    expect(screen.getByText("10")).toBeVisible();
  });

  it("Displays the correct content when user not logged in", () => {
    render(<NavBar />);
    expect(screen.getByText("Sign in")).toBeVisible();
  });
});
