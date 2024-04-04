import { Park } from "types/park";
import { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import * as d3 from "d3";
import { geoPath } from "d3-geo";
import { Feature, FeatureCollection } from "geojson";
// @ts-ignore
import { geoAlbersUsaTerritories } from "d3-composite-projections";
import * as topojson from "topojson";
import usMapData from "data/us";
import getParkDesignation from "helpers/getParkDesignation";
import {
  handleMouseOver,
  handleMouseOut,
  handleMouseMove,
} from "screens/Checklist/Map/handleTooltip";
import useContainerWidth from "hooks/useContainerWidth";
import useTooltip from "screens/Checklist/Map/useTooltip";
import styles from "./Map.module.scss";

type MapProps = {
  parks: Park[];
};

const TREE_MARKER_HEIGHT = 45;
const TREE_MARKER_WIDTH = 16.5;

const Map = ({ parks = [] }: MapProps) => {
  const { containerRef, width, height } = useContainerWidth();
  const { watch, setValue } = useFormContext();
  const formData = watch("parkData");
  const selectedParks = Object.values(formData).flat(1);
  useTooltip();

  useEffect(() => {
    const handleClick = (id: string, parkCode: string, designation: string) => {
      const formattedName = getParkDesignation(designation, parkCode);
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

      const getMarkCoords = ({
        park,
        scale = 1,
      }: {
        park: Park;
        scale?: number;
      }) => {
        const adjustedScale = width < 1000 ? scale * 0.75 : scale;
        const p = projection([park.longitude, park.latitude]);
        const x = (p?.[0] || 0) - TREE_MARKER_WIDTH * adjustedScale;
        const y = (p?.[1] || 0) - TREE_MARKER_HEIGHT * adjustedScale;
        return `translate(${x}, ${y})scale(${adjustedScale})`;
      };

      // Remove previous map before drawing a new one
      d3.select(".map").remove();

      // Add map
      const map = d3
        .select(containerRef.current)
        .append("svg")
        .attr("class", "map")
        .attr("width", width)
        .attr("height", height + bottomPadding);

      let linkContainer: any = d3.select(null);
      let active: any = d3.select(null);

      // Draw the map
      const g = map.append("g");

      const d = g
        .selectAll("path")
        .data(usData.features)
        .enter()
        .append("path")
        .attr("class", styles.state)
        .attr("d", path);

      // Draw Map Markers
      if (parks.length > 0) {
        // add circles
        g.selectAll("circles")
          .data(parks)
          .enter()
          .append("circle")
          .attr("class", styles.mobileCircle)
          .classed(styles.active, (d: Park) => selectedParks.includes(d.id))
          .attr("cx", (d) => projection([d.longitude, d.latitude])?.[0])
          .attr("cy", (d) => projection([d.longitude, d.latitude])?.[1])
          .attr("r", 2);

        // Tree map markers
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
            d3.select(this).selectAll("text").classed(styles.hoverTree, true);
            handleMouseOver(d);
          })
          .on("mousemove", handleMouseMove)
          .on("mouseout", function (e, d) {
            d3.select(this).selectAll("text").classed(styles.hoverTree, false);
            handleMouseOut();
          });

        // add tree svg container
        const treeSvg = linkContainer
          .append("svg")
          .attr("width", 33)
          .attr("height", 45)
          .attr("viewBox", "0 0 540.41 736.19")
          .on("click", function (e: Event, d: Park) {
            e.preventDefault();
            /* If the map is zoomed in and a state is selected,
            the state update causes the map to re-render and the zooms
            the user out. Toggling the color in this component and 
            excluding selectedParks from the dependencies for now */
            const tree = d3.select(this).selectAll("polygon");
            const treeLink = d3.select(this.parentNode).selectAll("text");
            const isActive = tree.classed(styles.activeTree);
            // // toggle class
            tree.classed(styles.activeTree, !isActive);
            treeLink.classed(styles.activeTree, !isActive);
            // save park state
            handleClick?.(d.id, d.parkCode, d.designation);
          });

        // Add tree polygon shape
        treeSvg
          .append("polygon")
          .attr(
            "points",
            "525.46 644.17 270.2 26.19 14.95 644.17 245.46 644.17 245.46 726.19 294.95 726.19 294.95 644.17 525.46 644.17"
          )
          .attr("class", styles.tree)
          .classed(styles.activeTree, (d: Park) => selectedParks.includes(d.id))
          .on("mouseover", function () {
            d3.select(this).classed(styles.hoverTree, true);
          })
          .on("mouseout", function (e: Event, d: Park) {
            d3.select(this).classed(styles.hoverTree, false);
          });

        // add link text
        linkContainer
          .append("text")
          .text((d: Park, i: number) => `${i + 1}`)
          .attr("class", styles.treeLinkText)
          .classed(styles.activeTree, (d: Park) => selectedParks.includes(d.id))
          .attr("x", TREE_MARKER_WIDTH)
          .attr("y", 30)
          .on("mouseover", (e: Event, d: Park) => {
            e.stopPropagation();
            handleMouseOver(d);
          });
      }

      d.on("click", handleStateZoom);
      d.on("mouseover", ({ currentTarget }) => {
        d3.select(currentTarget).classed(styles.hover, true);
      }).on("mouseout", ({ currentTarget }) => {
        d3.select(currentTarget).classed(styles.hover, false);
      });

      function handleStateZoom(event: Event, d: Feature) {
        event.stopPropagation();
        active.classed(styles.active, false);
        if (active.node() === this) return reset();
        active = d3.select(this).classed(styles.active, true);
        const bounds = path.bounds(d),
          dx = bounds[1][0] - bounds[0][0],
          dy = bounds[1][1] - bounds[0][1],
          x = (bounds[0][0] + bounds[1][0]) / 2,
          y = (bounds[0][1] + bounds[1][1]) / 2,
          scale = 0.9 / Math.max(dx / width, dy / height),
          translate = [width / 2 - scale * x, height / 2 - scale * y];

        g.transition()
          .duration(750)
          .attr("transform", `translate(${translate})scale(${scale})`);

        // g.transition().duration(750).call(
        //   zoom.transform,
        //   d3.zoomIdentity
        //     .translate(width / 2 - scale * x, height / 2 - scale * y)
        //     .scale(scale)
        // );

        linkContainer
          .transition()
          .duration(750)
          .attr("transform", (park: Park) =>
            getMarkCoords({ park, scale: 1 / scale })
          );
      }

      function handleZoom(e: any) {
        d.attr("transform", e.transform);
      }

      const zoom = d3.zoom();

      zoom.on("zoom", handleZoom);

      zoom.scaleExtent([1, 1]);

      // (svg as any).call(zoom)

      function reset() {
        active = d3.select(null);
        map.select("g").transition().duration(750).attr("transform", "");

        // g.transition().duration(750).call(
        //   zoom.transform,
        //   d3.zoomIdentity
        // );
        
        linkContainer
          .transition()
          .duration(750)
          .attr("transform", (park: Park) => getMarkCoords({ park }));
      }
    };

    drawMap();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [parks, height, width, setValue, formData]);

  return <div ref={containerRef} className={styles.mapContainer} />;
};

export default Map;
