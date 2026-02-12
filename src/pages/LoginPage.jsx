import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../state/AuthContext.jsx';

function validate({ username, password }) {
  const errors = {};
  if (!username.trim()) errors.username = 'Username is required.';
  if (!password) errors.password = 'Password is required.';
  else if (password.length < 6) errors.password = 'Password is too short.';
  return errors;
}

export default function LoginPage() {
  const { attemptLogin, locked } = useAuth();
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [statusMessage, setStatusMessage] = useState('');

  const canSubmit = useMemo(() => !locked, [locked]);

  function onSubmit(e) {
    e.preventDefault();
    setStatusMessage('');

    const nextErrors = validate({ username, password });
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    const result = attemptLogin({ username: username.trim(), password });
    if (result.ok) {
      navigate('/dashboard', { replace: true });
      return;
    }

    if (result.reason === 'LOCKED') {
      setStatusMessage('Account locked.');
      return;
    }

    setStatusMessage('Try again.');
  }

  return (
    <div className="loginWrap">
      <div className="card loginCard">
        <h2 style={{ marginTop: 0 }}>Login</h2>
        <form onSubmit={onSubmit} className="row" style={{ flexDirection: 'column', alignItems: 'stretch' }}>
          <div className="field">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoComplete="username"
            />
            {errors.username ? <div className="error">{errors.username}</div> : null}
          </div>

          <div className="field">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
            />
            {errors.password ? <div className="error">{errors.password}</div> : null}
          </div>

          <div className="row" style={{ justifyContent: 'space-between' }}>
            <button type="submit" className="btn btnPrimary" disabled={!canSubmit}>
              Login
            </button>
            <button
              type="button"
              className="btn"
              onClick={() => setShowPassword((v) => !v)}
              aria-pressed={showPassword}
            >
              {showPassword ? 'Hide Password' : 'Show Password'}
            </button>
          </div>

          {locked ? <div className="error">Account locked.</div> : null}
          {statusMessage && !locked ? <div className="error">{statusMessage}</div> : null}

          <div className="hint">
            Credentials: <strong>admin</strong> / <strong>password123</strong>
          </div>
        </form>
      </div>
    </div>
  );
}
