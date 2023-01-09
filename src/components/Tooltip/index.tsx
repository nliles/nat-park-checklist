import { useState, useEffect } from "react";
import { TooltipProps } from "./types";
import styles from "./index.module.scss";

const NP_ICON = "np.svg";

const Tooltip = ({
  park,
  coords,
  tooltipId,
  setTooltipContent,
}: TooltipProps) => {
  const [imageErr, setImageErr] = useState<boolean>(false);
  const image = park.images?.[0];
  const imageSrc = imageErr ? NP_ICON : image?.url || NP_ICON;
  const statesArr = park.states?.split(",") || [];
  const states = `State${statesArr.length > 1 ? "s" : ""}: ${statesArr.join(
    ", "
  )}`;
  const x = coords?.[0] - 100; // x - half tooltip width to center
  const y = coords?.[1];

  const handleImgError = () => {
    setImageErr(true);
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      setTooltipContent(undefined);
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  });

  return (
    <svg>
      <foreignObject
        className={styles.tooltip}
        x={x}
        y={y}
        xmlns="http://www.w3.org/1999/xhtml"
      >
        <div className={styles.content} role="tooltip" id={tooltipId}>
          <div className={styles.imgContainer}>
            <img src={imageSrc} alt="" onError={handleImgError} />
          </div>
          <div className={styles.text}>
            <h1>{park.fullName}</h1>
            <span>{states}</span>
          </div>
        </div>
      </foreignObject>
    </svg>
  );
};

export default Tooltip;
