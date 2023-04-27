import { useState, useEffect, useRef, ReactElement } from "react";
import { DrawableElementProp } from "../../types/PropTypes";

import Rectangle from "../../classes/Rectangle";
import Element from "./Element";

import getInitialPos from "../../utils/getInitialPos";
import getPathState from "../../utils/path";
import transformElement from "../../utils/transformElement";

import "./styles.css";

interface Props {
  elementsArr: DrawableElementProp[];
}

export default function Parallax({ elementsArr }: Props): ReactElement {
  let scale = (window.innerWidth + 200) / 1600;

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
      elementRefs.current.forEach((elementRef, idx) => {
        const element = elements[idx];
        if (!elementRef) return;

        const observer = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) {
              const scrollTop =
                window.pageYOffset || document.documentElement.scrollTop;
              const newPos = {
                x: getPathState(element).x,
                y: element.initialPos.y - scrollTop * element.vel,
              };
              setElements((prevElements) =>
                prevElements.map((prevElement, prevIdx) =>
                  prevIdx === idx
                    ? { ...prevElement, pos: newPos }
                    : prevElement
                )
              );
            }
          },
          { threshold: 0.5 }
        );

        observer.observe(elementRef);
      });
    };

    elementRefs.current.forEach((elementRef, idx) => {
      if (elementRef) transformElement(elementRef, elements[idx]);
    });

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [window.pageYOffset]);

  useEffect(() => {
    const initialWidth = window.innerWidth;
    const initialHeight = window.innerHeight;

    const handleResize = () => {
      const widthDiff = initialWidth - window.innerWidth;
      const heightDiff = initialHeight - window.innerHeight;
      setElements((prevElements) =>
        prevElements.map((el) => {
          return {
            ...el,
            pos: {
              x: el.pos.x - widthDiff,
              y: el.pos.y - heightDiff,
            },
          };
        })
      );
    };

    elementRefs.current.forEach((elementRef, idx) => {
      if (elementRef) transformElement(elementRef, elements[idx]);
    });

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [window.innerWidth, window.innerHeight]);

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
