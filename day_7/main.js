const fs = require("fs");

const getDirectorySize = (directory, depth = 0) => {
  let size = 0;
  Object.keys(directory.children).forEach((child) => {
    if (directory.children[child].type === "file") {
      size += directory.children[child].size;
    } else {
      size += getDirectorySize(directory.children[child], depth + 1);
    }
  });
  return size;
};

const getDirectoriesWithSize = (
  directory,
  size,
  depth = 0,
  currentItem,
  operator
) => {
  let directories = [];
  const directorySize = getDirectorySize(directory);
  if (
    operator === ">"
      ? directorySize > size
      : operator === "<"
      ? directorySize < size
      : directorySize === size
  ) {
    directories.push(`${directorySize} ${currentItem}`);
  }
  Object.keys(directory.children).forEach((child) => {
    if (directory.children[child].type === "directory") {
      directories = [
        ...directories,
        ...getDirectoriesWithSize(
          directory.children[child],
          size,
          depth + 1,
          child,
          operator
        ),
      ];
    }
  });

  return directories;
};

const generateDirectoryObject = () => {
  const file = fs.readFileSync("input.txt", "utf-8");
  const lines = file.split("\n");
  const directory = {
    root: {
      type: "directory",
      children: {},
    },
  };

  let location = directory.root;
  let parsingChildren = false;

  const cd = (destination) => {
    if (destination === "/") {
      location = "root";
      return;
    }
    if (destination === "..") {
      if (location === "root") return;
      location = location.split("/").slice(0, -1).join("/");
      return;
    }
    location = `${location}/${destination}`;
  };

  const parseLocation = (location) => {
    if (location === "root") return directory.root;
    const path = location.split("/");
    let currentLocation = directory.root;
    path.forEach((dir) => {
      if (dir === "root") return directory.root;
      currentLocation = currentLocation.children[dir];
    });

    return currentLocation;
  };

  lines.forEach((line) => {
    let isCommand = line.includes("$");
    if (isCommand) parsingChildren = false;
    if (isCommand && line.includes("cd")) {
      cd(line.replace("$ cd ", ""));
    }
    if (isCommand && line.includes("ls")) {
      parsingChildren = true;
      return;
    }
    if (parsingChildren && line.includes("dir")) {
      const parsedLocation = parseLocation(location);
      if (!parsedLocation?.children) parsedLocation.children = {};
      if (!parsedLocation?.children[`${line.replace("dir ", "")}`]) {
        parsedLocation.children[`${line.replace("dir ", "")}`] = {
          type: "directory",
          children: {},
        };
      }
    }
    if (parsingChildren && !line.includes("dir")) {
      const parsedLocation = parseLocation(location);
      const [size, fileName] = line.split(" ");
      if (!parsedLocation.children) parsedLocation.children = {};
      parsedLocation.children[fileName] = {
        type: "file",
        size: parseInt(size),
      };
    }
  });
  return directory;
};

const part1 = () => {
  const directory = generateDirectoryObject();
  const dirLessThan10000k = getDirectoriesWithSize(
    directory.root,
    100000,
    0,
    "root",
    "<"
  );
  const summedSize = dirLessThan10000k.reduce((acc, curr) => {
    const [size] = curr.split(" ");
    return acc + parseInt(size);
  }, 0);
  console.log(summedSize);
};
const part2 = () => {
  const totalSpaceOnDisk = 70000000;
  const spaceRequired = 30000000;
  const directory = generateDirectoryObject();
  const sizeRoot = getDirectorySize(directory.root);
  const unusedSpace = totalSpaceOnDisk - sizeRoot;
  const spaceToFree = spaceRequired - unusedSpace;
  const dirGt = getDirectoriesWithSize(
    directory.root,
    spaceToFree,
    0,
    "root",
    ">"
  );
  const getSmallestDir = (dirs) => {
    const sizes = dirs.map((dir) => {
      const [size] = dir.split(" ");
      return parseInt(size);
    });
    return Math.min(...sizes);
  }
  const smallestDir = getSmallestDir(dirGt);
  console.log(smallestDir);
};

part1();
part2();
