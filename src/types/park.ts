type Address = {
  stateCode: string;
};

type Image = {
  url: string;
  altText: string;
};

export type Park = {
  addresses?: Address[];
  fullName?: string;
  id: string;
  images?: Image[];
  latitude: string;
  longitude: string;
  name?: string;
  states?: string;
  url?: string;
};
