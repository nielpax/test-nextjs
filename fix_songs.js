let fs = require('fs');
let data = fs.readFileSync('src/data/songs.json', 'utf8');

// ablaze
data = data.replace('BI am ablaze for You Lord        AI wanna', 'B\nI am ablaze for You Lord        A\nI wanna');
data = data.replace('Ablaze for You LordA\n', 'Ablaze for You Lord\nA\n');
data = data.replace('Spirit of GodA\n', 'Spirit of God\nA\n');

// all-for-you
data = data.replace('night                        A\nYou called me to Your light         E\nTo Your light', 'night                        \nA\nYou called me to Your light         \nE\nTo Your light');
data = data.replace('overcome                    A\nNow I stand here strong                E‘Cause of You alone', 'overcome                    \nA\nNow I stand here strong                \nE\n‘Cause of You alone');
data = data.replace('live   F#m        E        DI choose the path You live (Jesus)', 'live   \nF#m        E        D\nI choose the path You live (Jesus)');
data = data.replace('DI will follow Your way                           F#m\nFor Your love has taken my heart,                               D\nMy life, my praise is all for Yours', 'D\nI will follow Your way                           \nF#m\nFor Your love has taken my heart,                               \nD\nMy life, my praise is all for Yours');
data = data.replace('D\nAnd Your heart has captured me                        F#m\nFor I am taken by Your Endless                             Dmercies', 'D\nAnd Your heart has captured me                        \nF#m\nFor I am taken by Your Endless                             \nD\nmercies');
data = data.replace('glorify          A\nLove came down to save              E\nPierced and crucified         F#m\nConquered death          D\nGave new life         A\nHow You saved my soul     E\nNow I’m alive', 'glorify          \nA\nLove came down to save              \nE\nPierced and crucified         \nF#m\nConquered death          \nD\nGave new life         \nA\nHow You saved my soul     \nE\nNow I’m alive');

// all-that-has-breath-praise
data = data.replace('untoldB\n', 'untold\nB\n');
data = data.replace('embraceE\n', 'embrace\nE\n');
data = data.replace('have, andE\n', 'have, and\nE\n');
data = data.replace('know, andG#m\n', 'know, and\nG#m\n');
data = data.replace('gaveE\n', 'gave\nE\n');
data = data.replace('live, andG#m\n', 'live, and\nG#m\n');
data = data.replace('Lord!E\n', 'Lord!\nE\n');
data = data.replace('Lord!G#m\n', 'Lord!\nG#m\n');
data = data.replace('salvation!              F#', 'salvation!              \nF#');

// faithful-god
data = data.replace('E\nLord of Lords  B\nYour promise never fails  A\nAnd Your word never fades  A\nIn Your splendor  E\nYou chose to give your all   B\nPaid for my sins   A\nDied to save my soul', 'E\nLord of Lords  \nB\nYour promise never fails  \nA\nAnd Your word never fades  \nA\nIn Your splendor  \nE\nYou chose to give your all   \nB\nPaid for my sins   \nA\nDied to save my soul');
data = data.replace('me Lord      E -  B  - A\nNow fills my life                       F#m\nYou\'re all I\'m living for     E                A     B\nAnd all that I long for', 'me Lord      \nE -  B  - A\nNow fills my life                       \nF#m\nYou\'re all I\'m living for     \nE                A     B\nAnd all that I long for');
data = data.replace('EI’ll sing to You this song  F#m\nAnd worship You    B\nGive You all my praise                C#m – B\nTill the end of my daysE\nThese hands I raise         A\nAs I surrender all   F#m                       B\nFor you alone will forever be my God', 'E\nI’ll sing to You this song  \nF#m\nAnd worship You    \nB\nGive You all my praise                \nC#m – B\nTill the end of my days\nE\nThese hands I raise         \nA\nAs I surrender all   \nF#m                       B\nFor you alone will forever be my God');
data = data.replace('E/G#I won\'t be moved', 'E/G#\nI won\'t be moved');
data = data.replace('certain       A         B', 'certain       \nA         B');

// follow-you
data = data.replace('AI glory in', 'A\nI glory in');
data = data.replace('A\nYou are my master          F#m    B\nAnd I’ll follow You everyday', 'A\nYou are my master          \nF#m    B\nAnd I’ll follow You everyday');
data = data.replace('A          F#m          BI\'ll witness', 'A          F#m          B\nI\'ll witness');

// for-you-almighty
data = data.replace('E D\nWith each day Lord I will singFor You Almighty', 'E D\nWith each day Lord I will sing\nFor You Almighty');

// freedom
data = data.replace('DI believe', 'D\nI believe');
data = data.replace('CI believe', 'C\nI believe');

// from-within
data = data.replace('C#I want to', 'C#\nI want to');
data = data.replace('D#mI’ll give', 'D#m\nI’ll give');

// god-in-me
data = data.replace('G        D', 'G\n        D');
data = data.replace('dark        D', 'dark\n        D');

// god-is-enough
data = data.replace('GI hear', 'G\nI hear');
data = data.replace('GI feel', 'G\nI feel');
data = data.replace('GI have', 'G\nI have');
data = data.replace('BI’m safe', 'B\nI’m safe');

// gracious-god
data = data.replace('FI surrender', 'F\nI surrender');
data = data.replace('CI’ll declare', 'C\nI’ll declare');

