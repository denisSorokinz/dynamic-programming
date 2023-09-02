const bestSum = (targetSum, numbers) => {
  if (targetSum === 0) return [];
  if (targetSum < 0) return null;

  const paths = [];
  for (let item of numbers) {
    const path = bestSum(targetSum - item, numbers);

    if (path !== null) {
      paths.push([item, ...path]);
    }
  }

  if (paths.length > 0) {
    const shortestPath = paths.sort((a, b) => a.length - b.length)[0];
    return shortestPath;
  }

  return null;
};

const bestSumOptimized = (targetSum, numbers, memo = {}) => {
  if (targetSum in memo) return memo[targetSum];
  if (targetSum === 0) return [];
  if (targetSum < 0) return null;

  let shortestPath = null;

  for (let item of numbers) {
    const path = bestSumOptimized(targetSum - item, numbers, memo);

    if (path !== null && (shortestPath === null || path.length < shortestPath.length)) shortestPath = [item, ...path];
  }

  memo[targetSum] = shortestPath;
  return shortestPath;
};

const bestSumTabulation = (targetSum, numbers) => {
  const table = Array(targetSum + 1).fill(null);

  table[0] = [];

  for (let i = 0; i < table.length; i++) {
    if (table[i] === null) continue;

    for (let number of numbers) {
      if (table[i + number] === undefined) continue;

      const newPath = [...table[i], number];
      if (table[i + number] === null || table[i + number].length > newPath.length) table[i + number] = newPath;
    }
  }

  return table[targetSum];
};

console.log("res:", bestSumTabulation(100, [25]));
