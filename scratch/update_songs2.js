const fs = require('fs');
const path = require('path');

const songsJsonPath = 'c:\\Users\\PAX-LAPTOP\\Desktop\\test\\src\\data\\songs.json';
const brainDir = 'C:\\Users\\PAX-LAPTOP\\.gemini\\antigravity\\brain\\b0e79c38-260e-4f21-9801-ea20274bd1ba\\.system_generated\\steps';

const mapping = {
  '17': 'faithful-god',
  '40': 'ablaze',
  '43': 'all-for-you',
  '46': 'all-that-has-breath-praise',
  '49': 'fearless',
  '52': 'follow-you',
  '55': 'for-you-almighty',
  '58': 'freedom',
  '61': 'from-within',
  '64': 'god-in-me',
  '67': 'god-is-enough',
  '79': 'gracious-god',
  '82': 'grateful',
  '85': 'hallelujah',
  '88': 'have-your-way',
  '91': 'heaven',
  '94': 'home',
  '97': 'i-know',
  '100': 'i-will',
  '103': 'in-your-arms'
};

let songs = [];
if (fs.existsSync(songsJsonPath)) {
  songs = JSON.parse(fs.readFileSync(songsJsonPath, 'utf8'));
}

// A chord regex. E.g. "C#m", "Bb", "D/F#"
// Musicmin chords often include slash chords.
const chordRegexStr = '[A-G][#b]?(m|maj|min|sus|dim|aug|7|9|11|13|2|4|6|add9)?(\\/[A-G][#b]?)?';

function fixSpacing(text) {
    let result = text.replace(/\u00A0/g, ' ');

    // 1. Ensure newlines around section headers [Intro], [Verse 1], etc.
    result = result.replace(/(\[[^\]]+\])/g, '\n\n$1\n');

    // 2. The main issue: Lyrics are glued to chords.
    // Example: "...Jesus ChristE          A..."
    // We want to insert a newline between 't' and 'E'.
    // Look for (lowercase or punctuation) followed by (Chord) followed by (Spaces or another chord)
    // Actually, any uppercase letter glued to a lowercase/punctuation is suspect if it's a chord.
    // Let's split when a lowercase letter/punctuation is immediately followed by a Chord that is followed by spaces or end of string.
    const gluedChordRegex = new RegExp(`([a-z\\.,\\?!\\)\\}\\]])(${chordRegexStr}(?:\\s+|$))`, 'g');
    result = result.replace(gluedChordRegex, '$1\n$2');

    // 3. The other issue: Chords glued to the beginning of lyrics.
    // Example: "E      A          E     ASavior, Jesus..."
    // Here we have spaces, then a Chord, glued to a Word starting with uppercase.
    // Look for (Chord) glued to (Uppercase letter that is not part of a chord, followed by lowercase)
    // "A" followed by "Savior" -> "A" is chord, "Savior" is lyric.
    // Let's find patterns where a chord is followed immediately by a capital letter.
    const chordGluedToLyricRegex = new RegExp(`(${chordRegexStr})([A-Z][a-z]+)`, 'g');
    result = result.replace(chordGluedToLyricRegex, '$1\n$4'); // $4 is the captured lyric part because chordRegexStr has 2 capture groups.
    // Wait, let's be precise with capture groups.
    // chordRegexStr has 2 groups: (m|maj...) and (\/[A-G]...)?
    // So $1 is the whole chord? No, new RegExp(`(${chordRegexStr})([A-Z][a-z]+)`) makes $1 the whole chord, $2 is modifier, $3 is slash, $4 is the lyric.
    
    // 4. Sometimes chords are glued to lowercase words too. "Ahello" -> "A\nhello".
    // "m" is tricky (e.g. Cmin). We'll assume lyrics don't usually start glued to chords unless it's a clear word.
    const chordGluedToLowerLyricRegex = new RegExp(`(${chordRegexStr})([a-z]{3,})`, 'g');
    // If we have "E" followed by "very", "E" is chord, "very" is lyric? 
    // This might be risky, let's stick to uppercase first and see.

    // Let's refine the replacement using a custom replacer function to be safe.
    const chordPattern = new RegExp(`^${chordRegexStr}$`);
    result = result.replace(/([A-G][#b]?(?:m|maj|min|sus|dim|aug|7|9|11|13|2|4|6|add9)?(?:\/[A-G][#b]?)?)([A-Z][a-z]+)/g, (match, chord, word) => {
        return chord + '\n' + word;
    });

    // Also fix glued chords to lowercase (e.g. C#mhere -> C#m\nhere) - only if the word is long enough
    result = result.replace(/([A-G][#b]?(?:m|maj|min|sus|dim|aug|7|9|11|13|2|4|6|add9)?(?:\/[A-G][#b]?)?)([a-z]{3,})/g, (match, chord, word) => {
        // avoid matching words like "Am" + "azing" = "Amazing" -> "Am\nazing".
        // If the original was "Amazing", the chord is "Am", word is "azing". 
        // We should only do this if it's preceded by spaces or it's a very clear chord sequence.
        return match; // skip this risky one for now
    });

    // Clean up multiple newlines
    result = result.replace(/\n{3,}/g, '\n\n');
    return result.trim();
}

for (const [step, id] of Object.entries(mapping)) {
  const contentPath = path.join(brainDir, step, 'content.md');
  if (fs.existsSync(contentPath)) {
    console.log(`Processing ${id} from step ${step}...`);
    const fileContent = fs.readFileSync(contentPath, 'utf8');
    
    const titleMatch = fileContent.match(/Title: (.*) - Liveloud/);
    const title = titleMatch ? titleMatch[1] : id.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
    const urlMatch = fileContent.match(/Source: (.*)/);
    const chordsUrl = urlMatch ? urlMatch[1] : '';

    const lines = fileContent.split('\n');
    let songText = '';
    let startCollecting = false;
    
    for (let i = 0; i < lines.length; i++) {
      let line = lines[i];
      const trimmedLine = line.trim();
      
      if (!startCollecting && i > 15) {
        if ((trimmedLine.includes('[Intro') || trimmedLine.includes('[Verse') || trimmedLine.includes('[Chorus') || trimmedLine.includes('Capo:')) && !trimmedLine.startsWith('#') && !trimmedLine.startsWith('Title:') && !trimmedLine.startsWith('Description:')) {
           startCollecting = true;
        }
      }
      
      if (startCollecting) {
        songText += line + '\n';
      }
    }

    let songContent = fixSpacing(songText);
    
    if (songContent) {
      let song = songs.find(s => s.id === id);
      if (!song) {
        song = { id, title, artist: 'Liveloud', key: 'C', tempo: 'Medium' };
        songs.push(song);
      }
      song.title = title;
      song.content = songContent;
      song.chordsUrl = chordsUrl;
    }
  }
}

songs.sort((a, b) => a.title.localeCompare(b.title));
fs.writeFileSync(songsJsonPath, JSON.stringify(songs, null, 2));
console.log('Update complete!');
