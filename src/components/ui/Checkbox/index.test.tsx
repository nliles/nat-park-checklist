import { ReactNode } from "react";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useForm, FormProvider } from "react-hook-form";
import FormWrapper from "test-utils/FormWrapper";
import Checkbox from ".";

const getForm = () => {
  render(
    <FormWrapper>
      <Checkbox id="1" label="Park" name="Park" handleOnChange={() => {}} />
    </FormWrapper>
  );
};

describe("<Checkbox />", () => {
  afterEach(cleanup);

  it("Displays the correct label", () => {
    getForm();
    expect(screen.getByLabelText("Park")).toBeVisible();
  });

  it("Toggles checkbox", () => {
    getForm();
    const checkbox = screen.getByLabelText("Park") as HTMLInputElement;
    userEvent.click(checkbox);
    expect(checkbox.checked).toBe(true);
    userEvent.click(checkbox);
    expect(checkbox.checked).toBe(false);
  });
});
