import { useEffect } from "react";
import * as d3 from "d3";
import styles from "./index.module.scss";

function useTooltip() {
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      d3.select("#tooltip").style("visibility", "hidden");
    }
  };

  const handleError = () => {
    d3.select("#tooltip div img").attr("src", "np.svg");
  };

  useEffect(() => {
    /// tooltip creation
    const tooltip = d3
      .select("body")
      .append("div")
      .attr("id", "tooltip")
      .attr("class", styles.tooltip);

    const imgContainer = tooltip
      .append("div")
      .attr("class", styles.imgContainer);
    const textContainer = tooltip.append("div").attr("class", styles.text);

    textContainer.append("h1");
    textContainer.append("span");

    imgContainer.append("img").on("error", handleError);

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);
}

export default useTooltip;