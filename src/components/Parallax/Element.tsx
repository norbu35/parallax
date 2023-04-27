import { MutableRefObject, useEffect } from "react";
import Rectangle from "../../classes/Rectangle";
import transformElement from "../../utils/transformElement";

export default function Element({
  elementRefs,
  idx,
  elementObject,
}: {
  elementRefs: MutableRefObject<(HTMLDivElement | null)[]>;
  idx: number;
  elementObject: Rectangle;
}) {
  useEffect(() => {
    transformElement(elementRefs.current[idx], elementObject);
  }, [elementRefs]);

  return (
    <div
      ref={(ref) => {
        elementRefs.current[idx] = ref;
      }}
      style={{
        width: elementObject.width,
        height: elementObject.height,
        backgroundImage: `url(${elementObject.imgUrl})`,
      }}
    />
  );
}
