import React from 'react';
import { describe, expect, it } from 'vitest';
import { screen } from '@testing-library/react';
import App from '../../src/App.jsx';
import { renderWithProviders } from '../utils/render.jsx';
import { MOCK_USER } from '../../src/state/MockData.js';

describe('SettingsPage (BDD)', () => {
  it('Given authenticated user, When visiting /settings, Then settings heading and hint are shown', () => {
    renderWithProviders(<App />, { route: '/settings', auth: { initialUser: MOCK_USER } });

    expect(screen.getByRole('heading', { name: 'Settings' })).toBeInTheDocument();
    expect(screen.getByText('Mocked settings page')).toBeInTheDocument();
  });
});