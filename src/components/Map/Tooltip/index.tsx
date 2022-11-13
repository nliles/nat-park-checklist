import { useState, useEffect, Dispatch, SetStateAction } from "react";
import { Park } from "types";
import styles from "./index.module.scss";

type TooltipType = {
  coords: number[];
  park: Park;
  tooltipId: string;
  setTooltipContent: Dispatch<SetStateAction<Park | undefined>>;
};

const Tooltip = ({
  park,
  coords,
  tooltipId,
  setTooltipContent,
}: TooltipType) => {
  const [imageErr, setImageErr] = useState<boolean>(false);
  const image = park.images[0];
  const imageSrc = imageErr ? "np.svg" : image?.url || "np.svg";
  const statesArr = park.states?.split(",");
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
    <foreignObject className={styles.tooltip} x={x} y={y} xmlns="http://www.w3.org/1999/xhtml">
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
