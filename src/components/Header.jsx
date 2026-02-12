import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CATEGORIES } from '../state/MockData.js';
import { useAuth } from '../state/AuthContext.jsx';
import { useCart } from '../state/CartContext.jsx';

function IconBell() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 22a2.5 2.5 0 0 0 2.45-2h-4.9A2.5 2.5 0 0 0 12 22Zm7-6V11a7 7 0 1 0-14 0v5l-2 2v1h18v-1l-2-2Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconCart() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M6 6h15l-2 9H7L6 6Zm0 0L5 3H2"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path
        d="M9 22a1 1 0 1 0 0-2 1 1 0 0 0 0 2Zm8 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"
        stroke="currentColor"
        strokeWidth="1.8"
      />
    </svg>
  );
}

export default function Header() {
  const { user } = useAuth();
  const { count } = useCart();
  const navigate = useNavigate();
  const location = useLocation();

  const notificationsCount = 3;

  return (
    <header className="header">
      <div className="row" style={{ gap: 16 }}>
        <div>
          <div className="hint">Welcome, {user?.username ?? 'admin'}!</div>
        </div>
        <div className="row" style={{ gap: 8 }}>
          {CATEGORIES.map((c) => {
            const active = location.pathname === `/category/${c.key}`;
            return (
              <button
                key={c.key}
                type="button"
                className={`btn ${active ? 'btnPrimary' : ''}`}
                onClick={() => navigate(`/category/${c.key}`)}
              >
                {c.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="row">
        <button type="button" className="iconButton" aria-label="Notifications">
          <IconBell />
          <span className="badge iconBadge" aria-label={`${notificationsCount} notifications`}>
            {notificationsCount}
          </span>
        </button>
        <button type="button" className="iconButton" aria-label="Cart">
          <IconCart />
          <span className="badge iconBadge" aria-label={`${count} cart items`}>
            {count}
          </span>
        </button>
      </div>
    </header>
  );
}
