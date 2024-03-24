import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { Park } from "types/park";
import { ParkDesignationType } from "enum/ParkDesignation";
import { ALL_CODES } from "../constants";
import { NPS_API, API_KEY } from "hooks/constants";
import { loadState, saveState } from "storage/sessionStorage";
import sortParks from "helpers/sortParks";
import formatParks from "helpers/formatParks";
import copy from "./copy";
import getParkDesignation from "helpers/getParkDesignation";

function useParks(selectedItem?: ParkDesignationType, selectedState?: string | null) {
  console.log(selectedState);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [parks, setParks] = useState<Park[]>([]);
  useEffect(() => {
    const fetchParks = async () => {
      const storageKey = "allDesignations";
      setIsLoading(true);
      try {
        let data = loadState(storageKey);
        if (!data.length) {
          const res = await fetch(
            `${NPS_API}/parks?parkCode=${ALL_CODES}&limit=496&sort=fullName&api_key=${API_KEY}`
          );
          const json = await res.json();

          data = sortParks(formatParks(json.data));
          saveState(storageKey, JSON.stringify(data));
        }
        let filteredParks = selectedItem
          ? data.filter(
              (park: Park) =>
                getParkDesignation(park.designation, park.parkCode) ===
                selectedItem
            )
          : data;
        filteredParks = selectedState ? filteredParks.filter((park: Park) => park.states.includes(selectedState)) : filteredParks;
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
