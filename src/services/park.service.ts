import { apiClient } from "services/apiService";

type Park = {
  data: string[];
};

export const getParks = (): Promise<Park> => {
  return apiClient.get("/parks");
};

export const updateParks = (parks: string[]): Promise<Park> => {
  return apiClient.post("/parks", parks);
};
