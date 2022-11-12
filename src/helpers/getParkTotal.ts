import { PARK_INFO } from "../constants";

const getParkTotal = (park: string) => {
  return [...Object.values(PARK_INFO[park])].reduce(
    (acc, element) => acc + element.length,
    0
  );
};

export default getParkTotal;
