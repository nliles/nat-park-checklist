import React from "react";
import TreeIcon from "components/Icons/TreeIcon";
import cn from "classnames";
import { Park } from "types/park";
import styles from "./index.module.scss";

export type MapMarkerProps = {
  coords: number[];
  park: Park;
  isSelected: boolean;
  onMouseOver: () => void;
  onMouseOut: () => void;
  onMouseMove: (e: React.MouseEvent) => void;
  number: number;
  tooltipName?: string;
  showTree?: boolean;
  circleSize?: number;
};

const MapMarker = ({
  coords,
  park,
  isSelected,
  onMouseOver,
  onMouseOut,
  onMouseMove,
  number,
  tooltipName,
  showTree,
  circleSize = 2,
}: MapMarkerProps) => {
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
            onMouseOver={onMouseOver}
            onMouseOut={onMouseOut}
            onMouseMove={onMouseMove}
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
