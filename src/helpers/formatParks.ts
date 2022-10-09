import { Park } from "../types";
import { PARK_INFO } from "../constants";

const formatParks = (parks: Park[], selectedItem?: string) => {
  if (selectedItem) {
    let formattedParks: Park[] = parks.slice();
    if (PARK_INFO[selectedItem].formattedParks) {
      formattedParks = [
        ...PARK_INFO[selectedItem].formattedParks,
        ...formattedParks,
      ];
    }
    return formattedParks;
  }
  return parks;
};

export default formatParks;
