import React from 'react';

export default function ToneSelector({ tone, setTone, disabled }) {
  const tones = ['casual', 'technical', 'hype', 'simple', 'humorous'];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', alignItems: 'center' }}>
      <label style={{ 
        fontFamily: 'var(--font-utility)', 
        color: 'var(--text-secondary)', 
        fontSize: '12px', 
        textTransform: 'uppercase', 
        letterSpacing: '0.1em',
        fontWeight: 600
      }}>
        Tone
      </label>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '8px', opacity: disabled ? 0.6 : 1 }}>
        {tones.map(t => (
          <button
            key={t}
            onClick={() => !disabled && setTone(t)}
            disabled={disabled}
            style={{
              background: tone === t ? 'var(--accent)' : 'var(--surface)',
              color: tone === t ? '#FFF5EE' : 'var(--text-secondary)',
              border: `1px solid ${tone === t ? 'var(--accent)' : 'var(--border)'}`,
              borderRadius: '999px',
              padding: '8px 20px',
              fontFamily: 'var(--font-utility)',
              fontSize: '14px',
              fontWeight: tone === t ? 600 : 400,
              textTransform: 'capitalize',
              transition: 'all 0.2s ease',
              cursor: disabled ? 'not-allowed' : 'pointer'
            }}
          >
            {t}
          </button>
        ))}
      </div>
    </div>
  );
}
