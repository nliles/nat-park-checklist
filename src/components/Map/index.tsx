import { useRef, useState, useEffect } from "react";
import cn from "classnames";
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
  showTree?: boolean;
  styleName?: string;
};

const Map = ({
  parks = [],
  selectedParks = [],
  showTree = true,
  styleName,
}: MapProps) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0)
  const [height, setHeight] = useState(0)

  const updateDimensions = () => {
    if (mapContainerRef.current) {
      const newWidth = mapContainerRef.current.clientWidth
      setWidth(newWidth);
      setHeight(newWidth / 2)
    }
  };

  useEffect(() => {
    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  const usData = topojson.feature(usMapData, usMapData.objects.states);
  const padding = width > 540 ? 30 : 0;
  const circleSize = 2;
  const offsetWidth = 50;
  const bottomPadding = width > 768 ? 80 : 0;

  useTooltip();

  const projection = geoAlbersUsaTerritories().fitExtent(
    [
      [padding, padding],
      [width - offsetWidth, ((width - offsetWidth) / 2)],
    ],
    usData
  );

  const path = geoPath().projection(projection);

  const draw = () => {

    const map = d3.select("#map")

    d3.select("g").remove()


    // Draw the map
    map
    .attr("width", width)
    .attr("height", height + bottomPadding)
    .append("g")
        .selectAll("path")
        .data(usData.features)
        .enter().append("path")
            .attr("class", styles.state)
            .attr("d", path)

            const getIsSelected = (id: string) => selectedParks.includes(id);

            if (parks.length > 0) {
              const map = d3.select("#map");

              // remove old map markers
              d3.selectAll("#map a").remove();
              d3.selectAll("#map circle").remove();

              // add circles
              map.selectAll("circles")
                .data(parks)
                .enter()
                .append("circle")
                .attr("class", showTree ? styles.mobileCircle : '')
                .attr("cx", (d) => projection([d.longitude, d.latitude])?.[0])
                .attr("cy", (d) => projection([d.longitude, d.latitude])?.[1])
                .attr("r", circleSize)
                .style("fill", (d) => getIsSelected(d.id) ? "#4b5e26" : "#A8C686")

                if (showTree) {
                  // Data for map markers
                  const elem = map.selectAll("markers").data(parks)
                  // add link
                  const link = elem.enter()
                   .append("a")
                   .attr("class", styles.treeIcon)
                   .attr("xlink:href", (d) => d.url || '')
                   .attr("target", '_blank')
                   .attr("transform", (d) => {
                     const p = projection([d.longitude , d.latitude]);
                     return `translate(${p[0] - 20}, ${p[1] - 40})`
                   })
                   .on("mouseover", (e, d) => handleMouseOver(d))
                   .on("mousemove", handleMouseMove)
                   .on("mouseout", handleMouseOut)

                   // add image to link
                   link.append("image")
                      .attr("xlink:href", (d) => getIsSelected(d.id) ? 'selectedTree.svg' : 'tree.svg')

                    // add link text
                    link.append("text")
                       .text((d, i) => `${i + 1}`)
                       .attr('class', styles.treeLink)
                       .style("fill", (d) => getIsSelected(d.id) ? 'white' : 'black')
                       .attr("text-anchor", "middle")
                       .attr("x", 20)
                       .attr("y", 27)
                }
              }
  }

  useEffect(() => {
    draw()
  })

  useEffect(() => {
    window.addEventListener("resize", draw)
    return () => window.removeEventListener("resize", null)
  }, [])

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
    <div ref={mapContainerRef} className={cn(styles.mapContainer, styleName)}>
      <svg id="map">
      </svg>
    </div>
  );
};

export default Map;
