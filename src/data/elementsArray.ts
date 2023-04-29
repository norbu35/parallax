import { DrawableElementProp } from "../types/PropTypes";
export const elementsArr: DrawableElementProp[] = Array(12)
  .fill(null)
  .map(() => {
    const size = Math.floor(Math.random() * 50) + 150; // random size between 100 and 200
    const imgUrl =
      "https://images.pexels.com/photos/2911521/pexels-photo-2911521.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1";
    const vel = Math.random() * 0.5 + 1.5; // random velocity between 0.5 and 1.0
    return { size, imgUrl, vel };
  });
