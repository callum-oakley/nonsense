function h(tag, childOrAttrs, ...children) {
  const element = document.createElement(tag);
  if (childOrAttrs instanceof Node || typeof childOrAttrs === "string") {
    element.append(childOrAttrs, ...children);
  } else {
    Object.assign(element, childOrAttrs);
    element.append(...children);
  }
  return element;
}

function renderText(state) {
  return h(
    "span",
    ...state.text.map((c, i) =>
      h("span", {
        className: i === state.cursor
          ? "cursor"
          : i < state.cursor
          ? c.miss ? "miss" : "hit"
          : "",
      }, (i < state.cursor && c.miss) || c.target)
    ),
    "\n\n",
  );
}

function renderResult(state) {
  const wpm = Math.floor(
    12000 * state.cursor /
      ((state.finish || Date.now()) - state.start),
  );
  const accuracy = Math.floor(100 * state.hits / (state.hits + state.misses));
  let results;
  if (state.finish) {
    results =
      `${wpm} words per minute\n${accuracy}% accuracy\nhit esc to reset`;
  } else if (state.cursor > 5) {
    const miss = state.text.findIndex((c) => c.miss);
    if (
      (miss >= 0) &&
      (state.cursor > miss + 5 || state.cursor == state.text.length - 1)
    ) {
      results = wpm + "\nerrors must be corrected\n ";
    } else {
      results = wpm + "\n \n ";
    }
  } else {
    results = "type the above text\nerrors must be corrected\nhit esc to reset";
  }
  return h("span", { className: "results" }, results);
}

function renderWordsLinks(state) {
  return h(
    "span",
    "words: ",
    ...[40, 50, 70, 100, 140].flatMap((wc) => [
      h("a", {
        href: `?wordCount=${wc}`,
        className: wc === state.wordCount ? "selected" : "",
      }, wc),
      " ",
    ]),
  );
}

function renderSourceLink(state) {
  return h(
    "a",
    { href: "https://github.com/callum-oakley/nonsense" },
    "source",
  );
}

export function render(state, app) {
  while (app.firstChild) {
    app.removeChild(app.firstChild);
  }
  app.append(
    h("p", renderText(state), renderResult(state)),
    h("footer", renderWordsLinks(state), renderSourceLink(state)),
  );
}
