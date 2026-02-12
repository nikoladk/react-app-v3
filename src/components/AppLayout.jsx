import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header.jsx';
import Sidebar from './Sidebar.jsx';

export default function AppLayout() {
  return (
    <div className="appShell">
      <Sidebar />
      <Header />
      <main className="main">
        <Outlet />
      </main>
    </div>
  );
}
