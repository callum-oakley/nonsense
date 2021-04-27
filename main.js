import { render } from "./ui.js";
import {
  handleBackspace,
  handleBackspaceWord,
  handleChar,
  makeState,
} from "./state.js";
import { generateNonsense } from "./nonsense.js";

const app = document.querySelector("#app");

const wordCount =
  parseInt(new URL(document.location).searchParams.get("wordCount")) || 100;

let wordWeights, state;

function generateState() {
  return makeState(generateNonsense(wordWeights, wordCount), wordCount);
}

fetch("word-weights.txt")
  .then((res) => res.text())
  .then((text) => {
    wordWeights = [...text.matchAll(/(\S+)\s+(\d+)/g)]
      .map((m) => ({ word: m[1], weight: parseInt(m[2]) }));
    state = generateState();
    render(state, app);
  })
  .catch(console.error);

document.addEventListener("keydown", (e) => {
  if (!state) {
    return;
  } else if (!e.ctrlKey && !e.altKey && !e.metaKey && e.key === "Escape") {
    state = generateState();
  } else if (state.finish) {
    return;
  } else if (!e.ctrlKey && !e.altKey && !e.metaKey && e.key.length === 1) {
    state = handleChar(state, e.key);
  } else if (!e.ctrlKey && !e.altKey && !e.metaKey && e.key === "Backspace") {
    state = handleBackspace(state);
  } else if ((e.ctrlKey || e.altKey) && !e.metaKey && e.key === "Backspace") {
    state = handleBackspaceWord(state);
  }
  render(state, app);
});
