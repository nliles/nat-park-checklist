import getParkTotal from "helpers/getParkTotal";
import ParkDesignation from "enum/ParkDesignation";

describe("getParkTotal", () => {
  it.each([
    [ParkDesignation.NAT_PARK, 63],
    [ParkDesignation.NAT_BATTLEFIELD, 11],
    [ParkDesignation.NAT_BATTLEFIELD_PARK, 4],
    [ParkDesignation.NAT_BATTLEFIELD_SITE, 1],
    [ParkDesignation.NAT_MILITARY_PARK, 9],
    [ParkDesignation.NAT_HISTORICAL_PARK, 62],
    [ParkDesignation.NAT_HISTORIC_SITE, 73],
    [ParkDesignation.NAT_LAKESHORE, 3],
    [ParkDesignation.NAT_MEMORIAL, 31],
    [ParkDesignation.NAT_MONUMENT, 84],
    [ParkDesignation.NAT_PARKWAY, 4],
    [ParkDesignation.NAT_PRESERVES, 19],
    [ParkDesignation.NAT_RESERVES, 2],
    [ParkDesignation.NAT_REC_AREA, 18],
    [ParkDesignation.NAT_RIVER, 4],
    [ParkDesignation.NAT_SCENIC_TRAIL, 3],
    [ParkDesignation.NAT_SEASHORE, 10],
    [ParkDesignation.NAT_WILD_AND_SCENIC_RIVER, 10],
    [ParkDesignation.INTERNATIONAL_HISTORIC_SITE, 1],
    [ParkDesignation.OTHER_DESIGNATION, 11],
  ])("renders the correct park designation count", (type, count) => {
    expect(getParkTotal(type)).toEqual(count);
  });
});
