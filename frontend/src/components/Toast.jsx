// ============================================================
//  Toast Component – renders all active toasts from context
// ============================================================
import React from 'react';
import { useApp } from '../context/AppContext.jsx';

const ICONS = { success: '✅', error: '❌', info: 'ℹ️' };

export default function Toast() {
  const { toasts, removeToast } = useApp();

  return (
<<<<<<< HEAD
    <div className="toast-container" id="toast-container" aria-live="polite" aria-atomic="true" style={{ zIndex: 100000 }}>
=======
    <div className="toast-container" id="toast-container" aria-live="polite" aria-atomic="true">
>>>>>>> 419b5500e0a3026b9d8a634a65804bb6e355579d
      {toasts.map(({ id, message, type }) => (
        <div
          key={id}
          className={`toast toast-${type}`}
          onClick={() => removeToast(id)}
<<<<<<< HEAD
          style={{ 
            cursor: 'pointer',
            animation: 'toast-in 0.35s ease-out, toast-out 0.35s ease-in 1.65s forwards'
          }}
        >
          <span className="toast-icon">{ICONS[type] || 'ℹ️'}</span>
          <span>{message}</span>
          <style>{`
            @keyframes toast-in {
              from { transform: translateX(100%); opacity: 0; }
              to { transform: translateX(0); opacity: 1; }
            }
            @keyframes toast-out {
              from { transform: translateX(0); opacity: 1; }
              to { transform: translateX(100%); opacity: 0; }
            }
          `}</style>
=======
          style={{ cursor: 'pointer' }}
        >
          <span className="toast-icon">{ICONS[type] || 'ℹ️'}</span>
          <span>{message}</span>
>>>>>>> 419b5500e0a3026b9d8a634a65804bb6e355579d
        </div>
      ))}
    </div>
  );
}
