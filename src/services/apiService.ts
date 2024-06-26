import axios, { AxiosError } from "axios";
import { logoutSuccess } from "actions";
import toast from "react-hot-toast";
import store from "store";
import { devBaseURL, prodBaseURL, DEV_ENV } from "./constants";

axios.defaults.withCredentials = true;
axios.defaults.headers.common.crossdomain = true;
axios.defaults.headers.common["Content-Type"] = "application/json";

// Main API base
export const apiClient = axios.create({
  baseURL: DEV_ENV ? devBaseURL : prodBaseURL,
});

const handleError = (error: AxiosError) => {
  const status = error.response?.status;

  if (status === 401) {
    localStorage.removeItem("user");
    store.dispatch(logoutSuccess());
    toast.error("You’ve been logged out.");
  }
};

apiClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    handleError(error);
    return Promise.reject(error.response);
  }
);
