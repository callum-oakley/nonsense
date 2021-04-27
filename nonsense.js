function randomWord(wordWeights, totalWeight) {
  let n = Math.floor(Math.random() * totalWeight);
  for (const { word, weight } of wordWeights) {
    if (n < weight) {
      return word;
    }
    n -= weight;
  }
}

export function generateNonsense(wordWeights, wordCount) {
  const totalWeight = wordWeights
    .map((ww) => ww.weight)
    .reduce((a, b) => a + b);
  let nonsense = "";
  while (nonsense.length < wordCount * 5) {
    nonsense += randomWord(wordWeights, totalWeight) + " ";
  }
  return nonsense;
}
