import React, { useEffect, useState } from 'react';

const PROFILE_MASK = [
  "              111111111111              ",
  "            1111111111111111            ",
  "           111111111111111111           ",
  "          11111111111111111111          ",
  "          11111111111111111111          ",
  "         1111111111111111111111         ",
  "         1111111111111111111111         ",
  "        11111111111111111111111         ",
  "        11111111111111111111111         ",
  "        11111111111111111111111         ",
  "        1111111111111111111111          ",
  "         11111111111111111111           ",
  "          1111111111111111111           ",
  "          11111111111111111             ",
  "           111111111111111              ",
  "            1111111111111               ",
  "             11111111111                ",
  "              111111111                 ",
  "              111111111                 ",
  "               1111111                  ",
  "               1111111                  ",
  "                11111                   ",
  "               1111111                  ",
  "              111111111                 ",
  "             11111111111                ",
  "            1111111111111               ",
  "           111111111111111              ",
  "          11111111111111111             ",
  "         1111111111111111111            ",
  "        111111111111111111111           ",
  "       11111111111111111111111          ",
  "      1111111111111111111111111         ",
  "     111111111111111111111111111        ",
  "    11111111111111111111111111111       "
];

export default function AsciiHost({ facing = 'right' }) {
  const [frame, setFrame] = useState('');

  useEffect(() => {
    let animationId;
    let lastTime = 0;
    
    const renderFrame = (time) => {
      if (time - lastTime > 80) {
        let newFrame = '';
        for (let i = 0; i < PROFILE_MASK.length; i++) {
          let row = '';
          for (let j = 0; j < PROFILE_MASK[i].length; j++) {
            if (PROFILE_MASK[i][j] === '1') {
              const r = Math.random();
              if (r < 0.1) row += ' ';
              else if (r < 0.55) row += '0';
              else row += '1';
            } else {
              row += ' ';
            }
          }
          newFrame += row + '\n';
        }
        setFrame(newFrame);
        lastTime = time;
      }
      animationId = requestAnimationFrame(renderFrame);
    };
    
    animationId = requestAnimationFrame(renderFrame);
    return () => cancelAnimationFrame(animationId);
  }, []);

  return (
    <div style={{
      fontFamily: 'var(--font-display)',
      transform: facing === 'left' ? 'scaleX(-1) scale(1.3)' : 'scale(1.3)',
      lineHeight: '11px',
      letterSpacing: '1px',
      color: 'var(--text-primary)',
      whiteSpace: 'pre',
      opacity: 0.8
    }}>
      {frame}
    </div>
  );
}
