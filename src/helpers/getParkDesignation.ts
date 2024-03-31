import { PARK_INFO, DESIGNATION_OPTIONS } from "../constants";
import ParkDesignation from "enum/ParkDesignation";

const getParkDesignation = (
  designation: string,
  parkCode: string
): ParkDesignation => {
  const foundDesignation = DESIGNATION_OPTIONS.find(
    (item) => item.name === designation
  );
  if (foundDesignation) {
    return foundDesignation.value as ParkDesignation;
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
