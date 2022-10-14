import { PARK_INFO } from "../constants";

const getTotal = (park: string) => {
  return [...Object.values(PARK_INFO[park])].reduce(
    (acc, element) => acc + element.length,
    0
  );
};

export default getTotal
