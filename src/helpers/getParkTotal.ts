import { Park } from "types/park";
import { ParkDesignationType } from "enum/ParkDesignation";

const getParkTotal = (designation: ParkDesignationType, park: Park[]) => {
  const foundParks = park.filter((park) => park.designation === designation);
  return foundParks.length;
};

export default getParkTotal;
