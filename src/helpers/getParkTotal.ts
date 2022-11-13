import { PARK_INFO } from "../constants";

const getParkTotal = (park: string) => {
  const parkCodes = PARK_INFO[park]
  return (parkCodes.codes.length || 0) + (parkCodes.formattedParks.length || 0)
};

export default getParkTotal;
