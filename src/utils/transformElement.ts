import Rectangle from "../classes/Rectangle";
import getPathState from "./path";

export default function transformElement(
  elementRef: HTMLDivElement | null,
  element: Rectangle
): void {
  if (elementRef) {
    const { x, angle } = getPathState(element);
    elementRef.style.transform = `
      translateX(${x}px)
      translateY(${element.pos.y}px)
      rotate(${angle}deg)
    `;
  }
}
