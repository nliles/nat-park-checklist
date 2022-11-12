import React from "react";
import { Formik, Form } from "formik";
import { within, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Dropdown from ".";

describe("<Dropdown/>", () => {
  const items = ["Alaska", "California", "New York"];

  it("displays the correct default Dropdowned item", async () => {
    render(
      <Dropdown
        list={items}
        initialSelectedItem="California"
        handleClick={() => {}}
        formatListItem={(item) => item}
      />
    );
    expect(
      screen.getByRole("button", { name: "California" })
    ).toBeInTheDocument();
  });

  it("formats list items correctly", async () => {
    render(
      <Dropdown
        list={items}
        initialSelectedItem="California"
        handleClick={() => {}}
        formatListItem={(item) => item}
      />
    );
    const item = within(screen.getByRole("listbox")).getByText("New York");
    expect(item).toBeInTheDocument();
  });

  it("Calls handleClick on item click", async () => {
    const mockClick = jest.fn();
    render(
      <Dropdown
        list={items}
        initialSelectedItem="California"
        handleClick={mockClick}
        formatListItem={(item) => item}
      />
    );
    const item = within(screen.getByRole("listbox")).getByText("New York");
    userEvent.click(item);
    expect(mockClick).toHaveBeenCalledWith("New York");
  });
});
