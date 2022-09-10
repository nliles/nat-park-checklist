import { useState } from "react";
import { Park } from "../../../types";
import styles from "../index.module.scss";

type TooltipType = {
  coords: number[];
  park: Park;
};

const Tooltip = ({ park, coords }: TooltipType) => {
  const [imageErr, setImageErr] = useState<boolean>(false);
  const image = park.images[0];
  const statesArr = park.states?.split(",");
  const states = `State${statesArr.length > 1 ? "s" : ""}: ${statesArr.join(
    ", "
  )}`;
  const x = coords?.[0] - 100; // x - half tooltip width to center
  const y = coords?.[1];

  const handleImgError = () => {
    setImageErr(true);
  };

  const imageSrc = imageErr ? "np.svg" : image?.url || "np.svg";
  const altTxt = imageErr
    ? "No image displayed"
    : image?.altText || "No image displayed";

  return (
    <foreignObject className={styles.tooltip} x={x} y={y}>
      <div className={styles.content}>
        <div className={styles.imgContainer}>
          <img src={imageSrc} alt={altTxt} onError={handleImgError} />
        </div>
        <div className={styles.text}>
          <h1>{park.fullName}</h1>
          <span>{states}</span>
        </div>
      </div>
    </foreignObject>
  );
};

export default Tooltip;
