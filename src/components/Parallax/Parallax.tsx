import { useRef, useEffect } from "react";
import { DrawableElementProp } from "../../types/PropTypes";

import Rectangle from "../../classes/Rectangle";
import Element from "./Element";

import drawElement from "../../utils/drawElement";

interface Props {
  elementsArr: DrawableElementProp[];
  id?: number;
}

export default function Parallax({ elementsArr }: Props) {
  const elements: Rectangle[] = elementsArr.map((el, idx) => {
    return new Rectangle(el, idx, elementsArr.length, 1);
  });

  const elementRefs = useRef<(HTMLDivElement | null)[]>([]);

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        elementRefs.current.forEach((elementRef, idx) => {
          if (!elementRef) return;
          if (entry.isIntersecting) {
            if (entry.target === elementRef) {
              const element = elements[idx];
              element.isVisible = true;
            }
          } else {
            if (entry.target === elementRef) {
              const element = elements[idx];
              element.isVisible = false;
            }
          }
        });
      });
    },
    { threshold: 0.5 }
  );

  const handleScroll = () => {
    elementRefs.current.forEach((elementRef, idx) => {
      const element = elements[idx];
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      element.scroll(scrollTop);
      drawElement(elementRef, element);
    });
  };

  useEffect(() => {
    elementRefs.current.forEach((elementRef) => {
      if (!elementRef) return;
      observer.observe(elementRef);
    });
    window.addEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const initialWidth = window.innerHeight;
    const initialHeight = window.innerWidth;

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
        if (elementRef) drawElement(elementRef, elements[idx]);
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
