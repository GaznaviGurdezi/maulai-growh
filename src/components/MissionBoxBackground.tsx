import React, { useMemo } from 'react';

export function MissionBoxBackground({ index, variant = 'mixed' }: { index: number, variant?: 'mixed' | 'red' }) {
  const isEven = index % 2 === 0;

  const items = useMemo(() => {
    const grid = [];
    const rows = 6;
    const cols = 9;

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const baseX = (c * (100 / cols)) + (100 / cols / 2);
        const baseY = (r * (100 / rows)) + (100 / rows / 2);

        const jitterX = (Math.random() - 0.5) * (100 / cols);
        const jitterY = (Math.random() - 0.5) * (100 / rows);

        const finalX = Math.max(5, Math.min(95, baseX + jitterX));
        const finalY = Math.max(5, Math.min(95, baseY + jitterY));

        grid.push({
          top: `${finalY}%`,
          left: `${finalX}%`,
          opacity: Math.random() * 0.4 + 0.3,
          scale: (Math.random() * 0.5 + 0.5) * 0.85,
          delay: Math.random() * 5,
          duration: Math.random() * 4 + 4,
          isGold: variant === 'red' ? false : Math.random() > 0.4,
        });
      }
    }
    return grid;
  }, [variant]);



  return (
    <>
      <style>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.1; transform: translate(-50%, -50%) scale(var(--particle-scale)); }
          50% { opacity: var(--particle-opacity); transform: translate(-50%, -50%) scale(calc(var(--particle-scale) * 1.2)); }
        }
        .mission-particle {
          animation: twinkle var(--particle-duration) ease-in-out infinite;
          animation-delay: var(--particle-delay);
          will-change: opacity, transform;
        }
      `}</style>
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden mix-blend-screen">
        {variant === 'red' ? (
          <>
            <div className="absolute top-0 left-0 w-[80%] h-[80%] blur-[100px] rounded-full opacity-40 bg-[#991b1b]/40 translate-x-[-30%] translate-y-[-30%]" />
            <div className="absolute bottom-0 right-0 w-[80%] h-[80%] blur-[100px] rounded-full opacity-30 bg-[#991b1b]/30 translate-x-[30%] translate-y-[30%]" />
          </>
        ) : isEven ? (
          <>
            <div className="absolute top-0 left-0 w-[80%] h-[80%] blur-[100px] rounded-full opacity-40 bg-[#d4af37]/30 translate-x-[-30%] translate-y-[-30%]" />
            <div className="absolute bottom-0 right-0 w-[80%] h-[80%] blur-[100px] rounded-full opacity-30 bg-[#d4af37]/20 translate-x-[30%] translate-y-[30%]" />
          </>
        ) : (
          <>
            <div className="absolute top-0 right-0 w-[80%] h-[80%] blur-[100px] rounded-full opacity-40 bg-[#991b1b]/30 translate-x-[30%] translate-y-[-30%]" />
            <div className="absolute bottom-0 left-0 w-[80%] h-[80%] blur-[100px] rounded-full opacity-30 bg-[#991b1b]/20 translate-x-[-30%] translate-y-[30%]" />
          </>
        )}
        
        {items.map((style, i) => (
          <div 
            key={i} 
            className="absolute mission-particle"
            style={{
               top: style.top, 
               left: style.left,
               '--particle-scale': style.scale,
               '--particle-opacity': style.opacity,
               '--particle-duration': `${style.duration}s`,
               '--particle-delay': `${style.delay}s`
            } as any}
          >
            <div 
              className={`${style.isGold ? 'bg-[#d4af37] shadow-[0_0_6px_rgba(212,175,55,0.6)]' : 'bg-[#991b1b] shadow-[0_0_6px_rgba(153,27,27,0.6)]'} w-1 h-1 rounded-full`}
            />
          </div>
        ))}
      </div>
    </>
  );
}
