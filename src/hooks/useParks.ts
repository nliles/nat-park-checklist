import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { Park } from "types/park";
import { ParkData } from "types/park";
import { ParkDesignationType } from "enum/ParkDesignation";
import { getParks } from "services/park.service";
import { loadState, saveState } from "storage/sessionStorage";
import copy from "./copy";

function useParks(
  selectedDesignation?: ParkDesignationType,
  selectedState?: string | null
) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [parks, setParks] = useState<Park[]>([]);
  const [allParks, setAllParks] = useState<ParkData>();
  const [total, setTotal] = useState<number>(0);
  useEffect(() => {
    const fetchParks = async () => {
      const storageKey = "allDesignations";
      setIsLoading(true);
      try {
        let data = loadState(storageKey);
        if (!data) {
          const res = await getParks();
          data = res;
          saveState(storageKey, JSON.stringify(res));
        }
        let filteredParks = selectedDesignation
          ? data.parks[selectedDesignation]
          : Object.values(data.parks).flat(1);
        filteredParks = filteredParks.filter((park: Park) =>
          selectedState ? park.states.includes(selectedState) : park
        );
        setParks(filteredParks);
        setAllParks(data.parks);
        setTotal(data.total);
      } catch (e) {
        toast.error(copy.loadParksError);
      } finally {
        setIsLoading(false);
      }
    };
    fetchParks();
  }, [selectedDesignation, selectedState]);

  return {
    isLoading,
    allParks,
    parks,
    total,
  };
}

export default useParks;
