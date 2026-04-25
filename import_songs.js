const fs = require('fs');
const path = require('path');

const mdPath = path.join(process.env.APPDATA || (process.platform == 'darwin' ? process.env.HOME + '/Library/Preferences' : process.env.HOME + '/.local/share'), '../.gemini/antigravity/brain/5dd4cf01-d32e-47ee-b95c-e387c65b6710/.system_generated/steps/233/content.md');
// Let's use absolute path since I know it
const absoluteMdPath = 'C:\\Users\\PAX-LAPTOP\\.gemini\\antigravity\\brain\\5dd4cf01-d32e-47ee-b95c-e387c65b6710\\.system_generated\\steps\\233\\content.md';
const songsJsonPath = path.join(__dirname, 'src', 'data', 'songs.json');

try {
  const mdContent = fs.readFileSync(absoluteMdPath, 'utf8');
  let existingSongs = [];
  try {
    existingSongs = JSON.parse(fs.readFileSync(songsJsonPath, 'utf8'));
  } catch(e) {}

  const newSongsMap = new Map();
  existingSongs.forEach(s => newSongsMap.set(s.id, s));

  // Regex to match [Song Title](https://chipstenoso.com/songs/...htm)
  // Sometimes it spans multiple lines in the markdown dump
  // Or simply look for the list items
  const lines = mdContent.split('\n');
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const match = line.match(/\[(.*?)\]\(https:\/\/chipstenoso\.com\/songs\/.*\.htm\)/i);
    if (match) {
      let title = match[1].trim().replace(/\s+/g, ' ');
      if (title.length > 0) {
        const id = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
        if (!newSongsMap.has(id)) {
          newSongsMap.set(id, {
            id,
            title,
            artist: 'Liveloud / CFC',
            key: 'C',
            tempo: 'Medium',
            content: `[Verse 1]\nAdd lyrics and chords here for ${title}`
          });
        }
      }
    }
  }

  const updatedSongs = Array.from(newSongsMap.values());
  fs.writeFileSync(songsJsonPath, JSON.stringify(updatedSongs, null, 2));
  console.log(`Successfully added songs. Total songs: ${updatedSongs.length}`);

} catch (err) {
  console.error('Error processing songs:', err);
}
