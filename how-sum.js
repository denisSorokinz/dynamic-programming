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

console.log(howSumOptimized(8, [5, 3, 2]));
