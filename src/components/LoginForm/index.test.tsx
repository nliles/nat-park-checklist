import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as reactRedux from 'react-redux';
import LoginForm from ".";

jest.mock("react-redux", () => ({
    ...jest.requireActual("react-redux"),
    useDispatch: jest.fn(),
    useSelector: jest.fn(),
}));

describe("<LoginForm />", () => {
  it("Displays the correct content when show registration is false", () => {
    render(<LoginForm />);
    expect(screen.getByText("Don't have an account?")).toBeVisible();
    expect(screen.getAllByRole("button")[0]).toHaveTextContent('Sign in')
    expect(screen.getAllByRole("button")[1]).toHaveTextContent('Sign up')
  });

  it("Toggles registration text", () => {
    render(<LoginForm />);
    userEvent.click(screen.getByRole("button", { name: 'Sign up'}))
    expect(screen.getByText("Already have an account?")).toBeVisible();
    expect(screen.getAllByRole("button")[0]).toHaveTextContent('Sign up')
    expect(screen.getAllByRole("button")[1]).toHaveTextContent('Sign in')
  });

  it("Disables submit button when email and password are blank", () => {
    render(<LoginForm />);
    expect(screen.getByRole("button", { name: 'Sign in'})).toBeDisabled();
    const emailInput = screen.getByLabelText("Email")
    const passInput = screen.getByLabelText("Password")
    userEvent.type(emailInput, 'Test@gmail.com');
    userEvent.type(passInput, 'Test12345');
    expect(screen.getByRole("button", { name: 'Sign in'})).not.toBeDisabled();
  });
});
