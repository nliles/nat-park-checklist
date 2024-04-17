import React from "react";
import { render, screen } from "@testing-library/react";
import { defaultSelectedValues } from "../../../constants";
import { parks } from "fixures/parks";
import DataTable from ".";

describe("<DataTable />", () => {
  const parkData = {
    ...defaultSelectedValues,
    nationalPark: [
      "6DA17C86-088E-4B4D-B862-7C1BD5CF236B",
      "36240051-018E-4915-B6EA-3F1A7F24FBE4",
    ],
    nationalReserve: ["C59FE971-54EE-447C-9DCE-CB781949B0B8"],
  };

  it("Displays the correct visited and total per count per park", () => {
    render(<DataTable selected={parkData} parks={parks} total={429} />);
    expect(screen.getByText("3")).toBeVisible();
    expect(screen.getByText("429")).toBeVisible();
  });

  it("Displays the correct total visited and total count", () => {
    render(<DataTable selected={parkData} parks={parks} total={429} />);
    expect(screen.getAllByText("2").length).toEqual(2);
  });
});
