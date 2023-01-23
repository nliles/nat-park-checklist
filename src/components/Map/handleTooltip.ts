import React from "react";
import * as d3 from "d3";
import { Park } from "types/park";

// show tooltip when hovering over a region
export const handleMouseOver = function (park: Park) {
  const tooltip = d3.select("#tooltip");

  tooltip.style("opacity", 1)

  tooltip
    .enter()
    .select('h1')
    .text(park.name || '');
};

// hide tooltip as mouse leaves region
export const handleMouseOut = function () {
  d3.select("#tooltip").style("opacity", 0);
};

// get mouse location so tooltip tracks cursor
export const handleMouseMove = function (event: React.MouseEvent) {
  d3.select("#tooltip")
    .style("left", event.pageX + 10 + "px")
    .style("top", event.pageY + 10 + "px");
};
