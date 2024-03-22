const SEQUOIA_KINGS_BASE = {
  parkCode: "seki",
  states: "CA",
  url: "https://www.nps.gov/seki/index.htm",
  designation: "National Park",
}

export const SEQUOIA_NAT_PARK = {
  ...SEQUOIA_KINGS_BASE,
  id: "7E5A693C-2F63-44FD-B791-31FC8B8B6285",
  images: [
    {
      altText:
        "A guardrail encircles people along a narrow walkway with wide views",
      url: "https://www.nps.gov/common/uploads/structured_data/3C7A2E1B-1DD8-B71B-0B4D563CB47FA60F.jpg",
    },
  ],
  name: "Sequoia",
  fullName: "Sequoia National Park",
  latitude: "36.485625",
  longitude: "-118.466728",
};

export const KINGS_CANYON_NAT_PARK = {
  ...SEQUOIA_KINGS_BASE,
  id: "kings-canyon-nat-park",
  images: [
    {
      altText: "A deep canyon with a forested floor and steep granite cliffs",
      url: "https://www.nps.gov/common/uploads/structured_data/3C7A250B-1DD8-B71B-0BCF61A89A8B2970.jpg",
    },
  ],
  name: "Kings Canyon",
  fullName: "Kings Canyon National Park",
  latitude: "36.739991",
  longitude: "-118.963389",
};

// National parks and preserves => split out

const GATES_OF_ARCTIC_BASE = {
  parkCode: "gaar",
  name: "Gates Of The Arctic",
  states: "AK",
  latitude: "67.75961636",
  longitude: "-153.2917758",
  url: "https://www.nps.gov/gaar/index.htm",
}

export const GATES_OF_ARCTIC_NAT_PARK = {
  ...GATES_OF_ARCTIC_BASE,
  id: "BC195D18-71C8-4A99-BF8E-10BFAB849679",
  images: [
    {
      altText: "Alpenglow on the granite cliffs of mountains",
      url: "https://www.nps.gov/common/uploads/structured_data/3C7A89F4-1DD8-B71B-0B52204A2EBF61A4.jpg",
    },
  ],
  fullName: "Gates of the Arctic National Park",
  designation: "National Park",
}
export const GATES_OF_ARCTIC_PRESERVE = {
  ...GATES_OF_ARCTIC_BASE,
  id: "gates-of-arctic-preserve",
  images: [
    {
      altText: "Alpenglow on the granite cliffs of mountains",
      url: "https://www.nps.gov/common/uploads/structured_data/3C7A89F4-1DD8-B71B-0B52204A2EBF61A4.jpg",
    },
  ],
  fullName: "Gates of the Arctic National Preserve",
  designation: "National Preserve",
};

export const GREAT_SAND_DUNES_PRESERVE = {
  id: "great-sand-dunes-nat-park",
  images: [
    {
      altText: "Grasslands, large dunes, and snow-capped peaks at sunset",
      url: "https://www.nps.gov/common/uploads/structured_data/BC4ACB4C-0A6D-0188-E9A6AA1217827461.jpg",
    },
  ],
  parkCode: "",
  name: "Great Sand Dunes National Preserve",
  fullName: "Great Sand Dunes National Preserve",
  states: "CO",
  latitude: "37.79256812",
  longitude: "-105.5919572",
  designation: "National Preserve",
  url: "https://www.nps.gov/grsa/index.htm",
};

export const GLACIER_BAY_PRESERVE = {
  id: "glacier-bay-preserve",
  images: [
    {
      altText:
        "Icebergs, calved from tidewater glaciers are a common sight in Glacier Bay National Park.",
      url: "https://www.nps.gov/common/uploads/structured_data/3C790BBF-1DD8-B71B-0B0AE92D0B9C24EB.jpg",
    },
  ],
  parkCode: "",
  name: "Glacier Bay National Preserve",
  fullName: "Glacier Bay National Preserve",
  states: "AK",
  latitude: "58.80086718",
  longitude: "-136.8407579",
  designation: "National Preserve",
  url: "https://www.nps.gov/glba/index.htm",
};

const DENALI_BASE = {
  name: "Denali",
  states: "AK",
  parkCode: "dena",
  latitude: "63.29777484",
  longitude: "-151.0526568",
  url: "https://www.nps.gov/dena/index.htm",
}

