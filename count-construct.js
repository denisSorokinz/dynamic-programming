const countConstruct = (str, substrings) => {
  if (str === "") return 1;

  let count = 0;
  for (let substr of substrings) {
    if (str.startsWith(substr)) {
      const newStr = str.replace(substr, "");
      const newStrCount = countConstruct(newStr, substrings);

      count += newStrCount;
    }
  }

  return count;
};

const countConstructOptimized = (str, substrings, memo = {}) => {
  if (str in memo) return memo[str];
  if (str === "") return 1;

  let count = 0;
  for (let substr of substrings) {
    if (str.startsWith(substr)) {
      const newStr = str.replace(substr, "");
      const newStrCount = countConstruct(newStr, substrings);

      count += newStrCount;
    }
  }

  memo[str] = count;
  return count;
};

console.log(countConstructOptimized("qwerty", ["qw", "er", "ty", "qwe", "rty", "qwer", "t", "y"]));
