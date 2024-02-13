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
    const paddingLeftRight = 0;
    const paddingTopBottom = widthTabletDesktop ? 35 : 0;
    const bottomPadding = widthTabletDesktop ? 80 : 0;
    // Map height/width
    const offsetWidth = widthTabletDesktop ? 50 : 0;
    const mapWidth = width - offsetWidth;
    const mapHeight = (width - offsetWidth) / 2;

    const projection = geoAlbersUsaTerritories().fitExtent(
      [
        [paddingLeftRight, paddingTopBottom],
        [mapWidth, mapHeight],
      ],
      usData
    );

    const path = geoPath().projection(projection);

    const getIsSelected = (id: string) => selectedParks.includes(id);
    const getMarkerFill = (id: string) =>
      getIsSelected(id) ? "#4b5e26" : "#a8c686";
    const getLinkTextFill = (id: string) =>
      getIsSelected(id) ? "white" : "black";

    const drawMap = () => {
      const svg = d3.select("#map");
      // Remove previous map before drawing a new one
      svg.select("g").remove();

      // Draw the map
      svg.attr("width", width).attr("height", height + bottomPadding);

      const g = svg.append("g");

      g.selectAll("path")
        .data(usData.features)
        .enter()
        .append("path")
        .attr("class", styles.state)
        .attr("d", path);

      // Draw Map Markers
      if (parks.length > 0) {
        // remove old map markers
        svg.selectAll("a").remove();
        svg.selectAll("circle").remove();

        // add circles
        svg
          .selectAll("circles")
          .data(parks)
          .enter()
          .append("circle")
          .classed(styles.mobileCircle, showTree)
          .attr("cx", (d) => projection([d.longitude, d.latitude])?.[0])
          .attr("cy", (d) => projection([d.longitude, d.latitude])?.[1])
          .attr("r", 2)
          .style("fill", (d) => getMarkerFill(d.id));

        // Tree map markers
        if (showTree) {
          // Data for map markers
          const markers = g.selectAll("markers");

          // add link container
          const linkContainer = markers
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
            .on("mouseover", function (e, d) {
              const linkText = d3.select(this).selectAll("text");
              linkText.style("fill", "white");
              handleMouseOver(d);
            })
            .on("mousemove", handleMouseMove)
            .on("mouseout", function (e, d) {
              const linkText = d3.select(this).selectAll("text");
              linkText.style("fill", getLinkTextFill(d.id));
              handleMouseOut();
            });

          // add tree svg container
          const treeSvg = linkContainer
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
          linkContainer
            .append("text")
            .text((d, i) => `${i + 1}`)
            .attr("class", styles.treeLinkText)
            .style("fill", (d) => getLinkTextFill(d.id))
            .attr("text-anchor", "middle")
            .attr("x", 16.5)
            .attr("y", 30)
            .on("mouseover", function (e, d) {
              e.stopPropagation();
              d3.select(this).style("fill", getLinkTextFill(d.id));
              handleMouseOver(d);
            });
        }
      }
    };

    drawMap();
    window.addEventListener("resize", drawMap);
    return () => window.removeEventListener("resize", drawMap);
  });
}

export default useMap;
