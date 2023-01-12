import { apiClient } from "services/apiService";
import { ParkDesignationType } from "enum/ParkDesignation";
import { Parks } from "types";

export const getParks = (): Promise<{ parks: Parks }> => {
  return apiClient.get("/park", {
  headers: {
    Authorization: sessionStorage.getItem("token") || "",
  },
});
}

export const updateParks = (
  designation: ParkDesignationType,
  parks: string[]
): Promise<{ parks: Parks }> => {
  return apiClient.post("/park", { designation, parks }, {
    headers: {
      Authorization: sessionStorage.getItem("token") || "",
    },
  });
};
