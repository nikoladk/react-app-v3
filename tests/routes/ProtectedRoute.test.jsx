import React from 'react';
import { describe, expect, it } from 'vitest';
import { screen } from '@testing-library/react';
import App from '../../src/App.jsx';
import { renderWithProviders } from '../utils/render.jsx';
import { MOCK_USER } from '../../src/state/MockData.js';

describe('Protected routes (BDD)', () => {
  it('Given unauthenticated user, When visiting /dashboard, Then user is redirected to login', () => {
    renderWithProviders(<App />, { route: '/dashboard' });
    expect(screen.getByRole('heading', { name: 'Login' })).toBeInTheDocument();
  });

  it('Given authenticated user, When visiting /dashboard, Then dashboard renders', async () => {
    renderWithProviders(<App />, { route: '/dashboard', auth: { initialUser: MOCK_USER } });
    expect(await screen.findByText('You made it!')).toBeInTheDocument();
  });
});
