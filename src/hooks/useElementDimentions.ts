import { RefObject, useEffect, useState } from "react";

interface ElementDimentions {
  clientWidth: number;
  clientHeight: number;
  clientRect: null | DOMRect;
}

const initialData = {
  clientWidth: 0,
  clientHeight: 0,
  clientRect: null,
};

const useElementDimentions = (ref: RefObject<HTMLElement>) => {
  const getDimensions = () => ({
    clientWidth: ref.current?.clientWidth || 0,
    clientHeight: ref.current?.clientHeight || 0,
    clientRect: ref.current?.getBoundingClientRect() || null,
  });

  const [dimensions, setDimensions] = useState<ElementDimentions>(initialData);

  useEffect(() => {
    const handleResize = () => {
      setDimensions(getDimensions());
    };

    if (ref.current) {
      setDimensions(getDimensions());
    }

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [ref]);

  return dimensions;
};

export default useElementDimentions;
