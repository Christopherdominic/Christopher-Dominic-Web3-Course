function dominantDirection(text) {
  return countBy(text, ch => (characterScript(ch.codePointAt(0)) || {}).direction || "none")
    .filter(d => d.name !== "none")
    .reduce((a, b) => a.count > b.count ? a : b).name;
}


console.log(dominantDirection("Hello!"));
// → ltr
console.log(dominantDirection("Hey, مساء الخير"));
// → rtl