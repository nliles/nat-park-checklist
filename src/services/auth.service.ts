import { User, UserInfo } from "types/user";
import { apiClient } from "services/apiService";

export const register = (user: User): Promise<UserInfo> => {
  return apiClient.post("/auth/register", user);
};

export const login = (user: User): Promise<UserInfo> => {
  return apiClient.post("/auth/login", user);
};
