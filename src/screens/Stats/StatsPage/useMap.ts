import { useEffect } from "react";
import * as d3 from "d3";
import { geoPath } from "d3-geo";
import { FeatureCollection } from "geojson";
// @ts-ignore
import { geoAlbersUsaTerritories } from "d3-composite-projections";
import * as topojson from "topojson";
import usMapData from "data/us";
import styles from "./index.module.scss";

function useMap(
  width: number,
  height: number,
) {
  useEffect(() => {
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
      const svg = d3.select("#map");

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
        .attr("vector-effect", "non-scaling-stroke")
        .attr("class", styles.state)
        .attr("d", path);
    };

    drawMap();
  }, [height, width]);
}

export default useMap;