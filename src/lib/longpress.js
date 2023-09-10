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
    };

    node.addEventListener("touchmove", cancel);
    node.addEventListener("touchend", cancel);
  };

  node.addEventListener("touchstart", handle_touchstart);

  return {
    destroy() {
      node.removeEventListener("touchstart", handle_touchstart);
    },
  };
}
