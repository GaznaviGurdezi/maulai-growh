import React from 'react';
import { useLanguage } from '../context/LanguageContext';

export function HeadingBackground() {
  const { language } = useLanguage();
  
  // Creates an array of 50 items to span across the background
  const items = Array.from({ length: 50 });

  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] md:w-[100%] h-[150px] overflow-hidden -z-10 opacity-30 select-none pointer-events-none flex flex-wrap justify-center items-center gap-4 [mask-image:radial-gradient(ellipse_at_center,white_0%,transparent_70%)]">
      {items.map((_, i) => (
        <span key={i} className="text-[#ff3333] drop-shadow-[0_0_8px_rgba(255,51,51,0.5)] text-[16px] md:text-xl font-bold font-arabic whitespace-nowrap opacity-60">
          يا علي مدَد
        </span>
      ))}
    </div>
  );
}
