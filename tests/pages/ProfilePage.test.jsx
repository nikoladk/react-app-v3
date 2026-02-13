import React from 'react';
import { describe, expect, it } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../../src/App.jsx';
import { renderWithProviders } from '../utils/render.jsx';

describe('Profile page (BDD)', () => {
  it('Given profile page, When entering edit mode, Then email becomes editable and can be saved', async () => {
    const user = userEvent.setup();
    renderWithProviders(<App />, {
      route: '/profile',
      auth: { initialUser: { username: 'admin', email: 'admin@example.com' } },
    });

    const usernameInput = screen.getByDisplayValue('admin');
    expect(usernameInput).toHaveAttribute('readonly');

    const emailInput = screen.getByDisplayValue('admin@example.com');
    expect(emailInput).toHaveAttribute('readonly');

    await user.click(screen.getByRole('button', { name: 'Edit' }));

    expect(screen.getByDisplayValue('admin@example.com')).not.toHaveAttribute('readonly');

    await user.clear(screen.getByDisplayValue('admin@example.com'));
    await user.type(screen.getByRole('textbox', { name: 'Email' }), 'new@example.com');

    await user.click(screen.getByRole('button', { name: 'Save' }));

    expect(screen.getByDisplayValue('new@example.com')).toBeInTheDocument();
    expect(await screen.findByText('Profile updated successfully.')).toBeInTheDocument();
  });

  it('Given edit mode, When cancelling, Then changes are discarded', async () => {
    const user = userEvent.setup();
    renderWithProviders(<App />, {
      route: '/profile',
      auth: { initialUser: { username: 'admin', email: 'admin@example.com' } },
    });

    await user.click(screen.getByRole('button', { name: 'Edit' }));

    const emailInput = screen.getByRole('textbox', { name: 'Email' });
    await user.clear(emailInput);
    await user.type(emailInput, 'new@example.com');

    await user.click(screen.getByRole('button', { name: 'Cancel' }));

    expect(screen.getByDisplayValue('admin@example.com')).toBeInTheDocument();
  });
});