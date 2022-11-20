import { Park } from "types";
import { PARK_INFO } from "../constants";

const formatParks = (parks: Park[], selectedItem?: string) => {
  let formattedParks: Park[] = parks.slice();
  if (selectedItem) {
    if (PARK_INFO[selectedItem].formattedParks) {
      formattedParks = [
        ...PARK_INFO[selectedItem].formattedParks,
        ...formattedParks,
      ];
    }
  } else {
    const formatted = Object.values(PARK_INFO).map((obj) => obj.formattedParks);
    const parks = Array.prototype.concat.apply([], formatted);
    formattedParks = [...parks, ...formattedParks];
  }
  return formattedParks;
};

export default formatParks;
