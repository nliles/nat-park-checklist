import { useEffect } from "react";
import * as d3 from "d3";
import cn from "classnames";
import { hideTooltip } from "screens/Checklist/Map/handleTooltip";
import tooltipStyles from "components/Tooltip/Tooltip.module.scss";
import styles from "../Map.module.scss";

function useTooltip() {
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      hideTooltip();
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
      .attr("class", cn(styles.tooltip, tooltipStyles.tooltipBaseStyle));

    const imgContainer = tooltip
      .append("div")
      .attr("class", styles.imgContainer);
    const textContainer = tooltip.append("div").attr("class", styles.imgText);

    textContainer.append("h1");
    textContainer.append("span");

    imgContainer.append("img").on("error", handleError);

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);
}

export default useTooltip;
