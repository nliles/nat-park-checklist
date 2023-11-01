import { BrowserRouter } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import * as reactRedux from "react-redux";
import ProtectedRoute from ".";

jest.mock("react-redux", () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

describe("<NavBar />", () => {
  const useSelectorMock = jest.spyOn(reactRedux, "useSelector");

  beforeEach(() => {
    useSelectorMock.mockClear();
  });

  const renderComponent = () => {
    render(
      <BrowserRouter>
        <ProtectedRoute>
          <div>Howdy</div>
        </ProtectedRoute>
      </BrowserRouter>
    );
  };

  it("Routes a user to the home page if user is not logged in", () => {
    renderComponent();
    expect(screen.queryByText("Howdy")).not.toBeInTheDocument();
  });

  it("Displays the correct content if user is logged in", () => {
    useSelectorMock.mockReturnValue({ auth: { user: "123" } });
    renderComponent();
    expect(screen.getByText("Howdy")).toBeVisible();
  });
});
