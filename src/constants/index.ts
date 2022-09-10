import {
  NAT_PARK_CODES,
  NAT_BATTLEFIELD_CODES,
  NAT_BATTLEFIELD_PARK_CODES,
  NAT_MILITARY_PARK_CODES,
  NAT_MONUMENT_CODES,
  NAT_HISTORIC_CODES,
  NAT_HISTORIC_SITE_CODES,
  NAT_MEMORIAL_CODES,
  NAT_SEASHORE_CODES,
  NAT_SCENIC_TRAIL_CODES,
  NAT_REC_AREAS_CODES,
  NAT_RIVER_CODES,
  NAT_LAKESHORE_CODES,
  NAT_PARKWAY_CODES,
  NAT_RESERVES_CODES,
  NAT_PRESERVES_CODES,
  NAT_WILD_SCENIC_RIVER_CODES,
  OTHER_DESIGNATION_CODES,
} from "./parkCodes";
import {
  GREAT_SAND_DUNES_PRESERVE,
  GLACIER_BAY_PRESERVE,
  GATES_OF_ARCTIC_PRESERVE,
  KINGS_CANYON_NAT_PARK,
  DENALI_NATIONAL_PRESERVE,
  FORT_CAROLINE_NAT_MEMORIAL,
  JDR_MEMORIAL_PARKWAY,
  LAKE_ROSS_NRA,
  LAKE_CHELAN_NRA,
  HOHOKAM_NAT_MONUMENT,
  SEQUOIA_NAT_PARK,
} from "./formattedParks";
export const API_KEY = "coWPLtsaQYAhRKBnWEEOKcnnNXgKwGHDBn7vLl1c";
export const NPS_API = "https://developer.nps.gov/api/v1";

export const PARK_DESIGNATION_KEY = {
  NAT_PARK: "national-park",
  NAT_BATTLEFIELD: "national-battlefield",
  NAT_BATTLEFIELD_PARK: "national-battlefield-park",
  NAT_BATTLEFIELD_SITE: "national-battlefield-site",
  NAT_MILITARY_PARK: "national-military-park",
  NAT_HISTORIC_PARK: "national-historic-park",
  NAT_HISTORIC_SITE: "national-historic-site",
  NAT_LAKESHORE: "national-lakeshore",
  NAT_MEMORIAL: "national-memorial",
  NAT_MONUMENT: "national-monument",
  NAT_PARKWAY: "national-parkway",
  NAT_PRESERVES: "national-preserve",
  NAT_RESERVES: "national-reserve",
  NAT_REC_AREA: "national-recreation-area",
  NAT_RIVER: "national-river",
  NAT_SCENIC_TRAIL: "national-scenic-trail",
  NAT_SEASHORE: "national-seashore",
  NAT_WILD_AND_SCENIC_RIVER: "national-wild-and-scenic-river",
  INTERNATIONAL_HISTORIC_SITE: "international-historic-site",
  OTHER_DESIGNATION: "other-designation",
};

export const LIST_OPTIONS = [...Object.values(PARK_DESIGNATION_KEY)];

export const PARK_INFO = {
  [PARK_DESIGNATION_KEY.NAT_PARK]: {
    codes: NAT_PARK_CODES,
    formattedParks: [KINGS_CANYON_NAT_PARK, SEQUOIA_NAT_PARK],
  },
  [PARK_DESIGNATION_KEY.NAT_BATTLEFIELD]: {
    codes: NAT_BATTLEFIELD_CODES,
    formattedParks: [],
  },
  [PARK_DESIGNATION_KEY.NAT_BATTLEFIELD_PARK]: {
    codes: NAT_BATTLEFIELD_PARK_CODES,
    formattedParks: [],
  },
  [PARK_DESIGNATION_KEY.NAT_BATTLEFIELD_SITE]: {
    codes: ["brcr"],
    formattedParks: [],
  },
  [PARK_DESIGNATION_KEY.NAT_MILITARY_PARK]: {
    codes: NAT_MILITARY_PARK_CODES,
    formattedParks: [],
  },
  [PARK_DESIGNATION_KEY.NAT_HISTORIC_PARK]: {
    codes: NAT_HISTORIC_CODES,
    formattedParks: [],
  },
  [PARK_DESIGNATION_KEY.NAT_HISTORIC_SITE]: {
    codes: NAT_HISTORIC_SITE_CODES,
    formattedParks: [],
  },
  [PARK_DESIGNATION_KEY.NAT_MEMORIAL]: {
    codes: NAT_MEMORIAL_CODES,
    formattedParks: [FORT_CAROLINE_NAT_MEMORIAL],
  },
  [PARK_DESIGNATION_KEY.NAT_MONUMENT]: {
    codes: NAT_MONUMENT_CODES,
    formattedParks: [HOHOKAM_NAT_MONUMENT],
  },
  [PARK_DESIGNATION_KEY.NAT_SEASHORE]: {
    codes: NAT_SEASHORE_CODES,
    formattedParks: [],
  },
  [PARK_DESIGNATION_KEY.NAT_SCENIC_TRAIL]: {
    codes: NAT_SCENIC_TRAIL_CODES,
    formattedParks: [],
  },
  [PARK_DESIGNATION_KEY.NAT_REC_AREA]: {
    codes: NAT_REC_AREAS_CODES,
    formattedParks: [LAKE_CHELAN_NRA, LAKE_ROSS_NRA],
  },
  [PARK_DESIGNATION_KEY.NAT_RIVER]: {
    codes: NAT_RIVER_CODES,
    formattedParks: [],
  },
  [PARK_DESIGNATION_KEY.NAT_LAKESHORE]: {
    codes: NAT_LAKESHORE_CODES,
    formattedParks: [],
  },
  [PARK_DESIGNATION_KEY.NAT_PARKWAY]: {
    codes: NAT_PARKWAY_CODES,
    formattedParks: [JDR_MEMORIAL_PARKWAY],
  },
  [PARK_DESIGNATION_KEY.NAT_RESERVES]: {
    codes: NAT_RESERVES_CODES,
    formattedParks: [],
  },
  [PARK_DESIGNATION_KEY.NAT_PRESERVES]: {
    codes: NAT_PRESERVES_CODES,
    formattedParks: [
      DENALI_NATIONAL_PRESERVE,
      GATES_OF_ARCTIC_PRESERVE,
      GLACIER_BAY_PRESERVE,
      GREAT_SAND_DUNES_PRESERVE,
    ],
  },
  [PARK_DESIGNATION_KEY.NAT_WILD_AND_SCENIC_RIVER]: {
    codes: NAT_WILD_SCENIC_RIVER_CODES,
    formattedParks: [],
  },
  [PARK_DESIGNATION_KEY.OTHER_DESIGNATION]: {
    codes: OTHER_DESIGNATION_CODES,
    formattedParks: [],
  },
  [PARK_DESIGNATION_KEY.INTERNATIONAL_HISTORIC_SITE]: {
    codes: ["sacr"],
    formattedParks: [],
  },
};
