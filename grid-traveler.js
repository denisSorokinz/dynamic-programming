/**
issue: given grid m*n, how many ways are there to get to the bottom right corner?
solution:
  recursive search for (m-1)*n + m*(n-1)
  recursion would start "collapsing" on base case n <= 1

nature:
  laying "foundation" to the "pattern" allows
  "collapsing" the complexity of a problem
  w/o implementing the algorithm

issue: no base cases
solution:
  define them. how?
  [1,1] => 1
  [1,2] => 1
  [2,1] => 1

  [2,2] => [1,2] + [2,1]
*/

class HashMap {
  value = {};

  constructor() {
    this.value = { [this.getHash(1, 1)]: 1, [this.getHash(1, 2)]: 1, [this.getHash(2, 1)]: 1 };
  }

  getHash(m, n) {
    return `${m}-${n}`;
  }

  getValue(m, n) {
    return this.value[this.getHash(m, n)];
  }

  setValue(m, n, value) {
    this.values = { ...this.values, [this.getHash(m, n)]: value };
  }
}

const memo = new HashMap();

const gridTraveler = (m, n, memo = new HashMap()) => {
  let value = memo.getValue(m, n);
  console.log(`${m}-${n} : ${value}`, m - 1 > 1 ? m - 1 : 1);

  if (value) return value;

  // let newMLeft = m - 1;
  // let newNLeft = n;
  // if (newMLeft < 1) {
  //   newMLeft = 1;
  //   newNLeft = n - 1;
  // }

  const newMLeft = m - 1 > 1 ? m - 1 : 1;
  const newNLeft = newMLeft !== 1 ? n : n - 1;

  const newNRight = n - 1 > 1 ? n - 1 : 1;
  const newMRight = newNRight !== 1 ? m : m - 1;

  value = gridTraveler(newMLeft, newNLeft) + gridTraveler(newMRight, newNRight);
  memo.setValue(m, n, value);

  return value;
};

console.log(gridTraveler(10, 10));
