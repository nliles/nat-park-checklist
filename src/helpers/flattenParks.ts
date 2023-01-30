import { Parks } from "types";

const flattenParks = (parks: Parks) => {
  const mappedParks = Object.values(parks).map((obj) => obj);
  return Array.prototype.concat.apply([], mappedParks);
};

export default flattenParks;
