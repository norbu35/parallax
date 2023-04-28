import { Coordinates } from "../classes/Rectangle";

// two possible midpoints for the object to circle
const MIDPOINT_LEFT = {
  x: 0 - window.innerWidth / 4,
  y: window.innerHeight / 2,
};
const MIDPOINT_RIGHT = {
  x: window.innerWidth * 1.25,
  y: window.innerHeight / 2,
};

function getInitialPos(id: number, idx: number, total: number): Coordinates {
  const angle = (idx / total) * Math.PI * 2;
  const radius = window.innerHeight / 4;

  // divide the elements into left and right groups
  const side = idx < total / 2 ? "left" : "right";

  let x, y;
  if (side === "left") {
    // distribute the left group around the left midpoint
    x = MIDPOINT_LEFT.x + radius * Math.sin(angle);
  } else {
    // distribute the right group around the right midpoint
    x = MIDPOINT_RIGHT.x + radius * Math.sin(angle);
  }
  y =
    MIDPOINT_LEFT.y + radius * Math.sin(angle) + (id - 1) * window.innerHeight;

  return { x, y };
}

export default getInitialPos;
