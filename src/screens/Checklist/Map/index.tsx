import { Park } from "types/park";
import useMap from "screens/Checklist/Map/hooks/useMap";
import useContainerWidth from "hooks/useContainerWidth";
import useTooltip from "screens/Checklist/Map/hooks/useTooltip";
import styles from "./Map.module.scss";

type MapProps = {
  parks: Park[];
  selectedParks?: string[];
  defaultWidth?: number;
  handleClick?: (id: string, parkCode: string, designation: string) => void;
};

const Map = ({
  parks = [],
  selectedParks = [],
  defaultWidth = window.innerWidth,
  handleClick,
}: MapProps) => {
  const { containerRef, width, height } = useContainerWidth();
  const formattedSelected = Object.values(selectedParks).flat(1);

  useMap(width, height, parks, formattedSelected, handleClick);
  useTooltip();

  return (
    <div
      ref={containerRef}
      className={styles.mapContainer}
    >
      <svg id="map" />
    </div>
  );
};

export default Map;
