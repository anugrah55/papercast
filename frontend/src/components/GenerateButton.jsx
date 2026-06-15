import React from 'react';

export default function GenerateButton({ disabled, isLoading, onClick }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        width: '100%',
        height: '52px',
        background: 'var(--accent)',
        color: '#FFF5EE',
        fontFamily: 'var(--font-utility)',
        fontWeight: 600,
        fontSize: '16px',
        textTransform: 'uppercase',
        letterSpacing: '0.08em',
        borderRadius: '8px',
        border: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '12px',
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled && !isLoading ? 0.6 : 1,
        transition: 'background 0.2s ease'
      }}
      onMouseOver={(e) => {
        if (!disabled) e.target.style.background = '#A63820';
      }}
      onMouseOut={(e) => {
        if (!disabled) e.target.style.background = 'var(--accent)';
      }}
    >
      {isLoading ? (
        <>
          <svg style={{ animation: 'spin 1s linear infinite' }} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--bg)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 12a9 9 0 1 1-6.219-8.56" />
          </svg>
          Generating...
        </>
      ) : (
        'Generate Podcast →'
      )}
    </button>
  );
}
