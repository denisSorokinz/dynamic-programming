/*
issue:
  determine whether is possible to construct str from substrings
solution:
  divide & conquer:
    see if substr is in str -> subtract substr -> repeat for str-substr
    repeat until str is ""
*/

// (?) time: Big-O = m^n
// (?) space: Big-O = m
const canConstruct = (str, substrings) => {
  if (str.length === 0) return true;

  for (let substr of substrings) {
    if (str.startsWith(substr)) {
      const newStr = str.replace(substr, "");
      if (canConstruct(newStr, substrings)) return true;
    }
  }

  return false;
};

// (?) time: Big-O = m*n
// (?) space: Big-O = m
const canConstructOptimized = (str, substrings, memo = {}) => {
  if (str in memo) return memo[str];
  if (str === "") return true;

  for (let substr of substrings) {
    if (str.startsWith(substr)) {
      const newStr = str.replace(substr, "");
      if (canConstructOptimized(newStr, substrings, memo)) {
        memo[newStr] = true;
        return true;
      }
    }
  }

  memo[str] = false;
  return false;
};

console.log(canConstructOptimized("eeeeeeeeeeeeeeeeeeeeeeeeeeee", ["e", "ee", "eee"]));
