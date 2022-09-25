import { apiClient } from "services/apiService";

type User = {
  email: string;
  password: string;
};

type UserInfo = {
  user: Partial<User>;
  token: string;
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

export const logout = () => {
  // return apiClient.post("/auth/logout", user, {
  //   headers: {
  //     crossdomain: true,
  //   },
  // });
};
