import TreeIcon from "components/Icons/TreeIcon";
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
  tooltipName?: string;
  showTree?: boolean;
  circleSize?: number;
};

const MapMarker = ({
  coords,
  park,
  isSelected,
  handleMouseOver,
  handleMouseLeave,
  number,
  tooltipName,
  showTree,
  circleSize = 2,
}: MapMarkerType) => {
  const x = coords?.[0] - 20; // subtract half the height
  const y = coords?.[1] - 40; // subtract full height
  const fill = isSelected ? "#4b5e26" : "#A8C686";
  const stroke = "#000000";
  const describedBy = tooltipName === park.name ? park.name : "";
  return (
    <>
      {x && y && showTree && (
        <>
          <svg
            aria-describedby={describedBy}
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
          </svg>
        </>
      )}
      {coords && (
        <svg>
          <circle
            className={cn(styles.circle, {
              [styles.isSelected]: isSelected,
              [styles.showTree]: showTree,
            })}
            r={circleSize}
            cx={coords[0]}
            cy={coords[1]}
          />
        </svg>
      )}
    </>
  );
};

export default MapMarker;
