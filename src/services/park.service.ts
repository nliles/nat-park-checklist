import { apiClient } from "services/apiService";

type Parks = {
  parks: string[];
};

export const getParks = (): Promise<Parks> => {
  return apiClient.get("/park");
};

export const updateParks = (parks: string[]): Promise<Parks> => {
  return apiClient.post("/park", { parks });
};