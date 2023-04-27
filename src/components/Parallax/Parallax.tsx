import { useState, useEffect, useRef, ReactElement } from "react";
import { DrawableElementProp } from "../../types/PropTypes";

import Rectangle from "../../classes/Rectangle";
import Element from "./Element";

import getInitialPos from "../../utils/getInitialPos";
import getPathState from "../../utils/path";
import transformElement from "../../utils/transformElement";

import "./styles.css";

interface ParallaxProps {
  elementsArr: DrawableElementProp[];
}

export default function Parallax({ elementsArr }: ParallaxProps): ReactElement {
  let scale = (window.innerWidth + 200) / 1600;
  console.log(scale);

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

  return (
    <>
      {elements.map((el: Rectangle, idx) => {
        return (
          <Element
            elementRefs={elementRefs}
            idx={idx}
            elementObject={el}
            key={el.pos.x / el.pos.y}
          />
        );
      })}
    </>
  );
}
