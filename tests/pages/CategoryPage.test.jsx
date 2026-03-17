import React from 'react';
import { describe, expect, it } from 'vitest';
import { screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../../src/App.jsx';
import { renderWithProviders } from '../utils/render.jsx';

const adminUser = { username: 'admin', email: 'admin@example.com' };

describe('Category pages (BDD)', () => {
  it('Given shoes route, When page renders, Then shoes message and counter are shown', async () => {
    renderWithProviders(<App />, { route: '/category/shoes', auth: { initialUser: adminUser } });

    expect(await screen.findByRole('heading', { name: 'Shoes' })).toBeInTheDocument();
    expect(screen.getByText('Welcome to Shoes section.')).toBeInTheDocument();
    expect(screen.getByText('Items: 12')).toBeInTheDocument();
  });

  it('Given category page, When adding to cart, Then cart counter increments and toast is shown', async () => {
    const user = userEvent.setup();
    renderWithProviders(<App />, {
      route: '/category/shoes',
      auth: { initialUser: adminUser },
      cart: { initialCount: 0 },
    });

    const cartCountLabel = '0 cart items';
    const cartButton = (await screen.findByLabelText(cartCountLabel)).closest('button');
    expect(cartButton).toBeTruthy();

    await user.click(screen.getAllByRole('button', { name: /add to cart/i })[0]);

    expect(await screen.findByLabelText('1 cart items')).toBeInTheDocument();
    expect(await screen.findByText('Item added to cart.')).toBeInTheDocument();
  });

  it('Given shoes page, When switching to clothes, Then only clothes content remains', async () => {
    const user = userEvent.setup();
    renderWithProviders(<App />, { route: '/category/shoes', auth: { initialUser: adminUser } });

    expect(await screen.findByText('Welcome to Shoes section.')).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'Clothes' }));

    expect(await screen.findByText('Welcome to Clothes section.')).toBeInTheDocument();
    expect(screen.queryByText('Welcome to Shoes section.')).not.toBeInTheDocument();
  });

  it('Given unknown category key, When page renders, Then "Unknown category." error is shown', async () => {
    renderWithProviders(<App />, { route: '/category/nonexistent', auth: { initialUser: adminUser } });

    expect(await screen.findByRole('heading', { name: 'Category' })).toBeInTheDocument();
    expect(screen.getByText('Unknown category.')).toBeInTheDocument();
  });
});