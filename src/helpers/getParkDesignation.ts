import { PARK_INFO, LIST_OPTIONS } from "../constants";
import camelCase from "lodash/camelCase";
import ParkDesignation from "enum/ParkDesignation";

const getParkDesignation = (
  designation: string,
  parkCode: string
): ParkDesignation => {
  const formattedDesignation = camelCase(designation);
  if (LIST_OPTIONS.includes(formattedDesignation as ParkDesignation)) {
    return formattedDesignation as ParkDesignation;
  }
  const found = Object.values(ParkDesignation).find((parkKey) => {
    if (PARK_INFO[parkKey].codes.includes(parkCode)) {
      return parkKey;
    } else {
      return undefined;
    }
  });
  return found || ParkDesignation.OTHER_DESIGNATION;
};

export default getParkDesignation;
