import React, { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';

export default function LoadingView() {
  const [loadingText, setLoadingText] = useState('Reading research paper...');
  const [joke, setJoke] = useState('');
  const [fetchingJoke, setFetchingJoke] = useState(false);
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    const texts = [
      'Reading research paper...',
      'Extracting key insights...',
      'Writing podcast script...',
      'Synthesizing human voices...',
      'Finalizing audio...'
    ];
    let i = 0;
    const interval = setInterval(() => {
      i++;
      if (i >= texts.length) {
        clearInterval(interval);
      } else {
        setLoadingText(texts[i]);
      }
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setElapsed(prev => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatElapsed = (sec) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  const fetchJoke = async () => {
    setFetchingJoke(true);
    try {
      const res = await fetch('https://icanhazdadjoke.com/', {
        headers: { 'Accept': 'application/json' }
      });
      const data = await res.json();
      setJoke(data.joke);
    } catch (err) {
      setJoke('Why do programmers prefer dark mode? Because light attracts bugs.');
    }
    setFetchingJoke(false);
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '24px',
      padding: '48px',
      background: 'rgba(255, 255, 255, 0.4)',
      border: '1px solid var(--border)',
      borderRadius: '16px',
      marginTop: '16px',
      minHeight: '320px',
      boxShadow: 'var(--shadow-warm)'
    }}>
      <Loader2 
        size={48} 
        color="var(--accent)" 
        style={{ animation: 'spin 1s linear infinite' }} 
      />
      
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
        <div style={{
          fontFamily: 'var(--font-utility)',
          fontSize: '16px',
          fontWeight: 600,
          color: 'var(--text-primary)',
          letterSpacing: '0.02em',
          animation: 'pulse-accent 2s infinite'
        }}>
          {loadingText}
        </div>
        
        <div style={{
          fontFamily: 'var(--font-utility)',
          fontSize: '14px',
          fontWeight: 600,
          color: 'var(--text-primary)',
          marginTop: '4px'
        }}>
          Time elapsed: {formatElapsed(elapsed)}
        </div>

        <div style={{
          fontFamily: 'var(--font-utility)',
          fontSize: '13px',
          color: 'var(--text-secondary)',
          opacity: 0.9,
          textAlign: 'center',
          maxWidth: '280px',
          marginTop: '4px'
        }}>
          High-quality audio synthesis can take a few minutes. Grab a coffee or enjoy a joke below!
        </div>
      </div>

      <div style={{
        marginTop: '8px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '16px'
      }}>
        <button 
          onClick={fetchJoke}
          disabled={fetchingJoke}
          style={{
            background: 'transparent',
            border: '1px solid var(--border)',
            borderRadius: '999px',
            padding: '8px 16px',
            fontFamily: 'var(--font-utility)',
            fontSize: '14px',
            fontWeight: 500,
            color: 'var(--text-primary)',
            cursor: fetchingJoke ? 'not-allowed' : 'pointer',
            transition: 'all 0.2s ease',
          }}
          onMouseOver={(e) => { if (!fetchingJoke) e.target.style.background = 'rgba(0,0,0,0.05)' }}
          onMouseOut={(e) => { if (!fetchingJoke) e.target.style.background = 'transparent' }}
        >
          {fetchingJoke ? 'Thinking...' : 'tell me a dad joke'}
        </button>

        {joke && (
          <div style={{
            maxWidth: '300px',
            textAlign: 'center',
            fontFamily: 'var(--font-display)',
            fontSize: '15px',
            color: 'var(--text-primary)',
            fontStyle: 'italic',
            lineHeight: 1.4,
            animation: 'pulse-accent 0.5s ease-out'
          }}>
            "{joke}"
          </div>
        )}
      </div>
    </div>
  );
}
