import { DrawableElement } from "../types/DrawableElement";

export function getCirclePos(el: Rectangle) {
  // angle(radians) between x-axis and (pos.x, pos.y)
  const angle = Math.atan2(el.pos.y - el.midpoint.y, el.pos.x - el.midpoint.x);
  // radius (pos.x, pos.y), (midpoint.x, midpoint.y)
  const radius = Math.sqrt(
    (el.pos.x - el.midpoint.x) ** 2 + (el.pos.y - el.midpoint.y) ** 2
  );
  // angle(degrees) between x-axis and (pos.x, pos.y)
  const rotDeg = (angle * 180) / Math.PI;
  // pos.x on circumference
  const newX = el.midpoint.x + radius * Math.cos(-angle);

  return { newX, rotDeg };
}
