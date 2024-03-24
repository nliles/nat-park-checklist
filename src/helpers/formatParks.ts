import { Park } from "types/park";
import kebabCase from "lodash/kebabCase";
import { ALL_FORMATTED, ALL_OVERRIDES } from "../constants";

const formatParks = (parks: Park[]) => {
  let parksArr: Park[] = parks.slice();
  parksArr = parksArr
    .map((park) => {
      const found = ALL_OVERRIDES.filter((up) =>
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
        : [park];
    })
    .reduce((acc, val) => acc.concat(val), []);
  return [...parksArr, ...ALL_FORMATTED];
};

export default formatParks;
