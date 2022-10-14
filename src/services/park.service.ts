import { apiClient } from "services/apiService";
import { Parks } from 'types'

export const getParks = (): Promise<{parks: Parks}> => {
  return apiClient.get("/park", {
    headers: {
      crossdomain: true,
      Authorization: sessionStorage.getItem("token") || "",
      "Content-Type": "application/json",
    },
  });
};

export const updateParks = (designation: string, parks: string[]): Promise<Parks> => {
  return apiClient.post(
    "/park",
    { designation, parks },
    {
      headers: {
        crossdomain: true,
        Authorization: sessionStorage.getItem("token") || "",
        "Content-Type": "application/json",
      },
    }
  );
};
