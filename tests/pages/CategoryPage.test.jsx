import React from 'react';
import { describe, expect, it } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../../src/App.jsx';
import { renderWithProviders } from '../utils/render.jsx';

const adminUser = { username: 'admin', email: 'admin@example.com' };

describe('Category pages (BDD)', () => {
  it('Given shoes route, When page renders, Then shoes message and counter are shown', async () => {
    renderWithProviders(<App />, { route: '/category/shoes', auth: { initialUser: adminUser } });

    expect(screen.getByRole('heading', { name: /shoes/i })).toBeInTheDocument();
    expect(screen.getByText('Welcome to Shoes section.')).toBeInTheDocument();
    expect(screen.getByText('Items: 12')).toBeInTheDocument();
  });

  it('Given category page, When adding to cart, Then cart counter increments and toast is shown', async () => {
    const user = userEvent.setup();
    renderWithProviders(<App />, { route: '/category/shoes', auth: { initialUser: adminUser }, cart: { initialCount: 0 } });

    expect(screen.getByLabelText(/0 cart items/i)).toBeInTheDocument();
    await user.click(screen.getAllByRole('button', { name: /add to cart/i })[0]);
    expect(screen.getByLabelText(/1 cart items/i)).toBeInTheDocument();
    expect(screen.getByText('Item added to cart.')).toBeInTheDocument();
  });

  it('Given shoes page, When switching to clothes, Then only clothes content remains', async () => {
    const user = userEvent.setup();
    renderWithProviders(<App />, { route: '/category/shoes', auth: { initialUser: adminUser } });

    expect(screen.getByText('Welcome to Shoes section.')).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: /clothes/i }));

    expect(await screen.findByText('Welcome to the Clothes section.')).toBeInTheDocument();
    expect(screen.queryByText('Welcome to Shoes section.')).not.toBeInTheDocument();
  });

  it('Given unknown category key, When page renders, Then "Unknown category." error is shown', () => {
    renderWithProviders(<App />, { route: '/category/nonexistent', auth: { initialUser: adminUser } });

    expect(screen.getByRole('heading', { name: /category/i })).toBeInTheDocument();
    expect(screen.getByText('Unknown category.')).toBeInTheDocument();
  });
});