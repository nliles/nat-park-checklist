import { apiClient } from "services/apiService";
import { ParkDesignationType } from "enum/ParkDesignation";
import { Parks } from "types";
import { Park } from "types/park";

type Response = {
  parks: Parks
}

export const getParks = (): Promise<{ parks: Parks }> => {
  return apiClient.get("/users/park");
};

export const updateParkDesignation = (
  designation: ParkDesignationType,
  parks: string[]
): Promise<Response> => {
  return apiClient.patch(
    "/users/park",
    { designation, parks }
  );
};

export const updateParks = (
  parks: Parks
): Promise<Response> => {
  return apiClient.put(
    "/users/park",
    { parks }
  );
};
