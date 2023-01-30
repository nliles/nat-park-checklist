import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { Park } from "types/park";
import { ParkDesignationType } from "enum/ParkDesignation";
import { PARK_INFO } from "../constants";
import { NPS_API, API_KEY } from "hooks/constants";
import { loadState, saveState } from "storage/sessionStorage";
import sortParks from "helpers/sortParks";
import formatParks from "helpers/formatParks";
import copy from "./en";

function useParks(selectedItem: ParkDesignationType) {
  const [loading, setLoading] = useState<boolean>(false);
  const [parks, setParks] = useState<Park[]>([]);

  useEffect(() => {
    const fetchParks = async () => {
      const codes = PARK_INFO[selectedItem].codes;
      setLoading(true);
      setParks([]);
      try {
        let data = loadState(selectedItem);
        if (!data.length) {
          const res = await fetch(
            `${NPS_API}/parks?parkCode=${codes}&limit=496&sort=fullName&api_key=${API_KEY}`
          );
          const json = await res.json();
          data = sortParks(formatParks(json.data, selectedItem));
          saveState(selectedItem, JSON.stringify(data));
        }
        setParks(data);
        setLoading(false);
      } catch (e) {
        setLoading(false);
        toast.error(copy.loadParksError);
      }
    };
    fetchParks();
  }, [selectedItem]);

  return {
    loading,
    parks,
  };
}

export default useParks;
