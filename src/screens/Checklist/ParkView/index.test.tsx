import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ParkViewProps } from "./types";
import ParkView from ".";

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useSelector: jest.fn(),
}));

describe("<ParkView />", () => {
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

  const renderParkView = (props?: Partial<ParkViewProps>) => {
    render(
      <ParkView
        parks={parks}
        loading={false}
        selectedDropdownItem="nationalPark"
        initialValues={[]}
        handleOnChange={mockFn}
        handleListItemChange={() => {}}
        handleSubmit={() => {}}
        {...props}
      />
    );
  };

  it("Displays the correct content when loading is false", () => {
    renderParkView();
    expect(
      screen.getByRole("button", { name: "National Parks" })
    ).toBeVisible();
    expect(screen.getByRole("link", { name: "1" })).toBeVisible();
    expect(screen.getAllByRole("link", { name: "2" })[0]).toBeVisible();
    expect(screen.getByText("1. Acadia National Park")).toBeVisible();
    expect(screen.getByText("2. Arches National Park")).toBeVisible();
  });

  it("Displays the correct content when loading is true", () => {
    renderParkView({ loading: true });
    expect(
      screen.queryByRole("button", { name: "National Parks" })
    ).not.toBeInTheDocument();
    expect(screen.queryAllByText("1").length).toEqual(0);
    expect(screen.queryAllByText("2").length).toEqual(0);
    expect(
      screen.queryByText("1. Acadia National Park")
    ).not.toBeInTheDocument();
    expect(
      screen.queryByText("2. Arches National Park")
    ).not.toBeInTheDocument();
  });
});
