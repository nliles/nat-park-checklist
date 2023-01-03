import { Park } from "types";

export type MapMarkerProps = {
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
