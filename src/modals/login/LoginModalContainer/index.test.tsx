import ReactDOM from "react-dom";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as reactRedux from "react-redux";
import * as authService from "services/auth.service";
import LoginModalContainer from "modals/login/LoginModalContainer";

jest.mock("services/auth.service");

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useSelector: jest.fn(),
}));

describe("<LoginModalContainer />", () => {
  const modalRoot = global.document.createElement("div");
  modalRoot.setAttribute("id", "modal-root");
  const body = global.document.querySelector("body");
  body?.appendChild(modalRoot);

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

  const setup = () => {
    const emailInput = screen.getByLabelText("Email");
    const passInput = screen.getByLabelText("Password");
    userEvent.paste(emailInput, "Test@gmail.com");
    userEvent.paste(passInput, "Test12345");
  };

  const onCloseSpy = jest.fn();
  const props = { onClose: onCloseSpy };

  const renderForm = () => {
    render(<LoginModalContainer {...props} />);
  };

  it("Toggles registration text", () => {
    render(<LoginModalContainer onClose={jest.fn()} />);
    expect(screen.getByText("Don't have an account?")).toBeVisible();
    userEvent.click(screen.getByRole("button", { name: "Sign up" }));
    expect(screen.getByText("Already have an account?")).toBeVisible();
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

    it("Calls login with the correct values", async () => {
      renderForm();
      setup();
      await waitFor(() =>
        expect(
          screen.getByRole("button", { name: "Sign in" })
        ).not.toBeDisabled()
      );
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
      renderForm();
      userEvent.click(screen.getByRole("button", { name: "Sign up" }));
      setup();
      await waitFor(() =>
        expect(
          screen.getByRole("button", { name: "Sign up" })
        ).not.toBeDisabled()
      );
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

  describe("Submit errors", () => {
    beforeEach(() => {
      jest
        .spyOn(authService, "login")
        .mockRejectedValue(new Error("Async error"));
    });
    it("Returns error message", async () => {
      renderForm();
      setup();
      await waitFor(() =>
        expect(
          screen.getByRole("button", { name: "Sign in" })
        ).not.toBeDisabled()
      );
      userEvent.click(screen.getByRole("button", { name: "Sign in" }));
      await waitFor(() => {
        expect(
          screen.getByText("Something went wrong. Please try again later.")
        ).toBeVisible();
      });
    });
  });
});
