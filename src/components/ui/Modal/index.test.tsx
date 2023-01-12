import userEvent from '@testing-library/user-event';
import { render, screen } from "@testing-library/react";
import Modal from '.';

const onCloseMock = jest.fn();

const setup = () => {
	render(
		<Modal onClose={onCloseMock} modalLabel="test">
			<div>Hello world</div>
		</Modal>
	);
};

describe('<Modal>', () => {
  const modalRoot = global.document.createElement("div");
  modalRoot.setAttribute("id", "modal-root");
  const body = global.document.querySelector("body");
  body?.appendChild(modalRoot);

	it('renders children', async () => {
		setup();
		expect(await screen.findByText('Hello world')).toBeVisible();
	});

	it('calls onClose when clicking close button', () => {
		setup();
		userEvent.click(screen.getByRole('button'));
		expect(onCloseMock).toHaveBeenCalled();
	});
});
