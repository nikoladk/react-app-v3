import React from 'react';
import { describe, expect, it } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../../src/App.jsx';
import { renderWithProviders } from '../utils/render.jsx';

describe('Orders page (BDD)', () => {
  it(
    'Given no orders, When refreshing, Then spinner shows and page remains empty',
    async () => {
      const user = userEvent.setup();

      renderWithProviders(<App />, {
        route: '/orders',
        auth: { initialUser: { username: 'admin', email: 'admin@example.com' } },
      });
      expect(screen.getByText('No orders yet.')).toBeInTheDocument();

      await user.click(screen.getByRole('button', { name: 'Refresh' }));
      expect(screen.getByLabelText('Loading')).toBeInTheDocument();

      await new Promise((r) => setTimeout(r, 1300));
      expect(screen.queryByLabelText('Loading')).not.toBeInTheDocument();
      expect(screen.getByText('No orders yet.')).toBeInTheDocument();
    },
    10_000,
  );
});