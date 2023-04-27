import { useState, useEffect, useRef } from "react";
import { DrawableElementProp } from "../../types/PropTypes";

import Rectangle from "../../classes/Rectangle";

import getInitialPos from "../../utils/getInitialPos";
import getPathState from "../../utils/path";
import transformElement from "../../utils/transformElement";

import "./styles.css";

interface ParallaxProps {
  elementsArr: DrawableElementProp[];
}

export default function Parallax({ elementsArr }: ParallaxProps) {
  let scale = innerWidth / 1000;

  const [elements, setElements] = useState<Rectangle[]>(
    elementsArr.map((el) => {
      const initialPos = getInitialPos();
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
              x: getPathState(el).x,
              y: el.initialPos.y - scrollTop * el.vel,
            },
          };
        })
      );
    };

    elementRefs.current.forEach((elementRef, idx) => {
      if (elementRef) transformElement(elementRef, elements[idx]);
    });

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [window.pageYOffset]);

  useEffect(() => {
    elementRefs.current.forEach((elementRef, idx) => {
      if (elementRef) {
        transformElement(elementRef, elements[idx]);
      }
    });
  });

  return (
    <>
      {elements.map((el: Rectangle, idx) => {
        const element = (
          <div
            ref={(ref) => {
              elementRefs.current[idx] = ref;
            }}
            style={{
              width: el.width,
              height: el.height,
              backgroundImage: `url(${el.imgUrl})`,
            }}
            key={el.pos.x}
          />
        );
        transformElement(elementRefs.current[idx], el);
        return element;
      })}
    </>
  );
}
