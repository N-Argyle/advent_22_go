const fs = require("fs");
const file = fs.readFileSync("input.txt", "utf-8");

const main = (n) => {
  const lines = file.split("\n").map((line) => line.split(""));
  lines.forEach((line) => {
    for (let i = 0; i < line.length; i += 1) {
      const group = line.slice(i, i + n);
      const unique = [...new Set(group)];
      if (unique.length === n) {
        console.log(`${n} unique at ${i + n}`);
        i = line.length;
      }
    }
  });
};

main(4); // pt 1
part1(14); // pt 2
