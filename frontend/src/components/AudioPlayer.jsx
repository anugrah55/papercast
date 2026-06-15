import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, MoreVertical, Captions } from 'lucide-react';

export default function AudioPlayer({ audioUrl, script }) {
  const audioRef = useRef(null);
  const scrollRef = useRef(null);
  const activeLineRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showCaptions, setShowCaptions] = useState(false);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    setCurrentTime(audioRef.current.currentTime);
  };

  const handleLoadedMetadata = () => {
    setDuration(audioRef.current.duration);
  };

  const handleSeek = (e) => {
    const newTime = (e.target.value / 100) * duration;
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const formatTime = (time) => {
    if (isNaN(time)) return '0:00';
    const mins = Math.floor(time / 60);
    const secs = Math.floor(time % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleDownload = () => {
    const a = document.createElement('a');
    a.href = audioUrl;
    a.download = 'papercast.mp3';
    a.click();
  };

  useEffect(() => {
    if (showCaptions && activeLineRef.current && scrollRef.current) {
      activeLineRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [currentTime, showCaptions]);

  const progress = duration ? (currentTime / duration) * 100 : 0;

  return (
    <>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '24px',
        background: 'rgba(244, 240, 232, 0.9)',
        borderRadius: '999px',
        padding: '12px 24px',
        boxShadow: 'var(--shadow-warm)',
        width: '100%',
        maxWidth: '800px',
        backdropFilter: 'blur(8px)',
        zIndex: 20
      }}>
        <audio 
          ref={audioRef}
          src={audioUrl}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          onEnded={() => setIsPlaying(false)}
        />

        <button 
          onClick={togglePlay}
          style={{
            width: '48px',
            height: '48px',
            borderRadius: '50%',
            background: 'rgba(0,0,0,0.05)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: 'none',
            cursor: 'pointer',
            flexShrink: 0,
            color: 'var(--text-primary)'
          }}
        >
          {isPlaying ? <Pause size={20} fill="currentColor" /> : <Play size={20} fill="currentColor" />}
        </button>

        <div style={{
          fontFamily: 'var(--font-utility)',
          fontSize: '15px',
          fontWeight: 500,
          color: 'var(--text-primary)',
          width: '80px',
          flexShrink: 0
        }}>
          {formatTime(currentTime)} / {formatTime(duration)}
        </div>

        <div style={{
          flexGrow: 1,
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          height: '24px'
        }}>
          <div style={{
            position: 'absolute',
            left: 0,
            right: 0,
            height: '4px',
            background: 'rgba(0,0,0,0.2)',
            borderRadius: '2px'
          }} />
          <div style={{
            position: 'absolute',
            left: 0,
            width: `${progress}%`,
            height: '4px',
            background: 'var(--text-primary)',
            borderRadius: '2px',
            transition: 'width 0.1s linear'
          }} />
          <input 
            type="range"
            min="0"
            max="100"
            value={progress || 0}
            onChange={handleSeek}
            style={{
              position: 'absolute',
              width: '100%',
              opacity: 0,
              cursor: 'pointer',
              height: '100%',
              margin: 0
            }}
          />
        </div>

        <div style={{ display: 'flex', gap: '16px', color: 'var(--text-primary)', flexShrink: 0, alignItems: 'center' }}>
          {script && script.length > 0 && (
            <button 
              onClick={() => setShowCaptions(!showCaptions)}
              title="Closed Captions"
              style={{ 
                background: 'none', 
                border: 'none', 
                cursor: 'pointer', 
                display: 'flex', 
                color: showCaptions ? 'var(--accent)' : 'inherit',
                transition: 'color 0.2s ease'
              }}
            >
              <Captions size={24} />
            </button>
          )}
          <button style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', color: 'inherit' }}>
            <Volume2 size={24} />
          </button>
          <button 
            onClick={handleDownload}
            title="Download Podcast"
            style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', color: 'inherit' }}
          >
            <MoreVertical size={24} />
          </button>
        </div>
      </div>

      {/* Captions Overlay */}
      {showCaptions && script && (
        <div 
          ref={scrollRef}
          style={{
            position: 'absolute',
            bottom: '100px', // Right above the player
            left: '50%',
            transform: 'translateX(-50%)',
            width: '100%',
            maxWidth: '800px',
            height: '50vh',
            background: 'rgba(247, 243, 238, 0.95)',
            backdropFilter: 'blur(12px)',
            borderRadius: '24px',
            padding: '32px',
            overflowY: 'auto',
            boxShadow: 'var(--shadow-warm)',
            display: 'flex',
            flexDirection: 'column',
            gap: '24px',
            zIndex: 15,
            border: '1px solid var(--border)'
          }}
        >
          {script.map((item, index) => {
            // Buffer to keep item active slightly after it ends, or just use strict times
            const isActive = currentTime >= item.startTime && currentTime < item.endTime;
            return (
              <div 
                key={index} 
                ref={isActive ? activeLineRef : null}
                style={{
                  opacity: isActive ? 1 : 0.4,
                  transform: isActive ? 'scale(1.02)' : 'scale(1)',
                  transition: 'all 0.3s ease',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: item.speaker === 'A' ? 'flex-start' : 'flex-end',
                  width: '100%'
                }}
              >
                <span style={{
                  fontFamily: 'var(--font-utility)',
                  fontSize: '12px',
                  fontWeight: 600,
                  color: isActive ? 'var(--accent)' : 'var(--text-secondary)',
                  textTransform: 'uppercase',
                  marginBottom: '8px',
                  letterSpacing: '0.05em'
                }}>
                  Speaker {item.speaker}
                </span>
                <p style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: isActive ? '32px' : '24px',
                  fontWeight: isActive ? 700 : 500,
                  color: 'var(--text-primary)',
                  lineHeight: 1.2,
                  margin: 0,
                  textAlign: item.speaker === 'A' ? 'left' : 'right',
                  maxWidth: '80%'
                }}>
                  {item.line}
                </p>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}
