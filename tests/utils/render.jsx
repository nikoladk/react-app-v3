import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { ToastProvider } from '../../src/state/ToastContext.jsx';
import { TestAuthProvider } from '../../src/state/AuthContext.jsx';
import { CartProvider } from '../../src/state/CartContext.jsx';

export function renderWithProviders(
  ui,
  {
    route = '/',
    auth = { initialUser: null, initialFailedAttempts: 0 },
    cart = { initialCount: 0 },
  } = {},
) {
  return render(
    <MemoryRouter initialEntries={[route]}>
      <ToastProvider>
        <TestAuthProvider
          initialUser={auth.initialUser ?? null}
          initialFailedAttempts={auth.initialFailedAttempts ?? 0}
        >
          <CartProvider initialCount={cart.initialCount ?? 0}>{ui}</CartProvider>
        </TestAuthProvider>
      </ToastProvider>
    </MemoryRouter>,
  );
}
