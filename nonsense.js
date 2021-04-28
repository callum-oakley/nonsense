function randomWord(wordWeights, totalWeight) {
  let r = Math.random() * totalWeight;
  for (const { word, weight } of wordWeights) {
    if (r < weight) {
      return word;
    }
    r -= weight;
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
