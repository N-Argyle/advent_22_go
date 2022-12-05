const fs = require("fs");

const getInstructions = (instructionsStr) =>
  instructionsStr.split("\n").map((line, i) => {
    const instr = line
      .replace(/move /g, "")
      .replace(/ from /g, ",")
      .replace(/ to /g, ",")
      .split(",");
    return { move: instr[0], from: instr[1] - 1, to: instr[2] - 1 };
  });

const handleInput = () => {
  const file = fs.readFileSync("input.txt", "utf-8");
  const cols = [];
  let stackStr = "";
  let instructionsStr = "";
  file.split("\n\n").forEach((line, i) => {
    if (i === 0) stackStr = line;
    if (i === 1) instructionsStr = line;
  });
  const rows = stackStr.split("\n").map((line, i) => {
    return line
      .replace(/    /g, 0)
      .replace(/ /g, "")
      .replace(/\[/g, "")
      .replace(/\]/g, "")
      .split("");
  });
  rows.pop();
  rows.forEach((row) => {
    row.forEach((col, j) => {
      if (col === "0") return;
      if (!cols[j]) cols[j] = [];
      cols[j].push(col);
    });
  });
  return { instructions: getInstructions(instructionsStr), cols };
};

const part1 = () => {
  const { instructions, cols } = handleInput();
  instructions.forEach((instr) => {
    const { move, from, to } = instr;
    for (let i = 0; i < move; i++) {
      const val = cols[from].shift();
      cols[to].unshift(val);
    }
  });
  console.log(cols.map((col) => col[0]).join(""));
};

const part2 = () => {
  const { instructions, cols } = handleInput();
  instructions.forEach((instr) => {
    const { move, from, to } = instr;
    const crates = cols[from].slice(0, move);
    cols[to].unshift(...crates);
    cols[from].splice(0, move);
  });
  console.log(cols.map((col) => col[0]).join(""));
};

part1();
part2();
