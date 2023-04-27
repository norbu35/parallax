import Rectangle from "../classes/Rectangle";

export default function getPathState(el: Rectangle) {
  // angle(radians) between x-axis and (pos.x, pos.y)
  let radians = Math.atan2(el.pos.y - el.midpoint.y, el.pos.x - el.midpoint.x);
  // radius (pos.x, pos.y), (midpoint.x, midpoint.y)
  const radius = Math.sqrt(
    (el.initialPos.x - el.midpoint.x) ** 2 +
      (el.initialPos.y - el.midpoint.y) ** 2
  );
  // angle(degrees) between x-axis and (pos.x, pos.y)
  const angle = (radians * 180) / Math.PI;
  // pos.x on circumference
  const x = el.midpoint.x + radius * Math.cos(radians);

  return { x, angle };
}
