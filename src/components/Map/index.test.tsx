import { render, screen, fireEvent } from "@testing-library/react";
import Map from ".";

describe("<Map />", () => {
  const mockMouseOver = jest.fn();
  const mockMouseLeave = jest.fn();

  const parks = [
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
  ];

  const renderMap = () => {
    render(<Map parks={parks} selectedParks={[]} showTree />);
  };

  it("Displays the correct content", () => {
    renderMap();
    expect(screen.getByText("1")).toBeVisible();
    expect(screen.getByText("1").closest("a")).toHaveAttribute(
      "href",
      "https://www.nps.gov/acad/index.htm"
    );
    expect(screen.getByText("2")).toBeVisible();
    expect(screen.getByText("2").closest("a")).toHaveAttribute(
      "href",
      "https://www.nps.gov/arch/index.htm"
    );
  });

  it("Displays tooltip onMouseOver and hides tooltip onMouseOut", () => {
    renderMap();
    fireEvent.mouseOver(screen.getByText("1"));
    expect(screen.getByText("Acadia")).toBeVisible();
    fireEvent.mouseOut(screen.getByText("1"));
    expect(screen.queryByText("Acadia")).not.toBeVisible();
  });
});
