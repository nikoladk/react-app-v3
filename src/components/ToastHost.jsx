import React from 'react';
import { useToast } from '../state/ToastContext.jsx';

export default function ToastHost() {
  const { toasts } = useToast();
  return (
    <div className="toastHost" aria-live="polite" aria-relevant="additions">
      {toasts.map((t) => (
        <div key={t.id} className="toast">
          {t.message}
        </div>
      ))}
    </div>
  );
}
