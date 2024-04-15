import { Park } from "types/park";
import { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import * as d3 from "d3";
import { geoPath } from "d3-geo";
import { Feature, FeatureCollection } from "geojson";
// @ts-ignore
import { geoAlbersUsaTerritories } from "d3-composite-projections";
import * as topojson from "topojson";
import isEqual from "lodash/isEqual";
import usMapData from "data/us";
import camelCase from "lodash/camelCase";
import usePrevious from "./usePrevious";
import {
  handleMouseOver,
  handleMouseOut,
  handleMouseMove,
} from "screens/Checklist/Map/handleTooltip";
import styles from "../Map.module.scss";

const TREE_MARKER_HEIGHT = 45;
const TREE_MARKER_WIDTH = 16.5;

function useMap({
  width,
  height,
  parks,
}: {
  width: number;
  height: number;
  parks: Park[];
}) {
  // Selected park data
  const { watch, setValue } = useFormContext();
  const formData = watch("parkData");

  useEffect(() => {
    // Map data
    const usData = topojson.feature(
      usMapData,
      usMapData.objects.states
    ) as FeatureCollection;
    // Map padding
    const bottomPadding = width > 540 ? 60 : 20;

    const projection = geoAlbersUsaTerritories().fitExtent(
      [
        [0, bottomPadding],
        [width, height],
      ],
      usData
    );

    const path = geoPath().projection(projection);
    let active: d3.Selection<any, {}, any, any> = d3.select(null);
    const zoom: any = d3
      .zoom<SVGSVGElement, unknown>()
      .scaleExtent([1, 600])
      .on("zoom", handleZoom);

    function getMarkCoords({
      park,
      scale = 1,
    }: {
      park: Park;
      scale?: number;
    }) {
      const adjustedScale = width < 1024 ? scale * (width / 1000) : scale;
      const p = projection([park.longitude, park.latitude]);
      const x = (p?.[0] || 0) - TREE_MARKER_WIDTH * adjustedScale;
      const y = (p?.[1] || 0) - TREE_MARKER_HEIGHT * adjustedScale;
      return `translate(${x}, ${y})scale(${adjustedScale})`;
    }

    function handleClick(id: string, designation: string) {
      const formattedName = camelCase(designation);
      let designationArray = formData[formattedName].slice();
      if (designationArray.includes(id)) {
        designationArray = designationArray.filter(
          (parkId: string) => parkId !== id
        );
      } else {
        designationArray.push(id);
      }
      setValue(`parkData.${formattedName}`, designationArray, {
        shouldDirty: true,
      });
    }

    function handleStateZoom(event: Event, d: Feature) {
      event.stopPropagation();
      active.classed(styles.active, false);
      if (active.node() === this) return reset();
      active = d3.select<SVGElement, {}>(this).classed(styles.active, true);
      const bounds = path.bounds(d),
        dx = bounds[1][0] - bounds[0][0],
        dy = bounds[1][1] - bounds[0][1],
        x = (bounds[0][0] + bounds[1][0]) / 2,
        y = (bounds[0][1] + bounds[1][1]) / 2,
        scale = 0.9 / Math.max(dx / width, dy / height),
        translate = [width / 2 - scale * x, height / 2 - scale * y];

      d3.select(".map")
        .transition()
        .duration(750)
        .call(
          zoom.transform,
          d3.zoomIdentity.translate(translate[0], translate[1]).scale(scale)
        );

      d3.select(".map g")
        .selectAll<SVGSVGElement, any>("a")
        .transition()
        .duration(750)
        .attr("transform", (park: Park) =>
          getMarkCoords({ park, scale: 1 / scale })
        );
    }

    function handleZoom(event: any) {
      d3.select(".map g").attr("transform", event.transform);
      d3.select(".map g")
        .selectAll<SVGSVGElement, any>("a")
        .attr("transform", (park: Park) =>
          getMarkCoords({ park, scale: 1 / event.transform.k })
        );
    }

    function reset() {
      active.classed(styles.active, false);
      active = d3.select(null);

      d3.select(".map")
        .transition()
        .duration(750)
        .call(zoom.transform, d3.zoomIdentity);

      d3.select(".map g")
        .selectAll<SVGSVGElement, any>("a")
        .attr("transform", (park: Park) => getMarkCoords({ park }));
    }

    const drawMap = () => {
      console.log("draw map");
      // add click functionality to map buttons
      d3.select("#home").on("click", reset);
      d3.select("#plus").on("click", function () {
        zoom.scaleBy(map.transition().duration(750), 2);
      });
      d3.select("#minus").on("click", function () {
        zoom.scaleBy(map.transition().duration(750), 0.5);
      });

      // Add map
      const map = d3
        .select("#mapContainer")
        .append("svg")
        .attr("class", "map")
        .attr("width", width)
        .attr("height", height + bottomPadding)
        .call(zoom);

      // Draw the map
      const g = map.append("g");

      const d = g
        .selectAll("path")
        .data(usData.features)
        .enter()
        .append("path")
        .attr("class", styles.state)
        .attr("d", path);

      d.on("click", handleStateZoom);
      d.on("mouseover", ({ currentTarget }) => {
        d3.select(currentTarget).classed(styles.hover, true);
      }).on("mouseout", ({ currentTarget }) => {
        d3.select(currentTarget).classed(styles.hover, false);
      });

      const treeContainer = d3
        .select(".map g")
        .selectAll("marker")
        .attr("class", "marker")
        .data(parks)
        .enter()
        .append("a")
        .attr("class", styles.treeLink)
        .attr("xlink:href", (d) => d.url || "")
        .attr("transform", (park: Park) => getMarkCoords({ park }))
        .on("mouseover", function (e, d) {
          d3.select(this).selectAll("text").classed(styles.hoverTree, true);
          handleMouseOver(d);
        })
        .on("mousemove", handleMouseMove)
        .on("mouseout", function (e, d) {
          d3.select(this).selectAll("text").classed(styles.hoverTree, false);
          handleMouseOut();
        });

      // add tree svg container and polygon shape
      treeContainer
        .append("svg")
        .attr("width", 33)
        .attr("height", 45)
        .attr("viewBox", "0 0 540.41 736.19")
        .on("click", function (event: Event, d: Park) {
          event.preventDefault();
          handleClick?.(d.id, d.designation);
        })
        .append("polygon")
        .attr(
          "points",
          "525.46 644.17 270.2 26.19 14.95 644.17 245.46 644.17 245.46 726.19 294.95 726.19 294.95 644.17 525.46 644.17"
        )
        .attr("class", styles.tree)
        // .classed(styles.activeTree, (d: Park) => selectedParks.includes(d.id))
        .on("mouseover", function () {
          d3.select(this).classed(styles.hoverTree, true);
        })
        .on("mouseout", function (event: Event, d: Park) {
          d3.select(this).classed(styles.hoverTree, false);
        });

      // add link text
      treeContainer
        .append("text")
        .text((d: Park, i: number) => `${i + 1}`)
        .attr("class", styles.treeLinkText)
        // .classed(styles.activeTree, (d: Park) => selectedParks.includes(d.id))
        .attr("x", TREE_MARKER_WIDTH)
        .attr("y", 30)
        .on("mouseover", (event: Event, d: Park) => {
          event.stopPropagation();
          handleMouseOver(d);
        });
    };

    if (width && height) {
      d3.select(".map").remove();
      drawMap();
    }

    //if selected parks have changed => udp
  }, [width, height, parks]);
}

export default useMap;
