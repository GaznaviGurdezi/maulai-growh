import React, { useMemo } from 'react';

export function RedRaysBackground() {
  const items = useMemo(() => {
    const grid = [];
    const rows = 6;
    const cols = 8;
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const baseX = (c * (100 / cols)) + (100 / cols / 2);
        const baseY = (r * (100 / rows)) + (100 / rows / 2);
        const jitterX = (Math.random() - 0.5) * (100 / cols) * 1.5;
        const jitterY = (Math.random() - 0.5) * (100 / rows) * 1.5;
        const finalX = Math.max(5, Math.min(95, baseX + jitterX));
        const finalY = Math.max(5, Math.min(95, baseY + jitterY));

        const distanceToCenter = Math.abs(finalX - 50);
        const normalizedDistance = distanceToCenter / 50;
        
        const itemOpacity = normalizedDistance * 0.4 + 0.15;
        const glowRadius = normalizedDistance * 18;
        
        grid.push({
          top: `${finalY}%`,
          left: `${finalX}%`,
          opacity: itemOpacity,
          scale: Math.random() * 0.4 + 1.0,
          delay: Math.random() * 3,
          yDuration: Math.random() * 15 + 15,
          glowRadius: glowRadius,
          isDot: grid.length % 2 === 0,
          isSmall: grid.length % 3 === 0
        });
      }
    }
    return grid;
  }, []);

  return (
    <>
      <style>{`
        @keyframes red-rays-float-y {
          0%, 100% { transform: translate(-50%, -50%) scale(var(--red-rays-scale)) translateY(0); }
          50% { transform: translate(-50%, -50%) scale(var(--red-rays-scale)) translateY(-15px); }
        }
        @keyframes red-rays-fade-in {
          0% { opacity: 0; }
          100% { opacity: var(--red-rays-opacity); }
        }
        .red-rays-particle {
          animation: red-rays-fade-in 2s ease-out forwards, red-rays-float-y var(--red-rays-y-duration) ease-in-out infinite;
          animation-delay: var(--red-rays-delay), var(--red-rays-delay);
          will-change: transform, opacity;
          opacity: 0;
        }
      `}</style>

      <div className="absolute inset-0 overflow-visible z-0 pointer-events-none select-none [mask-image:radial-gradient(ellipse_at_center,white_30%,transparent_100%)]">
        {items.map((style, i) => (
          <div 
            key={i} 
            className="absolute red-rays-particle"
            style={{
               top: style.top,
               left: style.left,
               '--red-rays-scale': style.scale,
               '--red-rays-opacity': style.opacity,
               '--red-rays-y-duration': `${style.yDuration}s`,
               '--red-rays-delay': `${style.delay}s`
            } as any}
          >
            {style.isDot ? (
              <div 
                className={`bg-[#ff0000] w-1 h-1 rounded-full`}
                style={{
                    boxShadow: style.glowRadius > 0 ? `0 0 ${style.glowRadius}px rgba(255,0,0,0.8)` : 'none'
                }}
              />
            ) : (
              <svg 
                viewBox="0 0 24 24" 
                className={`text-[#ff0000] ${style.isSmall ? 'w-3 h-3' : 'w-2 h-2 opacity-80'}`}
                fill="currentColor"
                style={{
                    filter: style.glowRadius > 0 ? `drop-shadow(0 0 ${style.glowRadius / 2}px rgba(255,0,0,0.8))` : 'none'
                }}
              >
                <path d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5L12 0Z" />
              </svg>
            )}
          </div>
        ))}
      </div>
    </>
  );
}
