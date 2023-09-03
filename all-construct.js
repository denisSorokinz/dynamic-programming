// time: Big-O(n^m)
// space: Big-O(m)
const allConstruct = (str, substrings) => {
  if (str === "") return [""];

  const paths = [];
  for (let substr of substrings) {
    if (str.startsWith(substr)) {
      const newStr = str.replace(substr, "");
      const newStrPaths = allConstruct(newStr, substrings);

      newStrPaths.forEach((path) => paths.push([substr, ...path]));
    }
  }

  return paths;
};

// time: Big-O(n^m)
// space: Big-O(m)
const memo = {};
const allConstructOptimized = (str, substrings, memo) => {
  if (str in memo) return memo[str];
  if (str === "") return [""];

  let paths = [];
  for (let substr of substrings) {
    if (str.startsWith(substr)) {
      const newStr = str.replace(substr, "");
      const newStrPaths = allConstructOptimized(newStr, substrings, memo);

      paths = paths.concat(newStrPaths.map((path) => [substr, ...path]));
    }
  }

  memo[str] = paths;
  return paths;
};

// time: Big-O(m*n * m)
// space: Big-O(m)
const allConstructTabulation = (str, substrings) => {
  const table = Array(str.length + 1).fill([]);

  table[0] = [""];

  for (let i = 0; i < table.length - 1; i++) {
    if (table[i] === false) continue;

    const newStr = str.slice(i);
    for (let substr of substrings) {
      if (newStr.startsWith(substr) && i + substr.length < table.length) {
        debugger;
        table[i].forEach((path) => {
          const newTableI = [...table[i + substr.length], [...path, substr]];
          table[i + substr.length] = newTableI;
        });
      }
    }
  }

  return table[table.length - 1];
};

console.dir(allConstructTabulation("qwe", ["qw", "qwe", "e"]));
// console.log(allConstructOptimized("eeeeeeeeeeeeeeeeeeeeeeeeeeee", ["e", "ee", "eee"], memo));
