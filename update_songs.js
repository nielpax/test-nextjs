const fs = require('fs');
const path = require('path');

const songsPath = path.join(__dirname, 'src/data/songs.json');
let data = JSON.parse(fs.readFileSync(songsPath, 'utf8'));

const singContent = `[Intro]
G – A – Bm

[Verse]
D
Let our voices be heard
G
Let our praises resound
Bm A G
In the song for the Holy One
D
All the nations will hear
G
And the people will see
Bm A G
The Lord so great and mighty

[Pre-chorus]
Em D/F# G D
Here we are proclaiming all the glory
Em D/F# G A
Of a God who died and set us free

[Chorus]
D
Let’s sing, sing, sing for His glory
A
Lift His name for He’s worthy
Bm G
Let’s sing, sing, sing for the Lord Almighty

D
Let’s sing, sing, sing altogether
A
Declare His reign forever
Bm G
Let’s sing, sing, sing for the one who’s Holy

[Instrumental]
D – A – Bm – G

[Verse]
[Pre-chorus]
[Chorus x2]

[Outro]
Bm G
Let’s sing, sing, sing for the one who’s Holy
Em D/F# G
Let’s sing, sing, sing for the one who’s Holy`;

const spiritContent = `[Intro]
E - F#m7 - G#m7 - F#m7

[Verse]
E                 F#m7
Spirit of the living God
E                       F#m7
We affirm Your presence here
E                 F#m7
Spirit of the living God
E                       F#m7
We affirm Your power here

[Refrain]
E                            A
To heal us and to deliver us
E                      A
To fill us and to change us
              E   
Spirit of God (Verse)

[Refrain 2]
E                              A
To rest on us and to empower us
E                            A                                          E
To work through us and to reveal in us, Jesus the King.
A                E
Jesus the King (2x)`;

const takeMeContent = `[Intro]
D - G - A - G

[Verse 1]
D                          G
Let me witness all Your wonders
A                  G
Let my heart sing Your praise
D                             G
Let my lips proclaim Your greatness
A                  G
I'm overflowing with Your love

[Pre-chorus]
Bm   A      G    D
I live for You alone
Em         D/F#     A
Come and take my all

[Chorus]
D             A
I'm Yours my Lord
Bm           G
I desire no more
D                     A
I'm caught in Your embrace
                Bm       A
Where there's unending grace
Em      A          D - G - A - G
Take me I am Yours

[Verse 2]
D                       G
Let me dwell in Your presence
A                      G
Let me stay there all my days
D                         G
Let my soul fear none in darkness
A                         G
As you shine with glorious rays

[Pre-chorus]
[Chorus  x2]

[Instrumental x2]
Bm - A - G - D - Em - D/F# - A

[Bridge x2]
G            Bm - A
Lord in this moment
G         Bm
I rest in Your arms
G              Bm - A
And cast my burdens
G         A
Into Your hands

[Chorus x2]`;

let updated = 0;
data.forEach(song => {
  if (song.id === 'sing') {
    song.content = singContent;
    updated++;
  } else if (song.id === 'spirit-of-the-living-god') {
    song.content = spiritContent;
    updated++;
  } else if (song.id === 'take-me') {
    song.content = takeMeContent;
    updated++;
  }
});

fs.writeFileSync(songsPath, JSON.stringify(data, null, 2));
console.log('Updated ' + updated + ' songs.');
