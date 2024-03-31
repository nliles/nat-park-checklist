import cn from "classnames";
import { Park } from "types/park";
import useMap from "screens/Checklist/Map/hooks/useMap";
import useContainerWidth from "hooks/useContainerWidth";
import useTooltip from "screens/Checklist/Map/hooks/useTooltip";
import styles from "./Map.module.scss";

type MapProps = {
  parks: Park[];
  selectedParks?: string[];
  showTree?: boolean;
  showBorder?: boolean;
  defaultWidth?: number;
  handleClick?: (id: string, parkCode: string, designation: string) => void;
};

const Map = ({
  parks = [],
  selectedParks = [],
  showBorder = true,
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
      className={cn(styles.mapContainer, {
        [styles.border]: showBorder,
      })}
    >
      <svg id="map" />
    </div>
  );
};

export default Map;
