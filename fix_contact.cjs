const fs = require('fs');

let content = fs.readFileSync('src/components/ContactUs.tsx', 'utf8');

// Revert translation selection
content = content.replace(
  "const ct = contactTranslations['ur'];",
  "const ct = contactTranslations[language as keyof typeof contactTranslations] || contactTranslations['en'];"
);

// We need to apply styles conditionally: style={language === 'ur' ? { ... } : undefined}
content = content.replace(
  /style=\{\{([^}]+)\}\}/g,
  (match, p1) => {
    if (p1.includes("border: 0")) return match; // skip iframe
    return `style={language === 'ur' ? {${p1}} : undefined}`;
  }
);

// We should also restore the original classNames where we removed `${t.fontClassSerif}` 
// But since the original classNames didn't have the font style, maybe we can just dynamically append the fontClassSerif if not Urdu.
// Actually, it's simpler: if language !== 'ur', we should probably still include t.fontClassSerif where we stripped it.
// Let's just fix the style={{}} to style={language === 'ur' ? {...} : undefined} first.

fs.writeFileSync('src/components/ContactUs.tsx', content);
