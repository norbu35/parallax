import { DrawableElementProp } from "../types/DrawableElement";

interface Coordinates {
  x: number;
  y: number;
}

const MIDPOINT_LEFT = 0 - window.innerWidth / 4;
const MIDPOINT_RIGHT = window.innerWidth * 1.75;
const MIDPOINT_Y = document.documentElement.scrollHeight / 2;
const CENTER = window.innerWidth / 2;

export default class Rectangle {
  width: number;
  height: number;
  imgUrl: string;
  vel: number;
  initialPos: Coordinates;
  pos: Coordinates;
  midpoint: Coordinates;

  constructor(
    prop: DrawableElementProp,
    initialPos: Coordinates,
    scale: number
  ) {
    this.width = prop.size * scale;
    this.height = prop.size * scale;
    this.imgUrl = prop.imgUrl;
    this.vel = prop.vel;
    this.initialPos = {
      x: initialPos.x + this.width / 2,
      y: initialPos.y + this.height / 2,
    };
    this.pos = initialPos;
    this.midpoint = {
      x: this.initialPos.x < CENTER ? MIDPOINT_LEFT : MIDPOINT_RIGHT,
      y: MIDPOINT_Y,
    };
  }
}
