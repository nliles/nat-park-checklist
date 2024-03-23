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
  const updatedParks =
    selectedItem && PARK_INFO[selectedItem]
      ? PARK_INFO[selectedItem].parkOverrides || []
      : ALL_OVERRIDES;
  parksArr = parksArr.map((park) => {
    const found = updatedParks.find((up) =>
      up.parkCodes.includes(park.parkCode)
    );
    return found
      ? {
          ...park,
          id: found.needsId
            ? kebabCase(`${park.name} ${found.designation}`)
            : park.id,
          designation: found.designation,
          fullName: `${park.name} ${found.designation}`,
        }
      : park;
  });
  return [...parksArr, ...formattedParks];
};

export default formatParks;
