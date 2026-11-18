import React, { useMemo } from 'react';

export function SimpleGlitter() {
  const items = useMemo(() => {
    const grid = [];
    const count = 30;
    for (let i = 0; i < count; i++) {
      grid.push({
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        opacity: Math.random() * 0.4 + 0.1,
        scale: Math.random() * 0.5 + 0.5,
        delay: Math.random() * 5,
        duration: Math.random() * 3 + 2,
      });
    }
    return grid;
  }, []);

  return (
    <>
      <style>{`
        @keyframes twinkle {
          0% { opacity: 0; }
          50% { opacity: var(--twinkle-opacity); }
          100% { opacity: 0; }
        }
        .glitter-particle {
          animation: twinkle var(--twinkle-duration) ease-in-out infinite;
          animation-delay: var(--twinkle-delay);
          will-change: opacity;
        }
      `}</style>
      <div className="absolute inset-0 overflow-hidden z-0 pointer-events-none select-none">
        {items.map((style, i) => (
          <div 
            key={i} 
            className="absolute w-1 h-1 bg-brand-gold rounded-full glitter-particle"
            style={{ 
               top: style.top, 
               left: style.left, 
               transform: `scale(${style.scale})`,
               boxShadow: '0 0 8px rgba(212,175,55,0.8), 0 0 12px rgba(212,175,55,0.4)',
               '--twinkle-opacity': style.opacity,
               '--twinkle-duration': `${style.duration}s`,
               '--twinkle-delay': `${style.delay}s`
            } as any}
          />
        ))}
      </div>
    </>
  );
}
