import { PARK_INFO } from "../constants";
import { ParkDesignationType } from "enum/ParkDesignation";

const getParkTotal = (park: ParkDesignationType) => {
  const parkCodes = PARK_INFO[park];
  return (
    (parkCodes.codes.length || 0) + (parkCodes.formattedParks?.length || 0)
  );
};

export default getParkTotal;
