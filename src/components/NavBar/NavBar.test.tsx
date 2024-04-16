import { render, screen } from "@testing-library/react";
import * as reactRedux from "react-redux";
import NavBar from ".";

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useDispatch: jest.fn(),
}));

describe("<NavBar />", () => {
  const useSelectorMock = jest.spyOn(reactRedux, "useSelector");

  beforeEach(() => {
    useSelectorMock.mockClear();
  });

  it("Home page link", () => {
    render(<NavBar />);
    expect(screen.getByText("NPS Unit Checklist").closest("a")).toHaveAttribute(
      "href",
      "/"
    );
  });

  it("Displays the correct content when user is logged out", () => {
    render(<NavBar />);
    expect(screen.getByText("Sign in")).toBeVisible();
  });

  it("Displays the correct content when user is logged in", () => {
    useSelectorMock.mockReturnValue({ auth: { user: "123" } });
    render(<NavBar />);
    expect(screen.getByAltText("Kelso Dunes")).toBeVisible();
  });
});
