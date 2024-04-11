import ParkDesignation from "enum/ParkDesignation";
import { ParkData } from "types/park";
import { Park } from "types/park";

const filterParks = (
  parks?: ParkData,
  selectedDesignation?: ParkDesignation,
  selectedState?: string
) => {
  let filteredParks = selectedDesignation
    ? parks?.[selectedDesignation]
    : Object.values(parks || {})
        .flat(1)
        .sort((a, b) => a.fullName.localeCompare(b.fullName));
  return filteredParks?.filter((park: Park) =>
    selectedState ? park.states.includes(selectedState) : park
  );
};

export default filterParks;
