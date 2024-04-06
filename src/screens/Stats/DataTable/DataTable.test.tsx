import React from "react";
import { render, screen } from "@testing-library/react";
import { defaultSelectedValues } from "hooks/useSelectedParks";
import DataTable from ".";

describe("<DataTable />", () => {
  const parkData = {
    ...defaultSelectedValues,
    nationalPark: [
      "6DA17C86-088E-4B4D-B862-7C1BD5CF236B",
      "C9056F71-7162-4208-8AE9-2D0AEFA594FD",
      "6A1737A1-6848-4087-AAF7-68A427247357",
    ],
    nationalReserve: ["C59FE971-54EE-447C-9DCE-CB781949B0B8"],
  };

  it("Displays the correct count and total", () => {
    render(<DataTable selected={parkData} total={429} />);
    expect(screen.getByText("4")).toBeVisible();
    expect(screen.getByText("429")).toBeVisible();
  });

  it.each([
    ["National Park", "3"],
    ["National Reserve", "2"],
  ])("renders the correct data", (name, parkCount) => {
    render(<DataTable selected={parkData} total={423} />);
    expect(screen.getByText(name)).toBeVisible();
    expect(screen.getByText(parkCount)).toBeVisible();
  });
});
