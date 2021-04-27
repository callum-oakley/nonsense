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
  return updateTimer({
    ...state,
    cursor: Math.min(state.cursor + 1, state.text.length),
    text: state.text.map((c, i) =>
      i === state.cursor && c.target !== key ? { ...c, miss: key } : c
    ),
    hits: state.hits += state.text[state.cursor].target === key ? 1 : 0,
    misses: state.misses += state.text[state.cursor].target !== key ? 1 : 0,
  });
}

export function handleBackspace(state) {
  return {
    ...state,
    cursor: Math.max(state.cursor - 1, 0),
    text: state.text.map((c, i) =>
      i === (state.cursor - 1) ? { target: c.target } : c
    ),
  };
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
