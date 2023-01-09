import { useState, useEffect } from "react";
import { Park } from "types/park";
import { PARK_INFO, NPS_API, API_KEY } from "../constants";
import { loadState, saveState } from "storage/sessionStorage"
import sortParks from "helpers/sortParks";
import formatParks from "helpers/formatParks";

function useParks(selectedItem: string) {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [parks, setParks] = useState<Park[]>([]);

  useEffect(() => {
    const fetchParks = async () => {
      const codes = PARK_INFO[selectedItem].codes;
      setLoading(true);
      setParks([])
      const storageKey = selectedItem.toString();
      try {
        let data = loadState(selectedItem);
        if (!data.length) {
          const res = await fetch(
            `${NPS_API}/parks?parkCode=${codes}&q=id&limit=496&sort=fullName&api_key=${API_KEY}`
          );
          const json = await res.json();
          data = sortParks(formatParks(json.data, selectedItem));
          saveState(selectedItem, data)
        }
        setParks(data);
        setLoading(false);
      } catch (e) {
        setError(true);
        setLoading(false);
      }
    };
    fetchParks();
  }, [selectedItem]);

  return {
    error,
    loading,
    parks,
  };
}

export default useParks;
