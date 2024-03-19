import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { Park } from "types/park";
import { ParkDesignationType } from "enum/ParkDesignation";
import { PARK_INFO, ALL_CODES } from "../constants";
import { NPS_API, API_KEY } from "hooks/constants";
import { loadState, saveState } from "storage/sessionStorage";
import sortParks from "helpers/sortParks";
import formatParks from "helpers/formatParks";
import copy from "./copy";

function useParks(selectedItem?: ParkDesignationType) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [parks, setParks] = useState<Park[]>([]);

  useEffect(() => {
    const fetchParks = async () => {
      const codes = selectedItem ? PARK_INFO[selectedItem].codes : ALL_CODES;
      setIsLoading(true);
      setParks([]);
      try {
        let data = loadState(selectedItem || "");
        if (!data.length) {
          const res = await fetch(
            `${NPS_API}/parks?parkCode=${codes}&limit=496&sort=fullName&api_key=${API_KEY}`
          );
          const json = await res.json();
          console.log(json)
          data = sortParks(formatParks(json.data, selectedItem));
          saveState(selectedItem || "", JSON.stringify(data));
        }
        setParks(data);
      } catch (e) {
        toast.error(copy.loadParksError);
      } finally {
        setIsLoading(false);
      }
    };
    fetchParks();
  }, [selectedItem]);

  return {
    isLoading,
    parks,
  };
}

export default useParks;
