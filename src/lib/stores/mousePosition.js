import { readable } from "svelte/store";
export default readable({ x: 0, y: 0 }, (set) => {
  document.body.addEventListener("touchstart", move);

  /**
   *
   * @param {TouchEvent} event
   * @returns
   */
  function move(event) {
    if (event.touches.length < 1) return;
    set({
      x: event.touches[0].clientX,
      y: event.touches[0].clientY,
    });
  }

  return () => {
    document.body.removeEventListener("touchstart", move);
  };
});
