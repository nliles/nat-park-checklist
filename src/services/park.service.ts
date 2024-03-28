import { apiClient } from "services/apiService";
import { ParkDesignationType } from "enum/ParkDesignation";
import { SelectedParks } from "types";

type Response = {
  parks: SelectedParks;
};

export const getParks = (): Promise<{ parks: SelectedParks }> => {
  return apiClient.get("/user/park");
};

export const updateParkDesignation = (
  designation: ParkDesignationType,
  parks: string[]
): Promise<Response> => {
  return apiClient.patch("/user/park", { designation, parks });
};

export const updateParks = (parks: SelectedParks): Promise<Response> => {
  return apiClient.put("/user/park", { parks });
};
