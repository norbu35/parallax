import Rectangle from "../classes/Rectangle";

export default function drawElement(
  elementRef: HTMLDivElement | null,
  element: Rectangle
): void {
  if (!elementRef) return;
  elementRef.style.transform = `
    translateX(${element.pos.x}px)
    translateY(${element.pos.y}px)
    rotate(${element.rotation}deg)
  `;
}
