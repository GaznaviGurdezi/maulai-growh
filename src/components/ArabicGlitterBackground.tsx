import React, { useMemo } from 'react';

export function ArabicGlitterBackground() {
  const arabicAlphabets = ['ا', 'ب', 'ت', 'ث', 'ج', 'ح', 'خ', 'د', 'ذ', 'ر', 'ز', 'س', 'ش', 'ص', 'ض', 'ط', 'ظ', 'ع', 'غ', 'ف', 'ق', 'ك', 'ل', 'م', 'ن', 'ه', 'و', 'ي'];
  
  const items = useMemo(() => {
    const grid = [];
    const rows = 10;
    const cols = 15;
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        if (Math.random() > 0.4) continue;
        
        const baseX = (c * (100 / cols)) + (100 / cols / 2);
        const baseY = (r * (100 / rows)) + (100 / rows / 2);
        const jitterX = (Math.random() - 0.5) * (100 / cols) * 1.5;
        const jitterY = (Math.random() - 0.5) * (100 / rows) * 1.5;
        const finalX = Math.max(2, Math.min(98, baseX + jitterX));
        const finalY = Math.max(2, Math.min(98, baseY + jitterY));
        
        const isLetter = Math.random() > 0.4;
        const letter = arabicAlphabets[Math.floor(Math.random() * arabicAlphabets.length)];
        
        grid.push({
          top: `${finalY}%`,
          left: `${finalX}%`,
          opacity: Math.random() * 0.5 + 0.4,
          scale: Math.random() * 0.6 + 0.8,
          delay: Math.random() * 5,
          yDuration: Math.random() * 20 + 20,
          isLetter,
          letter
        });
      }
    }
    return grid;
  }, []);

  return (
    <>
      <style>{`
        @keyframes arabic-float-y {
          0%, 100% { transform: translate(-50%, -50%) scale(var(--arabic-scale)) translateY(0); }
          50% { transform: translate(-50%, -50%) scale(var(--arabic-scale)) translateY(-25px); }
        }
        @keyframes arabic-fade-in {
          0% { opacity: 0; }
          100% { opacity: var(--arabic-opacity); }
        }
        .arabic-particle {
          animation: arabic-fade-in 3s ease-out forwards, arabic-float-y var(--arabic-y-duration) ease-in-out infinite;
          animation-delay: var(--arabic-delay), var(--arabic-delay);
          will-change: transform, opacity;
          opacity: 0;
        }
      `}</style>
      <div className="absolute inset-0 overflow-hidden rounded-3xl z-0 pointer-events-none select-none [mask-image:radial-gradient(ellipse_at_center,white_20%,transparent_100%)]">
        {items.map((style, i) => (
          <div 
            key={i} 
            className="absolute text-brand-gold font-arabic arabic-particle"
            style={{ 
               top: style.top, 
               left: style.left,
               '--arabic-scale': style.scale,
               '--arabic-opacity': style.opacity,
               '--arabic-y-duration': `${style.yDuration}s`,
               '--arabic-delay': `${style.delay}s`
            } as any}
          >
            {style.isLetter ? (
              <span 
                className="text-[20px] md:text-2xl font-bold"
                style={{
                  textShadow: '0 0 15px rgba(212,175,55,1), 0 0 30px rgba(212,175,55,0.8), 0 0 45px rgba(212,175,55,0.6)'
                }}
              >{style.letter}</span>
            ) : (
              <div 
                className={`bg-brand-gold w-2 h-2 rounded-full`}
                style={{ 
                   boxShadow: `0 0 15px rgba(212,175,55,1), 0 0 30px rgba(212,175,55,0.8), 0 0 45px rgba(212,175,55,0.6)`
                }}
              />
            )}
          </div>
        ))}
      </div>
    </>
  );
}
