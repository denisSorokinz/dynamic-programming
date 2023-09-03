/*
issue:
  determine whether is possible to construct str from substrings
solution:
  divide & conquer:
    see if substr is in str -> subtract substr -> repeat for str-substr
    repeat until str is ""
*/

// (?) time: Big-O = n^m
// (?) space: Big-O = m^2
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

// (?) time: Big-O = n * m^2
// (?) space: Big-O = m^2
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

// time: Big-O(m*n * m)
// space: Big-O(m)
const canConstructTabulation = (str, substrings) => {
  const table = Array(str.length + 1).fill(false);
  table[0] = true;

  for (let i = 0; i < table.length - 1; i++) {
    if (table[i] === false) continue;

    const strSlice = str.slice(i);
    for (let substr of substrings) {
      if (strSlice.startsWith(substr) && i + substr.length < table.length) table[i + substr.length] = true;
    }
  }

  return table[table.length - 1];
};

console.log(canConstructTabulation("something cool", ["so", "wq", "thing", "me", " ", "oo", "c", "l"]));
