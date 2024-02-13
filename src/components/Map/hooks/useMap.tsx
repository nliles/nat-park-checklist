import { useEffect } from "react";
import * as d3 from "d3";
import { geoPath } from "d3-geo";
import { FeatureCollection } from "geojson";
// @ts-ignore
import { geoAlbersUsaTerritories } from "d3-composite-projections";
import * as topojson from "topojson";
import usMapData from "data/us";
import { Park } from "types/park";
import {
  handleMouseOver,
  handleMouseOut,
  handleMouseMove,
} from "components/Map/handleTooltip";
import styles from "../Map.module.scss";

function useMap(
  width: number,
  height: number,
  parks: Park[],
  selectedParks: string[],
  showTree: boolean,
  handleOnClick?: (id: string) => void
) {
  useEffect(() => {
    // Map data
    const usData = topojson.feature(
      usMapData,
      usMapData.objects.states
    ) as FeatureCollection;
    const widthTabletDesktop = width >= 768;
    // Map padding
    const paddingTopBottom = widthTabletDesktop ? 35 : 0;
    const bottomPadding = widthTabletDesktop ? 40 : 0;
    // Map height/width
    const mapWidth = width;
    const mapHeight = width / 2;

    const projection = geoAlbersUsaTerritories().fitExtent(
      [
        [0, paddingTopBottom],
        [mapWidth, mapHeight],
      ],
      usData
    );

    const path = geoPath().projection(projection);
    const svg = d3.select("#map");
    let link: any = d3.select(null);
    let active: any = d3.select(null);
    const getIsSelected = (id: string) => selectedParks.includes(id);
    const getMarkerFill = (id: string) =>
      getIsSelected(id) ? "#4b5e26" : "#a8c686";

    const reset = () => {
      active = d3.select(null);
      svg.select("g").transition().duration(750).attr("transform", "");
    };

    const drawMap = () => {
      // Remove previous map before drawing a new one
      svg.select("g").remove();

      // Draw the map
      svg.attr("width", width).attr("height", height + bottomPadding);

      const g = svg.append("g");

      const d = g
        .selectAll("path")
        .data(usData.features)
        .enter()
        .append("path")
        .attr("class", styles.state)
        .attr("d", path);

      // Draw Map Markers
      if (parks.length > 0) {
        // remove old map markers
        g.selectAll("a").remove();
        g.selectAll("circle").remove();

        // add circles
        g.selectAll("circles")
          .data(parks)
          .enter()
          .append("circle")
          .classed(styles.mobileCircle, showTree)
          .attr("cx", (d) => projection([d.longitude, d.latitude])?.[0])
          .attr("cy", (d) => projection([d.longitude, d.latitude])?.[1])
          .attr("r", 2)
          .style("fill", (d) => getMarkerFill(d.id))

        // Tree map markers
        if (showTree) {
          // Data for map markers
          const markers = g.selectAll("markers");

          // add link
          link = markers
            .data(parks)
            .enter()
            .append("a")
            .attr("class", styles.treeLink)
            .attr("xlink:href", (d) => d.url || "")
            .attr("transform", (d) => {
              const p = projection([d.longitude, d.latitude]);
              const x = (p?.[0] || 0) - 16.5;
              const y = (p?.[1] || 0) - 45;
              return `translate(${x}, ${y})`;
            })
            .on("mouseover", (e, d) => handleMouseOver(d))
            .on("mousemove", handleMouseMove)
            .on("mouseout", handleMouseOut);

          // add tree svg container
          const treeSvg = link
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

          // Add tree polygon shape
          treeSvg
            .append("polygon")
            .attr(
              "points",
              "525.46 644.17 270.2 26.19 14.95 644.17 245.46 644.17 245.46 726.19 294.95 726.19 294.95 644.17 525.46 644.17"
            )
            .style("fill", (d) => getMarkerFill(d.id))
            .style("fill-rule", "evenodd")
            .style("stroke", "#231f20")
            .style("stroke-width", "20px")
            .style("stroke-miterlimit", "10")
            .on("mouseover", function (e, d) {
              d3.select(this).style("fill", "#4b5e26");
            })
            .on("mouseout", function (e, d) {
              d3.select(this).style("fill", getMarkerFill(d.id));
            });

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

      d
      // .on("mouseover", function (event, d) {
      //   d3.select(this).style("fill", "#d8d2bc");
      // })
      //   .on("mouseout", function (event, d) {
      //     d3.select(this).style(
      //       "fill",
      //       active.node() === this ? "#d8d2bc" : "#eae3d1"
      //     );
      //   })
        .on("click", function (event, d) {
          active.classed(styles.active, false);
          if (active.node() === this) return reset();
          active = d3.select(this).classed(styles.active, true);
          const bounds = path.bounds(d),
            dx = bounds[1][0] - bounds[0][0],
            dy = bounds[1][1] - bounds[0][1],
            x = (bounds[0][0] + bounds[1][0]) / 2,
            y = (bounds[0][1] + bounds[1][1]) / 2,
            scale = 0.5 / Math.max(dx / width, dy / height),
            translate = [width / 2 - scale * x, height / 2 - scale * y];

          g.transition()
            .duration(750)
            .attr("transform", `translate(${translate})scale(${scale})`);

          link.transition()
            .duration(750)
            .attr("transform", function() {
              const transform = d3.select(this).attr("transform");
              return `${transform}scale(${1/scale})`;
            }); 
        }); 
    };

    drawMap();
    window.addEventListener("resize", drawMap);
    return () => window.removeEventListener("resize", drawMap);
  });
}

export default useMap;
