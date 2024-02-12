import { useRef, useState, useEffect } from "react";
import { Park } from "types/park";
import useMap from "components/Map/hooks/useMap";
import useTooltip from "components/Map/hooks/useTooltip";
import styles from "./Map.module.scss";

type MapProps = {
  parks: Park[];
  selectedParks?: string[];
  showTree?: boolean;
  defaultWidth?: number;
  handleOnClick?: (id: string) => void;
};

const Map = ({
  parks = [],
  selectedParks = [],
  showTree = true,
  defaultWidth = window.innerWidth,
  handleOnClick,
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

  useMap(width, height, parks, selectedParks, showTree, handleOnClick);
  useTooltip();

  return (
    <div ref={mapContainerRef} className={styles.mapContainer}>
      <svg id="map" />
    </div>
  );
};

export default Map;
