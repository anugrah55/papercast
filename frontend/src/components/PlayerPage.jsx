import React, { useState } from 'react';
import AudioPlayer from './AudioPlayer';
import ReactMarkdown from 'react-markdown';

export default function PlayerPage({ file, audioUrl, script, onBack }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [featureState, setFeatureState] = useState('idle'); // idle, input (for explain), loading, result, error
  const [featureResult, setFeatureResult] = useState('');
  const [currentFeature, setCurrentFeature] = useState('');
  const [interestInput, setInterestInput] = useState('');

  const handleFeatureClick = (type) => {
    setCurrentFeature(type);
    if (type === 'explain') {
      setFeatureState('input');
      setModalOpen(true);
    } else {
      setModalOpen(true);
      fetchFeature(type, '');
    }
  };

  const fetchFeature = async (type, interest) => {
    setFeatureState('loading');
    setFeatureResult('');

    if (!file) {
      setFeatureResult("Error: PDF file not found. Please try generating the podcast again.");
      setFeatureState('error');
      return;
    }

    const formData = new FormData();
    formData.append('pdf', file);
    formData.append('featureType', type);
    if (interest) {
      formData.append('interest', interest);
    }

    try {
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';
      const response = await fetch(`${API_URL}/api/feature`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to generate feature.');
      }

      const data = await response.json();
      setFeatureResult(data.result);
      setFeatureState('result');
    } catch (err) {
      setFeatureResult(err.message || 'An unexpected error occurred.');
      setFeatureState('error');
    }
  };

  const handleInterestSubmit = (e) => {
    e.preventDefault();
    if (!interestInput.trim()) return;
    fetchFeature('explain', interestInput);
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      width: '100%',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Custom Header */}
      <header style={{
        display: 'flex',
        alignItems: 'center',
        padding: '32px 48px',
        width: '100%',
        zIndex: 10
      }}>
        <div style={{
          background: 'var(--surface)',
          padding: '8px 24px',
          borderRadius: '999px',
          border: 'var(--border-soft)',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          cursor: 'pointer',
          transition: 'all 0.2s ease',
        }} 
        onClick={onBack}
        onMouseOver={(e) => e.currentTarget.style.background = 'var(--surface-2)'}
        onMouseOut={(e) => e.currentTarget.style.background = 'var(--surface)'}
        >
          <span style={{ fontSize: '20px', paddingBottom: '4px' }}>←</span>
          <span style={{ 
            fontFamily: 'var(--font-utility)', 
            fontWeight: 600, 
            fontSize: '15px',
            letterSpacing: '0.02em',
            textTransform: 'uppercase'
          }}>back to studio</span>
        </div>
      </header>

      <main style={{
        flex: 1,
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        paddingBottom: '160px'
      }}>
        {/* Center Title */}
        <div style={{ zIndex: 1, textAlign: 'center', opacity: 0.9 }}>
          <p style={{
            fontFamily: 'var(--font-utility)',
            fontSize: '16px',
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            color: 'var(--text-secondary)',
            marginBottom: '16px'
          }}>Now Playing</p>
          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontSize: '72px',
            fontWeight: 700,
            letterSpacing: '-0.02em',
            lineHeight: 1,
            color: 'var(--text-primary)',
            marginBottom: '40px'
          }}>
            papercast<br/>radio
          </h1>

          {/* Interactive Feature Buttons */}
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap', maxWidth: '600px' }}>
            <button className="feature-btn" onClick={() => handleFeatureClick('hackathon')} style={btnStyle}>
              💡 Hackathon Ideas
            </button>
            <button className="feature-btn" onClick={() => handleFeatureClick('next')} style={btnStyle}>
              📚 What to Read Next
            </button>
            <button className="feature-btn" onClick={() => handleFeatureClick('explain')} style={btnStyle}>
              🎯 Explain via Interests
            </button>
          </div>
        </div>

        {/* Audio Player at Bottom */}
        <div style={{
          position: 'fixed',
          bottom: '32px',
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          padding: '0 24px',
          zIndex: 10
        }}>
          <AudioPlayer audioUrl={audioUrl} script={script} />
        </div>
      </main>

      {/* Feature Modal */}
      {modalOpen && (
        <div style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(247, 243, 238, 0.8)',
          backdropFilter: 'blur(8px)',
          zIndex: 100,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '24px'
        }}>
          <div style={{
            background: 'var(--surface)',
            borderRadius: '24px',
            padding: '40px',
            width: '100%',
            maxWidth: '600px',
            maxHeight: '80vh',
            overflowY: 'auto',
            border: '1px solid var(--border)',
            boxShadow: 'var(--shadow-warm)',
            position: 'relative'
          }}>
            <button 
              onClick={() => setModalOpen(false)}
              style={{
                position: 'absolute',
                top: '24px',
                right: '24px',
                background: 'transparent',
                border: 'none',
                fontSize: '24px',
                cursor: 'pointer',
                color: 'var(--text-secondary)'
              }}
            >
              ×
            </button>

            {featureState === 'input' && (
              <div>
                <h2 style={{ fontFamily: 'var(--font-display)', marginBottom: '16px' }}>Explain Using My Interests</h2>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '24px' }}>
                  What are you interested in? (e.g., Cricket, Startups, Cooking, Formula 1)
                </p>
                <form onSubmit={handleInterestSubmit} style={{ display: 'flex', gap: '12px' }}>
                  <input 
                    type="text" 
                    value={interestInput}
                    onChange={(e) => setInterestInput(e.target.value)}
                    placeholder="Enter your interest..."
                    style={{
                      flex: 1,
                      padding: '12px 20px',
                      borderRadius: '999px',
                      border: '1px solid var(--border-soft)',
                      background: 'transparent',
                      fontFamily: 'var(--font-utility)',
                      fontSize: '16px'
                    }}
                    autoFocus
                  />
                  <button type="submit" style={{...btnStyle, background: 'var(--accent)', color: '#FFF5EE'}}>
                    Generate
                  </button>
                </form>
              </div>
            )}

            {featureState === 'loading' && (
              <div style={{ textAlign: 'center', padding: '40px 0' }}>
                <p style={{ fontFamily: 'var(--font-utility)', color: 'var(--text-secondary)' }}>
                  Generating insights... This might take a few seconds.
                </p>
              </div>
            )}

            {featureState === 'result' && (
              <div className="markdown-body" style={{ color: 'var(--text-primary)' }}>
                <ReactMarkdown>{featureResult}</ReactMarkdown>
              </div>
            )}

            {featureState === 'error' && (
              <div style={{ color: 'red', textAlign: 'center' }}>
                <p>{featureResult}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

const btnStyle = {
  background: 'var(--surface)',
  border: '1px solid var(--border)',
  borderRadius: '999px',
  padding: '12px 24px',
  fontFamily: 'var(--font-utility)',
  fontWeight: 600,
  fontSize: '14px',
  cursor: 'pointer',
  transition: 'all 0.2s ease',
  color: 'var(--text-primary)',
  boxShadow: 'var(--shadow-warm)'
};
