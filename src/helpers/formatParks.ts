import { Park } from "types/park";
import { ParkDesignationType } from "enum/ParkDesignation";
import { type ParkOverride, PARK_INFO, ALL_FORMATTED, ALL_UPDATED } from "../constants";

const formatParks = (parks: Park[], selectedItem?: ParkDesignationType) => {
  let parksArr: Park[] = parks.slice();
  const formattedParks = selectedItem ? PARK_INFO[selectedItem].formattedParks : ALL_FORMATTED;
  const updatedParks: ParkOverride[] = selectedItem ? PARK_INFO[selectedItem].parkOverrides : ALL_UPDATED;
  parksArr = parksArr.map(park => {
    const found = updatedParks.find(up => up.parkCodes.includes(park.parkCode));
    return found ? { ...park, designation: found.designation, fullName: `${park.name} ${found.designation}`} : park;
  });
  parksArr = [
    ...parksArr,
    ...formattedParks,
  ];
  return parksArr;
};

export default formatParks;
