const howSum = (targetSum, numbers, memo = {}) => {
  if (targetSum in memo) return memo[targetSum];
  if (targetSum === 0) return 0;
  if (targetSum < 0) return null;

  for (let item of numbers) {
    const res = howSum(targetSum - item, numbers, memo);

    if (res !== null) {
      memo[targetSum] = [item].concat(res);
      return [item].concat(res);
    }
  }

  memo[targetSum] = null;
  return null;
};

const howSumOptimized = (targetSum, numbers, memo = {}) => {
  if (targetSum in memo) return memo[targetSum];
  if (targetSum === 0) return [];
  if (targetSum < 0) return null;

  for (let item of numbers) {
    const path = howSumOptimized(targetSum - item, numbers, memo);

    if (path !== null) {
      memo[targetSum] = [item, ...path];
      return [item, ...path];
    }
  }

  memo[targetSum] = null;
  return null;
};

// time:Big-O(m*n * m)
// space: Big-O(m*m)
const howSumTabulation = (targetSum, numbers) => {
  const table = new Array(targetSum + 1).fill(null);

  table[0] = [[]];

  for (let i = 0; i < table.length; i++) {
    if (table[i] === null) continue;

    for (let number of numbers) {
      if (table[i + number] === undefined) continue;

      if (table[i + number] === null) table[i + number] = [];
      table[i].forEach((path) => table[i + number].push([...path, number]));
    }
  }

  return table[targetSum];
};

console.log(howSumTabulation(100, [25, 50]));
