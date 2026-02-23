import React from 'react';
import { describe, expect, it } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../../src/App.jsx';
import { renderWithProviders } from '../utils/render.jsx';

describe('LoginPage (BDD)', () => {
  it('Given empty form, When clicking Login, Then required field errors are shown', async () => {
    const user = userEvent.setup();
    renderWithProviders(<App />, { route: '/login' });

    await user.click(screen.getByRole('button', { name: 'Login' }));

    expect(screen.getByText('Username is required.')).toBeInTheDocument();
    expect(screen.getByText('Password is required.')).toBeInTheDocument();
  });

  it('Given password hidden, When toggling, Then input type changes', async () => {
    const user = userEvent.setup();
    renderWithProviders(<App />, { route: '/login' });

    const passwordInput = screen.getByLabelText('Password');
    expect(passwordInput).toHaveAttribute('type', 'password');

    await user.click(screen.getByRole('button', { name: /show password/i }));
    expect(passwordInput).toHaveAttribute('type', 'text');

    await user.click(screen.getByRole('button', { name: /hide password/i }));
    expect(passwordInput).toHaveAttribute('type', 'password');
  });

  it('Given 3 failed attempts, When attempting again, Then Login is disabled and “Account locked.” is shown', async () => {
    const user = userEvent.setup();
    renderWithProviders(<App />, { route: '/login' });

    await user.type(screen.getByLabelText('Username'), 'admin');
    await user.type(screen.getByLabelText('Password'), 'wrongpass');

    await user.click(screen.getByRole('button', { name: /^login$/i }));
    await user.click(screen.getByRole('button', { name: /^login$/i }));
    await user.click(screen.getByRole('button', { name: /^login$/i }));

    expect(screen.getByText('Account locked.')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /^login$/i })).toBeDisabled();
  });

  it('Given correct credentials, When logging in, Then user sees dashboard success message', async () => {
    const user = userEvent.setup();
    renderWithProviders(<App />, { route: '/login' });

    await user.type(screen.getByLabelText('Username'), 'admin');
    await user.type(screen.getByLabelText('Password'), 'password123');
    await user.click(screen.getByRole('button', { name: /^login$/i }));

    expect(await screen.findByText('You made it!')).toBeInTheDocument();
  });

  it('Given pre-locked account, When page renders, Then Login button is disabled and locked message is shown', () => {
    renderWithProviders(<App />, { route: '/login', auth: { initialFailedAttempts: 3 } });

    expect(screen.getByRole('button', { name: /^login$/i })).toBeDisabled();
    expect(screen.getByText('Account locked.')).toBeInTheDocument();
  });
});