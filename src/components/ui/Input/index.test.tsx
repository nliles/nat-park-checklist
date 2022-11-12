import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { Formik, Form } from "formik";
import userEvent from "@testing-library/user-event";
import Input from ".";

const getForm = () => (
  <Formik enableReinitialize onSubmit={() => {}} initialValues={{}}>
    {() => (
      <Form>
        <Input id='1' label="Email" formError="Error"/>
      </Form>
    )}
  </Formik>
);

describe("<Input />", () => {
  it("Displays correct label and placeholder", () => {
    render(getForm());
    expect(screen.getByLabelText("Email")).toBeVisible();
    expect(screen.getByPlaceholderText("Email")).toBeVisible();
  });
});
