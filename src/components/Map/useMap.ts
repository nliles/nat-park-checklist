import { useEffect } from "react";
import * as d3 from "d3";
import { geoPath } from "d3-geo";
// @ts-ignore
import { geoAlbersUsaTerritories } from "d3-composite-projections";
import * as topojson from "topojson";
import usMapData from "data/us";
import { Park } from "types/park";
import {
  handleMouseOver,
  handleMouseOut,
  handleMouseMove,
} from "./handleTooltip";
import styles from "./index.module.scss";

function useMap(
  width: number,
  height: number,
  parks: Park[],
  selectedParks: string[],
  showTree: boolean
) {
  const padding = width > 540 ? 30 : 0;
  const offsetWidth = 50;
  const bottomPadding = width > 768 ? 80 : 0;
  const usData = topojson.feature(usMapData, usMapData.objects.states);

  const projection = geoAlbersUsaTerritories().fitExtent(
    [
      [padding, padding],
      [width - offsetWidth, (width - offsetWidth) / 2],
    ],
    usData
  );

  const path = geoPath().projection(projection);

  const getIsSelected = (id: string) => selectedParks.includes(id);

  useEffect(() => {
    const drawMap = () => {
      console.log('draw map')
      const map = d3.select("#map");

      d3.select("g").remove();

      // Draw the map
      map
        .attr("width", width)
        .attr("height", height + bottomPadding)
        .append("g")
        .selectAll("path")
        // @ts-ignore
        .data(usData.features)
        .enter()
        .append("path")
        .attr("class", styles.state)
        // @ts-ignore
        .attr("d", path);

      // Draw Map Markers
      if (parks.length > 0) {
        const map = d3.select("#map");

        // remove old map markers
        d3.selectAll("#map a").remove();
        d3.selectAll("#map circle").remove();

        // add circles
        map
          .selectAll("circles")
          .data(parks)
          .enter()
          .append("circle")
          .attr("class", showTree ? styles.mobileCircle : "")
          .attr("cx", (d) => projection([d.longitude, d.latitude])?.[0])
          .attr("cy", (d) => projection([d.longitude, d.latitude])?.[1])
          .attr("r", 2)
          .style("fill", (d) => (getIsSelected(d.id) ? "#4b5e26" : "#A8C686"));

        if (showTree) {
          // Data for map markers
          const elem = map.selectAll("markers").data(parks);

          // add link
          const link = elem
            .enter()
            .append("a")
            .attr("class", styles.treeIcon)
            .attr("xlink:href", (d) => d.url || "")
            .attr("target", "_blank")
            .attr("transform", (d) => {
              const p = projection([d.longitude, d.latitude]);
              return `translate(${p[0] - 20}, ${p[1] - 40})`;
            })
            .on("mouseover", (e, d) => handleMouseOver(d))
            .on("mousemove", handleMouseMove)
            .on("mouseout", handleMouseOut);

          // add image to link
          link
            .append("image")
            .attr("xlink:href", (d) =>
              getIsSelected(d.id) ? "selectedTree.svg" : "tree.svg"
            );

          // add link text
          link
            .append("text")
            .text((d, i) => `${i + 1}`)
            .attr("class", styles.treeLink)
            .style("fill", (d) => (getIsSelected(d.id) ? "white" : "black"))
            .attr("text-anchor", "middle")
            .attr("x", 20)
            .attr("y", 27);
        }
      }
    };

    drawMap();
    window.addEventListener("resize", drawMap);
    return () => window.removeEventListener("resize", drawMap);
  }, [width, height, parks, selectedParks]);
}

export default useMap;
