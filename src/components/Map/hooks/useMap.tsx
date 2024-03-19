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

const TREE_MARKER_HEIGHT = 45;
const TREE_MARKER_WIDTH = 16.5;

function useMap(
  width: number,
  height: number,
  parks: Park[],
  selectedParks: string[],
  showTree: boolean,
  handleClick?: (id: string, designation: string) => void
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

      const getMarkCoords = ({
        park,
        scale = 1,
      }: {
        park: Park;
        scale?: number;
      }) => {
        const adjustedScale = width < 1000 ? (scale * 0.75) : scale;
        const p = projection([park.longitude, park.latitude]);
        const x = (p?.[0] || 0) - TREE_MARKER_WIDTH * adjustedScale;
        const y = (p?.[1] || 0) - TREE_MARKER_HEIGHT * adjustedScale;
        return `translate(${x}, ${y})scale(${adjustedScale})`;
      };

      const getIsSelected = (id: string) => selectedParks.includes(id);

      const getMarkerFill = (id: string) =>
        getIsSelected(id) ? "#4b5e26" : "#a8c686";

      const getLinkTextFill = (id: string) =>
        getIsSelected(id) ? "white" : "black";
      const path = geoPath().projection(projection);
      const svg = d3.select("#map");
      let linkContainer: any = d3.select(null);
      let active: any = d3.select(null);

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
          .style("fill", (d) => getMarkerFill(d.id));

        // Tree map markers
        if (showTree) {
          // add link container
          linkContainer = g
            .selectAll("markers")
            .data(parks)
            .enter()
            .append("a")
            .attr("class", styles.treeLink)
            .attr("xlink:href", (d) => d.url || "")
            .attr("transform", (park: Park) => getMarkCoords({ park }))
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
            .on("click", (e: Event, d: Park) => {
              e.preventDefault();
              if (handleClick) {
                handleClick(d.id, d.designation);
              }
            });

          // Add tree polygon shape
          treeSvg
            .append("polygon")
            .attr(
              "points",
              "525.46 644.17 270.2 26.19 14.95 644.17 245.46 644.17 245.46 726.19 294.95 726.19 294.95 644.17 525.46 644.17"
            )
            .style("fill", (d: Park) => getMarkerFill(d.id))
            .style("fill-rule", "evenodd")
            .style("stroke", "#231f20")
            .style("stroke-width", "20px")
            .style("stroke-miterlimit", "10")
            .on("mouseover", function () {
              d3.select(this).style("fill", "#4b5e26");
            })
            .on("mouseout", function (e: Event, d: Park) {
              d3.select(this).style("fill", getMarkerFill(d.id));
            });

          // add link text
          linkContainer
            .append("text")
            .text((d: Park, i: number) => `${i + 1}`)
            .attr("class", styles.treeLinkText)
            .style("fill", (d: Park) => getLinkTextFill(d.id))
            .attr("text-anchor", "middle")
            .attr("x", 16.5)
            .attr("y", 30)
            .on("mouseover", function (e: Event, d: Park) {
              e.stopPropagation();
              d3.select(this).style("fill", getLinkTextFill(d.id));
              handleMouseOver(d);
            });
        }
      }

      d.on("click", function (event, d) {
        active.classed(styles.active, false);
        if (active.node() === this) return reset();
        active = d3.select(this).classed(styles.active, true);
        const bounds = path.bounds(d),
          dx = bounds[1][0] - bounds[0][0],
          dy = bounds[1][1] - bounds[0][1],
          x = (bounds[0][0] + bounds[1][0]) / 2,
          y = (bounds[0][1] + bounds[1][1]) / 2,
          scale = 0.8 / Math.max(dx / width, dy / height),
          translate = [width / 2 - scale * x, height / 2 - scale * y];

        g.transition()
          .duration(750)
          .attr("transform", `translate(${translate})scale(${scale})`);

        linkContainer
          .transition()
          .duration(750)
          .attr("transform", (park: Park) =>
            getMarkCoords({ park, scale: 1 / scale })
          );
      });

      function handleZoom(e: any) {
        g.attr("transform", e.transform)
      }

      const zoom = d3.zoom()
      
      zoom.on("zoom", handleZoom)

      zoom.scaleExtent([1, 2]).translateExtent([[0, 0], [width, height]]);

      // (svg as any).call(zoom)

      const reset = () => {
        active = d3.select(null);
        svg.select("g").transition().duration(750).attr("transform", "");
        linkContainer
          .transition()
          .duration(750)
          .attr("transform", (park: Park) => getMarkCoords({ park }));
      };
    };

    if (parks.length > 0) {
      drawMap();
    }
  }, [parks, height, width, showTree, handleClick, selectedParks]);
}

export default useMap;
