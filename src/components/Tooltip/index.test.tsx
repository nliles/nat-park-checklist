import { render, screen, fireEvent } from "@testing-library/react";
import Tooltip from ".";

describe("<Tooltip />", () => {
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
  const coords = [940.8876413605099, 112.63387243845239];
  it("Displays the correct content", () => {
    render(
      <Tooltip
        park={park}
        coords={coords}
        tooltipId="1"
        setTooltipContent={() => {}}
      />
    );
    expect(screen.getByText("Acadia National Park")).toBeVisible();
    expect(screen.getByText("State: ME")).toBeVisible();
  });

  it("Call mockOnChange onClick", () => {
    const mockFn = jest.fn();
    render(
      <Tooltip
        park={park}
        coords={coords}
        tooltipId="1"
        setTooltipContent={mockFn}
      />
    );
    fireEvent.keyDown(screen.getByText("Acadia National Park"), {
      key: "Escape",
      code: "Escape",
      keyCode: 27,
      charCode: 27,
    });
    expect(mockFn).toHaveBeenCalledWith(undefined);
  });
});
