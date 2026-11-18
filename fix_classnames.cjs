const fs = require('fs');

let content = fs.readFileSync('src/components/ContactUs.tsx', 'utf8');

// Line 100: h1
content = content.replace(
  /<h1 className=\{`text-4xl md:text-6xl lg:text-7xl text-brand-gold filter drop-shadow-\[0_10px_20px_rgba\(212,175,55,0.4\)\]`\} style=\{language === 'ur' \? \{ fontFamily: "Georgia", fontStyle: "normal", fontSize: "80px" \} : undefined\}>/g,
  '<h1 className={`text-4xl md:text-6xl lg:text-7xl text-brand-gold filter drop-shadow-[0_10px_20px_rgba(212,175,55,0.4)] ${t.fontClassSerif}`} style={language === \'ur\' ? { fontFamily: "Georgia", fontStyle: "normal", fontSize: "80px" } : undefined}>'
);

// Line 107: h2
content = content.replace(
  /<h2 className=\{`text-white mb-6 font-normal tracking-wider uppercase relative z-10`\} style=\{language === 'ur' \? \{ fontStyle: "normal", fontSize: "27px" \} : undefined\}>/g,
  '<h2 className={`text-white mb-6 font-normal tracking-wider uppercase relative z-10 ${t.fontClassSerif}`} style={language === \'ur\' ? { fontStyle: "normal", fontSize: "27px" } : undefined}>'
);

// Line 138: h3
content = content.replace(
  /<h3 className=\{`text-brand-gold uppercase tracking-widest font-bold`\} style=\{language === 'ur' \? \{ fontSize: "50px", fontFamily: "Georgia" \} : undefined\}>/g,
  '<h3 className={`text-brand-gold uppercase tracking-widest font-bold ${t.fontClassSerif}`} style={language === \'ur\' ? { fontSize: "50px", fontFamily: "Georgia" } : undefined}>'
);

// Line 185: span
content = content.replace(
  /<span className=\{`text-white tracking-widest uppercase font-bold`\} style=\{language === 'ur' \? \{ fontSize: "20px", fontFamily: "Georgia" \} : undefined\}>/g,
  '<span className={`text-white tracking-widest uppercase font-bold ${t.fontClassSerif}`} style={language === \'ur\' ? { fontSize: "20px", fontFamily: "Georgia" } : undefined}>'
);

// Line 204: h3 sendMessage
content = content.replace(
  /<h3 className=\{`text-white uppercase tracking-wider font-extrabold`\} style=\{language === 'ur' \? \{ fontFamily: "Georgia", fontSize: "55px" \} : undefined\}>/g,
  '<h3 className={`text-white uppercase tracking-wider font-extrabold ${t.fontClassSerif}`} style={language === \'ur\' ? { fontFamily: "Georgia", fontSize: "55px" } : undefined}>'
);

// Line 298: h3 connectWithUs
content = content.replace(
  /<h3 className=\{`text-white uppercase tracking-widest`\} style=\{language === 'ur' \? \{ fontFamily: "Georgia", fontSize: "30px" \} : undefined\}>/g,
  '<h3 className={`text-white uppercase tracking-widest ${t.fontClassSerif}`} style={language === \'ur\' ? { fontFamily: "Georgia", fontSize: "30px" } : undefined}>'
);

// Line 336: h3 togetherDifference
content = content.replace(
  /<h3 className=\{`text-brand-gold mb-4 md:mb-6 drop-shadow-md text-center`\} style=\{language === 'ur' \? \{ fontFamily: "Arial", fontSize: "45px" \} : undefined\}>/g,
  '<h3 className={`text-brand-gold mb-4 md:mb-6 drop-shadow-md text-center ${t.fontClassSerif}`} style={language === \'ur\' ? { fontFamily: "Arial", fontSize: "45px" } : undefined}>'
);

// Line 337: p supportQuote
content = content.replace(
  /<p className=\{`text-gray-200 text-center`\} style=\{language === 'ur' \? \{ lineHeight: "46.5px", fontStyle: "normal", fontSize: "20px" \} : undefined\}>/g,
  '<p className={`text-gray-200 text-center max-w-2xl italic ${t.fontClassSerif}`} style={language === \'ur\' ? { lineHeight: "46.5px", fontStyle: "normal", fontSize: "20px" } : undefined}>'
);

fs.writeFileSync('src/components/ContactUs.tsx', content);
