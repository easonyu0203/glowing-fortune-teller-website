/**
 * @param {{ dispatchEvent: (arg0: CustomEvent<any>) => void; addEventListener: (arg0: string, arg1: { (e: any): void; (e: any): void; }) => void; removeEventListener: (arg0: string, arg1: { (e: any): void; (e: any): void; }) => void; }} node
 */
export function longpress(node) {
  const TIME_MS = 150;
  /**
   * @type {number | undefined}
   */
  let timeoutPtr;
  /**
   * @param {any} e
   */
  function handleTouchstart(e) {
    console.log("touchstart");
    window.addEventListener("touchmove", handleMoveBeforeLong);
    timeoutPtr = window.setTimeout(() => {
      window.removeEventListener("touchmove", handleMoveBeforeLong);
      node.dispatchEvent(new CustomEvent("long"));
      // TODO - ideally make this not trigger long press again
      window.setTimeout(() => node.dispatchEvent(e), 0);
    }, TIME_MS);
  }
  /**
   * @param {any} e
   */
  function handleMoveBeforeLong(e) {
    console.log("touchmove");
    window.clearTimeout(timeoutPtr);
    window.removeEventListener("touchmove", handleMoveBeforeLong);
  }
  /**
   * @param {any} e
   */
  function handleTouchend(e) {
    console.log("touch end");
    window.clearTimeout(timeoutPtr);
    window.removeEventListener("touchmove", handleMoveBeforeLong);
  }
  node.addEventListener("touchstart", handleTouchstart);
  node.addEventListener("touchend", handleTouchend);
  return {
    destroy: () => {
      node.removeEventListener("touchstart", handleTouchstart);
      node.removeEventListener("touchend", handleTouchend);
    },
  };
}
