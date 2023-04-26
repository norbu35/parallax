import { DrawableElementProp } from "../types/DrawableElement";

interface Coordinates {
  x: number;
  y: number;
}

export default class Rectangle {
  width: number;
  height: number;
  imgUrl: string;
  vel: number;
  initialPos: Coordinates;
  pos: Coordinates;

  constructor(
    prop: DrawableElementProp,
    initialPos: Coordinates,
    scale: number
  ) {
    this.width = prop.size * scale;
    this.height = prop.size * scale;
    this.imgUrl = prop.imgUrl;
    this.vel = prop.vel;
    this.initialPos = initialPos;
    this.pos = initialPos;
  }
}
