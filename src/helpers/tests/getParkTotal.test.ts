import getParkTotal from "helpers/getParkTotal";

describe("getParkTotal", () => {
  it.each([
  ['nationalPark', 63],
  ['nationalBattlefield', 11],
  ['nationalBattlefieldPark', 4],
  ['nationalBattlefieldSite', 1],
  ['nationalMilitaryPark',9],
  ['nationalHistoricPark', 62],
  ['nationalHistoricSite', 73],
  ['nationalLakeshore', 3],
  ['nationalMemorial', 31],
  ['nationalMonument', 84],
  ['nationalParkway', 4],
  ['nationalPreserve', 19],
  ['nationalReserve', 2],
  ['nationalRecreationArea', 18],
  ['nationalRiver', 4],
  ['nationalScenicTrail', 3],
  ['nationalSeashore', 10],
  ['nationalWildAndScenicRiver', 10],
  ['internationalHistoricSite', 1],
  ['otherDesignation', 11],
])('renders the correct park designation count', (type, count) => {
  expect(getParkTotal(type)).toEqual(count);
});
});
