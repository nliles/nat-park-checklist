import TreeIcon from "components/Icons/TreeIcon";
import ScreenReaderText from "components/ui/ScreenReaderText";
import { Park } from "types";
import cn from "classnames";
import styles from "./index.module.scss";

type MapMarkerType = {
  coords: number[];
  park: Park;
  isSelected: boolean;
  handleMouseOver: (park: Park) => void;
  handleMouseLeave: () => void;
  number: number;
};

const MapMarker = ({
  coords,
  park,
  isSelected,
  handleMouseOver,
  handleMouseLeave,
  number,
}: MapMarkerType) => {
  const x = coords?.[0] - 20; // subtract half the height
  const y = coords?.[1] - 40; // subtract full height
  const fill = isSelected ? "#4b5e26" : "#A8C686";
  const stroke = "#000000";
  return (
    <>
      <svg
        aria-describedby={park.name}
        x={x}
        y={y}
        className={styles.icon}
        onMouseEnter={() => handleMouseOver(park)}
        onMouseLeave={() => handleMouseLeave()}
      >
        <TreeIcon fill={fill} stroke={stroke} />
        <a
          className={cn(styles.link, {
            [styles.selected]: isSelected,
          })}
          href={park.url}
          target="_blank"
          rel="noreferrer"
        >
          <text x="20" y="25" textAnchor="middle">
            {number}
          </text>
        </a>
        <ScreenReaderText text={`Link to ${park.name} info in new tab`} />
      </svg>
      {coords && (
        <circle className={styles.circle} r="2" cx={coords[0]} cy={coords[1]} />
      )}
    </>
  );
};

export default MapMarker;
