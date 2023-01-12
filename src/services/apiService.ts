import axios, { AxiosError } from "axios";

export const Request = {
  PATCH: "patch",
  DELETE: "delete",
} as const;

export type RequestType = typeof Request[keyof typeof Request];

axios.defaults.headers.common.Authorization = sessionStorage.getItem("token") || "";
axios.defaults.headers.common.crossdomain = true;
axios.defaults.headers.common["Content-Type"] = "application/json";

// Main API base
export const apiClient = axios.create({
  baseURL: "https://nat-park-checklist.herokuapp.com/",
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
