function isWhitespaceText(node) {
  return node.type === "text" && /^\s*$/.test(node.value);
}

function isPostImageFigure(node) {
  return (
    node.type === "element" &&
    node.tagName === "figure" &&
    Array.isArray(node.properties?.className) &&
    node.properties.className.includes("post-image")
  );
}

function toFigure(img) {
  const alt = img.properties?.alt;
  const children = [img];

  if (alt) {
    children.push({
      type: "element",
      tagName: "figcaption",
      properties: {},
      children: [{ type: "text", value: String(alt) }],
    });
  }

  return {
    type: "element",
    tagName: "figure",
    properties: { className: ["post-image"] },
    children,
  };
}

function groupAdjacentImages(children) {
  const result = [];
  let run = [];

  function flushRun() {
    if (run.length === 0) return;
    if (run.length === 1) {
      result.push(run[0]);
    } else {
      result.push({
        type: "element",
        tagName: "div",
        properties: { className: ["image-row"] },
        children: run,
      });
    }
    run = [];
  }

  for (const child of children) {
    if (isPostImageFigure(child)) {
      run.push(child);
    } else if (isWhitespaceText(child)) {
      continue;
    } else {
      flushRun();
      result.push(child);
    }
  }
  flushRun();

  return result;
}

export default function rehypeImageCaptions() {
  return function transformer(tree) {
    walk(tree);
  };
}

function walk(node) {
  if (!node.children) return;

  const mapped = node.children.map((child) => {
    walk(child);

    if (child.type !== "element" || child.tagName !== "p") {
      return child;
    }

    const meaningful = child.children.filter((c) => !isWhitespaceText(c));
    if (meaningful.length !== 1 || meaningful[0].tagName !== "img") {
      return child;
    }

    return toFigure(meaningful[0]);
  });

  node.children = groupAdjacentImages(mapped);
}
