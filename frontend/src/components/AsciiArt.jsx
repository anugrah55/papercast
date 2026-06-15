import React, { useEffect, useState } from 'react';

const MASK = [
  "            a                                               ",
  "            a                                               ",
  "            a             hhhhhhhhhhhhhhh                   ",
  "            a           hh               hh                 ",
  "            a          h                   h                ",
  "            a         h                     h               ",
  "   bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb   ",
  "   bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb   ",
  "   bb                                                  bb   ",
  "   bb       ssssss           dddddddddddddddddddddd    bb   ",
  "   bb     ssssssssss         d11111111111111111111d    bb   ",
  "   bb    ssssssssssss        d11111111111111111111d    bb   ",
  "   bb   ssssssssssssss       d11111111111111111111d    bb   ",
  "   bb   ssssssssssssss       dddddddddddddddddddddd    bb   ",
  "   bb   ssssssssssssss                                 bb   ",
  "   bb   ssssssssssssss       bbbbbb      bbbbbb        bb   ",
  "   bb   ssssssssssssss       bbbbbb      bbbbbb        bb   ",
  "   bb    ssssssssssss        bbbbbb      bbbbbb        bb   ",
  "   bb     ssssssssss                                   bb   ",
  "   bb       ssssss           22222   22222   22222     bb   ",
  "   bb                        22222   22222   22222     bb   ",
  "   bb                                                  bb   ",
  "   bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb   ",
  "   bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb   "
];

export default function AsciiArt() {
  const [frame, setFrame] = useState('');

  useEffect(() => {
    let animationId;
    let lastTime = 0;
    
    const renderFrame = (time) => {
      // Throttle for matrix effect
      if (time - lastTime > 80) {
        let newFrame = '';
        for (let i = 0; i < MASK.length; i++) {
          let row = '';
          for (let j = 0; j < MASK[i].length; j++) {
            const char = MASK[i][j];
            if (char === 's') {
              // Speaker grill: fast animating text
              row += Math.random() > 0.5 ? '1' : '0';
            } else if (char === '1') {
              // Tuning dial frequency display: animating
              row += Math.random() > 0.8 ? '1' : '0';
            } else if (char === 'b' || char === 'd') {
              // Outline of the radio and dial
              row += Math.random() > 0.9 ? '0' : '1';
            } else if (char === 'a') {
              // Antenna
              row += Math.random() > 0.5 ? '|' : '1';
            } else if (char === 'h') {
              // Handle
              row += '0';
            } else if (char === '2') {
              // Knobs
              row += '0';
            } else {
              // Margins/empty space inside and outside the radio
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
    <div className="hero-ascii" style={{
      transform: 'scale(1.15)',
      lineHeight: '11px',
      letterSpacing: '1.5px',
      color: 'var(--text-primary)'
    }}>
      {frame}
    </div>
  );
}
