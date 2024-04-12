import { useState, useEffect } from "react";
import { getUserParks } from "services/park.service";
import toast from "react-hot-toast";
import { defaultSelectedValues } from "../constants";
import { SelectedParks } from "types";
import copy from "./copy";

function useSelectedParks(isLoggedIn: boolean) {
  const [selectedParks, setSelectedParks] = useState<SelectedParks>(
    defaultSelectedValues
  );
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchParks = async () => {
      try {
        setIsLoading(true);
        const { parks } = await getUserParks();
        setSelectedParks(parks);
      } catch (err: any) {
        if (err?.status !== 401) {
          toast.error(copy.selectedParksError);
        }
      } finally {
        setIsLoading(false);
      }
    };
    if (isLoggedIn) {
      fetchParks();
    } else {
      setSelectedParks(defaultSelectedValues);
    }
  }, [isLoggedIn]);

  return {
    isLoading,
    selectedParks,
    setSelectedParks,
  };
}

export default useSelectedParks;
