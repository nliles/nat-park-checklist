import { Park } from "types";

export type MapProps = {
  parks: Park[];
  selectedParks?: string[];
  fixedWidth?: number;
  showTree?: boolean;
  styleName?: string;
};
