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

const memo = {};

const allConstructOptimized = (str, substrings, memo) => {
  if (str in memo) return memo[str];
  if (str === "") return [""];

  let paths = [];
  for (let substr of substrings) {
    if (str.startsWith(substr)) {
      const newStr = str.replace(substr, "");
      const newStrPaths = allConstructOptimized(newStr, substrings, memo);

      paths = newStrPaths.map((path) => [substr, ...path]);
      memo[newStr] = paths;
    }
  }

  memo[str] = paths;
  return paths;
};

console.time();
console.log(allConstructOptimized("eeeeeeeeeeeeeeeeeeeeeeeeeeee", ["e", "ee", "eee"], memo));
console.timeEnd();

console.log(memo);
