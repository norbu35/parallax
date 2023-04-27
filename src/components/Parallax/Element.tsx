import { MutableRefObject } from "react";
import Rectangle from "../../classes/Rectangle";

export default function Element({
  elementRefs,
  idx,
  elementObject,
}: {
  elementRefs: MutableRefObject<(HTMLDivElement | null)[]>;
  idx: number;
  elementObject: Rectangle;
}) {
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
