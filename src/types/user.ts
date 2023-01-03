type UserResponse = {
  email: string;
  token: string;
};

export type UserInfo = {
  user: UserResponse;
};

export type User = {
  email: string;
  password: string;
};
