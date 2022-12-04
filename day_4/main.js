const fs = require("fs");

const file = fs.readFileSync("input.txt", "utf-8");

const part1 = () => {
  let score = 0;
  const strArr = file.split(/\r?\n/).map((line) => line.split(/\,|-/));
  for (let i = 0; i < strArr.length; i++) {
    const AA = Number(strArr[i][0]);
    const AB = Number(strArr[i][1]);
    const BA = Number(strArr[i][2]);
    const BB = Number(strArr[i][3]);
    if ((AA <= BA && AB >= BB) || (BA <= AA && BB >= AB)) {
      score++;
    }
  }
  console.log(score);
};

const part2 = () => {
  let score = 0;
  const strArr = file.split(/\r?\n/).map((line) => line.split(/\,|-/));
  for (let i = 0; i < strArr.length; i++) {
    const AA = Number(strArr[i][0]);
    const AB = Number(strArr[i][1]);
    const BA = Number(strArr[i][2]);
    const BB = Number(strArr[i][3]);
    if (
      (BA <= AB && BA >= AA) ||
      (BB <= AB && BB >= AA) ||
      (AB <= BB && AB >= BA) ||
      (AA >= BA && AA <= BB)
    ) {
      score++;
    }
  }
  console.log(score);
};

part2();
