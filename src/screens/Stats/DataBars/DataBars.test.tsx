import React from "react";
import { defaultSelectedValues } from "../../../constants";
import { render, screen } from "@testing-library/react";
import DataBars from ".";

describe("<DataBars />", () => {
  const parkData = {
    ...defaultSelectedValues,
    nationalPark: [
      "6DA17C86-088E-4B4D-B862-7C1BD5CF236B",
      "C9056F71-7162-4208-8AE9-2D0AEFA594FD",
      "6A1737A1-6848-4087-AAF7-68A427247357",
    ],
    nationalReserve: ["C59FE971-54EE-447C-9DCE-CB781949B0B8"],
  };

  it.each([
    ["National Parks", "5%"],
    ["National Reserves", "50%"],
  ])("renders the correct data", (name, percentage) => {
    render(<DataBars selected={parkData} />);
    expect(screen.getByText(name)).toBeVisible();
    expect(screen.getAllByText(percentage)[0]).toBeVisible();
  });
});
