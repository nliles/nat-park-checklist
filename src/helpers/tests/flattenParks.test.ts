import flattenParks from "helpers/flattenParks";

const parks = {
  nationalPark: ["6DA17C86-088E-4B4D-B862-7C1BD5CF236B"],
  nationalHistoricPark: ["2828F5DF-F4E9-48DE-9D4D-2EC39E0276B2"],
  nationalHistoricSite: ["9C680E81-C4DC-46DD-BF33-8189828FF887"],
  nationalMemorial: ["37E34290-2E37-4A67-8C95-7A3442F354B1"],
};

describe("flattenParks", () => {
  it("Returns total parks saved", () => {
    expect(flattenParks(parks)).toEqual([
      "6DA17C86-088E-4B4D-B862-7C1BD5CF236B",
      "2828F5DF-F4E9-48DE-9D4D-2EC39E0276B2",
      "9C680E81-C4DC-46DD-BF33-8189828FF887",
      "37E34290-2E37-4A67-8C95-7A3442F354B1",
    ]);
  });
});
