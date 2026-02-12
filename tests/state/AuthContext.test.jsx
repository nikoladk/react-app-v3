import React from 'react';
import { describe, expect, it } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { TestAuthProvider, useAuth } from '../../src/state/AuthContext.jsx';

function wrapper({ children }) {
  return <TestAuthProvider>{children}</TestAuthProvider>;
}

describe('AuthContext (BDD)', () => {
  it('Given correct credentials, When logging in, Then user is authenticated', () => {
    const { result } = renderHook(() => useAuth(), { wrapper });

    act(() => {
      const res = result.current.attemptLogin({ username: 'admin', password: 'password123' });
      expect(res.ok).toBe(true);
    });

    expect(result.current.isAuthenticated).toBe(true);
    expect(result.current.user?.username).toBe('admin');
  });

  it('Given 3 failed attempts, When trying again, Then account is locked', () => {
    const { result } = renderHook(() => useAuth(), { wrapper });

    act(() => {
      result.current.attemptLogin({ username: 'admin', password: 'nope' });
      result.current.attemptLogin({ username: 'admin', password: 'nope' });
      result.current.attemptLogin({ username: 'admin', password: 'nope' });
    });

    expect(result.current.locked).toBe(true);
    expect(result.current.failedAttempts).toBe(3);

    const res = result.current.attemptLogin({ username: 'admin', password: 'password123' });
    expect(res.ok).toBe(false);
    expect(res.reason).toBe('LOCKED');
  });
});
