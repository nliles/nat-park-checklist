import { Park } from "types/park";
import useStatsMap from "./useStatsMap";
import styles from "./StatsMap.module.scss";
import useContainerWidth from "hooks/useContainerWidth";

type MapProps = {
  parks: Park[];
  selectedParks?: string[];
  defaultWidth?: number;
};

const StatsMap = ({
  parks = [],
  selectedParks = [],
  defaultWidth = window.innerWidth,
}: MapProps) => {
  const { containerRef, width, height } = useContainerWidth();
  const formattedSelected = Object.values(selectedParks).flat(1);
  useStatsMap(width, height, parks, formattedSelected);

  return (
    <div ref={containerRef} className={styles.mapContainer} id="mapContainer">
      <svg id="legend" width="260" height="50" />
      <svg id="statsMap" />
    </div>
  );
};

export default StatsMap;
