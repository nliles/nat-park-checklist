import { apiClient } from "services/apiService";
import { ParkDesignationType } from "enum/ParkDesignation";
import { Parks } from "types";

export const getParks = (): Promise<{ parks: Parks }> => {
  return apiClient.get("/park", {
    headers: {
      crossdomain: true,
      Authorization: sessionStorage.getItem("token") || "",
      "Content-Type": "application/json",
    },
  });
};

export const updateParks = (
  designation: ParkDesignationType,
  parks: string[]
): Promise<{ parks: Parks }> => {
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
