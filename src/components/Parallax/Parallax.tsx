import { useState, useEffect, useRef } from "react";
import Rectangle from "../../classes/Rectangle";
import { DrawableElementProp } from "../../types/DrawableElement";
import { getCirclePos } from "../../utils/Circle";
import "./styles.css";

interface ParallaxProps {
  elementsArr: DrawableElementProp[];
}

export default function Parallax({
  elementsArr,
}: ParallaxProps): React.ReactNode {
  let innerWidth = window.innerWidth;
  let innerHeight = window.innerHeight;
  let scale = innerWidth / 1200;

  const [elements, setElements] = useState<Array<Rectangle>>(
    elementsArr.map((el) => {
      const initialPos = {
        x: Math.floor(Math.random() * innerWidth),
        y: Math.floor(Math.random() * innerHeight),
      };
      return new Rectangle(el, initialPos, scale);
    })
  );

  type ElementRef = HTMLDivElement | null;
  const elementRefs = useRef<ElementRef[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;

      setElements((prevElements) =>
        prevElements.map((el) => {
          const { newX } = getCirclePos(el);
          return {
            ...el,
            pos: {
              y: el.initialPos.y - scrollTop * el.vel,
              x: newX,
            },
          };
        })
      );
    };

    elementRefs.current.forEach((elementRef, idx) => {
      if (elementRef) {
        const { pos } = elements[idx];
        const { rotDeg } = getCirclePos(elements[idx]);
        elementRef.style.transform = `
            translateX(${pos.x}px)
            translateY(${pos.y}px)
            rotate(${rotDeg}deg),
      `;
      }
    });

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {elements.map((el: DrawableElement, idx) => {
        const { rotDeg } = getCirclePos(el);
        return (
          <div
            ref={(ref) => (elementRefs.current[idx] = ref)}
            style={{
              width: el.size,
              height: el.size,
              backgroundImage: `url(${el.imgUrl})`,
              transform: `
                        translateX(${el.pos.x}px)
                        translateY(${el.pos.y}px)
                        rotate(${rotDeg}deg)`,
            }}
            key={idx}
          />
        );
      })}
    </>
  );
}
