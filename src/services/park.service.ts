import { apiClient } from "services/apiService";
import { Parks } from "types";

const config = {
  headers: {
    crossdomain: true,
    Authorization: sessionStorage.getItem("token") || "",
    "Content-Type": "application/json",
  },
};

export const getParks = (): Promise<{ parks: Parks }> => {
  return apiClient.get("/park", config);
};

export const updateParks = (
  designation: string,
  parks: string[]
): Promise<{ parks: Parks }> => {
  return apiClient.post("/park", { designation, parks }, config);
};
