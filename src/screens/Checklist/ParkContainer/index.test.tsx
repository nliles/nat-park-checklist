import { BrowserRouter } from "react-router-dom";
import { render, screen, waitFor } from "@testing-library/react";
import ParkContainer from 'screens/Checklist/ParkContainer';

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

describe('<ParkContainer/>', () => {
	it('Displays the correct default designation', () => {
		render(
			<BrowserRouter>
			  <ParkContainer />
			</BrowserRouter>
	);
		expect(
			screen.getByText(
				'National Parks'
			)
		).toBeVisible();
	});
});
