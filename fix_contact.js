const fs = require('fs');

let content = fs.readFileSync('src/components/ContactUs.tsx', 'utf8');

// Fix translation selection
content = content.replace(
  "const ct = contactTranslations['ur'];",
  "const ct = contactTranslations[language as keyof typeof contactTranslations] || contactTranslations['en'];"
);

// We need to apply styles conditionally: style={language === 'ur' ? { ... } : {}}
// And we also need to restore the ${t.fontClassSerif} where appropriate.
// Alternatively, since we have the original file in git, we can just `git checkout` and then patch it correctly.

