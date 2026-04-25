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

function fixMergedLine(line) {
    // If the line has no lowercase letters, it's likely just chords
    if (!/[a-z]/.test(line)) return line;
    // If it's a header, don't touch it
    if (line.includes('[') && line.includes(']')) return line;
    
    // Heuristic: musicmin.app merged lines often look like:
    // "E      A          E     ASavior, Jesus Christ"
    // We want to find the transition point.
    
    // Look for the last uppercase chord-like sequence followed by a word
    // Chords are usually A-G with #, b, m, 7, etc.
    const chordPattern = /([A-G][#b]?(m|maj|min|sus|dim|aug|7|9|2|4|6|add9)?)/g;
    let match;
    let lastChordEnd = -1;
    
    while ((match = chordPattern.exec(line)) !== null) {
        // We only care about chords at the start of the line or separated by many spaces
        if (match.index === 0 || line.slice(0, match.index).trim() === line.slice(0, lastChordEnd).trim()) {
            lastChordEnd = match.index + match[0].length;
        } else {
            // If there's non-space text between the last chord and this one, 
            // then the last chord was actually the end of the chord section.
            break; 
        }
    }
    
    if (lastChordEnd > 0 && lastChordEnd < line.length) {
        const after = line.slice(lastChordEnd);
        // If the part after starts with a Capital letter and has lowercase letters, it's a lyric
        if (/^[A-Z][a-z]/.test(after)) {
            return line.slice(0, lastChordEnd) + '\n' + after;
        }
    }
    
    return line;
}

let songs = [];
if (fs.existsSync(songsJsonPath)) {
  songs = JSON.parse(fs.readFileSync(songsJsonPath, 'utf8'));
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
    let songLines = [];
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
        let cleanedLine = line.replace(/\u00A0/g, ' ');
        cleanedLine = cleanedLine.replace(/(\[[^\]]+\])([^\n\r])/g, '$1\n$2');
        
        // Split if multiple sections on same line
        const parts = cleanedLine.split(/(\[[^\]]+\])/);
        for (let part of parts) {
            if (part) {
                if (part.startsWith('[')) {
                    songLines.push(part);
                } else {
                    songLines.push(fixMergedLine(part));
                }
            }
        }
      }
    }

    let songContent = songLines.join('\n').trim();
    if (songContent) {
      songContent = songContent.replace(/([^\n])\n?(\[[^\]]+\])/g, '$1\n\n$2');
      // Final pass: fix any remaining merged headers/lyrics
      songContent = songContent.split('\n').map(l => fixMergedLine(l)).join('\n');

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
