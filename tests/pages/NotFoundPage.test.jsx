import React from 'react';
import { describe, expect, it } from 'vitest';
import { screen } from '@testing-library/react';
import App from '../../src/App.jsx';
import { renderWithProviders } from '../utils/render.jsx';

describe('NotFoundPage (BDD)', () => {
  it('Given unknown route, When page renders, Then "Not Found" heading and Go Home link are shown', () => {
    renderWithProviders(<App />, { route: '/this-does-not-exist' });

    expect(screen.getByRole('heading', { name: /^not found$/i })).toBeInTheDocument();
    expect(screen.getByText('This page does not exist.')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /^go home$/i })).toHaveAttribute('href', '/');
  });
});