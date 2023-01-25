import { useEffect } from "react";
import cn from "classnames";
import useWindowResize from "hooks/useWindowResize";
import usMapData from "data/us";
import * as d3 from "d3";
import { geoPath } from "d3-geo";
import MapMarker from "components/MapMarker";
import TreeIcon from "components/Icons/TreeIcon";
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

  useEffect(() => {
    const map = d3.select("#map")

    const projection = geoAlbersUsaTerritories().fitExtent(
      [
        [padding, padding],
        [usedWidth - offsetWidth, height],
      ],
      usData
    );

    const path = geoPath().projection(projection);

    // Draw the map
    map.append("g")
        .selectAll("path")
        .data(usData.features)
        .enter().append("path")
            .attr("class", styles.state)
            .attr("d", path)

    // map.selectAll("markers")
    //  .data(parks)
    //  .enter()
    //  .append("image")
    //  .attr('width', 20)
    //  .attr('height', 20)
    //  .attr("xlink:href", 'np.svg')
    //  .attr("transform", (d) => "translate(" + projection([d.longitude , d.latitude]) + ")")

     map.selectAll("circles")
      .data(parks)
      .enter()
       .append("circle")
       .attr("class", styles.circle)
       .attr("cx", (d) => projection([d.longitude, d.latitude])[0])
       .attr("cy", (d) => projection([d.longitude, d.latitude])[1])
       .attr("r", circleSize)
       .style("fill", (d) => selectedParks.includes(d.id) ? '#a8c686' : '#4b5e26')

  }, [usData, usedWidth, height, padding])

  // @ts-expect-error
  // const states = usData.features.map((d) => (
  //   // @ts-expect-error
  //   <path key={d.id} d={path(d)} className={styles.state} />
  // ));

  // const natParks = parks.map((p: Park, i: number) => (
  //   <MapMarker
  //     key={p.id}
  //     coords={projection([p.longitude, p.latitude])}
  //     isSelected={selectedParks.includes(p.id)}
  //     park={p}
  //     onMouseMove={(e) => handleMouseMove(e)}
  //     onMouseOver={() => handleMouseOver(p)}
  //     onMouseOut={() => handleMouseOut()}
  //     number={i + 1}
  //     showTree={showTree}
  //     circleSize={circleSize}
  //   />
  // ));

  return (
    <div className={cn(styles.mapContainer, styleName)}>
      <svg id="map" width={usedWidth} height={height + bottomPadding}>
      </svg>
    </div>
  );
};

export default Map;
