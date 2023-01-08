import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as reactRedux from "react-redux";
import * as authService from "services/auth.service";
import { LoginModalProps } from "./types";
import LoginForm from ".";

jest.mock("services/auth.service");

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useSelector: jest.fn(),
}));

describe("<LoginForm />", () => {
  const userRes = {
    user: {
      email: "test@test.com",
      token: "123",
    },
  };

  const setup = () => {
    const emailInput = screen.getByLabelText("Email");
    const passInput = screen.getByLabelText("Password");
    userEvent.paste(emailInput, "Test@gmail.com");
    userEvent.paste(passInput, "Test12345");
  };

  const baseProps = {
    handleOnSubmit: jest.fn,
    handleButtonClick: jest.fn,
    showRegistration: false,
  };

  const renderForm = (props?: Partial<LoginModalProps>) => {
    render(<LoginForm {...props} {...baseProps} />);
  };

  it("Displays the correct content when showRegistration is false", () => {
    renderForm();
    expect(screen.getByText("Sign in to save your progress")).toBeVisible();
    expect(screen.getAllByRole("button")[1]).toHaveTextContent("Sign up");
    expect(screen.getByText("Already have an account?")).toBeVisible();
  });

  it("Displays the correct content when showRegistration is true", () => {
    renderForm();
    expect(screen.getByText("Sign up to save your progress")).toBeVisible();
    expect(screen.getAllByRole("button")[1]).toHaveTextContent("Sign up");
    expect(screen.getByText("Don't have an account?")).toBeVisible();
  });

  // it("Toggles registration text", () => {
  //   renderForm();
  //   userEvent.click(screen.getByRole("button", { name: "Sign up" }));
  //   expect(screen.getByText("Already have an account?")).toBeVisible();
  //   expect(screen.getAllByRole("button")[1]).toHaveTextContent("Sign in");
  // });

  // describe("Submit button", () => {
  //   it("Calls login with the correct values", async () => {
  //     renderForm();
  //     setup();
  //     await waitFor(() =>
  //       expect(
  //         screen.getByRole("button", { name: "Sign in" })
  //       ).not.toBeDisabled()
  //     );
  //
  //     userEvent.click(screen.getByRole("button", { name: "Sign in" }));
  //     await waitFor(() =>
  //       expect(authService.login).toBeCalledWith({
  //         email: "test@gmail.com",
  //         password: "Test12345",
  //       })
  //     );
  //     expect(mockDispatch).toBeCalledWith({
  //       token: "123",
  //       type: "IS_AUTHENTICATED",
  //     });
  //   });
  //
  //   it("Calls register with the correct values", async () => {
  //     renderForm();
  //     userEvent.click(screen.getByRole("button", { name: "Sign up" }));
  //     setup();
  //     await waitFor(() =>
  //       expect(
  //         screen.getByRole("button", { name: "Sign up" })
  //       ).not.toBeDisabled()
  //     );
  //     userEvent.click(screen.getByRole("button", { name: "Sign up" }));
  //     await waitFor(() =>
  //       expect(authService.register).toBeCalledWith({
  //         email: "test@gmail.com",
  //         password: "Test12345",
  //       })
  //     );
  //     expect(mockDispatch).toBeCalledWith({
  //       token: "123",
  //       type: "IS_AUTHENTICATED",
  //     });
  //   });
  // });

  // describe("Submit errors", () => {
  //   it("Returns error message", async () => {
  //     renderForm();
  //     setup();
  //     await waitFor(() =>
  //       expect(
  //         screen.getByRole("button", { name: "Sign in" })
  //       ).not.toBeDisabled()
  //     );
  //     userEvent.click(screen.getByRole("button", { name: "Sign in" }));
  //     await waitFor(() => {
  //       expect(
  //         screen.getByText("Something went wrong. Please try again later.")
  //       ).toBeVisible();
  //     });
  //   });
  // });
});
