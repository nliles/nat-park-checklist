import React from "react";
import { within, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Dropdown from ".";

describe("<Dropdown/>", () => {
  const items = [
    { name: "Alaska", value: "AK" },
    { name: "California", value: "CA" },
    { name: "New York", value: "NY" },
  ];

  it("displays the correct default Dropdowned item", async () => {
    render(
      <Dropdown
        items={items}
        initialSelectedItem="California"
        handleClick={() => {}}
        formatListItem={(item) => item}
        keyValue="state"
      />
    );
    expect(
      screen.getByRole("button", { name: "California" })
    ).toBeInTheDocument();
  });

  it("formats list items correctly", async () => {
    render(
      <Dropdown
        items={items}
        initialSelectedItem="California"
        handleClick={() => {}}
        formatListItem={(item) => item}
        keyValue="state"
      />
    );
    const item = within(screen.getByRole("listbox")).getByText("New York");
    expect(item).toBeInTheDocument();
  });

  it("Calls handleClick on item click", async () => {
    const mockClick = jest.fn();
    render(
      <Dropdown
        items={items}
        initialSelectedItem="California"
        handleClick={mockClick}
        formatListItem={(item) => item}
        keyValue="state"
      />
    );
    const item = within(screen.getByRole("listbox")).getByText("New York");
    userEvent.click(item);
    expect(mockClick).toHaveBeenCalledWith("New York");
  });
});
