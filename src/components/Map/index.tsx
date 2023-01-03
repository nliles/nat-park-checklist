import { useState } from "react";
import cn from "classnames";
import { useWindowResize } from "hooks";
import usMapData from "./us";
import { geoPath } from "d3-geo";
import MapMarker from "./MapMarker";
import Tooltip from "./Tooltip";
import { Park } from "types/park";
// @ts-expect-error
import { geoAlbersUsaTerritories } from "d3-composite-projections";
import * as topojson from "topojson";
import { MapProps } from "./types";
import styles from "./index.module.scss";

const Map = ({
  parks = [],
  selectedParks = [],
  fixedWidth,
  showTree = true,
  styleName,
}: MapProps) => {
  const [tooltipContent, setTooltipContent] = useState<Park>();
  const [width] = useWindowResize();
  const usedWidth = fixedWidth || width;
  const height = usedWidth / 2;
  const usData = topojson.feature(usMapData, usMapData.objects.states);
  const padding = usedWidth > 540 ? 30 : 0;
  const circleSize = 2;
  const offsetWidth = 50;
  const bottomPadding = usedWidth > 768 ? 100 : 0;

  const projection = geoAlbersUsaTerritories().fitExtent(
    [
      [padding, padding],
      [usedWidth - offsetWidth, height],
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
      tooltipName={tooltipContent?.name}
      showTree={showTree}
      circleSize={circleSize}
    />
  ));

  return (
    <div className={cn(styles.mapContainer, styleName)}>
      <svg width={usedWidth} height={height + bottomPadding}>
        {states}
        {natParks}
        {tooltipContent && (
          <Tooltip
            park={tooltipContent}
            coords={projection([
              tooltipContent.longitude,
              tooltipContent.latitude,
            ])}
            tooltipId={tooltipContent.name}
            setTooltipContent={setTooltipContent}
          />
        )}
      </svg>
    </div>
  );
};

export default Map;
