import axios, { AxiosAdapter, AxiosError } from "axios";

export const Request = {
  PATCH: "patch",
  DELETE: "delete",
} as const;

export type RequestType = typeof Request[keyof typeof Request];

// Main API base
export const apiClient = axios.create({
  baseURL: "http://localhost:5000",
});

const handleError = (error: AxiosError) => {
  // handle error
};

apiClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    handleError(error);
    return Promise.reject(error.response);
  }
);
