import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import List from ".";

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useSelector: jest.fn(),
}));

describe("<List />", () => {
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

  const mockFn = jest.fn();

  const renderList = () => {
    render(
      <List
        parks={parks}
        selectedDropdownItem="nationalPark"
        initialParkValues={[]}
        handleOnChange={mockFn}
        handleOnSubmit={() => {}}
        setSaveFormRes={() => {}}
      />
    );
  };

  it("Displays the correct content", () => {
    renderList();
    expect(screen.getByText("National Park checklist")).toBeVisible();
    expect(screen.getByText("0")).toBeVisible();
    expect(screen.getByText("2")).toBeVisible();
    expect(screen.getByText("1. Acadia National Park")).toBeVisible();
    expect(screen.getByText("2. Arches National Park")).toBeVisible();
  });

  it("Calls handleOnChange", () => {
    renderList();
    waitFor(() => userEvent.click(screen.getByText("1. Acadia National Park")));
    expect(mockFn).toHaveBeenCalled();
  });
});
