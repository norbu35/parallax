export interface DrawableElement {
  size: number;
  imgUrl: string;
  vel: number;
  initialPos: Coordinates;
  pos: Coordinates;
  midpoint: Coordinates;
}

export interface DrawableElementProp {
  size: number;
  imgUrl: string;
  vel: number;
}

interface Coordinates {
  x: number;
  y: number;
}
