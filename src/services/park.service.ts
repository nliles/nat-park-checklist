import { apiClient } from "services/apiService";
import { ParkDesignationType } from "enum/ParkDesignation";
import { Parks } from "types";

export const getParks = (): Promise<{ parks: Parks }> => apiClient.get("/park");

export const updateParks = (
  designation: ParkDesignationType,
  parks: string[]
): Promise<{ parks: Parks }> => {
  return apiClient.post("/park", { designation, parks });
};
