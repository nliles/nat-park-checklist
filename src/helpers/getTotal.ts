import { PARK_INFO } from "../constants";
import { Parks } from "types";

const getTotal = (park: Parks) => {
  return [...Object.values(park)].reduce(
    (acc, element) => acc + (element?.length || 0),
    0
  );
};

export default getTotal;
