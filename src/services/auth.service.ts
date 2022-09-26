import { apiClient } from "services/apiService";

type User = {
  email: string;
  password: string;
};

type UserResponse = {
  email: string;
  token: string;
};

type UserInfo = {
  user: UserResponse;
};

export const register = (user: User): Promise<UserInfo> => {
  return apiClient.post("/auth/register", user);
};

export const login = (user: User): Promise<UserInfo> => {
  return apiClient.post("/auth/login", user);
};
