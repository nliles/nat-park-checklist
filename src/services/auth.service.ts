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
  return apiClient.post("/auth/register", user, {
    headers: {
      crossdomain: true,
    },
  });
};

export const login = (user: User): Promise<UserInfo> => {
  return apiClient.post("/auth/login", user, {
    headers: {
      crossdomain: true,
    },
  });
};
