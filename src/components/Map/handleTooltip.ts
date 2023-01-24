import React from "react";
import * as d3 from "d3";
import { Park } from "types/park";

const NP_ICON = "np.svg";

// show tooltip when hovering over a region
export const handleMouseOver = function (park: Park) {
  const image = park.images?.[0];
  const imageSrc = image?.url || NP_ICON;
  const statesArr = park.states?.split(",") || [];
  const states = `State${statesArr.length > 1 ? "s" : ""}: ${statesArr.join(
    ", "
  )}`;

  d3.select("#tooltip").style("visibility", "visible");

  d3.select("#tooltip div img").attr("src", imageSrc);

  d3.select("#tooltip div h1").text(park.name || "");

  d3.select("#tooltip div span").text(states);
};

// hide tooltip as mouse leaves region
export const handleMouseOut = function () {
  d3.select("#tooltip div img").attr("src", "");
  d3.select("#tooltip").style("visibility", "hidden");
};

// get mouse location so tooltip tracks cursor
export const handleMouseMove = function (event: React.MouseEvent) {
  d3.select("#tooltip")
    .style("left", event.pageX + "px")
    .style("top", event.pageY + "px");
};
