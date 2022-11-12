import sortParks from "helpers/sortParks";

describe("sortParks", () => {
  it("Sorts parks and ignores punctuation", () => {
    const parks = [
      {
        designation: "National Monument",
        fullName: "Chiricahua National Monument",
        id: "E98D419A-A118-49D5-89AF-3C4F9BE7372D",
        images: [],
        latitude: "32.01214618",
        longitude: "-109.341607",
        name: "Chiricahua",
        parkCode: "chir",
        states: "AZ",
        url: "",
      },
      {
        designation: "National Monument",
        fullName: "César E. Chávez National Monument",
        id: "D1EAA1D1-E855-42FF-9D06-8E983413BDE5",
        images: [],
        latitude: "35.22729389",
        longitude: "-118.5615781",
        name: "César E. Chávez",
        states: "CA",
        parkCode: "cech",
        url: "",
      },
    ];
    expect(sortParks(parks)).toEqual([
      {
        designation: "National Monument",
        fullName: "César E. Chávez National Monument",
        id: "D1EAA1D1-E855-42FF-9D06-8E983413BDE5",
        images: [],
        latitude: "35.22729389",
        longitude: "-118.5615781",
        name: "César E. Chávez",
        states: "CA",
        parkCode: "cech",
        url: "",
      },
      {
        designation: "National Monument",
        fullName: "Chiricahua National Monument",
        id: "E98D419A-A118-49D5-89AF-3C4F9BE7372D",
        images: [],
        latitude: "32.01214618",
        longitude: "-109.341607",
        name: "Chiricahua",
        parkCode: "chir",
        states: "AZ",
        url: "",
      },
    ]);
  });
});