export const DENALI_NATIONAL_PARK = {
  ...DENALI_BASE,
  id: "C0BF2A42-E353-4FAE-B4C4-AA0676B58100",
  images: [
    {
      altText: "Three brown bears walking along a dirt road",
      url: "https://www.nps.gov/common/uploads/structured_data/FC8ECC8C-A531-46F8-0D60DF1C84105DBE.jpg",
    },
  ],
  fullName: "Denali National Park",
  designation: "National Park",
};

export const DENALI_NATIONAL_PRESERVE = {
  ...DENALI_BASE,
  id: "denali-national-preserve",
  images: [
    {
      altText: "Three brown bears walking along a dirt road",
      url: "https://www.nps.gov/common/uploads/structured_data/FC8ECC8C-A531-46F8-0D60DF1C84105DBE.jpg",
    },
  ],
  fullName: "Denali National Preserve",
  designation: "National Preserve",
};

// The following parks are not returned by the NPS API:
export const JDR_MEMORIAL_PARKWAY = {
  id: "jdr-memorial-parkway",
  images: [
    {
      altText: "Winter sunrise on snow-covered Teton Range",
      url: "https://www.nps.gov/common/uploads/structured_data/3C7FA7B7-1DD8-B71B-0B7B45B73D1C90C3.jpg",
    },
  ],
  parkCode: "",
  name: "John D. Rockefeller, Jr. Memorial Parkway",
  fullName: "John D. Rockefeller, Jr. Memorial Parkway",
  states: "WY",
  latitude: "43.81853565",
  longitude: "-110.7054666",
  designation: "National Parkway",
  url: "https://www.nps.gov/grte/planyourvisit/jodr.htm",
};

export const LAKE_ROSS_NRA = {
  id: "lake-ross-nra",
  images: [
    {
      altText: "Tents set up in a wooded area.",
      url: "https://www.nps.gov/common/uploads/structured_data/3C7A5B0D-1DD8-B71B-0B1104A95B7A2026.jpg",
    },
  ],
  parkCode: "",
  name: "Lake Ross National Recreation",
  fullName: "Lake Ross National Recreation",
  states: "WA",
  latitude: "48.868113",
  longitude: "-121.06395",
  designation: "National Recreation Area",
  url: "https://www.nps.gov/noca/planyourvisit/visitorcenters.htm",
};

export const LAKE_CHELAN_NRA = {
  id: "lake-chelan-nra",
  images: [
    {
      altText: "boats on the water with mountains and trees surrounding",
      url: "https://www.nps.gov/common/uploads/structured_data/3C7A599D-1DD8-B71B-0BBDC12BEC5107B5.jpg",
    },
  ],
  parkCode: "",
  name: "Lake Chelan National Recreation",
  fullName: "Lake Chelan National Recreation",
  states: "WA",
  latitude: "48.026974",
  longitude: "-120.337732",
  designation: "National Recreation Area",
  url: "https://www.nps.gov/noca/planyourvisit/visitorcenters.htm",
};

export const FORT_CAROLINE_NAT_MEMORIAL = {
  id: "fort-caroline-nat-memorial",
  images: [
    {
      altText: "Fort gate",
      url: "https://www.nps.gov/common/uploads/structured_data/3C7B5019-1DD8-B71B-0B8694BFD33E8B3C.jpg",
    },
  ],
  parkCode: "",
  name: "Fort Caroline National Memorial",
  fullName: "Fort Caroline National Memorial",
  states: "FL",
  latitude: "30.47251894",
  longitude: "-81.49950104",
  designation: "National Memorial",
  url: "https://www.nps.gov/timu/learn/historyculture/foca.htm",
};

export const HOHOKAM_NAT_MONUMENT = {
  id: "hohokam-nat-monument",
  images: [],
  parkCode: "",
  name: "Hohokam Pima National Monument",
  fullName: "Hohokam Pima National Monument",
  states: "AZ",
  latitude: "32.192890",
  longitude: "-112.925960",
  designation: "National Monument",
  url: "https://www.nationalparks.org/explore/parks/hohokam-pima-national-monument",
};
