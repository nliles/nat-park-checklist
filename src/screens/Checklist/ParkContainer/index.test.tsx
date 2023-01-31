import { MemoryRouter } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import ParkContainer from 'screens/Checklist/ParkContainer';

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

describe('<ParkContainer/>', () => {
	it('Displays the correct default designation', () => {
		render(
			<MemoryRouter initialEntries={[{ pathname: '/' }]}>
			  <ParkContainer />
			</MemoryRouter>
	);
		expect(
			screen.getByText(
				'National Parks'
			)
		).toBeVisible();
	});

	it('Displays the correct designation from route', () => {
		render(
			<MemoryRouter initialEntries={[{ pathname: '/', search: '?designation=national-battlefield-park' }]}>
				<ParkContainer />
			</MemoryRouter>
	);
		expect(
			screen.getByText(
				'National Battlefield Parks'
			)
		).toBeVisible();
	});
});
