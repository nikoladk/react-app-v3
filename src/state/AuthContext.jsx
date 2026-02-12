import React, { createContext, useContext, useMemo, useReducer } from 'react';
import { MOCK_USER } from './MockData.js';

const AuthContext = createContext(null);

const VALID_USERNAME = 'admin';
const VALID_PASSWORD = 'password123';
const MAX_FAILED_ATTEMPTS = 3;

const initialState = {
  user: null,
  failedAttempts: 0,
  locked: false,
};

function reducer(state, action) {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return { user: action.user, failedAttempts: 0, locked: false };
    case 'LOGIN_FAILURE': {
      const nextFailed = state.failedAttempts + 1;
      return {
        ...state,
        failedAttempts: nextFailed,
        locked: nextFailed >= MAX_FAILED_ATTEMPTS,
      };
    }
    case 'LOGOUT':
      return { ...initialState };
    default:
      return state;
  }
}

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const api = useMemo(() => {
    const isAuthenticated = Boolean(state.user);

    function attemptLogin({ username, password }) {
      if (state.locked) {
        return { ok: false, reason: 'LOCKED' };
      }
      const ok = username === VALID_USERNAME && password === VALID_PASSWORD;
      if (ok) {
        dispatch({ type: 'LOGIN_SUCCESS', user: { ...MOCK_USER } });
        return { ok: true };
      }
      dispatch({ type: 'LOGIN_FAILURE' });
      return { ok: false, reason: 'INVALID' };
    }

    function logout() {
      dispatch({ type: 'LOGOUT' });
    }

    return {
      user: state.user,
      isAuthenticated,
      failedAttempts: state.failedAttempts,
      locked: state.locked,
      attemptLogin,
      logout,
    };
  }, [state.user, state.failedAttempts, state.locked]);

  return <AuthContext.Provider value={api}>{children}</AuthContext.Provider>;
}

export function TestAuthProvider({ children, initialUser = null, initialFailedAttempts = 0 }) {
  const bootState = {
    user: initialUser,
    failedAttempts: initialUser ? 0 : initialFailedAttempts,
    locked: !initialUser && initialFailedAttempts >= MAX_FAILED_ATTEMPTS,
  };

  const [state, dispatch] = useReducer(reducer, bootState);

  const api = useMemo(() => {
    const isAuthenticated = Boolean(state.user);

    function attemptLogin({ username, password }) {
      if (state.locked) {
        return { ok: false, reason: 'LOCKED' };
      }
      const ok = username === VALID_USERNAME && password === VALID_PASSWORD;
      if (ok) {
        dispatch({ type: 'LOGIN_SUCCESS', user: { ...MOCK_USER } });
        return { ok: true };
      }
      dispatch({ type: 'LOGIN_FAILURE' });
      return { ok: false, reason: 'INVALID' };
    }

    function logout() {
      dispatch({ type: 'LOGOUT' });
    }

    return {
      user: state.user,
      isAuthenticated,
      failedAttempts: state.failedAttempts,
      locked: state.locked,
      attemptLogin,
      logout,
    };
  }, [state.user, state.failedAttempts, state.locked]);

  return <AuthContext.Provider value={api}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
