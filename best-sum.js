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

    if (path !== null && (shortestPath === null || path.length < shortestPath.length))
      shortestPath = [item, ...path];
  }

  memo[targetSum] = shortestPath;
  return shortestPath;
};

console.log(bestSumOptimized(100, [1, 4, 25]));
