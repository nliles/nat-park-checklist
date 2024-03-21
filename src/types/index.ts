import ParkDesignation from "enum/ParkDesignation";

export type SelectedParks = {
  [key in ParkDesignation]: string[];
};
