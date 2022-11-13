import { render, screen, fireEvent } from "@testing-library/react";
import MapMarker from ".";

describe("<MapMarker />", () => {
  const mockMouseOver = jest.fn();
  const mockMouseLeave = jest.fn();
  const park = {
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
  };
  const renderMapMarker = () => {
    render(
      <MapMarker
        park={park}
        coords={[940.8876413605099, 112.63387243845239]}
        number={1}
        tooltipName="tooltip"
        showTree
        isSelected
        handleMouseOver={mockMouseOver}
        handleMouseLeave={mockMouseLeave}
      />
    );
  };

  it("Displays the correct content when showTree is true", () => {
    renderMapMarker();
    expect(screen.getByText("1")).toBeVisible();
    expect(screen.getByText("1").closest("a")).toHaveAttribute(
      "href",
      "https://www.nps.gov/acad/index.htm"
    );
  });

  it("Calls mockMouseOver on mouseOver", () => {
    renderMapMarker();
    fireEvent.mouseOver(screen.getByText("1"));
    expect(mockMouseOver).toHaveBeenCalledWith(park);
  });

  it("Calls mockMouseLeave on mouseLeave", () => {
    renderMapMarker();
    fireEvent.mouseLeave(screen.getByText("1"));
    expect(mockMouseLeave).toHaveBeenCalledWith();
  });
});
