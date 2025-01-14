import React from 'react';
import { render, screen } from '@testing-library/react';
import RoutesComponent from './routes/router';

test('renders learn react link', () => {
  render(<RoutesComponent />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
