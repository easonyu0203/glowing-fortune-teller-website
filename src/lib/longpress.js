/**
 * @param {{ dispatchEvent: (arg0: CustomEvent<any>) => void; addEventListener: (arg0: string, arg1: { (e: any): void; (e: any): void; }) => void; removeEventListener: (arg0: string, arg1: { (e: any): void; (e: any): void; }) => void; }} node
 */
export function longpress(node) {
  const TIME_MS = 100;
  /**
   * @type {number | undefined}
   */
  let timeoutPtr;
  /**
   * @param {any} e
   */
  function handleMouseDown(e) {
    window.addEventListener("mousemove", handleMoveBeforeLong);
    timeoutPtr = window.setTimeout(() => {
      window.removeEventListener("mousemove", handleMoveBeforeLong);
      node.dispatchEvent(new CustomEvent("long"));
      // TODO - ideally make this not trigger long press again
      window.setTimeout(() => node.dispatchEvent(e), 0);
    }, TIME_MS);
  }
  /**
   * @param {any} e
   */
  function handleMoveBeforeLong(e) {
    window.clearTimeout(timeoutPtr);
    window.removeEventListener("mousemove", handleMoveBeforeLong);
  }
  /**
   * @param {any} e
   */
  function handleMouseUp(e) {
    window.clearTimeout(timeoutPtr);
    window.removeEventListener("mousemove", handleMoveBeforeLong);
  }
  node.addEventListener("mousedown", handleMouseDown);
  node.addEventListener("mouseup", handleMouseUp);
  return {
    destroy: () => {
      node.removeEventListener("mousedown", handleMouseDown);
      node.removeEventListener("mouseup", handleMouseUp);
    },
  };
}
