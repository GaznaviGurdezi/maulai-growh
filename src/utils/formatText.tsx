import React from 'react';

export const formatDarood = (text: string) => {
  if (!text || typeof text !== 'string') return text;
  
  // The Arabic symbol for Sallallahu Alayhi Wasallam is ﷺ (U+FDFA)
  const parts = text.split(/(ﷺ)/g);
  
  return parts.map((part, i) => {
    if (part === 'ﷺ') {
      return (
        <span key={i} className="darood-symbol">
          {part}
        </span>
      );
    }
    return part;
  });
};
