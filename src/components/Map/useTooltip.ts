import { useEffect } from "react";
import * as d3 from "d3";
import styles from "./index.module.scss";

function useTooltip() {

  useEffect(() => {
    /// tooltip creation
    const tooltip = d3
      .select("body")
      .append("div")
      .attr("id", "tooltip")
      .style("visibility", "hidden")
      .attr("class", styles.tooltip);

    const imgContainer = tooltip
      .append("div")
      .attr("class", styles.imgContainer);
    const textContainer = tooltip.append("div").attr("class", styles.text);

    textContainer.append("h1");
    textContainer.append("span");

    imgContainer.append("img").attr("width", 30).attr("height", 30);
  }, []);

}

export default useTooltip;
