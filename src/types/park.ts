type Address = {
  stateCode: string;
};

type Image = {
  url: string;
  altText: string;
};

export type CondensedPark = {
  id: string;
  latitude: string;
  longitude: string;
};

export type Park = CondensedPark & {
  addresses?: Address[];
  fullName: string;
  designation: string;
  images: Image[];
  name: string;
  states: string;
  url: string;
};

