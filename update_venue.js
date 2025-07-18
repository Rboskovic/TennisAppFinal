const fs = require('fs');
const path = 'src/screens/VenueDetailsScreen.tsx';

// Check if file exists
if (!fs.existsSync(path)) {
  console.log('❌ VenueDetailsScreen.tsx not found');
  process.exit(1);
}

const content = fs.readFileSync(path, 'utf8');

// Find the booking button and add group chat button before it
const bookingButtonPattern = /(\s*<button\s+onClick=\{[^}]+\}\s+className="[^"]*bg-emerald-600[^"]*")/;

if (content.match(bookingButtonPattern)) {
  const groupChatButton = `
            <button
              onClick={() => navigate(\`/poruke?club=\${selectedVenue.id}\`)}
              className="flex-1 bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded-xl transition-colors flex items-center justify-center"
            >
              <Users className="w-5 h-5 mr-2" />
              Grupni Chat
            </button>
`;

  const updated = content.replace(
    bookingButtonPattern,
    groupChatButton + '$1'
  );

  // Also add Users import if not present
  const updatedWithImport = updated.includes('Users') ? updated : 
    updated.replace(
      /import \{ ([^}]+) \} from "lucide-react";/,
      'import { $1, Users } from "lucide-react";'
    );

  fs.writeFileSync(path, updatedWithImport);
  console.log('✅ VenueDetailsScreen updated with group chat button');
} else {
  console.log('⚠️ Could not find booking button pattern');
}
