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
    const map = d3.select("#map");
    const getIsSelected = (id: string) => selectedParks.includes(id);

    const drawMap = () => {
      const g = d3.select("#map g")
      let active: any = d3.select(null);
      // : d3.Selection<SVGElement>;

      // Remove previous map before drawing a new one
      d3.select("#map g").remove();

      // Draw the map
      map
        .attr("width", width)
        .attr("height", height + bottomPadding);
        
      map.append("g")
        .selectAll("path")
        .data(usData.features)
        .enter()
        .append("path")
        .attr("class", styles.state)
        .attr("d", path)
        .on("click", function(event, d) {
          
          if (active.node() !== this) {
            active = d3.select(this).classed(styles.active, true);
          } else {
            active.classed(styles.active, false);
            active = d3.select(null);
          }
          const bounds = path.bounds(d),
          dx = bounds[1][0] - bounds[0][0],
          dy = bounds[1][1] - bounds[0][1],
          x = (bounds[0][0] + bounds[1][0]) / 2,
          y = (bounds[0][1] + bounds[1][1]) / 2,
          scale = .5 / Math.max(dx / width, dy / height),
          translate = [width / 2 - scale * x, height / 2 - scale * y];
      
          map.select("g").transition()
            .duration(750)
            .style("stroke-width", 1.5 / scale + "px")
            .attr("transform", "translate(" + translate + ")scale(" + scale + ")");

          map.select("g").selectAll("markers").transition()
            .duration(750)
            .attr("transform", (d) => {
              const test = this.getBBox();
              console.log(test)
              return "translate(" + test.x +","+ test.y + ")scale("+1/scale+")"; //inverse the scale of parent
            });
          });

      // let zoom = d3.zoom().scaleExtent([1, 2])
      // .on('zoom', (event) => {
      //   console.log('here!!', event)
      //   map.attr("transform", event.transform);
      // });
      
      // map.call(zoom);


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
          const elem = map.select("g").selectAll("markers").data(parks);

          // add link
          const link = elem
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

          // Add tree polygon shape
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

