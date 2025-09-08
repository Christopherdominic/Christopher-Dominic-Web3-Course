let arrays = [[1, 2, 3], [4, 5], [6]];

let flat = arrays.reduce((acc, curr) => acc.concat(curr), []);


console.log(flat);
// → [1, 2, 3, 4, 5, 6]
