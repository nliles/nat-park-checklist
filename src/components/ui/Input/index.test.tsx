import { render, screen } from "@testing-library/react";
import { useForm, FormProvider } from "react-hook-form";
import userEvent from "@testing-library/user-event";
import Input from ".";

const Wrapper = () => {
  const methods = useForm({ defaultValues: { input: "" } });
  return (
    <FormProvider {...methods}>
      <form>
        <Input id="input" label="Email" formError="Error" />
      </form>
    </FormProvider>
  );
};

describe("<Input />", () => {
  it("Displays correct label and placeholder", () => {
    render(<Wrapper />);
    expect(screen.getByLabelText("Email")).toBeVisible();
    expect(screen.getByPlaceholderText("Email")).toBeVisible();
  });
});
