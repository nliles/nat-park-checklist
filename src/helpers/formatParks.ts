import { Park } from "types/park";
import kebabCase from "lodash/kebabCase";
import { ParkDesignationType } from "enum/ParkDesignation";
import { PARK_INFO, ALL_FORMATTED, ALL_OVERRIDES } from "../constants";

const formatParks = (parks: Park[], selectedItem?: ParkDesignationType) => {
  let parksArr: Park[] = parks.slice();
  const formattedParks =
    selectedItem && PARK_INFO[selectedItem]
      ? PARK_INFO[selectedItem].formattedParks || []
      : ALL_FORMATTED;
  const parkOverrides =
    selectedItem && PARK_INFO[selectedItem]
      ? PARK_INFO[selectedItem].parkOverrides || []
      : ALL_OVERRIDES;
  parksArr = parksArr.map((park) => {
    const found = parkOverrides.filter((up) =>
      up.parkCodes.includes(park.parkCode)
    );
    return found.length
      ? found.map((foundItem) => ({
        ...park,
        id: foundItem.needsId
          ? kebabCase(`${park.name} ${foundItem.designation}`)
          : park.id,
        designation: foundItem.designation,
        fullName: `${park.name} ${foundItem.designation}`,
      }))
      : [park]
  }).reduce( (acc,val) => acc.concat(val), []);
  return [...parksArr, ...formattedParks];
};

export default formatParks;
