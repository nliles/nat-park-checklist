import { render, screen } from "@testing-library/react";
import PageWrapper from ".";

jest.mock("react-redux", () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

describe("<PageWrapper />", () => {
  it("Displays the correct content", () => {
    render(
      <PageWrapper count={10}>
        <div>hi</div>
      </PageWrapper>
    );
    expect(screen.getByText("hi")).toBeVisible();
    expect(screen.getByText("10")).toBeVisible();
  });
});
