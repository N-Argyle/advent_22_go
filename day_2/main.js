const fs = require('fs');

const map = {
  "A": 1,
  "B": 2,
  "C": 3,
  "X": 1,
  "Y": 2,
  "Z": 3,
}
let score = 0;
const file = fs.readFileSync('input.txt', 'utf-8');
file.split(/\r?\n/).forEach(line =>  {
  const elf = map[line[0]];
  const mine = map[line[2]];
  score += mine
  if (mine == elf) {
    score += 3
  }
  if (mine > elf) {
    score += 6
  }
});
console.log(score);