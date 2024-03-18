import ParkDesignation from "enum/ParkDesignation";

export type Parks = {
  [key in ParkDesignation]: string[];
};
