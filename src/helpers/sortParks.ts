import { Park } from "types/park";

const sortParks = (parks: Park[]) => {
  return parks.sort((a, b) =>
    a.fullName.localeCompare(b.fullName, "fr", { ignorePunctuation: true })
  );
};

export default sortParks;
