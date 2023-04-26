import { useState, useEffect, useRef } from "react";
import Rectangle from "../../classes/Rectangle";
import { DrawableElementProp } from "../../types/DrawableElement";
import { getPos } from "../../utils/Path";
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
          return {
            ...el,
            pos: {
              x: getPos(el).x,
              y: el.initialPos.y - scrollTop * el.vel,
            },
          };
        })
      );
    };

    elementRefs.current.forEach((elementRef, idx) => {
      if (elementRef) {
        const { pos } = elements[idx];
        const { angleDeg } = getPos(elements[idx]);
        elementRef.style.transform = `
            translateX(${pos.x}px)
            translateY(${pos.y}px)
            rotate(${angleDeg}deg),
      `;
      }
    });

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {elements.map((el: Rectangle, idx) => {
        const { angleDeg } = getPos(el);
        return (
          <div
            ref={(ref) => (elementRefs.current[idx] = ref)}
            style={{
              width: el.width,
              height: el.height,
              backgroundImage: `url(${el.imgUrl})`,
              transform: `
                        translateX(${el.pos.x}px)
                        translateY(${el.pos.y}px)
                        rotate(${angleDeg}deg)`,
            }}
            key={idx}
          />
        );
      })}
    </>
  );
}
