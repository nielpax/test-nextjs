const fs = require('fs');

const songsJsonPath = 'c:\\Users\\PAX-LAPTOP\\Desktop\\test\\src\\data\\songs.json';

if (fs.existsSync(songsJsonPath)) {
    const songs = JSON.parse(fs.readFileSync(songsJsonPath, 'utf8'));

    const chordRegexStr = '[A-G][#b]?(?:m|maj|min|sus|dim|aug|7|9|11|13|2|4|6|add9)?(?:\\/[A-G][#b]?)?';

    function cleanContent(text) {
        let result = text;

        // 1. Fix [Lyric][Chord] glue: "ChristE" -> "Christ\nE"
        // Look for lowercase letter or punctuation followed by a chord at the end of a line or followed by spaces
        const gluedEndRegex = new RegExp(`([a-z\\.,\\?!\\)\\}])(${chordRegexStr}(?:\\s+|$))`, 'g');
        result = result.replace(gluedEndRegex, '$1\n$2');

        // 2. Fix [Chord][Lyric] glue: "ASavior" -> "A\nSavior", "AI wanna" -> "A\nI wanna"
        // Look for a chord followed by a capital letter word
        const gluedStartRegex = new RegExp(`(${chordRegexStr})([A-Z][a-z]*)`, 'g');
        result = result.replace(gluedStartRegex, (match, chord, word) => {
            // Avoid splitting things like "Am", "Bb" if they were already correct
            // But chordRegexStr should capture the 'm' or 'b'
            // If match is "Am", chord is "Am", word is empty? No, word must be [A-Z][a-z]*
            // If match is "AmI", chord is "Am", word is "I"
            return chord + '\n' + word;
        });

        // 3. Fix merged headers on same line as chords
        result = result.replace(/(\[[^\]]+\])([^\n\s])/g, '$1\n$2');

        return result;
    }

    songs.forEach(song => {
        if (song.content) {
            song.content = cleanContent(song.content);
        }
    });

    fs.writeFileSync(songsJsonPath, JSON.stringify(songs, null, 2));
    console.log('Final cleaning complete!');
}
