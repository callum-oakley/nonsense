import { render, renderIncremental } from "./ui.js";
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
    wordWeights = [...text.matchAll(/(\S+)\s+(\d+)/g)].map((m) => ({
      word: m[1],
      weight: parseInt(m[2]),
    }));
    state = generateState();
    render(state, app);
  })
  .catch(console.error);

document.addEventListener("keydown", (e) => {
  if (!state) {
    // do nothing
  } else if (!e.ctrlKey && !e.altKey && !e.metaKey && e.key === "Escape") {
    e.preventDefault();
    state = generateState();
    render(state, app);
  } else if (state.finish) {
    // do nothing
  } else if (!e.ctrlKey && !e.altKey && !e.metaKey && e.key.length === 1) {
    e.preventDefault();
    state = handleChar(state, e.key);
    renderIncremental(state);
  } else if (
    (!e.ctrlKey && !e.altKey && !e.metaKey && e.key === "Backspace") ||
    ((e.ctrlKey || e.altKey) && !e.metaKey && e.key === "h")
  ) {
    e.preventDefault();
    state = handleBackspace(state);
    renderIncremental(state);
  } else if (
    (e.ctrlKey || e.altKey) &&
    !e.metaKey &&
    (e.key === "Backspace" || e.key === "w")
  ) {
    e.preventDefault();
    state = handleBackspaceWord(state);
    renderIncremental(state);
  }
});
