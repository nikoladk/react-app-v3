import React, { useState } from 'react';
import Spinner from '../components/Spinner.jsx';
import { sleep } from '../utils/sleep.js';

export default function OrdersPage() {
  const [loading, setLoading] = useState(false);

  async function refresh() {
    setLoading(true);
    await sleep(1200);
    setLoading(false);
  }

  return (
    <div className="card">
      <div className="row" style={{ justifyContent: 'space-between' }}>
        <h2 style={{ marginTop: 0, marginBottom: 0 }}>Orders</h2>
        <button type="button" className="btn" onClick={refresh} disabled={loading}>
          Refresh
        </button>
      </div>
      <div style={{ marginTop: 12 }} className="row">
        {loading ? (
          <>
            <Spinner />
            <div className="hint">Loading…</div>
          </>
        ) : (
          <div>No orders yet.</div>
        )}
      </div>
    </div>
  );
}
