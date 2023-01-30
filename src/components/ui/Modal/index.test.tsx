import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";
import renderModal from "test-utils/renderModal";

import Modal from ".";

const onCloseMock = jest.fn();

const setup = () => {
  render(
    <Modal onClose={onCloseMock} modalLabel="test">
      <div>Hello world</div>
    </Modal>
  );
};

describe("<Modal>", () => {
  renderModal();

  it("renders children", async () => {
    setup();
    expect(await screen.findByText("Hello world")).toBeVisible();
  });

  it("calls onClose when clicking close button", () => {
    setup();
    userEvent.click(screen.getByRole("button"));
    expect(onCloseMock).toHaveBeenCalled();
  });
});
