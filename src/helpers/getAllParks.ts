import { Parks } from "types";

const getAllParks = (parks: Parks) => {
  const mappedParks = Object.values(parks).map((obj) => obj);
  return Array.prototype.concat.apply([], mappedParks);
};

export default getAllParks;
