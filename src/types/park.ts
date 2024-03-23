type Address = {
  stateCode: string;
};

type Image = {
  url: string;
  altText: string;
};

export type Park = {
  id: string;
  latitude: string;
  longitude: string;
  addresses?: Address[];
  fullName: string;
  parkCode: string;
  designation: string;
  images: Image[];
  name: string;
  states: string;
  url: string;
};
