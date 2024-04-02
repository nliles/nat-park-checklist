import { render, screen } from "@testing-library/react";
import PageWrapper from ".";

jest.mock("react-redux", () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

describe("<PageWrapper />", () => {
  it("Displays the correct content", () => {
    render(
      <PageWrapper>
        <div>hi</div>
      </PageWrapper>
    );
    expect(screen.getByText("hi")).toBeVisible();
  });
});
