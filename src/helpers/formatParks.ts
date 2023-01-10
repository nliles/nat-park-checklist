import { Park } from "types/park";
import { ParkDesignationType } from "enum/ParkDesignation";
import { PARK_INFO } from "../constants";

const formatParks = (parks: Park[], selectedItem: ParkDesignationType) => {
  let formattedParks: Park[] = parks.slice();
  if (PARK_INFO[selectedItem].formattedParks) {
    formattedParks = [
      ...PARK_INFO[selectedItem].formattedParks,
      ...formattedParks,
    ];
  }
  return formattedParks;
};

export default formatParks;
