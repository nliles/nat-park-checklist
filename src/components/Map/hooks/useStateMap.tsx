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
import styles from "../Map.module.scss";

function useStateMap(
  width: number,
  height: number,
  parks: Park[],
  selectedParks: string[],
  stateMap?: boolean
) {
  useEffect(() => {
    const colorScheme = ["#eae3d1", "#edf3e6", "#e4edda", "#dce8ce", "#d3e2c2", "#cadcb6", "#c2d7aa", "#b9d19e","#b0cb92", "#4b5e26"];
    const color = d3.scaleQuantize([1, 10], colorScheme);

    const getStateFill = (d: Feature) => {
        // @ts-ignore
        const stateParks = parks.filter(park => park.states.includes(STATES_MAP[d.properties?.name]));
        const total = stateParks.filter(selected => selectedParks.includes(selected.id))
        const percentage = (total.length || 0) / (stateParks.length || 0) * 100;
        return color(percentage / 10);
    }

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
        .join("path")
        .attr("fill", d => getStateFill(d))
        .attr("d", path)
        .enter()
        .append("path")
        .attr("vector-effect", "non-scaling-stroke")
        .attr("class", styles.state)
        .attr("d", path);
    };
    if (stateMap && parks.length) {
        drawMap();
    }
  }, [height, width, parks, selectedParks]);
}

export default useStateMap;