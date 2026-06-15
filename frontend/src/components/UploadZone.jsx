import React, { useRef, useState } from 'react';

export default function UploadZone({ file, setFile, disabled }) {
  const [isDragOver, setIsDragOver] = useState(false);
  const inputRef = useRef(null);

  const handleDragOver = (e) => {
    e.preventDefault();
    if (!disabled) setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    if (disabled) return;
    
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && droppedFile.type === 'application/pdf') {
      setFile(droppedFile);
    } else {
      alert("Please upload a PDF file.");
    }
  };

  const handleChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type === 'application/pdf') {
      setFile(selectedFile);
    }
  };

  return (
    <div 
      onClick={() => !disabled && inputRef.current?.click()}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      style={{
        border: `2px dashed ${isDragOver ? 'var(--accent)' : 'var(--border)'}`,
        borderRadius: '4px',
        padding: '40px',
        textAlign: 'center',
        cursor: disabled ? 'not-allowed' : 'pointer',
        backgroundColor: isDragOver ? 'rgba(196, 82, 42, 0.05)' : 'transparent',
        transition: 'all 0.2s ease',
        opacity: disabled ? 0.6 : 1
      }}
    >
      <input 
        type="file" 
        accept="application/pdf"
        className="visually-hidden" 
        ref={inputRef} 
        onChange={handleChange}
        disabled={disabled}
      />
      {file ? (
        <div style={{ color: 'var(--accent)', fontWeight: 600, fontFamily: 'var(--font-body)', fontSize: '20px' }}>
          ✓ {file.name}
        </div>
      ) : (
        <>
          <div style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-body)', fontSize: '22px', fontWeight: 600, marginBottom: '8px' }}>
            Drag & drop your PDF here
          </div>
          <div style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-body)', fontSize: '18px' }}>
            or click to browse
          </div>
        </>
      )}
    </div>
  );
}
