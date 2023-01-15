import axios from "axios";

axios.defaults.headers.common.Authorization =
  sessionStorage.getItem("token") || "";
axios.defaults.headers.common.crossdomain = true;
axios.defaults.headers.common["Content-Type"] = "application/json";

// Main API base
export const apiClient = axios.create({
  baseURL: "https://nat-park-checklist.herokuapp.com/",
});

apiClient.interceptors.response.use(
  (response) => response.data,
  (error) => Promise.reject(error.response)
);
