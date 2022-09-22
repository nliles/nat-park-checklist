import { apiClient } from "services/apiService";

export const login = (email: string, password: string) => {
  return apiClient.post(
    "/auth/login",
    {
      email,
      password,
    },
    {
      headers: {
        crossdomain: true,
      },
    }
  );
};

export const register = (email: string, password: string) => {
  return apiClient.post(
    "/auth/register",
    {
      email,
      password,
    },
    {
      headers: {
        crossdomain: true,
      },
    }
  );
};
