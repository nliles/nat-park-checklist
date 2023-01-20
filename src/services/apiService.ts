import axios from "axios";

const baseURL = "https://nat-park-checklist.herokuapp.com/";

axios.defaults.headers.common.Authorization =
  sessionStorage.getItem("token") || "";
axios.defaults.headers.common.crossdomain = true;
axios.defaults.headers.common["Content-Type"] = "application/json";

// Main API base
export const apiClient = axios.create({
  baseURL
});

apiClient.interceptors.response.use(
  (response) => response.data,
  (error) => Promise.reject(error.response)
);
