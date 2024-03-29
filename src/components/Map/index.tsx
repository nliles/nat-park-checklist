import cn from "classnames";
import { useRef, useState, useEffect } from "react";
import { Park } from "types/park";
import useMap from "components/Map/hooks/useMap";
import useTooltip from "components/Map/hooks/useTooltip";
import styles from "./Map.module.scss";
import useStateMap from "./hooks/useStateMap";

type MapProps = {
  parks: Park[];
  selectedParks?: string[];
  showTree?: boolean;
  showBorder?: boolean;
  defaultWidth?: number;
  handleClick?: (id: string, parkCode: string, designation: string) => void;
  stateMap?: boolean;
};

const Map = ({
  parks = [],
  selectedParks = [],
  showTree = true,
  showBorder = true,
  defaultWidth = window.innerWidth,
  handleClick,
  stateMap = false,
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

  const formattedSelected = Object.values(selectedParks).flat(1);

  useMap(width, height, parks, formattedSelected, showTree, handleClick, stateMap);
  useStateMap(width, height, parks, formattedSelected, stateMap)
  useTooltip();

  return (
    <div
      ref={mapContainerRef}
      className={cn(styles.mapContainer, {
        [styles.border]: showBorder,
      })}
    >
      <svg id="legend" width="100" height="20"/>
      <svg id="map" />
    </div>
  );
};

export default Map;
