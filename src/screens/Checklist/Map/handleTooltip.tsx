import React from "react";
import * as d3 from "d3";
import { Park } from "types/park";

const NP_ICON = "np.svg";

const US_TERR = ["AS", "GU", "PR", "VI"];

// show tooltip when hovering over a region
export const handleMouseOver = (park: Park) => {
  const image = park.images?.[0];
  const imageSrc = image?.url || NP_ICON;
  const statesArr = park.states?.split(",") || [];
  const isTerr = statesArr.some((state) => US_TERR.includes(state));
  const stateText = isTerr
    ? "Territory"
    : `State${statesArr.length > 1 ? "s" : ""}`;
  const states = `${stateText}: ${statesArr.join(", ")}`;
  const designation = `Designation: ${park.designation}`;

  d3.select("#tooltip").style("visibility", "visible");

  d3.select("#tooltip div img")
    .attr("src", imageSrc)
    .attr("alt", image.altText);

  d3.select("#tooltip div h1").text(park.name || "");

  d3.select(".designation").text(designation);

  d3.select(".state").text(states);
};

// hide tooltip
export const hideTooltip = () => {
  d3.select("#tooltip").style("visibility", "hidden");
};

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
  d3.select("#tooltip")
    .style("left", `${event.pageX - pos.width / 2}px`)
    .style("top", `${event.pageY + 25}px`);
};
