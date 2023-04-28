import { DrawableElementProp } from "../types/PropTypes";

export interface Coordinates {
  x: number;
  y: number;
}

// two possible midpoints for the object to circle
const MIDPOINT_LEFT = 0 - window.innerWidth / 2;
const MIDPOINT_RIGHT = window.innerWidth * 1.5;
// the center between the two possible midpoitns
const CENTER = window.innerWidth / 2;

export default class Rectangle {
  width: number;
  height: number;
  imgUrl: string;
  vel: number;
  initialPos: Coordinates;
  pos: Coordinates;
  midpoint: Coordinates;
  MIDPOINT_Y: number;

  constructor(
    id: number,
    prop: DrawableElementProp,
    initialPos: Coordinates,
    scale: number
  ) {
    this.MIDPOINT_Y = window.innerHeight / 2 + (id - 1) * window.innerHeight;
    this.width = prop.size * scale;
    this.height = prop.size * scale;
    this.imgUrl = prop.imgUrl;
    this.vel = prop.vel;
    this.initialPos = {
      x: initialPos.x + this.width / 2,
      y: initialPos.y + this.height / 2,
    };
    this.pos = initialPos;
    // define which midpoint the object will circle based on which side of the screen it is
    this.midpoint = {
      x: this.initialPos.x < CENTER ? MIDPOINT_LEFT : MIDPOINT_RIGHT,
      y: this.MIDPOINT_Y,
    };
  }
}
