// Your code here.
function isEven(n) {
  if (n === 0) return true;        // base case: zero is even
  else if (n === 1) return false;  // base case: one is odd
  else if (n < 0) return isEven(-n); // fix for negative numbers
  else return isEven(n - 2);       // recursion: reduce by 2
}


console.log(isEven(50));
// → true
console.log(isEven(75));
// → false
console.log(isEven(-1));
// → ??