import { Park } from "../types";
import { PARK_DESIGNATION_KEY, LAKE_CHELAN_NRA, LAKE_ROSS_NRA } from "../constants";

const SEQUOIA_KINGS_CANYON = 'Sequoia & Kings Canyon'

const formatParks = (parks: Park[], selectedItem: string) => {
  let formattedParks = parks.slice()
  if (selectedItem === PARK_DESIGNATION_KEY.NAT_PARK) {
    const sequoia = formattedParks.find(park => park.name === SEQUOIA_KINGS_CANYON)
    formattedParks = formattedParks.filter(park => park.name !== SEQUOIA_KINGS_CANYON);
    let kingsCanyon
    if (sequoia) {
      sequoia.fullName = 'Sequoia National Park'
      kingsCanyon = {...sequoia}
      kingsCanyon.fullName = 'Kings Canyon National Park'
      kingsCanyon.latitude = "36.739991"
      kingsCanyon.longitude = "-118.963389"
      sequoia.images = [sequoia.images[2]]
      formattedParks.push(sequoia)
      formattedParks.push(kingsCanyon)
    }
  } else if (selectedItem === PARK_DESIGNATION_KEY.NAT_REC_AREA) {
    formattedParks.push(LAKE_CHELAN_NRA)
    formattedParks.push(LAKE_ROSS_NRA)
  }

  return formattedParks;
};

export default formatParks;
