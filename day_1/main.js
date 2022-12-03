const fs = require("fs");

const file = fs.readFileSync("input1.txt", "utf-8");

const part2 = () => {
  let largestValue = 0;
  let secondValue = 0;
  let thirdValue = 0;
  let currentValue = 0;

  file.split(/\r?\n/).forEach((line) => {
    if (line) {
      currentValue += Number(line);
      return;
    }
    if (currentValue > largestValue) {
      thirdValue = secondValue;
      secondValue = largestValue;
      largestValue = currentValue;
    } else if (currentValue > secondValue) {
      thirdValue = secondValue;
      secondValue = currentValue;
    } else if (currentValue > thirdValue) {
      thirdValue = currentValue;
    }
    currentValue = 0;
    return;
  });
  console.log(largestValue);
};

part2();
