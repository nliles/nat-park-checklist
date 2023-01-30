import React from "react";
import * as d3 from "d3";
import { Park } from "types/park";

const NP_ICON = "np.svg";

// show tooltip when hovering over a region
export const handleMouseOver = (park: Park) => {
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

// hide tooltip
export const hideTooltip = () => {
  d3.select("#tooltip").style("visibility", "hidden");
}

// hide tooltip and remove img as mouse leaves region
export const handleMouseOut = () => {
  hideTooltip();
  d3.select("#tooltip div img").attr("src", null);
};

// get mouse location so tooltip tracks cursor
export const handleMouseMove = (event: React.MouseEvent) => {
  let pos = (
    d3.select("#tooltip")?.node() as HTMLElement
  )?.getBoundingClientRect();
  const width = pos.width;
  d3.select("#tooltip")
    .style("left", `${event.pageX - width / 2}px`)
    .style("top", `${event.pageY + 25}px`);
};
