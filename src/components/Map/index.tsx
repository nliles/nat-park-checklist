import { useState } from "react";
import { useWindowResize } from "../../hooks";
import usMapData from "./us";
import { geoPath } from "d3-geo";
import MapMarker from "./MapMarker";
import Tooltip from "./Tooltip";
import { Park } from "../../types";
// @ts-expect-error
import { geoAlbersUsaTerritories } from "d3-composite-projections";
import * as topojson from "topojson";
import styles from "./index.module.scss";

type MapType = {
  parks: Park[];
  selectedParks: string[];
};

const Map = ({ parks = [], selectedParks = [] }: MapType) => {
  const [tooltipContent, setTooltipContent] = useState<Park | undefined>(
    undefined
  );
  const [width] = useWindowResize();
  const height = width / 2;
  const usData = topojson.feature(usMapData, usMapData.objects.states);
  const padding = width > 540 ? 30 : 0;
  const bottomPadding = width > 768 ? 100 : 0;

  const projection = geoAlbersUsaTerritories().fitExtent(
    [
      [padding, padding],
      [width - 40, height],
    ],
    usData
  );
  const pathGenerator = geoPath().projection(projection);

  const handleMouseOverPark = (park: Park) => {
    setTooltipContent(park);
  };

  const handleMouseLeavePark = () => {
    setTooltipContent(undefined);
  };

  // @ts-expect-error
  const states = usData.features.map((d) => (
    // @ts-expect-error
    <path key={d.id} d={pathGenerator(d)} className={styles.state} />
  ));

  const natParks = parks.map((p: Park, i: number) => (
    <MapMarker
      key={p.fullName}
      coords={projection([p.longitude, p.latitude])}
      isSelected={selectedParks.includes(p.id)}
      park={p}
      handleMouseOver={handleMouseOverPark}
      handleMouseLeave={handleMouseLeavePark}
      number={i + 1}
    />
  ));

  return (
    <div className={styles.mapContainer}>
      <svg width={width} height={height + bottomPadding}>
        {states}
        {natParks}
        {tooltipContent && (
          <Tooltip
            park={tooltipContent}
            coords={projection([
              tooltipContent.longitude,
              tooltipContent.latitude,
            ])}
          />
        )}
      </svg>
    </div>
  );
};

export default Map;
