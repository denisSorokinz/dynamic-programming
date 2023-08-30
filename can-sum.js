/*
issue:
  determine whether it's possible to get targetSum by
  combining numbers from array
solution:
  recursion
  if targetSum === 0 return true

shrinking problem:
  limiting number of ways left
  no ways left -> ignore branch
*/

const calculateDuplicateCombinations = (targetSum, numbers) => {
  if (targetSum === 0) return 1;
  if (targetSum < 0) return 0;

  let count = 0;
  for (let i = 0; i < numbers.length; i++) {
    count += calculateDuplicateCombinations(targetSum - numbers[i], numbers);
  }

  return count;
};

const canSum = (targetSum, numbers) => calculateDuplicateCombinations(targetSum, numbers) > 1;

// console.log(canSum(7, [2, 3]));

const canSumOptimized = (targetSum, numbers, memo = {}) => {
  if (targetSum in memo) return memo[targetSum];
  if (targetSum === 0) return true;
  if (targetSum < 0) return false;

  for (let item of numbers) {
    const flag = canSumOptimized(targetSum - item, numbers, memo);
    memo[targetSum - item] = flag;
    if (flag) return true;
  }

  memo[targetSum] = false;
  return false;
};

console.log(canSumOptimized(8, [5, 3, 2]));
