import { Park } from "types/park";
import ParkDesignation from "enum/ParkDesignation";
import {
  NAT_PARK_CODES,
  NAT_BATTLEFIELD_CODES,
  NAT_BATTLEFIELD_PARK_CODES,
  NAT_MILITARY_PARK_CODES,
  NAT_MONUMENT_CODES,
  NAT_HISTORIC_PARK_CODES,
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

export const LIST_OPTIONS = [...Object.values(ParkDesignation)];

type ParkInfo = {
  codes: string[];
  formattedParks: Park[];
};

type ParkInfoDict = {
  [key in ParkDesignation]: ParkInfo;
};

export const PARK_INFO: ParkInfoDict = {
  [ParkDesignation.NAT_PARK]: {
    codes: NAT_PARK_CODES,
    formattedParks: [KINGS_CANYON_NAT_PARK, SEQUOIA_NAT_PARK],
  },
  [ParkDesignation.NAT_BATTLEFIELD]: {
    codes: NAT_BATTLEFIELD_CODES,
    formattedParks: [],
  },
  [ParkDesignation.NAT_BATTLEFIELD_PARK]: {
    codes: NAT_BATTLEFIELD_PARK_CODES,
    formattedParks: [],
  },
  [ParkDesignation.NAT_BATTLEFIELD_SITE]: {
    codes: ["brcr"],
    formattedParks: [],
  },
  [ParkDesignation.NAT_MILITARY_PARK]: {
    codes: NAT_MILITARY_PARK_CODES,
    formattedParks: [],
  },
  [ParkDesignation.NAT_HISTORIC_PARK]: {
    codes: NAT_HISTORIC_PARK_CODES,
    formattedParks: [],
  },
  [ParkDesignation.NAT_HISTORIC_SITE]: {
    codes: NAT_HISTORIC_SITE_CODES,
    formattedParks: [],
  },
  [ParkDesignation.NAT_MEMORIAL]: {
    codes: NAT_MEMORIAL_CODES,
    formattedParks: [FORT_CAROLINE_NAT_MEMORIAL],
  },
  [ParkDesignation.NAT_MONUMENT]: {
    codes: NAT_MONUMENT_CODES,
    formattedParks: [HOHOKAM_NAT_MONUMENT],
  },
  [ParkDesignation.NAT_SEASHORE]: {
    codes: NAT_SEASHORE_CODES,
    formattedParks: [],
  },
  [ParkDesignation.NAT_SCENIC_TRAIL]: {
    codes: NAT_SCENIC_TRAIL_CODES,
    formattedParks: [],
  },
  [ParkDesignation.NAT_REC_AREA]: {
    codes: NAT_REC_AREAS_CODES,
    formattedParks: [LAKE_CHELAN_NRA, LAKE_ROSS_NRA],
  },
  [ParkDesignation.NAT_RIVER]: {
    codes: NAT_RIVER_CODES,
    formattedParks: [],
  },
  [ParkDesignation.NAT_LAKESHORE]: {
    codes: NAT_LAKESHORE_CODES,
    formattedParks: [],
  },
  [ParkDesignation.NAT_PARKWAY]: {
    codes: NAT_PARKWAY_CODES,
    formattedParks: [JDR_MEMORIAL_PARKWAY],
  },
  [ParkDesignation.NAT_RESERVES]: {
    codes: NAT_RESERVES_CODES,
    formattedParks: [],
  },
  [ParkDesignation.NAT_PRESERVES]: {
    codes: NAT_PRESERVES_CODES,
    formattedParks: [
      DENALI_NATIONAL_PRESERVE,
      GATES_OF_ARCTIC_PRESERVE,
      GLACIER_BAY_PRESERVE,
      GREAT_SAND_DUNES_PRESERVE,
    ],
  },
  [ParkDesignation.NAT_WILD_AND_SCENIC_RIVER]: {
    codes: NAT_WILD_SCENIC_RIVER_CODES,
    formattedParks: [],
  },
  [ParkDesignation.OTHER_DESIGNATION]: {
    codes: OTHER_DESIGNATION_CODES,
    formattedParks: [],
  },
  [ParkDesignation.INTERNATIONAL_HISTORIC_SITE]: {
    codes: ["sacr"],
    formattedParks: [],
  },
};

export const ALL_CODES = [...Object.entries(PARK_INFO).map(obj => obj[1].codes)].flat(1);
export const ALL_FORMATTED = [...Object.entries(PARK_INFO).map(obj => obj[1].formattedParks)].flat(1);

export const TOTAL_UNITS = [...Object.values(PARK_INFO)].reduce(
  (acc, element) => acc + element.codes.length + element.formattedParks.length,
  0
);

export const NAT_PARK_TOTAL_LINK =
  "https://www.nps.gov/aboutus/national-park-system.htm";
