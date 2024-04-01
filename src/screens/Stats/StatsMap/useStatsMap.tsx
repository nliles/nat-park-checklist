import { useEffect } from "react";
import * as d3 from "d3";
import { geoPath } from "d3-geo";
import { Feature, FeatureCollection } from "geojson";
import { Park } from "types/park";
// @ts-ignore
import { geoAlbersUsaTerritories } from "d3-composite-projections";
import * as topojson from "topojson";
import { STATES_MAP } from "../../../constants";
import usMapData from "data/us";
import styles from "./StatsMap.module.scss";

function useStatsMap(
  width: number,
  height: number,
  parks: Park[],
  selectedParks: string[]
) {
  useEffect(() => {
    const colorScale = [
      "#eae3d1",
      "#e9f0e0",
      "#cadcb6",
      "#b7bea8",
      "#a5ae92",
      "#939e7c",
      "#818e67",
      "#6e7e51",
      "#5d6e3b",
      "#4b5e26",
    ];
    const color = d3.scaleQuantize([0, 1], colorScale);

    const getStatePercentage = (d: Feature) => {
      const stateValue = STATES_MAP.find(
        (item) => item.name === d.properties?.name
      );
      const stateParks = parks.filter((park) =>
        // @ts-ignore
        park.states.includes(stateValue.value)
      );
      const total = stateParks.filter((selected) =>
        selectedParks.includes(selected.id)
      );
      return (total.length || 0) / (stateParks.length || 0);
    };

    const drawMap = () => {
      // Map data
      const usData = topojson.feature(
        usMapData,
        usMapData.objects.states
      ) as FeatureCollection;
      const widthTabletDesktop = width >= 768;
      // Map padding
      const bottomPadding = widthTabletDesktop ? 60 : 0;

      const projection = geoAlbersUsaTerritories().fitExtent(
        [
          [0, bottomPadding],
          [width, height],
        ],
        usData
      );

      const path = geoPath().projection(projection);
      const mapContainer = d3.select("#mapContainer");
      const map = d3.select("#statsMap");
      const legendSvg = d3.select("#legend");
      const tooltip = d3.select("#tooltip");
      // Tooltip
      tooltip.attr("class", styles.tooltip);

      // Remove previous map before drawing a new one
      mapContainer.selectAll("g > *").remove();

      // Draw the map
      map.attr("width", width).attr("height", height + bottomPadding);
      const statesGroup = map.append("g");

      //Initialize legend
      const legendItemHeight = 7;
      const legendItemWidth = 20;
      const legend = legendSvg
        .attr("transform", `translate(${width - 260},0)`)
        .append("g")
        .selectAll()
        .data([0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9]);

      //Create legend items
      legend
        .enter()
        .append("rect")
        .attr("width", legendItemWidth)
        .attr("height", legendItemHeight)
        .style("fill", (d) => color(d))
        .attr("transform", (d, i) => {
          const x = legendItemWidth * i;
          return `translate(${x}, 18)`;
        });

      //Create legend ticks
      const legendTicksGroup = d3
        .select("#legend")
        .append("g")
        .attr("class", "tickGroup")
        .style("font-size", "10px")
        .style("text-anchor", "middle")
        .attr("transform", `translate(50, 28)`);

      // Add legend title
      legendTicksGroup
        .append("text")
        .attr("transform", `translate(0, -20)`)
        .style("font-weight", "bold")
        .attr("x1", 0)
        .attr("y1", -20)
        .attr("dy", ".35em")
        .text("Parks visited (%)");

      legendTicksGroup
        .selectAll()
        .data([1, 2, 3, 4, 5, 6, 7, 8, 9])
        .enter()
        .append("g")
        .attr("class", "tick")
        .attr("transform", (d, i) => {
          const tickIndex = i + 1;
          const x = -50 + legendItemWidth * tickIndex;
          return `translate(${x}, -3)`;
        });

      d3.selectAll(".tick")
        .append("line")
        .attr("stroke", "black")
        .attr("y2", 6)
        .attr("y1", -`${legendItemHeight}`);

      d3.selectAll(".tick")
        .append("text")
        .attr("dy", "1.75em")
        .text((d) => `${d}0`);

      // add states
      statesGroup
        .selectAll("path")
        .data(usData.features)
        .join("path")
        .attr("fill", (d) => color(getStatePercentage(d)))
        .attr("stroke", "white")
        .attr("stroke-width", "1")
        .attr("d", path)
        .on("mouseover", (event, d) => {
          const percentage = Math.round(getStatePercentage(d) * 100);
          tooltip
            .style("opacity", 1)
            .style("font-size", "12px")
            .text(`${d.properties?.name}: ${percentage}%`);
        })
        .on("mousemove", (event, d) => {
          tooltip
            .style("left", `${event.pageX + 10}px`)
            .style("top", `${event.pageY + 10}px`);
        })
        .on("mouseout", () => {
          tooltip.style("opacity", 0);
        });
    };
    if (parks.length) {
      drawMap();
    }
  }, [height, width, parks, selectedParks]);
}

export default useStatsMap;
