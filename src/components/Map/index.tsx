import { useRef, useState, useEffect } from "react";
import cn from "classnames";
import usMapData from "data/us";
import { geoPath } from "d3-geo";
import MapMarker from "components/MapMarker";
import { Park } from "types/park";
import {
  handleMouseOver,
  handleMouseOut,
  handleMouseMove,
} from "./handleTooltip";
import useTooltip from "./useTooltip";
// @ts-expect-error
import { geoAlbersUsaTerritories } from "d3-composite-projections";
import * as topojson from "topojson";
import styles from "./index.module.scss";

type MapProps = {
  parks: Park[];
  selectedParks?: string[];
  showTree?: boolean;
  styleName?: string;
};

const Map = ({
  parks = [],
  selectedParks = [],
  showTree = true,
  styleName,
}: MapProps) => {
  const mapContainerRef = useRef<any>();
  const [width, setwidth] = useState(0)

  useEffect(() => {
    const observer = new ResizeObserver(entries => {
      setwidth(entries[0].contentRect.width)
    })
    observer.observe(mapContainerRef.current)
    return () => mapContainerRef.current && observer.unobserve(mapContainerRef.current)
  }, [])

  const height = width / 2;
  const usData = topojson.feature(usMapData, usMapData.objects.states);
  const padding = width > 540 ? 30 : 0;
  const circleSize = 2;
  const offsetWidth = 50;
  const bottomPadding = width > 768 ? 100 : 0;
  useTooltip();

  const projection = geoAlbersUsaTerritories().fitExtent(
    [
      [padding, padding],
      [width - offsetWidth, height],
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
    <div ref={mapContainerRef} className={cn(styles.mapContainer, styleName)}>
      <svg width={width} height={height + bottomPadding}>
        {states}
        {natParks}
      </svg>
    </div>
  );
};

export default Map;
