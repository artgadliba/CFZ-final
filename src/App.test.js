import { render, screen } from '@testing-library/react';
import App from './App';

test('renders button contain Mint', () => {
  render(<App/>);
  const mainButton = screen.getByText(/Mint/i);
  expect(mainButton).toBeInTheDocument();
});
