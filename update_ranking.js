const fs = require('fs');
const content = fs.readFileSync('src/screens/RankingScreen.tsx', 'utf8');
const updated = content.replace(
  'console.log(`Message ${playerName}`);',
  'navigate(`/poruke?player=${playerName}`);'
);
fs.writeFileSync('src/screens/RankingScreen.tsx', updated);
console.log('✅ RankingScreen updated');
