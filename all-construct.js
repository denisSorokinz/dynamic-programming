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

console.dir(allConstructOptimized("qwe", ["qw", "qwe", "e"], memo));
// console.log(allConstructOptimized("eeeeeeeeeeeeeeeeeeeeeeeeeeee", ["e", "ee", "eee"], memo));
