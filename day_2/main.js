const fs = require('fs');

const file = fs.readFileSync('input.txt', 'utf-8');

const typeRelations = {
  rock: {
    value: 1,
    beats: 'scissors',
    losesTo: 'paper',
  },
  paper: {
    value: 2,
    beats: 'rock',
    losesTo: 'scissors',
  },
  scissors: {
    value: 3,
    beats: 'paper',
    losesTo: 'rock',
  }
}

const pt2Map = {
  "X": 'lose',
  "Y": 'draw',
  "Z": 'win',
}

const map = {
  "A": {value: 1, type: 'rock'},
  "B": {value: 2, type: 'paper'},
  "C": {value: 3, type: 'scissors'},
  "X": {value: 1, type: 'rock'},
  "Y": {value: 2, type: 'paper'},
  "Z": {value: 3, type: 'scissors'},
}

const reverseMap = {
  "rock": 1,
  "paper": 2,
  "scissors": 3,
}

const part1 = () => {
  let score = 0;
  file.split("\n").forEach(line =>  {
    const elf = map[line.split(" ")[0]];
    const mine = map[line.split(" ")[1]];
    score += mine.value
    if (elf.type === mine.type) {
      score += 3;
    }
    if (typeRelations[mine.type].beats === elf.type) {
      score += 6;
    }
  });
  console.log(score);
}

const part2 = () => {
  let score = 0;
  file.split("\n").forEach(line =>  {
    const elf = map[line.split(" ")[0]];
    const toDo = pt2Map[line.split(" ")[1]];
    console.log(toDo)
    if (toDo === 'win') {
      const elfLosesTo = typeRelations[elf.type].losesTo;
      score += reverseMap[elfLosesTo] + 6;
    }
    if (toDo === 'lose') {
      const elfBeats = typeRelations[elf.type].beats;
      score += reverseMap[elfBeats];
    }
    if (toDo === 'draw') {
      score += elf.value + 3;
    }
  });
  console.log(score);
}

part2();