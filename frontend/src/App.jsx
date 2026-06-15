import React, { useState } from 'react';
import Header from './components/Header';
import UploadZone from './components/UploadZone';
import ToneSelector from './components/ToneSelector';
import GenerateButton from './components/GenerateButton';
import ErrorCard from './components/ErrorCard';
import AsciiArt from './components/AsciiArt';
import LoadingView from './components/LoadingView';
import PlayerPage from './components/PlayerPage';

export default function App() {
  const [file, setFile] = useState(null);
  const [tone, setTone] = useState('casual');
  const [status, setStatus] = useState('idle'); // idle, generating, done, error
  const [audioUrl, setAudioUrl] = useState(null);
  const [scriptData, setScriptData] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');
  const [view, setView] = useState('home');

  const handleGenerate = async () => {
    if (!file) return;

    setStatus('generating');
    setErrorMsg('');

    const formData = new FormData();
    formData.append('pdf', file);
    formData.append('tone', tone);

    try {
      const response = await fetch('http://localhost:3001/api/generate', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to generate podcast.');
      }

      const data = await response.json();
      
      const byteCharacters = atob(data.audioBase64);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: 'audio/wav' });
      
      const url = URL.createObjectURL(blob);
      setAudioUrl(url);
      setScriptData(data.script);
      setStatus('done');
    } catch (err) {
      setErrorMsg(err.message || 'An unexpected error occurred.');
      setStatus('error');
    }
  };

  const handleReset = () => {
    setStatus('idle');
    setFile(null);
    setAudioUrl(null);
    setScriptData(null);
    setErrorMsg('');
  };

  if (view === 'player') {
    return (
      <div className="app-container">
        <PlayerPage 
          file={file}
          audioUrl={audioUrl} 
          script={scriptData}
          onBack={() => setView('home')} 
        />
      </div>
    );
  }

  return (
    <div className="app-container">
      <Header />
      
      <main className="hero-section">
        <div className="hero-content">
          <div>
            <p style={{ 
              fontFamily: 'var(--font-utility)', 
              fontSize: '18px', 
              color: 'var(--text-secondary)',
              marginBottom: '8px',
              fontWeight: 500
            }}>we turn your research papers</p>
            <h1 style={{ 
              fontFamily: 'var(--font-display)', 
              fontSize: '56px', 
              fontWeight: 700, 
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
              color: 'var(--text-primary)'
            }}>
              into an engaging<br />podcast
            </h1>
          </div>

          {status === 'error' ? (
            <ErrorCard message={errorMsg} onReset={handleReset} />
          ) : status === 'done' ? (
            <div style={{ display: 'flex', gap: '16px', flexDirection: 'column', marginTop: '16px' }}>
              <button 
                onClick={() => setView('player')}
                style={{
                  height: '56px',
                  background: 'var(--accent)',
                  color: '#FFF5EE',
                  border: 'none',
                  borderRadius: '999px',
                  fontFamily: 'var(--font-utility)',
                  fontWeight: 600,
                  fontSize: '16px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  boxShadow: 'var(--shadow-warm)'
                }}
                onMouseOver={(e) => e.target.style.transform = 'translateY(-2px)'}
                onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
              >
                Listen to Podcast →
              </button>
              <button 
                onClick={handleReset}
                style={{
                  height: '56px',
                  background: 'transparent',
                  color: 'var(--text-primary)',
                  border: '1.5px solid var(--border)',
                  borderRadius: '999px',
                  fontFamily: 'var(--font-utility)',
                  fontWeight: 600,
                  fontSize: '16px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
                onMouseOver={(e) => e.target.style.background = 'var(--surface-2)'}
                onMouseOut={(e) => e.target.style.background = 'transparent'}
              >
                Generate Another
              </button>
            </div>
          ) : status === 'generating' ? (
            <LoadingView />
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', marginTop: '16px' }}>
              <UploadZone file={file} setFile={setFile} disabled={false} />
              <ToneSelector tone={tone} setTone={setTone} disabled={false} />
              <GenerateButton onClick={handleGenerate} isGenerating={false} disabled={!file} />
            </div>
          )}
        </div>

        <AsciiArt />
      </main>
    </div>
  );
}
