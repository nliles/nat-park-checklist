import { Park } from "../types";
import { PARK_DESIGNATION_KEY, FORMATTED_PARKS } from "../constants";

const SEQUOIA_KINGS_CANYON = "Sequoia & Kings Canyon";
const CHACO_CULTURE = "Chaco Culture";

const formatParks = (parks: Park[], selectedItem: string) => {
  let formattedParks: Park[] = parks.slice();
  const chaco = formattedParks.find((park) => park.name === CHACO_CULTURE);
  if (selectedItem === PARK_DESIGNATION_KEY.NAT_PARK) {
    const sequoia = formattedParks.find(
      (park) => park.name === SEQUOIA_KINGS_CANYON
    );
    formattedParks = formattedParks.filter(
      (park) => park.name !== SEQUOIA_KINGS_CANYON
    );
    if (sequoia) {
      sequoia.fullName = "Sequoia National Park";
      sequoia.images = [sequoia.images[2]];
      formattedParks.push(sequoia);
    }
  }
  if (chaco) {
    chaco.images = [chaco.images[3]];
  }
  if (FORMATTED_PARKS[selectedItem]) {
    formattedParks = [...FORMATTED_PARKS[selectedItem], ...formattedParks];
  }
  return formattedParks;
};

export default formatParks;
