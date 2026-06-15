import React from 'react';
import { ArrowRight } from 'lucide-react';

export default function Header() {
  return (
    <header style={{ 
      display: 'flex', 
      justifyContent: 'space-between', 
      alignItems: 'center',
      padding: '16px 0'
    }}>
      {/* Logo Pill */}
      <div style={{
        border: '1px solid var(--border)',
        borderRadius: '999px',
        padding: '10px 24px',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        background: 'transparent'
      }}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 2v20M17 5l-10 14M22 12H2M19 17L5 7" />
        </svg>
        <span style={{
          fontFamily: 'var(--font-display)',
          fontWeight: 700,
          fontSize: '18px',
          letterSpacing: '-0.02em',
          color: 'var(--text-primary)'
        }}>
          papercast
        </span>
      </div>



      {/* Right CTA */}
      <a href="https://www.sarvam.ai/" target="_blank" rel="noreferrer" style={{
        background: 'var(--accent)',
        color: '#fff',
        border: 'none',
        borderRadius: '999px',
        padding: '8px 16px 8px 24px',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        fontFamily: 'var(--font-utility)',
        fontSize: '12px',
        fontWeight: 500,
        textDecoration: 'none',
        transition: 'transform 0.2s ease',
        lineHeight: '1.2',
        textAlign: 'right'
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
          <span>made with</span>
          <span style={{ fontWeight: 700 }}>Sarvam AI</span>
        </div>
        <div style={{
          background: 'rgba(255,255,255,0.1)',
          borderRadius: '50%',
          padding: '6px',
          display: 'flex'
        }}>
          <ArrowRight size={18} />
        </div>
      </a>
    </header>
  );
}
