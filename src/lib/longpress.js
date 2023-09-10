/**
 * @param {HTMLDivElement} node
 */
export function longpress(node, threshold = 150) {
  const handle_touchstart = () => {
    const timeout = setTimeout(() => {
      node.dispatchEvent(new CustomEvent("long"));
    }, threshold);

    const cancel = () => {
      clearTimeout(timeout);
      node.removeEventListener("touchmove", cancel);
      node.removeEventListener("touchend", cancel);
      // node.removeEventListener("mousemove", cancel);
      // node.removeEventListener("mouseup", cancel);
    };

    node.addEventListener("touchmove", cancel);
    node.addEventListener("touchend", cancel);
    // node.addEventListener("mousemove", cancel);
    // node.addEventListener("mouseup", cancel);
  };

  node.addEventListener("touchstart", handle_touchstart);
  // node.addEventListener("mousedown", handle_touchstart);

  return {
    destroy() {
      node.removeEventListener("touchstart", handle_touchstart);
      // node.removeEventListener("mousedown", handle_touchstart);
    },
  };
}
