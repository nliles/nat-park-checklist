import { act, cleanup, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Formik, Form } from "formik";
import Checkbox from ".";

const mockOnChange = jest.fn();

const getForm = () => (
  <Formik enableReinitialize onSubmit={() => {}} initialValues={{}}>
    {() => (
      <Form>
        <Checkbox id="1" label="Park" name="Park" handleChange={mockOnChange} />
      </Form>
    )}
  </Formik>
);

describe("<Checkbox />", () => {
  afterEach(cleanup);

  it("Displays the correct label", () => {
    render(getForm());
    expect(screen.getByLabelText("Park")).toBeVisible();
  });

  it("Call mockOnChange onClick", () => {
    render(getForm());
    userEvent.click(screen.getByLabelText("Park"));
    expect(mockOnChange).toHaveBeenCalledWith(["1"]);
  });

  fit("Toggles checkbox", () => {
    render(getForm());
    const checkbox = screen.getByLabelText("Park") as HTMLInputElement;
    userEvent.click(checkbox);
    expect(checkbox.checked).toBe(true);
    userEvent.click(checkbox);
    expect(checkbox.checked).toBe(false);
  });
});
