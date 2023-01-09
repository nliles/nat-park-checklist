import { render, screen } from "@testing-library/react";
import { LoginModalProps } from "./types";
import LoginModal from "modals/login/LoginModal";

describe("<LoginModal />", () => {
  const baseProps = {
    handleOnSubmit: jest.fn(),
    handleButtonClick: jest.fn(),
    showRegistration: false,
  };

  const renderForm = (props?: Partial<LoginModalProps>) => {
    render(<LoginModal {...baseProps} {...props} />);
  };

  it("Displays the correct content when showRegistration is false", () => {
    renderForm();
    expect(screen.getByText("Sign in to save your progress.")).toBeVisible();
    expect(screen.getAllByRole("button")[0]).toHaveTextContent("Sign in");
    expect(screen.getByText("Don't have an account?")).toBeVisible();
    expect(screen.getAllByRole("button")[1]).toHaveTextContent("Sign up");
  });

  it("Displays the correct content when showRegistration is true", () => {
    renderForm({ showRegistration: true });
    expect(screen.getByText("Sign up to save your progress.")).toBeVisible();
    expect(screen.getAllByRole("button")[0]).toHaveTextContent("Sign up");
    expect(screen.getByText("Already have an account?")).toBeVisible();
    expect(screen.getAllByRole("button")[1]).toHaveTextContent("Sign in");
  });
});
