import { useState, useEffect } from "react";
import camelCase from "lodash/camelCase";
import toast from "react-hot-toast";
import { Park } from "types/park";
import { ParkDesignationType } from "enum/ParkDesignation";
import { getParks } from "services/park.service";
import { loadState, saveState } from "storage/sessionStorage";
import copy from "./copy";

function useParks(
  selectedItem?: ParkDesignationType,
  selectedState?: string | null
) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [parks, setParks] = useState<Park[]>([]);
  useEffect(() => {
    const fetchParks = async () => {
      const storageKey = "allDesignations";
      setIsLoading(true);
      try {
        let data = loadState(storageKey) || [];
        if (!data.length) {
          data = await getParks();
          saveState(storageKey, JSON.stringify(data));
        }
        const filteredParks = data
          .filter((park: Park) =>
            selectedItem
              ? camelCase(park.designation) ===
                selectedItem
              : park
          )
          .filter((park: Park) =>
            selectedState ? park.states.includes(selectedState) : park
          );
        setParks(filteredParks);
      } catch (e) {
        toast.error(copy.loadParksError);
      } finally {
        setIsLoading(false);
      }
    };
    fetchParks();
  }, [selectedItem, selectedState]);

  return {
    isLoading,
    parks,
  };
}

export default useParks;
