import React from "react";
import { defaultSelectedValues } from "../../../constants";
import { render, screen } from "@testing-library/react";
import DataBars from ".";
import { ParkData } from "types/park";

describe("<DataBars />", () => {
  const selected = {
    ...defaultSelectedValues,
    nationalPark: ["6DA17C86-088E-4B4D-B862-7C1BD5CF236B"],
    nationalReserve: ["C59FE971-54EE-447C-9DCE-CB781949B0B8"],
  };

  const parks = {
    nationalBattlefield: [],
    nationalBattlefieldPark: [],
    nationalBattlefieldSite: [],
    nationalMilitaryPark: [],
    nationalHistoricalPark: [],
    nationalHistoricSite: [],
    internationalHistoricSite: [],
    nationalLakeshore: [],
    nationalMemorial: [],
    nationalMonument: [],
    nationalParkway: [],
    nationalPreserve: [],
    nationalReserve: [],
    nationalRecreationArea: [],
    nationalRiver: [],
    nationalWildAndScenicRiver: [],
    nationalScenicTrail: [],
    nationalSeashore: [],
    otherDesignation: [],
    nationalPark: [
      {
        designation: "National Park",
        id: "6DA17C86-088E-4B4D-B862-7C1BD5CF236B",
        parkCode: "acad",
        states: "ME",
        fullName: "Acadia National Park",
        images: [],
        name: "Acadia",
        latitude: "44.409286",
        longitude: "-68.247501",
        url: "https://www.nps.gov/acad/index.htm",
      },
      {
        designation: "National Park",
        id: "36240051-018E-4915-B6EA-3F1A7F24FBE4",
        parkCode: "arch",
        states: "UT",
        fullName: "Arches National Park",
        images: [],
        name: "Arches",
        latitude: "38.72261844",
        longitude: "-109.5863666",
        url: "https://www.nps.gov/arch/index.htm",
      },
    ],
  };

  it("renders the correct data", () => {
    render(<DataBars selected={selected} parks={parks} />);
    expect(screen.getByText("National Parks")).toBeVisible();
    expect(screen.getAllByText("50%").length).toEqual(2);
  });
});