// grateful
data = data.replace('day    D', 'day    \nD');
data = data.replace('You      A', 'You      \nA');
data = data.replace('smileD', 'smile\nD');
data = data.replace('LordD', 'Lord\nD');
data = data.replace('F#mI’ll go', 'F#m\nI’ll go');
data = data.replace('DI will', 'D\nI will');
data = data.replace('DI’ll forever', 'D\nI’ll forever');
data = data.replace('DI’ll serve', 'D\nI’ll serve');
data = data.replace('GodEI’ll forever', 'God\nE\nI’ll forever');

// hallelujah
data = data.replace('DI stand', 'D\nI stand');

// have-your-way
data = data.replace('EmI’ve realized', 'Em\nI’ve realized');
data = data.replace('EmI lay it all', 'Em\nI lay it all');
data = data.replace('G‘Cause everything', 'G\n‘Cause everything');

// heaven
data = data.replace('G/B\nRight by Your side I’ll stay  C          D       G\nWorshipping You all day        CI will live and die for You   G/B                  C\nAnything I will do, for heaven is', 'G/B\nRight by Your side I’ll stay  \nC          D       G\nWorshipping You all day        \nC\nI will live and die for You   \nG/B                  C\nAnything I will do, for heaven is');

// home
data = data.replace('F#m7Here I am againAsus2I am down', 'F#m7\nHere I am again\nAsus2\nI am down');
data = data.replace('F#m7I\'ve been chasing the wind,Asus2walking', 'F#m7\nI\'ve been chasing the wind,\nAsus2\nwalking');
data = data.replace('F#m7Oh, my soul thirst for You,Asus2A thirst', 'F#m7\nOh, my soul thirst for You,\nAsus2\nA thirst');
data = data.replace('F#m7I have longed for Your truth,Asus2Cause', 'F#m7\nI have longed for Your truth,\nAsus2\nCause');
data = data.replace('F#m7Hear my heart cry, I see Your lightAsus2Draw', 'F#m7\nHear my heart cry, I see Your light\nAsus2\nDraw');
data = data.replace('F#m7The joy I can\'t hide, lookin\' in Your eyesAsus2Lord', 'F#m7\nThe joy I can\'t hide, lookin\' in Your eyes\nAsus2\nLord');
data = data.replace('EI am runningF#m7           Asus2back', 'E\nI am running\nF#m7           Asus2\nback');
data = data.replace('Maker,F#m7         Asus2Whelmed', 'Maker,\nF#m7         Asus2\nWhelmed');
data = data.replace('F#m7Now I am home,        Asus2Oh I am', 'F#m7\nNow I am home,        \nAsus2\nOh I am');
data = data.replace('Asus2me let', 'Asus2\nme let');
data = data.replace('Asus2I\'m home', 'Asus2\nI\'m home');
data = data.replace('Asus2You alone', 'Asus2\nYou alone');
data = data.replace('Asus2And home', 'Asus2\nAnd home');
data = data.replace('F#m7You are my Home           Asus2You', 'F#m7\nYou are my Home           \nAsus2\nYou');
data = data.replace('EI am runnin\'F#m7           Asus2back', 'E\nI am runnin\'\nF#m7           Asus2\nback');
data = data.replace('Maker,F#m7            Asus2Whelmed', 'Maker,\nF#m7            Asus2\nWhelmed');
data = data.replace('runnin\'F#m7                Asus2You held', 'runnin\'\nF#m7                Asus2\nYou held');
data = data.replace('startF#m7                Asus2Oh what', 'start\nF#m7                Asus2\nOh what');
data = data.replace('felt               E  F#m7        Asus2Cause now', 'felt               \nE  F#m7        Asus2\nCause now');

// i-know
data = data.replace('AI know', 'A\nI know');
data = data.replace('C#mI know', 'C#m\nI know');
data = data.replace('BI know', 'B\nI know');
data = data.replace('BI will raise', 'B\nI will raise');
data = data.replace('BI am thankful', 'B\nI am thankful');

// i-will
data = data.replace('Am7You', 'Am7\nYou');
data = data.replace('G     Fmaj7You', 'G     \nFmaj7\nYou');
data = data.replace('Fmaj7I will give', 'Fmaj7\nI will give');
data = data.replace('Fmaj7And I', 'Fmaj7\nAnd I');
data = data.replace('Fmaj7I will worship', 'Fmaj7\nI will worship');
data = data.replace('Fmaj7I will trust', 'Fmaj7\nI will trust');
data = data.replace('Fmaj7You came', 'Fmaj7\nYou came');
data = data.replace('Fmaj7You are', 'Fmaj7\nYou are');
data = data.replace('Fmaj7And I', 'Fmaj7\nAnd I');
data = data.replace('Fmaj7I will', 'Fmaj7\nI will');
data = data.replace('Am7I belong', 'Am7\nI belong');
data = data.replace('willYou', 'will\nYou');
data = data.replace('meFmaj7You', 'me\nFmaj7\nYou');
data = data.replace('endlesslyAm7', 'endlessly\nAm7');
data = data.replace('praise           Fmaj7  G\nOh Jesus', 'praise           \nFmaj7  G\nOh Jesus');

// you're my disciples
data = data.replace("Intro: G -- D -- Em - D - C - G (2X)\n\nG D\nThere is", "[Intro]\nG -- D -- Em - D - C - G (2X)\n\n[Verse 1]\nG D\nThere is");
data = data.replace("Refrain:\nEm G\nYou", "[Pre-Chorus]\nEm G\nYou");
data = data.replace("Chorus:\nG\nYou said", "[Chorus]\nG\nYou said");
data = data.replace("Coda:\nG D\nWe will", "[Outro]\nG D\nWe will");

fs.writeFileSync('src/data/songs.json', data);
console.log('Fixed songs format!');
