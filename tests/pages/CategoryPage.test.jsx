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

    expect(screen.getByRole('heading', { name: 'Shoes' })).toBeInTheDocument();
    expect(screen.getByText('Welcome to the Shoes section.')).toBeInTheDocument();
    expect(screen.getByText('Items: 13')).toBeInTheDocument();
  });

  it('Given category page, When adding to cart, Then cart counter increments and toast is shown', async () => {
    const user = userEvent.setup();
    renderWithProviders(<App />, {
      route: '/category/shoes',
      auth: { initialUser: adminUser },
      cart: { initialCount: 0 },
    });

    await user.click(screen.getAllByRole('button', { name: 'Add to cart' })[0]);

    expect(await screen.findByText('Item added to cart.')).toBeInTheDocument();
  });

  it('Given shoes page, When switching to clothes, Then only clothes content remains', async () => {
    const user = userEvent.setup();
    renderWithProviders(<App />, { route: '/category/shoes', auth: { initialUser: adminUser } });

    expect(screen.getByText('Welcome to the Shoes section.')).toBeInTheDocument();

    await user.click(screen.getByRole('link', { name: 'Clothes' }));

    expect(await screen.findByText('Welcome to the Clothes section.')).toBeInTheDocument();
    expect(screen.queryByText('Welcome to the Shoes section.')).not.toBeInTheDocument();
  });
});