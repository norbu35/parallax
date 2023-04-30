import { DrawableElementProp } from "../types/PropTypes";

export interface Coordinates {
  x: number;
  y: number;
}

export default class Rectangle {
  width: number;
  height: number;
  imgUrl: string;
  vel: number;
  // if the object is on the left or right side of the screen
  isLeft: boolean;
  // midpoint around which the object circles
  midpoint: Coordinates;
  // length from midpoint to object
  radius: number;
  // angle of object
  rotation: number;
  initialPos: Coordinates;
  pos: Coordinates;
  // for intersectionObserver
  isVisible: boolean;

  constructor(
    prop: DrawableElementProp,
    idx: number,
    total: number,
    scale: number
  ) {
    this.width = prop.size * scale;
    this.height = prop.size * scale;
    this.imgUrl = prop.imgUrl;
    this.vel = prop.vel;
    this.isLeft = idx % 2 === 0 ? true : false;
    const elementHeight = this.height + 10;
    this.midpoint = {
      x: this.isLeft ? 0 - window.innerWidth / 2 : window.innerWidth * 1.5,
      y: (total / 2 - idx - 1) * elementHeight + this.height / 2,
    };
    const randomRadiusOffset =
      (Math.random() * window.innerHeight) / 4 - window.innerHeight / 8;
    this.radius = window.innerWidth - 200 + randomRadiusOffset;
    const randomAngleOffset = (Math.random() - 0.5) * 10;
    const angleStep = 180 / (total - 1);
    this.rotation = this.isLeft
      ? (idx * angleStep + randomAngleOffset) / Math.PI
      : -((idx - 1) * angleStep + randomAngleOffset) / Math.PI;
    this.initialPos = {
      x: this.isLeft
        ? this.midpoint.x +
        Math.cos(this.rotation * (Math.PI / 180)) * this.radius -
        this.width / 2
        : this.midpoint.x -
        Math.cos(this.rotation * (Math.PI / 180)) * this.radius -
        this.width / 2,
      y: this.isLeft
        ? this.midpoint.y +
        Math.sin(this.rotation * (Math.PI / 180)) * this.radius
        : this.midpoint.y -
        Math.sin(this.rotation * (Math.PI / 180)) * this.radius,
    };
    this.pos = this.initialPos;
    this.isVisible = false;
  }

  scroll(scrollTop: number) {
    if (this.isVisible) {
      const newY = this.initialPos.y - scrollTop * this.vel;
      let angle = Math.atan2(
        newY - this.midpoint.y,
        this.pos.x - this.midpoint.x
      );
      const maxAngle = 160;
      if (Math.abs(angle) > maxAngle) {
        const sign = Math.sign(angle);
        angle = sign * ((maxAngle * Math.PI) / 180);
      }
      this.rotation = this.isLeft
        ? angle * (180 / Math.PI)
        : angle * (180 / Math.PI) + 180;
      let newX = this.midpoint.x + this.radius * Math.cos(angle);
      this.pos = {
        x: newX - this.width / 2,
        y: newY,
      };
    }
  }
}
