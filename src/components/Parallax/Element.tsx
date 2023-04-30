import { MutableRefObject, useEffect, useState } from "react";
import Rectangle from "../../classes/Rectangle";
import drawElement from "../../utils/drawElement";
const API_KEY = import.meta.env.VITE_API_KEY;

export default function Element({
  elementRefs,
  idx,
  elementObject,
}: {
  elementRefs: MutableRefObject<(HTMLDivElement | null)[]>;
  idx: number;
  elementObject: Rectangle;
}): JSX.Element {
  const [imgUrl, setImgUrl] = useState(
    "https://images.pexels.com/photos/2911521/pexels-photo-2911521.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
  );

  useEffect(() => {
    drawElement(elementRefs.current[idx], elementObject);
  }, [elementRefs]);

  useEffect(() => {
    const category = "city";
    const width = elementObject.width;
    const height = elementObject.height;
    const url =
      "https://api.api-ninjas.com/v1/randomimage?category=" +
      category +
      ";width=" +
      width +
      ";height=" +
      height;

    fetch(url, {
      headers: {
        "X-Api-Key": API_KEY,
        Accept: "image/jpg",
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.blob();
        }
        throw new Error(
          `Error while fetching image from API: ${response.status}`
        );
      })
      .then((blob) => {
        const imgUrl = URL.createObjectURL(blob);
        setImgUrl(imgUrl);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div
      ref={(ref) => {
        elementRefs.current[idx] = ref;
      }}
      style={{
        width: elementObject.width,
        height: elementObject.height,
        borderRadius: "15%",
        backgroundImage: `url(${imgUrl})`,
      }}
    ></div>
  );
}
