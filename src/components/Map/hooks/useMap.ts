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
} from "../handleTooltip";
import styles from "../index.module.scss";

function useMap(
  width: number,
  height: number,
  parks: Park[],
  selectedParks: string[],
  showTree: boolean,
  handleOnClick?: (id: string) => void
) {
  useEffect(() => {
    const padding = 30;
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

    const drawMap = () => {
      const map = d3.select("#map");

      d3.select("#map g").remove();

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
        // remove old map markers
        d3.selectAll("#map a").remove();
        d3.selectAll("#map circle").remove();

        // add circles
        map
          .selectAll("circles")
          .data(parks)
          .enter()
          .append("circle")
          .classed(styles.mobileCircle, showTree)
          .attr("cx", (d) => projection([d.longitude, d.latitude])?.[0])
          .attr("cy", (d) => projection([d.longitude, d.latitude])?.[1])
          .attr("r", 2)
          .style("fill", (d) => (getIsSelected(d.id) ? "#4b5e26" : "#A8C686"));

        // Tree map markers
        if (showTree) {
          // Data for map markers
          const elem = map.selectAll("markers").data(parks);

          // add link
          const link = elem
            .enter()
            .append("a")
            .attr("class", styles.treeLink)
            .attr("xlink:href", (d) => d.url || "")
            .attr("target", "_blank")
            .attr("rel", "noreferrer")
            .attr("transform", (d) => {
              const p = projection([d.longitude, d.latitude]);
              const x = (p?.[0] || 0) - 16.5;
              const y = (p?.[1] || 0) - 45;
              return `translate(${x}, ${y})`;
            })
            .on("mouseover", (e, d) => handleMouseOver(d))
            .on("mousemove", handleMouseMove)
            .on("mouseout", handleMouseOut);

          const svg = link
            .append("svg")
            .attr("width", 33)
            .attr("height", 45)
            .attr("viewBox", "0 0 540.41 736.19")
            .on("click", (e, d) => {
              e.preventDefault();
              if (handleOnClick) {
                handleOnClick(d.id);
              }
            });

          svg
            .append("polygon")
            .attr(
              "points",
              "525.46 644.17 270.2 26.19 14.95 644.17 245.46 644.17 245.46 726.19 294.95 726.19 294.95 644.17 525.46 644.17"
            )
            .style("fill", (d) => (getIsSelected(d.id) ? "#4b5e26" : "#a8c686"))
            .style("fill-rule", "evenodd")
            .style("stroke", "#231f20")
            .style("stroke-width", "20px")
            .style("stroke-miterlimit", "10");

          // add link text
          link
            .append("text")
            .text((d, i) => `${i + 1}`)
            .attr("class", styles.treeLinkText)
            .style("fill", (d) => (getIsSelected(d.id) ? "white" : "black"))
            .attr("text-anchor", "middle")
            .attr("x", 16.5)
            .attr("y", 30);
        }
      }
    };

    drawMap();
    window.addEventListener("resize", drawMap);
    return () => window.removeEventListener("resize", drawMap);
  });
}

export default useMap;
