enum ParkDesignation {
  NAT_PARK = "nationalPark",
  NAT_BATTLEFIELD = "nationalBattlefield",
  NAT_BATTLEFIELD_PARK = "nationalBattlefieldPark",
  NAT_BATTLEFIELD_SITE = "nationalBattlefieldSite",
  NAT_MILITARY_PARK = "nationalMilitaryPark",
  NAT_HISTORIC_PARK = "nationalHistoricPark",
  NAT_HISTORIC_SITE = "nationalHistoricSite",
  NAT_LAKESHORE = "nationalLakeshore",
  NAT_MEMORIAL = "nationalMemorial",
  NAT_MONUMENT = "nationalMonument",
  NAT_PARKWAY = "nationalParkway",
  NAT_PRESERVES = "nationalPreserve",
  NAT_RESERVES = "nationalReserve",
  NAT_REC_AREA = "nationalRecreationArea",
  NAT_RIVER = "nationalRiver",
  NAT_SCENIC_TRAIL = "nationalScenicTrail",
  NAT_SEASHORE = "nationalSeashore",
  NAT_WILD_AND_SCENIC_RIVER = "nationalWildAndScenicRiver",
  INTERNATIONAL_HISTORIC_SITE = "internationalHistoricSite",
  OTHER_DESIGNATION = "otherDesignation",
}

export type ParkDesignationType =
  typeof ParkDesignation[keyof typeof ParkDesignation];

export default ParkDesignation;
