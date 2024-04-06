import { ParkData } from "types/park";
import useStatsMap from "./useStatsMap";
import styles from "./StatsMap.module.scss";
import useContainerWidth from "hooks/useContainerWidth";

type MapProps = {
  parks?: ParkData;
  selectedParks?: string[];
  defaultWidth?: number;
};

const StatsMap = ({
  parks,
  selectedParks = [],
  defaultWidth = window.innerWidth,
}: MapProps) => {
  const { containerRef, width, height } = useContainerWidth();
  const formattedSelected = Object.values(selectedParks).flat(1);
  const formattedParks = Object.values(parks || {}).flat(1);
  useStatsMap(width, height, formattedParks, formattedSelected);

  return (
    <div
      ref={containerRef}
      className={styles.mapContainer}
      id="statsMapContainer"
    />
  );
};

export default StatsMap;
