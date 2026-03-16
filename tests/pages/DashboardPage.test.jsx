import React from 'react';
import { describe, expect, it } from 'vitest';
import { screen } from '@testing-library/react';
import App from '../../src/App.jsx';
import { renderWithProviders } from '../utils/render.jsx';
import { MOCK_USER } from '../../src/state/MockData.js';

describe('DashboardPage (BDD)', () => {
  it('Given authenticated user, When visiting /dashboard, Then dashboard heading and hint are shown', () => {
    renderWithProviders(<App />, { route: '/dashboard', auth: { initialUser: MOCK_USER } });

    expect(screen.getByRole('heading', { name: 'Dashboard' })).toBeInTheDocument();
    expect(screen.getByText('You made it!')).toBeInTheDocument();
    expect(screen.getByText('Use the category in the header.')).toBeInTheDocument();
  });
});