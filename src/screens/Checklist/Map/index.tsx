import { Park } from "types/park";
import useMap from "screens/Checklist/Map/hooks/useMap";
import useContainerWidth from "hooks/useContainerWidth";
import useTooltip from "screens/Checklist/Map/hooks/useTooltip";
import styles from "./Map.module.scss";

type MapProps = {
  parks: Park[];
  handleClick?: (id: string, parkCode: string, designation: string) => void;
};

const Map = ({ parks = [], handleClick }: MapProps) => {
  const { containerRef, width, height } = useContainerWidth();
  useMap(width, height, parks, handleClick);
  useTooltip();

  return (
    <div ref={containerRef} className={styles.mapContainer} id="mapContainer" />
  );
};

export default Map;
