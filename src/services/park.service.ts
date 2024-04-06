import { apiClient } from "services/apiService";
import { ParkDesignationType } from "enum/ParkDesignation";
import { SelectedParks } from "types";
import { ParkData } from "types/park";

type Response = {
  parks: SelectedParks;
};

export const getParks = (): Promise<{ parks: ParkData; total: number }> => {
  return apiClient.get("/park");
};

export const getUserParks = (): Promise<{ parks: SelectedParks }> => {
  return apiClient.get("/user/park");
};

export const updateUserParkDesignation = (
  designation: ParkDesignationType,
  parks: string[]
): Promise<Response> => {
  return apiClient.patch("/user/park", { designation, parks });
};

export const updateUserParks = (parks: SelectedParks): Promise<Response> => {
  return apiClient.put("/user/park", { parks });
};
