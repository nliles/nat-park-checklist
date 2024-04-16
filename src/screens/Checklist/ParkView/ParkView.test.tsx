import { render, screen } from "@testing-library/react";
import ParkDesignation from "enum/ParkDesignation";
import FormWrapper from "test-utils/FormWrapper";
import FormProviderWrapper from "test-utils/FormProviderWrapper";
import { ParkViewProps } from ".";
import ParkView from ".";

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useDispatch: jest.fn(),
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

  const renderParkView = (props?: Partial<ParkViewProps>) => {
    render(
      <FormProviderWrapper>
        <ParkView
          parks={parks}
          isLoading={false}
          selectedDesignation={ParkDesignation.NAT_PARK}
          handleListItemChange={() => {}}
          handleOnSubmit={() => {}}
          {...props}
        />
      </FormProviderWrapper>
    );
  };

  it("Displays the correct content when isLoading is false", () => {
    renderParkView();
    expect(screen.getByText("1. Acadia National Park")).toBeVisible();
    expect(screen.getByText("2. Arches National Park")).toBeVisible();
  });

  it("Displays the correct content when isLoading is true", () => {
    renderParkView({ isLoading: true });
    expect(
      screen.queryByText("1. Acadia National Park")
    ).not.toBeInTheDocument();
    expect(
      screen.queryByText("2. Arches National Park")
    ).not.toBeInTheDocument();
  });
});
