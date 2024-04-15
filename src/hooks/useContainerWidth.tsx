import { useEffect, useRef, useState } from "react";
import debounce from "lodash/debounce";

function useContainerWidth() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  const updateDimensions = debounce(() => {
    if (containerRef.current) {
      const newWidth = containerRef.current.clientWidth;
      setWidth(newWidth);
      setHeight(newWidth / 2);
    }
  }, 100);

  useEffect(() => {
    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  return {
    containerRef,
    width,
    height,
  };
}

export default useContainerWidth;
