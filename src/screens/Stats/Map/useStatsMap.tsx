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

function useStatsMap(
  width: number,
  height: number,
  parks: Park[],
  selectedParks: string[]
) {
  useEffect(() => {
    const colorScale = [
      "#eae3d1",
      "#dce8ce",
      "#d3e2c2",
      "#cadcb6",
      "#c2d7aa",
      "#b9d19e",
      "#a8c686",
      "#818e67",
      "#6e7e51",
      "#5d6e3b",
      "#4b5e26",
    ];
    const color = d3.scaleQuantize([0, 1], colorScale);
    const getStateFill = (d: Feature) => {
      const stateParks = parks.filter((park) =>
      // @ts-ignore
        park.states.includes(STATES_MAP[d.properties?.name])
      );
      const total = stateParks.filter((selected) =>
        selectedParks.includes(selected.id)
      );
      const percentage = (total.length || 0) / (stateParks.length || 0);
      return color(percentage);
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
      const svg = d3.select("#statsMap");

      // Remove previous map before drawing a new one
      svg.select("g").remove();

      // Draw the map
      svg.attr("width", width).attr("height", height + bottomPadding);

      const g = svg.append("g");

		//Initialize legend
		const legendItemHeight = 5;
    const legendItemWidth = 20;
    const legendSpacing = 1;
		const xOffset = 0;
		const yOffset = 0;
    const legend = d3
			.select('#legend')
      .attr('transform',`translate(${width - 260},0)`)
			.append('svg')
            .selectAll()
            .data([0,.1,.2,.3,.4,.5,.6,.7,.8,.9,1]);
			
		//Create legend items
		legend
			.enter()
			.append('rect')
			.attr('width', legendItemWidth)
			.attr('height', legendItemHeight)
			.style('fill', d => color(d))
			.attr('transform',
                (d, i) => {
                    var y = xOffset;
                    var x = yOffset + (legendItemWidth + legendSpacing) * i;
                    return `translate(${x}, ${y})`;
                });				

      g.selectAll("path")
        .data(usData.features)
        .join("path")
        .attr("fill", (d) => getStateFill(d))
        .attr("stroke", "#d8d2bc")
        .attr("stroke-width", "0.7")
        .attr("d", path)
        .enter()
        .append("path")
        .attr("d", path);
    };
    if (parks.length) {
      drawMap();
    }
  }, [height, width, parks, selectedParks]);
}

export default useStatsMap;
