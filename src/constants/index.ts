import { Park } from "types/park";
import ParkDesignation from "enum/ParkDesignation";
import {
  NAT_PARK_CODES,
  NAT_BATTLEFIELD_CODES,
  NAT_BATTLEFIELD_SITE_CODES,
  NAT_BATTLEFIELD_PARK_CODES,
  NAT_MILITARY_PARK_CODES,
  NAT_MONUMENT_CODES,
  NAT_HISTORICAL_PARK_CODES,
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
  INTERNATIONAL_HISTORIC_SITE,
} from "./parkCodes";
import {
  KINGS_CANYON_NAT_PARK,
  FORT_CAROLINE_NAT_MEMORIAL,
  JDR_MEMORIAL_PARKWAY,
  LAKE_ROSS_NRA,
  LAKE_CHELAN_NRA,
  HOHOKAM_NAT_MONUMENT,
  SEQUOIA_NAT_PARK,
} from "./formattedParks";

export const LIST_OPTIONS: ParkDesignation[] = [
  ...Object.values(ParkDesignation),
];

export type ParkOverride = {
  parkCodes: string[];
  designation: string;
  needsId?: boolean;
};

type ParkInfo = {
  codes: string[];
  formattedParks?: Park[];
  parkOverrides?: ParkOverride[];
};

type ParkInfoDict = {
  [key in ParkDesignation]: ParkInfo;
};

export const PARK_INFO: ParkInfoDict = {
  [ParkDesignation.NAT_PARK]: {
    codes: NAT_PARK_CODES,
    formattedParks: [KINGS_CANYON_NAT_PARK, SEQUOIA_NAT_PARK],
    parkOverrides: [
      {
        parkCodes: [
          "dena",
          "gaar",
          "glac",
          "glba",
          "grsa",
          "katm",
          "lacl",
          "redw",
          "wrst",
        ],
        designation: "National Park",
      },
    ],
  },
  [ParkDesignation.NAT_BATTLEFIELD]: {
    codes: NAT_BATTLEFIELD_CODES,
  },
  [ParkDesignation.NAT_BATTLEFIELD_PARK]: {
    codes: NAT_BATTLEFIELD_PARK_CODES,
  },
  [ParkDesignation.NAT_BATTLEFIELD_SITE]: {
    codes: NAT_BATTLEFIELD_SITE_CODES,
  },
  [ParkDesignation.NAT_MILITARY_PARK]: {
    codes: NAT_MILITARY_PARK_CODES,
  },
  [ParkDesignation.NAT_HISTORICAL_PARK]: {
    codes: NAT_HISTORICAL_PARK_CODES,
  },
  [ParkDesignation.NAT_HISTORIC_SITE]: {
    codes: NAT_HISTORIC_SITE_CODES,
    parkOverrides: [
      { parkCodes: ["foth", "paav"], designation: "National Historic Site" },
    ],
  },
  [ParkDesignation.NAT_MEMORIAL]: {
    codes: NAT_MEMORIAL_CODES,
    formattedParks: [FORT_CAROLINE_NAT_MEMORIAL],
  },
  [ParkDesignation.NAT_MONUMENT]: {
    codes: NAT_MONUMENT_CODES,
    formattedParks: [HOHOKAM_NAT_MONUMENT],
    parkOverrides: [
      { parkCodes: ["ania", "crmo"], designation: "National Monument" },
    ],
  },
  [ParkDesignation.NAT_SEASHORE]: {
    codes: NAT_SEASHORE_CODES,
  },
  [ParkDesignation.NAT_SCENIC_TRAIL]: {
    codes: NAT_SCENIC_TRAIL_CODES,
  },
  [ParkDesignation.NAT_REC_AREA]: {
    codes: NAT_REC_AREAS_CODES,
    formattedParks: [LAKE_CHELAN_NRA, LAKE_ROSS_NRA],
  },
  [ParkDesignation.NAT_RIVER]: {
    codes: NAT_RIVER_CODES,
  },
  [ParkDesignation.NAT_LAKESHORE]: {
    codes: NAT_LAKESHORE_CODES,
  },
  [ParkDesignation.NAT_PARKWAY]: {
    codes: NAT_PARKWAY_CODES,
    formattedParks: [JDR_MEMORIAL_PARKWAY],
  },
  [ParkDesignation.NAT_RESERVES]: {
    codes: NAT_RESERVES_CODES,
  },
  [ParkDesignation.NAT_PRESERVES]: {
    codes: NAT_PRESERVES_CODES,
    parkOverrides: [
      {
        parkCodes: [
          "ania",
          "crmo",
          "dena",
          "gaar",
          "glba",
          "grsa",
          "katm",
          "lacl",
          "wrst",
        ],
        designation: "National Preserve",
        needsId: true,
      },
    ],
  },
  [ParkDesignation.NAT_WILD_AND_SCENIC_RIVER]: {
    codes: NAT_WILD_SCENIC_RIVER_CODES,
  },
  [ParkDesignation.OTHER_DESIGNATION]: {
    codes: OTHER_DESIGNATION_CODES,
  },
  [ParkDesignation.INTERNATIONAL_HISTORIC_SITE]: {
    codes: INTERNATIONAL_HISTORIC_SITE,
  },
};

