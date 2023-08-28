/*
issue: determine nth number of fibonacci sequence
solution: iterate from 1 till n, memoize prevFib
*/

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

const arr = [...new Array(10)].map((_, ind) => ind);
arr.forEach((item) => console.log(fib(item)));
