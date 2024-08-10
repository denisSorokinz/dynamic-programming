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

// time: Big-O(m*n * m)
// space: Big-O(m)
const countConstructTabulation = (str, substrings) => {
  const table = Array(str.length + 1).fill(0);

  table[0] = 1;

  for (let i = 0; i < table.length - 1; i++) {
    if (table[i] === false) continue;

    const newStr = str.slice(i);
    for (let substr of substrings) {
      if (newStr.startsWith(substr) && i + substr.length < table.length) table[i + substr.length] += table[i];
    }
  }

  return table[table.length - 1];
};

console.log(countConstruct("qwerty", ["qwerty", "qw", "ty", "er", "qwe", "r"]));
