function updateTimer(state) {
  if (!state.start) {
    state.start = Date.now();
  }
  if (!state.finish && state.cursor === state.text.length) {
    if (state.text.filter((c) => c.miss).length) {
      return handleBackspace(state);
    }
    state.finish = Date.now();
  }
  return state;
}

export function handleChar(state, key) {
  if (state.text[state.cursor].target === key) {
    state.hits++;
  } else {
    state.misses++;
    state.text[state.cursor].miss = key;
  }
  state.cursor = Math.min(state.cursor + 1, state.text.length);
  return updateTimer(state);
}

export function handleBackspace(state) {
  state.cursor = Math.max(state.cursor - 1, 0);
  delete state.text[state.cursor].miss;
  return state;
}

export function handleBackspaceWord(state) {
  const prevChar = () =>
    state.text[state.cursor - 1].miss ||
    state.text[state.cursor - 1].target;
  let seenNonSpace;
  while (state.cursor > 0 && (!seenNonSpace || prevChar() !== " ")) {
    if (prevChar() !== " ") {
      seenNonSpace = true;
    }
    state = handleBackspace(state);
  }
  return state;
}

export function makeState(text, wordCount) {
  return {
    cursor: 0,
    text: text.split("").map((c) => ({ target: c })),
    hits: 0,
    misses: 0,
    wordCount,
  };
}