export const ALL_CODES = [
  ...Object.entries(PARK_INFO).map((obj) => obj[1].codes),
].flat(1);

export const ALL_FORMATTED = [
  ...Object.entries(PARK_INFO).map((obj) => obj[1].formattedParks || []),
].flat(1);

export const ALL_OVERRIDES = [
  ...Object.entries(PARK_INFO).map((obj) => obj[1].parkOverrides || []),
].flat(1);

export const TOTAL_UNITS = [...Object.values(PARK_INFO)].reduce(
  (acc, element) =>
    acc + element.codes.length + (element.formattedParks || []).length,
  0
);

export const NAT_PARK_TOTAL_LINK =
  "https://www.nps.gov/aboutus/national-park-system.htm";

export const STATES_MAP = {
  'Alabama': 'AL',
  'Alaska': 'AK',
  'Arkansas': 'AK',
  'Arizona': 'AZ',
  'California': 'CA',
  'Colorado': 'CO',
  'Connecticut': 'CT',
  'Delaware': 'DE',
  'District of Columbia': 'DC',
  'Florida': 'FL',
  'Georgia': 'GA',
  'Guam': 'GU',
  'Hawaii': 'HI',
  'Idaho': 'ID',
  'Illinois': 'IL',
  'Indiana': 'IN',
  'Iowa': 'IA',
  'Kansas': 'KS',
  'Kentucky': 'KY',
  'Louisiana': 'LA',
  'Maine': 'ME',
  'Marshall Islands': 'MH',
  'Maryland': 'MD',
  'Massachusetts': 'MA',
  'Michigan': 'MI',
  'Minnesota': 'MN',
  'Mississippi': 'MS',
  'Missouri': 'MO',
  'Montana': 'MT',
  'Nebraska': 'NE',
  'Nevada': 'NV',
  'New Hampshire': 'NH',
  'New Jersey': 'NJ',
  'New Mexico': 'NM',
  'New York': 'NY',
  'North Carolina': 'NC',
  'North Dakota': 'ND',
  'Northern Mariana Islands': 'MP',
  'Ohio': 'OH',
  'Oklahoma': 'OK',
  'Oregon': 'OR',
  'Pennsylvania': 'PA',
  'Puerto Rico': 'PR',
  'Rhode Island': 'RI',
  'South Carolina': 'SC',
  'South Dakota': 'SD',
  'Tennessee': 'TN',
  'Texas': 'TX',
  'Utah': 'UT',
  'Vermont': 'VT',
  'Virgin Islands': 'VI',
  'Virginia': 'VA',
  'Washington': 'WA',
  'West Virginia': 'WV',
  'Wisconsin': 'WI',
  'Wyoming': 'WY'
}

export const STATES_LIST = [
  'AL',
  'AK',
  'AZ',
  'AR',
  'CA',
  'CO',
  'CT',
  'DE',
  'FL',
  'GA',
  'HI',
  'ID',
  'IL',
  'IN',
  'IA',
  'KS',
  'KY',
  'LA',
  'ME',
  'MD',
  'MA',
  'MI',
  'MN',
  'MS',
  'MO',
  'MT',
  'NE',
  'NV',
  'NH',
  'NJ',
  'NM',
  'NY',
  'NC',
  'ND',
  'OH',
  'OK',
  'OR',
  'PA',
  'RI',
  'SC',
  'SD',
  'TN',
  'TX',
  'UT',
  'VT',
  'VA',
  'WA',
  'WV',
  'WI',
  'WY',
  'DC',
  'GU',
  'MH',
  'MP',
  'PR',
  'VI',
  'AS'
];

