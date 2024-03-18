import { apiClient } from "services/apiService";
import { ParkDesignationType } from "enum/ParkDesignation";
import { Parks } from "types";

type Response = {
  parks: Parks
}

export const getParks = (): Promise<{ parks: Parks }> => {
  return apiClient.get("/users/park");
};

export const updateParks = (
  designation: ParkDesignationType,
  parks: string[]
): Promise<Response> => {
  return apiClient.patch(
    "/users/park",
    { designation, parks }
  );
};
