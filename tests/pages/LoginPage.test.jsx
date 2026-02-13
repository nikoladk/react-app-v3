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

  it('Given short password, When clicking Login, Then “Password is too short.” is shown', async () => {
    const user = userEvent.setup();
    renderWithProviders(<App />, { route: '/login' });

    await user.type(screen.getByLabelText('Username'), 'admin');
    await user.type(screen.getByLabelText('Password'), '123');
    await user.click(screen.getByRole('button', { name: 'Login' }));

    expect(screen.getByText('Password is too short.')).toBeInTheDocument();
  });

  it('Given password hidden, When toggling, Then input type changes', async () => {
    const user = userEvent.setup();
    renderWithProviders(<App />, { route: '/login' });

    const passwordInput = screen.getByLabelText('Password');
    expect(passwordInput).toHaveAttribute('type', 'password');

    await user.click(screen.getByRole('button', { name: 'Show Password' }));
    expect(passwordInput).toHaveAttribute('type', 'text');

    await user.click(screen.getByRole('button', { name: 'Hide Password' }));
    expect(passwordInput).toHaveAttribute('type', 'password');
  });

  it('Given incorrect password, When logging in, Then “Try again.” is shown', async () => {
    const user = userEvent.setup();
    renderWithProviders(<App />, { route: '/login' });

    await user.type(screen.getByLabelText('Username'), 'admin');
    await user.type(screen.getByLabelText('Password'), 'wrongpass');
    await user.click(screen.getByRole('button', { name: 'Login' }));

    expect(screen.getByText('Try again.')).toBeInTheDocument();
  });

  it('Given 3 failed attempts, When attempting again, Then Login is disabled and “Account locked.” is shown', async () => {
    const user = userEvent.setup();
    renderWithProviders(<App />, { route: '/login' });

    await user.type(screen.getByLabelText('Username'), 'admin');
    await user.type(screen.getByLabelText('Password'), 'wrongpass');

    await user.click(screen.getByRole('button', { name: 'Login' }));
    await user.click(screen.getByRole('button', { name: 'Login' }));
    await user.click(screen.getByRole('button', { name: 'Login' }));

    expect(screen.getByText('Account locked.')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Login' })).toBeDisabled();
  });

  it('Given correct credentials, When logging in, Then user sees dashboard success message', async () => {
    const user = userEvent.setup();
    renderWithProviders(<App />, { route: '/login' });

    await user.type(screen.getByLabelText('Username'), 'admin');
    await user.type(screen.getByLabelText('Password'), 'password123');
    await user.click(screen.getByRole('button', { name: 'Login' }));

    expect(await screen.findByText('You made it!')).toBeInTheDocument();
  });
});