type Address = {
  city: string;
  line1: string;
  line2: string;
  line3: string;
  postalCode: string;
  stateCode: string;
  type: string;
};

type ParkActivities = {
  id: string;
  name: string;
};

type Image = {
  url: string;
  altText: string;
};

export type Park = {
  addresses?: Address[];
  activities?: ParkActivities[];
  description?: string;
  designation: string;
  directionsInfo?: string;
  directionsUrl?: string;
  fullName: string;
  id: string;
  images: Image[];
  latitude: string;
  latLong?: string;
  longitude: string;
  name: string;
  parkCode?: string;
  states: string;
  url: string;
  weather?: string;
};
