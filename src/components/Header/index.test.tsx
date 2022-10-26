import { render, screen } from '@testing-library/react';
import Header from '.';

describe('<Header />', () => {
  it('Displays the correct header', () => {
    render(<Header title="National Parks" />);
    expect(screen.getByText('National Parks')).toBeVisible();
  });
});
