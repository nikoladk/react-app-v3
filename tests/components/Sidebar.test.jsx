import React from 'react';
import { describe, expect, it } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../../src/App.jsx';
import { renderWithProviders } from '../utils/render.jsx';
import { MOCK_USER } from '../../src/state/MockData.js';

describe('Sidebar (BDD)', () => {
  it('Given authenticated user, When app renders, Then sidebar navigation and logout exist', async () => {
    renderWithProviders(<App />, { route: '/dashboard', auth: { initialUser: MOCK_USER } });

    expect(screen.getByRole('link', { name: 'Dashboard' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Profile' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Orders' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Settings' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Logout' })).toBeInTheDocument();
  });

  it('Given authenticated user, When clicking Logout, Then user returns to login', async () => {
    const user = userEvent.setup();
    renderWithProviders(<App />, { route: '/dashboard', auth: { initialUser: MOCK_USER } });

    await user.click(screen.getByRole('button', { name: 'Logout' }));
    expect(await screen.findByRole('heading', { name: 'Login' })).toBeInTheDocument();
  });
});