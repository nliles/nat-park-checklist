import React from "react";
import { defaultSelectedValues } from "../../../constants";
import { render, screen } from "@testing-library/react";
import DataBars from ".";
import { parks } from "fixures/parks";

describe("<DataBars />", () => {
  const selected = {
    ...defaultSelectedValues,
    nationalPark: ["6DA17C86-088E-4B4D-B862-7C1BD5CF236B"],
    nationalReserve: ["C59FE971-54EE-447C-9DCE-CB781949B0B8"],
  };

  it("renders the correct data", () => {
    render(<DataBars selected={selected} parks={parks} />);
    expect(screen.getByText("National Parks")).toBeVisible();
    expect(screen.getAllByText("50%").length).toEqual(2);
  });
});
