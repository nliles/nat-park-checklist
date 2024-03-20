import { Park } from "types/park";
import { ParkDesignationType } from "enum/ParkDesignation";
import { PARK_INFO, ALL_FORMATTED } from "../constants";

const formatParks = (parks: Park[], selectedItem?: ParkDesignationType) => {
  let parksArr: Park[] = parks.slice();
  const formattedParks = selectedItem ? PARK_INFO[selectedItem].formattedParks : ALL_FORMATTED
  parksArr = [
    ...parksArr,
    ...formattedParks,
  ];
  return parksArr;
};

export default formatParks;
