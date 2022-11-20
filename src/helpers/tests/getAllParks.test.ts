import getAllParks from "helpers/getAllParks";

const parks = {
  nationalPark: [
    "6DA17C86-088E-4B4D-B862-7C1BD5CF236B",
    "36240051-018E-4915-B6EA-3F1A7F24FBE4",
    "B170CCF7-7AB9-48FF-950E-31815FD4DBB2",
    "C9056F71-7162-4208-8AE9-2D0AEFA594FD",
  ],
  nationalBattlefield: [],
  nationalBattlefieldPark: [],
  nationalBattlefieldSite: [],
  nationalMilitaryPark: [],
  nationalHistoricPark: [
    "2828F5DF-F4E9-48DE-9D4D-2EC39E0276B2",
    "09689FA5-2147-4BF2-935C-AE92AB85A2E5",
  ],
  nationalHistoricSite: ["9C680E81-C4DC-46DD-BF33-8189828FF887"],
  nationalLakeshore: [],
  nationalMemorial: [
    "37E34290-2E37-4A67-8C95-7A3442F354B1",
  ],
  nationalMonument: [],
  nationalParkway: [],
  nationalPreserve: [],
  nationalReserve: [],
  nationalRecreationArea: [],
  nationalRiver: [],
  nationalScenicTrail: [],
  nationalSeashore: [
    "307BE169-345D-472C-8128-20F1D59864A7",
  ],
  nationalWildAndScenicRiver: [],
  internationalHistoricSite: [],
  otherDesignation: [
    "C59FE971-54EE-447C-9DCE-CB781949B0B8",
    "1E521374-B73C-41CD-B524-89E4AC6495F5",
  ],
};

describe("getAllParks", () => {
  it("Returns total parks saved", () => {
    expect(getAllParks(parks)).toEqual(11);
  });
});
