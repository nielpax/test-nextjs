const fs = require('fs');
const path = require('path');

const songsPath = path.join(__dirname, 'src/data/songs.json');
let data = JSON.parse(fs.readFileSync(songsPath, 'utf8'));

const updates = [
  {
    id: 'send-me',
    title: 'Send Me',
    artist: 'Kirby Llaban',
    key: 'C',
    tempo: 'Medium',
    content: `[Intro]
C  G  Am  F (2X)

[Verse 1]
C        G     Am                           F
Here I am coming before Your throne
C                     G        Am                    F
Your servant Lord, ready to do Your will
C         G    Am                   F
Here I am giving my life to You
C                   G         Am
You soldier Lord, waiting for Your
          F
command

[Chorus]
C                G                    Am
Send me Lord and I will go
             F                            C
To the place You have prepared
                 G                   Am
Send me Lord and I will speak
                F                    C
With the power of Your word
                G                    Am
Send me Lord and I will see
                          F                   C
Your awesome love and majesty
          G
Lord send me
Am       F
Lord send me
         C  G  Am  F
I will go

[Verse 2]
C      G         Am                    F
I will go wherever you may lead me
C                  G          Am
Your spirit Lord will be my strength and
   F
shield
C      G                Am                     F
I will go through valleys dark and low
C                        G          Am             F
Your kingdom Lord on earth may come

[Chorus]
C              G
Lord send me
Am       C
Lord send me
         F G Am    F G Am
I will go

[Bridge]
F                G              Am
Though I fear, what lies beyond the horizon
F            G            Am
I’ll be brave, for You oh Lord are with me
F                   G       Am
There may be a mountain of oppressions
F                                G              
I’ll move on, for it is Your love that
 Am    G
Overcomes

[Chorus]
C              G
Lord send me
Am       F
Lord send me
         C 
I will go (2X)`
  },
  {
    id: 'larger-than-life',
    title: 'Larger Than Life',
    artist: 'Mike Serapio',
    key: 'G',
    tempo: 'Medium',
    content: `[Intro]
G - C (2X)

[Verse 1]
G
From the rivers to the seas
G                                                               C
From the valleys to the peak of the mountains
G
You are God
G
From the skies to the stars
G                                                         C
From the clouds to the heavens above us
G
You are God

[Chorus]
                D                  C              G
You are God of this world I am living
                D                   C                          G
You are God of these dreams I've been longing
                D              C          Em          D/F#    C
You are God of this life That I've been striving for
                             G
You're larger than Life

[Outro]
(Repeat All)
(Repeat Chorus)`
  },
  {
    id: 'more-of-you',
    title: 'More Of You',
    artist: 'Liveloud',
    key: 'A',
    tempo: 'Medium',
    content: `[Intro]
A E F#m - E - G - D (2x)

[Verse 1]
A
God of all I adore You
I rejoice in Your glory
G D A
Oh oh oh, Holy are You Lord
A
Rescued from the darkness
Told me I’m forgiven
G D A
Oh oh oh, I’m caught by Your embrace

[Pre-Chorus]
E F#m
The wonders of Your love has made me see
Bm
That You are all I need
D E D - E
Now my life is complete

[Chorus]
B
Jesus, You’re the one for me
F#
You came and loved me endlessly
G#m F# E
And all I’ll ever want is more of You
B
Your love has overtaken me
F#
You changed me and You set me free
G#m F# E
And all I’ll ever need is more of You

[Intro]

[Verse 2]
A
Made me Yours forever
With You I am stronger
G D A
Oh oh oh, I stand on higher ground

[Pre-Chorus]

[Chorus]

[Intro]

[Chorus x2]

[Outro]
A
Jesus, (You’re the one for me)
E
You came (and loved me endlessly)
F#m E D
And all I’ll ever want is more of You
A E
Your love has changed me (and You set me free)
F#m E D
And all I’ll ever need is more of You`
  },
  {
    id: 'we-ll-be-faithful',
    title: "We'll Be Faithful",
    artist: 'Liveloud',
    key: 'C',
    tempo: 'Medium',
    content: `[Intro]
C -- FM7 (2x)

[Verse 1]
C
Forgetting what lies behind
Am
Setting our hearts on the prize
F                                 Dm                               G
Always keeping our eyes on our Lord Jesus
C
We're running the race to win
Am
All the way to the end
F                                   Dm                                   G          G7
Laying down every sin that would seek to hinder us

[Chorus]
Am-G
And we'll be faithful
F         
To our calling
Am           G                      F
For you are able to keep us from falling
Am-G
And in your promise
Dm
We will trust
F                  G             Dm                  G          
We'll be faithful to finish the work you began in us

[Outro]
(Repeat all with chorus twice)`
  }
];

let updatedCount = 0;
let addedCount = 0;

updates.forEach(update => {
  let found = data.find(s => s.id === update.id);
  if (found) {
    found.content = update.content;
    if (update.artist) found.artist = update.artist;
    if (update.key) found.key = update.key;
    updatedCount++;
  } else {
    data.push({
      ...update,
      chordsUrl: ''
    });
    addedCount++;
  }
});

// Sort data alphabetically by title
data.sort((a, b) => a.title.localeCompare(b.title));

fs.writeFileSync(songsPath, JSON.stringify(data, null, 2));
console.log('Updated ' + updatedCount + ' songs. Added ' + addedCount + ' new songs.');
