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
    const a = m <= n ? m : n;
    const b = m <= n ? n : m;
    return `${a}-${b}`;
  }

  getValue(m, n) {
    return this.value[this.getHash(m, n)];
  }

  setValue(m, n, value) {
    this.value = { ...this.value, [this.getHash(m, n)]: value };
  }

  logValueAmount() {
    console.log(Object.keys(this.value).length);
  }
}

const hashMapMemo = new HashMap();

const gridTraveler = (m, n) => {
  let value = hashMapMemo.getValue(m, n);

  if (value) return value;
  if (m === 1 || n === 1) return 1;
  if (m === 0 || n === 0) return 0;

  value = gridTraveler(m - 1, n) + gridTraveler(m, n - 1);
  hashMapMemo.setValue(m, n, value);

  return value;
};

console.log(gridTraveler(18, 18));
hashMapMemo.logValueAmount();
