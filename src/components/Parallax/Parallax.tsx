import { useRef, useEffect } from "react";
import { DrawableElementProp } from "../../types/PropTypes";

import Rectangle from "../../classes/Rectangle";
import Element from "./Element";

import getInitialPos from "../../utils/getInitialPos";
import getPathState from "../../utils/path";
import transformElement from "../../utils/transformElement";

import "./styles.css";

interface Props {
  elementsArr: DrawableElementProp[];
  id: number;
}

export default function Parallax({ elementsArr, id }: Props) {
  const initialWidth = window.innerWidth;
  const initialHeight = window.innerHeight;
  const scale = (window.innerWidth + 200) / 1600;

  const elements: Rectangle[] = elementsArr.map((el, idx) => {
    const initialPos = getInitialPos(id, idx, elementsArr.length);
    return new Rectangle(id, el, initialPos, scale);
  });

  const elementRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      elementRefs.current.forEach((elementRef, idx) => {
        const element = elements[idx];
        if (!elementRef) return;

        const scrollTop =
          window.pageYOffset || document.documentElement.scrollTop;
        const newPos = {
          x: getPathState(element).x,
          y: element.initialPos.y - scrollTop * element.vel,
        };
        element.pos = newPos;
        transformElement(elementRef, element);
      });
    };

    window.addEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      const widthDiff = initialWidth - window.innerWidth;
      const heightDiff = initialHeight - window.innerHeight;
      elements.forEach((el) => {
        el.pos = {
          x: el.pos.x - widthDiff,
          y: el.pos.y - heightDiff,
        };
      });
      elementRefs.current.forEach((elementRef, idx) => {
        if (elementRef) transformElement(elementRef, elements[idx]);
      });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      {elements.map((el: Rectangle, idx) => {
        return (
          <Element
            elementRefs={elementRefs}
            idx={idx}
            elementObject={el}
            key={idx}
          />
        );
      })}
    </>
  );
}
