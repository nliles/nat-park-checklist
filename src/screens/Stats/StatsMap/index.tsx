import { useRef, useState, useEffect } from "react";
import { Park } from "types/park";
import useStatsMap from "./useStatsMap";
import styles from "./StatsMap.module.scss";

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

  useStatsMap(width, height, parks, formattedSelected);
  return (
    <div
      ref={mapContainerRef}
      className={styles.mapContainer}
      id="mapContainer"
    >
      <svg id="legend" width="260" height="50" />
      <svg id="statsMap" />
    </div>
  );
};

export default StatsMap;