import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { useForm, FormProvider } from "react-hook-form";
import userEvent from "@testing-library/user-event";
import Input from ".";

const getForm = () => {
  const methods = useForm({ defaultValues: {} });
  return (
    <FormProvider {...methods}>
      <form>
        <Input id="1" label="Email" formError="Error" />
      </form>
    </FormProvider>
  );
};

describe("<Input />", () => {
  it("Displays correct label and placeholder", () => {
    render(getForm());
    expect(screen.getByLabelText("Email")).toBeVisible();
    expect(screen.getByPlaceholderText("Email")).toBeVisible();
  });
});
