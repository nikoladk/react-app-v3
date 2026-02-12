import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../state/AuthContext.jsx';
import { useCart } from '../state/CartContext.jsx';

function linkClass({ isActive }) {
  return `navLink ${isActive ? 'navLinkActive' : ''}`;
}

export default function Sidebar() {
  const { logout } = useAuth();
  const { reset } = useCart();
  const navigate = useNavigate();

  function onLogout() {
    reset();
    logout();
    navigate('/login', { replace: true });
  }

  return (
    <aside className="sidebar">
      <div className="brand">React App V3</div>
      <div className="navList">
        <NavLink className={linkClass} to="/dashboard">
          Dashboard
        </NavLink>
        <NavLink className={linkClass} to="/profile">
          Profile
        </NavLink>
        <NavLink className={linkClass} to="/orders">
          Orders
        </NavLink>
        <NavLink className={linkClass} to="/settings">
          Settings
        </NavLink>
      </div>
      <div className="spacer" />
      <button type="button" className="btn btnDanger" onClick={onLogout}>
        Logout
      </button>
    </aside>
  );
}
