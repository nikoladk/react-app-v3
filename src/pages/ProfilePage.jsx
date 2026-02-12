import React, { useMemo, useState } from 'react';
import { useAuth } from '../state/AuthContext.jsx';
import { useToast } from '../state/ToastContext.jsx';

export default function ProfilePage() {
  const { user } = useAuth();
  const { showToast } = useToast();

  const initialEmail = useMemo(() => user?.email ?? 'admin@example.com', [user?.email]);
  const [email, setEmail] = useState(initialEmail);
  const [draftEmail, setDraftEmail] = useState(initialEmail);
  const [editing, setEditing] = useState(false);

  function startEdit() {
    setDraftEmail(email);
    setEditing(true);
  }

  function cancelEdit() {
    setDraftEmail(email);
    setEditing(false);
  }

  function save() {
    setEmail(draftEmail);
    setEditing(false);
    showToast('Profile updated successfully.');
  }

  return (
    <div className="card">
      <h2 style={{ marginTop: 0 }}>Profile</h2>

      <div className="row" style={{ alignItems: 'flex-start' }}>
        <div style={{ flex: 1 }}>
          <div className="field" style={{ marginBottom: 12 }}>
            <label>Username</label>
            <input value={user?.username ?? 'admin'} readOnly />
          </div>

          <div className="field">
            <label>Email</label>
            <input
              value={editing ? draftEmail : email}
              onChange={(e) => setDraftEmail(e.target.value)}
              readOnly={!editing}
            />
          </div>
        </div>

        <div className="row" style={{ flexDirection: 'column', alignItems: 'stretch' }}>
          {!editing ? (
            <button type="button" className="btn btnPrimary" onClick={startEdit}>
              Edit
            </button>
          ) : (
            <>
              <button type="button" className="btn btnPrimary" onClick={save}>
                Save
              </button>
              <button type="button" className="btn" onClick={cancelEdit}>
                Cancel
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
