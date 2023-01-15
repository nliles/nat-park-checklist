import { useState, useEffect } from "react";
import { getParks } from "services/park.service";
import toast from "react-hot-toast";
import { loadState, saveState } from "storage/sessionStorage";
import { Parks } from "types";
import copy from "./en";

function useSelectedParks(isLoggedIn: boolean) {
  const [selectedParks, setSelectedParks] = useState<Parks>({});
  const storageKey = "selectedParks";

  useEffect(() => {
    const fetchParks = async () => {
      try {
        let data = loadState(storageKey);
        if (!data.length) {
          const { parks } = await getParks();
          data = parks;
          saveState(storageKey, JSON.stringify(data));
        }
        setSelectedParks(data);
      } catch (e) {
        toast.error(copy.selectedParksError);
      }
    };
    if (isLoggedIn) {
      fetchParks();
    } else {
      sessionStorage.removeItem(storageKey);
      setSelectedParks({});
    }
  }, [isLoggedIn]);

  return {
    selectedParks,
    setSelectedParks,
  };
}

export default useSelectedParks;
