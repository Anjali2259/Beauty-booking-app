import React from 'react';
import { render, screen, within } from '@testing-library/react';
import App from './App';

// Basic smoke test for app rendering
it('renders the app brand in the header', () => {
  render(<App />);
  const header = screen.getByRole('banner');
  expect(within(header).getByText(/BeautyBook/i)).toBeInTheDocument();
});
