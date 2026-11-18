import { useState, useEffect } from "react";

const masoomeen = [
  "مُحَمَّد", "عَلِيّ", "فَاطِمَة", "ٱلْحَسَن", "ٱلْحُسَيْن",
  "عَلِيّ ٱلسَّجَّاد", "مُحَمَّد ٱلْبَاقِر", "جَعْفَر ٱلصَّادِق", "مُوسَىٰ ٱلْكَاظِم",
  "عَلِيّ ٱلرِّضَا", "مُحَمَّد ٱلْجَوَاد", "عَلِيّ ٱلْهَادِي", "ٱلْحَسَن ٱلْعَسْكَرِيّ", "ٱلْمَهْدِيّ"
];

export function MasoomeenBackground() {
  const [positions, setPositions] = useState<{name: string, top: string, left: string, size: number, delay: number, opacity: number, yDuration: number}[]>([]);

  useEffect(() => {
    const generated = [];
    const cols = 6;
    const rows = 6;
    const cellWidth = 100 / cols;
    const cellHeight = 100 / rows;
    
    let index = 0;
    
    // Create a spread-out grid to prevent bunching
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
         const name = masoomeen[index % masoomeen.length];
         
         const topBase = r * cellHeight;
         const leftBase = c * cellWidth;
         
         const topOff = Math.random() * (cellHeight * 0.8);
         const leftOff = Math.random() * (cellWidth * 0.8);
         
         generated.push({
            name: name,
            top: `${topBase + topOff}%`,
            left: `${leftBase + leftOff}%`,
            size: Math.random() * 0.8 + 0.8,
            delay: Math.random() * 3,
            opacity: Math.random() * 0.25 + 0.1,
            yDuration: Math.random() * 15 + 15
         });
         
         index++;
      }
    }
    
    // Shuffle the array
    for (let i = generated.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [generated[i].name, generated[j].name] = [generated[j].name, generated[i].name];
    }
    setPositions(generated);
  }, []);

  return (
    <>
      <style>{`
        @keyframes masoomeen-float-y {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-15px); }
        }
        @keyframes masoomeen-fade-in {
          0% { opacity: 0; }
          100% { opacity: var(--masoomeen-opacity); }
        }
        .masoomeen-particle {
          animation: masoomeen-fade-in 2s ease-out forwards, masoomeen-float-y var(--masoomeen-y-duration) ease-in-out infinite;
          animation-delay: var(--masoomeen-delay), var(--masoomeen-delay);
          will-change: transform, opacity;
          opacity: 0;
        }
      `}</style>
      <div className="fixed inset-0 pointer-events-none z-[1] overflow-hidden mix-blend-screen">
        {positions.map((pos, i) => (
          <div
            key={i}
            className="absolute font-arabic text-[#991b1b] whitespace-nowrap select-none drop-shadow-[0_0_12px_rgba(153,27,27,0.7)] masoomeen-particle"
            style={{
              top: pos.top,
              left: pos.left,
              fontSize: `${pos.size}rem`,
              '--masoomeen-opacity': pos.opacity,
              '--masoomeen-y-duration': `${pos.yDuration}s`,
              '--masoomeen-delay': `${pos.delay}s`
            } as any}
          >
            {pos.name}
          </div>
        ))}
      </div>
    </>
  );
}
