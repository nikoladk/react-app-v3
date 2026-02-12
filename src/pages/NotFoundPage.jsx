import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <div className="loginWrap">
      <div className="card loginCard">
        <h2 style={{ marginTop: 0 }}>Not Found</h2>
        <div className="hint">This page does not exist.</div>
        <div style={{ marginTop: 12 }}>
          <Link className="btn" to="/">
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
}
