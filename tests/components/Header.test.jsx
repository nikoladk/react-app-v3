import React from 'react';
import { describe, expect, it } from 'vitest';
import { screen } from '@testing-library/react';
import Header from '../../src/components/Header.jsx';
import { renderWithProviders } from '../utils/render.jsx';
import { MOCK_USER } from '../../src/state/MockData.js';

describe('Header (BDD)', () => {
  it('Given authenticated user, When header renders, Then welcome text and badges are visible', () => {
    renderWithProviders(<Header />, { auth: { initialUser: MOCK_USER }, cart: { initialCount: 2 } });

    expect(screen.getByText('Welcome, admin')).toBeInTheDocument();
    expect(screen.getByLabelText('2 notifications')).toBeInTheDocument();
    expect(screen.getByLabelText('2 cart items')).toBeInTheDocument();
  });
});