import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useForm, FormProvider } from "react-hook-form";
import Checkbox from '.'

const getForm = () => {
  const methods = useForm({ defaultValues: [] });
  return (
    <FormProvider {...methods}>
      <form>
        <Checkbox id="1" label="Park" name="Park" />
      </form>
    </FormProvider>
  );
};

describe("<Checkbox />", () => {
  afterEach(cleanup);

  it("Displays the correct label", () => {
    render(getForm());
    expect(screen.getByLabelText("Park")).toBeVisible();
  });

  it("Toggles checkbox", () => {
    render(getForm());
    const checkbox = screen.getByLabelText("Park") as HTMLInputElement;
    userEvent.click(checkbox);
    expect(checkbox.checked).toBe(true);
    userEvent.click(checkbox);
    expect(checkbox.checked).toBe(false);
  });
});
