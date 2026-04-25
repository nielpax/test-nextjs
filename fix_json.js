const fs = require('fs');
let data = fs.readFileSync('src/data/songs.json', 'utf8');

let fixed = '';
let inString = false;
let escapeNext = false;

for (let i = 0; i < data.length; i++) {
  let char = data[i];
  if (escapeNext) {
    escapeNext = false;
    fixed += char;
    continue;
  }
  if (char === '\\') {
    escapeNext = true;
    fixed += char;
    continue;
  }
  if (char === '"') {
    inString = !inString;
    fixed += char;
    continue;
  }
  if (inString && char === '\n') {
    fixed += '\\n';
    continue;
  }
  if (inString && char === '\r') {
    continue;
  }
  if (inString && char === '\t') {
    fixed += '\\t';
    continue;
  }
  fixed += char;
}

fs.writeFileSync('src/data/songs.json', fixed);
console.log('Fixed JSON newlines');
