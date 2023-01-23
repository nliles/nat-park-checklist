import { useState, useEffect } from "react";
import cn from "classnames";
import useWindowResize from "hooks/useWindowResize";
import usMapData from "data/us";
import * as d3 from "d3";
import { geoPath } from "d3-geo";
import MapMarker from "components/MapMarker";
import { Park } from "types/park";
import {
  handleMouseOver,
  handleMouseOut,
  handleMouseMove,
} from "./handleTooltip";
// @ts-expect-error
import { geoAlbersUsaTerritories } from "d3-composite-projections";
import * as topojson from "topojson";
import styles from "./index.module.scss";

type MapProps = {
  parks: Park[];
  selectedParks?: string[];
  fixedWidth?: number;
  showTree?: boolean;
  styleName?: string;
};

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

  useEffect(() => {
    /// tooltip creation
    const tooltip = d3
      .select("body")
      .append("div")
      .attr("id", "tooltip")
      .attr("class", styles.tooltip);

    const imgContainer = tooltip
      .append("div")
      .attr("class", styles.imgContainer);
    const textContainer = tooltip.append("div").attr("class", styles.text);

    textContainer.append("h1");
    textContainer.append("span");

    imgContainer.append("img").attr("width", 30).attr("height", 30);
  }, []);

  const projection = geoAlbersUsaTerritories().fitExtent(
    [
      [padding, padding],
      [usedWidth - offsetWidth, height],
    ],
    usData
  );
  const pathGenerator = geoPath().projection(projection);

  // @ts-expect-error
  const states = usData.features.map((d) => (
    // @ts-expect-error
    <path key={d.id} d={pathGenerator(d)} className={styles.state} />
  ));

  const natParks = parks.map((p: Park, i: number) => (
    <MapMarker
      key={p.id}
      coords={projection([p.longitude, p.latitude])}
      isSelected={selectedParks.includes(p.id)}
      park={p}
      onMouseMove={(e) => handleMouseMove(e)}
      onMouseOver={() => handleMouseOver(p)}
      onMouseOut={() => handleMouseOut()}
      number={i + 1}
      showTree={showTree}
      circleSize={circleSize}
    />
  ));

  return (
    <div className={cn(styles.mapContainer, styleName)}>
      <svg width={usedWidth} height={height + bottomPadding}>
        {states}
        {natParks}
      </svg>
    </div>
  );
};

export default Map;
