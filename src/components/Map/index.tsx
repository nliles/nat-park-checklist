import cn from "classnames";
import useWindowResize from "hooks/useWindowResize";
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
  const [width] = useWindowResize();
  useTooltip();
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
