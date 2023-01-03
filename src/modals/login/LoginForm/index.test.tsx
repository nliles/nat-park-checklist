import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as reactRedux from "react-redux";
import * as authService from "services/auth.service";
import { LoginFormProps } from "./types";
import LoginForm from ".";

describe("<LoginForm />", () => {
  const mockSubmit = jest.fn(() => console.log("mock!!!"));

  const setup = () => {
    const emailInput = screen.getByLabelText("Email");
    const passInput = screen.getByLabelText("Password");
    userEvent.paste(emailInput, "Test@gmail.com");
    userEvent.paste(passInput, "Test12345");
  };

  const getProps = (props?: Partial<LoginFormProps>) => ({
    showRegistration: false,
    handleOnSubmit: mockSubmit,
    ...props,
  });

  it("Displays the correct content when showRegistration is false", () => {
    render(<LoginForm {...getProps()} />);
    expect(screen.getByRole("button", { name: "Sign in" })).toBeVisible();
  });

  it("Displays the correct content when showRegistration is true", () => {
    render(<LoginForm {...getProps({ showRegistration: true })} />);
    expect(screen.getByRole("button", { name: "Sign up" })).toBeVisible();
  });

  it("Disables submit button when email and password are blank", () => {
    render(<LoginForm {...getProps()} />);
    expect(screen.getByRole("button", { name: "Sign in" })).toBeDisabled();
    setup();
    waitFor(() =>
      expect(screen.getByRole("button", { name: "Sign in" })).not.toBeDisabled()
    );
  });

  it("Displays form errors", async () => {
    render(<LoginForm {...getProps({ formError: "form error" })} />);
    expect(screen.getByText("form error")).toBeVisible();
  });

  it("Calls handleOnSubmit with the correct values", async () => {
    render(<LoginForm {...getProps()} />);
    setup();
    await waitFor(() =>
      expect(screen.getByRole("button", { name: "Sign in" })).not.toBeDisabled()
    );
    userEvent.click(screen.getByRole("button", { name: "Sign in" }));
    await waitFor(() => expect(mockSubmit).toHaveBeenCalled());
  });
});
