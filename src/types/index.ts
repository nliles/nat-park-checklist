import { ParkDesignation } from "../constants";

export type Parks = {
  [index: string]: string[];
};

export type ParkDesignationType = typeof ParkDesignation[keyof typeof ParkDesignation];
