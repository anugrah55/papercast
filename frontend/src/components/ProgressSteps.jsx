import React from 'react';

export default function ProgressSteps({ stage }) {
  const steps = [
    "Reading paper...",
    "Writing script...",
    "Generating audio — this takes ~30s"
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', padding: '0 20px' }}>
      {steps.map((text, i) => {
        const isActive = i === stage;
        const isPassed = i < stage;
        const isLit = isActive || isPassed;

        return (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{
              width: '12px',
              height: '12px',
              borderRadius: '50%',
              backgroundColor: isLit ? 'var(--accent)' : 'var(--border)',
              animation: isActive ? 'pulse-accent 2s infinite' : 'none',
              transition: 'background-color 0.3s ease'
            }} />
            <span style={{ 
              fontFamily: 'var(--font-body)', 
              fontSize: '18px',
              color: isLit ? 'var(--text-primary)' : 'var(--text-secondary)',
              fontWeight: isLit ? 600 : 400,
              transition: 'color 0.3s ease'
            }}>
              {text}
            </span>
          </div>
        );
      })}
    </div>
  );
}
