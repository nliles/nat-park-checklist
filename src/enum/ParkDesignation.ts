export enum ParkDesignation {
  NAT_PARK = "nationalPark",
  NAT_BATTLEFIELD = "nationalBattlefield",
  NAT_BATTLEFIELD_PARK = "nationalBattlefieldPark",
  NAT_BATTLEFIELD_SITE = "nationalBattlefieldSite",
  NAT_MILITARY_PARK = "nationalMilitaryPark",
  NAT_HISTORICAL_PARK = "nationalHistoricalPark",
  NAT_HISTORIC_SITE = "nationalHistoricSite",
  INTERNATIONAL_HISTORIC_SITE = "internationalHistoricSite",
  NAT_LAKESHORE = "nationalLakeshore",
  NAT_MEMORIAL = "nationalMemorial",
  NAT_MONUMENT = "nationalMonument",
  NAT_PARKWAY = "nationalParkway",
  NAT_PRESERVES = "nationalPreserve",
  NAT_RESERVES = "nationalReserve",
  NAT_REC_AREA = "nationalRecreationArea",
  NAT_RIVER = "nationalRiver",
  NAT_WILD_AND_SCENIC_RIVER = "nationalWildAndScenicRiver",
  NAT_SEASHORE = "nationalSeashore",
  NAT_SCENIC_TRAIL = "nationalScenicTrail",
  OTHER_DESIGNATION = "otherDesignation",
}

export type ParkDesignationType =
  typeof ParkDesignation[keyof typeof ParkDesignation];

export default ParkDesignation;
