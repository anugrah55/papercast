import React from 'react';

export default function ErrorCard({ errorMsg, onReset }) {
  return (
    <div style={{
      backgroundColor: 'rgba(255, 68, 68, 0.08)',
      border: '1px solid rgba(255, 68, 68, 0.3)',
      borderRadius: '8px',
      padding: '16px',
      display: 'flex',
      flexDirection: 'column',
      gap: '12px',
      alignItems: 'center'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', textAlign: 'center' }}>
        <span style={{ color: 'var(--error)', fontSize: '20px', fontWeight: 'bold' }}>✕</span>
        <span style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-body)', fontSize: '18px', fontWeight: 500 }}>
          {errorMsg}
        </span>
      </div>
      <button 
        onClick={onReset}
        style={{
          background: 'none',
          border: 'none',
          color: 'var(--accent)',
          fontFamily: 'var(--font-utility)',
          fontWeight: 600,
          fontSize: '14px',
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
          textDecoration: 'underline'
        }}
      >
        Try again
      </button>
    </div>
  );
}
