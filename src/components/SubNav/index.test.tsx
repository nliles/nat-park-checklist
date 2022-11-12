import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as reactRedux from "react-redux";
import SubNav from ".";

jest.mock("services/auth.service");

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useSelector: jest.fn(),
}));

describe("<SubNav />", () => {
  const mockUseDispatch = jest.spyOn(reactRedux, "useDispatch");
  const mockDispatch = jest.fn();

  beforeEach(() => {
    mockUseDispatch.mockReturnValue(mockDispatch);
  });

  it("Displays the correct content when showRegistration is false", async () => {
    render(<SubNav showMenu onClick={() => {}}/>);
    userEvent.click(screen.getByRole('button', { name: 'Logout'}));
    await waitFor(() => {
      expect(mockDispatch).toHaveBeenCalledWith({ type: "NOT_AUTHENTICATED"});
    });
  });
});
