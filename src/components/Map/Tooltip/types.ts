import { Dispatch, SetStateAction } from "react";
import { Park } from "types";

export type TooltipProps = {
  coords: number[];
  park: Park;
  tooltipId: string;
  setTooltipContent: Dispatch<SetStateAction<Park | undefined>>;
};
