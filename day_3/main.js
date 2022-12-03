const fs = require("fs");
const CHARS = require("./chars");

const file = fs.readFileSync("input.txt", "utf-8");

const part2 = () => {
  let score = 0;
  const strArr = file.split(/\r?\n/).map((line) => line);
  for (let i = 0; i < strArr.length; i += 3) {
    let hasRun = false;
    strArr[i].split("").forEach((s) => {
      if (
        hasRun == false &&
        strArr[i + 1].includes(s) &&
        strArr[i + 2].includes(s)
      ) {
        score += CHARS[s];
        hasRun = true;
      }
    });
  }
  console.log(score);
};

part2();
