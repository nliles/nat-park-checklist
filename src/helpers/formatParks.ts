import { Park } from "../types";
import { PARK_DESIGNATION_KEY, PARK_INFO } from "../constants";

const SEQUOIA_KINGS_CANYON = "Sequoia & Kings Canyon";

const formatParks = (parks: Park[], selectedItem: string) => {
  let formattedParks: Park[] = parks.slice();
  if (selectedItem === PARK_DESIGNATION_KEY.NAT_PARK) {
    formattedParks = formattedParks.filter(
      (park) => park.name !== SEQUOIA_KINGS_CANYON
    );
  }
  if (PARK_INFO[selectedItem].formattedParks) {
    formattedParks = [
      ...PARK_INFO[selectedItem].formattedParks,
      ...formattedParks,
    ];
  }
  return formattedParks;
};

export default formatParks;
