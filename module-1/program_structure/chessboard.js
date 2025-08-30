let size = 8; 
let board = "";

for (let y = 0; y < size; y++) {         // outer loop → rows
  for (let x = 0; x < size; x++) {       // inner loop → columns
    if ((x + y) % 2 === 0) {
      board += " ";                      // even sum → space
    } else {
      board += "#";                      // odd sum → #
    }
  }
  board += "\n";                         // add newline at end of row
}

console.log(board);
