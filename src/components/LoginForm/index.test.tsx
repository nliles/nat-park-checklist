import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as reactRedux from "react-redux";
import * as authService from "services/auth.service";
import LoginForm from ".";

jest.mock("services/auth.service");

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

describe("<LoginForm />", () => {
  const userRes = {
    user: {
      email: "test@test.com",
      token: "123",
    },
  };

  const mockUseDispatch = jest.spyOn(reactRedux, "useDispatch");
  const mockDispatch = jest.fn();

  beforeEach(() => {
    jest
      .spyOn(authService, "login")
      .mockImplementation(() => Promise.resolve(userRes));
    mockUseDispatch.mockReturnValue(mockDispatch);
  });

  it("Displays the correct content when show registration is false", () => {
    render(<LoginForm />);
    expect(screen.getByText("Don't have an account?")).toBeVisible();
    expect(screen.getAllByRole("button")[0]).toHaveTextContent("Sign in");
    expect(screen.getAllByRole("button")[1]).toHaveTextContent("Sign up");
  });

  it("Toggles registration text", () => {
    render(<LoginForm />);
    userEvent.click(screen.getByRole("button", { name: "Sign up" }));
    expect(screen.getByText("Already have an account?")).toBeVisible();
    expect(screen.getAllByRole("button")[0]).toHaveTextContent("Sign up");
    expect(screen.getAllByRole("button")[1]).toHaveTextContent("Sign in");
  });

  it("Disables submit button when email and password are blank", () => {
    render(<LoginForm />);
    expect(screen.getByRole("button", { name: "Sign in" })).toBeDisabled();
    const emailInput = screen.getByLabelText("Email");
    const passInput = screen.getByLabelText("Password");
    userEvent.type(emailInput, "Test@gmail.com");
    userEvent.type(passInput, "Test12345");
    expect(screen.getByRole("button", { name: "Sign in" })).not.toBeDisabled();
  });

  describe("Submit button", () => {
    beforeEach(() => {
      jest
        .spyOn(authService, "login")
        .mockImplementation(() => Promise.resolve(userRes));
      jest
        .spyOn(authService, "register")
        .mockImplementation(() => Promise.resolve(userRes));
      mockUseDispatch.mockReturnValue(mockDispatch);
    });

    const setup = () => {
      const emailInput = screen.getByLabelText("Email");
      const passInput = screen.getByLabelText("Password");
      userEvent.type(emailInput, "Test@gmail.com");
      userEvent.type(passInput, "Test12345");
    };

    it("Calls login with the correct values", async () => {
      render(<LoginForm />);
      setup();
      userEvent.click(screen.getByRole("button", { name: "Sign in" }));
      await waitFor(() =>
        expect(authService.login).toBeCalledWith({
          email: "test@gmail.com",
          password: "Test12345",
        })
      );
      expect(mockDispatch).toBeCalledWith({
        token: "123",
        type: "IS_AUTHENTICATED",
      });
    });

    it("Calls register with the correct values", async () => {
      render(<LoginForm />);
      userEvent.click(screen.getByRole("button", { name: "Sign up" }));
      setup();
      userEvent.click(screen.getByRole("button", { name: "Sign up" }));
      await waitFor(() =>
        expect(authService.register).toBeCalledWith({
          email: "test@gmail.com",
          password: "Test12345",
        })
      );
      expect(mockDispatch).toBeCalledWith({
        token: "123",
        type: "IS_AUTHENTICATED",
      });
    });
  });
});
