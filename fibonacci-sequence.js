/*
issue: determine nth number of fibonacci sequence
solution: iterate from 1 till n, memoize prevFib
*/

// time: Big-O(2^n)
// space: Big-O(n)
const fib = (n) => {
  if (n < 1) {
    console.log("error: n >= 1");
    return;
  }
  n -= 1;

  let prevFib = (temp = 0);
  let currentFib = 1;
  for (let i = 0; i < n; i++) {
    temp = currentFib;
    currentFib += prevFib;
    prevFib = temp;
  }
  // i=0; temp=1; cur=1; prev=1
  // i=1; temp=1; cur=2; prev=1
  // i=2; temp=2; cur=3; prev=2

  return currentFib;
};

const MemoizedFib = new Map([
  [1, 1],
  [2, 1],
]);

const fibAdvanced = (n) => {
  if (n <= 2) return 1;

  let left = MemoizedFib.get(n - 1);
  let right = MemoizedFib.get(n - 2);

  if (!left) {
    left = fibAdvanced(n - 1);
    MemoizedFib.set(n - 1, left);
  }
  if (!right) {
    right = fibAdvanced(n - 2);
    MemoizedFib.set(n - 2, right);
  }

  return left + right;
};

// time: Big-O(n)
// space: Big-O(n)
const fibAdvancedOptimized = (n, memo = {}) => {
  if (n in memo) return memo[n];
  if (n <= 2) return 1;

  const value = fibAdvancedOptimized(n - 1, memo) + fibAdvancedOptimized(n - 2, memo);
  memo[n] = value;

  return value;
};

const memo = {};

// time: Big-O(n)
// space: Big-O(n)
const fibTabulation = (n) => {
  const table = [...Array(n + 1)].fill(0);
  table[1] = 1;

  for (let i = 0; i <= n; i++) {
    table[i + 1] += table[i];
    table[i + 2] += table[i];
  }

  return table[n - 1];
};

console.time();
console.log(fibAdvancedOptimized(10));
console.timeEnd();

console.time();
console.log(fibTabulation(10));
console.timeEnd();

// const arr = [...new Array(10)].map((_, ind) => ind);
// arr.forEach((item) => console.log(fibAdvanced(item)));
