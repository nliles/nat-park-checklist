import { apiClient } from "services/apiService";

type Parks = {
  parks: string[];
};

export const getParks = (): Promise<Parks> => {
  return apiClient.get("/park", {
    headers: {
      crossdomain: true,
      Authorization: sessionStorage.getItem("token") || "",
      "Content-Type": "application/json",
    }
  });
};

export const updateParks = (parks: string[]): Promise<Parks> => {
  return apiClient.post("/park", { parks }, {
    headers: {
      crossdomain: true,
      Authorization: sessionStorage.getItem("token") || "",
      "Content-Type": "application/json",
    }
  });
};
