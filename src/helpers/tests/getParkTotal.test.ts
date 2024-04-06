import getParkTotal from "helpers/getParkTotal";
import ParkDesignation from "enum/ParkDesignation";

describe("getParkTotal", () => {
  it.each([
    [
      ParkDesignation.INTERNATIONAL_HISTORIC_SITE,
      [
        {
          id: "123",
          name: "Nat park",
          fullName: "National Park",
          parkCode: "NP",
          latitude: "-14.22865935",
          longitude: "-169.8503777",
          states: "CA",
          url: "test",
          images: [],
          designation: "National Park",
        },
      ],
    ],
  ])("renders the correct park designation count", (type, parks) => {
    expect(getParkTotal(type, parks)).toEqual(parks.length);
  });
});
