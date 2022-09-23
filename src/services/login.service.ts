import { apiClient } from "services/apiService";

type User = {
  email: string;
  password: string;
}

export const login = (user: User) => {
  return apiClient.post(
    "/auth/login",
     user,
    {
      headers: {
        crossdomain: true,
      },
    }
  );
};

export const register = (user: User) => {
  return apiClient.post(
    "/auth/register",
    user,
    {
      headers: {
        crossdomain: true,
      },
    }
  );
};
