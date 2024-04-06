import { useEffect } from "react";
import * as d3 from "d3";
import { geoPath } from "d3-geo";
import { Feature, FeatureCollection } from "geojson";
// @ts-ignore
import { geoAlbersUsaTerritories } from "d3-composite-projections";
import * as topojson from "topojson";
import { STATES_LIST } from "../../../constants";
import usMapData from "data/us";
import { ParkData } from "types/park";
import styles from "./StatsMap.module.scss";
import useContainerWidth from "hooks/useContainerWidth";

type MapProps = {
  parks?: ParkData;
  selectedParks?: string[];
};

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

const StatsMap = ({ parks, selectedParks = [] }: MapProps) => {
  const { containerRef, width, height } = useContainerWidth();
  const formattedSelected = Object.values(selectedParks).flat(1);
  const allParks = Object.values(parks || {}).flat(1);

  useEffect(() => {
    const color = d3.scaleQuantize([0, 1], colorScale);
    const thresholds = color.thresholds();

    const getStatePercentage = (d: Feature) => {
      const stateValue =
        STATES_LIST.find((item) => item.name === d.properties?.name)?.value ||
        "";
      const stateParks = allParks.filter((park) =>
        park.states.includes(stateValue)
      );
      const selectedIds = stateParks.filter((selected) =>
        formattedSelected.includes(selected.id)
      );
      return (selectedIds.length || 0) / (stateParks.length || 0);
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
      const mapContainer = d3.select(containerRef.current);

      // Remove previous map before drawing a new one
      d3.select(".legend").remove();
      d3.select(".map").remove();

      // Legend
      const legendSvg = mapContainer
        .append("svg")
        .attr("class", "legend")
        .attr("width", 260)
        .attr("height", 50);
      // Map
      const map = mapContainer
        .append("svg")
        .attr("class", "map")
        .attr("width", width)
        .attr("height", height + bottomPadding);
      // Tooltip
      const tooltip = d3
        .select("body")
        .append("div")
        .attr("class", styles.tooltip);

      // Draw the map
      const statesGroup = map.append("g");

      //Initialize legend
      const legendWidth = 260;
      const legendHeight = 50;
      const legendItemHeight = 7;
      const legendItemWidth = 20;
      const legendMiddle = legendHeight / 2;
      const legend = legendSvg
        .attr("transform", `translate(${width - legendWidth}, 0)`)
        .append("g")
        .selectAll()
        .data([0, ...thresholds]);

      //Create legend items
      legend
        .enter()
        .append("rect")
        .attr("width", legendItemWidth)
        .attr("height", legendItemHeight)
        .style("fill", (d) => color(d))
        .attr("transform", (d, i) => {
          const x = legendItemWidth * i;
          return `translate(${x}, ${legendMiddle - legendItemHeight})`;
        });

      //Create legend ticks
      const legendTicksGroup = legendSvg
        .append("g")
        .style("font-size", "10px")
        .style("text-anchor", "middle")
        .attr("transform", `translate(${legendHeight}, ${legendMiddle})`);

      // Add legend title
      legendTicksGroup
        .append("text")
        .attr("transform", `translate(18, -${legendItemWidth})`)
        .style("font-weight", "bold")
        .attr("x1", 0)
        .attr("y1", -legendItemWidth)
        .attr("dy", ".35em")
        .text("Parks visited by state (%)");

      const ticks = legendTicksGroup
        .selectAll()
        .data(thresholds)
        .enter()
        .append("g")
        .attr("transform", (d, i) => {
          const tickIndex = i + 1;
          const x = legendItemWidth * tickIndex - legendHeight;
          return `translate(${x}, 0)`;
        });

      ticks
        .append("line")
        .attr("stroke", "black")
        .attr("y2", legendItemHeight)
        .attr("y1", -`${legendItemHeight}`);

      ticks
        .append("text")
        .attr("dy", "1.75em")
        .text((d) => `${d * 100}`);

      // add states
      statesGroup
        .selectAll("path")
        .data(usData.features)
        .join("path")
        .attr("class", styles.state)
        .attr("fill", (d) => color(getStatePercentage(d)) || colorScale[0])
        .attr("d", path)
        .on("mouseover", (event, d) => {
          const percentage = Math.round(getStatePercentage(d) * 100);
          tooltip
            .style("opacity", 1)
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
    if (allParks.length) {
      drawMap();
    }
  }, [height, width, allParks, formattedSelected, containerRef]);

  return <div ref={containerRef} className={styles.mapContainer} />;
};

export default StatsMap;
