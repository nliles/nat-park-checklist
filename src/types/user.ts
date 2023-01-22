export type User = {
  email: string;
  password: string;
};

type UserResponse = {
  id: string;
  email: string;
};

export type UserInfo = {
  user: UserResponse;
};
