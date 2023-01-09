import { render, screen } from "@testing-library/react";
import { useForm, FormProvider } from "react-hook-form";
import userEvent from "@testing-library/user-event";
import FormWrapper from "test-utils/FormWrapper"
import Input from ".";

describe("<Input />", () => {
  it("Displays correct label and placeholder", () => {
    render(
    <FormWrapper>
      <Input id="input" label="Email" formError="Error" />
    </FormWrapper>
    );
    expect(screen.getByLabelText("Email")).toBeVisible();
    expect(screen.getByPlaceholderText("Email")).toBeVisible();
  });
});
