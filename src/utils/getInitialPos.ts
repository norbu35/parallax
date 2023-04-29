import { Coordinates } from "../classes/Rectangle";

export default function getInitialPos(
  id: number,
  idx: number,
  total: number
): Coordinates {
  const angle = (idx / total) * Math.PI;
  const radius = window.innerHeight / 3;

  const x =
    window.innerWidth / 2 + radius * Math.cos(angle) * (idx % 2 === 0 ? -1 : 1);
  const y =
    window.innerHeight / 2 +
    radius * Math.sin(angle) * (Math.floor(idx / 2) + 1) -
    400;
  return { x, y };
}
