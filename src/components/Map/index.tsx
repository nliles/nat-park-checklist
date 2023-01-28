import { useRef, useState, useEffect } from "react";
import cn from "classnames";
import { Park } from "types/park";
import useMap from "./useMap";
import useTooltip from "./useTooltip";
import styles from "./index.module.scss";

type MapProps = {
  parks: Park[];
  selectedParks?: string[];
  showTree?: boolean;
  styleName?: string;
  defaultWidth?: number
};

const Map = ({
  parks = [],
  selectedParks = [],
  showTree = true,
  styleName,
  defaultWidth = window.innerWidth
}: MapProps) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(defaultWidth);
  const [height, setHeight] = useState(defaultWidth / 2);

  const updateDimensions = () => {
    if (mapContainerRef.current) {
      const newWidth = mapContainerRef.current.clientWidth;
      setWidth(newWidth);
      setHeight(newWidth / 2);
    }
  };

  useEffect(() => {
    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  useMap(width, height, parks, selectedParks, showTree);
  useTooltip();

  return (
    <div ref={mapContainerRef} className={cn(styles.mapContainer, styleName)}>
      <svg id="map"></svg>
    </div>
  );
};

export default Map;
