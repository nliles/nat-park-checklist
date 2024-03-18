import { render, screen } from "@testing-library/react";
import { defaultSelectedValues } from 'hooks/useSelectedParks'
import StatsPage from ".";

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useSelector: jest.fn(),
}));

describe("<StatsPage />", () => {
  const selected = {
    ...defaultSelectedValues,
    nationalPark: ["6DA17C86-088E-4B4D-B862-7C1BD5CF236B"],
  };

  const renderStatsPage = () => {
    render(<StatsPage parks={[]} selected={selected} />);
  };

  it("Displays the correct content", () => {
    renderStatsPage();
    expect(screen.getByText("NPS units visited")).toBeVisible();
    expect(screen.getAllByText("1").length).toEqual(3);
    expect(screen.getAllByText("423").length).toEqual(2);
  });
});
