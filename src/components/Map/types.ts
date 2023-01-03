import { Park } from "types/park";

export type MapProps = {
  parks: Park[];
  selectedParks?: string[];
  fixedWidth?: number;
  showTree?: boolean;
  styleName?: string;
};
