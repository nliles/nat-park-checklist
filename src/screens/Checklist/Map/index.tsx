import { useEffect, useRef } from "react";
import { Park } from "types/park";
import * as d3 from "d3";
import { geoPath } from "d3-geo";
import { Feature, FeatureCollection } from "geojson";
// @ts-ignore
import { geoAlbersUsaTerritories } from "d3-composite-projections";
import * as topojson from "topojson";
import { useFormContext } from "react-hook-form";
import MapButtons from "./MapButtons";
import useContainerWidth from "hooks/useContainerWidth";
import useTooltip from "screens/Checklist/Map/useTooltip";
import usMapData from "data/us";
import camelCase from "lodash/camelCase";
import {
  handleMouseOver,
  handleMouseOut,
  handleMouseMove,
} from "screens/Checklist/Map/handleTooltip";
import styles from "./Map.module.scss";
import { STATES_LIST } from "../../../constants";

const TREE_MARKER_HEIGHT = 45;
const TREE_MARKER_WIDTH = 33;

// Map data
const US_DATA = topojson.feature(
  usMapData,
  usMapData.objects.states
) as FeatureCollection;

const Map = ({ parks = [] }: { parks: Park[] }) => {
  const mapRef = useRef(null);
  const { containerRef, width, height } = useContainerWidth();
  // Tree marker tooltip
  useTooltip();
  // Selected park data
  const { watch, setValue } = useFormContext();

  // Map padding
  const bottomPadding = width > 540 ? 60 : 20;
  const scaleRef = useRef({
    scale: 1,
  });

  // ADD MAP
  useEffect(() => {
    const mapProjection = geoAlbersUsaTerritories().fitExtent(
      [
        [0, bottomPadding],
        [width, height],
      ],
      US_DATA
    );
    const path = geoPath().projection(mapProjection);
    let active: d3.Selection<any, {}, any, any> = d3.select(null);
    const zoom: any = d3
      .zoom<SVGSVGElement, unknown>()
      .scaleExtent([1, 600])
      .on("zoom", handleZoom);

    function handleStateZoom(event: Event, d: Feature) {
      event.preventDefault();
      active.classed(styles.active, false);
      if (active.node() === this) return resetZoom();
      active = d3.select<SVGElement, {}>(this).classed(styles.active, true);
      const bounds = path.bounds(d),
        dx = bounds[1][0] - bounds[0][0],
        dy = bounds[1][1] - bounds[0][1],
        x = (bounds[0][0] + bounds[1][0]) / 2,
        y = (bounds[0][1] + bounds[1][1]) / 2,
        scale = 0.9 / Math.max(dx / width, dy / height),
        translate = [width / 2 - scale * x, height / 2 - scale * y];

      scaleRef.current.scale = 1 / scale;

      d3.select(mapRef.current)
        .transition()
        .duration(750)
        .call(
          zoom.transform,
          d3.zoomIdentity.translate(translate[0], translate[1]).scale(scale)
        );

      d3.select(".map g")
        .selectAll<SVGSVGElement, any>(`.${styles.treeContainer}`)
        .transition()
        .duration(750)
        .attr("transform", (park: Park) =>
          getMarkerCoords({ park, scale: scaleRef.current.scale })
        );
    }

    function handleZoom(d3Event: d3.D3ZoomEvent<SVGSVGElement, unknown>) {
      scaleRef.current.scale = 1 / d3Event.transform.k;
      d3.select(".map g").attr("transform", (d3Event as any).transform);
      d3.select(".map g")
        .selectAll<SVGSVGElement, any>(`.${styles.treeContainer}`)
        .attr("transform", (park: Park) =>
          getMarkerCoords({ park, scale: scaleRef.current.scale })
        );
    }

    function resetZoom() {
      active.classed(styles.active, false);
      active = d3.select(null);
      scaleRef.current.scale = 1;

      d3.select(mapRef.current)
        .transition()
        .duration(750)
        .call(zoom.transform, d3.zoomIdentity);

      d3.select(".map g")
        .selectAll<SVGSVGElement, any>(`.${styles.treeContainer}`)
        .attr("transform", (park: Park) => getMarkerCoords({ park }));
    }

    const getMarkerCoords = ({
      park,
      scale = 1,
    }: {
      park: Park;
      scale?: number;
    }) => {
      const adjustedScale = scaleRef.current.scale;
      const p = mapProjection([park.longitude, park.latitude]);
      const x = (p?.[0] || 0) - (TREE_MARKER_WIDTH / 2) * adjustedScale;
      const y = (p?.[1] || 0) - TREE_MARKER_HEIGHT * adjustedScale;
      return `translate(${x}, ${y})scale(${adjustedScale})`;
    };

    const drawMap = () => {
      // add click functionality to map zoom/reset buttons
      d3.select("#home").on("click", resetZoom);
      d3.select("#plus").on("click", function () {
        zoom.scaleBy(map.transition().duration(750), 2);
      });
      d3.select("#minus").on("click", function () {
        zoom.scaleBy(map.transition().duration(750), 0.5);
      });

      // Add map
      const map = d3
        .select(mapRef.current)
        .attr("class", "map")
        .attr("width", width)
        .attr("height", height + bottomPadding)
        .call(zoom);

      const g = map.append("g");

      g.selectAll("path")
        .data(US_DATA.features)
        .join("path")
        .attr("class", styles.state)
        .attr("d", path)
        .on("click", handleStateZoom)
        .on("mouseover", ({ currentTarget }) => {
          d3.select(currentTarget).classed(styles.hover, true);
        })
        .on("mouseout", ({ currentTarget }) => {
          d3.select(currentTarget).classed(styles.hover, false);
        });

        g.selectAll("text")
        .data(US_DATA.features)
        .enter()
        .append("svg:text")
        .attr("class", styles.copy)
        .text(function(d){
          const abbreviation = STATES_LIST.find((state) => state.name === d?.properties?.name)
            return abbreviation?.value || '';
        })
        .attr("x", function(d){
          return path.centroid(d)[0];
        })
        .attr("y", function(d){
            return  path.centroid(d)[1];
        })
        .attr("text-anchor","middle")
        .attr('font-size','6pt');
    };

    if (width && height) {
      resetZoom();
      drawMap();
    }

    return () => {
      d3.select(".map g").remove();
    };
  }, [width, height, bottomPadding]);

  // ADD MAP MARKERS
  useEffect(() => {
    const formData = watch("parkData");
    const selectedParks = Object.values(formData).flat(1) as string[];
    // Map data
    const projection = geoAlbersUsaTerritories().fitExtent(
      [
        [0, bottomPadding],
        [width, height],
      ],
      US_DATA
    );

    // Select/deselect park
    const handleClick = (id: string, name: string, designation: string) => {
      const formattedDesignation = camelCase(designation);
      let designationArray = formData[formattedDesignation];
      if (designationArray.includes(id)) {
        const idIndex = designationArray.indexOf(id);
        designationArray.splice(idIndex, 1);
      } else {
        designationArray.push(id);
      }
      setValue(`parkData.${formattedDesignation}`, designationArray, {
        shouldDirty: true,
      });
    };

    const drawMarkers = () => {
      return d3
        .select(".map g")
        .selectAll("a")
        .data(parks, (d: any) => d.id)
        .join(
          (enter) => {
            const container = enter.append("a");
            container
              .attr("class", styles.treeContainer)
              .classed(styles.selected, (d: Park) =>
                selectedParks.includes(d.id)
              )
              .attr("xlink:href", (d: Park) => d.url || "")
              .attr("transform", (park: Park) => {
                const p = projection([park.longitude, park.latitude]);
                const x = (p?.[0] || 0) - TREE_MARKER_WIDTH / 2;
                const y = (p?.[1] || 0) - TREE_MARKER_HEIGHT;
                return `translate(${x}, ${y})`;
              })
              .on("mouseover", function (e: Event, d: Park) {
                d3.select(this)
                  .selectAll("text")
                  .classed(styles.hoverTree, true);
                handleMouseOver(d);
              })
              .on("mousemove", handleMouseMove)
              .on("mouseout", function (e: Event, d: Park) {
                d3.select(this)
                  .selectAll("text")
                  .classed(styles.hoverTree, false);
                handleMouseOut();
              });

            container
              .append("svg")
              .attr("width", TREE_MARKER_WIDTH)
              .attr("height", TREE_MARKER_HEIGHT)
              .attr("viewBox", "0 0 540.41 736.19")
              .on("click", function (event: Event, d: Park) {
                event.preventDefault();
                event.stopPropagation();
                handleClick(d.id, d.name, d.designation);
              })
              .append("polygon")
              .attr(
                "points",
                "525.46 644.17 270.2 26.19 14.95 644.17 245.46 644.17 245.46 726.19 294.95 726.19 294.95 644.17 525.46 644.17"
              )
              .attr("class", styles.tree)
              .on("mouseover", function () {
                d3.select(this).classed(styles.hoverTree, true);
              })
              .on("mouseout", function (event: Event, d: Park) {
                d3.select(this).classed(styles.hoverTree, false);
              });

            container
              .append("text")
              .text((d: Park, i: number) => `${i + 1}`)
              .attr("class", styles.treeLinkText)
              .attr("x", TREE_MARKER_WIDTH / 2)
              .attr("y", TREE_MARKER_HEIGHT * (2 / 3))
              .on("mouseover", (event: Event, d: Park) => {
                event.stopPropagation();
                handleMouseOver(d);
              });
            return container;
          },
          (update) => {
            update.select("text").text((d: Park, i: number) => `${i + 1}`);
            update.classed(styles.selected, (d: Park) =>
              selectedParks.includes(d.id)
            );
            return update;
          }
        );
    };

    if (width && height) {
      drawMarkers();
    }
  }, [parks, watch, setValue, width, height, bottomPadding]);

  return (
    <div ref={containerRef} className={styles.mapContainer}>
      <MapButtons />
      <svg ref={mapRef} />
    </div>
  );
};

export default Map;
