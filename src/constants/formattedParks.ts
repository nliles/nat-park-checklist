const generateId = () =>
  Math.floor(1000000000 + Math.random() * 9000000000).toString();

export const SEQUOIA_NAT_PARK = {
  id: generateId(),
  images: [
    {
      altText:
        "A guardrail encircles people along a narrow walkway with wide views",
      url: "https://www.nps.gov/common/uploads/structured_data/3C7A2E1B-1DD8-B71B-0B4D563CB47FA60F.jpg",
    },
  ],
  name: "Sequoia National Park",
  fullName: "Sequoia National Park",
  states: "CA",
  latitude: "36.485625",
  longitude: "-118.466728",
  designation: "National Parks",
  url: "https://www.nps.gov/seki/index.htm",
};

export const KINGS_CANYON_NAT_PARK = {
  id: generateId(),
  images: [
    {
      altText: "A deep canyon with a forested floor and steep granite cliffs",
      url: "https://www.nps.gov/common/uploads/structured_data/3C7A250B-1DD8-B71B-0BCF61A89A8B2970.jpg",
    },
  ],
  name: "Kings Canyon National Park",
  fullName: "Kings Canyon National Park",
  states: "CA",
  latitude: "36.739991",
  longitude: "-118.963389",
  designation: "National Parks",
  url: "https://www.nps.gov/seki/index.htm",
};

export const GREAT_SAND_DUNES_PRESERVE = {
  id: generateId(),
  images: [
    {
      altText: "Grasslands, large dunes, and snow-capped peaks at sunset",
      url: "https://www.nps.gov/common/uploads/structured_data/BC4ACB4C-0A6D-0188-E9A6AA1217827461.jpg",
    },
  ],
  name: "Great Sand Dunes National Preserve",
  fullName: "Great Sand Dunes National Preserve",
  states: "CO",
  latitude: "37.79256812",
  longitude: "-105.5919572",
  designation: "National Park & Preserve",
  url: "https://www.nps.gov/grsa/index.htm",
};

export const GLACIER_BAY_PRESERVE = {
  id: generateId(),
  images: [
    {
      altText:
        "Icebergs, calved from tidewater glaciers are a common sight in Glacier Bay National Park.",
      url: "https://www.nps.gov/common/uploads/structured_data/3C790BBF-1DD8-B71B-0B0AE92D0B9C24EB.jpg",
    },
  ],
  name: "Glacier Bay National Preserve",
  fullName: "Glacier Bay National Preserve",
  states: "AK",
  latitude: "58.80086718",
  longitude: "-136.8407579",
  designation: "National Park & Preserve",
  url: "https://www.nps.gov/glba/index.htm",
};

export const GATES_OF_ARCTIC_PRESERVE = {
  id: generateId(),
  images: [
    {
      altText: "Alpenglow on the granite cliffs of mountains",
      url: "https://www.nps.gov/common/uploads/structured_data/3C7A89F4-1DD8-B71B-0B52204A2EBF61A4.jpg",
    },
  ],
  name: "Gates of the Arctic National Preserve",
  fullName: "Gates of the Arctic National Preserve",
  states: "AK",
  latitude: "67.75961636",
  longitude: "-153.2917758",
  designation: "National Park & Preserve",
  url: "https://www.nps.gov/glba/index.htm",
};

export const DENALI_NATIONAL_PRESERVE = {
  id: generateId(),
  images: [
    {
      altText: "Three brown bears walking along a dirt road",
      url: "https://www.nps.gov/common/uploads/structured_data/FC8ECC8C-A531-46F8-0D60DF1C84105DBE.jpg",
    },
  ],
  name: "Denali National Preserve",
  fullName: "Denali National Preserve",
  states: "AK",
  latitude: "63.29777484",
  longitude: "-151.0526568",
  designation: "National Park & Preserve",
  url: "https://www.nps.gov/dena/index.htm",
};

export const JDR_MEMORIAL_PARKWAY = {
  id: generateId(),
  images: [
    {
      altText: "Winter sunrise on snow-covered Teton Range",
      url: "https://www.nps.gov/common/uploads/structured_data/3C7FA7B7-1DD8-B71B-0B7B45B73D1C90C3.jpg",
    },
  ],
  name: "John D. Rockefeller, Jr. Memorial Parkway",
  fullName: "John D. Rockefeller, Jr. Memorial Parkway",
  states: "WY",
  latitude: "43.81853565",
  longitude: "-110.7054666",
  designation: "Memorial Parkway",
  url: "https://www.nps.gov/grte/planyourvisit/jodr.htm",
};

export const LAKE_ROSS_NRA = {
  id: generateId(),
  images: [
    {
      altText: "Tents set up in a wooded area.",
      url: "https://www.nps.gov/common/uploads/structured_data/3C7A5B0D-1DD8-B71B-0B1104A95B7A2026.jpg",
    },
  ],
  name: "Lake Ross National Recreation",
  fullName: "Lake Ross National Recreation",
  states: "WA",
  latitude: "48.868113",
  longitude: "-121.06395",
  designation: "National Recreation Area",
  url: "https://www.nps.gov/noca/planyourvisit/visitorcenters.htm",
};

export const LAKE_CHELAN_NRA = {
  id: generateId(),
  images: [
    {
      altText: "boats on the water with mountains and trees surrounding",
      url: "https://www.nps.gov/common/uploads/structured_data/3C7A599D-1DD8-B71B-0BBDC12BEC5107B5.jpg",
    },
  ],
  name: "Lake Chelan National Recreation",
  fullName: "Lake Chelan National Recreation",
  states: "WA",
  latitude: "48.026974",
  longitude: "-120.337732",
  designation: "National Recreation Area",
  url: "https://www.nps.gov/noca/planyourvisit/visitorcenters.htm",
};

export const FORT_CAROLINE_NAT_MEMORIAL = {
  id: generateId(),
  images: [
    {
      altText: "Fort gate",
      url: "https://www.nps.gov/common/uploads/structured_data/3C7B5019-1DD8-B71B-0B8694BFD33E8B3C.jpg",
    },
  ],
  name: "Fort Caroline National Memorial",
  fullName: "Fort Caroline National Memorial",
  states: "FL",
  latitude: "30.47251894",
  longitude: "-81.49950104",
  designation: "Ecological & Historic Preserve",
  url: "https://www.nps.gov/timu/learn/historyculture/foca.htm",
};

export const HOHOKAM_NAT_MONUMENT = {
  id: generateId(),
  images: [],
  name: "Hohokam Pima National Monument",
  fullName: "Hohokam Pima National Monument",
  states: "AZ",
  latitude: "32.192890",
  longitude: "-112.925960",
  designation: "National Monument",
  url: "https://www.nationalparks.org/explore/parks/hohokam-pima-national-monument",
};
